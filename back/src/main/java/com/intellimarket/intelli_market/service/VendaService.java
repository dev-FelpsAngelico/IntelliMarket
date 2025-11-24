package com.intellimarket.intelli_market.service;

import com.intellimarket.intelli_market.entity.Venda;
import com.intellimarket.intelli_market.repository.VendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.math.BigDecimal;

@Service
public class VendaService {

    @Autowired
    private VendaRepository vendaRepository;

    public List<Venda> buscarTodos() {
        return vendaRepository.findAll();
    }

    public List<Venda> listarPorUsuarioId(Long usuarioId) {
        return vendaRepository.findByUsuarioId(usuarioId);
    }

    public List<Venda> listarPorStatus(Venda.Status status) {
        return vendaRepository.findByStatus(status);
    }

    public Venda buscarPorId(Long id) {
        return vendaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Venda não encontrada com id: " + id));
    }

    public Venda salvar(Venda venda) {
        // Recalcular total antes de salvar, se o método existir
        try {
            venda.recalculateTotal();
        } catch (Exception ignored) {
            // se não existir, segue normalmente
        }
        if (venda.getTotal() == null) {
            venda.setTotal(BigDecimal.ZERO);
        }
        return vendaRepository.save(venda);
    }

    public Venda atualizar(Long id, Venda vendaAtualizada) {
        Venda venda = buscarPorId(id);

        // Ajuste para os campos atuais de Venda (status, paymentMethod, usuario, itens)
        venda.setStatus(vendaAtualizada.getStatus());
        venda.setPaymentMethod(vendaAtualizada.getPaymentMethod());
        venda.setUsuario(vendaAtualizada.getUsuario());
        venda.setItens(vendaAtualizada.getItens());
        // Recalcular total se disponível
        try {
            venda.recalculateTotal();
        } catch (Exception ignored) {
        }
        return vendaRepository.save(venda);
    }

    public void deletar(Long id) {
        Venda venda = buscarPorId(id);
        vendaRepository.delete(venda);
    }
}
