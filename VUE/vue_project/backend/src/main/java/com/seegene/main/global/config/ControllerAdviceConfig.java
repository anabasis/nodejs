package com.seegene.main.global.config;

import java.sql.SQLIntegrityConstraintViolationException;
import java.time.LocalDateTime;
import java.util.Iterator;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import com.seegene.main.global.dto.ErrorMessage;
import com.seegene.main.global.dto.InvalidArguments;
import com.seegene.main.global.exception.BusinessException;
import com.seegene.main.global.exception.EntityExistsException;
import com.seegene.main.global.exception.FeignException;
import com.seegene.main.global.exception.InvalidValueException;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;

@RestControllerAdvice
@Slf4j
public class ControllerAdviceConfig {

    @ExceptionHandler(value = {NullPointerException.class, NoSuchElementException.class, EntityExistsException.class})
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    @ApiResponse(responseCode = "404", description = "Resource does not exists.")
    public ErrorMessage handlerNotFoundFromNPE(Exception ex, WebRequest request){
        log.error("Error : ", ex);

        return ErrorMessage.builder()
                .statusCode(HttpStatus.NOT_FOUND.value())
                .message(ex.getMessage())
                .description(request.getDescription(false))
                .timestamp(LocalDateTime.now())
                .build();
    }

    @ExceptionHandler(value = {BusinessException.class})
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ApiResponse(responseCode = "400", description = "Resource does not exists.")
    public ErrorMessage handlerBusinessException(BusinessException e, WebRequest request){
        log.error("BusinessException Error : ", e);

        return ErrorMessage.builder()
            .statusCode(e.getErrorCode().getCode())
            .message(e.getErrorCode().getDefaultMessage())
            .description(request.getDescription(false))
            .timestamp(LocalDateTime.now())
            .build();
    }

    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = {MethodArgumentNotValidException.class})
    @ApiResponse(responseCode = "400", description = "Resource does not exists.")
    public List<InvalidArguments> handleValidation(MethodArgumentNotValidException e) {
        log.error("Validation Error : ", e);
        return e.getBindingResult().getFieldErrors().stream()
            .map(fieldError -> new InvalidArguments(fieldError.getField(), fieldError.getRejectedValue(), fieldError.getDefaultMessage())).collect(
                Collectors.toList());
    }

    @ExceptionHandler(value = {BindException.class})
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ErrorMessage handlerBindException(BindException ex, WebRequest request){
        String msg = "";
        for(FieldError fieldError : ex.getBindingResult().getFieldErrors()){
            msg += String.format("\n%s : %s [%s]",
                    fieldError.getField(),
                    fieldError.getDefaultMessage(),
                    fieldError.getRejectedValue()
            );
        }

        return ErrorMessage.builder()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .message(msg)
                .description(request.getDescription(false))
                .timestamp(LocalDateTime.now())
                .build();
    }

    @ExceptionHandler(value = {ConstraintViolationException.class})
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ErrorMessage handlerConstraintViolationException(ConstraintViolationException ex, WebRequest request){
        String msg = "";
        Iterator<ConstraintViolation<?>> constraintViolations = ex.getConstraintViolations().iterator();
        while(constraintViolations.hasNext()){
            ConstraintViolation constraintViolation = constraintViolations.next();
            String variableName = constraintViolation.getPropertyPath().toString();
            variableName = variableName.lastIndexOf(".") >= 0
                    ? variableName.substring(variableName.lastIndexOf(".")+1)
                    : variableName;

            msg += String.format("\n%s : %s [%s]", variableName,
                    constraintViolation.getMessage(),
                    constraintViolation.getInvalidValue()
            );
        }

        return ErrorMessage.builder()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .message(msg)
                .description(request.getDescription(false))
                .timestamp(LocalDateTime.now())
                .build();
    }

    @ExceptionHandler(value = {SQLIntegrityConstraintViolationException.class})
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ErrorMessage handlerSQLIntegrityConstraintViolationException(SQLIntegrityConstraintViolationException ex, WebRequest request){
        log.error("Error : ", ex);

        String msg;
        if(ex.getErrorCode()==1452){
            msg = "Requested with code that does not exist";
        }else{
            msg = ex.getMessage();
        }

        return ErrorMessage.builder()
                .statusCode(HttpStatus.NOT_FOUND.value())
                .message(msg)
                .description(request.getDescription(false))
                .timestamp(LocalDateTime.now())
                .build();
    }

    @ExceptionHandler(value = {IllegalArgumentException.class, InvalidValueException.class})
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ErrorMessage handlerIllegalArgumentException(Exception ex, WebRequest request){
        return ErrorMessage.builder()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .message(ex.getMessage())
                .description(request.getDescription(false))
                .timestamp(LocalDateTime.now())
                .build();
    }

    @ExceptionHandler(value = {AuthenticationException.class})
    @ResponseStatus(value = HttpStatus.UNAUTHORIZED)
    @ApiResponse(responseCode = "401", description = """
        invalid token
        * not found user
        * time expired
        """)
    public ErrorMessage handlerUnAuthenticationException(Exception ex, WebRequest request){
        return ErrorMessage.builder()
                .statusCode(HttpStatus.UNAUTHORIZED.value())
                .message(ex.getMessage())
                .description(request.getDescription(false))
                .timestamp(LocalDateTime.now())
                .build();
    }

    @ExceptionHandler(value = HttpMediaTypeNotSupportedException.class)
    @ResponseStatus(value = HttpStatus.UNSUPPORTED_MEDIA_TYPE)
    @ApiResponse(responseCode = "415", description = """
        Content-type: multipart/form-data로 요청해야하는 API를 유의
        """)
    public ErrorMessage handlerHttpMediaTypeNotSupportedException(HttpMediaTypeNotSupportedException ex, WebRequest request){
        String message = ex.getMessage()+
            "\n> Supported MediaType: "+ex.getSupportedMediaTypes().get(0).toString()+
            "\n> Request MediaType: "+ex.getContentType();

        return ErrorMessage.builder()
                .statusCode(HttpStatus.UNSUPPORTED_MEDIA_TYPE.value())
                .message(message)
                .description(request.getDescription(false))
                .timestamp(LocalDateTime.now())
                .build();
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorMessage globalExceptionHandler(Exception ex, WebRequest request) {
        log.error("Error : ", ex);
        return ErrorMessage.builder()
            .statusCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
            .message(ex.getMessage())
            .description(request.getDescription(false))
            .timestamp(LocalDateTime.now())
            .build();
    }

    @ExceptionHandler(FeignException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorMessage handleException(FeignException ex, WebRequest request) {

        log.error("[handleException] Error => " + request.getDescription(false));

        return ErrorMessage.builder()
            .statusCode(ex.getErrorCode().getCode())
            .message(ex.getErrorCode().getDefaultMessage()+" , Detail Message: "+ ex.getExternalErrorMessage().getMessage())
            .description(ex.getExternalErrorMessage().getDescription())
            .timestamp(LocalDateTime.now())
            .build();

    }
}
