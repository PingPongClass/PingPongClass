package com.pingpong.backend.api.repository;

import com.pingpong.backend.api.domain.LogEntity;
import com.pingpong.backend.api.domain.StudentEntity;

import org.springframework.data.jpa.repository.EntityGraph;
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

    List<StudentEntity> findTop10ByOrderByTotalPointDesc();
    int countByTotalPointGreaterThan(int totalPoint);

    //FIXME
    @Query(value="SELECT regDate, SUM(point) point FROM log WHERE studentId = :studentId GROUP BY reg_date", nativeQuery = true)
    List<LogEntity> getPoint(@Param("studentId") int studentId);

    //FIXME
//    @Query(value = "CREATE TABLE ranking AS SELECT C1, C2 FROM OLD_TABLE", nativeQuery = true)
//    void createRanking();

    @EntityGraph(attributePaths = "authorities")    //쿼리 수행시, Lazy 조회가 아니고 Eager 조회로 authorities 정보를 같이 가져옴옴
    Optional<StudentEntity> findOneWithAuthoritiesByStudentId(int studentId);

}

