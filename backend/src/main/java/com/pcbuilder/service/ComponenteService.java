package com.pcbuilder.model;

import com.pcbuilder.model.Componente;
import java.util.List;

public interface ComponenteService {
    List<Componente> buscarTodos();
    Componente buscarPorId(Long id);
    List<Componente> buscarPorTipo(String tipo);
}