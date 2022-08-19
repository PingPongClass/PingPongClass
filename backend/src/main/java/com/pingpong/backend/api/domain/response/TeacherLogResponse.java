package com.pingpong.backend.api.domain.response;

import com.pingpong.backend.api.domain.ClassEntity;
import com.pingpong.backend.api.domain.LogEntity;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
public class TeacherLogResponse {
    int classId;
    int classDay;
    String classTitle;
    String subjectName;
    int timeTableId;
    int totalStuNum;
    int attendStuNum;
    int totalPoint;
    int totalPresentCnt;
    List<LogEntity> logEntityList;

    public TeacherLogResponse(int totalStuNum, ClassEntity classEntity, List<LogEntity> logEntityList){
        this.classId=classEntity.getClassId();
        this.classDay=classEntity.getClassDay();
        this.classTitle=classEntity.getClassTitle();
        this.subjectName=classEntity.getSubjectEntity().getName();
        this.timeTableId=classEntity.getTimetableEntity().getTimetableId();
        this.totalStuNum=totalStuNum;
        int num=0;
        int point=0;
        int present=0;
        if(logEntityList.size()!=0) {
            for (LogEntity entity : logEntityList) {
                if (entity.isAttendance()) num++;
                point += entity.getPoint();
                present += entity.getPresentCnt();
            }
        }
        this.attendStuNum=num;
        this.totalPoint=point;
        this.totalPresentCnt=present;
        this.logEntityList=logEntityList;
    }

}