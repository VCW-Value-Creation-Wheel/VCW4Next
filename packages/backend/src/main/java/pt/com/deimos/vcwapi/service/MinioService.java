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

/**
 * This is based on the implementation in request4eo requestAPI
 */
@Service
public class MinioService {

    @Autowired
    private MinioClient minioClient;

    @Value("${vcw4next.minio.bucket}")
    private String bucket;

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
            // FIXME: according to minio docs and github,
            //the urls expire after 7 days max
            //this is an issue

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




}
