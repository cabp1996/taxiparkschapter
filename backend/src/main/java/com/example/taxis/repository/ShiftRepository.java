package com.example.taxis.repository;

import com.example.taxis.entity.ShiftEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShiftRepository extends JpaRepository<ShiftEntity, Integer> {
}
