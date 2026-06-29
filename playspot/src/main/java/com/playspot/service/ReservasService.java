package com.playspot.service;

import com.playspot.model.Reservas;
import com.playspot.repository.ReservasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    // Atualizar uma reserva
    public Reservas updateReserva(int id, Reservas reservaDetails) {
        Optional<Reservas> reservaOptional = reservasRepository.findById(id);
        if (reservaOptional.isEmpty()) {
            return null;
        }

        Reservas existingReserva = reservaOptional.get();
        existingReserva.setUsuario(reservaDetails.getUsuario());
        existingReserva.setProprietario(reservaDetails.getProprietario());
        existingReserva.setQuadra(reservaDetails.getQuadra());
        existingReserva.setDataReserva(reservaDetails.getDataReserva());
        existingReserva.setHorarioInicio(reservaDetails.getHorarioInicio());
        existingReserva.setHorarioFim(reservaDetails.getHorarioFim());
        existingReserva.setStatus(reservaDetails.getStatus());
        existingReserva.setValorHora(reservaDetails.getValorHora());
        existingReserva.setValorTotal(reservaDetails.getValorTotal());
        return reservasRepository.save(existingReserva);
    }

    // Excluir uma reserva pelo ID
    public void deleteReservaById(int id) {
        reservasRepository.deleteById(id);
    }

    // Buscar reservas por ID do usuário (cliente)
    public List<Reservas> findReservasByUsuarioId(int idUser) {
        return reservasRepository.findByUsuario_IdUser(idUser);
    }

    // Buscar reservas por ID do proprietário
    public List<Reservas> findReservasByProprietarioId(int idUser) {
        return reservasRepository.findByProprietario_IdUser(idUser);
    }

    // Calcular total arrecadado pelo proprietário (somente reservas CONCLUIDA)
    public float calculateEarningsForProprietario(int proprietarioId) {
        Float sum = reservasRepository.sumValorTotalByProprietarioId(proprietarioId);
        return sum == null ? 0f : sum;
    }
}