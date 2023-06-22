package com.example.taxis.controller;

import com.example.taxis.service.RideService;
import com.example.taxis.service.dto.RideDto;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5000")
@RestController
@RequestMapping("/ride")
@AllArgsConstructor
public class RideController {

    private final RideService rideService;

    @GetMapping
    public ResponseEntity<List<RideDto>> getAllRides() {
        return ResponseEntity.ok(rideService.getAllRides());
    }

}
