package com.pingpong.backend.api.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="item_student")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ItemStudentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int itemIndex;

    @ManyToOne
    @JoinColumn(name="student_id", nullable = false)
    private StudentEntity studentEntity;

    @ManyToOne
    @JoinColumn(name="item_id", nullable = false)
    private ItemEntity itemEntity;
}