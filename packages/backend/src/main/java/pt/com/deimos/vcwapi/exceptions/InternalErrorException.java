package pt.com.deimos.vcwapi.exceptions;

import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
@ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR)
@NoArgsConstructor
public class InternalErrorException extends RuntimeException{
    public InternalErrorException(String message){
        super(message);
    }

}
