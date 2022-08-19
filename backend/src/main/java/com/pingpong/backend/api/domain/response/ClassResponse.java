package com.pingpong.backend.api.domain.response;
import com.pingpong.backend.api.domain.ClassEntity;
import com.pingpong.backend.api.domain.SubjectEntity;
import lombok.Getter;

//목록 조회용 response

@Getter
public class ClassResponse {
    private int classId;
    private String teacherName;
    private SubjectEntity subjectEntity;
    private String classTitle;
    private int classDay;
    private String classDesc;
    private int timetableId;

    public ClassResponse(ClassEntity classEntity){
        this.classId=classEntity.getClassId();
        this.teacherName = classEntity.getTeacherEntity().getName();
        this.subjectEntity = classEntity.getSubjectEntity();
        this.classTitle = classEntity.getClassTitle();
        this.classDay = classEntity.getClassDay();
        this.classDesc = classEntity.getClassDesc();
        this.timetableId = classEntity.getTimetableEntity().getTimetableId();
    }
}
