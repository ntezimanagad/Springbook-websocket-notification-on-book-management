package com.learn.book.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import com.learn.book.dto.BookDto;
import com.learn.book.model.Book;

@Mapper(componentModel = "spring")
public interface BookMapper {

    BookMapper INSTANCE = Mappers.getMapper(BookMapper.class);

    BookDto toDto(Book book);

    Book toEntity(BookDto dto);

    @Mapping(target = "id", ignore = true)
    void updateBookFromDto(BookDto dto, @MappingTarget Book entity);

}
