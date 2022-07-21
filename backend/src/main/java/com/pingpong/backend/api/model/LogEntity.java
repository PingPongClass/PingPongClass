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

    @ManyToOne
    @JoinColumn(name="class_id", nullable = false)
    private ClassEntity classentity;

    @ManyToOne
    @JoinColumn(name="student_id", nullable = false)
    private StudentEntity studententity;

    @ManyToOne
    @JoinColumn(name="subject_code", nullable = false)
    private SubjectEntity subjectentity;

    @ManyToOne
    @JoinColumn(name="timetable_id", nullable = false)
    private TimetableEntity timetableentity;

    @Column(name = "reg_date", nullable = false, columnDefinition = "DATE")
    private Date regDate;

    @Column(nullable = false)
    private int point;

    @Column(nullable = false)
    private boolean attendance;

    @Column(name = "present_cnt", nullable = false)
    private int presentCnt;
}
