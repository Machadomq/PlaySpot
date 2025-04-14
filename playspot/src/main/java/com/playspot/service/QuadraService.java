package com.playspot.service;

import com.playspot.model.Quadra;
import com.playspot.repository.QuadraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuadraService {

    @Autowired
    private QuadraRepository quadraRepository;

    // Salvar uma nova quadra
    public Quadra saveQuadra(Quadra quadra) {
        return quadraRepository.save(quadra);
    }

    // Buscar todas as quadras cadastradas
    public List<Quadra> findAllQuadras() {
        return quadraRepository.findAll();
    }

    // Buscar uma quadra por ID
    public Quadra findQuadraById(int id) {
        return quadraRepository.findById(id).orElse(null);
    }

    // Excluir uma quadra pelo ID
    public void deleteQuadraById(int id) {
        quadraRepository.deleteById(id);
    }
}