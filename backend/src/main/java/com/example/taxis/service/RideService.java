package com.example.taxis.service;

import com.example.taxis.service.dto.RideDto;

import java.util.List;

public interface RideService {

    List<RideDto> getAllRides();

    void addRide(RideDto ride);
}
