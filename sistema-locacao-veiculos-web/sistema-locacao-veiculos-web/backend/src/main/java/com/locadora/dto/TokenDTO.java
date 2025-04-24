package com.locadora.dto;

/**
 * DTO para retorno de token JWT
 */
public class TokenDTO {

    private String token;
    private String tipo;

    public TokenDTO() {
        this.tipo = "Bearer";
    }

    public TokenDTO(String token) {
        this.token = token;
        this.tipo = "Bearer";
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
}
