package com.playspot.controller;

import com.playspot.service.AuthorizationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthorizationService authorizationService;

    public AuthController(AuthorizationService authorizationService) {
        this.authorizationService = authorizationService;
    }

    // Endpoint para verificar permissões do usuário
    @GetMapping("/permissions/{userId}")
    public ResponseEntity<?> getUserPermissions(@PathVariable int userId) {
        Map<String, Object> permissions = new HashMap<>();
        
        permissions.put("canAccessWorkbench", authorizationService.canAccessWorkbench(userId));
        permissions.put("canViewAllQuadras", authorizationService.canViewAllQuadras(userId));
        permissions.put("canViewAllReservas", authorizationService.canViewAllReservas(userId));
        permissions.put("canManageUsers", authorizationService.canManageUsers(userId));
        permissions.put("isAdmin", authorizationService.isAdmin(userId));
        permissions.put("isProprietario", authorizationService.isProprietario(userId));
        permissions.put("isCliente", authorizationService.isCliente(userId));
        permissions.put("userType", authorizationService.getUserType(userId));
        
        return ResponseEntity.ok(permissions);
    }

    // Endpoint para verificar se usuário pode acessar workbench
    @GetMapping("/can-access-workbench/{userId}")
    public ResponseEntity<?> canAccessWorkbench(@PathVariable int userId) {
        boolean canAccess = authorizationService.canAccessWorkbench(userId);
        Map<String, Boolean> response = new HashMap<>();
        response.put("canAccess", canAccess);
        return ResponseEntity.ok(response);
    }
}
