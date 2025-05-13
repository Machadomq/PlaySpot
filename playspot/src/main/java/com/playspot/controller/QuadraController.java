package com.playspot.controller;

import com.playspot.model.Quadra;
import com.playspot.service.QuadraService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/quadras")
@CrossOrigin(origins = "http://localhost:5173")
public class QuadraController {

    private final QuadraService quadraService;

    public QuadraController(QuadraService quadraService) {
        this.quadraService = quadraService;
    }    
    
    @PostMapping("/cadastrar")
    public ResponseEntity<Quadra> createQuadra(@RequestBody Quadra quadra) {
        Quadra savedQuadra = quadraService.saveQuadra(quadra);
        return ResponseEntity.ok(savedQuadra);
    }
    
    // Endpoint para listar todas as quadras
    @GetMapping
    public ResponseEntity<List<Quadra>> getAllQuadras() {
        List<Quadra> quadras = quadraService.findAllQuadras();
        return ResponseEntity.ok(quadras);
    }
    
    // Endpoint para listar quadras por proprietário
    @GetMapping("/proprietario/{idProprietario}")
    public ResponseEntity<List<Quadra>> getQuadrasByProprietario(@PathVariable int idProprietario) {
        List<Quadra> quadras = quadraService.findByIdProprietario(idProprietario);
        return ResponseEntity.ok(quadras);
    }
    
    // Endpoint para buscar uma quadra específica por ID
    @GetMapping("/{idQuadra}")
    public ResponseEntity<Quadra> getQuadraById(@PathVariable int idQuadra) {
        Optional<Quadra> quadra = quadraService.findQuadraById(idQuadra);
        return quadra.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    // Endpoint para atualizar uma quadra
    @PutMapping("/{idQuadra}")
    public ResponseEntity<Quadra> updateQuadra(@PathVariable int idQuadra, @RequestBody Quadra quadraDetails) {
        Quadra updatedQuadra = quadraService.updateQuadra(idQuadra, quadraDetails);
        if (updatedQuadra != null) {
            return ResponseEntity.ok(updatedQuadra);
        }
        return ResponseEntity.notFound().build();
    }
    
    // Endpoint para excluir uma quadra
    @DeleteMapping("/{idQuadra}")
    public ResponseEntity<Void> deleteQuadra(@PathVariable int idQuadra) {
        boolean deleted = quadraService.deleteQuadra(idQuadra);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}