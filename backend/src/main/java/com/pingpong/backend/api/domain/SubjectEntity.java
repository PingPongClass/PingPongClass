package com.pingpong.backend.api.domain;

import javax.persistence.*;

import lombok.*;
@Getter
@NoArgsConstructor
@Entity
@Table(name="subject")
public class SubjectEntity {
    @Id
    private Byte classSubjectCode;

    @Column(nullable = false, length=10)
    private String name;

    @Builder
    public SubjectEntity(byte classSubjectCode, String name){
        this.classSubjectCode = classSubjectCode;
        this.name = name;
    }
}
