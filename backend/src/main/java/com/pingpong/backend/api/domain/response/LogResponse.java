package com.pingpong.backend.api.domain.response;

import com.pingpong.backend.api.domain.ClassEntity;
import com.pingpong.backend.api.domain.LogEntity;
import lombok.Getter;
import java.util.List;

@Getter
public class LogResponse {
    int classId;
    String classTitle;
    int timetableId;
    String subjectName;
    int point;
    boolean attendance;
    int presentCnt;

    public LogResponse(LogEntity entity){
        this.classId=entity.getClassEntity().getClassId();
        this.classTitle=entity.getClassEntity().getClassTitle();
        this.timetableId=entity.getClassEntity().getTimetableEntity().getTimetableId();
        this.subjectName=entity.getClassEntity().getSubjectEntity().getName();
        this.point=entity.getPoint();
        this.attendance=entity.isAttendance();
        this.presentCnt=entity.getPresentCnt();
    }
}
