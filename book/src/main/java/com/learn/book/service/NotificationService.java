package com.learn.book.service;

import java.util.List;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.learn.book.dto.NotificationDto;
import com.learn.book.exception.NotificationNotFoundException;
import com.learn.book.mapper.NotificationMapper;
import com.learn.book.model.NotificationEntity;
import com.learn.book.repository.NotificationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository repository;
    private final NotificationMapper mapper;
    private final SimpMessagingTemplate messagingTemplate;

    public NotificationDto sendNotification(NotificationDto notificationDto) {
        NotificationEntity entity = mapper.toEntity(notificationDto);
        NotificationEntity saved = repository.save(entity);

        NotificationDto dto = mapper.toDto(saved);
        messagingTemplate.convertAndSend("/topic/notifications", dto);

        return dto;
    }

    public List<NotificationDto> getAll() {
        return repository.findAll()
                .stream()
                .map(mapper::toDto)
                .toList();
    }

    public void markAsRead(Long id) {
        NotificationEntity entity = repository.findById(id)
                .orElseThrow(() -> new NotificationNotFoundException("Notification not found"));

        entity.setRead(true);
        repository.save(entity);
    }
}
