package com.pingpong.backend.api.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "student")
@Table(name="student")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StudentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @Column(nullable = false)
    private String profile;

    @Column(nullable = false)
    private int point;

    @Column(nullable = false)
    private int totalPoint;

    @Column(nullable = false, length = 50)
    private String introduce;

    @Builder
    public StudentEntity(String name, Byte grade, Byte classNum, Byte studentNum, String email, String password, String profile, int point, int totalPoint, String introduce){
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
}