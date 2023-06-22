package com.example.taxis.repository;

import com.example.taxis.entity.RideEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RideRepository extends JpaRepository<RideEntity, Integer> {
}
