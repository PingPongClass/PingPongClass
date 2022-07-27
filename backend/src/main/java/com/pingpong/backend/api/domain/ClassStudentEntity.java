package com.pingpong.backend.api.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
    @OnDelete(action= OnDeleteAction.CASCADE)
    private ClassEntity classEntity;

    @ManyToOne
    @JoinColumn(name="student_id", nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private StudentEntity studentEntity;

    @Builder
    public ClassStudentEntity(StudentEntity studentEntity, ClassEntity classEntity) {
        this.classEntity=classEntity;
        this.studentEntity=studentEntity;
    }

    public void update(StudentEntity studentEntity, ClassEntity classEntity){
        this.classEntity = classEntity;
        this.studentEntity = studentEntity;
    }
}
