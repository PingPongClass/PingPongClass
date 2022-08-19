package com.pingpong.backend.api.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name="timetable")
public class TimetableEntity {
    @Id
    private int timetableId;

    @Column(nullable = false)
    private int startTimehh;

    @Column(nullable = false)
    private int startTimemm;

    @Column(nullable = false)
    private int endTimehh;

    @Column(nullable = false)
    private int endTimemm;

    @Builder
    public TimetableEntity(int timetableId, int startTimehh, int startTimemm, int endTimehh, int endTimemm){
        this.timetableId = timetableId;
        this.startTimehh = startTimehh;
        this.startTimemm = startTimemm;
        this.endTimehh = endTimehh;
        this.endTimemm = endTimemm;
    }
}
