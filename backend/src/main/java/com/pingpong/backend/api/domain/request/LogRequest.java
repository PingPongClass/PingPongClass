package com.pingpong.backend.api.domain.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access= AccessLevel.PROTECTED)
public class LogRequest {
    private int classId;
    private int studentId;
    private int point;
    private boolean attendance;
    private int presentCnt;
}
