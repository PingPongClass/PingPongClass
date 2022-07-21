package com.pingpong.backend.api.model;

import javax.persistence.*;

//import lombok.*;
//@Getter
//@Builder
//@AllArgsConstructor
//@NoArgsConstructor

@Entity
@Table(name="subject")
public class SubjectEntity {
    @Id
    @Column(name = "class_subject_code",  nullable = false, columnDefinition = "TINYINT")
    private int classSubjectCode;

    @Column(name="name", nullable = false, length=10)
    private String name;

}
