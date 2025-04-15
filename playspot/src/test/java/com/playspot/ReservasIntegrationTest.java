package com.playspot;

import com.playspot.model.Quadra;
import com.playspot.model.Reservas;
import com.playspot.model.User;
import com.playspot.service.ReservasService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.Time;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class ReservasIntegrationTest {

    @Autowired
    private ReservasService reservasService;

    @Test
    public void testSaveReserva() {
        // IDs existentes no banco
        int idUsuarioCliente = 1; // ID CLIENTE
        int idUsuarioProprietario = 5; // ID USER COMERCIO
        int idQuadra = 1; // ID Quadra

        // Criando instâncias teste
        User cliente = new User();
        cliente.setIdUser(idUsuarioCliente);

        User proprietario = new User();
        proprietario.setIdUser(idUsuarioProprietario);

        Quadra quadra = new Quadra();
        quadra.setIdQuadra(idQuadra);

        // Criando uma nova reserva
        Reservas reserva = new Reservas(
                cliente,
                proprietario,
                quadra,
                new Date(), // Data da reserva
                Time.valueOf("10:00:00"), // Horário de início
                Time.valueOf("12:00:00"), // Horário de fim
                Reservas.Status.AGENDADA, // Status da reserva
                50.0f, // Valor por hora
                100.0f // Valor total
        );

        // Salvando a reserva no banco de dados
        Reservas savedReserva = reservasService.saveReserva(reserva);

        // Verificando se a reserva foi salva com sucesso
        assertNotNull(savedReserva);
        assertNotNull(savedReserva.getReservaId());
    }
}