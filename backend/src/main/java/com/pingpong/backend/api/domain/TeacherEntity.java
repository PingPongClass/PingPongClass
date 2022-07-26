package com.pingpong.backend.api.domain;


import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

//import lombok.*;
//@Getter
//@Builder
//@AllArgsConstructor
//@NoArgsConstructor

@Entity(name = "teacher")
@Table(name = "teacher")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TeacherEntity {
    @Id
    private int teacherId;

    @Column(nullable = false, length=10)
    private String name;

    @Column(length=40, unique=true)
    private String email;

    @Column(nullable = false, length=256)
    private String password;

    @Column(nullable = false, length = 8)
    private String birth;

    @Column(nullable = false)
    private int manageGrade;

    @Column(nullable = false)
    @ColumnDefault("0")
    private int isAdmin;

    private String profile;

    @Builder
    public TeacherEntity(int teacherId, String name, String password, String birth, int manageGrade) {
        this.teacherId = teacherId;
        this.name = name;
        this.password = password;
        this.birth=birth;
        this.manageGrade=manageGrade;
    }

    public void updateRandomPassword(String password){
        this.password = password;
    }

    public void updateFirstEmail(String email){
        this.email = email;
    }

    public void modifyTeacher(TeacherEntity teacher){
        this.name = teacher.getName();
        this.email = teacher.getEmail();
        this.password = teacher.getPassword();
        this.profile = teacher.getProfile();
    }

}
