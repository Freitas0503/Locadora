package com.locadora.repository;

import com.locadora.model.Veiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VeiculoRepository extends JpaRepository<Veiculo, Long> {
    
    Optional<Veiculo> findByPlaca(String placa);
    
    Optional<Veiculo> findByRenavam(String renavam);
    
    Optional<Veiculo> findByChassi(String chassi);
    
    boolean existsByPlaca(String placa);
    
    boolean existsByRenavam(String renavam);
    
    boolean existsByChassi(String chassi);
    
    List<Veiculo> findByStatus(String status);
    
    @Query("SELECT v FROM Veiculo v WHERE v.modelo.categoria.id = :categoriaId")
    List<Veiculo> findByCategoria(Long categoriaId);
    
    @Query("SELECT v FROM Veiculo v WHERE v.modelo.marca.id = :marcaId")
    List<Veiculo> findByMarca(Long marcaId);
}
