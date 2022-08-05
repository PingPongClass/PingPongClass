package com.pingpong.backend.api.domain.response;

import com.pingpong.backend.api.domain.StudentEntity;
import com.pingpong.backend.api.service.S3Service;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;


@Getter
public class StudentResponse {
    private int studentId;
    private String name;
    private int grade;
    private int classNum;
    private int studentNum;
    private String email;
    private String profile;
    private String profileFullPath;
    private int point;
    private int totalPoint;
    private String introduce;
    private String currentLevel;
    private String nextLevel;
    private int levelPoint;
    private int myRank;
    private int jandiColor;
    private int borderColor;

    @Autowired
    S3Service s3Service;
    public StudentResponse(StudentEntity entity, int myRank){
        this.studentId=entity.getStudentId();
        this.name=entity.getName();
        this.grade=entity.getGrade();
        this.classNum=entity.getClassNum();
        this.studentNum=entity.getStudentNum();
        this.email=entity.getEmail();
        this.profile=entity.getProfile();
        this.profileFullPath="https://" + s3Service.CLOUD_FRONT_DOMAIN_NAME+"/"+ entity.getProfile();
        this.point=entity.getPoint();
        this.totalPoint=entity.getTotalPoint();
        this.introduce=entity.getIntroduce();
        this.jandiColor=entity.getJandiColor();
        this.borderColor=entity.getBorderColor();

        HashMap<Integer, String> levelname = new HashMap<>();
        levelname.put(1, "Bronze");
        levelname.put(2, "Silver");
        levelname.put(3, "Gold");
        levelname.put(4, "Platinum");
        levelname.put(5, "Ruby");
        levelname.put(6, "Rainbow");

        HashMap<Integer, Integer> levelrank = new HashMap<>();
        levelrank.put(1, 0);
        levelrank.put(2, 1);
        levelrank.put(3, 25);
        levelrank.put(4, 50);
        levelrank.put(5, 75);
        levelrank.put(6, 100);

        this.currentLevel=levelname.get(level(entity.getTotalPoint()));
        if(level(entity.getTotalPoint())!=6) this.nextLevel=levelname.get(level(entity.getTotalPoint())+1);
        else this.nextLevel="End";
        if(level(entity.getTotalPoint())!=6) this.levelPoint = levelrank.get(level(entity.getTotalPoint())+1) - entity.getTotalPoint();
        else this.levelPoint=0;
        this.myRank=myRank;
    }

    private int level(int point){
        if(point >= 100){
            return 6;
        } else if(point >= 75){
            return 5;
        } else if(point >= 50){
            return 4;
        } else if(point >= 25){
            return 3;
        } else if(point >= 1) {
            return 2;
        } else return 1;
    }
}
