package com.example.taxis.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CarclassEntity {

    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer id;

    @Column(name = "name")
    @NotNull(message = "El name de la clase no puede ser nulo")
    String name;

    @Column(name = "starting_value")
    @NotNull(message = "El startingValue de la clase no puede ser nulo")
    Integer startingValue;

    @Column(name = "free_km")
    @NotNull(message = "El freeKm de la clase no puede ser nulo")
    Integer freeKm;

    @Column(name = "per_km_value")
    @NotNull(message = "El perKmValue de la clase no puede ser nulo")
    Integer perKmValue;

    @Column(name = "per_minute_value")
    @NotNull(message = "El perMinuteValue de la clase no puede ser nulo")
    Integer perMinuteValue;


    @Column(name = "waiting_time")
    @NotNull(message = "El waitingTime de la clase no puede ser nulo")
    Integer waitingTime;

    @Column(name = "out_of_branch")
    @NotNull(message = "El outOfBranch de la clase no puede ser nulo")
    Integer outOfBranch;

    @Column(name = "lightning")
    @NotNull(message = "El lightning del car class no puede ser nulo")
    Boolean lightning;

    @Column(name = "delivery")
    @NotNull(message = "El delivery del car class no puede ser nulo")
    Boolean delivery;
}
