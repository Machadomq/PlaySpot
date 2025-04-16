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
                "jiovani",
                "senha123",
                "joveni@example.com",
                CLIENTE,
                new Date(),
                "112.490.789-10",
                "São Paulo",
                "piracicaba",
                "guainazes",
                "Rua de thola",
                "123",
                "91011-111",
                "(69) 98755-1239"
        );

        User savedUser = userService.saveUser(user);

        assert savedUser.getIdUser() > 0; // Verifica se o ID foi gerado
    }
}