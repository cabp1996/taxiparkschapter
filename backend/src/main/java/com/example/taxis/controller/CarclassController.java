package com.example.taxis.controller;

import com.example.taxis.service.CarclassService;
import com.example.taxis.service.dto.CarclassDto;
import com.example.taxis.service.dto.ModeratorDto;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5000")
@RestController
@RequestMapping("/carclass")
@AllArgsConstructor
public class CarclassController {

    private CarclassService carclassService;

    @GetMapping
    public ResponseEntity<List<CarclassDto>> getAllCarClasses() {
        return ResponseEntity.ok(carclassService.getAllCarclasses());
    }

    @PostMapping
    public ResponseEntity<CarclassDto> createCarclass(@RequestBody CarclassDto carclassDto) {
        return ResponseEntity.ok(carclassService.createCarClass(carclassDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCarclass(@PathVariable Integer id) {
        carclassService.deleteCarclass(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<CarclassDto> updateCarclass(@PathVariable Integer id, @RequestBody CarclassDto carclassDto) {
        return ResponseEntity.ok(carclassService.updateCarClass(id, carclassDto));
    }
}
