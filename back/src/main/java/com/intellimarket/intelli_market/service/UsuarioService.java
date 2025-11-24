package com.intellimarket.intelli_market.service;

import com.intellimarket.intelli_market.entity.Usuario;
import com.intellimarket.intelli_market.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public List<Usuario> buscarTodos() {
        return usuarioRepository.findAll();
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));
    }

    public Usuario salvar(Usuario usuario) {
        // O hashing da senha deve ocorrer no nível de AuthService. Aqui assumimos que
        // o campo `senhaHash` já esteja preenchido caso necessário.
        return usuarioRepository.save(usuario);
    }

    public Usuario atualizar(Long id, Usuario usuarioAtualizado) {
        Usuario usuario = buscarPorId(id);
        usuario.setNome(usuarioAtualizado.getNome());
        usuario.setEmail(usuarioAtualizado.getEmail());
        // Atualiza username caso fornecido
        if (usuarioAtualizado.getUsername() != null) {
            usuario.setUsername(usuarioAtualizado.getUsername());
        }
        // Atualiza senha hash se fornecida (o hashing deve ocorrer fora deste service)
        if (usuarioAtualizado.getSenhaHash() != null) {
            usuario.setSenhaHash(usuarioAtualizado.getSenhaHash());
        }
        usuario.setTelefone(usuarioAtualizado.getTelefone());
        usuario.setAvatarUrl(usuarioAtualizado.getAvatarUrl());
        usuario.setAtivo(usuarioAtualizado.getAtivo());
        // Role
        usuario.setRole(usuarioAtualizado.getRole());
        return usuarioRepository.save(usuario);
    }

    public Usuario buscarPorUsername(String username) {
        return usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com username: " + username));
    }

    public Usuario buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com email: " + email));
    }

    public boolean existsByUsername(String username) {
        return usuarioRepository.existsByUsername(username);
    }

    public boolean existsByEmail(String email) {
        return usuarioRepository.existsByEmail(email);
    }

    public void deletar(Long id) {
        Usuario usuario = buscarPorId(id);
        usuarioRepository.delete(usuario);
    }
}
