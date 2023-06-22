package com.example.taxis.service.impl;

import com.example.taxis.entity.ModeratorEntity;
import com.example.taxis.repository.ModeratorRepository;
import com.example.taxis.service.ModeratorService;
import com.example.taxis.service.dto.ModeratorDto;
import com.example.taxis.service.mapper.ModeratorMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ModeratorServiceImpl implements ModeratorService {

    private final ModeratorRepository moderatorRepository;


    @Override
    public List<ModeratorDto> getAllModerators() {
        List<ModeratorDto> moderators = moderatorRepository.findAll().stream().map(entities -> entityToDto(entities)).collect(Collectors.toList()); //siempre retorna la entity no el dto, se debe mapear
        return moderators;
    }

    @Override
    public ModeratorDto createModerator(ModeratorDto moderatorDto) {
        ModeratorEntity moderator = moderatorRepository.save(dtoToEntity(moderatorDto));
        return entityToDto(moderator);
    }

    private ModeratorDto entityToDto(ModeratorEntity entity) {
        return ModeratorMapper.INSTANCE.toModeratorDto(entity);
    }

    private ModeratorEntity dtoToEntity(ModeratorDto dto) {
        return ModeratorMapper.INSTANCE.toModeratorEntity(dto);
    }
}
