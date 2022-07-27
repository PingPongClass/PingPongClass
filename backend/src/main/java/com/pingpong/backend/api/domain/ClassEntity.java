package com.pingpong.backend.api.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
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

    @Column(nullable = false, length = 50)
    private String classDesc;

    @Column(length = 256)
    private String classUrl;

    @Column(nullable = false)
    private int classDay;


    @Builder
    public ClassEntity(TeacherEntity teacherEntity, SubjectEntity subjectEntity, TimetableEntity timetableEntity, String classTitle, String classDesc,String classUrl,  int classDay) {
        this.teacherEntity = teacherEntity;
        this.subjectEntity = subjectEntity;
        this.timetableEntity = timetableEntity;
        this.classDay = classDay;
        this.classUrl = classUrl;
        this.classDesc = classDesc;
        this.classTitle = classTitle;
    }

    public void update(TimetableEntity timetableEntity, String classTitle, String classDesc, int classDay){
        this.timetableEntity = timetableEntity;
        this.classDay = classDay;
        this.classDesc = classDesc;
        this.classTitle = classTitle;
    }

    public void updateUrl(String classUrl){
        this.classUrl = classUrl;
    }
}
