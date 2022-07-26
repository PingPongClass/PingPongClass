package com.pingpong.backend.api.repository;

import com.pingpong.backend.api.domain.StudentExcelTest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentExcelRepository extends JpaRepository<StudentExcelTest, Integer> {
}
