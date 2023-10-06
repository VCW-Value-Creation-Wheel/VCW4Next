package pt.com.deimos.vcwapi.service;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import pt.com.deimos.vcwapi.dto.KeycloakUserDTO;
import pt.com.deimos.vcwapi.dto.TokenDTO;
import pt.com.deimos.vcwapi.exceptions.BadRequestException;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

import static org.springframework.web.reactive.function.BodyInserters.fromFormData;

//NOTE: https://www.baeldung.com/spring-webclient-json-list

@Service
public class KeycloakService {

    @Value("${identity.admin.url}")
    private String identityAdminUrl;

    @Value("${identity.token.url}")
    private String identityTokenUrl;

    @Value("${identity.admin.client}")
    private String identityAdminClient;

    @Value("${identity.admin.user}")
    private String username;

    @Value("${identity.admin.password}")
    private String password;

    @Value("${identity.admin.grant}")
    private String grantType;

    private final WebClient webClient;

    public KeycloakService() {
        this.webClient = WebClient.create();
    }

    private TokenDTO getToken(){

        TokenDTO response = webClient.post()
                .uri(this.identityTokenUrl)
                .body(fromFormData("client_id", identityAdminClient)
                .with("username", username)
                .with("password", password)
                .with("grant_type", grantType))
                .retrieve()
                .bodyToMono(TokenDTO.class)
                .block();
        return response;
    }
    public List<KeycloakUserDTO> getUsersByUsername(String username, String tokenValue) {

        String accessToken = getToken().getAccessToken();

        String path = this.identityAdminUrl+"/users?username="+username;

            KeycloakUserDTO[] response = webClient.get()
                    .uri(path)
                    .headers(h->h.setBearerAuth(accessToken))
                    .retrieve()
                    .bodyToMono(KeycloakUserDTO[].class)
                    .block();
        return List.of(response);
    }




    private Mono<? extends Throwable> handleErrorResponse(HttpStatus statusCode) {

        // Handle non-success status codes here (e.g., logging or custom error handling)
        return Mono.error(new BadRequestException("Failed to fetch users info from Keycloak. Status code: " + statusCode));
    }
}
