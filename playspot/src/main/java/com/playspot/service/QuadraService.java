package com.playspot.service;

import com.playspot.model.Quadra;
import com.playspot.repository.QuadraRepository;
import org.springframework.stereotype.Service;

@Service
public class QuadraService {

    private final QuadraRepository quadraRepository;

    public QuadraService(QuadraRepository quadraRepository) {
        this.quadraRepository = quadraRepository;
    }

    public Quadra saveQuadra(Quadra quadra) {
        return quadraRepository.save(quadra);
    }
}