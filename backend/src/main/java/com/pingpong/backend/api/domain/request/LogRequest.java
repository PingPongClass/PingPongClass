package com.pingpong.backend.api.domain.request;

import com.pingpong.backend.api.domain.ClassEntity;
import com.pingpong.backend.api.domain.StudentEntity;
import com.pingpong.backend.api.domain.dto.LogDto;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Getter
@NoArgsConstructor(access= AccessLevel.PROTECTED)
public class LogRequest {
    private int classId;
    private List<LogDto> logList;
}
