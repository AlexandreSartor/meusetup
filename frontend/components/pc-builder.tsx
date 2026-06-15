'use client'

import { useState, useEffect } from 'react'
import { Cpu, CircuitBoard, MemoryStick, MonitorPlay, Zap, ChevronRight, ChevronLeft, Check, Gamepad2, Sparkles, Copy, QrCode, History, AlertCircle } from 'lucide-react'
import { type StepData } from '@/lib/pc-data'

// Chave para localStorage
const STORAGE_KEY = 'lastPcSetup'

// Tipo para dados salvos
interface SavedSetup {
  selected: SelectedComponents
  budget: number
  totalSpent: number
  savedAt: string
}

// Tipo para componente do backend
interface BackendComponent {
  id: number
  nome: string
  preco: number
  marca: string
  tipo: string
  imagemURL?: string;
  especificacoes: string[]
}

// Tipo para componente compatível com frontend
interface Component {
  id: string
  name: string
  price: number
  specs: string[]
  brand: string
  imagemURL?: string;
}

// Tipo para componentes selecionados
type SelectedComponents = {
  cpu: Component | null
  motherboard: Component | null
  ram: Component | null
  gpu: Component | null
  psu: Component | null
}

// Formatar valor em reais
function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

// Componente da Tela Inicial
function WelcomeScreen({ onStart, onViewLastSetup, hasLastSetup }: { 
  onStart: (budget: number) => void
  onViewLastSetup: () => void
  hasLastSetup: boolean 
}) {
  const [budget, setBudget] = useState(6000)

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '')
    setBudget(Number(value) || 0)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-background to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-card border border-border rounded-2xl p-8 md:p-10 neon-border">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center neon-glow">
                <Gamepad2 className="w-10 h-10 text-primary" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-primary animate-pulse" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-3 neon-text">
            Monte seu Setup Gamer dos Sonhos
          </h1>
          
          {/* Subtitle */}
          <p className="text-muted-foreground text-center mb-8 leading-relaxed">
            Defina seu orçamento e escolha as melhores peças compatíveis sem estourar o bolso.
          </p>

          {/* Budget Input */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-foreground mb-3">
              Orçamento Máximo (R$)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                R$
              </span>
              <input
                type="text"
                value={budget.toLocaleString('pt-BR')}
                onChange={handleBudgetChange}
                className="w-full bg-input border border-border rounded-xl py-4 pl-12 pr-4 text-xl font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="6.000"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Valor sugerido: R$ 6.000,00 para um setup intermediário
            </p>
          </div>

          {/* Start Button */}
          <button
            onClick={() => onStart(budget)}
            disabled={budget < 1000}
            className="w-full bg-primary hover:bg-primary/90 disabled:bg-muted disabled:cursor-not-allowed text-primary-foreground font-bold text-lg py-4 px-6 rounded-xl transition-all duration-300 neon-glow hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
          >
            <Sparkles className="w-5 h-5" />
            Iniciar Montagem
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* View Last Setup Button */}
          {hasLastSetup && (
            <button
              onClick={onViewLastSetup}
              className="w-full mt-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium text-base py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 border border-border hover:border-primary/50"
            >
              <History className="w-5 h-5" />
              Ver Último Setup Montado
            </button>
          )}

          {budget < 1000 && (
            <p className="text-destructive text-sm text-center mt-3">
              O orçamento mínimo é R$ 1.000,00
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

// Ícone do passo
function StepIcon({ step, size = 'md' }: { step: StepData['key']; size?: 'sm' | 'md' }) {
  const iconClass = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'
  
  switch (step) {
    case 'cpu':
      return <Cpu className={iconClass} />
    case 'motherboard':
      return <CircuitBoard className={iconClass} />
    case 'ram':
      return <MemoryStick className={iconClass} />
    case 'gpu':
      return <MonitorPlay className={iconClass} />
    case 'psu':
      return <Zap className={iconClass} />
    default:
      return null
  }
}


function ProgressBar({ 
  currentStep, 
  budget, 
  totalSpent,
  steps
}: { 
  currentStep: number
  budget: number
  totalSpent: number 
  steps: StepData[]
}) {
  const remaining = budget - totalSpent
  const isNegative = remaining < 0

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6">
      {/* Steps */}
      <div className="flex items-center justify-between mb-6">
        {steps && steps.map((step, index) => {
          const isActive = currentStep === index
          const isCompleted = currentStep > index
          
          return (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'bg-primary text-primary-foreground neon-glow-sm'
                      : isCompleted
                        ? 'bg-primary/20 text-primary'
                        : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <StepIcon step={step.key} />
                  )}
                </div>
                <span
                  className={`text-xs mt-2 font-medium hidden md:block ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {step.title.split(' ')[0]}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-8 md:w-16 lg:w-24 h-1 mx-2 rounded-full transition-all ${
                    currentStep > index ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Budget Info */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-secondary/50 rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Orçamento</p>
          <p className="font-bold text-foreground">{formatCurrency(budget)}</p>
        </div>
        <div className="bg-secondary/50 rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Gasto</p>
          <p className="font-bold text-primary">{formatCurrency(totalSpent)}</p>
        </div>
        <div className={`rounded-lg p-3 ${isNegative ? 'bg-destructive/20' : 'bg-secondary/50'}`}>
          <p className="text-xs text-muted-foreground mb-1">Restante</p>
          <p className={`font-bold ${isNegative ? 'text-destructive' : 'text-green-400'}`}>
            {formatCurrency(remaining)}
          </p>
        </div>
      </div>
    </div>
  )
}

// Card de Componente
function ComponentCard({ 
  component, 
  isSelected, 
  onSelect 
}: { 
  component: Component
  isSelected: boolean
  onSelect: () => void 
}) {
  // Ícone baseado no tipo de componente (usado como fallback caso a imagem falhe)
  const getComponentIcon = () => {
    if (component.id.startsWith('cpu')) return <Cpu className="w-8 h-8 text-muted-foreground/50" />
    if (component.id.startsWith('mb')) return <CircuitBoard className="w-8 h-8 text-muted-foreground/50" />
    if (component.id.startsWith('ram')) return <MemoryStick className="w-8 h-8 text-muted-foreground/50" />
    if (component.id.startsWith('gpu')) return <MonitorPlay className="w-8 h-8 text-muted-foreground/50" />
    if (component.id.startsWith('psu')) return <Zap className="w-8 h-8 text-muted-foreground/50" />
    return <Cpu className="w-8 h-8 text-muted-foreground/50" />
  }

  return (
    <div
      className={`bg-card border rounded-xl p-4 md:p-5 transition-all duration-300 cursor-pointer hover:border-primary/50 ${
        isSelected ? 'border-primary neon-border' : 'border-border hover:bg-card-hover'
      }`}
      onClick={onSelect}
    >
      {/* Image Container - Agora renderiza a imagem real vinda do banco */}
      <div className="w-full h-32 bg-muted/30 rounded-lg mb-4 flex items-center justify-center border border-border/50 overflow-hidden relative">
        {component.imagemURL ? (
          <img 
            src={component.imagemURL} 
            alt={component.name} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          getComponentIcon()
        )}
      </div>

      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
            {component.brand}
          </span>
        </div>
        {isSelected && (
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <Check className="w-4 h-4 text-primary-foreground" />
          </div>
        )}
      </div>
      
      <h3 className="font-bold text-foreground mb-3 text-lg">{component.name}</h3>
      
      <ul className="space-y-1 mb-4">
        {component.specs && component.specs.map((spec, index) => (
          <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
            <span className="w-1 h-1 bg-primary rounded-full" />
            {spec}
          </li>
        ))}
      </ul>
      
      <div className="flex items-center justify-between gap-2 mt-auto w-full">
        <span className="text-lg font-bold text-purple-500 whitespace-nowrap">
          R$ {component.price}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation(); // Evita disparar o clique do card duas vezes
            onSelect(); // Corrigido: adicionado os () para executar a função
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all max-w-[110px] truncate ${
            isSelected
              ? 'bg-purple-600 text-white border border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          <span>{isSelected ? 'Selecionado' : 'Selecionar'}</span>
        </button>
      </div>
    </div>
  );
}

// Vitrine de Componentes
function ComponentShowcase({
  step,
  selectedComponent,
  onSelect,
  onBack,
  onNext,
  canGoBack,
  canGoNext
}: {
  step: StepData
  selectedComponent: Component | null
  onSelect: (component: Component) => void
  onBack: () => void
  onNext: () => void
  canGoBack: boolean
  canGoNext: boolean
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
            <StepIcon step={step.key} />
          </div>
          {step.title}
        </h2>
        <p className="text-muted-foreground mt-2">
          Escolha o melhor {step.title.toLowerCase()} para o seu setup
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
        {step.components.map((component) => (
          <ComponentCard
            key={component.id}
            component={component}
            isSelected={selectedComponent?.id === component.id}
            onSelect={() => onSelect(component)}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <button
          onClick={onBack}
          disabled={!canGoBack}
          className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-secondary text-secondary-foreground hover:bg-secondary/80"
        >
          <ChevronLeft className="w-5 h-5" />
          Voltar
        </button>
        <button
          onClick={onNext}
          disabled={!canGoNext}
          className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-primary-foreground hover:bg-primary/90 neon-glow-sm"
        >
          Avançar
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

// Barra Lateral de Resumo
function SummarySidebar({
  selected,
  totalSpent,
  onFinish,
  canFinish
}: {
  selected: SelectedComponents
  totalSpent: number
  onFinish: () => void
  canFinish: boolean
}) {
  const slots = [
    { key: 'cpu' as const, label: 'Processador', icon: <Cpu className="w-4 h-4" /> },
    { key: 'motherboard' as const, label: 'Placa-Mãe', icon: <CircuitBoard className="w-4 h-4" /> },
    { key: 'ram' as const, label: 'Memória RAM', icon: <MemoryStick className="w-4 h-4" /> },
    { key: 'gpu' as const, label: 'Placa de Vídeo', icon: <MonitorPlay className="w-4 h-4" /> },
    { key: 'psu' as const, label: 'Fonte', icon: <Zap className="w-4 h-4" /> }
  ]

  return (
    <div className="bg-card border border-border rounded-xl p-4 md:p-5 h-fit sticky top-4">
      <h3 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
        <Gamepad2 className="w-5 h-5 text-primary" />
        Seu Setup
      </h3>

      <div className="space-y-3 mb-6">
        {slots.map((slot) => {
          const component = selected[slot.key]
          return (
            <div
              key={slot.key}
              className={`p-3 rounded-lg border transition-all ${
                component
                  ? 'bg-primary/10 border-primary/30'
                  : 'bg-muted/50 border-border'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={component ? 'text-primary' : 'text-muted-foreground'}>
                  {slot.icon}
                </span>
                <span className="text-xs font-medium text-muted-foreground">
                  {slot.label}
                </span>
              </div>
              {component ? (
                <div>
                  <p className="text-sm font-medium text-foreground truncate">
                    {component.name}
                  </p>
                  <p className="text-xs text-primary font-bold">
                    {formatCurrency(component.price)}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">Não selecionado</p>
              )}
            </div>
          )
        })}
      </div>

      <div className="border-t border-border pt-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-muted-foreground">Total:</span>
          <span className="text-2xl font-bold text-primary neon-text">
            {formatCurrency(totalSpent)}
          </span>
        </div>
      </div>

      <button
        onClick={onFinish}
        disabled={!canFinish}
        className="w-full bg-primary hover:bg-primary/90 disabled:bg-muted disabled:cursor-not-allowed text-primary-foreground font-bold py-3 px-4 rounded-xl transition-all duration-300 neon-glow hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
      >
        <Sparkles className="w-5 h-5" />
        Finalizar Setup
      </button>

      {!canFinish && (
        <p className="text-xs text-muted-foreground text-center mt-2">
          Selecione todas as peças para finalizar
        </p>
      )}
    </div>
  )
}

// Modal de Finalização
function FinishModal({ 
  selected, 
  totalSpent,
  budget,
  onClose,
  onRestart
}: { 
  selected: SelectedComponents
  totalSpent: number
  budget: number
  onClose: () => void
  onRestart: () => void
}) {
  const isOverBudget = totalSpent > budget
  const [copied, setCopied] = useState(false)
  
  // Código PIX fictício
  const pixCode = `00020126580014br.gov.bcb.pix0136${Date.now().toString(36).toUpperCase()}PCGAMER520400005303986540${totalSpent.toFixed(2)}5802BR5925SETUP_GAMER_STORE6009SAO_PAULO62070503***6304`

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-start overflow-y-auto py-10 z-50">
      <div className="bg-card border border-primary rounded-2xl p-6 md:p-8 max-w-md w-full neon-border animate-in fade-in zoom-in duration-300 my-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 neon-glow">
            <Gamepad2 className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground neon-text">
            Setup Montado!
          </h2>
          <p className="text-muted-foreground mt-2">
            Seu PC Gamer está pronto para dominar!
          </p>
        </div>

        <div className="space-y-2 mb-6">
          {Object.entries(selected).map(([key, component]) => (
            component && (
              <div key={key} className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-sm text-foreground">{component.name}</span>
                <span className="text-sm font-bold text-primary">{formatCurrency(component.price)}</span>
              </div>
            )
          ))}
        </div>

        <div className="bg-secondary/50 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground">Total:</span>
            <span className="text-2xl font-bold text-primary">{formatCurrency(totalSpent)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Orçamento:</span>
            <span className="font-medium text-foreground">{formatCurrency(budget)}</span>
          </div>
          {isOverBudget && (
            <p className="text-destructive text-sm mt-2 text-center">
              Você estourou o orçamento em {formatCurrency(totalSpent - budget)}
            </p>
          )}
          {!isOverBudget && (
            <p className="text-green-400 text-sm mt-2 text-center">
              Você economizou {formatCurrency(budget - totalSpent)}!
            </p>
          )}
        </div>

        {/* Seção de Pagamento PIX */}
        <div className="bg-muted/30 border border-border rounded-xl p-4 mb-6">
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <QrCode className="w-4 h-4 text-primary" />
            Pagamento via PIX
          </h3>
          
          {/* QR Code Placeholder */}
          <div className="w-32 h-32 mx-auto mb-4 bg-foreground rounded-lg p-2 flex items-center justify-center">
            <div className="w-full h-full bg-background rounded flex items-center justify-center relative overflow-hidden">
              {/* Simulated QR Code pattern */}
              <div className="absolute inset-2 grid grid-cols-8 gap-0.5">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-full aspect-square ${
                      Math.random() > 0.5 ? 'bg-foreground' : 'bg-transparent'
                    }`}
                  />
                ))}
              </div>
              {/* Corner patterns for QR authenticity */}
              <div className="absolute top-1 left-1 w-5 h-5 border-2 border-foreground bg-background flex items-center justify-center">
                <div className="w-2 h-2 bg-foreground" />
              </div>
              <div className="absolute top-1 right-1 w-5 h-5 border-2 border-foreground bg-background flex items-center justify-center">
                <div className="w-2 h-2 bg-foreground" />
              </div>
              <div className="absolute bottom-1 left-1 w-5 h-5 border-2 border-foreground bg-background flex items-center justify-center">
                <div className="w-2 h-2 bg-foreground" />
              </div>
            </div>
          </div>

         {/* PIX Copia e Cola */}
<div className="space-y-2">
  <label className="text-xs text-muted-foreground">PIX Copia e Cola:</label>
  <div className="flex gap-2">
    <input
      type="text"
      value={pixCode}
      readOnly
      className="flex-1 bg-input border border-border rounded-lg px-3 py-2 text-xs text-foreground font-mono truncate"
    />
    <button
      onClick={handleCopyPix}
      className={`px-3 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-1 ${
        copied 
          ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
          : 'bg-primary text-primary-foreground hover:bg-primary/90'
      }`}
    >
      {/* Adicionadas as chaves 'key' para o React não quebrar o DOM */}
      {copied ? (
        <Check key="icon-check" className="w-4 h-4" />
      ) : (
        <Copy key="icon-copy" className="w-4 h-4" />
      )}
      <span>{copied ? 'Copiado!' : 'Copiar'}</span>
    </button>
  </div>
</div>
</div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-secondary text-secondary-foreground font-medium py-3 px-4 rounded-xl hover:bg-secondary/80 transition-all"
          >
            Fechar
          </button>
          <button
            onClick={onRestart}
            className="flex-1 bg-primary text-primary-foreground font-medium py-3 px-4 rounded-xl hover:bg-primary/90 transition-all neon-glow-sm"
          >
            Nova Montagem
          </button>
        </div>
      </div>
    </div>
  )
}

// Tela do Montador
function BuilderScreen({ 
  budget, 
  onRestart,
  onSaveSetup,
  initialSelected,
  components,
  loading,
  error,
  setError
}: { 
  budget: number
  onRestart: () => void
  onSaveSetup: (selected: SelectedComponents, totalSpent: number) => Promise<boolean>
  initialSelected?: SelectedComponents | null
  components: Component[]
  loading: boolean
  error: string | null
  setError: (error: string | null) => void
}) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selected, setSelected] = useState<SelectedComponents>(
    initialSelected || {
      cpu: null,
      motherboard: null,
      ram: null,
      gpu: null,
      psu: null
    }
  )
  const [showFinishModal, setShowFinishModal] = useState(false)

  // Log temporário para você inspecionar os dados vindos do banco de dados (fique de olho no F12)
  useEffect(() => {
    if (components && components.length > 0) {
      console.log('Componentes recebidos do Backend:', components)
    }
  }, [components])

  // Agrupar componentes por tipo de forma flexível e segura (ignora maiúsculas/minúsculas)
  const componentsByType = {
    cpu: components.filter(c => 
      c.brand.toUpperCase() === 'AMD' || 
      c.brand.toUpperCase() === 'INTEL' || 
      c.id.toLowerCase().includes('cpu')
    ),
    motherboard: components.filter(c => 
      ['ASUS', 'GIGABYTE', 'MSI', 'ASROCK'].includes(c.brand.toUpperCase()) || 
      c.id.toLowerCase().includes('mb') || 
      c.id.toLowerCase().includes('motherboard')
    ),
    ram: components.filter(c => 
      ['CORSAIR', 'KINGSTON', 'G.SKILL', 'CRUCIAL', 'TEAM', 'XPG', 'ASGARD'].includes(c.brand.toUpperCase()) || 
      c.id.toLowerCase().includes('ram')
    ),
    gpu: components.filter(c => 
      c.brand.toUpperCase() === 'NVIDIA' || 
      c.brand.toUpperCase() === 'AMD' || 
      c.id.toLowerCase().includes('gpu')
    ),
    psu: components.filter(c => 
      ['CORSAIR', 'EVGA', 'COOLER MASTER', 'SEASONIC', 'XPG', 'FONTE'].includes(c.brand.toUpperCase()) || 
      c.id.toLowerCase().includes('psu')
    )
  }

  // Criar steps dinamicamente com componentes do backend
  const dynamicSteps: StepData[] = [
    {
      id: 1,
      title: 'Processador (CPU)',
      icon: 'cpu',
      key: 'cpu',
      components: componentsByType.cpu
    },
    {
      id: 2,
      title: 'Placa-Mãe',
      icon: 'motherboard',
      key: 'motherboard',
      components: componentsByType.motherboard
    },
    {
      id: 3,
      title: 'Memória RAM',
      icon: 'ram',
      key: 'ram',
      components: componentsByType.ram
    },
    {
      id: 4,
      title: 'Placa de Vídeo (GPU)',
      icon: 'gpu',
      key: 'gpu',
      components: componentsByType.gpu
    },
    {
      id: 5,
      title: 'Fonte de Alimentação',
      icon: 'psu',
      key: 'psu',
      components: componentsByType.psu
    }
  ]

  const currentStepData = dynamicSteps[currentStep]

  const totalSpent = Object.values(selected).reduce(
    (sum, component) => sum + (component?.price || 0),
    0
  )

  const handleSelect = (component: Component) => {
    setSelected((prev) => ({
      ...prev,
      [currentStepData.key]: prev[currentStepData.key]?.id === component.id ? null : component
    }))
  }

  const canFinish = Object.values(selected).every((component) => component !== null)

  const handleFinish = async () => {
    setError(null)
    const success = await onSaveSetup(selected, totalSpent)
    if (success) {
      setShowFinishModal(true)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 p-4 md:p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={onRestart}
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Voltar ao Início
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
            <Gamepad2 className="w-8 h-8 text-primary" />
            Montador de PC Gamer
          </h1>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-destructive/10 border border-destructive/50 rounded-xl p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
            <p className="text-destructive text-sm flex-1">{error}</p>
            <button
              onClick={() => setError(null)}
              className="text-destructive hover:text-destructive/80 transition-colors"
            >
              ✕
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Carregando componentes...</p>
            </div>
          </div>
        )}

        
        {/* Progress Bar */}
          <div className="mb-6">
            <ProgressBar 
              currentStep={currentStep} 
              budget={budget} 
              totalSpent={totalSpent} 
              steps={dynamicSteps} // <-- Adicione esta linha aqui
            />
          </div>

        {/* Main Content */}
        {!loading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Component Showcase */}
            <div className="lg:col-span-2">
              <ComponentShowcase
                step={currentStepData}
                selectedComponent={selected[currentStepData.key]}
                onSelect={handleSelect}
                onBack={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                onNext={() => setCurrentStep((prev) => Math.min(dynamicSteps.length - 1, prev + 1))}
                canGoBack={currentStep > 0}
                canGoNext={currentStep < dynamicSteps.length - 1}
              />
            </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <SummarySidebar
              selected={selected}
              totalSpent={totalSpent}
              onFinish={handleFinish}
              canFinish={canFinish}
            />
          </div>
        </div>
        )}
      </div>

      {/* Finish Modal */}
      {showFinishModal && (
        <FinishModal
          selected={selected}
          totalSpent={totalSpent}
          budget={budget}
          onClose={() => setShowFinishModal(false)}
          onRestart={onRestart}
        />
      )}
    </div>
  )
}

// Componente Principal
export default function PCBuilder() {
  const [screen, setScreen] = useState<'welcome' | 'builder' | 'viewLast'>('welcome')
  const [budget, setBudget] = useState(6000)
  const [lastSetup, setLastSetup] = useState<SavedSetup | null>(null)
  const [components, setComponents] = useState<Component[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Carregar componentes do backend
  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/componentes')
        if (!response.ok) {
          throw new Error('Falha ao carregar componentes')
        }
        const backendComponents: BackendComponent[] = await response.json()
        
        // Converter para formato do frontend
        const frontendComponents: Component[] = backendComponents.map(comp => ({
          id: comp.id.toString(),
          name: comp.nome,
          price: comp.preco,
          brand: comp.marca,
          imagemURL: comp.imagemURL,
          specs: comp.especificacoes || []
        }))
        
        setComponents(frontendComponents)
      } catch (err) {
        setError('Erro ao carregar componentes do servidor')
        console.error('Erro ao buscar componentes:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchComponents()
  }, [])

  // Carregar último setup do localStorage ao iniciar
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setLastSetup(JSON.parse(saved))
      }
    } catch {
      // Ignora erros de localStorage
    }
  }, [])

  const handleStart = (selectedBudget: number) => {
    setBudget(selectedBudget)
    setScreen('builder')
  }

  const handleSaveSetup = async (selectedComponents: SelectedComponents, totalSpent: number) => {
    try {
      setError(null)

      // 1. Criamos a lista filtrando apenas os componentes que o usuário de fato selecionou
      const listaDeComponentes = [
        selectedComponents.cpu,
        selectedComponents.motherboard,
        selectedComponents.ram,
        selectedComponents.gpu,
        selectedComponents.psu
      ].filter((comp): comp is Component => comp !== null) // Remove os nulos caso algum passo tenha ficado em branco

      // 2. Mapeamos os objetos do front para o padrão em português aceito pela Entity/Banco do Java
      const componentesFormatados = listaDeComponentes.map(comp => ({
        id: Number(comp.id),
        nome: comp.name,
        preco: comp.price,
        marca: comp.brand,
        tipo: comp.id.toLowerCase().includes('cpu') ? 'CPU' : 
              comp.id.toLowerCase().includes('mb') ? 'MOTHERBOARD' :
              comp.id.toLowerCase().includes('ram') ? 'RAM' :
              comp.id.toLowerCase().includes('gpu') ? 'GPU' : 'PSU'
      }))

      // 3. Montamos o objeto exatamente como a classe Setup.java espera receber
      const dadosParaSalvar = {
        nome: `Setup Customizado - ${new Date().toLocaleDateString('pt-BR')}`,
        orcamentoMaximo: budget, // Atributo exato do Setup.java
        valorTotal: totalSpent,  // Atributo exato do Setup.java
        componentes: componentesFormatados // A lista única que a validação do Java exige!
      }

      console.log('JSON alinhado com o Backend Java:', JSON.stringify(dadosParaSalvar, null, 2))

      const response = await fetch('http://localhost:8080/api/setups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosParaSalvar),
      })

      if (!response.ok) {
        const errorData = await response.text()
        console.error('O servidor Java recusou com o erro:', errorData)
        throw new Error(errorData || 'O valor do setup excede o orçamento disponível!')
      }

      // Se deu bom, salva localmente e prossegue
      const setupData: SavedSetup = {
        selected: selectedComponents,
        budget,
        totalSpent,
        savedAt: new Date().toISOString()
      }
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(setupData))
      setLastSetup(setupData)
      
      return true

    } catch (err: any) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao salvar setup no servidor'
      setError(errorMessage)
      console.error('Erro detalhado no salvamento:', err)
      return false
    }
  }

  const handleViewLastSetup = () => {
    if (lastSetup) {
      setBudget(lastSetup.budget)
      setScreen('viewLast')
    }
  }

  const handleRestart = () => {
    setScreen('welcome')
  }

  if (screen === 'welcome') {
    return (
      <WelcomeScreen 
        onStart={handleStart} 
        onViewLastSetup={handleViewLastSetup}
        hasLastSetup={lastSetup !== null}
      />
    )
  }

  if (screen === 'viewLast' && lastSetup) {
    return (
      <div className="min-h-screen bg-background">
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent pointer-events-none" />
        <FinishModal
          selected={lastSetup.selected}
          totalSpent={lastSetup.totalSpent}
          budget={lastSetup.budget}
          onClose={handleRestart}
          onRestart={handleRestart}
        />
      </div>
    )
  }

  return (
    <BuilderScreen 
      budget={budget} 
      onRestart={handleRestart} 
      onSaveSetup={handleSaveSetup}
      initialSelected={null}
      components={components}
      loading={loading}
      error={error}
      setError={setError}
    />
  )
}
