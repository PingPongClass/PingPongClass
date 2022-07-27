package com.pingpong.backend.api.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="class_student")
public class ClassStudentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int class_idx;

    @ManyToOne
    @JoinColumn(name="class_id", nullable = false)
    private ClassEntity classEntity;

    @ManyToOne
    @JoinColumn(name="student_id", nullable = false)
    private StudentEntity studentEntity;

    @Builder
    public ClassStudentEntity(StudentEntity studentEntity, ClassEntity classEntity) {
        this.classEntity=classEntity;
        this.studentEntity=studentEntity;
    }

    public void update(ClassEntity classEntity, StudentEntity studentEntity){
        this.classEntity = classEntity;
        this.studentEntity = studentEntity;
    }
}
