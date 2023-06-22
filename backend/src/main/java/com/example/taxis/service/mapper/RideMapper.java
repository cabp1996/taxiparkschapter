package com.example.taxis.service.mapper;

import com.example.taxis.entity.RideEntity;
import com.example.taxis.service.dto.RideDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
@Mapper
public interface RideMapper {

    RideMapper INSTANCE = Mappers.getMapper(RideMapper.class);

    RideDto rideEntityToDto(RideEntity rideEntity);

    RideEntity rideDtoToEntity(RideDto rideDto);
}
