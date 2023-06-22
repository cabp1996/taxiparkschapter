package com.example.taxis.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RideEntity {

    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer id;

    @Column(name = "user_name")
    @NotNull(message = "El user name del ride no puede ser nulo")
    String userName;

    @Column(name = "user_phone")
    @NotNull(message = "El user phone del ride no puede ser nulo")
    String userPhone;

    @Column(name = "car_comfort")
    @NotNull(message = "El car comfort del ride no puede ser nulo")
    String carComfort;

    @Column(name = "ordered_time")
    @NotNull(message = "El ordered time del ride no puede ser nulo")
    @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
    LocalDateTime orderedTime;

    @Column(name = "start_location")
    @NotNull(message = "El start location del ride no puede ser nulo")
    String startLocation;

    @Column(name = "finish_location")
    @NotNull(message = "El finish location del ride no puede ser nulo")
    String finishLocation;

    @Column(name = "income")
    @NotNull(message = "El income del ride no puede ser nulo")
    Double income;

    @Column(name = "reason")
    @NotNull(message = "El reason del ride no puede ser nulo")
    String reason;

    @Column(name = "status")
    @NotNull(message = "El status del ride no puede ser nulo")
    String status;
}
