package com.pingpong.backend.api.domain.response;

import com.pingpong.backend.api.domain.ClassEntity;
import lombok.Getter;

@Getter
public class ClassResponse {
    private String teacherName;
    private int subjectCode;
    private String classTitle;
    private Byte classDay;
    private String classDesc;
    private byte timetableId;

    public ClassResponse(ClassEntity classEntity){
        this.teacherName = classEntity.getTeacherEntity().getName();
        this.subjectCode = classEntity.getSubjectEntity().getClassSubjectCode();
        this.classTitle = classEntity.getClassTitle();
        this.classDay = classEntity.getClassDay();
        this.classDesc = classEntity.getClassDesc();
        this.timetableId = classEntity.getTimetableEntity().getTimetableId();
    }
}
