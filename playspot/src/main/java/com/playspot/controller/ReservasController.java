package com.playspot.controller;

import com.playspot.model.Reservas;
import com.playspot.service.ReservasService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/reservas")
@CrossOrigin(origins = "http://localhost:5173")
public class ReservasController {

    private final ReservasService reservasService;

    public ReservasController(ReservasService reservasService) {
        this.reservasService = reservasService;
    }

    @PostMapping
    public ResponseEntity<Reservas> createReserva(@RequestBody Reservas reserva) {
        Reservas savedReserva = reservasService.saveReserva(reserva);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedReserva);
    }

    @GetMapping
    public ResponseEntity<List<Reservas>> getAllReservas() {
        return ResponseEntity.ok(reservasService.findAllReservas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reservas> getReservaById(@PathVariable int id) {
        Reservas reserva = reservasService.findReservaById(id);
        if (reserva == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(reserva);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Reservas> updateReserva(@PathVariable int id, @RequestBody Reservas reservaDetails) {
        Reservas updatedReserva = reservasService.updateReserva(id, reservaDetails);
        if (updatedReserva == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedReserva);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReserva(@PathVariable int id) {
        Reservas reserva = reservasService.findReservaById(id);
        if (reserva == null) {
            return ResponseEntity.notFound().build();
        }

        reservasService.deleteReservaById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/usuario/{userId}")
    public ResponseEntity<List<Reservas>> getReservasByUsuario(@PathVariable int userId) {
        List<Reservas> reservas = reservasService.findReservasByUsuarioId(userId);
        return ResponseEntity.ok(reservas);
    }

    @GetMapping("/proprietario/{userId}")
    public ResponseEntity<List<Reservas>> getReservasByProprietario(@PathVariable int userId) {
        List<Reservas> reservas = reservasService.findReservasByProprietarioId(userId);
        return ResponseEntity.ok(reservas);
    }

    @GetMapping("/proprietario/{userId}/financeiro")
    public ResponseEntity<Map<String, Object>> getFinanceiroProprietario(@PathVariable int userId) {
        float totalArrecadado = reservasService.calculateEarningsForProprietario(userId);
        Map<String, Object> result = new HashMap<>();
        result.put("proprietarioId", userId);
        result.put("totalArrecadado", totalArrecadado);
        return ResponseEntity.ok(result);
    }
}
