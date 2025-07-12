package com.learn.book.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.learn.book.dto.BookDto;

@Controller
@CrossOrigin("*")
public class BookSocketController {

    @MessageMapping("/books")
    @SendTo("/topic/books")
    public BookDto handleBookUpdate(BookDto book) {
        // logic, or just echo
        return book;
    }
}
