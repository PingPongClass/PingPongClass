package com.pingpong.backend.api.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@Table(name="exceltest")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StudentExcelTest {
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

    @Builder
    public StudentExcelTest(int studentId, String name, int grade, int classNum, int studentNum, String email, String password, String profile, int point, int totalPoint, String introduce){
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
    public StudentExcelTest(int studentId, String name, int grade, int classNum, int studentNum, String password){
        this.studentId = studentId;
        this.name = name;
        this.grade = grade;
        this.classNum=classNum;
        this.studentNum=studentNum;
        this.password=password;
    }
}