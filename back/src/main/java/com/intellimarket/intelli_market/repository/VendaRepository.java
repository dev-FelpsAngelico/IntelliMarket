package com.intellimarket.intelli_market.repository;

import com.intellimarket.intelli_market.entity.Venda;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VendaRepository extends JpaRepository<Venda, Long> {
    List<Venda> findByUsuarioId(Long usuarioId);

    List<Venda> findByStatus(Venda.Status status);
}
