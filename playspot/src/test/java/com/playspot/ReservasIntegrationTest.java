package com.playspot;

import com.playspot.model.Quadra;
import com.playspot.model.Reservas;
import com.playspot.model.User;
import com.playspot.service.ReservasService;
import com.playspot.service.UserService;
import com.playspot.service.QuadraService;
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

    @Autowired
    private UserService userService;

    @Autowired
    private QuadraService quadraService;

    @Test
    public void testSaveReserva() {
        // Criar e salvar um usuário CLIENTE e um usuário COMERCIO
        User cliente = new User(
            "Cliente Test",
            "senha",
            "cliente@example.com",
            User.TypeUser.CLIENTE,
            new Date(),
            "111.222.333-44",
            "SP",
            "Sao Paulo",
            "Centro",
            "Rua",
            "10",
            "00000-000",
            "11911111111"
        );
        User savedCliente = userService.saveUser(cliente);

        User proprietario = new User(
            "Proprietario Test",
            "senha",
            "prop_reserva@example.com",
            User.TypeUser.COMERCIO,
            new Date(),
            "222.333.444-55",
            "SP",
            "Sao Paulo",
            "Centro",
            "Rua",
            "11",
            "00000-000",
            "11922222222"
        );
        User savedProp = userService.saveUser(proprietario);

        // Criar uma quadra associada ao proprietario
        Quadra quadra = new Quadra();
        quadra.setNomeQuadra("Quadra Reserva");
        quadra.setEstado("SP");
        quadra.setCidade("Sao Paulo");
        quadra.setBairro("Centro");
        quadra.setRua("Rua Reserva");
        quadra.setNumero("12");
        quadra.setCep("00000-000");
        quadra.setEsporte("Futsal");
        quadra.setTelefone("11933333333");
        quadra.setValorHora(60.0f);
        quadra.setProprietario(savedProp);
        Quadra savedQuadra = quadraService.saveQuadra(quadra);

        // Criando uma nova reserva
        Reservas reserva = new Reservas(
            savedCliente,
            savedProp,
            savedQuadra,
            new Date(), // Data da reserva
            Time.valueOf("10:00:00"), // Horário de início
            Time.valueOf("12:00:00"), // Horário de fim
            Reservas.Status.AGENDADA, // Status da reserva
            60.0f, // Valor por hora
            120.0f // Valor total
        );

        // Salvando a reserva no banco de dados
        Reservas savedReserva = reservasService.saveReserva(reserva);

        // Verificando se a reserva foi salva com sucesso
        assertNotNull(savedReserva);
        assertNotNull(savedReserva.getReservaId());
    }
}