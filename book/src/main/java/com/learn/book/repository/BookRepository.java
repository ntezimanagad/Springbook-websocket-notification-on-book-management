package com.learn.book.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learn.book.model.Book;

public interface BookRepository extends JpaRepository<Book, Long> {
    Optional<Book> findByTitle(String title);
}
