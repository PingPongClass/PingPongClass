package com.pingpong.backend.api.domain.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TeacherRequest {
    int teacherId;
    String email;
    String password;
    String profile;
    int manageGrade;
}
