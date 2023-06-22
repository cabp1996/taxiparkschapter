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
public class UserEntity {

    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer id;

    @Column(name = "phone")
    @NotNull(message = "El phone no puede ser null")
    String phone;

    @Column(name = "password")
    @NotNull(message = "El password no puede ser null")
    String password;

    @Column(name = "name")
    @NotNull(message = "El name no puede ser null")
    String name;
}
