package com.pingpong.backend.api.repository;

import com.pingpong.backend.api.domain.SubjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface SubjectRepository extends JpaRepository<SubjectEntity, Integer> {
}
