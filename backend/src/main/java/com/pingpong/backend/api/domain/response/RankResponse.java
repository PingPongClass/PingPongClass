package com.pingpong.backend.api.domain.response;

import com.pingpong.backend.api.domain.RankingEntity;
import lombok.Getter;

@Getter
public class RankResponse {
    int rankNum;
    int studentId;
    String name;
    int totalPoint;
    String introduce;

    public RankResponse(RankingEntity entity){
        this.rankNum=entity.getRankNum();
        this.studentId=entity.getStudent().getStudentId();
        this.name=entity.getStudent().getName();
        this.totalPoint=entity.getStudent().getTotalPoint();
        this.introduce=entity.getStudent().getIntroduce();
    }
}
