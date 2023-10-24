package pt.com.deimos.vcwapi.service;

import io.minio.errors.MinioException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import pt.com.deimos.vcwapi.entity.FileEntity;
import pt.com.deimos.vcwapi.entity.ProjectEntity;
import pt.com.deimos.vcwapi.exceptions.BadRequestException;
import pt.com.deimos.vcwapi.exceptions.InternalErrorException;
import pt.com.deimos.vcwapi.exceptions.NotFoundException;
import pt.com.deimos.vcwapi.repository.ThumbnailRepository;
import pt.com.deimos.vcwapi.repository.ProjectRepository;

import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.Optional;


@Transactional
@Service
public class ThumbnailService {


    @Autowired
    private MinioService minioService;

    private final ProjectRepository projectRepository;
    private final ThumbnailRepository thumbnailRepository;


    public ThumbnailService(ProjectRepository projectRepository,
                            ThumbnailRepository thumbnailRepository) {
        this.projectRepository = projectRepository;
        this.thumbnailRepository = thumbnailRepository;
    }

    public Optional<ProjectEntity> findProjectByIdAndUser(Long project_id, String userId) {
        return this.projectRepository.findByIdAndProjectHasUserRoleEntitiesUserInum(project_id, userId);
    }

    @Transactional(readOnly = true)
    public FileEntity findByProject(Long projectId) {

        Optional<FileEntity> result =
                this.thumbnailRepository.findByProjectId(projectId);
        if (result.isEmpty())
            throw new NotFoundException("This thumbnail does not exist.");

        FileEntity downloadableThumbnail = getDownloadThumbnail(result.get());

        return downloadableThumbnail;
    }

    public Optional<FileEntity> findByIdAndProject(Long thumbnailId, Long projectId) {
        return this.thumbnailRepository.findByIdAndProjectId(thumbnailId, projectId);
    }


    private FileEntity getDownloadThumbnail(FileEntity thumbnail) {

        //generate image with download url
        FileEntity tempThumbnail = null;
        try {
            tempThumbnail = new FileEntity();
            BeanUtils.copyProperties(thumbnail, tempThumbnail);
            String url = this.minioService.getDownloadUrl(tempThumbnail.getPath());
            tempThumbnail.setPath(url);
        }
        catch(Exception e){
            throw new InternalErrorException("Failed to generate thumbnail url: "+e);
        }

        return tempThumbnail;
    }


    public FileEntity save(String userId, ProjectEntity project,
                                    MultipartFile thumbnail) {

        FileEntity newThumbnail = null;
        try{
            newThumbnail = processThumbnail(userId, thumbnail);
            project.setFileThumbnail(newThumbnail);
            newThumbnail.setProject(project);
        }
        catch (MinioException e){
            throw new InternalErrorException("Failed to save thumbnail: "+e);
        }

        newThumbnail = this.thumbnailRepository.save(newThumbnail);
        if (newThumbnail == null ) {
            throw new BadRequestException("Failed to save thumbnail.");
        }

        return newThumbnail;
    }

    public FileEntity update(String userId, FileEntity oldThumbnail,
                             MultipartFile thumbnail) {

        // NOTE: since frontend is still limited, the only update would be to
        // replace a previously existing thumbnail
        // change this later if we need to update more attributes besides content

        //create new replacement thumbnail
        FileEntity newThumbnail = null;
        try{
            newThumbnail = processThumbnail(userId, thumbnail);
            oldThumbnail.setFileType(newThumbnail.getFileType());
            oldThumbnail.setName(newThumbnail.getName());
            oldThumbnail.setUpdatedBy(userId);
            oldThumbnail.setUpdatedAt(LocalDateTime.now());
        }
        catch (MinioException e){
            throw new InternalErrorException("Failed to update thumbnail: "+e);
        }

        // delete old thumbnail
        try{
            this.minioService.delete(oldThumbnail.getPath());
            oldThumbnail.setPath(newThumbnail.getPath());
        }
        catch (MinioException e){
            throw new InternalErrorException("Failed to remove old thumbnail: "+e);
        }


        newThumbnail = this.thumbnailRepository.save(oldThumbnail);
        if (newThumbnail == null ) {
            throw new BadRequestException("Failed to save thumbnail.");
        }

        return newThumbnail;
    }

    public void delete(FileEntity thumbnail){

        // delete thumbnail
        try{
            this.minioService.delete(thumbnail.getPath());
        }
        catch (MinioException e){
            throw new InternalErrorException("Failed to remove thumbnail: "+e);
        }

        this.thumbnailRepository.delete(thumbnail);
    }

    private FileEntity processThumbnail(String creatorId, MultipartFile thumbnail) throws BadRequestException, MinioException {

        String imageName, fileExtension, imgPath="";
        InputStream imageContent = null;
        int imageSize = 0;

        try {
            imageName = thumbnail.getOriginalFilename();
            imageContent = thumbnail.getInputStream();
            String[] splitName = imageName.toString().split("\\.", 2);
            fileExtension = splitName[1];
            imageName = splitName[0];
            imageSize = imageContent.available();
        } catch (Exception e) {
            throw new BadRequestException("Thumbnail file is invalid. " + e);
        }

        // hash filename to avoid issues with files with same name
        String finalName = this.minioService.getHashedFileName(imageName) + "." + fileExtension;
        imgPath = "assets/img/" + finalName;

        //check if thumbnail is valid
        if (this.minioService.validateImageSize(imageSize) == false)
            throw new BadRequestException("Failed to process thumbnail: " +
                    "image size is too big. Size should be under "+
                    this.minioService.MAX_IMAGE_SIZE_MB+" MB");

        if (this.minioService.validateImageFileExt(fileExtension) == false)
            throw new BadRequestException("Failed to process thumbnail: " +
                    "invalid file extension. File should be "+
                    java.util.Arrays.asList(MinioService.ValidImageTypes.values()));

        // save thumbnail into minio
        this.minioService.uploadFile(imgPath, imageContent);

        // set file thumbnail
        FileEntity newThumbnail = new FileEntity(creatorId, creatorId, imageName,
                imgPath, "img/"+fileExtension);
        return newThumbnail;
    }


}
