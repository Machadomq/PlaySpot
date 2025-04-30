// Arquivo: `src/main/java/com/playspot/controller/LoginController.java`
package com.playspot.controller;

import com.playspot.dto.LoginDTO;
import com.playspot.model.User;
import com.playspot.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios/login")
@CrossOrigin(origins = "http://localhost:5173")
public class LoginController {

    private final UserService userService;

    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        User user = userService.login(loginDTO.getEmail(), loginDTO.getSenha());
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.badRequest().body("Credenciais inválidas");
    }
}