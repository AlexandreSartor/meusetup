package com.pcbuilder.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "setups")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Setup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private Double orcamentoMaximo;
    private Double valorTotal;
    private LocalDateTime dataCriacao;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(
        name = "setup_componentes",
        joinColumns = @JoinColumn(name = "setup_id"),
        inverseJoinColumns = @JoinColumn(name = "componente_id")
    )
    private List<Componente> componentes;

    @PrePersist
    protected void onCreate() {
        dataCriacao = LocalDateTime.now();
    }

}
