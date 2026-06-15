package com.pcbuilder.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "componentes")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Componente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private Double preco;
    private String marca;
    private String tipo;
    @Column(name = "imagem_URL")
    private String imagemURL;

    @ElementCollection
    @CollectionTable(name = "componente_especificacoes", joinColumns = @JoinColumn(name = "componente_id"))
    @Column(name = "especificacao")
    private java.util.List<String> especificacoes;

}
