package com.example.taxis.service.mapper;

import com.example.taxis.entity.ShiftEntity;
import com.example.taxis.service.dto.ShiftDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ShiftMapper {

    ShiftMapper INSTANCE = Mappers.getMapper(ShiftMapper.class);

    ShiftDto shiftEntityToDto(ShiftEntity shiftEntity);

    ShiftEntity shiftDtoToEntity(ShiftDto shiftDto);
}
