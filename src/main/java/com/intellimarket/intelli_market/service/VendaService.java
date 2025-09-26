package com.intellimarket.intelli_market.service;

import com.intellimarket.intelli_market.entity.Venda;
import com.intellimarket.intelli_market.repository.VendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VendaService {

    @Autowired
    private VendaRepository vendaRepository;

    public List<Venda> buscarTodos() {
        return vendaRepository.findAll();
    }

    public Venda buscarPorId(Long id) {
        return vendaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Venda não encontrada com id: " + id));
    }

    public Venda salvar(Venda venda) {
        return vendaRepository.save(venda);
    }

    public Venda atualizar(Long id, Venda vendaAtualizada) {
        Venda venda = buscarPorId(id);

        venda.setData(vendaAtualizada.getData());
        venda.setTotal(vendaAtualizada.getTotal());
        venda.setUsuario(vendaAtualizada.getUsuario());
        venda.setItens(vendaAtualizada.getItens());

        return vendaRepository.save(venda);
    }

    public void deletar(Long id) {
        Venda venda = buscarPorId(id);
        vendaRepository.delete(venda);
    }
}
