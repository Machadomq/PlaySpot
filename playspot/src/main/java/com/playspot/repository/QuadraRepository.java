package com.playspot.repository;

import com.playspot.model.Quadra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuadraRepository extends JpaRepository<Quadra, Integer> {
    // Método para buscar quadras pelo ID do proprietário
    List<Quadra> findByIdProprietario(int idProprietario);
}