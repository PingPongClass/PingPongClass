package com.pingpong.backend.api.domain.response;

import com.pingpong.backend.api.domain.ClassEntity;
import com.pingpong.backend.api.domain.LogEntity;
import lombok.Getter;
import java.util.List;

@Getter
public class LogResponse {
    private ClassEntity classEntity;
    private List<LogEntity> logEntityList;

    public LogResponse(ClassEntity classEntity, List<LogEntity> logEntityList){
        this.classEntity =classEntity;
        this.logEntityList=logEntityList;
    }
}
