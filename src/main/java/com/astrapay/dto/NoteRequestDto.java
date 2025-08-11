package com.astrapay.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * DTO for note creation and update requests
 */
public class NoteRequestDto {

    @NotBlank(message = "Title is required")
    @Size(min = 1, max = 255, message = "Title must be between 1 and 255 characters")
    private String title;

    @NotBlank(message = "Content is required")
    @Size(min = 1, message = "Content cannot be empty")
    private String content;

    // Default constructor
    public NoteRequestDto() {
    }

    // Constructor with fields
    public NoteRequestDto(String title, String content) {
        this.title = title;
        this.content = content;
    }

    // Getters and Setters
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
