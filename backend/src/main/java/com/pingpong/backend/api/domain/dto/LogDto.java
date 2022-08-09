package com.pingpong.backend.api.domain.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access= AccessLevel.PROTECTED)
public class LogDto {
    private int studentId;
    private int point;
    private boolean attendance;
    private int presentCnt;


}
