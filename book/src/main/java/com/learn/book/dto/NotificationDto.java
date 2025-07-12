package com.learn.book.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationDto {
    private Long id;

    private String title;
    private String content;
    private boolean read;

    private String timestamp;

    // Optional: for user-specific notifications if you want multi-user support
    // private String recipientUsername;
}
