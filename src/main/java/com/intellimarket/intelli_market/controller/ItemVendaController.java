package com.intellimarket.intelli_market.controller;

import com.intellimarket.intelli_market.entity.ItemVenda;
import com.intellimarket.intelli_market.service.ItemVendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/itens-venda")
public class ItemVendaController {

    @Autowired
    private ItemVendaService itemVendaService;

    @GetMapping
    public List<ItemVenda> buscarTodos() {
        return itemVendaService.buscarTodos();
    }

    @GetMapping("/{id}")
    public ItemVenda buscarPorId(@PathVariable Long id) {
        return itemVendaService.buscarPorId(id);
    }

    @PostMapping
    public ItemVenda salvar(@RequestBody ItemVenda itemVenda) {
        return itemVendaService.salvar(itemVenda);
    }

    @PutMapping("/{id}")
    public ItemVenda atualizar(@PathVariable Long id, @RequestBody ItemVenda itemVenda) {
        return itemVendaService.atualizar(id, itemVenda);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        itemVendaService.deletar(id);
    }
}
