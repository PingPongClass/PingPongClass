package com.pingpong.backend.api.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="log")
public class LogEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_id")
    private int logId;

    @Column(name = "class_id", nullable = false)
    private int classId;

    @Column(name = "student_id", nullable = false)
    private int studentId;

    @Column(name = "subject_code", nullable = false, columnDefinition = "TINYINT")
    private int subjectCode;

    @Column(name = "timetable_id", nullable = false, columnDefinition = "TINYINT")
    private int timetableId;

    @Column(name = "reg_date", nullable = false, columnDefinition = "DATE")
    private Date regDate;

    @Column(nullable = false)
    private int point;

    @Column(nullable = false)
    private boolean attendance;

    @Column(name = "present_cnt", nullable = false)
    private int presentCnt;
}
