package com.pingpong.backend.api.repository;

import com.pingpong.backend.api.domain.TeacherEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TeacherRepository extends JpaRepository<TeacherEntity, Integer> {
    List<TeacherEntity> findTeacherEntitiesByName(String name);

    boolean existsByEmail(String email);

    TeacherEntity findByTeacherId(int teacherId);

    //선생님 중 가장 큰 아이디값
    @Query("SELECT MAX(teacherId)+1 FROM teacher WHERE isAdmin=0")
    Integer getMaxTeacherId();

    //관리자 중 가장 큰 아이디값
    @Query("SELECT MAX(teacherId)+1 FROM teacher WHERE isAdmin=1")
    Integer getMaxAdminId();
}


