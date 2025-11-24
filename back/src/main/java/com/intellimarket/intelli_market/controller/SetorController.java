package com.intellimarket.intelli_market.controller;

import com.intellimarket.intelli_market.entity.Setor;
import com.intellimarket.intelli_market.service.SetorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/setores")
@RequiredArgsConstructor
public class SetorController {

    private final SetorService setorService;

    @GetMapping
    public ResponseEntity<List<Setor>> listar() {
        return ResponseEntity.ok(setorService.buscarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Setor> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(setorService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Setor> salvar(@RequestBody Setor setor) {
        return ResponseEntity.ok(setorService.salvar(setor));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Setor> atualizar(@PathVariable Long id, @RequestBody Setor setor) {
        return ResponseEntity.ok(setorService.atualizar(id, setor));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        setorService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/codigo/{codigo}")
    public ResponseEntity<List<Setor>> buscarPorCodigo(@PathVariable String codigo) {
        return ResponseEntity.ok(setorService.buscarPorCodigo(codigo));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Setor>> buscarPorDescricao(@RequestParam(required = false) String descricao) {
        if (descricao == null || descricao.isBlank()) {
            return ResponseEntity.ok(setorService.buscarTodos());
        }
        return ResponseEntity.ok(setorService.buscarPorDescricao(descricao));
    }

    @GetMapping("/ativos")
    public ResponseEntity<List<Setor>> listarAtivos() {
        return ResponseEntity.ok(setorService.buscarAtivos());
    }
}
