package pt.com.deimos.vcwapi.exceptions;

import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.UNAUTHORIZED)
@NoArgsConstructor
public class UnauthorizedException extends RuntimeException{

    public UnauthorizedException(String message){
        super(message);
    }

}
