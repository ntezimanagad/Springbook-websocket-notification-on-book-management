package com.learn.book.service;

import java.util.List;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.learn.book.dto.BookDto;
import com.learn.book.exception.BookNotFoundException;
import com.learn.book.exception.DuplicateBookException;
import com.learn.book.mapper.BookMapper;
import com.learn.book.model.Book;
import com.learn.book.repository.BookRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookService {
    private final SimpMessagingTemplate messagingTemplate;
    private final BookRepository bookRepository;
    private final BookMapper bookMapper;

    public List<BookDto> getAllBook() {
        try {
            return bookRepository.findAll()
                    .stream()
                    .map(bookMapper::toDto)
                    .toList();
        } catch (Exception e) {
            e.printStackTrace();
            return List.of();
        }
    }

    public BookDto createBook(BookDto bookDto) {
        bookRepository.findByTitle(bookDto.getTitle()).ifPresent(existing -> {
            throw new DuplicateBookException("A book with the title '" + bookDto.getTitle() + "' already exists.");
        });

        Book book = bookMapper.toEntity(bookDto);
        Book saved = bookRepository.save(book);
        messagingTemplate.convertAndSend("/topic/books", saved);
        return bookMapper.toDto(saved);
    }

    public void deleteBook(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException("Book with ID '" + id + "' not found."));

        bookRepository.delete(book);
    }

    public BookDto updateBook(Long id, BookDto bookDto) {
        Book existingBook = bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException("Book with ID '" + id + "' not found."));

        bookMapper.updateBookFromDto(bookDto, existingBook);
        Book saved = bookRepository.save(existingBook);

        messagingTemplate.convertAndSend("/topic/books", bookMapper.toDto(saved));

        return bookMapper.toDto(saved);
    }

}
