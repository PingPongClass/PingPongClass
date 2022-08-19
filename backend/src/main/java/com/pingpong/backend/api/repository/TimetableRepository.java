package com.pingpong.backend.api.repository;


import com.pingpong.backend.api.domain.TimetableEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimetableRepository extends JpaRepository<TimetableEntity, Integer> {
}
