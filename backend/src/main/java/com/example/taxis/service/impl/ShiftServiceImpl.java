package com.example.taxis.service.impl;

import com.example.taxis.entity.ShiftEntity;
import com.example.taxis.repository.ShiftRepository;
import com.example.taxis.service.ShiftService;
import com.example.taxis.service.dto.ShiftDto;
import com.example.taxis.service.mapper.ClientMapper;
import com.example.taxis.service.mapper.ShiftMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ShiftServiceImpl implements ShiftService {

    private final ShiftRepository shiftRepository;

    @Override
    public List<ShiftDto> getAllShifts() {
        List<ShiftDto> shifts = shiftRepository.findAll().stream().map(shiftEntity -> entityToDto(shiftEntity)).collect(Collectors.toList());
        return shifts;
    }

    @Override
    public ShiftDto createShift(ShiftDto shiftDto) {
        ShiftEntity shift = shiftRepository.save(dtoToEntity(shiftDto));
        return entityToDto(shift);
    }

    @Override
    public ShiftDto updateShift(Integer id, ShiftDto shiftDto) {
        Optional<ShiftEntity> shiftEntity = shiftRepository.findById(id);
        if (shiftEntity == null) {
            throw new NoSuchElementException("Shift not found id: " + id);
        }

        shiftEntity.get().setName(shiftDto.getName());
        shiftEntity.get().setValue(shiftDto.getValue());
        shiftEntity.get().setPerKm(shiftDto.getPerKm());
        shiftEntity.get().setIsOut(shiftDto.getIsOut());
        ShiftEntity updatedShift = shiftRepository.save(shiftEntity.get());
        return entityToDto(updatedShift);
    }

    @Override
    public void deleteShift(Integer id) {
        shiftRepository.deleteById(id);
    }

    ShiftEntity dtoToEntity(ShiftDto dto) {
        return ShiftMapper.INSTANCE.shiftDtoToEntity(dto);
    }

    ShiftDto entityToDto(ShiftEntity shiftEntity) {
        return ShiftMapper.INSTANCE.shiftEntityToDto(shiftEntity);
    }
}
