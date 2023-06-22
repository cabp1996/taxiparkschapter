package com.example.taxis.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data //getters ans setters
@AllArgsConstructor //constructor con todos los argumentos
@NoArgsConstructor
public class ModeratorDto {
    Integer id;
    String name;
    String fileUrl;
}
