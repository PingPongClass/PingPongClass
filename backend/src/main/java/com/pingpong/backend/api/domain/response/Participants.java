package com.pingpong.backend.api.domain.response;

import com.pingpong.backend.api.domain.StudentEntity;
import lombok.Getter;

@Getter
public class Participants {
    private int studentid;
    private String studentNickname;

    public Participants(StudentEntity studentEntity){
        String nickname = String.format("%d%02d%02d", studentEntity.getGrade(), studentEntity.getClassNum(), studentEntity.getStudentNum());
        this.studentid=studentEntity.getStudentId();
        this.studentNickname="["+nickname+"]"+studentEntity.getName();
    }
}
