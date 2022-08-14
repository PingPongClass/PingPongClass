package com.pingpong.backend.api.repository;

import com.pingpong.backend.api.domain.ClassEntity;
import com.pingpong.backend.api.domain.LogEntity;
import com.pingpong.backend.api.domain.StudentEntity;
import lombok.extern.java.Log;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface LogRepository extends JpaRepository<LogEntity, Integer> {
    //한 학생의 포인트 잔디 리스트 가져오기
    //FIXME
    @Query(value="SELECT reg_date, SUM(point) point FROM log WHERE student_id = :studentId GROUP BY reg_date", nativeQuery = true)
    List<Map<String, Integer>> getPoint(@Param("studentId") int studentId);
    List<LogEntity> findByRegDate(LocalDate regDate);
    @Query(value="SELECT log_id FROM log WHERE class_id = :classId GROUP BY reg_date", nativeQuery = true)
    List<Integer> getdistinctdate(@Param("classId") int classId);
    List<LogEntity> findByRegDateAndStudentEntity(LocalDate regDate, StudentEntity studentEntity);
    List<LogEntity> findByRegDateAndClassEntity(LocalDate regDate, ClassEntity classEntity);
}
