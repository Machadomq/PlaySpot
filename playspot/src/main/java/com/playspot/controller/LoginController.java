// Arquivo: `src/main/java/com/playspot/controller/LoginController.java`
package com.playspot.controller;

import com.playspot.dto.LoginDTO;
import com.playspot.model.User;
import com.playspot.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

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
            // Cria resposta com informações do usuário e permissões
            Map<String, Object> response = new HashMap<>();
            response.put("user", user);
            response.put("canAccessWorkbench", 
                user.getTipoCliente() == User.TypeUser.COMERCIO || 
                user.getTipoCliente() == User.TypeUser.ADMIN);
            response.put("isAdmin", user.getTipoCliente() == User.TypeUser.ADMIN);
            response.put("isProprietario", user.getTipoCliente() == User.TypeUser.COMERCIO);
            response.put("isCliente", user.getTipoCliente() == User.TypeUser.CLIENTE);
            
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.badRequest().body("Credenciais inválidas");
    }
}