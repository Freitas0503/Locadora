package com.locadora.dto;

import javax.validation.constraints.NotBlank;

/**
 * DTO para login de usuários
 */
public class LoginDTO {

    @NotBlank(message = "Nome de usuário é obrigatório")
    private String username;

    @NotBlank(message = "Senha é obrigatória")
    private String password;

    public LoginDTO() {
    }

    public LoginDTO(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
