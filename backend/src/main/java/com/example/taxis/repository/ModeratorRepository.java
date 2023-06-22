package com.example.taxis.repository;

import com.example.taxis.entity.ModeratorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModeratorRepository extends JpaRepository<ModeratorEntity,Integer> {
}
