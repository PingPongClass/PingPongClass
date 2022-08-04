package com.pingpong.backend.api.domain;

import javax.persistence.*;
import java.time.LocalDate;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;


@Getter
@NoArgsConstructor
@Entity
@Table(name="record")
public class RecordEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int recordId;

    @ManyToOne
    @JoinColumn(name="class_id", nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private ClassEntity classEntity;

    @Column(nullable = false, length = 256)
    private String videoUrl;

    @Column(nullable = false)
    private LocalDate videoSavetime;

    @Builder
    public RecordEntity(int recordId, ClassEntity classEntity, String videoUrl, LocalDate videoSavetime){
        this.recordId =recordId;
        this.classEntity = classEntity;
        this.videoUrl = videoUrl;
        this.videoSavetime = videoSavetime;
    }

}