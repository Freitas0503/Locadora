package com.locadora.repository;

import com.locadora.model.Contrato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ContratoRepository extends JpaRepository<Contrato, Long> {
    
    Optional<Contrato> findByNumero(String numero);
    
    List<Contrato> findByStatus(String status);
    
    List<Contrato> findByClienteId(Long clienteId);
    
    List<Contrato> findByVeiculoId(Long veiculoId);
    
    List<Contrato> findByMotoristaId(Long motoristaId);
    
    @Query("SELECT c FROM Contrato c WHERE c.dataInicio BETWEEN :dataInicio AND :dataFim")
    List<Contrato> findByPeriodo(LocalDateTime dataInicio, LocalDateTime dataFim);
    
    @Query("SELECT c FROM Contrato c WHERE c.status = 'EM_ANDAMENTO' AND c.dataFimPrevisto < :dataAtual")
    List<Contrato> findContratosAtrasados(LocalDateTime dataAtual);
}
