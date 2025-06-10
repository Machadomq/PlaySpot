package com.playspot.controller;

import com.playspot.model.User;
import com.playspot.service.UserService;
import com.playspot.service.AuthorizationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminUserController {

    private final UserService userService;
    private final AuthorizationService authorizationService;

    public AdminUserController(UserService userService, AuthorizationService authorizationService) {
        this.userService = userService;
        this.authorizationService = authorizationService;
    }

    // Listar todos os usuários (apenas admin)
    @GetMapping
    public ResponseEntity<?> getAllUsers(@RequestHeader("userId") int userId) {
        if (!authorizationService.canManageUsers(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body("Acesso negado. Apenas administradores podem gerenciar usuários.");
        }
        
        List<User> users = userService.findAllUsers();
        return ResponseEntity.ok(users);
    }

    // Buscar usuário por ID (apenas admin)
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable int id, @RequestHeader("userId") int userId) {
        if (!authorizationService.canManageUsers(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body("Acesso negado. Apenas administradores podem gerenciar usuários.");
        }
        
        Optional<User> user = userService.findUserById(id);
        return user.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Atualizar tipo de usuário (apenas admin)
    @PutMapping("/{id}/tipo")
    public ResponseEntity<?> updateUserType(@PathVariable int id, @RequestBody User.TypeUser novoTipo, @RequestHeader("userId") int userId) {
        if (!authorizationService.canManageUsers(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body("Acesso negado. Apenas administradores podem alterar tipos de usuário.");
        }
        
        User updatedUser = userService.updateUserType(id, novoTipo);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        }
        return ResponseEntity.notFound().build();
    }

    // Buscar usuários por tipo (apenas admin)
    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<?> getUsersByType(@PathVariable User.TypeUser tipo, @RequestHeader("userId") int userId) {
        if (!authorizationService.canManageUsers(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body("Acesso negado. Apenas administradores podem visualizar usuários por tipo.");
        }
        
        List<User> users = userService.findUsersByType(tipo);
        return ResponseEntity.ok(users);
    }
}
