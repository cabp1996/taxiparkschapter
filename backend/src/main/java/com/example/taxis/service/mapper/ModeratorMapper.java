package com.example.taxis.service.mapper;

import com.example.taxis.entity.ModeratorEntity;
import com.example.taxis.service.dto.ModeratorDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ModeratorMapper {
    ModeratorMapper INSTANCE = Mappers.getMapper(ModeratorMapper.class);
    ModeratorEntity toModeratorEntity(ModeratorDto dto);
    ModeratorDto toModeratorDto(ModeratorEntity entity);
}
