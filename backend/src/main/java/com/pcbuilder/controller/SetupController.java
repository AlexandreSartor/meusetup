package com.pcbuilder.controller;

import com.pcbuilder.model.Componente;
import com.pcbuilder.model.Setup;
import com.pcbuilder.repository.SetupRepository;
import com.pcbuilder.repository.ComponenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/setups")
@CrossOrigin(origins = "http://localhost:3000")
public class SetupController {

    @Autowired
    private SetupRepository setupRepository;

    @Autowired
    private ComponenteRepository componenteRepository;

    @GetMapping
    public List<Setup> getAllSetups() {
        return setupRepository.findAll();
    }

    @GetMapping("/{id}")
    public Setup getSetupById(@PathVariable Long id) {
        return setupRepository.findById(id).orElse(null);
    }

   @PostMapping
    public ResponseEntity<?> createSetup(@RequestBody Setup setup) {
        try {
            System.out.println("====== REQUISIÇÃO CHEGOU NO JAVA ======");
            System.out.println("Orçamento Máximo: " + setup.getOrcamentoMaximo());
            if (setup.getComponentes() != null) {
                System.out.println("Quantidade de componentes enviados: " + setup.getComponentes().size());
            }

            if (setup.getComponentes() == null || setup.getComponentes().isEmpty()) {
                return ResponseEntity.badRequest().body("O setup deve conter pelo menos um componente.");
            }

            double valorTotal = 0.0;
            java.util.ArrayList<Componente> componentesDoBanco = new java.util.ArrayList<>();

            for (Componente componente : setup.getComponentes()) {
                if (componente.getId() != null) {
                    Componente componenteCompleto = componenteRepository.findById(componente.getId()).orElse(null);
                    if (componenteCompleto != null) {
                        valorTotal += componenteCompleto.getPreco();
                        componentesDoBanco.add(componenteCompleto);
                    }
                }
            }

            setup.setComponentes(componentesDoBanco);
            setup.setValorTotal(valorTotal);

            if (setup.getOrcamentoMaximo() != null && valorTotal > setup.getOrcamentoMaximo()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("O valor total excede o orçamento.");
            }

            System.out.println("Tentando salvar no banco de dados...");
            Setup savedSetup = setupRepository.save(setup);
            System.out.println("Salvo com sucesso no banco! ID gerado: " + savedSetup.getId());

            // Criamos um retorno simples para testar se o erro é na hora de devolver o JSON
            return ResponseEntity.ok("{\"status\": \"sucesso\"}");

        } catch (Exception e) {
            System.out.println("====== O JAVA QUEBROU AQUI TRATADO PELO CATCH ======");
            e.printStackTrace(); // Força o print do erro no console do VS Code
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSetup(@PathVariable Long id, @RequestBody Setup setup) {
        if (!setupRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        if (setup.getComponentes() != null && !setup.getComponentes().isEmpty()) {
            double valorTotal = 0.0;
            for (Componente componente : setup.getComponentes()) {
                if (componente.getId() != null) {
                    Componente componenteCompleto = componenteRepository.findById(componente.getId()).orElse(null);
                    if (componenteCompleto != null) {
                        valorTotal += componenteCompleto.getPreco();
                    }
                } else if (componente.getPreco() != null) {
                    valorTotal += componente.getPreco();
                }
            }

            setup.setValorTotal(valorTotal);

            if (setup.getOrcamentoMaximo() != null && valorTotal > setup.getOrcamentoMaximo()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(String.format("O valor total do setup (R$ %.2f) excede o orçamento máximo de R$ %.2f", 
                                valorTotal, setup.getOrcamentoMaximo()));
            }
        }

        setup.setId(id);
        Setup updatedSetup = setupRepository.save(setup);
        return ResponseEntity.ok(updatedSetup);
    }

    @DeleteMapping("/{id}")
    public void deleteSetup(@PathVariable Long id) {
        setupRepository.deleteById(id);
    }

}
