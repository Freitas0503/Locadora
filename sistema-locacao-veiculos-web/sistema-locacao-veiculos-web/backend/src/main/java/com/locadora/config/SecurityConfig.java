package com.locadora.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;

import com.locadora.security.JwtAuthenticationEntryPoint;
import com.locadora.security.JwtAuthenticationFilter;

/**
 * Configuração de segurança para ambiente de produção
 */
@Configuration
@EnableWebSecurity
@Profile("prod")
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final CorsFilter corsFilter;

    @Value("${spring.h2.console.enabled:false}")
    private boolean h2ConsoleEnabled;

    public SecurityConfig(
            JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint,
            JwtAuthenticationFilter jwtAuthenticationFilter,
            CorsFilter corsFilter) {
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.corsFilter = corsFilter;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            // Desabilitar CSRF para APIs RESTful
            .csrf().disable()
            
            // Adicionar filtro CORS
            .addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)
            
            // Configurar tratamento de exceção para autenticação
            .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .and()
            
            // Usar política de sessão stateless
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
            
            // Configurar autorização de requisições
            .authorizeRequests()
                // Permitir acesso público a endpoints de autenticação
                .antMatchers("/auth/**").permitAll()
                // Permitir acesso público a endpoints de saúde e informações
                .antMatchers("/actuator/health", "/actuator/info").permitAll()
                // Permitir acesso ao console H2 em ambiente de desenvolvimento
                .antMatchers("/h2-console/**").permitAll()
                // Exigir autenticação para todos os outros endpoints
                .anyRequest().authenticated();
        
        // Adicionar filtro JWT
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        
        // Configuração para o console H2 (apenas para desenvolvimento)
        if (h2ConsoleEnabled) {
            http.headers().frameOptions().disable();
        }
    }
}
