package com.pingpong.backend.api.repository;

import com.pingpong.backend.api.domain.ClassEntity;
import com.pingpong.backend.api.domain.NoticeEntity;
import com.pingpong.backend.api.domain.TeacherEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoticeRepository extends JpaRepository<NoticeEntity, Integer> {
    List<NoticeEntity> findByClassEntity(ClassEntity classEntity, Sort sort);
    List<NoticeEntity> findByTitleContaining(String title, Sort sort);
    List<NoticeEntity> findByClassEntityAndTitleContaining(ClassEntity classEntity, String title, Sort sort);
}