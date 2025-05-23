package com.locadora.repository;

import com.locadora.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    
    Optional<Cliente> findByDocumento(String documento);
    
    boolean existsByDocumento(String documento);
    
    List<Cliente> findByAtivoTrue();
    
    List<Cliente> findByTipo(String tipo);
}
