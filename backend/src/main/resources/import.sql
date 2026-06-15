-- Processadores (CPU)
INSERT INTO componentes (nome, preco, marca, tipo) VALUES 
('AMD Ryzen 5 5600X', 899.00, 'AMD', 'cpu'),
('AMD Ryzen 7 5800X', 1299.00, 'AMD', 'cpu'),
('Intel Core i5-12400F', 799.00, 'Intel', 'cpu'),
('Intel Core i7-12700F', 1599.00, 'Intel', 'cpu'),
('AMD Ryzen 9 5900X', 2199.00, 'AMD', 'cpu');

-- Especificações dos Processadores
INSERT INTO componente_especificacoes (componente_id, especificacao) VALUES 
(1, '6 Núcleos / 12 Threads'),
(1, '3.7GHz (Boost 4.6GHz)'),
(1, '32MB Cache L3'),
(1, 'AM4'),
(2, '8 Núcleos / 16 Threads'),
(2, '3.8GHz (Boost 4.7GHz)'),
(2, '32MB Cache L3'),
(2, 'AM4'),
(3, '6 Núcleos / 12 Threads'),
(3, '2.5GHz (Boost 4.4GHz)'),
(3, '18MB Cache'),
(3, 'LGA 1700'),
(4, '12 Núcleos / 20 Threads'),
(4, '2.1GHz (Boost 4.9GHz)'),
(4, '25MB Cache'),
(4, 'LGA 1700'),
(5, '12 Núcleos / 24 Threads'),
(5, '3.7GHz (Boost 4.8GHz)'),
(5, '64MB Cache L3'),
(5, 'AM4');

-- Placas-Mãe
INSERT INTO componentes (nome, preco, marca, tipo) VALUES 
('ASUS TUF Gaming B550M-Plus', 699.00, 'ASUS', 'motherboard'),
('Gigabyte B660M DS3H', 599.00, 'Gigabyte', 'motherboard'),
('MSI MAG B550 Tomahawk', 899.00, 'MSI', 'motherboard'),
('ASUS ROG Strix B660-F Gaming', 1199.00, 'ASUS', 'motherboard'),
('ASRock B550 Phantom Gaming', 549.00, 'ASRock', 'motherboard');

-- Especificações das Placas-Mãe
INSERT INTO componente_especificacoes (componente_id, especificacao) VALUES 
(6, 'Chipset B550'),
(6, 'DDR4 até 4400MHz'),
(6, '2x M.2 NVMe'),
(6, 'AM4'),
(7, 'Chipset B660'),
(7, 'DDR4 até 3200MHz'),
(7, '1x M.2 NVMe'),
(7, 'LGA 1700'),
(8, 'Chipset B550'),
(8, 'DDR4 até 4866MHz'),
(8, '2x M.2 NVMe'),
(8, 'AM4'),
(9, 'Chipset B660'),
(9, 'DDR5 até 5333MHz'),
(9, '3x M.2 NVMe'),
(9, 'LGA 1700'),
(10, 'Chipset B550'),
(10, 'DDR4 até 4733MHz'),
(10, '2x M.2 NVMe'),
(10, 'AM4');

-- Memórias RAM
INSERT INTO componentes (nome, preco, marca, tipo) VALUES 
('Corsair Vengeance LPX 16GB', 299.00, 'Corsair', 'ram'),
('Kingston Fury Beast 16GB', 349.00, 'Kingston', 'ram'),
('G.Skill Trident Z RGB 32GB', 599.00, 'G.Skill', 'ram'),
('Crucial Ballistix 16GB', 279.00, 'Crucial', 'ram'),
('Team T-Force Delta RGB 32GB', 549.00, 'Team', 'ram');

-- Especificações das Memórias RAM
INSERT INTO componente_especificacoes (componente_id, especificacao) VALUES 
(11, '2x8GB DDR4'),
(11, '3200MHz'),
(11, 'CL16'),
(11, 'Latência 10ns'),
(12, '2x8GB DDR4'),
(12, '3600MHz'),
(12, 'CL17'),
(12, 'RGB'),
(13, '2x16GB DDR4'),
(13, '3600MHz'),
(13, 'CL16'),
(13, 'RGB Sincronizado'),
(14, '2x8GB DDR4'),
(14, '3000MHz'),
(14, 'CL15'),
(14, 'Low Profile'),
(15, '2x16GB DDR4'),
(15, '3200MHz'),
(15, 'CL16'),
(15, 'RGB Addressable');

-- Placas de Vídeo (GPU)
INSERT INTO componentes (nome, preco, marca, tipo) VALUES 
('NVIDIA RTX 3060 12GB', 1899.00, 'NVIDIA', 'gpu'),
('AMD RX 6700 XT 12GB', 1799.00, 'AMD', 'gpu'),
('NVIDIA RTX 3070 8GB', 2499.00, 'NVIDIA', 'gpu'),
('AMD RX 6800 16GB', 2799.00, 'AMD', 'gpu'),
('NVIDIA GTX 1660 Super', 1299.00, 'NVIDIA', 'gpu');

-- Especificações das Placas de Vídeo
INSERT INTO componente_especificacoes (componente_id, especificacao) VALUES 
(16, '12GB GDDR6'),
(16, '3584 CUDA Cores'),
(16, 'Ray Tracing'),
(16, 'DLSS 2.0'),
(17, '12GB GDDR6'),
(17, '2560 Stream Processors'),
(17, 'Smart Access Memory'),
(17, 'FidelityFX'),
(18, '8GB GDDR6'),
(18, '5888 CUDA Cores'),
(18, 'Ray Tracing'),
(18, 'DLSS 2.0'),
(19, '16GB GDDR6'),
(19, '3840 Stream Processors'),
(19, 'Ray Tracing'),
(19, 'Infinity Cache'),
(20, '6GB GDDR6'),
(20, '1408 CUDA Cores'),
(20, 'Turing Architecture'),
(20, 'Full HD Gaming');

-- Fontes de Alimentação (PSU)
INSERT INTO componentes (nome, preco, marca, tipo) VALUES 
('Corsair CV550 550W', 299.00, 'Corsair', 'psu'),
('EVGA 600W BR', 349.00, 'EVGA', 'psu'),
('Cooler Master MWE 650W', 449.00, 'Cooler Master', 'psu'),
('Corsair RM750 750W', 599.00, 'Corsair', 'psu'),
('Seasonic Focus GX-850', 749.00, 'Seasonic', 'psu');

-- Especificações das Fontes
INSERT INTO componente_especificacoes (componente_id, especificacao) VALUES 
(21, '550W'),
(21, '80 Plus Bronze'),
(21, 'Não Modular'),
(21, 'Ventilador 120mm'),
(22, '600W'),
(22, '80 Plus Bronze'),
(22, 'Não Modular'),
(22, 'Proteção OVP/UVP'),
(23, '650W'),
(23, '80 Plus Gold'),
(23, 'Semi-Modular'),
(23, 'Ventilador Silencioso'),
(24, '750W'),
(24, '80 Plus Gold'),
(24, 'Full Modular'),
(24, 'Zero RPM Mode'),
(25, '850W'),
(25, '80 Plus Gold'),
(25, 'Full Modular'),
(25, '10 Anos Garantia');
