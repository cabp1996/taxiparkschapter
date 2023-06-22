package com.example.taxis.repository;

import com.example.taxis.entity.CarclassEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarclassRepository extends JpaRepository<CarclassEntity,Integer> {
}
