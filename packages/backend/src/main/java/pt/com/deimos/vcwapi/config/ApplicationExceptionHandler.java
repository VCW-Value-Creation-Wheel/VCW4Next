package pt.com.deimos.vcwapi.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import pt.com.deimos.vcwapi.exceptions.CriteriasNotFoundException;
import pt.com.deimos.vcwapi.exceptions.IdeaAndCriteriasNotFoundException;
import pt.com.deimos.vcwapi.exceptions.IdeasNotFoundException;

import pt.com.deimos.vcwapi.exceptions.ErrorResponse;

import java.util.Arrays;

@ControllerAdvice
public class ApplicationExceptionHandler  extends ResponseEntityExceptionHandler {

    @ExceptionHandler(IdeasNotFoundException.class)
    public ResponseEntity<Object> handleIdeasNotFoundException(IdeasNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(HttpStatus.NOT_FOUND.value(), Arrays.asList(ex.getLocalizedMessage()));
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(CriteriasNotFoundException.class)
    public ResponseEntity<Object> handleCriteriasNotFoundException(IdeasNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(HttpStatus.NOT_FOUND.value(), Arrays.asList(ex.getLocalizedMessage()));
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(IdeaAndCriteriasNotFoundException.class)
    public ResponseEntity<Object> handleCriteriasNotFoundException(IdeaAndCriteriasNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(HttpStatus.NOT_FOUND.value(), Arrays.asList(ex.getLocalizedMessage()));
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

}
