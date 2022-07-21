package com.pingpong.backend.api.model;

import javax.persistence.*;
import java.sql.Timestamp;

//import lombok.*;
//@Getter
//@Builder
//@AllArgsConstructor
//@NoArgsConstructor

@Entity
@Table(name="notice")
public class NoticeEntity {
    @Id
    @Column(name = "notice_id",  nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int noticeId;

    @Column(name ="teacher_id", nullable = false, length=10)
    private String teacherId;

    @Column(name ="title", nullable = false, length=50)
    private String title;

    @Column(name ="content", nullable = false, length=2000)
    private String content;

    @Column(name ="regtime", nullable = false)
    private Timestamp regtime;

}
