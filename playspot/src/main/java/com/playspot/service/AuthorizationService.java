package com.playspot.service;

import com.playspot.model.User;
import com.playspot.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthorizationService {

    private final UserRepository userRepository;

    public AuthorizationService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Verifica se o usuário é um administrador
     */
    public boolean isAdmin(int userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.isPresent() && user.get().getTipoCliente() == User.TypeUser.ADMIN;
    }

    /**
     * Verifica se o usuário é um proprietário (comercio)
     */
    public boolean isProprietario(int userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.isPresent() && user.get().getTipoCliente() == User.TypeUser.COMERCIO;
    }

    /**
     * Verifica se o usuário é um cliente básico
     */
    public boolean isCliente(int userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.isPresent() && user.get().getTipoCliente() == User.TypeUser.CLIENTE;
    }

    /**
     * Verifica se o usuário pode acessar o workbench
     * Apenas proprietários e admins podem acessar
     */
    public boolean canAccessWorkbench(int userId) {
        return isProprietario(userId) || isAdmin(userId);
    }

    /**
     * Verifica se o usuário pode ver todas as quadras
     * Apenas admins podem ver todas as quadras
     */
    public boolean canViewAllQuadras(int userId) {
        return isAdmin(userId);
    }

    /**
     * Verifica se o usuário pode ver quadras de um proprietário específico
     * Admin pode ver de qualquer um, proprietário só pode ver as próprias
     */
    public boolean canViewQuadrasFromProprietario(int userId, int proprietarioId) {
        if (isAdmin(userId)) {
            return true;
        }
        if (isProprietario(userId)) {
            return userId == proprietarioId;
        }
        return false;
    }

    /**
     * Verifica se o usuário pode gerenciar (criar/editar/deletar) quadras de um proprietário
     * Admin pode gerenciar qualquer quadra, proprietário só pode gerenciar as próprias
     */
    public boolean canManageQuadrasFromProprietario(int userId, int proprietarioId) {
        if (isAdmin(userId)) {
            return true;
        }
        if (isProprietario(userId)) {
            return userId == proprietarioId;
        }
        return false;
    }

    /**
     * Verifica se o usuário pode ver todas as reservas
     * Apenas admins podem ver todas as reservas
     */
    public boolean canViewAllReservas(int userId) {
        return isAdmin(userId);
    }

    /**
     * Verifica se o usuário pode ver reservas de um proprietário específico
     * Admin pode ver de qualquer um, proprietário só pode ver das próprias quadras
     */
    public boolean canViewReservasFromProprietario(int userId, int proprietarioId) {
        if (isAdmin(userId)) {
            return true;
        }
        if (isProprietario(userId)) {
            return userId == proprietarioId;
        }
        return false;
    }

    /**
     * Verifica se o usuário pode gerenciar usuários
     * Apenas admins podem gerenciar usuários
     */
    public boolean canManageUsers(int userId) {
        return isAdmin(userId);
    }

    /**
     * Obtém o tipo de usuário
     */
    public User.TypeUser getUserType(int userId) {
        Optional<User> user = userRepository.findById(userId);
        return user.map(User::getTipoCliente).orElse(null);
    }
}
