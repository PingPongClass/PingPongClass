package com.pingpong.backend.api.repository;

import com.pingpong.backend.api.domain.ClassEntity;
import com.pingpong.backend.api.domain.TeacherEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClassRepository extends JpaRepository<ClassEntity, Integer> {
    List<ClassEntity> findByTeacherEntity(TeacherEntity teacherEntity);
    List<ClassEntity> findByClassDayOrderByTimetableEntityAsc(int classDay);
    List<ClassEntity> findByTeacherEntityAndClassDayOrderByTimetableEntityAsc(TeacherEntity teacherEntity, int classDay);
    List<ClassEntity> findByClassIdAndClassTitleContaining(int classId, String classTitle);

    List<ClassEntity> findByClassTitleContains(String classTitle);
}