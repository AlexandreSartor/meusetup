// Dados dos componentes de PC

export interface Component {
  id: string
  name: string
  price: number
  tipo: "RAM"
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



export type SelectedComponents = {
  cpu: Component | null
  motherboard: Component | null
  ram: Component | null
  gpu: Component | null
  psu: Component | null
}
