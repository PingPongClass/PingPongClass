package com.pingpong.backend.api.domain.response;

import lombok.Getter;
import java.util.List;

@Getter
public class ClassStudentResponse {
    private int classId;
    private List<Participants> participantsList;

    public ClassStudentResponse(int classId, List<Participants> participantsList){
        this.classId=classId;
        this.participantsList=participantsList;
    }
}
