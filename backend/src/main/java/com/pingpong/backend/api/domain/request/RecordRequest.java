package com.pingpong.backend.api.domain.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor(access= AccessLevel.PROTECTED)
public class RecordRequest {

    private int teacherId;
    private String classTitle;
    private int classId;
    private String subjectCode;
    private String timetableId;
    private String videoUrl;
}
