package com.playspot.service;

import com.playspot.model.Reservas;
import com.playspot.repository.ReservasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservasService {

    @Autowired
    private ReservasRepository reservasRepository;

    // Salvar uma nova reserva
    public Reservas saveReserva(Reservas reserva) {
        return reservasRepository.save(reserva);
    }

    // Buscar todas as reservas
    public List<Reservas> findAllReservas() {
        return reservasRepository.findAll();
    }

    // Buscar uma reserva por ID
    public Reservas findReservaById(int id) {
        return reservasRepository.findById(id).orElse(null);
    }

    // Excluir uma reserva pelo ID
    public void deleteReservaById(int id) {
        reservasRepository.deleteById(id);
    }
}