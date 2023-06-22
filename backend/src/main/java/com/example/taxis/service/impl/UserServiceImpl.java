package com.example.taxis.service.impl;

import com.example.taxis.entity.UserEntity;
import com.example.taxis.repository.UserRepository;
import com.example.taxis.service.UserService;
import com.example.taxis.service.dto.UserDto;
import com.example.taxis.service.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public void createUser(UserDto user) {
        userRepository.save(dtoToEntity(user));
    }

    UserEntity dtoToEntity(UserDto dto) {
        return UserMapper.INSTANCE.userDtoToEntity(dto);
    }
}
