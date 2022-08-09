package com.pingpong.backend.api.domain.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StudentRequest {
    int studentId;
    byte grade;
    byte classNum;
    byte studentNum;
    String email;
    String password;
    String introduce;
    String profile;
}
