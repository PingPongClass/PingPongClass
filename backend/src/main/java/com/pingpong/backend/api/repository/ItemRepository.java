package com.pingpong.backend.api.repository;

import com.pingpong.backend.api.domain.ItemEntity;
import com.pingpong.backend.api.domain.ItemStudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository<ItemEntity, Integer> {

}
