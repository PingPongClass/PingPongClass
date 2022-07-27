package com.pingpong.backend.api.service;

import com.pingpong.backend.api.domain.StudentEntity;
import com.pingpong.backend.api.repository.StudentRepository;
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
    private final StudentRepository studentRepository;

    public CustomUserDetailsService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    //로그인 시, DB에서 유저정보와 권한정보 가져옴, 해당 정보를 기반으로 userdetails.User 객체를 생성해서 리턴
    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String id) {
        System.out.println("loadUserByUsername"+": "+studentRepository.findByStudentId(Integer.parseInt(id)).toString());

        return studentRepository.findByStudentId(Integer.parseInt(id))
                .map(student -> createUser(id, student))
                .orElseThrow(() -> new UsernameNotFoundException(id + " -> 데이터베이스에서 찾을 수 없습니다."));
    }

    private org.springframework.security.core.userdetails.User createUser(String id, StudentEntity student) {
        if (student.getActivated()==0) {
            throw new RuntimeException(id + " -> 활성화되어 있지 않습니다.");
        }
        //DB 가져온 유저가 활성화 상태면
        List<GrantedAuthority> grantedAuthorities = student.getAuthorities().stream()
                .map(authority -> new SimpleGrantedAuthority(authority.getAuthorityName()))
                .collect(Collectors.toList());
        //유저 객체 리턴턴
       return new org.springframework.security.core.userdetails.User(student.getStudentId()+"",
                student.getPassword(),
                grantedAuthorities);
    }
}