package com.playspot.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.playspot.backend.dto.UsuarioDTO;
import com.playspot.backend.models.Usuario;
import com.playspot.backend.repositories.UsuarioRepository;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public Usuario criarUsuario(UsuarioDTO usuarioDTO) {
        if (usuarioRepository.existsByEmail(usuarioDTO.getEmail())) {
            throw new IllegalArgumentException("E-mail já cadastrado!");
        }

        Usuario usuario = new Usuario();
        usuario.setNome(usuarioDTO.getNome());
        usuario.setEmail(usuarioDTO.getEmail());
        usuario.setSenha(passwordEncoder.encode(usuarioDTO.getSenha())); // Criptografando a senha
        usuario.setTipo(usuarioDTO.getTipo());
        usuario.setDataNascimento(usuarioDTO.getDataNascimento());
        usuario.setCPF(usuarioDTO.getCPF());
        usuario.setEstado(usuarioDTO.getEstado());
        usuario.setCidade(usuarioDTO.getCidade());
        usuario.setRua(usuarioDTO.getRua());
        usuario.setBairro(usuarioDTO.getBairro());
        usuario.setNumero(usuarioDTO.getNumero());
        usuario.setCep(usuarioDTO.getCep());
        usuario.setTelefone(usuarioDTO.getTelefone());

        return usuarioRepository.save(usuario);
    }
}
