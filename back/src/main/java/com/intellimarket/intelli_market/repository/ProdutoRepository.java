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

    // Busca todos os produtos pertencentes a um setor por ID
    List<Produto> findBySetor_Id(Long setorId);

    // Busca todos os produtos pertencentes a um setor pelo campo 'codigo' do Setor
    List<Produto> findBySetor_Codigo(String codigo);
}
