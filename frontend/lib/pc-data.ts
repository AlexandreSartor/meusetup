// Dados dos componentes de PC

export interface Component {
  id: string
  name: string
  price: number
  specs: string[]
  brand: string
}

export interface StepData {
  id: number
  title: string
  icon: string
  key: 'cpu' | 'motherboard' | 'ram' | 'gpu' | 'psu'
  components: Component[]
}

export const steps: StepData[] = [
  {
    id: 1,
    title: 'Processador (CPU)',
    icon: 'cpu',
    key: 'cpu',
    components: [
      {
        id: 'cpu-1',
        name: 'AMD Ryzen 5 5600X',
        price: 899,
        specs: ['6 Núcleos / 12 Threads', '3.7GHz (Boost 4.6GHz)', '32MB Cache L3', 'AM4'],
        brand: 'AMD'
      },
      {
        id: 'cpu-2',
        name: 'AMD Ryzen 7 5800X',
        price: 1299,
        specs: ['8 Núcleos / 16 Threads', '3.8GHz (Boost 4.7GHz)', '32MB Cache L3', 'AM4'],
        brand: 'AMD'
      },
      {
        id: 'cpu-3',
        name: 'Intel Core i5-12400F',
        price: 799,
        specs: ['6 Núcleos / 12 Threads', '2.5GHz (Boost 4.4GHz)', '18MB Cache', 'LGA 1700'],
        brand: 'Intel'
      },
      {
        id: 'cpu-4',
        name: 'Intel Core i7-12700F',
        price: 1599,
        specs: ['12 Núcleos / 20 Threads', '2.1GHz (Boost 4.9GHz)', '25MB Cache', 'LGA 1700'],
        brand: 'Intel'
      },
      {
        id: 'cpu-5',
        name: 'AMD Ryzen 9 5900X',
        price: 2199,
        specs: ['12 Núcleos / 24 Threads', '3.7GHz (Boost 4.8GHz)', '64MB Cache L3', 'AM4'],
        brand: 'AMD'
      }
    ]
  },
  {
    id: 2,
    title: 'Placa-Mãe',
    icon: 'motherboard',
    key: 'motherboard',
    components: [
      {
        id: 'mb-1',
        name: 'ASUS TUF Gaming B550M-Plus',
        price: 699,
        specs: ['Chipset B550', 'DDR4 até 4400MHz', '2x M.2 NVMe', 'AM4'],
        brand: 'ASUS'
      },
      {
        id: 'mb-2',
        name: 'Gigabyte B660M DS3H',
        price: 599,
        specs: ['Chipset B660', 'DDR4 até 3200MHz', '1x M.2 NVMe', 'LGA 1700'],
        brand: 'Gigabyte'
      },
      {
        id: 'mb-3',
        name: 'MSI MAG B550 Tomahawk',
        price: 899,
        specs: ['Chipset B550', 'DDR4 até 4866MHz', '2x M.2 NVMe', 'AM4'],
        brand: 'MSI'
      },
      {
        id: 'mb-4',
        name: 'ASUS ROG Strix B660-F Gaming',
        price: 1199,
        specs: ['Chipset B660', 'DDR5 até 5333MHz', '3x M.2 NVMe', 'LGA 1700'],
        brand: 'ASUS'
      },
      {
        id: 'mb-5',
        name: 'ASRock B550 Phantom Gaming',
        price: 549,
        specs: ['Chipset B550', 'DDR4 até 4733MHz', '2x M.2 NVMe', 'AM4'],
        brand: 'ASRock'
      }
    ]
  },
  {
    id: 3,
    title: 'Memória RAM',
    icon: 'ram',
    key: 'ram',
    components: [
      {
        id: 'ram-1',
        name: 'Corsair Vengeance LPX 16GB',
        price: 299,
        specs: ['2x8GB DDR4', '3200MHz', 'CL16', 'Latência 10ns'],
        brand: 'Corsair'
      },
      {
        id: 'ram-2',
        name: 'Kingston Fury Beast 16GB',
        price: 349,
        specs: ['2x8GB DDR4', '3600MHz', 'CL17', 'RGB'],
        brand: 'Kingston'
      },
      {
        id: 'ram-3',
        name: 'G.Skill Trident Z RGB 32GB',
        price: 599,
        specs: ['2x16GB DDR4', '3600MHz', 'CL16', 'RGB Sincronizado'],
        brand: 'G.Skill'
      },
      {
        id: 'ram-4',
        name: 'Crucial Ballistix 16GB',
        price: 279,
        specs: ['2x8GB DDR4', '3000MHz', 'CL15', 'Low Profile'],
        brand: 'Crucial'
      },
      {
        id: 'ram-5',
        name: 'Team T-Force Delta RGB 32GB',
        price: 549,
        specs: ['2x16GB DDR4', '3200MHz', 'CL16', 'RGB Addressable'],
        brand: 'Team'
      }
    ]
  },
  {
    id: 4,
    title: 'Placa de Vídeo (GPU)',
    icon: 'gpu',
    key: 'gpu',
    components: [
      {
        id: 'gpu-1',
        name: 'NVIDIA RTX 3060 12GB',
        price: 1899,
        specs: ['12GB GDDR6', '3584 CUDA Cores', 'Ray Tracing', 'DLSS 2.0'],
        brand: 'NVIDIA'
      },
      {
        id: 'gpu-2',
        name: 'AMD RX 6700 XT 12GB',
        price: 1799,
        specs: ['12GB GDDR6', '2560 Stream Processors', 'Smart Access Memory', 'FidelityFX'],
        brand: 'AMD'
      },
      {
        id: 'gpu-3',
        name: 'NVIDIA RTX 3070 8GB',
        price: 2499,
        specs: ['8GB GDDR6', '5888 CUDA Cores', 'Ray Tracing', 'DLSS 2.0'],
        brand: 'NVIDIA'
      },
      {
        id: 'gpu-4',
        name: 'AMD RX 6800 16GB',
        price: 2799,
        specs: ['16GB GDDR6', '3840 Stream Processors', 'Ray Tracing', 'Infinity Cache'],
        brand: 'AMD'
      },
      {
        id: 'gpu-5',
        name: 'NVIDIA GTX 1660 Super',
        price: 1299,
        specs: ['6GB GDDR6', '1408 CUDA Cores', 'Turing Architecture', 'Full HD Gaming'],
        brand: 'NVIDIA'
      }
    ]
  },
  {
    id: 5,
    title: 'Fonte de Alimentação',
    icon: 'psu',
    key: 'psu',
    components: [
      {
        id: 'psu-1',
        name: 'Corsair CV550 550W',
        price: 299,
        specs: ['550W', '80 Plus Bronze', 'Não Modular', 'Ventilador 120mm'],
        brand: 'Corsair'
      },
      {
        id: 'psu-2',
        name: 'EVGA 600W BR',
        price: 349,
        specs: ['600W', '80 Plus Bronze', 'Não Modular', 'Proteção OVP/UVP'],
        brand: 'EVGA'
      },
      {
        id: 'psu-3',
        name: 'Cooler Master MWE 650W',
        price: 449,
        specs: ['650W', '80 Plus Gold', 'Semi-Modular', 'Ventilador Silencioso'],
        brand: 'Cooler Master'
      },
      {
        id: 'psu-4',
        name: 'Corsair RM750 750W',
        price: 599,
        specs: ['750W', '80 Plus Gold', 'Full Modular', 'Zero RPM Mode'],
        brand: 'Corsair'
      },
      {
        id: 'psu-5',
        name: 'Seasonic Focus GX-850',
        price: 749,
        specs: ['850W', '80 Plus Gold', 'Full Modular', '10 Anos Garantia'],
        brand: 'Seasonic'
      }
    ]
  }
]

export type SelectedComponents = {
  cpu: Component | null
  motherboard: Component | null
  ram: Component | null
  gpu: Component | null
  psu: Component | null
}
