package com.pingpong.backend.api.domain.request;

import com.pingpong.backend.api.domain.dto.LogDto;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Getter
@NoArgsConstructor(access= AccessLevel.PROTECTED)
public class LogdateRequest {
    private int studentId;
    private LocalDate regDate;
}
