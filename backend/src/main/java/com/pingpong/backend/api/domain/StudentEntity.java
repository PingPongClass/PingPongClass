package com.pingpong.backend.api.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.Set;
import java.util.stream.Collectors;

@Entity(name = "student")
@Table(name="student")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StudentEntity {
    @JsonIgnore
    @Id
    private int studentId;

    @Column(nullable = false, length = 10)
    private String name;

    @Column(nullable = false)
    private byte grade;

    @Column(nullable = false)
    private byte classNum;

    @Column(nullable = false)
    private byte studentNum;

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

    @Column(nullable = false, name = "activated")
    private boolean activated=true;


    @ManyToMany(cascade = CascadeType.REMOVE)
    @JoinTable(
            name = "student_authority",
            joinColumns = {@JoinColumn(name = "student_id", referencedColumnName ="studentId")},  //외래키
            inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "authorityName")})   //반대 엔티티의 외래키
    private Set<Authority> authorities;


    @Builder
    public StudentEntity(int studentId, String name, byte grade, byte classNum, byte studentNum, String email, String password, String profile, int point, int totalPoint, String introduce){
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

    public StudentEntity(int studentId, String name, byte grade, byte classNum, byte studentNum, String password){
        this.studentId = studentId;
        this.name = name;
        this.grade = grade;
        this.classNum=classNum;
        this.studentNum=studentNum;
        this.password=password;
    }


    public void updatePoint(int point) {
        this.point += point;
        this.totalPoint += point;
    }
    public void modifyStudent(StudentEntity entity){
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
        if(entity.getIntroduce()!=null) {
            this.introduce = entity.getIntroduce();
        }
        if(entity.getProfile()!=null){
            this.profile = entity.getProfile();
        }
    }

    public void usePoint(int point){
        this.point=point;
    }

    public static StudentEntity from(StudentEntity student) {
        if(student == null) return null;
        return StudentEntity.builder()
                .studentId(student.getStudentId())
                .name(student.getName())
                .password(student.getPassword())
                .authorities(student.getAuthorities().stream()
                        .map(authority -> Authority.builder().authorityName(authority.getAuthorityName()).build())
                        .collect(Collectors.toSet()))
                .build();
    }
}