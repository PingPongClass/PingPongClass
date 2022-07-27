package com.pingpong.backend.api.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.Set;

@Entity(name = "student")
@Table(name="student")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StudentEntity {
    @JsonIgnore
    @Id
    private int studentId;

    @Column(nullable = false, length = 10)
    private String name;

    @Column(nullable = false)
    private int grade;

    @Column(nullable = false)
    private int classNum;

    @Column(nullable = false)
    private int studentNum;

    @Column(length = 40, unique = true)
    private String email;

    @Column(nullable = false, length=256)
    private String password;

    @Column(length=256)
    private String profile;

    @Column(nullable = false)
    @ColumnDefault("0")
    private int point;

    @Column(nullable = false)
    @ColumnDefault("0")
    private int totalPoint;

    @Column(length = 50)
    private String introduce;

    @Column(name = "activated")
    @ColumnDefault("1")
    private int activated;

    @ManyToMany
    @JoinTable(
            name = "student_authority",
            joinColumns = {@JoinColumn(name = "studentId", referencedColumnName = "studentId")},
            inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "authority_name")})
    private Set<Authority> authorities;

    @Builder
    public StudentEntity(int studentId, String name, int grade, int classNum, int studentNum, String email, String password, String profile, int point, int totalPoint, String introduce){
        this.studentId = studentId;
        this.name = name;
        this.grade = grade;
        this.classNum=classNum;
        this.studentNum=studentNum;
        this.email=email;
        this.password=password;
        this.profile=profile;
        this.point=point;
        this.totalPoint=totalPoint;
        this.introduce=introduce;
    }

    @Builder
    public StudentEntity(int studentId, String name, int grade, int classNum, int studentNum, String password){
        this.studentId = studentId;
        this.name = name;
        this.grade = grade;
        this.classNum=classNum;
        this.studentNum=studentNum;
        this.password=password;
    }

    public void updateRandomPassword(String password){
        this.password = password;
    }

    public void updatePoint(int point) {
        this.point += point;
        this.totalPoint += point;
    }

    public void modifyStudent(StudentEntity entity){
        if(entity.getName()!=null){
            this.name = entity.getName();
        }
        if(entity.getGrade()!=0){
            this.grade = entity.getGrade();
        }
        if(entity.getClassNum()!=0){
            this.classNum = entity.getClassNum();
        }
        if(entity.getStudentNum()!=0){
            this.studentNum = entity.getStudentNum();
        }
        if(entity.getEmail()!=null){
            this.email = entity.getEmail();
        }
        if(entity.getPassword()!=null){
            this.password = entity.getPassword();
        }
        if(entity.getIntroduce()!=null){
            this.introduce = entity.getIntroduce();
        }
    }
    public void usePoint(int point){
        this.point=point;
    }
}