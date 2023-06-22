package com.example.taxis.service.impl;

import com.example.taxis.entity.ClientEntity;
import com.example.taxis.entity.RideEntity;
import com.example.taxis.repository.RideRepository;
import com.example.taxis.service.RideService;
import com.example.taxis.service.dto.ClientDto;
import com.example.taxis.service.dto.RideDto;
import com.example.taxis.service.mapper.ClientMapper;
import com.example.taxis.service.mapper.RideMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RideServiceImpl implements RideService {

    private final RideRepository rideRepository;

    @Override
    public List<RideDto> getAllRides() {
        List<RideDto> rides= rideRepository.findAll().stream().map(entities->entiyToDto(entities)).collect(Collectors.toList());
        return rides;
    }

    @Override
    public void addRide(RideDto rideDto) {
        RideEntity ride= rideRepository.save(dtoToEntity(rideDto));
    }

    RideDto entiyToDto(RideEntity entity) {
        return RideMapper.INSTANCE.rideEntityToDto(entity);
    }

    RideEntity dtoToEntity(RideDto dto) {
        return RideMapper.INSTANCE.rideDtoToEntity(dto);
    }
}
