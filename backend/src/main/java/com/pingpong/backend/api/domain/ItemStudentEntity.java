package com.pingpong.backend.api.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
    @OnDelete(action= OnDeleteAction.CASCADE)
    private StudentEntity studentEntity;

    @ManyToOne
    @JoinColumn(name="item_id", nullable = false)
    @OnDelete(action= OnDeleteAction.CASCADE)
    private ItemEntity itemEntity;
}