package com.playspot;

import com.playspot.model.Quadra;
import com.playspot.model.User;
import com.playspot.service.QuadraService;
import com.playspot.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertNotNull;


@SpringBootTest
public class QuadraIntegrationTest {


    @Autowired
    private QuadraService quadraService;

    @Autowired
    private UserService userService;

    @Test
    public void testSaveQuadra() {
        // Criar e salvar um usuário do tipo COMERCIO para ser o proprietário
        User proprietario = new User(
            "Proprietario Test",
            "senha",
            "prop@example.com",
            User.TypeUser.COMERCIO,
            new java.util.Date(),
            "123.456.789-00",
            "SP",
            "Sao Paulo",
            "Bairro",
            "Rua",
            "1",
            "00000-000",
            "11999999999"
        );
        User savedProp = userService.saveUser(proprietario);

        // Criando uma nova quadra associada ao proprietário salvo
        Quadra quadra = new Quadra();
        quadra.setNomeQuadra("Quadra Esportiva");
        quadra.setEstado("São Paulo");
        quadra.setCidade("São Paulo");
        quadra.setBairro("Centro");
        quadra.setRua("Rua Principal");
        quadra.setNumero("123");
        quadra.setCep("01000-000");
        quadra.setEsporte("Futebol");
        quadra.setTelefone("11999999999");
        quadra.setValorHora(50.0f);
        quadra.setProprietario(savedProp);

        // Salvando a quadra no banco de dados
        Quadra savedQuadra = quadraService.saveQuadra(quadra);

        // Verificando se a quadra foi salva com sucesso
        assertNotNull(savedQuadra);
        assertNotNull(savedQuadra.getIdQuadra());
    }
}