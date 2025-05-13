package com.playspot.service;

import com.playspot.model.Quadra;
import com.playspot.repository.QuadraRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuadraService {

    private final QuadraRepository quadraRepository;

    public QuadraService(QuadraRepository quadraRepository) {
        this.quadraRepository = quadraRepository;
    }    
    
    public Quadra saveQuadra(Quadra quadra) {
        return quadraRepository.save(quadra);
    }
    
    // Método para listar todas as quadras
    public List<Quadra> findAllQuadras() {
        return quadraRepository.findAll();
    }
    
    // Método para buscar quadras pelo ID do proprietário
    public List<Quadra> findByIdProprietario(int idProprietario) {
        return quadraRepository.findByIdProprietario(idProprietario);
    }
    
    // Método para buscar uma quadra pelo ID
    public Optional<Quadra> findQuadraById(int idQuadra) {
        return quadraRepository.findById(idQuadra);
    }
    
    // Método para atualizar uma quadra
    public Quadra updateQuadra(int idQuadra, Quadra quadraDetails) {
        Optional<Quadra> quadra = quadraRepository.findById(idQuadra);
        if (quadra.isPresent()) {
            Quadra existingQuadra = quadra.get();
            existingQuadra.setNomeQuadra(quadraDetails.getNomeQuadra());
            existingQuadra.setEstado(quadraDetails.getEstado());
            existingQuadra.setCidade(quadraDetails.getCidade());
            existingQuadra.setBairro(quadraDetails.getBairro());
            existingQuadra.setRua(quadraDetails.getRua());
            existingQuadra.setNumero(quadraDetails.getNumero());
            existingQuadra.setCep(quadraDetails.getCep());
            existingQuadra.setEsporte(quadraDetails.getEsporte());
            existingQuadra.setTelefone(quadraDetails.getTelefone());
            existingQuadra.setValorHora(quadraDetails.getValorHora());
            return quadraRepository.save(existingQuadra);
        }
        return null;
    }
    
    // Método para excluir uma quadra
    public boolean deleteQuadra(int idQuadra) {
        Optional<Quadra> quadra = quadraRepository.findById(idQuadra);
        if (quadra.isPresent()) {
            quadraRepository.deleteById(idQuadra);
            return true;
        }
        return false;
    }
}