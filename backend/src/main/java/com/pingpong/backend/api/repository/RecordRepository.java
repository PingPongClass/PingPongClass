package com.pingpong.backend.api.repository;

import com.pingpong.backend.api.domain.ClassEntity;
import com.pingpong.backend.api.domain.RecordEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecordRepository extends JpaRepository <RecordEntity, Integer>{
    //List<RecordEntity> findByClassId(int classId);
    List<RecordEntity> findByClassEntity(ClassEntity classEntity, Sort sort);
}
