package com.pingpong.backend.api.repository;

import com.pingpong.backend.api.domain.LogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface LogRepository extends JpaRepository<LogEntity, Integer> {
    //한 학생의 포인트 잔디 리스트 가져오기
    //FIXME
    @Query(value="SELECT reg_date, SUM(point) point FROM log WHERE student_id = :studentId GROUP BY reg_date", nativeQuery = true)
    List<Map<String, Integer>> getPoint(@Param("studentId") int studentId);
}
