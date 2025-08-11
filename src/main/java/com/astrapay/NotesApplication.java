package com.astrapay;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main application class for Notes service
 */
@SpringBootApplication
public class NotesApplication {
    
    /**
     * Main app entry point
     */
    public static void main(String[] args) {
        SpringApplication.run(NotesApplication.class, args);
    }
}
