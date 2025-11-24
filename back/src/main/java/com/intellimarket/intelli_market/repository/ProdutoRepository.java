package com.intellimarket.intelli_market.repository;

import com.intellimarket.intelli_market.entity.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    Optional<Produto> findByCodigoBarras(String codigoBarras);

    List<Produto> findByNomeContainingIgnoreCase(String nome);

    List<Produto> findBySetorId(Long setorId);

    List<Produto> findByAtivoTrue();
}
