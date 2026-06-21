# 🖥️ PC Builder - Monte seu Setup Gamer

Um integrador e agregador de hardware focado no mercado gamer e entusiasta. O sistema permite que o usuário defina um orçamento máximo e monte o seu computador dos sonhos passo a passo (CPU, Placa-mãe, Memória RAM, GPU e Fonte), validando a compatibilidade dos componentes e garantindo o controle financeiro em tempo real através de uma interface moderna com estética Cyberpunk/Neon.

O projeto conta com uma arquitetura moderna dividida em um backend robusto em Java (Spring Boot), banco de dados relacional (MariaDB) e um frontend SPA responsivo em Next.js (React) com TypeScript.

---

## 🛠️ Tecnologias Utilizadas

### Backend
* **Java 17** (ou superior)
* **Spring Boot 3.x**
* **Spring Data JPA** (Persistência de dados)
* **Lombok** (Produtividade no código Java)
* **Jackson** (Mapeamento JSON correto via `@JsonProperty`)

### Frontend
* **React** com **Next.js** (Arquitetura baseada em componentes e gerenciamento de estados)
* **TypeScript** (Tipagem estática para sincronização de interfaces com o Backend)
* **Tailwind CSS** (Estilização utilitária e responsiva)
* **Lucide React** (Pacote de ícones)

### Banco de Dados
* **MariaDB** / **MySQL** (Banco relacional local)

---

## 📌 Pré-requisitos

Para clonar e rodar esta aplicação localmente, você precisará ter instalado em sua máquina:

1. **Git** (Para clonar o repositório)
2. **Java JDK 17** ou superior (Configurado nas variáveis de ambiente)
3. **Node.js** (Versão v18 LTS ou superior)
4. **MariaDB** ou **MySQL Server** ativo na porta padrão `3306`
5. Um cliente de banco de dados (Recomendado: **DBeaver** para gerenciamento visual)

---

## 💾 Configuração do Banco de Dados (MariaDB/MySQL)

1. Abra o seu cliente de banco de dados (ex: DBeaver), conecte-se ao seu servidor local e abra um **Novo Editor SQL**.
2. Execute o script abaixo para criar o esquema do banco de dados e popular a massa de testes essencial (Exatamente 10 inserções organizadas por IDs):

```sql
-- 1. Criar e Selecionar o Banco de Dados
CREATE DATABASE IF NOT EXISTS pc_builder;
USE pc_builder;

-- =========================================================================
-- POPULAR COMPONENTES (5 INSERTS)
-- =========================================================================
INSERT INTO componentes (id, nome, preco, marca, tipo, imagem_URL) VALUES
(1, 'Intel Core i5-12400F', 899.90, 'Intel', 'CPU', '[https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=400](https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=400)'),
(2, 'ASUS Prime B660M-K', 649.90, 'ASUS', 'Motherboard', '[https://images.unsplash.com/photo-1555617766-c94804975af3?w=400](https://images.unsplash.com/photo-1555617766-c94804975af3?w=400)'),
(3, 'Kingston Fury Beast 8GB DDR4', 179.90, 'Kingston', 'RAM', '[https://images.unsplash.com/photo-1562976540-1502c2145186?w=400](https://images.unsplash.com/photo-1562976540-1502c2145186?w=400)'),
(4, 'NVIDIA RTX 4060 Ti', 2599.00, 'NVIDIA', 'GPU', '[https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400](https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400)'),
(5, 'MSI MAG A650BN', 299.90, 'MSI', 'PSU', '[https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400](https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400)');

-- =========================================================================
-- POPULAR ESPECIFICAÇÕES VINCULADAS (5 INSERTS)
-- =========================================================================
INSERT INTO componente_especificacoes (componente_id, especificacao) VALUES 
(1, '6 Núcleos / 12 Threads / Frequência 2.5 GHz até 4.4 GHz / Soquete LGA1700'),
(2, 'Chipset Intel B660 / Suporte a DDR4 / Formato Micro-ATX / Slot M.2 NVMe'),
(3, 'Capacidade 8GB / Velocidade 3200MHz / Tipo DDR4 / Latência CL16'),
(4, 'Memória 8GB GDDR6 / Suporte a Ray Tracing e DLSS 3.0 / Arquitetura Ada Lovelace'),
(5, 'Potência 650W / Certificação 80 Plus Bronze / PFC Ativo / Proteção OVP e SCP');
