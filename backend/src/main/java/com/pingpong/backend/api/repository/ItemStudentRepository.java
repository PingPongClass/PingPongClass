package com.pingpong.backend.api.repository;

import com.pingpong.backend.api.domain.ItemEntity;
import com.pingpong.backend.api.domain.ItemStudentEntity;
import com.pingpong.backend.api.domain.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ItemStudentRepository extends JpaRepository<ItemStudentEntity, Integer> {
    int countByStudentEntityAndItemEntity(StudentEntity studentEntity, ItemEntity itemEntity);

    ItemStudentEntity findFirstByStudentEntityAndItemEntity(StudentEntity studentEntity, ItemEntity itemEntity);

    List<ItemStudentEntity> findAllByStudentEntity(StudentEntity student);
}
