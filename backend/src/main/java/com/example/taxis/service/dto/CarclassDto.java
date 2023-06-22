package com.example.taxis.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CarclassDto {
    Integer id;
    String name;
    Integer startingValue;
    Integer freeKm;
    Integer perKmValue;
    Integer perMinuteValue;
    Integer waitingTime;
    Integer outOfBranch;
    Boolean lightning;
    Boolean delivery;
}
