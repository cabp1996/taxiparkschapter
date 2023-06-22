package com.example.taxis.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ShiftEntity {

    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer id;

    @Column(name = "name")
    @NotNull(message = "El name del shift no puede ser nulo")
    String name;

    @Column(name = "per_km")
    @NotNull(message = "El perKm del shift no puede ser nulo")
    String perKm;

    @Column(name = "value")
    @NotNull(message = "El value del shift no puede ser nulo")
    String value;

    @Column(name = "is_out")
    @NotNull(message = "El isOut del shift no puede ser nulo")
    Boolean isOut;
}
