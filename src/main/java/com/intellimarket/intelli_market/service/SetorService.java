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
        setor.setNome(setorAtualizado.getNome());
        setor.setLocalizacao(setorAtualizado.getLocalizacao());
        return setorRepository.save(setor);
    }

    public void deletar(Long id) {
        Setor setor = buscarPorId(id);
        setorRepository.delete(setor);
    }
}
