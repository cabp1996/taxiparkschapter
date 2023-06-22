package com.example.taxis.controller;

import com.example.taxis.service.ModeratorService;
import com.example.taxis.service.dto.ModeratorDto;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5000")
@RestController
@RequestMapping("/moderator")
@AllArgsConstructor
public class ModeratorController {

    private ModeratorService moderatorService;

    @GetMapping
    public ResponseEntity<List<ModeratorDto>> getAllModerators() {
        return ResponseEntity.ok(moderatorService.getAllModerators());
    }

    @PostMapping
    public ResponseEntity<ModeratorDto> createModerator(@RequestBody ModeratorDto moderatorDto) {
        return ResponseEntity.ok(moderatorService.createModerator(moderatorDto));
    }
}
