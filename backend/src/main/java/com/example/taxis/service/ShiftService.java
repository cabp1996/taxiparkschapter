package com.example.taxis.service;

import com.example.taxis.service.dto.ShiftDto;

import java.util.List;

public interface ShiftService {

    List<ShiftDto> getAllShifts();

    ShiftDto createShift(ShiftDto shiftDto);

    ShiftDto updateShift(Integer id, ShiftDto shiftDto);

    void deleteShift(Integer id);
}
