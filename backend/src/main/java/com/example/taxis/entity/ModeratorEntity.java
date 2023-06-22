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
public class ModeratorEntity {
    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer id;

    @Column(name = "name")
    @NotNull(message = "El name del moderator no puede ser nulo")
    String name;

    @Column(name = "file_url")
    @NotNull(message = "File url del moderator no puede ser nulo")
    String fileUrl;
}
