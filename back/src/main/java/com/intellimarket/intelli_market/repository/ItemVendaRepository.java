package com.intellimarket.intelli_market.repository;

import com.intellimarket.intelli_market.entity.ItemVenda;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ItemVendaRepository extends JpaRepository<ItemVenda, Long> {
    List<ItemVenda> findByVendaId(Long vendaId);

    List<ItemVenda> findByProdutoId(Long produtoId);
}
