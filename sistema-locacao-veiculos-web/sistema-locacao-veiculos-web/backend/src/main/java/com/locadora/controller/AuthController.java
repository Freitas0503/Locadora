package com.locadora.controller;

import com.locadora.dto.LoginDTO;
import com.locadora.dto.TokenDTO;
import com.locadora.security.JwtTokenUtil;
import com.locadora.service.UsuarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

/**
 * Controlador para autenticação de usuários
 */
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UsuarioService usuarioService;

    /**
     * Endpoint para login de usuários
     * @param loginDTO Dados de login (usuário e senha)
     * @return Token JWT
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDTO loginDTO) throws Exception {
        authenticate(loginDTO.getUsername(), loginDTO.getPassword());

        final UserDetails userDetails = usuarioService.loadUserByUsername(loginDTO.getUsername());
        final String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new TokenDTO(token));
    }

    /**
     * Autentica o usuário com o nome de usuário e senha fornecidos
     */
    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("Usuário desativado", e);
        } catch (BadCredentialsException e) {
            throw new Exception("Credenciais inválidas", e);
        }
    }
}
