package com.intellimarket.intelli_market.service;

import com.intellimarket.intelli_market.entity.ItemVenda;
import com.intellimarket.intelli_market.repository.ItemVendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemVendaService {

    @Autowired
    private ItemVendaRepository itemVendaRepository;

    public List<ItemVenda> buscarTodos() {
        return itemVendaRepository.findAll();
    }

    public ItemVenda buscarPorId(Long id) {
        return itemVendaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ItemVenda não encontrado com id: " + id));
    }

    public ItemVenda salvar(ItemVenda itemVenda) {
        return itemVendaRepository.save(itemVenda);
    }

    public ItemVenda atualizar(Long id, ItemVenda itemVendaAtualizado) {
        ItemVenda itemVenda = buscarPorId(id);

        itemVenda.setQuantidade(itemVendaAtualizado.getQuantidade());
        itemVenda.setPrecoUnitario(itemVendaAtualizado.getPrecoUnitario());
        itemVenda.setVenda(itemVendaAtualizado.getVenda());
        itemVenda.setProduto(itemVendaAtualizado.getProduto());

        return itemVendaRepository.save(itemVenda);
    }

    public void deletar(Long id) {
        ItemVenda itemVenda = buscarPorId(id);
        itemVendaRepository.delete(itemVenda);
    }
}
