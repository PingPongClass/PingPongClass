package com.pingpong.backend.api.service;

import com.pingpong.backend.api.domain.LogEntity;
import com.pingpong.backend.api.domain.StudentEntity;
import com.pingpong.backend.api.domain.response.RankResponse;

import java.util.List;
import java.util.Optional;


public interface StudentService {
    //회원가입
    void register(StudentEntity student);

    //로그인

    //학생 1명 조회
    Optional<StudentEntity> findByStudentId(int studentId);

    //이메일 중복체크
    boolean hasEmail(String email);

    void modify(StudentEntity student);

//    void modifyEmail(int studentId, String email);
//
//    void modifyIntroduce(int studentId, String introduce);

    //학생 삭제
    void delete(int studentId);

    //랭킹 출력
    List<RankResponse> getRanking();

    //한 학생의 날짜별 스티커 개수 조회
    List<LogEntity> getPoint(int studentId);

    void updatePoint(int studentId, int point);

}
