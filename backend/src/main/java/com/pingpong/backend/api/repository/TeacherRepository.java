package com.pingpong.backend.api.repository;

import com.pingpong.backend.api.domain.TeacherEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeacherRepository extends JpaRepository<TeacherEntity, Integer> {
    List<TeacherEntity> findTeacherEntitiesByName(String name);

    boolean existsByEmail(String email);

    TeacherEntity findByTeacherId(int teacherId);

}

