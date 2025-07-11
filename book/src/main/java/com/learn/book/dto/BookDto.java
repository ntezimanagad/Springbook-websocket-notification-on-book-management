package com.learn.book.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookDto {
    private Long id;

    private String title;

    private String author;

    private Integer yearPublished;
}