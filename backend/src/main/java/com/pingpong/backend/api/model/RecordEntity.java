package com.pingpong.backend.api.model;


import javax.persistence.*;
import java.util.Date;

//import lombok.*;
//@Getter
//@Builder
//@AllArgsConstructor
//@NoArgsConstructor

@Entity
@Table(name="record")
public class RecordEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int recordId;

    @Column(name = "teacher_id",  nullable = false, length=10)
    private String teacherId;

    @Column(name = "class_id", nullable = false)
    private int classId;

    @Column(name = "subject_code", nullable = false, columnDefinition = "TINYINT")
    private int subjectCode;

    @Column(name = "time_id", nullable = false)
    private int timeId;

    @Column(name = "video_id", nullable = false, length = 256)
    private String videoUrl;

    @Column(name = "video_savetime", nullable = false)
    private Date videoSavetime;
}