package com.example.taxis.service.mapper;

import com.example.taxis.entity.CarclassEntity;
import com.example.taxis.service.dto.CarclassDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CarclassMapper {

    CarclassMapper INSTANCE = Mappers.getMapper(CarclassMapper.class);

    CarclassEntity toCarclassEntity(CarclassDto dto);
    CarclassDto toCarclassDto(CarclassEntity entity);
}
