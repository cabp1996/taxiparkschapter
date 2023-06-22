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
public class ClientEntity {

    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer id;

    @Column(name = "name")
    @NotNull(message = "El name del cliente no puede ser nulo")
    String name;


    @Column(name = "last_name")
    @NotNull(message = "El lastName del cliente no puede ser nulo")
    String lastName;

    @Column(name = "phone")
    @NotNull(message = "El phone del cliente no puede ser nulo")
    String phone;

    @Column(name = "total_rides")
    @NotNull(message = "Total rides del cliente no puede ser nulo")
    Integer totalRides;

    @Column(name = "total_finished")
    @NotNull(message = "Total finished del cliente no puede ser nulo")
    Integer totalFinished;

    @Column(name="home_location")
    @NotNull(message = "Home location del cliente no puede ser nulo")
    String homeLocation;

    @Column(name = "work_location")
    @NotNull(message = "Work location del cliente no puede ser nulo")
    String workLocation;

    @Column(name = "file_url")
    @NotNull(message = "File url del cliente no puede ser nulo")
    String fileUrl;
}
