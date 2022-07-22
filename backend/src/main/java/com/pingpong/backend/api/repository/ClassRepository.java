package com.pingpong.backend.api.repository;

import com.pingpong.backend.api.domain.ClassEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassRepository extends JpaRepository<ClassEntity, Integer> {
}
