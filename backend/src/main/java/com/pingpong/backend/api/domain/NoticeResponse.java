package com.pingpong.backend.api.domain;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class NoticeResponse {
    private int noticeId;
    private String writer;
    private String classTitle;
    private String title;
    private String content;
    private LocalDateTime regtime;

    public NoticeResponse(NoticeEntity entity){
        this.noticeId = entity.getNoticeId();
        this.writer = entity.getTeacherEntity().getName();
        this.classTitle = entity.getClassEntity().getClassTitle();
        this.title = entity.getTitle();
        this.content = entity.getContent();
        this.regtime = entity.getRegtime();
    }
}
