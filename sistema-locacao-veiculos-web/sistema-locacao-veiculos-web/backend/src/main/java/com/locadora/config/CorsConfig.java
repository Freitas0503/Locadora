package com.locadora.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.List;

/**
 * Configuração de CORS para permitir requisições de origens específicas
 */
@Configuration
public class CorsConfig {

    @Value("${cors.allowed-origins}")
    private String allowedOrigins;

    @Value("${cors.allowed-methods}")
    private String allowedMethods;

    @Value("${cors.allowed-headers}")
    private String allowedHeaders;

    @Value("${cors.exposed-headers}")
    private String exposedHeaders;

    @Value("${cors.allow-credentials}")
    private boolean allowCredentials;

    @Value("${cors.max-age}")
    private long maxAge;

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        
        // Configurar origens permitidas
        List<String> origins = Arrays.asList(allowedOrigins.split(","));
        corsConfiguration.setAllowedOrigins(origins);
        
        // Configurar métodos permitidos
        List<String> methods = Arrays.asList(allowedMethods.split(","));
        corsConfiguration.setAllowedMethods(methods);
        
        // Configurar cabeçalhos permitidos
        List<String> headers = Arrays.asList(allowedHeaders.split(","));
        corsConfiguration.setAllowedHeaders(headers);
        
        // Configurar cabeçalhos expostos
        List<String> exposed = Arrays.asList(exposedHeaders.split(","));
        corsConfiguration.setExposedHeaders(exposed);
        
        // Configurar credenciais
        corsConfiguration.setAllowCredentials(allowCredentials);
        
        // Configurar tempo máximo de cache
        corsConfiguration.setMaxAge(maxAge);
        
        // Aplicar configuração para todas as rotas
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        
        return new CorsFilter(source);
    }
}
