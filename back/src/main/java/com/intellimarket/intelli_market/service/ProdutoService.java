package com.intellimarket.intelli_market.service;

import com.intellimarket.intelli_market.entity.Produto;
import com.intellimarket.intelli_market.repository.ProdutoRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    public List<Produto> buscarTodos() {
        return produtoRepository.findAll();
    }

    public Produto buscarPorId(Long id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado"));
    }

    public Produto salvar(Produto produto) {
        if (produto.getValor() == null) {
            produto.setValor(BigDecimal.ZERO);
        }
        return produtoRepository.save(produto);
    }

    public Produto atualizar(Long id, Produto produtoAtualizado) {
        Produto produto = buscarPorId(id);
        produto.setNome(produtoAtualizado.getNome());
        produto.setValor(produtoAtualizado.getValor());
        produto.setQuantidade(produtoAtualizado.getQuantidade());
        produto.setSetor(produtoAtualizado.getSetor());
        produto.setImageUrl(produtoAtualizado.getImageUrl());
        produto.setCodigoBarras(produtoAtualizado.getCodigoBarras());
        produto.setUnidade(produtoAtualizado.getUnidade());
        produto.setAtivo(produtoAtualizado.getAtivo());
        return produtoRepository.save(produto);
    }

    public Produto buscarPorCodigoBarras(String codigoBarras) {
        return produtoRepository.findByCodigoBarras(codigoBarras)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Produto não encontrado com código de barras: " + codigoBarras));
    }

    public List<Produto> buscarPorNome(String nome) {
        return produtoRepository.findByNomeContainingIgnoreCase(nome);
    }

    public List<Produto> buscarPorSetor(Long setorId) {
        return produtoRepository.findBySetorId(setorId);
    }

    public List<Produto> buscarAtivos() {
        return produtoRepository.findByAtivoTrue();
    }

    public void deletar(Long id) {
        Produto produto = buscarPorId(id);
        produtoRepository.delete(produto);
    }
}
