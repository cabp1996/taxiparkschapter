package com.example.taxis.service.mapper;

import com.example.taxis.entity.ClientEntity;
import com.example.taxis.service.dto.ClientDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ClientMapper {

    ClientMapper INSTANCE = Mappers.getMapper(ClientMapper.class);

    ClientEntity toClientEntity(ClientDto dto);

    ClientDto toClientDto(ClientEntity entity);
}
