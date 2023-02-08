package pt.com.deimos.vcwapi.service;

import io.minio.GetObjectArgs;
import io.minio.GetPresignedObjectUrlArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.errors.MinioException;
import io.minio.http.Method;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

/**
 * This is based on the implementation in request4eo requestAPI
 */
@Service
public class MinioService {

    @Autowired
    private MinioClient minioClient;

    @Value("${vcw4next.minio.bucket}")
    private String bucket;

    private enum ValidImageTypes {png, jpeg, jpg};

    private enum ValidDocTypes {pdf, doc, docx, xls, xlsx, ppt, pptx, txt, zip};

    private static final int MAX_IMAGE_SIZE_MB = 2;

    private static final int MAX_DOC_SIZE_MB = 8;

    public InputStream downloadFile(String filePath) throws MinioException {
        InputStream result;
        try {
            //get file from bucket
            result = minioClient.getObject(GetObjectArgs.builder()
                    .bucket(bucket)
                    .object(filePath)
                    .build());
        }
        catch (Exception e) {
            String message = "Failed to download file from Minio: " + e;
            System.err.println(message);
            throw new MinioException(message);
        }
        return result;
    }

    public void uploadFile(String filePath, InputStream file) throws MinioException {

        try {
            PutObjectArgs args = PutObjectArgs.builder()
                    .bucket(bucket)
                    .object(filePath)
                    .stream(file, file.available(), -1)
                    .build();
            minioClient.putObject(args);
        } catch (Exception e) {
            String message = "Failed to upload file to Minio: " + e;
            System.err.println(message);
            throw new MinioException(message);
        }
    }

    public String getDownloadUrl(String filePath) throws MinioException {

        try {
            return minioClient.getPresignedObjectUrl(
                    GetPresignedObjectUrlArgs.builder()
                            .method(Method.GET)
                            .bucket(bucket)
                            .object(filePath)
                            .build());

        } catch (Exception e) {
            String message = "Failed to get file download url from Minio: " + e;
            System.err.println(message);
            throw new MinioException(message);
        }
    }

    public boolean validateDocumentSize(int fileSize){

        if (fileSize > MAX_DOC_SIZE_MB)
            return false;

        return true;
    }

    public boolean validateDocumentFileExt(String fileExt){

        for (ValidDocTypes type : ValidDocTypes.values()){
            if (fileExt.toLowerCase() == type.name())
                return true;
        }
        return false;
    }

    public boolean validateImageSize(int fileSize){

        if (fileSize > MAX_IMAGE_SIZE_MB)
            return false;

        return true;
    }

    public boolean validateImageFileExt(String fileExt){

        for (ValidImageTypes type : ValidImageTypes.values()){
            if (fileExt.toLowerCase() == type.name())
                return true;
        }
        return false;
    }

}
