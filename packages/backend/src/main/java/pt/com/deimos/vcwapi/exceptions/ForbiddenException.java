package pt.com.deimos.vcwapi.exceptions;

import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.FORBIDDEN)
@NoArgsConstructor
public class ForbiddenException extends RuntimeException{

    public ForbiddenException(String message){
        super(message);
    }

}
