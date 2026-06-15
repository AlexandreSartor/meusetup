package com.pcbuilder.controller;

import com.pcbuilder.model.Componente;
import com.pcbuilder.repository.ComponenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/componentes")
@CrossOrigin(origins = "http://localhost:3000")
public class ComponenteController {

    @Autowired
    private ComponenteRepository componenteRepository;

    @GetMapping
    public List<Componente> getAllComponentes() {
        return componenteRepository.findAll();
    }

    @GetMapping("/{id}")
    public Componente getComponenteById(@PathVariable Long id) {
        return componenteRepository.findById(id).orElse(null);
    }

    @GetMapping("/tipo/{tipo}")
    public List<Componente> getComponentesByTipo(@PathVariable String tipo) {
        return componenteRepository.findByTipo(tipo);
    }

    @PostMapping
    public Componente createComponente(@RequestBody Componente componente) {
        return componenteRepository.save(componente);
    }

    @PutMapping("/{id}")
    public Componente updateComponente(@PathVariable Long id, @RequestBody Componente componente) {
        componente.setId(id);
        return componenteRepository.save(componente);
    }

    @DeleteMapping("/{id}")
    public void deleteComponente(@PathVariable Long id) {
        componenteRepository.deleteById(id);
    }

}
