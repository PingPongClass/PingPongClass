package com.pingpong.backend.api.model;

import javax.persistence.*;

@Entity
@Table(name="class_student")
public class ClassStudentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int class_idx;

    @ManyToOne
    @JoinColumn(name="class_id", nullable = false)
    private ClassEntity classentity;

    @ManyToOne
    @JoinColumn(name="student_id", nullable = false)
    private StudentEntity studententity;
}
