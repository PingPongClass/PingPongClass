package com.pingpong.backend.api.domain.response;

import com.pingpong.backend.api.domain.LogEntity;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
public class TeacherLogResponse {
    private LocalDate regDate;
    private List<LogEntity> logEntityList;

    public TeacherLogResponse(LocalDate regDate, List<LogEntity> logEntityList){
        this.regDate=regDate;
        this.logEntityList=logEntityList;
    }

}
