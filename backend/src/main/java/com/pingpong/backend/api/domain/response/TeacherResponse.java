package com.pingpong.backend.api.domain.response;

import com.pingpong.backend.api.domain.TeacherEntity;
import com.pingpong.backend.api.service.S3Service;
import lombok.Getter;

@Getter
public class TeacherResponse {
    private int teacherId;
    private String name;
    private String birth;
    private String email;
    private String profile;
    private String profileFullPath;
    private int manageGrade;
    private int isAdmin;

    private S3Service s3Service;

    public TeacherResponse(TeacherEntity entity){
        this.teacherId=entity.getTeacherId();
        this.name=entity.getName();
        this.birth=entity.getBirth();
        this.email=entity.getEmail();
        this.profile=entity.getProfile();
        this.profileFullPath="https://" + s3Service.CLOUD_FRONT_DOMAIN_NAME+"/"+ entity.getProfile();
        this.manageGrade=entity.getManageGrade();
        this.isAdmin=entity.getIsAdmin();
    }
}
