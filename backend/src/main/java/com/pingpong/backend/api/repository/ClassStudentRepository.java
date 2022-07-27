package com.pingpong.backend.api.repository;

import com.pingpong.backend.api.domain.ClassEntity;
import com.pingpong.backend.api.domain.ClassStudentEntity;
import com.pingpong.backend.api.domain.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClassStudentRepository extends JpaRepository<ClassStudentEntity, Integer> {
    List<ClassStudentEntity> findByStudentEntity(StudentEntity studentEntity);
    List<ClassStudentEntity> findByClassEntity(ClassEntity classEntity);
}