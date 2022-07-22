package com.pingpong.backend.api.repository;

import com.pingpong.backend.api.domain.NoticeEntity;
import com.pingpong.backend.api.service.NoticeService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<NoticeEntity, Integer> {
}
