package com.learn.book.mapper;

import org.mapstruct.Mapper;

import com.learn.book.dto.NotificationDto;
import com.learn.book.model.NotificationEntity;

@Mapper(componentModel = "spring")
public interface NotificationMapper {
    NotificationDto toDto(NotificationEntity entity);

    NotificationEntity toEntity(NotificationDto dto);
}
