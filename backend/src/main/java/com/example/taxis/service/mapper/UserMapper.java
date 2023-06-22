package com.example.taxis.service.mapper;

import com.example.taxis.entity.ShiftEntity;
import com.example.taxis.entity.UserEntity;
import com.example.taxis.service.dto.ShiftDto;
import com.example.taxis.service.dto.UserDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserDto userEntityToDto(UserEntity userEntity);
    UserEntity userDtoToEntity(UserDto userDto);
}
