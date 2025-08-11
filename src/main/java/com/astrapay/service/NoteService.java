package com.astrapay.service;

import com.astrapay.dto.NoteDto;
import com.astrapay.dto.NoteRequestDto;
import com.astrapay.entity.Note;
import com.astrapay.exception.NoteNotFoundException;
import com.astrapay.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service class for note business operations
 */
@Service
public class NoteService {

    private final NoteRepository noteRepository;

    @Autowired
    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    /**
     * Create a new note
     *
     * @param noteRequestDto the note data
     * @return the created note
     */
    public NoteDto createNote(NoteRequestDto noteRequestDto) {
        Note note = new Note(noteRequestDto.getTitle(), noteRequestDto.getContent());
        
        Note savedNote = noteRepository.save(note);
        return convertToDto(savedNote);
    }

    /**
     * Get all notes
     *
     * @return list of all notes
     */
    public List<NoteDto> getAllNotes() {
        return noteRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Get a note by ID
     *
     * @param id the note ID
     * @return the note
     * @throws NoteNotFoundException if note not found
     */
    public NoteDto getNoteById(Long id) {
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new NoteNotFoundException("Note not found with id: " + id));
        return convertToDto(note);
    }

    /**
     * Update a note
     *
     * @param id the note ID
     * @param noteRequestDto the updated note data
     * @return the updated note
     * @throws NoteNotFoundException if note not found
     */
    public NoteDto updateNote(Long id, NoteRequestDto noteRequestDto) {
        Note existingNote = noteRepository.findById(id)
                .orElseThrow(() -> new NoteNotFoundException("Note not found with id: " + id));
        
        existingNote.setTitle(noteRequestDto.getTitle());
        existingNote.setContent(noteRequestDto.getContent());
        
        Note updatedNote = noteRepository.save(existingNote);
        return convertToDto(updatedNote);
    }

    /**
     * Delete a note
     *
     * @param id the note ID
     * @throws NoteNotFoundException if note not found
     */
    public void deleteNote(Long id) {
        if (!noteRepository.existsById(id)) {
            throw new NoteNotFoundException("Note not found with id: " + id);
        }
        noteRepository.deleteById(id);
    }

    /**
     * Convert Note entity to NoteDto
     *
     * @param note the note entity
     * @return the note DTO
     */
    private NoteDto convertToDto(Note note) {
        return new NoteDto(
                note.getId(),
                note.getTitle(),
                note.getContent()
        );
    }
}
