package com.astrapay.controller;

import com.astrapay.dto.NoteDto;
import com.astrapay.dto.NoteRequestDto;
import com.astrapay.service.NoteService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * REST controller for note operations
 */
@RestController
@RequestMapping("/api/v1/notes")
@Validated
@Api(value = "Notes API", description = "Operations for managing notes")
public class NoteController {

    private final NoteService noteService;

    @Autowired
    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    /**
     * Create a new note
     */
    @PostMapping
    @ApiOperation(value = "Create a new note")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Note created successfully", response = NoteDto.class),
            @ApiResponse(code = 400, message = "Invalid input data")
    })
    public ResponseEntity<NoteDto> createNote(@Valid @RequestBody NoteRequestDto noteRequestDto) {
        NoteDto createdNote = noteService.createNote(noteRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdNote);
    }

    /**
     * Get all notes
     */
    @GetMapping
    @ApiOperation(value = "Get all notes")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved notes", response = NoteDto.class, responseContainer = "List")
    })
    public ResponseEntity<List<NoteDto>> getAllNotes() {
        List<NoteDto> notes = noteService.getAllNotes();
        return ResponseEntity.ok(notes);
    }

    /**
     * Get a note by ID
     */
    @GetMapping("/{id}")
    @ApiOperation(value = "Get a note by ID")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successfully retrieved note", response = NoteDto.class),
            @ApiResponse(code = 404, message = "Note not found")
    })
    public ResponseEntity<NoteDto> getNoteById(@PathVariable Long id) {
        NoteDto note = noteService.getNoteById(id);
        return ResponseEntity.ok(note);
    }

    /**
     * Update a note
     */
    @PutMapping("/{id}")
    @ApiOperation(value = "Update a note")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Note updated successfully", response = NoteDto.class),
            @ApiResponse(code = 400, message = "Invalid input data"),
            @ApiResponse(code = 404, message = "Note not found")
    })
    public ResponseEntity<NoteDto> updateNote(@PathVariable Long id, @Valid @RequestBody NoteRequestDto noteRequestDto) {
        NoteDto updatedNote = noteService.updateNote(id, noteRequestDto);
        return ResponseEntity.ok(updatedNote);
    }

    /**
     * Delete a note
     */
    @DeleteMapping("/{id}")
    @ApiOperation(value = "Delete a note")
    @ApiResponses(value = {
            @ApiResponse(code = 204, message = "Note deleted successfully"),
            @ApiResponse(code = 404, message = "Note not found")
    })
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        noteService.deleteNote(id);
        return ResponseEntity.noContent().build();
    }
}
