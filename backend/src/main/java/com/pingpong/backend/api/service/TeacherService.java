package com.pingpong.backend.api.service;

import com.pingpong.backend.api.domain.TeacherEntity;

import java.util.List;
import java.util.Optional;


public interface TeacherService {
    //회원가입
    TeacherEntity register(TeacherEntity teacher);

    //선생님 삭제
    void delete(int teacherId);
    
    //로그인
//    boolean login(int teacherId, String password);

    //선생님 목록 조회
    List<TeacherEntity> findByName(String name);

    //선생님 1명 조회
    public Optional<TeacherEntity> findByTeacherId(int teacherId);

    //이메일 중복체크
    boolean hasEmail(String email);

    //선생님 정보 수정
    void modify(TeacherEntity teacher);

    //비밀번호 수정
    void modifyPassword(int teacherId, String password);

    //이메일 수정
    void modifyEmail(int teacherId, String email);

    void selectiveDelete(List<Integer> list);
}
