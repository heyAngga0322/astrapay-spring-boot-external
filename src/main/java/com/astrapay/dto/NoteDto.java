package com.astrapay.dto;

/**
 * DTO for note response data
 */
public class NoteDto {

    private Long id;
    private String title;
    private String content;

    // Default constructor
    public NoteDto() {
    }

    // Constructor with fields
    public NoteDto(Long id, String title, String content) {
        this.id = id;
        this.title = title;
        this.content = content;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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
