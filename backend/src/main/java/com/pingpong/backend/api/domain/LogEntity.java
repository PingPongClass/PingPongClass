package com.pingpong.backend.api.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Getter
@NoArgsConstructor
@Entity
@Table(name="log")
public class LogEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int logId;

    @ManyToOne
    @JoinColumn(name="class_id", nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private ClassEntity classEntity;

    @ManyToOne
    @JoinColumn(name="student_id", nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private StudentEntity studentEntity;

    @Column(nullable = false, columnDefinition = "DATE")
    private LocalDate regDate;

    @Column(nullable = false)
    private int point;

    @Column(nullable = false)
    private boolean attendance;

    @Column(nullable = false)
    private int presentCnt;

    @Builder
    public LogEntity(ClassEntity classEntity, StudentEntity studententity, LocalDate regDate, int point, boolean attendance, int presentCnt){
        this.classEntity = classEntity;
        this.studentEntity = studententity;
        this.regDate = regDate;
        this.point = point;
        this.attendance = attendance;
        this.presentCnt = presentCnt;
    }
}
