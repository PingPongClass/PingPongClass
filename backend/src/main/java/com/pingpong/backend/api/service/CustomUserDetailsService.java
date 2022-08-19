package com.pingpong.backend.api.service;

import com.pingpong.backend.api.domain.StudentEntity;
import com.pingpong.backend.api.domain.TeacherEntity;
import com.pingpong.backend.api.repository.StudentRepository;
import com.pingpong.backend.api.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Component("userDetailsService")
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    StudentRepository studentRepository;

    @Autowired
    TeacherRepository teacherRepository;

    //로그인 시, DB에서 유저정보와 권한정보 가져옴, 해당 정보를 기반으로 userdetails.User 객체를 생성해서 리턴
    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String id) {
        if(id.length() == 10){  //학생이면
            return studentRepository.findById(Integer.parseInt(id))
                    .map(student -> createStudent(id, student))
                    .orElseThrow(() -> new UsernameNotFoundException(id + " -> DB에서 학생을 찾을 수 없습니다."));
        } else{
            return teacherRepository.findById(Integer.parseInt(id))
                    .map(teacher -> createTeacher(id, teacher))
                    .orElseThrow(() -> new UsernameNotFoundException(id + " -> DB에서 선생님(관리자)을 찾을 수 없습니다."));
        }
    }


    private org.springframework.security.core.userdetails.User createStudent(String id, StudentEntity student) {
        if (!student.isActivated()) {
            throw new RuntimeException(id + " -> 활성화되어 있지 않습니다.");
        }
        //DB 가져온 유저가 활성화 상태면
        List<GrantedAuthority> grantedAuthorities = student.getAuthorities().stream()
                .map(authority -> new SimpleGrantedAuthority(authority.getAuthorityName()))
                .collect(Collectors.toList());
        //유저 객체 리턴
       return new org.springframework.security.core.userdetails.User(student.getStudentId()+"",
                student.getPassword(),
                grantedAuthorities);
    }

    private org.springframework.security.core.userdetails.User createTeacher(String id, TeacherEntity teacher) {
        if (!teacher.isActivated()) {
            throw new RuntimeException(id + " -> 활성화되어 있지 않습니다.");
        }
        //DB 가져온 유저가 활성화 상태면
        List<GrantedAuthority> grantedAuthorities = teacher.getAuthorities().stream()
                .map(authority -> new SimpleGrantedAuthority(authority.getAuthorityName()))
                .collect(Collectors.toList());
        //유저 객체 리턴
       return new org.springframework.security.core.userdetails.User(teacher.getTeacherId()+"",
               teacher.getPassword(),
                grantedAuthorities);
    }
}