package com.pingpong.backend.api.repository;

import com.pingpong.backend.api.domain.LogEntity;
import com.pingpong.backend.api.domain.StudentEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<StudentEntity, Integer>, JpaSpecificationExecutor<StudentEntity> {

    Optional<StudentEntity> findByStudentId(int studentId);

    boolean existsByEmail(String email);

    //mysql버전 8이상이어야 rank함수 사용 가능 -> dense_rank()쓰고싶다
    //FIXME
    @Query(value="SELECT name, totalPoint, introduce FROM student ORDER BY totalPoint DESC LIMIT 10", nativeQuery = true)
    List<StudentEntity> getRanking();

    //FIXME
    @Query(value="SELECT regDate, SUM(point) point FROM log WHERE studentId = :studentId GROUP BY reg_date", nativeQuery = true)
    List<LogEntity> getPoint(@Param("studentId") int studentId);

}

