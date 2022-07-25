package com.pingpong.backend.api.repository;

import com.pingpong.backend.api.domain.RecordEntity;
import io.netty.util.internal.IntegerHolder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecordRepository extends JpaRepository <RecordEntity, IntegerHolder>{
}
