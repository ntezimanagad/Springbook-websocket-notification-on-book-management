package com.learn.book.controller;

import com.learn.book.dto.NotificationDto;
import com.learn.book.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    // ✅ GET all notifications
    @GetMapping
    public ResponseEntity<List<NotificationDto>> getAllNotifications() {
        List<NotificationDto> notifications = notificationService.getAll();
        return ResponseEntity.ok(notifications);
    }

    // ✅ POST: send a notification
    @PostMapping
    public ResponseEntity<NotificationDto> sendNotification(@RequestBody NotificationDto notificationDto) {
        NotificationDto sentNotification = notificationService.sendNotification(notificationDto);
        return ResponseEntity.ok(sentNotification);
    }

    // ✅ PATCH: mark as read
    @PatchMapping("/{id}/read")
    public ResponseEntity<Void> markAsRead(@PathVariable Long id) {
        notificationService.markAsRead(id);
        return ResponseEntity.noContent().build();
    }
}
