package com.intellimarket.intelli_market.controller;

import com.intellimarket.intelli_market.entity.Venda;
import com.intellimarket.intelli_market.service.VendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vendas")
public class VendaController {

    @Autowired
    private VendaService vendaService;

    @GetMapping
    public ResponseEntity<List<Venda>> buscarTodos() {
        return ResponseEntity.ok(vendaService.buscarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Venda> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(vendaService.buscarPorId(id));
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Venda>> listarPorUsuario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(vendaService.listarPorUsuarioId(usuarioId));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<?> listarPorStatus(@PathVariable String status) {
        try {
            Venda.Status s = Venda.Status.valueOf(status.toUpperCase());
            return ResponseEntity.ok(vendaService.listarPorStatus(s));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body("Status inválido: " + status);
        }
    }

    @PostMapping
    public ResponseEntity<Venda> salvar(@RequestBody Venda venda) {
        return ResponseEntity.ok(vendaService.salvar(venda));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Venda> atualizar(@PathVariable Long id, @RequestBody Venda venda) {
        return ResponseEntity.ok(vendaService.atualizar(id, venda));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        vendaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
