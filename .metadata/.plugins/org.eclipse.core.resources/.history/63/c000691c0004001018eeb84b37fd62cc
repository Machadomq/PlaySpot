package com.example.demo.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class ExampleController {

    @GetMapping("/exemplo")
    public Map<String, String> getExample() {
        return Map.of("mensagem", "Conexão entre React e Spring Boot funcionando!");
    }
}