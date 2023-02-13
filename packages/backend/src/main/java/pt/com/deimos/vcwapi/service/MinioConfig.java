package pt.com.deimos.vcwapi.service;

import io.minio.MinioClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * This is based on the implementation in request4eo requestAPI
 */
@Configuration
public class MinioConfig {

        @Value("${vcw4next.minio.endpoint}")
        private String endpoint;

        @Value("${vcw4next.minio.credentials.access-key}")
        private String accessKey;

        @Value("${vcw4next.minio.credentials.secret-key}")
        private String secretKey;

        @Bean
        public MinioClient minioClient() {

            return MinioClient.builder()
                    .endpoint(endpoint)
                    .credentials(accessKey, secretKey)
                    .build();
        }

}
