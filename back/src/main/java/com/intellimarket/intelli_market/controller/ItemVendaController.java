package com.intellimarket.intelli_market.controller;

import com.intellimarket.intelli_market.entity.ItemVenda;
import com.intellimarket.intelli_market.service.ItemVendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/itens-venda")
public class ItemVendaController {

    @Autowired
    private ItemVendaService itemVendaService;

    @GetMapping
    public ResponseEntity<List<ItemVenda>> buscarTodos() {
        return ResponseEntity.ok(itemVendaService.buscarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemVenda> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(itemVendaService.buscarPorId(id));
    }

    @GetMapping("/venda/{vendaId}")
    public ResponseEntity<List<ItemVenda>> buscarPorVendaId(@PathVariable Long vendaId) {
        return ResponseEntity.ok(itemVendaService.buscarPorVendaId(vendaId));
    }

    @GetMapping("/produto/{produtoId}")
    public ResponseEntity<List<ItemVenda>> buscarPorProdutoId(@PathVariable Long produtoId) {
        return ResponseEntity.ok(itemVendaService.buscarPorProdutoId(produtoId));
    }

    @PostMapping
    public ResponseEntity<ItemVenda> salvar(@RequestBody ItemVenda itemVenda) {
        return ResponseEntity.ok(itemVendaService.salvar(itemVenda));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemVenda> atualizar(@PathVariable Long id, @RequestBody ItemVenda itemVenda) {
        return ResponseEntity.ok(itemVendaService.atualizar(id, itemVenda));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        itemVendaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
