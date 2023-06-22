package com.example.taxis.service.dto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientDto {
    Integer id;
    String name;
    String lastName;
    String phone;
    Integer totalRides;
    Integer totalFinished;
    String homeLocation;
    String workLocation;
    String fileUrl;
}
