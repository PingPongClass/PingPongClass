package com.pingpong.backend.api.service;

import com.pingpong.backend.api.domain.LogEntity;
import com.pingpong.backend.api.domain.StudentEntity;
import com.pingpong.backend.api.domain.request.StudentRequest;
import com.pingpong.backend.api.domain.response.RankResponse;

import java.util.List;
import java.util.Map;
import java.util.Optional;


public interface StudentService {
    //회원가입
    StudentEntity register(StudentEntity student);

    //로그인
//    boolean login(UserRequest.Login login);

    //학생 1명 조회
    Optional<StudentEntity> findByStudentId(int studentId);

    //이메일 중복체크
    boolean hasEmail(String email);

    void modify(StudentRequest student);

    //비밀번호 수정
    void modifyPassword(int studentId, String password);

    //학생 삭제
    void delete(int studentId);

    //랭킹 출력
    List<RankResponse> getRanking();

    //한 학생의 날짜별 스티커 개수 조회
    List<Map<String, Integer>> getPoint(int studentId);

    //한 학생의 전체 스티커 획득 개수 조회
    int getTotalPoint(int studentId);

    void updatePoint(int studentId, int point);

    void selectiveDelete(List<Integer> list);
    void deleteAll();

}
