package com.pingpong.backend.api.domain.request;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FindPwdRequest {
    int userId;
    String email;
}
