package com.intellimarket.intelli_market.controller;

import com.intellimarket.intelli_market.entity.Setor;
import com.intellimarket.intelli_market.entity.Produto;
import com.intellimarket.intelli_market.service.SetorService;
import com.intellimarket.intelli_market.repository.ProdutoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api/setores")
public class SetorController {

    private final SetorService setorService;
    private final ProdutoRepository produtoRepo;

    public SetorController(SetorService service, ProdutoRepository produtoRepo) {
        this.setorService = service;
        this.produtoRepo = produtoRepo;
    }

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

    /**
     * Endpoint usado pelo frontend após escanear o QR code.
     * Se 'valor' for numérico, interpreta como ID do setor; caso contrário
     * interpreta como código do setor.
     * Retorna todos os produtos pertencentes ao setor.
     */
    @GetMapping("/qrcode/{valor}")
    public ResponseEntity<List<Produto>> produtosPorQr(@PathVariable String valor) {
        // tenta interpretar como id numérico
        try {
            Long id = Long.parseLong(valor);
            List<Produto> produtos = produtoRepo.findBySetor_Id(id);
            if (produtos == null || produtos.isEmpty())
                return ResponseEntity.notFound().build();
            return ResponseEntity.ok(produtos);
        } catch (NumberFormatException ex) {
            // não é número -> trata como código
            List<Produto> produtos = produtoRepo.findBySetor_Codigo(valor);
            if (produtos == null || produtos.isEmpty())
                return ResponseEntity.notFound().build();
            return ResponseEntity.ok(produtos);
        }
    }
}
