package com.example.taxis.service.impl;

import com.example.taxis.entity.CarclassEntity;
import com.example.taxis.repository.CarclassRepository;
import com.example.taxis.service.CarclassService;
import com.example.taxis.service.dto.CarclassDto;
import com.example.taxis.service.mapper.CarclassMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CarclassServiceImpl implements CarclassService {

    private final CarclassRepository carclassRepository;

    @Override
    public List<CarclassDto> getAllCarclasses() {
        List<CarclassDto> carClasses = carclassRepository.findAll().stream().map((carclassEntity -> entityToDto(carclassEntity))).collect(Collectors.toList());
        return carClasses;
    }

    @Override
    public CarclassDto createCarClass(CarclassDto carclassDto) {
        CarclassEntity carClass = carclassRepository.save(dtoToEntity(carclassDto));
        return entityToDto(carClass);
    }

    @Override
    public CarclassDto updateCarClass(Integer id, CarclassDto carclassDto) {
        Optional<CarclassEntity> carClassToUpdate = carclassRepository.findById(id);

        if (carClassToUpdate == null) {
            throw new NoSuchElementException("Car class not found id: " + id);
        }
        carClassToUpdate.get().setName(carclassDto.getName());
        carClassToUpdate.get().setFreeKm(carclassDto.getFreeKm());
        carClassToUpdate.get().setStartingValue(carclassDto.getStartingValue());
        carClassToUpdate.get().setPerKmValue(carclassDto.getPerKmValue());
        carClassToUpdate.get().setWaitingTime(carclassDto.getWaitingTime());
        carClassToUpdate.get().setOutOfBranch(carclassDto.getOutOfBranch());
        carClassToUpdate.get().setDelivery(carclassDto.getDelivery());
        carClassToUpdate.get().setLightning(carclassDto.getLightning());

        CarclassEntity carClass = carclassRepository.save(carClassToUpdate.get());
        return entityToDto(carClass);
    }

    @Override
    public void deleteCarclass(Integer id) {
        carclassRepository.deleteById(id);
    }

    @Override
    public CarclassDto getCarclassById(Integer id) {
        return entityToDto(carclassRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Carclass not found id: " + id)));
    }

    private CarclassDto entityToDto(CarclassEntity entity) {
        return CarclassMapper.INSTANCE.toCarclassDto(entity);
    }

    private CarclassEntity dtoToEntity(CarclassDto dto) {
        return CarclassMapper.INSTANCE.toCarclassEntity(dto);
    }
}
