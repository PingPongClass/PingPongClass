package com.pingpong.backend.api.domain;

import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;

//import lombok.*;
//@Builder
//@AllArgsConstructor
//@NoArgsConstructor

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="notice")
public class NoticeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int noticeId;

    @ManyToOne
    @JoinColumn(name="teacher_id",nullable=false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private TeacherEntity teacherEntity;

    @ManyToOne
    @JoinColumn(name="class_id",nullable=false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private ClassEntity classEntity;

    @Column(nullable = false, length=50)
    private String title;

    @Column(nullable = false, length=2000)
    private String content;

    @Column(nullable = false)
    private LocalDateTime regtime = LocalDateTime.now();

    @Builder
    public NoticeEntity(TeacherEntity teacherEntity, ClassEntity classEntity, String title, String content) {
        this.teacherEntity = teacherEntity;
        this.classEntity = classEntity;
        this.title=title;
        this.content=content;
    }

    public void update(ClassEntity classEntity, String title, String content){
        this.title = title;
        this.content = content;
        this.regtime = LocalDateTime.now();
        this.classEntity = classEntity;
    }
}
