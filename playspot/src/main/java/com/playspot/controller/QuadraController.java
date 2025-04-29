package com.playspot.controller;

import com.playspot.model.Quadra;
import com.playspot.service.QuadraService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/quadras/cadastrar")
@CrossOrigin(origins = "http://localhost:5173")
public class QuadraController {

    private final QuadraService quadraService;

    public QuadraController(QuadraService quadraService) {
        this.quadraService = quadraService;
    }

    @PostMapping
    public ResponseEntity<Quadra> createQuadra(@RequestBody Quadra quadra) {
        Quadra savedQuadra = quadraService.saveQuadra(quadra);
        return ResponseEntity.ok(savedQuadra);
    }
}