package com.pingpong.backend.api.model;

import javax.persistence.*;

@Entity
@Table(name="class")
public class ClassEntity {
    @Id
    @Column(name = "class_id")
    private int classId;

    @Column(name = "teacher_id", nullable = false)
    private int teacherId;

    @Column(name = "subject_code", nullable = false, columnDefinition = "TINYINT")
    private int subjectCode;

    @Column(name = "timetable_id", nullable = false)
    private int timetableId;

    @Column(name = "class_title", nullable = false, length = 20)
    private String classTitle;

    @Column(name = "class_desc", nullable = false, length = 50)
    private String classDesc;

    @Column(name = "class_day", nullable = false, columnDefinition = "TINYINT")
    private int classDay;
}
