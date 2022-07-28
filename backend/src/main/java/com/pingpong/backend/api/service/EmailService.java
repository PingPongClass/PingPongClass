package com.pingpong.backend.api.service;

import com.pingpong.backend.api.domain.StudentEntity;
import com.pingpong.backend.api.domain.TeacherEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender emailSender;

    public void sendStudentMail(StudentEntity student){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("ppclass403@gmail.com");
        message.setTo(student.getEmail());
        message.setSubject(student.getName()+"님 핑퐁클래스 비밀번호 재설정 메일");
        message.setText(student.getName()+"님 핑퐁클래스 비밀번호 재설정 메일입니다.\n"+"(비밀번호 재설정 메일 => 프론트 만들면 url받아서 주기)");
        emailSender.send(message);
    }

    public void sendTeacherMail(TeacherEntity teacher){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("ppclass403@gmail.com");
        message.setTo(teacher.getEmail());
        message.setSubject(teacher.getName()+"님 핑퐁클래스 비밀번호 재설정 메일");
        message.setText(teacher.getName()+"님 핑퐁클래스 비밀번호 재설정 메일입니다.\n"+"(비밀번호 재설정 메일 => 프론트 만들면 url받아서 주기)");
        emailSender.send(message);
    }
}
