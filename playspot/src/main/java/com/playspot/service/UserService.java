package com.playspot.service;

import com.playspot.model.User;
import com.playspot.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User login(String email, String password) {
        return userRepository.findByEmailUserAndPasswordUser(email, password);
    }

    // Métodos para gerenciamento de usuários (admin)
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> findUserById(int id) {
        return userRepository.findById(id);
    }

    public List<User> findUsersByType(User.TypeUser tipo) {
        return userRepository.findByTipoCliente(tipo);
    }

    public User updateUserType(int userId, User.TypeUser novoTipo) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setTipoCliente(novoTipo);
            return userRepository.save(user);
        }
        return null;
    }
}