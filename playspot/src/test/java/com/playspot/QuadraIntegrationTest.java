package com.playspot;

import com.playspot.model.Quadra;
import com.playspot.service.QuadraService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertNotNull;


@SpringBootTest
public class QuadraIntegrationTest {


    @Autowired
    private QuadraService quadraService;

    @Test
    public void testSaveQuadra() {
        // ID de um usuário existente do tipo COMERCIO
        int idProprietario = 5; // Substitua pelo ID real do User do tipo COMERCIO

        // Criando uma nova quadra
        Quadra quadra = new Quadra(
                idProprietario,
                "Quadra Esportiva",
                "São Paulo",
                "São Paulo",
                "Centro",
                "Rua Principal",
                "123",
                "01000-000",
                "Futebol",
                "11999999999",
                50.0f
        );

        // Salvando a quadra no banco de dados
        Quadra savedQuadra = quadraService.saveQuadra(quadra);

        // Verificando se a quadra foi salva com sucesso
        assertNotNull(savedQuadra);
        assertNotNull(savedQuadra.getIdQuadra());
    }
}