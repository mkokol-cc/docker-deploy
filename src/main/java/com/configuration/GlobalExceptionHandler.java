package com.configuration;

import java.nio.file.AccessDeniedException;

import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.MalformedJwtException;

//import io.jsonwebtoken.ExpiredJwtException;
//import io.jsonwebtoken.JwtException;
//import io.jsonwebtoken.MalformedJwtException;

@EnableWebMvc
@ControllerAdvice
public class GlobalExceptionHandler {

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    @ExceptionHandler(Exception.class)
    public String handleException(Exception ex) {
        System.err.println("Tipo de Excepción: " + ex.getClass().getName());
        ex.printStackTrace();
        return ("Error interno del servidor. Por favor, intenta nuevamente más tarde.");
    }
	

    @ExceptionHandler
    @ResponseStatus(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
    @ResponseBody
    public String getErrorMessage(HttpMediaTypeNotSupportedException ex) {
        return "El contenido debe ser de tipo "+ex.getSupportedMediaTypes()+", "+ex.getContentType()+" no soportado.";
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public String getErrorMessage(HttpMessageNotReadableException ex) {
        Throwable mostSpecificCause = ex.getMostSpecificCause();
        if (mostSpecificCause != null) {
            String exceptionName = mostSpecificCause.getClass().getName();
            String message = mostSpecificCause.getMessage();
            return (exceptionName + ": " + message);
        }
        return (ex.getMessage());
    }
    
    
    /**
     * AccessDeniedException
     * */
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    @ExceptionHandler(AccessDeniedException.class)
    public String handleAccessDeniedException(AccessDeniedException ex) {
        return ("Usuario no autorizado.");
    }
    
    
    /**
     * --JWT EXCEPTIONS
     */
    
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    @ExceptionHandler(BadCredentialsException.class)
    public String handleBadCredentialsException(BadCredentialsException ex) {
        return ("Email o contraseña incorrecta.");
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    @ExceptionHandler(UsernameNotFoundException.class)
    public String handleUsernameNotFoundException(UsernameNotFoundException ex) {
        return ("Usuario no encontrado.");
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    @ExceptionHandler(ExpiredJwtException.class)
    public String handleExpiredJwtException(ExpiredJwtException ex) {
        return ("Sesión expirada.");//token expirado
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    @ExceptionHandler(JwtException.class)
    public String handleJwtException(JwtException ex) {
        return ("Token inválido.");
    }
    
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    @ExceptionHandler(MalformedJwtException.class)
    public String handleMalformedJwtException(MalformedJwtException ex) {
        return ("Token inválido.");
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    @ExceptionHandler(SecurityException.class)
    public String handleSecurityException(SecurityException ex) {
        return ("Error de seguridad.");
    }
    
    
    /**
     * --Validation EXCEPTIONS
     */
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ResponseBody
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public String handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        return /*"Error en el campo "+ex.getFieldError().getField()+": "+*/ex.getFieldError().getDefaultMessage();
    }
    
    
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    @ExceptionHandler(CustomUniqueConstraintViolationException.class)
    public String handleCustomUniqueConstraintViolationException(CustomUniqueConstraintViolationException ex) {
        return ex.getMessage();
    }
    
    
}
