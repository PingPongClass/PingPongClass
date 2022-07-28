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

    boolean existsByEmail(String email);

    //mysql버전 8이상이어야 rank함수 사용 가능 -> dense_rank()쓰고싶다
    //FIXME
    @Query(value="SELECT name, totalPoint, introduce FROM student ORDER BY totalPoint DESC LIMIT 10", nativeQuery = true)
    List<StudentEntity> getRanking();

    //FIXME
    @Query(value="SELECT regDate, SUM(point) point FROM log WHERE studentId = :studentId GROUP BY reg_date", nativeQuery = true)
    List<LogEntity> getPoint(@Param("studentId") int studentId);

    //FIXME
//    @Query(value = "CREATE TABLE ranking AS SELECT C1, C2 FROM OLD_TABLE", nativeQuery = true)
//    void createRanking();

    @EntityGraph(attributePaths = "authorities")    //쿼리 수행시, Lazy 조회가 아니고 Eager 조회로 authorities 정보를 같이 가져옴옴
    Optional<StudentEntity> findOneWithAuthoritiesByStudentId(int studentId);

    //학생 추가시, studentId 가장 큰 값으로 넣기
    @Query("SELECT MAX(studentId)+1 FROM student")
    Integer getMaxStudentId();

    //studentId를 기준으로 studentEntity정보를 가져올 때 권한정보도 같이 가져옴옴
    @EntityGraph(attributePaths = "authorities") //쿼리가 수행될 때 Lazy조회가 아닌 Eager조회로 authorities정보를 같이 가져옴
    Optional<StudentEntity> findStudentEntityByStudentId(int studentId);
}

