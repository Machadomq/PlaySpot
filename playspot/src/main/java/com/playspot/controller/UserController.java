package com.playspot.controller;

import com.playspot.model.User;
import com.playspot.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios/cadastrar")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        System.out.println("Dados recebidos do frontend: " + user);
        User savedUser = userService.saveUser(user);
        return ResponseEntity.ok(savedUser);
    }
}