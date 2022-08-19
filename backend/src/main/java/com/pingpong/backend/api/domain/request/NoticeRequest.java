package com.pingpong.backend.api.domain.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class NoticeRequest {

    private int classId;
    private int teacherId;
    private String title;
    private String content;
}