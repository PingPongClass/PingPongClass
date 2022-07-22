package com.pingpong.backend.api.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="class")
public class ClassEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int classId;

    @ManyToOne
    @JoinColumn(name="teacher_id",nullable = false)
    private TeacherEntity teacherEntity;

    @ManyToOne
    @JoinColumn(name="subject_code", nullable = false)
    private SubjectEntity subjectEntity;

    @ManyToOne
    @JoinColumn(name="timetable_id", nullable = false)
    private TimetableEntity timetableEntity;

    @Column(nullable = false, length = 20)
    private String classTitle;

    @Column(nullable = false)
    private byte classDay;

    @Builder
    public ClassEntity(TeacherEntity teacherEntity, SubjectEntity subjectEntity, TimetableEntity timetableEntity, String classTitle, byte classDay) {
        this.teacherEntity = teacherEntity;
        this.subjectEntity = subjectEntity;
        this.timetableEntity = timetableEntity;
        this.classDay = classDay;
        this.classTitle = classTitle;
    }
}
