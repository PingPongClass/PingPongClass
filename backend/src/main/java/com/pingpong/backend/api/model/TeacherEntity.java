package com.pingpong.backend.api.model;


import javax.persistence.*;

//import lombok.*;
//@Getter
//@Builder
//@AllArgsConstructor
//@NoArgsConstructor

@Entity
@Table(name="teacher")
public class TeacherEntity {
    @Id
    @Column(name = "teacher_id",  nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int teacherId;

    @Column(name="name", nullable = false, length=10)
    private String name;

    @Column(name ="email", length=40)
    private String email;

    @Column(name="password", nullable = false, length=256)
    private String password;

    @Column(name="profile", nullable = false, length = 256)
    private String profile;
}
