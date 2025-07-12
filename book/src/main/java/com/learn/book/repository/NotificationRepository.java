package com.learn.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learn.book.model.NotificationEntity;

public interface NotificationRepository extends JpaRepository<NotificationEntity, Long> {

    // List<NotificationEntity> findByRecipientUsernameOrderByIdDesc(String
    // username);

    // long countByRecipientUsernameAndReadFalse(String username);
}
