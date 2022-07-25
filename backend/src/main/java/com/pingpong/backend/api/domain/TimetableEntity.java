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
    private byte timetableId;

    @Column(nullable = false)
    private byte startTimehh;

    @Column(nullable = false)
    private byte startTimemm;

    @Column(nullable = false)
    private byte endTimehh;

    @Column(nullable = false)
    private int endTimemm;

    @Builder
    public TimetableEntity(byte timetableId, byte startTimehh, byte startTimemm, byte endTimehh, byte endTimemm){
        this.timetableId = timetableId;
        this.startTimehh = startTimehh;
        this.startTimemm = startTimemm;
        this.endTimehh = endTimehh;
        this.endTimemm = endTimemm;
    }
}
