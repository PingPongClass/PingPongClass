package com.pingpong.backend.api.service;

import com.pingpong.backend.Exception.CustomException;
import com.pingpong.backend.Exception.ErrorCode;
import com.pingpong.backend.api.domain.*;
import com.pingpong.backend.api.domain.request.StudentRequest;
import com.pingpong.backend.api.domain.response.NoticeResponse;
import com.pingpong.backend.api.domain.response.RankResponse;
import com.pingpong.backend.api.repository.LogRepository;
import com.pingpong.backend.api.repository.RankingRepository;
import com.pingpong.backend.api.repository.StudentRepository;
import com.pingpong.backend.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService{
    private final StudentRepository repository;
    private final LogRepository logRepository;
    private final RankingRepository rankingRepository;
    private final PasswordEncoder encoder;

    /*
    회원가입
    1. 유저dto안에 username(아이디?)기준으로 해당 정보를 찾음 -> 우리는 우리가 새로 아이디를 배정해주는 거라 상관X
    2. 없으면 권한정보를 만들고 Authority와 User정보를 생성해서 UserRepository의 save메소드를 통해 DB에 정보 저장
    */
    @Override
    @Transactional
    public StudentEntity register(StudentEntity student) {
        //admin계정은 권한이 ROLE_USER, ROLE_ADMIN 2개
        //권한 정보 넣기 (회원가입은 ROLE_USER라는 권한 1개)
        //둘 차이를 통해 권한검증
        Authority authority = Authority.builder()
                .authorityName("ROLE_STUDENT")
                .build();
        StudentEntity studentEntity = StudentEntity.builder()
                .studentId(student.getStudentId())
                .name(student.getName())
                .password(student.getPassword())
                .grade(student.getGrade())
                .classNum(student.getClassNum())
                .studentNum(student.getStudentNum())
                .authorities(Collections.singleton(authority))
                .activated(true)
                .build();

        return student.from(repository.save(studentEntity));
    }

    @Override
    public Optional<StudentEntity> findByStudentId(int studentId) {
        return repository.findById(studentId);
    }

    @Override
    public boolean hasEmail(String email) {
        return repository.existsByEmail(email);
    }

    @Override
    @Transactional
    public void modify(StudentRequest student) {
        StudentEntity studentEntity = repository.findById(student.getStudentId()).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));

        if("".equals(student.getPassword())==false && student.getPassword() != null) {
            String password = student.getPassword();
            student.setPassword(encoder.encode(password));
        }
        studentEntity.modifyStudent(student);
    }

    @Override
    @javax.transaction.Transactional
    public void modifyPassword(int studentId, String password) {
        StudentEntity studentEntity = repository.findById(studentId).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        studentEntity.updatePassword(encoder.encode(password));
    }

    @Override
    @Transactional
    public void delete(int studentId) {
        repository.deleteById(studentId);
    }

    @Override
    public List<RankResponse> getRanking() {
        List<RankingEntity> list = rankingRepository.findAll();
        return list.stream().map(RankResponse::new).collect(Collectors.toList());
    }

    @Override
    public List<Map<String, Integer>> getPoint(int studentId) {
        return logRepository.getPoint(studentId);
    }

    @Override
    @Transactional
    public void updatePoint(int studentId, int point) {
        StudentEntity student = repository.findById(studentId).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        student.updatePoint(point);
    }

    @Override
    public void selectiveDelete(List<Integer> list) {
        for(int id:list)
            repository.deleteById(id);
    }

    @Override
    public void deleteAll() {
        repository.deleteAll();
    }

    //아래 두 메소드 허용권한을 다르게 해서 권한검증 테스트

    //username에 해당하는 user객체와 권한정보 가져오기
    @Transactional(readOnly = true)
    public StudentEntity getUserWithAuthorities(int studentId) {
        return StudentEntity.from(repository.findStudentEntityByStudentId(studentId).orElse(null));
    }

    //현재 SecurityContext에 저장된 id에 해당하는 user객체와 권한정보만 가져오기
    @Transactional(readOnly = true)
    public StudentEntity getMyUserWithAuthorities() {
//        return StudentEntity.from(SecurityUtil.getCurrentUsername().flatMap(repository::findStudentEntityByStudentId).orElse(null));
        return StudentEntity.from(repository.findStudentEntityByStudentId(Integer.parseInt(SecurityUtil.getCurrentUsername())).orElse(null));
    }
}
