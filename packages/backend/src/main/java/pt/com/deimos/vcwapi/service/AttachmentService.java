package pt.com.deimos.vcwapi.service;

import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import io.minio.errors.MinioException;
import pt.com.deimos.vcwapi.entity.FileEntity;
import pt.com.deimos.vcwapi.entity.VcwEntity;
import pt.com.deimos.vcwapi.exceptions.BadRequestException;
import pt.com.deimos.vcwapi.exceptions.InternalErrorException;
import pt.com.deimos.vcwapi.repository.ThumbnailRepository;

@Service
public class AttachmentService {

    @Autowired
    private ThumbnailRepository thumbnailRepository;

    @Autowired
    private MinioService minioService;

    public Optional<FileEntity> getByVcwId(Long vcwId) {
        return this.thumbnailRepository.findByVcwsId(vcwId);
    }

    public Optional<FileEntity> getByIdAndVcwId(Long id, Long vcwId){
        return this.thumbnailRepository.findByIdAndVcwsId(id, vcwId);
    }

    public FileEntity saveAttachment(String userId, VcwEntity vcw,
                                    MultipartFile attachment) {

        FileEntity newAttachment = null;
        try{
            newAttachment = processAttachment(userId, attachment);
            Set<FileEntity> setFileEntity = vcw.getAttachments();            
            Set<VcwEntity> setVcws = new HashSet<>();
            setFileEntity.add(newAttachment);
            vcw.setAttachments(setFileEntity);
            setVcws.add(vcw);
            newAttachment.setVcws(setVcws);
        }
        catch (MinioException e){
            throw new InternalErrorException("Failed to save attachment: "+e);
        }

        newAttachment = this.thumbnailRepository.save(newAttachment);
        if (newAttachment == null ) {
            throw new BadRequestException("Failed to save attachment.");
        }

        return newAttachment;
    }

    private FileEntity processAttachment(String creatorId, MultipartFile attachment) throws BadRequestException, MinioException {

        String attachmentName, fileExtension, attachmentPath="";
        InputStream attachmentContent = null;
        int attachmentSize = 0;

        try {
            attachmentName = attachment.getOriginalFilename();
            attachmentContent = attachment.getInputStream();
            String[] splitName = attachmentName.toString().split("\\.", 2);
            fileExtension = splitName[1];
            attachmentName = splitName[0];
            attachmentSize = attachmentContent.available();
        } catch (Exception e) {
            throw new BadRequestException("Attachment file is invalid. " + e);
        }

        // hash filename to avoid issues with files with same name
        String finalName = this.minioService.getHashedFileName(attachmentName) + "." + fileExtension;
        attachmentPath = "assets/doc/" + finalName;

        //check if attachment is valid
        if (this.minioService.validateDocumentSize(attachmentSize) == false)
            throw new BadRequestException("Failed to process attachment: " +
                    "doc size is too big. Size should be under "+
                    this.minioService.MAX_DOC_SIZE_MB+" MB");

        if (this.minioService.validateDocumentFileExt(fileExtension) == false)
            throw new BadRequestException("Failed to process attachment: " +
                    "invalid file extension. File should be "+
                    java.util.Arrays.asList(MinioService.ValidDocTypes.values()));

        // save attachment into minio
        this.minioService.uploadFile(attachmentPath, attachmentContent);

        // set file attachment
        FileEntity newAttachment= new FileEntity(creatorId, creatorId, attachmentName,
                attachmentPath, "doc/"+fileExtension);
        return newAttachment;
    }

    public FileEntity update(String userId, FileEntity oldAttachment,
                             MultipartFile attachment) {

        // NOTE: since frontend is still limited, the only update would be to
        // replace a previously existing attachment
        // change this later if we need to update more attributes besides content

        //create new replacement attachment
        FileEntity newAttachment = null;
        try{
            newAttachment = processAttachment(userId, attachment);
            oldAttachment.setFileType(newAttachment.getFileType());
            oldAttachment.setName(newAttachment.getName());
            oldAttachment.setUpdatedBy(userId);
            oldAttachment.setUpdatedAt(LocalDateTime.now());
        }
        catch (MinioException e){
            throw new InternalErrorException("Failed to update attachment: "+e);
        }

        // delete old attachment
        try{
            this.minioService.delete(oldAttachment.getPath());
            oldAttachment.setPath(newAttachment.getPath());
        }
        catch (MinioException e){
            throw new InternalErrorException("Failed to remove old attachment: "+e);
        }


        newAttachment = this.thumbnailRepository.save(oldAttachment);
        if (newAttachment == null ) {
            throw new BadRequestException("Failed to save attachment.");
        }

        return newAttachment;
    }

    public void delete(FileEntity attachment){

        // delete attachment
        try{
            this.minioService.delete(attachment.getPath());
        }
        catch (MinioException e){
            throw new InternalErrorException("Failed to remove attachment: "+e);
        }

        this.thumbnailRepository.delete(attachment);
    }
    
}
