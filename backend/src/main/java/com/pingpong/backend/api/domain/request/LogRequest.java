package com.pingpong.backend.api.domain.request;

import com.pingpong.backend.api.domain.ClassEntity;
import com.pingpong.backend.api.domain.StudentEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@Getter
@NoArgsConstructor(access= AccessLevel.PROTECTED)
public class LogRequest {
    private int classId;
    private int studentId;
    private int point;
    private boolean attendance;
    private int presentCnt;
}
