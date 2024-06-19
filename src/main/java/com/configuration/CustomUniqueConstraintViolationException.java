package com.configuration;

public class CustomUniqueConstraintViolationException extends RuntimeException {

    public CustomUniqueConstraintViolationException(String message) {
        super(message);
    }
}
