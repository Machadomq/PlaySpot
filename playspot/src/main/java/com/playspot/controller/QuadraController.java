package com.playspot.controller;

import com.playspot.model.Quadra;
import com.playspot.service.QuadraService;
import com.playspot.service.AuthorizationService;
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
    private final AuthorizationService authorizationService;

    public QuadraController(QuadraService quadraService, AuthorizationService authorizationService) {
        this.quadraService = quadraService;
        this.authorizationService = authorizationService;
    }
      @PostMapping("/cadastrar")
    public ResponseEntity<?> createQuadra(@RequestBody Quadra quadra, @RequestHeader("userId") int userId) {
        // Verifica se o usuário pode cadastrar quadras (proprietário ou admin)
        if (!authorizationService.canAccessWorkbench(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body("Acesso negado. Apenas proprietários e administradores podem cadastrar quadras.");
        }
        
        // Se for proprietário, só pode cadastrar quadra para si mesmo
        if (authorizationService.isProprietario(userId) && quadra.getIdProprietario() != userId) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body("Proprietários só podem cadastrar quadras para si mesmos.");
        }
        
        Quadra savedQuadra = quadraService.saveQuadra(quadra);
        return ResponseEntity.ok(savedQuadra);
    }
      // Endpoint para listar todas as quadras
    @GetMapping
    public ResponseEntity<?> getAllQuadras(@RequestHeader("userId") int userId) {
        // Apenas administradores podem ver todas as quadras
        if (!authorizationService.canViewAllQuadras(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body("Acesso negado. Apenas administradores podem visualizar todas as quadras.");
        }
        
        List<Quadra> quadras = quadraService.findAllQuadras();
        return ResponseEntity.ok(quadras);
    }
      // Endpoint para listar quadras por proprietário
    @GetMapping("/proprietario/{idProprietario}")
    public ResponseEntity<?> getQuadrasByProprietario(@PathVariable int idProprietario, @RequestHeader("userId") int userId) {
        // Verifica se o usuário pode ver as quadras deste proprietário
        if (!authorizationService.canViewQuadrasFromProprietario(userId, idProprietario)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body("Acesso negado. Você só pode visualizar suas próprias quadras.");
        }
        
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
    public ResponseEntity<?> updateQuadra(@PathVariable int idQuadra, @RequestBody Quadra quadraDetails, @RequestHeader("userId") int userId) {
        // Primeiro busca a quadra para verificar o proprietário
        Optional<Quadra> quadraExistente = quadraService.findQuadraById(idQuadra);
        if (quadraExistente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        // Verifica se o usuário pode gerenciar esta quadra
        if (!authorizationService.canManageQuadrasFromProprietario(userId, quadraExistente.get().getIdProprietario())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body("Acesso negado. Você só pode editar suas próprias quadras.");
        }
        
        Quadra updatedQuadra = quadraService.updateQuadra(idQuadra, quadraDetails);
        if (updatedQuadra != null) {
            return ResponseEntity.ok(updatedQuadra);
        }
        return ResponseEntity.notFound().build();
    }
      // Endpoint para excluir uma quadra
    @DeleteMapping("/{idQuadra}")
    public ResponseEntity<?> deleteQuadra(@PathVariable int idQuadra, @RequestHeader("userId") int userId) {
        // Primeiro busca a quadra para verificar o proprietário
        Optional<Quadra> quadraExistente = quadraService.findQuadraById(idQuadra);
        if (quadraExistente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        // Verifica se o usuário pode gerenciar esta quadra
        if (!authorizationService.canManageQuadrasFromProprietario(userId, quadraExistente.get().getIdProprietario())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body("Acesso negado. Você só pode deletar suas próprias quadras.");
        }
        
        boolean deleted = quadraService.deleteQuadra(idQuadra);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}