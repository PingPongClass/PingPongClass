package com.pingpong.backend.api.domain.response;

import com.pingpong.backend.api.domain.LogEntity;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
public class TeacherLogResponse {
    int totalStuNum;
    int attendStuNum;
    int totalPoint;
    int totalPresentCnt;
    List<LogEntity> logEntityList;

    public TeacherLogResponse(int totalStuNum, List<LogEntity> logEntityList){
        this.totalStuNum=totalStuNum;
        int num=0;
        int point=0;
        int present=0;
        for(LogEntity entity : logEntityList) {
            if(entity.isAttendance()) num++;
            point+=entity.getPoint();
            present+=entity.getPresentCnt();
        }
        this.attendStuNum=num;
        this.totalPoint=point;
        this.totalPresentCnt=present;
        this.logEntityList=logEntityList;
    }

}
