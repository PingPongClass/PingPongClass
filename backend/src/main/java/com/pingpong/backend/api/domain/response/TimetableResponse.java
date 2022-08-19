package com.pingpong.backend.api.domain.response;

import com.pingpong.backend.api.domain.ClassEntity;
import lombok.Getter;

import java.util.List;

@Getter
public class TimetableResponse {
    private List<ClassResponse> classEntityList;

    public TimetableResponse( List<ClassResponse> classEntityList){
        this.classEntityList =classEntityList;
    }
}
