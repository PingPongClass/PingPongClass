package com.pingpong.backend.api.model;

import javax.persistence.*;

@Entity
@Table(name="timetable")
public class TimetableEntity {
    @Id
    @Column(name = "timetable_id", nullable = false, columnDefinition = "TINYINT")
    private int timetableId;

    @Column(name = "start_time_hh", nullable = false, columnDefinition = "TINYINT")
    private int startTimehh;

    @Column(name = "start_time_mm", nullable = false, columnDefinition = "TINYINT")
    private int startTimemm;

    @Column(name = "end_time_hh", nullable = false, columnDefinition = "TINYINT")
    private int endTimehh;

    @Column(name = "end_time_mm", nullable = false, columnDefinition = "TINYINT")
    private int endTimemm;
}
