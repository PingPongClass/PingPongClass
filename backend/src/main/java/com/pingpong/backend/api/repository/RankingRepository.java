package com.pingpong.backend.api.repository;

import com.pingpong.backend.api.domain.RankingEntity;
import com.pingpong.backend.api.domain.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RankingRepository extends JpaRepository<RankingEntity, Integer> {
    RankingEntity findFirstByStudent(StudentEntity student);
}