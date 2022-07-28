package com.pingpong.backend.api.service;

import com.pingpong.backend.Exception.CustomException;
import com.pingpong.backend.Exception.ErrorCode;
import com.pingpong.backend.api.domain.LogEntity;
import com.pingpong.backend.api.domain.RankingEntity;
import com.pingpong.backend.api.domain.StudentEntity;
import com.pingpong.backend.api.domain.response.NoticeResponse;
import com.pingpong.backend.api.domain.response.RankResponse;
import com.pingpong.backend.api.repository.RankingRepository;
import com.pingpong.backend.api.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService{
    private final StudentRepository repository;
    private final RankingRepository rankingRepository;

    @Override
    @Transactional
    public void register(StudentEntity student) {
        repository.save(student);
    }

    @Override
    public Optional<StudentEntity> findByStudentId(int studentId) {
        return repository.findByStudentId(studentId);
    }

    @Override
    public boolean hasEmail(String email) {
        return repository.existsByEmail(email);
    }

    @Override
    @Transactional
    public void modify(StudentEntity student) {
        StudentEntity studentEntity = repository.findById(student.getStudentId()).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        studentEntity.modifyStudent(student);
    }
//
//    @Override
//    @Transactional
//    public void modifyEmail(int studentId, String email) {
//        StudentEntity studentEntity = repository.findById(studentId).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
//        studentEntity.setEmail(email);
//        repository.save(studentEntity);
//    }
//
//    @Override
//    @Transactional
//    public void modifyIntroduce(int studentId, String introduce) {
//        StudentEntity studentEntity = repository.findById(studentId).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
//        studentEntity.setIntroduce(introduce);
//        repository.save(studentEntity);
//    }

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
    public List<LogEntity> getPoint(int studentId) {
        return repository.getPoint(studentId);
    }

    @Override
    @Transactional
    public void updatePoint(int studentId, int point) {
        StudentEntity student = repository.findById(studentId).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        student.updatePoint(point);
    }


}
