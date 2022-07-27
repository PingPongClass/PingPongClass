package com.pingpong.backend.api.repository;

import com.pingpong.backend.api.domain.LogEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LogRepository extends JpaRepository<LogEntity, Integer> {
}
