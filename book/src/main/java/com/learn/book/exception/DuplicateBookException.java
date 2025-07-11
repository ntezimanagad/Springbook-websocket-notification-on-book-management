package com.learn.book.exception;

public class DuplicateBookException extends RuntimeException {
    public DuplicateBookException(String message) {
        super(message);
    }
}
