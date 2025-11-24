package com.intellimarket.intelli_market.service;

import com.intellimarket.intelli_market.entity.Setor;
import com.intellimarket.intelli_market.repository.SetorRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SetorService {

    private final SetorRepository setorRepository;

    public List<Setor> buscarTodos() {
        return setorRepository.findAll();
    }

    public Setor buscarPorId(Long id) {
        return setorRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Setor não encontrado"));
    }

    public Setor salvar(Setor setor) {
        return setorRepository.save(setor);
    }

    public Setor atualizar(Long id, Setor setorAtualizado) {
        Setor setor = buscarPorId(id);
        // Ajuste para os campos atuais de Setor (codigo/descricao/ativo)
        setor.setCodigo(setorAtualizado.getCodigo());
        setor.setDescricao(setorAtualizado.getDescricao());
        setor.setAtivo(setorAtualizado.getAtivo());
        return setorRepository.save(setor);
    }

    public List<Setor> buscarPorCodigo(String codigo) {
        return setorRepository.findByCodigo(codigo);
    }

    public List<Setor> buscarPorDescricao(String descricao) {
        return setorRepository.findByDescricaoContainingIgnoreCase(descricao);
    }

    public List<Setor> buscarAtivos() {
        return setorRepository.findByAtivoTrue();
    }

    public void deletar(Long id) {
        Setor setor = buscarPorId(id);
        setorRepository.delete(setor);
    }
}
