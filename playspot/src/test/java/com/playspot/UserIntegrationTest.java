package com.playspot;

import com.playspot.model.User;
import com.playspot.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;

import static com.playspot.model.User.TypeUser.CLIENTE;
import static com.playspot.model.User.TypeUser.COMERCIO;

@SpringBootTest
public class UserIntegrationTest {

    @Autowired
    private UserService userService;

    @Test
    void insertUser() {
        User user = new User(
                "machado",
                "senha123",
                "gabrielmq@example.com",
                COMERCIO,
                new Date(),
                "143.450.789-10",
                "sc",
                "joinville",
                "Vila",
                "Rua",
                "123",
                "01011-111",
                "(11) 98765-1239"
        );

        User savedUser = userService.saveUser(user);

        assert savedUser.getIdUser() > 0; // Verifica se o ID foi gerado
    }
}