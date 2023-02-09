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
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Arrays;

/**
 * This is based on the implementation in request4eo requestAPI
 */
@Service
public class MinioService {

    @Autowired
    private MinioClient minioClient;

    @Value("${vcw4next.minio.bucket}")
    private String bucket;

    public enum ValidImageTypes {png, jpeg, jpg};

    public enum ValidDocTypes {pdf, doc, docx, xls, xlsx, ppt, pptx, txt, zip};

    public static final int MAX_IMAGE_SIZE_MB = 2;

    public static final int MAX_DOC_SIZE_MB = 8;

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

        if (fileSize / (1024 * 1024) > MAX_DOC_SIZE_MB)
            return false;

        return true;
    }

    public boolean validateDocumentFileExt(String fileExt){

        for (ValidDocTypes type : ValidDocTypes.values()){
            if (fileExt.toLowerCase().equals(type.toString()))
                return true;
        }
        return false;
    }

    public boolean validateImageSize(int fileSize){

        if (fileSize / (1024 * 1024) > MAX_IMAGE_SIZE_MB)
            return false;

        return true;
    }

    public boolean validateImageFileExt(String fileExt){

        for (ValidImageTypes type : ValidImageTypes.values()){
            if (fileExt.toLowerCase().equals(type.toString()))
                return true;
        }
        return false;
    }

    public String getHashedFileName(String filename) throws NoSuchAlgorithmException {

        MessageDigest digest = MessageDigest.getInstance("MD5");
        byte[] encodedhash = digest.digest(filename.getBytes(StandardCharsets.UTF_8));
        byte[] salt = getNextSalt();
        byte[] result = Arrays.copyOf(encodedhash, encodedhash.length + salt.length);
        System.arraycopy(salt, 0, result, encodedhash.length, salt.length);

        return bytesToHex(result);
    }

    // Note:hash methods taken from spring docs:
    // https://www.baeldung.com/sha-256-hashing-java
    private static String bytesToHex(byte[] hash) {
        StringBuilder hexString = new StringBuilder(2 * hash.length);
        for (int i = 0; i < hash.length; i++) {
            String hex = Integer.toHexString(0xff & hash[i]);
            if(hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }

    private static byte[] getNextSalt() {
        byte[] salt = new byte[16];
        new SecureRandom().nextBytes(salt);
        return salt;
    }
}
