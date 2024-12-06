package pt.com.deimos.vcwapi.exceptions;

import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
@NoArgsConstructor
public class BadRequestException extends RuntimeException{

    public BadRequestException(String message){
        super(message);
    }

}
