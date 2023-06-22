package com.example.taxis.service;

import com.example.taxis.service.dto.ModeratorDto;

import java.util.List;

public interface ModeratorService {

    List<ModeratorDto> getAllModerators();

    ModeratorDto createModerator(ModeratorDto moderatorDto);

}
