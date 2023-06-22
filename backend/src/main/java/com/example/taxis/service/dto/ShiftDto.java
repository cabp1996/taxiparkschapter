package com.example.taxis.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShiftDto {
    Integer id;
    String name;
    String perKm;
    String value;
    Boolean isOut;
}
