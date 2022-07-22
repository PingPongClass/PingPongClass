package com.pingpong.backend.api.domain;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class NoticeResponse {
    private int noticeId;
    private TeacherEntity teacherEntity;
    private ClassEntity classEntity;
    private String title;
    private String content;
    private LocalDateTime regtime;

    public NoticeResponse(NoticeEntity entity){
        this.noticeId = entity.getNoticeId();
        this.teacherEntity = entity.getTeacherEntity();
        this.classEntity = entity.getClassEntity();
        this.title = entity.getTitle();
        this.content = entity.getContent();
        this.regtime = entity.getRegtime();
    }
}
