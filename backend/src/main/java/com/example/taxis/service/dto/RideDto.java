package com.example.taxis.service.dto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RideDto {
    Integer id;

    String userName;

    String userPhone;

    String carComfort;

    LocalDateTime orderedTime;

    String startLocation;

    String finishLocation;

    Double income;

    String reason;

    String status;
}
