package com.astrapay.exception;

/**
 * Exception thrown when a note is not found in the system
 */
public class NoteNotFoundException extends RuntimeException {

    /**
     * Constructor with message
     *
     * @param message the error message
     */
    public NoteNotFoundException(String message) {
        super(message);
    }

    /**
     * Constructor with message and cause
     *
     * @param message the error message
     * @param cause the cause of the exception
     */
    public NoteNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
