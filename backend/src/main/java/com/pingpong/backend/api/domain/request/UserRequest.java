package com.pingpong.backend.api.domain.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class UserRequest {
    //필요
    @Getter
    @Setter
    @Builder
    public static class StudentSignUp {
        private String name;
        private byte grade;
        private byte classNum;
        private byte studentNum;
    }

    @Getter
    @Setter
    @Builder
    public static class TeacherSignUp {
        private String name;
        private int manageGrade;
        private String birth;
        private int isAdmin;
    }

    @Getter
    @Setter
    public static class Login {
        private int id;
        private String password;
    }
}