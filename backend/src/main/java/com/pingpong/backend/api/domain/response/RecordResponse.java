package com.pingpong.backend.api.domain.response;

import com.pingpong.backend.api.domain.RecordEntity;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class RecordResponse {
    private int recordId;
    private int teacherId;
    private String classTitle;
    private String videoUrl;
    private LocalDate videoSavetime;


    public RecordResponse(RecordEntity recordEntity){
        this.recordId = recordEntity.getRecordId();
        this.teacherId = recordEntity.getClassEntity().getTeacherEntity().getTeacherId();
        this.classTitle=recordEntity.getClassEntity().getClassTitle();
        this.videoUrl = recordEntity.getVideoUrl();
        this.videoSavetime = recordEntity.getVideoSavetime();
    }
}
