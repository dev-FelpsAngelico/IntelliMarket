package com.intellimarket.intelli_market.controller;

import com.intellimarket.intelli_market.entity.Produto;
import com.intellimarket.intelli_market.service.ProdutoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/produtos")
@RequiredArgsConstructor
public class ProdutoController {

    private final ProdutoService produtoService;

    @GetMapping
    public ResponseEntity<List<Produto>> listar() {
        return ResponseEntity.ok(produtoService.buscarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(produtoService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Produto> salvar(@RequestBody Produto produto) {
        return ResponseEntity.ok(produtoService.salvar(produto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Produto> atualizar(@PathVariable Long id, @RequestBody Produto produto) {
        return ResponseEntity.ok(produtoService.atualizar(id, produto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        produtoService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/codigo-barras/{codigoBarras}")
    public ResponseEntity<Produto> buscarPorCodigoBarras(@PathVariable String codigoBarras) {
        return ResponseEntity.ok(produtoService.buscarPorCodigoBarras(codigoBarras));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Produto>> buscarPorNome(@RequestParam(required = false) String nome) {
        if (nome == null || nome.isBlank()) {
            return ResponseEntity.ok(produtoService.buscarTodos());
        }
        return ResponseEntity.ok(produtoService.buscarPorNome(nome));
    }

    @GetMapping("/setor/{setorId}")
    public ResponseEntity<List<Produto>> buscarPorSetor(@PathVariable Long setorId) {
        return ResponseEntity.ok(produtoService.buscarPorSetor(setorId));
    }

    @GetMapping("/ativos")
    public ResponseEntity<List<Produto>> listarAtivos() {
        return ResponseEntity.ok(produtoService.buscarAtivos());
    }

    @PostMapping("/scan")
    public ResponseEntity<?> scan(@RequestBody Map<String, Object> payload) {
        Object dataObj = payload.get("data");
        if (dataObj == null) {
            return ResponseEntity.badRequest().body("Campo 'data' ausente");
        }
        String data = String.valueOf(dataObj);

        // Tenta interpretar JSON com id ou codigoBarras
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode node = mapper.readTree(data);
            if (node.has("id")) {
                long id = node.get("id").asLong();
                return ResponseEntity.ok(produtoService.buscarPorId(id));
            }
            if (node.has("codigoBarras")) {
                String cb = node.get("codigoBarras").asText();
                return ResponseEntity.ok(produtoService.buscarPorCodigoBarras(cb));
            }
        } catch (IOException ignored) {
            // não JSON, continua
        }

        // Primeiro tenta por código de barras
        try {
            return ResponseEntity.ok(produtoService.buscarPorCodigoBarras(data));
        } catch (EntityNotFoundException e) {
            // tenta interpretar como id
            try {
                long id = Long.parseLong(data);
                return ResponseEntity.ok(produtoService.buscarPorId(id));
            } catch (NumberFormatException ex) {
                return ResponseEntity.status(404).body("Produto não encontrado para o dado fornecido");
            }
        }
    }
}
