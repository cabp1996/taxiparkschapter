package com.example.taxis.service;

import com.example.taxis.service.dto.CarclassDto;

import java.util.List;

public interface CarclassService {

    List<CarclassDto> getAllCarclasses();

    CarclassDto getCarclassById(Integer id);

    CarclassDto createCarClass(CarclassDto carclassDto);

    CarclassDto updateCarClass(Integer id, CarclassDto carclassDto);

    void deleteCarclass(Integer id);
}
