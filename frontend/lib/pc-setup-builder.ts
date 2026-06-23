interface Component {
  id: string
  name: string
  price: number
  brand: string
  tipo?: string | any
  specs: string[]
  imagemURL?: string
}

export interface FormattedComponent {
  id: number
  nome: string
  preco: number
  marca: string
  tipo: string
}

export interface PCSetupDTO {
  nome: string
  orcamentoMaximo: number
  valorTotal: number
  componentes: FormattedComponent[]
}

// ── Builder ───────────────────────────────────────────────────────────────────


export class PCSetupBuilder {
  private _name: string
  private _budget: number = 0
  private _components: Component[] = []

  constructor() {
    this._name = `Setup Customizado - ${new Date().toLocaleDateString('pt-BR')}`
  }

  setName(name: string): this {
    this._name = name
    return this
  }

  setBudget(budget: number): this {
    this._budget = budget
    return this
  }

  withCPU(component: Component | null): this {
    if (component) this._components.push(component)
    return this
  }

  withMotherboard(component: Component | null): this {
    if (component) this._components.push(component)
    return this
  }

  withRAM(component: Component | null): this {
    if (component) this._components.push(component)
    return this
  }

  withGPU(component: Component | null): this {
    if (component) this._components.push(component)
    return this
  }

  withPSU(component: Component | null): this {
    if (component) this._components.push(component)
    return this
  }


  private resolveType(component: Component): string {
    if (component.tipo) return String(component.tipo).toUpperCase()
    const id = component.id.toLowerCase()
    if (id.includes('cpu')) return 'CPU'
    if (id.includes('mb'))  return 'MOTHERBOARD'
    if (id.includes('ram')) return 'RAM'
    if (id.includes('gpu')) return 'GPU'
    return 'PSU'
  }

  private formatComponent(comp: Component): FormattedComponent {
    return {
      id: Number(comp.id),
      nome: comp.name,
      preco: comp.price,
      marca: comp.brand,
      tipo: this.resolveType(comp),
    }
  }

  // ── Build ───────────────────────────────────────────────────────────────────

  build(): PCSetupDTO {
    if (this._budget <= 0) throw new Error('PCSetupBuilder: budget must be set before calling build()')

    const valorTotal = this._components.reduce((sum, c) => sum + c.price, 0)

    return {
      nome: this._name,
      orcamentoMaximo: this._budget,
      valorTotal,
      componentes: this._components.map(c => this.formatComponent(c)),
    }
  }
}