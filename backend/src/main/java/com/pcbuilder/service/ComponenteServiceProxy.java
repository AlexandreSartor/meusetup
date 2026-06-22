package com.pcbuilder.service;

import com.pcbuilder.model.Componente;
import com.pcbuilder.repository.ComponenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComponenteServiceProxy implements ComponenteService {

    @Autowired
    private ComponenteRepository componenteRepository;

    private List<Componente> cacheTodosComponentes;
    
    // Guarda o momento exato em que o cache foi criado
    private long instanteCriacaoCache = 0;
    
    // Define o tempo de validade do cache em milissegundos (15000 ms = 15 segundos)
    private static final long TEMPO_VALIDADE_CACHE = 15000; 

    @Override
    public List<Componente> buscarTodos() {
        long tempoAtual = System.currentTimeMillis();
        
        // Verifica se o cache passou do prazo de validade
        boolean cacheExpirou = (tempoAtual - instanteCriacaoCache) > TEMPO_VALIDADE_CACHE;

        // Se o cache estiver vazio OU se o tempo dele já venceu:
        if (cacheTodosComponentes == null || cacheTodosComponentes.isEmpty() || cacheExpirou) {
            
            if (cacheExpirou && cacheTodosComponentes != null) {
                System.out.println("\n====== [PROXY] O prazo de 15s venceu! Atualizando dados com o banco... ======");
            } else {
                System.out.println("\n====== [PROXY] Cache vazio! Buscando TODOS no MariaDB... ======");
            }
            
            // Busca no banco e atualiza o cronômetro
            cacheTodosComponentes = componenteRepository.findAll();
            instanteCriacaoCache = System.currentTimeMillis();
            
        } else {
            // Se estiver dentro dos 15 segundos, responde voando da memória
            long tempoRestante = (TEMPO_VALIDADE_CACHE - (tempoAtual - instanteCriacaoCache)) / 1000;
            System.out.println("\n====== [PROXY] RECUPERADO DO CACHE! Válido por mais " + tempoRestante + "s ======");
        }
        
        return cacheTodosComponentes;
    }

    @Override
    public Componente buscarPorId(Long id) {
        System.out.println("\n====== [PROXY] Buscando ID " + id + " no banco... ======");
        return componenteRepository.findById(id).orElse(null);
    }

    @Override
    public List<Componente> buscarPorTipo(String tipo) {
        System.out.println("\n====== [PROXY] Filtrando tipo '" + tipo + "' no banco... ======");
        return componenteRepository.findByTipo(tipo);
    }

    // Método que resolve o erro do Controller para POST, PUT e DELETE
    public void limparCache() {
        System.out.println("\n====== [PROXY] Dados alterados! Limpando cache de memória... ======");
        this.cacheTodosComponentes = null;
    }
}