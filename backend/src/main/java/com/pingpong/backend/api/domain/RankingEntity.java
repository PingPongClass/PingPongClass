package com.pingpong.backend.api.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="ranking")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RankingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private int rankId;

    @OneToOne
    @JoinColumn(name="student_id", nullable = false)
    private StudentEntity student;

    @Column(nullable = false)
    private int rankNum;

    @Builder
    public RankingEntity(StudentEntity student, int rankNum){
        this.student=student;
        this.rankNum=rankNum;
    }
}