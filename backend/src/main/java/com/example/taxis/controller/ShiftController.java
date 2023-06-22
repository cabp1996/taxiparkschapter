package com.example.taxis.controller;

import com.example.taxis.service.ShiftService;
import com.example.taxis.service.dto.ShiftDto;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5000")
@RestController
@RequestMapping("/shift")
@AllArgsConstructor
public class ShiftController {
    private final ShiftService shiftService;

    @GetMapping
    public ResponseEntity<List<ShiftDto>> getAllShifts() {
        return ResponseEntity.ok(shiftService.getAllShifts());
    }

    @PostMapping
    public ResponseEntity<ShiftDto> createShift(@RequestBody ShiftDto shiftDto) {
        return ResponseEntity.ok(shiftService.createShift(shiftDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ShiftDto> updateShift(@PathVariable Integer id, @RequestBody ShiftDto shiftDto) {
        return ResponseEntity.ok(shiftService.updateShift(id, shiftDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteShift(@PathVariable Integer id) {
        shiftService.deleteShift(id);
        return ResponseEntity.noContent().build();
    }
}
