package com.pingpong.backend.api.service;

import com.pingpong.backend.Exception.CustomException;
import com.pingpong.backend.Exception.ErrorCode;
import com.pingpong.backend.api.domain.Authority;
import com.pingpong.backend.api.domain.TeacherEntity;
import com.pingpong.backend.api.domain.request.TeacherRequest;
import com.pingpong.backend.api.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class TeacherServiceImpl implements TeacherService {
    private final TeacherRepository repository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public TeacherEntity register(TeacherEntity teacher) {
        //teacher계정은 권한이 2개
        Set<Authority> authorities= new HashSet<>();
        Authority role = Authority.builder()
                .authorityName("ROLE_STUDENT")
                .build();
        authorities.add(role);

        role = Authority.builder()
                .authorityName("ROLE_TEACHER")
                .build();
        authorities.add(role);

        if(teacher.getIsAdmin() == 1){
            role = Authority.builder()
                    .authorityName("ROLE_ADMIN")
                    .build();
            authorities.add(role);
        }

        TeacherEntity teacherEntity = TeacherEntity.builder()
                .teacherId(teacher.getTeacherId())
                .name((teacher.getName()))
                .password(teacher.getPassword())
                .birth(teacher.getBirth())
                .manageGrade(teacher.getManageGrade())
                .authorities(authorities)
                .isAdmin(teacher.getIsAdmin())
                .activated(true)
                .build();
        return teacher.from(repository.save(teacherEntity));
    }

    @Override
    public List<TeacherEntity> findByName(String name) {
        if(name.equals("전체")){
            return repository.findAll();
        } else{
            return repository.findTeacherEntitiesByName(name);
        }
    }

    public Optional<TeacherEntity> findByTeacherId(int teacherId) {
        return repository.findById(teacherId);
    }


    @Override
    public boolean hasEmail(String email) {
        return repository.existsByEmail(email);
    }

    @Override
    @Transactional
    public void modify(TeacherRequest request) {
        TeacherEntity teacherEntity = repository.findById(request.getTeacherId()).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));

        if("".equals(request.getPassword())==false && request.getPassword() != null){
            String password = request.getPassword();
            request.setPassword(passwordEncoder.encode(password));
        }
        teacherEntity.modifyTeacher(request.getEmail(), request.getPassword(), request.getProfile(), request.getManageGrade());
    }

    @Override
    @Transactional
    public void modifyPassword(int teacherId, String password) {
        TeacherEntity teacherEntity = repository.findById(teacherId).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        teacherEntity.updatePassword(passwordEncoder.encode(password));
    }

    @Override
    @Transactional
    public void modifyEmail(int teacherId, String email) {
        TeacherEntity teacherEntity = repository.findById(teacherId).orElseThrow(() -> new CustomException(ErrorCode.POSTS_NOT_FOUND));
        teacherEntity.updateFirstEmail(email);
    }

    @Override
    public void selectiveDelete(List<Integer> list) {
        for(int id: list)
            repository.deleteById(id);
    }

    @Override
    @Transactional
    public void delete(int teacherId) {
        repository.deleteById(teacherId);
    }

}