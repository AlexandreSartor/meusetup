package com.pcbuilder.controller;

import com.pcbuilder.model.Componente;
import com.pcbuilder.repository.ComponenteRepository;
import com.pcbuilder.model.ComponenteServiceProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/componentes")
@CrossOrigin(origins = "http://localhost:3000")
public class ComponenteController {

    @Autowired
    private ComponenteRepository componenteRepository;

    @Autowired
    private ComponenteServiceProxy componenteService;

    @GetMapping
    public List<Componente> getAllComponentes() {
        return componenteService.buscarTodos();
    }

    @GetMapping("/{id}")
    public Componente getComponenteById(@PathVariable Long id) {
        return componenteService.buscarPorId(id);
    }

    @GetMapping("/tipo/{tipo}")
    public List<Componente> getComponentesByTipo(@PathVariable String tipo) {
        return componenteService.buscarPorTipo(tipo);
    }

    @PostMapping
    public Componente createComponente(@RequestBody Componente componente) {
        Componente novo = componenteRepository.save(componente);
        componenteService.limparCache(); // Agora o método existe e limpa o cache com sucesso!
        return novo;
    }

    @PutMapping("/{id}")
    public Componente updateComponente(@PathVariable Long id, @RequestBody Componente componente) {
        componente.setId(id);
        Componente atualizado = componenteRepository.save(componente);
        componenteService.limparCache(); 
        return atualizado;
    }

    @DeleteMapping("/{id}")
    public void deleteComponente(@PathVariable Long id) {
        componenteRepository.deleteById(id);
        componenteService.limparCache(); 
    }
}