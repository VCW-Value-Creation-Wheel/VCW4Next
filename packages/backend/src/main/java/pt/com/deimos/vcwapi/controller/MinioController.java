package pt.com.deimos.vcwapi.controller;

import org.apache.commons.compress.utils.IOUtils;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pt.com.deimos.vcwapi.service.MinioService;

import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;

/**
 * This controller was created for testing minio interactions.
 * The methods here are not available at api for securrity reasoons
 * But the code can be reused and integrated in other parts of the backend
 * if needed later
 */
@RestController
@RequestMapping("/v1/files")
@ConditionalOnProperty(prefix="minio.controller", name="enabled")
public class MinioController {

    private final MinioService minioService;

    public MinioController(MinioService minioService) {
        this.minioService = minioService;
    }

    @GetMapping("/{filename}")
    public void getFile(@PathVariable(value = "filename") String filename) {
        try {
            InputStream result = this.minioService.downloadFile("assets/img/"+filename);

            File target = new File("src/main/resources/"+filename);
            Files.copy(
                    result,
                    target.toPath(),
                    StandardCopyOption.REPLACE_EXISTING);

            IOUtils.closeQuietly(result);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


}
