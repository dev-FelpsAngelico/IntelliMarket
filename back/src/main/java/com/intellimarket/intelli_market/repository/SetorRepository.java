package com.intellimarket.intelli_market.repository;

import com.intellimarket.intelli_market.entity.Setor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SetorRepository extends JpaRepository<Setor, Long> {
    List<Setor> findByCodigo(String codigo);

    List<Setor> findByDescricaoContainingIgnoreCase(String descricao);

    List<Setor> findByAtivoTrue();
}
