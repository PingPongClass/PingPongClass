package com.pingpong.backend.api.repository;

import com.pingpong.backend.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}