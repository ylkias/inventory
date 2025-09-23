"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Computer,
  HardDrive,
  Settings,
  Shield,
  Users,
  FileText,
  BarChart3,
  Package,
  BookOpen,
  Brain,
  Plus,
  RefreshCw,
  AlertCircle,
  Activity,
  Database,
  FileCheck,
  PenTool,
  Menu,
  X,
  Printer,
  Download,
} from "lucide-react"

const mockInventoryStats = {
  totalAssets: 1247,
  availableAssets: 892,
  inUseAssets: 298,
  maintenanceAssets: 57,
  windowsMachines: 743,
  linuxMachines: 504,
  pendingReturns: 23,
  overdueReturns: 8,
}

const mockInventoryItems = [
  {
    id: "INV-001",
    name: "Laptop Dell Latitude 5520",
    type: "Laptop",
    platform: "Windows",
    model: "Latitude 5520",
    serialNumber: "DL5520001",
    patrimony: "PAT-2023-001",
    notaFiscal: "NF-001234",
    chamado: "CH-2023-045",
    specifications: "Intel i7, 16GB RAM, 512GB SSD",
    purchaseDate: "2023-01-15",
    warrantyExpiry: "2026-01-15",
    location: "Almoxarifado TI",
    status: "Disponível",
    assignedTo: null,
    responsibilityTerm: null,
    returnControl: null,
    timeline: [
      {
        id: "T-001",
        user: "Sistema",
        action: "Cadastro",
        date: "2023-01-15",
        endDate: null,
        duration: "Permanente",
        department: "TI",
        reason: "Cadastro inicial no sistema",
        status: "Concluído",
        termSigned: false,
        termId: null,
      },
    ],
  },
  // {
  //   id: "INV-002",
  //   name: "Desktop HP EliteDesk 800",
  //   type: "Desktop",
  //   platform: "Windows",
  //   model: "EliteDesk 800",
  //   serialNumber: "HP800002",
  //   patrimony: "PAT-2023-002",
  //   notaFiscal: "NF-001235",
  //   chamado: "CH-2023-046",
  //   specifications: "Intel i5, 8GB RAM, 256GB SSD",
  //   purchaseDate: "2023-02-01",
  //   warrantyExpiry: "2026-02-01",
  //   location: "Setor Financeiro",
  //   status: "Em Uso",
  //   assignedTo: "Maria Santos",
  //   responsibilityTerm: {
  //     id: "TERM-002",
  //     status: "Vencido",
  //     signedBy: "Maria Santos",
  //     signedDate: "2023-06-01",
  //     expiryDate: "2024-01-01",
  //     templateUsed: "Cessão de Uso",
  //     documentUrl: "/terms/TERM-002.pdf",
  //   },
  //   returnControl: {
  //     expectedReturn: "2024-01-15",
  //     daysOverdue: 15,
  //     status: "Em Atraso",
  //     lastContact: "2024-01-10",
  //   },
  //   timeline: [
  //     {
  //       id: "T-001",
  //       user: "Sistema",
  //       action: "Cadastro",
  //       date: "2023-02-01",
  //       endDate: null,
  //       duration: "Permanente",
  //       department: "TI",
  //       reason: "Cadastro inicial no sistema",
  //       status: "Concluído",
  //       termSigned: false,
  //       termId: null,
  //     },
  //     {
  //       id: "T-002",
  //       user: "Maria Santos",
  //       action: "Empréstimo",
  //       date: "2023-06-01",
  //       endDate: null,
  //       duration: "Em andamento",
  //       department: "Setor Financeiro",
  //       reason: "Uso operacional",
  //       status: "Ativo",
  //       termSigned: true,
  //       termId: "TERM-002",
  //     },
  //   ],
  // },
]

const mockTermTemplates = [
  {
    id: "TPL-001",
    name: "Termo de Cessão de Uso",
    type: "cessao",
    content: `TERMO DE CESSÃO DE USO DE EQUIPAMENTOS

Eu, {{nome_funcionario}}, inscrito(a) no CPF sob o nº {{cpf_funcionario}}, declaro que recebi o material de trabalho cedido pela minha empregadora {{nome_empresa}}, inscrita no CNPJ sob o nº {{cnpj_empresa}}, a título de empréstimo para execução de minhas atividades durante o período de trabalho, os equipamentos especificados neste termo, ficando ciente de que retornarei os equipamentos completos e em perfeito estado de conservação, considerando-se o tempo do uso do mesmo.

Descrição dos equipamentos recebidos:
{{descricao_equipamentos}}

Pelo presente Termo de Cessão de Uso, o declarante acima qualificado registra que recebeu os equipamentos e acessórios acima especificados.

O Fornecedor abaixo assinado, Responsável pela Entrega, declara que entregou os equipamentos e acessórios ao funcionário acima qualificado.

OBSERVAÇÕES
{{observacoes}}

____________________________                    ____________________________
Assinatura do Funcionário                        Assinatura do Responsável pela Entrega`,
    variables: [
      "nome_funcionario",
      "cpf_funcionario",
      "nome_empresa",
      "cnpj_empresa",
      "descricao_equipamentos",
      "observacoes",
    ],
    createdAt: "2024-01-01",
    isActive: true,
  },
  {
    id: "TPL-002",
    name: "Termo de Devolução",
    type: "devolucao",
    content: `TERMO DE DEVOLUÇÃO DE EQUIPAMENTOS

Eu, {{nome_funcionario}}, inscrito(a) no CPF sob o nº {{cpf_funcionario}}, declaro e confirmo a devolução do material de trabalho cedido pela minha empregadora {{nome_empresa}}, inscrita no CNPJ sob o nº {{cnpj_empresa}}, a título de empréstimo para execução de minhas atividades durante o período de trabalho, ficando ciente de que devolvi os equipamentos completos e em perfeito estado de conservação, considerando-se o tempo do uso do mesmo.

Descrição dos equipamentos devolvidos:
{{descricao_equipamentos}}

Pelo presente Termo de Devolução, o declarante acima qualificado registra que devolveu os equipamentos e acessórios acima especificados nas mesmas condições que os recebeu.

O receptor abaixo assinado, Responsável pelo Recebimento, declara que recebeu os equipamentos em devolução nas mesmas condições de entrega.

OBSERVAÇÕES
{{observacoes}}

____________________________                    ____________________________
Assinatura do Funcionário                        Assinatura do Responsável pelo Recebimento`,
    variables: [
      "nome_funcionario",
      "cpf_funcionario",
      "nome_empresa",
      "cnpj_empresa",
      "descricao_equipamentos",
      "observacoes",
    ],
    createdAt: "2024-01-01",
    isActive: true,
  },
]

const mockProtocols = [
  {
    id: "PROT-001",
    number: "PROT-001",
    user: "João Silva",
    equipment: "Laptop Dell Latitude 5520",
    equipmentIds: ["INV-001"],
    date: "2024-01-15",
    expectedReturn: "2024-07-15",
    status: "Ativo",
    chamado: "CH-2024-001",
    observations: "Equipamento para trabalho remoto",
    createdBy: "Admin",
    createdAt: "2024-01-15T10:00:00Z",
  },
  // {
  //   id: "PROT-002",
  //   number: "PROT-002",
  //   user: "Maria Santos",
  //   equipment: "Desktop HP EliteDesk 800",
  //   equipmentIds: ["INV-002"],
  //   date: "2024-01-10",
  //   expectedReturn: "2024-01-15",
  //   status: "Vencido",
  //   chamado: "CH-2024-002",
  //   observations: "Substituição de equipamento defeituoso",
  //   createdBy: "Admin",
  //   createdAt: "2024-01-10T14:30:00Z",
  // },
]

const mockTerms = [
  {
    id: "TERM-001",
    responsible: "João Silva",
    patrimony: "PAT-2023-001",
    equipment: "Laptop Dell Latitude 5520",
    signedDate: "2023-05-15",
    expiryDate: "2024-05-15",
    status: "Válido",
    templateUsed: "Cessão de Uso",
    documentUrl: "/terms/TERM-001.pdf",
  },
  // {
  //   id: "TERM-002",
  //   responsible: "Maria Santos",
  //   patrimony: "PAT-2023-002",
  //   equipment: "Desktop HP EliteDesk 800",
  //   signedDate: "2023-06-01",
  //   expiryDate: "2024-01-01",
  //   status: "Vencido",
  //   templateUsed: "Cessão de Uso",
  //   documentUrl: "/terms/TERM-002.pdf",
  // },
]

const mockAuditLogs = [
  {
    id: "LOG-001",
    timestamp: "2024-01-15T10:30:00Z",
    user: "admin@empresa.com",
    module: "Inventário",
    action: "Criação de Item",
    details: "Criado item: Laptop Dell Latitude 5520",
    severity: "Info",
    ipAddress: "192.168.1.100",
  },
//   {
//     id: "LOG-002",
//     timestamp: "2024-01-15T11:00:00Z",
//     user: "joao.silva@empresa.com",
//     module: "Termos",
//     action: "Assinatura Digital",
//     details: "Assinado termo TERM-001",
//     severity: "Info",
//     ipAddress: "192.168.1.101",
//   },
//   {
//     id: "LOG-003",
//     timestamp: "2024-01-15T11:30:00Z",
//     user: "sistema",
//     module: "Inteligência",
//     action: "Alerta Gerado",
//     details: "Termo TERM-002 vencido há 15 dias",
//     severity: "Warning",
//     ipAddress: "127.0.0.1",
//   },
]

const mockIntelligenceAlerts = [
  {
    id: "ALT-001",
    type: "Termo Vencido",
    equipment: "Desktop HP EliteDesk 800",
    user: "Maria Santos",
    message: "Termo de responsabilidade vencido há 15 dias",
    severity: "High",
    date: "2024-01-15",
    status: "Pendente",
    action: "Renovar termo",
  },
//   {
//     id: "ALT-002",
//     type: "Login Recorrente",
//     equipment: "Laptop Dell Latitude 5520",
//     user: "João Silva",
//     message: "Usuário fez login 15 vezes nos últimos 7 dias",
//     severity: "Medium",
//     date: "2024-01-14",
//     status: "Monitorando",
//     action: "Verificar uso adequado",
//   },
]

const mockPendingTerms = [
  {
    id: "TERM-005",
    title: "Termo de Cessão de Uso - Notebook",
    equipment: "Laptop Dell Inspiron 15",
    patrimony: "PAT-2023-005",
    description: "Termo para uso de notebook corporativo",
    priority: "Urgente",
    createdDate: "2024-01-20",
    dueDate: "2024-01-25",
    type: "cessao",
  },
  // {
  //   id: "TERM-006",
  //   title: "Termo de Responsabilidade - Monitor",
  //   equipment: "Monitor LG 24''",
  //   patrimony: "PAT-2023-006",
  //   description: "Termo para uso de monitor adicional",
  //   priority: "Alta",
  //   createdDate: "2024-01-18",
  //   dueDate: "2024-01-28",
  //   type: "responsabilidade",
  // },
]

const mockSignedTerms = [
  {
    id: "TERM-001",
    title: "Termo de Cessão de Uso - Laptop",
    equipment: "Laptop Dell Latitude 5520",
    patrimony: "PAT-2023-001",
    signedBy: "João Silva",
    email: "joao.silva@empresa.com",
    signedDate: "2023-05-15",
    status: "Válido",
  },
  // {
  //   id: "TERM-002",
  //   title: "Termo de Responsabilidade - Desktop",
  //   equipment: "Desktop HP EliteDesk 800",
  //   patrimony: "PAT-2023-002",
  //   signedBy: "Maria Santos",
  //   email: "maria.santos@empresa.com",
  //   signedDate: "2023-06-01",
  //   status: "Vencido",
  // },
]

function Dashboard() {
  const [selectedModule, setSelectedModule] = useState("dashboard")
  const [inventoryTab, setInventoryTab] = useState("items")
  const [operationsTab, setOperationsTab] = useState("protocols")
  const [wikiSection, setWikiSection] = useState("overview")
  const [protocolView, setProtocolView] = useState("cards")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [userSignatureTab, setUserSignatureTab] = useState("pending")
  const [showUserSignatureModal, setShowUserSignatureModal] = useState(false)
  const [selectedTermToSign, setSelectedTermToSign] = useState(null)
  const [userSignatureData, setUserSignatureData] = useState({
    name: "",
    email: "",
    cpf: "",
    department: "",
    companyName: "",
    companyCnpj: "",
    equipmentPatrimony: "",
    equipmentBrand: "",
    equipmentModel: "",
    equipmentSerial: "",
    signature: null,
    agreed: false,
    timestamp: null,
  })

  // Estados para filtros
  const [inventoryFilter, setInventoryFilter] = useState({
    status: "all",
    platform: "all",
    type: "all",
    term: "all",
    search: "",
  })

  const [protocolFilter, setProtocolFilter] = useState({
    status: "all",
    user: "all",
    search: "",
  })

  const [termFilter, setTermFilter] = useState({
    status: "all",
    responsible: "all",
    equipment: "",
    period: "all",
  })

  // Estados para modais
  const [showAddForm, setShowAddForm] = useState(false)
  const [showEquipmentDetails, setShowEquipmentDetails] = useState(false)
  const [showTermModal, setShowTermModal] = useState(false)
  const [showProtocolForm, setShowProtocolForm] = useState(false)
  const [showTermForm, setShowTermForm] = useState(false)
  const [showTemplateForm, setShowTemplateForm] = useState(false)
  const [showSignatureModal, setShowSignatureModal] = useState(false)
  const [showReturnModal, setShowReturnModal] = useState(false)

  // Estados para dados selecionados
  const [selectedEquipment, setSelectedEquipment] = useState(null)
  const [selectedTerm, setSelectedTerm] = useState(null)
  const [selectedProtocol, setSelectedProtocol] = useState(null)
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  // Estados para formulários
  const [newItem, setNewItem] = useState({
    name: "",
    type: "",
    platform: "",
    model: "",
    serialNumber: "",
    patrimony: "",
    notaFiscal: "",
    chamado: "",
    specifications: "",
    location: "",
    purchaseDate: "",
    warrantyExpiry: "",
  })

  const [newProtocol, setNewProtocol] = useState({
    user: "",
    equipmentIds: [],
    expectedReturn: "",
    chamado: "",
    observations: "",
  })

  const [newTerm, setNewTerm] = useState({
    responsible: "",
    cpf: "",
    equipment: "",
    templateId: "",
    observations: "",
    agreed: false,
  })

  const [signatureData, setSignatureData] = useState({
    signature: null,
    timestamp: null,
    location: "",
  })

  // Estados para configurações
  const [intelligenceConfig, setIntelligenceConfig] = useState({
    termExpiryAlert: 30,
    loginThreshold: 10,
    autoNotifications: true,
    emailAlerts: true,
  })

  const [systemConfig, setSystemConfig] = useState({
    ldapEnabled: false,
    ldapServer: "",
    ldapPort: "389",
    ldapBaseDN: "",
    ldapBindUser: "",
    ldapBindPassword: "",
    apiEnabled: true,
    apiKey: "sk-1234567890abcdef",
    backupEnabled: true,
    backupFrequency: "daily",
  })

  // Referência para canvas de assinatura
  const canvasRef = useRef(null)

  const handleStartUserSignature = (term) => {
    setSelectedTermToSign(term)
    setShowUserSignatureModal(true)
  }

  const handleCompleteUserSignature = (signatureData) => {
    console.log("[v0] Assinatura completada:", signatureData)
    setShowUserSignatureModal(false)
    setSelectedTermToSign(null)
    // Aqui seria feita a integração com backend para salvar a assinatura
  }

  const handleViewTerm = (item) => {
    if (!item.responsibilityTerm) {
      alert("Este equipamento não possui termo de responsabilidade.")
      return
    }

    const termData = {
      id: item.responsibilityTerm.id,
      status: item.responsibilityTerm.status,
      signedBy: item.responsibilityTerm.signedBy,
      signedDate: item.responsibilityTerm.signedDate,
      expiryDate: item.responsibilityTerm.expiryDate,
      equipment: item.name,
      patrimony: item.patrimony,
      content: `TERMO DE RESPONSABILIDADE

Equipamento: ${item.name}
Patrimônio: ${item.patrimony}
Série: ${item.serialNumber}
Modelo: ${item.model}

Eu, ${item.responsibilityTerm.signedBy}, declaro ter recebido o equipamento acima especificado em perfeitas condições de uso, comprometendo-me a utilizá-lo adequadamente e devolvê-lo nas mesmas condições.

Especificações: ${item.specifications}
Local de Uso: ${item.location}

Data de Assinatura: ${item.responsibilityTerm.signedDate}
Data de Vencimento: ${item.responsibilityTerm.expiryDate}

Assinatura Digital: ${item.responsibilityTerm.signedBy}`,
      digitalSignature: "/placeholder.svg?height=80&width=200&text=Assinatura",
      templateUsed: item.responsibilityTerm.templateUsed,
      documentUrl: item.responsibilityTerm.documentUrl,
    }

    setSelectedTerm(termData)
    setShowTermModal(true)
  }

  const handleViewEquipment = (item) => {
    const equipmentWithTimeline = {
      ...item,
      timeline: item.timeline || [
        {
          id: "T-001",
          user: item.assignedTo || "Sistema",
          action: "Cadastro",
          date: item.purchaseDate || "2023-01-01",
          endDate: null,
          duration: "Permanente",
          department: "TI",
          reason: "Cadastro inicial no sistema",
          status: "Concluído",
          termSigned: false,
          termId: null,
        },
      ],
    }

    setSelectedEquipment(equipmentWithTimeline)
    setShowEquipmentDetails(true)
  }

  const handleCreateProtocol = () => {
    const protocol = {
      id: `PROT-${String(mockProtocols.length + 1).padStart(3, "0")}`,
      number: `PROT-${String(mockProtocols.length + 1).padStart(3, "0")}`,
      ...newProtocol,
      date: new Date().toISOString().split("T")[0],
      status: "Ativo",
      createdBy: "Admin",
      createdAt: new Date().toISOString(),
    }

    mockProtocols.push(protocol)
    setNewProtocol({
      user: "",
      equipmentIds: [],
      expectedReturn: "",
      chamado: "",
      observations: "",
    })
    setShowProtocolForm(false)
    alert("Protocolo criado com sucesso!")
  }

  const handleCreateTerm = () => {
    if (!newTerm.agreed) {
      alert("É necessário concordar com os termos para prosseguir.")
      return
    }

    setShowTermForm(false)
    setShowSignatureModal(true)
  }

  const handleDigitalSignature = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data
    let hasSignature = false

    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] > 0) {
        hasSignature = true
        break
      }
    }

    if (!hasSignature) {
      alert("Por favor, desenhe sua assinatura antes de continuar.")
      return
    }

    const signatureDataURL = canvas.toDataURL()
    const term = {
      id: `TERM-${String(mockTerms.length + 1).padStart(3, "0")}`,
      ...newTerm,
      signedDate: new Date().toISOString().split("T")[0],
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      status: "Válido",
      digitalSignature: signatureDataURL,
      timestamp: new Date().toISOString(),
      location: signatureData.location || "Não informado",
    }

    mockTerms.push(term)
    setNewTerm({
      responsible: "",
      cpf: "",
      equipment: "",
      templateId: "",
      observations: "",
      agreed: false,
    })
    setSignatureData({
      signature: null,
      timestamp: null,
      location: "",
    })
    setShowSignatureModal(false)
    alert("Termo assinado digitalmente com sucesso!")
  }

  const startDrawing = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext("2d")

    // Configurar estilo da linha
    ctx.strokeStyle = "#000000"
    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.lineJoin = "round"

    ctx.beginPath()
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
    canvas.isDrawing = true
  }

  const draw = (e) => {
    const canvas = canvasRef.current
    if (!canvas || !canvas.isDrawing) return

    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext("2d")

    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
    ctx.stroke()
  }

  const stopDrawing = () => {
    const canvas = canvasRef.current
    if (canvas) {
      canvas.isDrawing = false
    }
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "inventory", label: "Gestão de Inventário", icon: Package },
    { id: "operations", label: "Operações e Protocolos", icon: FileText },
    { id: "intelligence", label: "Inteligência e Monitoramento", icon: Brain },
    { id: "settings", label: "Configurações", icon: Settings },
    { id: "wiki", label: "Wiki/Documentação", icon: BookOpen },
  ]

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard - Sistema de Inventário ITIL</h1>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="w-4 h-4 mr-1" />
            Sistema Operacional
          </Badge>
        </div>
      </div>

      {/* Estatísticas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Ativos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockInventoryStats.totalAssets}</div>
            <p className="text-xs text-muted-foreground">+12% em relação ao mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disponíveis</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{mockInventoryStats.availableAssets}</div>
            <p className="text-xs text-muted-foreground">Prontos para uso</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Uso</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{mockInventoryStats.inUseAssets}</div>
            <p className="text-xs text-muted-foreground">Ativos emprestados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Manutenção</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{mockInventoryStats.maintenanceAssets}</div>
            <p className="text-xs text-muted-foreground">Requer atenção</p>
          </CardContent>
        </Card>
      </div>

      {/* Distribuição de Plataformas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Plataforma</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Computer className="h-4 w-4 text-blue-600" />
                  <span>Windows</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                  <span className="text-sm font-medium">{mockInventoryStats.windowsMachines}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <HardDrive className="h-4 w-4 text-orange-600" />
                  <span>Linux</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: "40%" }}></div>
                  </div>
                  <span className="text-sm font-medium">{mockInventoryStats.linuxMachines}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alertas Importantes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-red-800">Devoluções em Atraso</p>
                  <p className="text-xs text-red-600">{mockInventoryStats.overdueReturns} equipamentos</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Devoluções Pendentes</p>
                  <p className="text-xs text-yellow-600">{mockInventoryStats.pendingReturns} equipamentos</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )


  

  const renderInventory = () => {
    const filteredItems = mockInventoryItems.filter((item) => {
      const matchesStatus = inventoryFilter.status === "all" || item.status === inventoryFilter.status
      const matchesPlatform = inventoryFilter.platform === "all" || item.platform === inventoryFilter.platform
      const matchesType = inventoryFilter.type === "all" || item.type === inventoryFilter.type
      const matchesTerm =
        inventoryFilter.term === "all" ||
        (inventoryFilter.term === "Válido" && item.responsibilityTerm?.status === "Válido") ||
        (inventoryFilter.term === "Vencido" && item.responsibilityTerm?.status === "Vencido") ||
        (inventoryFilter.term === "Sem Termo" && !item.responsibilityTerm)
      const matchesSearch =
        inventoryFilter.search === "" ||
        item.name.toLowerCase().includes(inventoryFilter.search.toLowerCase()) ||
        item.patrimony.toLowerCase().includes(inventoryFilter.search.toLowerCase()) ||
        item.serialNumber.toLowerCase().includes(inventoryFilter.search.toLowerCase())

      return matchesStatus && matchesPlatform && matchesType && matchesTerm && matchesSearch
    })

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Inventário</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar Item</span>
          </button>
        </div>

        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: "items", label: "Itens do Inventário" },
              { id: "stock", label: "Controle de Estoque" },
              { id: "signatures", label: "Assinaturas de Usuário" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setInventoryTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  inventoryTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {inventoryTab === "items" && (
          <>
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select
                      value={inventoryFilter.status}
                      onChange={(e) => setInventoryFilter({ ...inventoryFilter, status: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                      <option value="all">Todos</option>
                      <option value="Disponível">Disponível</option>
                      <option value="Em Uso">Em Uso</option>
                      <option value="Manutenção">Manutenção</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Plataforma</label>
                    <select
                      value={inventoryFilter.platform}
                      onChange={(e) => setInventoryFilter({ ...inventoryFilter, platform: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                      <option value="all">Todas</option>
                      <option value="Windows">Windows</option>
                      <option value="Linux">Linux</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Tipo</label>
                    <select
                      value={inventoryFilter.type}
                      onChange={(e) => setInventoryFilter({ ...inventoryFilter, type: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                      <option value="all">Todos</option>
                      <option value="Laptop">Laptop</option>
                      <option value="Desktop">Desktop</option>
                      <option value="Monitor">Monitor</option>
                      <option value="Impressora">Impressora</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Termo</label>
                    <select
                      value={inventoryFilter.term}
                      onChange={(e) => setInventoryFilter({ ...inventoryFilter, term: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                      <option value="all">Todos</option>
                      <option value="Válido">Válido</option>
                      <option value="Vencido">Vencido</option>
                      <option value="Sem Termo">Sem Termo</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Buscar</label>
                    <input
                      type="text"
                      placeholder="Nome, modelo, série..."
                      value={inventoryFilter.search}
                      onChange={(e) => setInventoryFilter({ ...inventoryFilter, search: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-0">
                {/* Desktop Table */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Equipamento
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Patrimônio
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Responsável
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Termo
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Devolução
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredItems.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <button
                                onClick={() => handleViewEquipment(item)}
                                className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                              >
                                {item.name}
                              </button>
                              <div className="text-sm text-gray-500">
                                {item.type} - {item.platform}
                              </div>
                              <div className="text-xs text-gray-400">Série: {item.serialNumber}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge
                              variant={
                                item.status === "Disponível"
                                  ? "default"
                                  : item.status === "Em Uso"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {item.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm">
                              <div>{item.patrimony}</div>
                              <div className="text-gray-500">NF: {item.notaFiscal}</div>
                              <div className="text-gray-500">CH: {item.chamado}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm">{item.assignedTo || item.location}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.responsibilityTerm ? (
                              <div onClick={() => handleViewTerm(item)} className="cursor-pointer">
                                <Badge
                                  variant={item.responsibilityTerm.status === "Válido" ? "default" : "destructive"}
                                >
                                  {item.responsibilityTerm.status}
                                </Badge>
                                <div className="text-xs text-gray-500 mt-1">
                                  Por: {item.responsibilityTerm.signedBy}
                                </div>
                                <div className="text-xs text-gray-500">Venc: {item.responsibilityTerm.expiryDate}</div>
                              </div>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.returnControl ? (
                              <div>
                                <Badge variant="destructive">{item.returnControl.daysOverdue} dias atraso</Badge>
                                <div className="text-xs text-gray-500 mt-1">
                                  Prev: {item.returnControl.expectedReturn}
                                </div>
                              </div>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleViewEquipment(item)}
                                className="text-blue-600 hover:text-blue-900 px-2 py-1 rounded"
                              >
                                Ver
                              </button>
                              <button className="text-gray-600 hover:text-gray-900 px-2 py-1 rounded">Editar</button>
                              {item.returnControl && (
                                <button
                                  onClick={() => setShowReturnModal(true)}
                                  className="text-green-600 hover:text-green-900 px-2 py-1 rounded"
                                >
                                  Devolver
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden space-y-4 p-4">
                  {filteredItems.map((item) => (
                    <Card key={item.id} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <button
                              onClick={() => handleViewEquipment(item)}
                              className="text-blue-600 hover:text-blue-800 font-medium text-left"
                            >
                              {item.name}
                            </button>
                            <div className="text-sm text-gray-500 mt-1">
                              {item.type} - {item.platform}
                            </div>
                            <div className="text-xs text-gray-400">Série: {item.serialNumber}</div>
                          </div>
                          <Badge
                            variant={
                              item.status === "Disponível"
                                ? "default"
                                : item.status === "Em Uso"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {item.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Patrimônio:</span>
                            <div className="text-gray-600">{item.patrimony}</div>
                            <div className="text-xs text-gray-500">NF: {item.notaFiscal}</div>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Responsável:</span>
                            <div className="text-gray-600">{item.assignedTo || item.location}</div>
                          </div>
                        </div>

                        {item.responsibilityTerm && (
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <div className="flex items-center justify-between">
                              <div onClick={() => handleViewTerm(item)} className="cursor-pointer">
                                <Badge
                                  variant={item.responsibilityTerm.status === "Válido" ? "default" : "destructive"}
                                >
                                  {item.responsibilityTerm.status}
                                </Badge>
                                <div className="text-xs text-gray-500 mt-1">
                                  Por: {item.responsibilityTerm.signedBy}
                                </div>
                              </div>
                              {item.returnControl && (
                                <Badge variant="destructive" className="text-xs">
                                  {item.returnControl.daysOverdue} dias atraso
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-gray-100">
                          <button
                            onClick={() => handleViewEquipment(item)}
                            className="flex-1 sm:flex-none bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                          >
                            Ver
                          </button>
                          <button className="flex-1 sm:flex-none bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                            Editar
                          </button>
                          {item.returnControl && (
                            <button
                              onClick={() => setShowReturnModal(true)}
                              className="flex-1 sm:flex-none bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                            >
                              Devolver
                            </button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {inventoryTab === "stock" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Valor Total do Estoque</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">R$ 2.847.320</div>
                  <p className="text-xs text-gray-500">+5.2% este mês</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Itens em Estoque Baixo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">12</div>
                  <p className="text-xs text-gray-500">Requer reposição</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Movimentações Hoje</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">8</div>
                  <p className="text-xs text-gray-500">5 saídas, 3 entradas</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Fornecedores Ativos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15</div>
                  <p className="text-xs text-gray-500">Contratos vigentes</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base lg:text-lg">Movimentações Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 lg:space-y-4">
                  {[
                    {
                      type: "Entrada",
                      item: "Laptop Dell Latitude 5520",
                      qty: 5,
                      date: "2024-01-15",
                      supplier: "Dell Inc.",
                    },
                    {
                      type: "Saída",
                      item: "Desktop HP EliteDesk 800",
                      qty: 2,
                      date: "2024-01-14",
                      reason: "Empréstimo",
                    },
                    { type: "Entrada", item: 'Monitor Samsung 24"', qty: 10, date: "2024-01-13", supplier: "Samsung" },
                  ].map((movement, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg space-y-2 sm:space-y-0"
                    >
                      <div className="flex items-center space-x-3">
                        <Badge variant={movement.type === "Entrada" ? "default" : "secondary"} className="text-xs">
                          {movement.type}
                        </Badge>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm lg:text-base truncate">{movement.item}</p>
                          <p className="text-xs lg:text-sm text-gray-500">
                            {movement.supplier || movement.reason} • {movement.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right sm:text-left">
                        <p className="font-semibold text-sm lg:text-base">Qtd: {movement.qty}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {inventoryTab === "signatures" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Assinaturas de Usuário</h2>
            </div>

            {/* Sub-abas para termos pendentes e assinados */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: "pending", label: "Termos Pendentes", count: mockPendingTerms.length },
                  { id: "signed", label: "Termos Assinados", count: mockSignedTerms.length },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setUserSignatureTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      userSignatureTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        userSignatureTab === tab.id ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Termos Pendentes */}
            {userSignatureTab === "pending" && (
              <div className="space-y-4">
                {mockPendingTerms.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Nenhum termo pendente de assinatura</p>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {mockPendingTerms.map((term) => (
                      <div
                        key={term.id}
                        className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-5 w-5 text-blue-600" />
                            <span className="text-sm font-medium text-gray-900">{term.id}</span>
                          </div>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              term.priority === "Urgente"
                                ? "bg-red-100 text-red-600"
                                : term.priority === "Alta"
                                  ? "bg-orange-100 text-orange-600"
                                  : "bg-yellow-100 text-yellow-600"
                            }`}
                          >
                            {term.priority}
                          </span>
                        </div>

                        <h3 className="font-medium text-gray-900 mb-2">{term.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{term.equipment}</p>
                        <p className="text-xs text-gray-500 mb-3">{term.description}</p>

                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-500">Criado:</span>
                            <span>{term.createdDate}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-500">Prazo:</span>
                            <span className="text-red-600">{term.dueDate}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleStartUserSignature(term)}
                          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                        >
                          <PenTool className="h-4 w-4" />
                          <span>Assinar Termo</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Termos Assinados */}
            {userSignatureTab === "signed" && (
              <div className="space-y-4">
                {mockSignedTerms.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <CheckCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Nenhum termo assinado ainda</p>
                  </div>
                ) : (
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Termo
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Equipamento
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Assinado por
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Data
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {mockSignedTerms.map((term) => (
                          <tr key={term.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <FileText className="h-5 w-5 text-green-600 mr-2" />
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{term.id}</div>
                                  <div className="text-sm text-gray-500">{term.title}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{term.equipment}</div>
                              <div className="text-sm text-gray-500">{term.patrimony}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{term.signedBy}</div>
                              <div className="text-sm text-gray-500">{term.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{term.signedDate}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-600">
                                {term.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }



  const renderOperations = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Operações e Protocolos</h1>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: "protocols", label: "Protocolos de Empréstimo" },
            { id: "terms", label: "Termos de Responsabilidade" },
            { id: "timeline", label: "Timeline de Transações" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setOperationsTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                operationsTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {operationsTab === "protocols" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Protocolos de Empréstimo</h2>
            <div className="flex space-x-2">
              <div className="flex border rounded-lg">
                <button
                  onClick={() => setProtocolView("cards")}
                  className={`px-3 py-1 text-sm ${protocolView === "cards" ? "bg-blue-100 text-blue-700" : "text-gray-600"}`}
                >
                  Cards
                </button>
                <button
                  onClick={() => setProtocolView("table")}
                  className={`px-3 py-1 text-sm ${protocolView === "table" ? "bg-blue-100 text-blue-700" : "text-gray-600"}`}
                >
                  Tabela
                </button>
              </div>
              <button
                onClick={() => setShowProtocolForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Novo Protocolo</span>
              </button>
            </div>
          </div>

          {/* Filtros para Protocolos */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    value={protocolFilter.status}
                    onChange={(e) => setProtocolFilter({ ...protocolFilter, status: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="all">Todos</option>
                    <option value="Ativo">Ativo</option>
                    <option value="Vencido">Vencido</option>
                    <option value="Concluído">Concluído</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Usuário</label>
                  <select
                    value={protocolFilter.user}
                    onChange={(e) => setProtocolFilter({ ...protocolFilter, user: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="all">Todos</option>
                    <option value="João Silva">João Silva</option>
                    <option value="Maria Santos">Maria Santos</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Buscar</label>
                  <input
                    type="text"
                    placeholder="Protocolo, usuário..."
                    value={protocolFilter.search}
                    onChange={(e) => setProtocolFilter({ ...protocolFilter, search: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {protocolView === "cards" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProtocols.map((protocol) => (
                <Card key={protocol.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{protocol.number}</CardTitle>
                      <Badge variant={protocol.status === "Ativo" ? "default" : "destructive"}>{protocol.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p>
                        <strong>Usuário:</strong> {protocol.user}
                      </p>
                      <p>
                        <strong>Equipamento:</strong> {protocol.equipment}
                      </p>
                      <p>
                        <strong>Data:</strong> {protocol.date}
                      </p>
                      <p>
                        <strong>Chamado:</strong> {protocol.chamado}
                      </p>
                      <p>
                        <strong>Observações:</strong> {protocol.observations}
                      </p>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Visualizar</button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm">Editar</button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Protocolo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuário</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Equipamento</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Chamado</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockProtocols.map((protocol) => (
                        <tr key={protocol.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap font-medium">{protocol.number}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{protocol.user}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{protocol.equipment}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{protocol.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{protocol.chamado}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant={protocol.status === "Ativo" ? "default" : "destructive"}>
                              {protocol.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">Ver</button>
                              <button className="text-gray-600 hover:text-gray-900">Editar</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}



      {operationsTab === "terms" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Gestão de Termos de Responsabilidade</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowTemplateForm(true)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>Templates</span>
              </button>
              <button
                onClick={() => setShowTermForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Novo Termo</span>
              </button>
            </div>
          </div>

          {/* Filtros para Termos */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Status do Termo</label>
                  <select
                    value={termFilter.status}
                    onChange={(e) => setTermFilter({ ...termFilter, status: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="all">Todos</option>
                    <option value="Válido">Válido</option>
                    <option value="Vencido">Vencido</option>
                    <option value="Vence em 30 dias">Vence em 30 dias</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Responsável</label>
                  <select
                    value={termFilter.responsible}
                    onChange={(e) => setTermFilter({ ...termFilter, responsible: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="all">Todos</option>
                    <option value="João Silva">João Silva</option>
                    <option value="Maria Santos">Maria Santos</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Equipamento</label>
                  <input
                    type="text"
                    placeholder="Buscar equipamento..."
                    value={termFilter.equipment}
                    onChange={(e) => setTermFilter({ ...termFilter, equipment: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Período</label>
                  <select
                    value={termFilter.period}
                    onChange={(e) => setTermFilter({ ...termFilter, period: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="all">Todos</option>
                    <option value="last30">Últimos 30 dias</option>
                    <option value="last90">Últimos 90 dias</option>
                    <option value="thisYear">Este ano</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estatísticas dos Termos */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Termos Válidos</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">2</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Termos Vencidos</CardTitle>
                <AlertCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">1</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vencem em 30 dias</CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">1</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Termos</CardTitle>
                <FileText className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
              </CardContent>
            </Card>
          </div>

          {/* Tabela de Termos */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Termo ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Responsável</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Equipamento</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Data Assinatura
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vencimento</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockTerms.map((term) => (
                      <tr key={term.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium">{term.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="font-medium">{term.responsible}</div>
                            <div className="text-sm text-gray-500">{term.patrimony}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => {
                              const equipment = mockInventoryItems.find((item) => item.name === term.equipment)
                              if (equipment) handleViewEquipment(equipment)
                            }}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {term.equipment}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{term.signedDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div>{term.expiryDate}</div>
                            {term.status === "Válido" && (
                              <div className="text-xs text-green-600">45 dias restantes</div>
                            )}
                            {term.status === "Vencido" && <div className="text-xs text-red-600">15 dias em atraso</div>}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant={term.status === "Válido" ? "default" : "destructive"}>{term.status}</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                const termData = {
                                  ...term,
                                  content: `TERMO DE RESPONSABILIDADE\n\nEquipamento: ${term.equipment}\nResponsável: ${term.responsible}\nData de Assinatura: ${term.signedDate}\nData de Vencimento: ${term.expiryDate}`,
                                  digitalSignature: "/placeholder.svg?height=80&width=200&text=Assinatura",
                                }
                                setSelectedTerm(termData)
                                setShowTermModal(true)
                              }}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Visualizar
                            </button>
                            <button className="text-green-600 hover:text-green-900">Renovar</button>
                            <button className="text-red-600 hover:text-red-900">Cancelar</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {operationsTab === "timeline" && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Timeline de Transações</h2>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                {mockAuditLogs.map((log, index) => (
                  <div key={log.id} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          log.severity === "Info"
                            ? "bg-blue-500"
                            : log.severity === "Warning"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      ></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">{log.action}</p>
                        <p className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleString()}</p>
                      </div>
                      <p className="text-sm text-gray-600">{log.details}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-gray-500">Usuário: {log.user}</span>
                        <span className="text-xs text-gray-500">Módulo: {log.module}</span>
                        <Badge
                          variant={
                            log.severity === "Info"
                              ? "default"
                              : log.severity === "Warning"
                                ? "secondary"
                                : "destructive"
                          }
                          className="text-xs"
                        >
                          {log.severity}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )




  const renderIntelligence = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Inteligência e Monitoramento</h1>
      </div>

      {/* Alertas Ativos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas Críticos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">3</div>
            <p className="text-xs text-muted-foreground">Requer ação imediata</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monitoramento Ativo</CardTitle>
            <Activity className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">15</div>
            <p className="text-xs text-muted-foreground">Equipamentos monitorados</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Logins Hoje</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">47</div>
            <p className="text-xs text-muted-foreground">+12% vs ontem</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Alertas */}
      <Card>
        <CardHeader>
          <CardTitle>Alertas Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockIntelligenceAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border-l-4 ${
                  alert.severity === "High"
                    ? "border-red-500 bg-red-50"
                    : alert.severity === "Medium"
                      ? "border-yellow-500 bg-yellow-50"
                      : "border-blue-500 bg-blue-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge
                      variant={
                        alert.severity === "High"
                          ? "destructive"
                          : alert.severity === "Medium"
                            ? "secondary"
                            : "default"
                      }
                    >
                      {alert.type}
                    </Badge>
                    <div>
                      <p className="font-medium">{alert.equipment}</p>
                      <p className="text-sm text-gray-600">{alert.user}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{alert.date}</p>
                    <Badge variant="outline">{alert.status}</Badge>
                  </div>
                </div>
                <p className="mt-2 text-sm">{alert.message}</p>
                <p className="mt-1 text-xs text-gray-500">Ação recomendada: {alert.action}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Configurações de Monitoramento */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações de Monitoramento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Alerta de Vencimento de Termo</p>
                <p className="text-sm text-gray-500">Notificar X dias antes do vencimento</p>
              </div>
              <input
                type="number"
                value={intelligenceConfig.termExpiryAlert}
                onChange={(e) =>
                  setIntelligenceConfig({
                    ...intelligenceConfig,
                    termExpiryAlert: Number.parseInt(e.target.value),
                  })
                }
                className="w-20 border border-gray-300 rounded px-2 py-1"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Limite de Logins Recorrentes</p>
                <p className="text-sm text-gray-500">Alertar após X logins em 7 dias</p>
              </div>
              <input
                type="number"
                value={intelligenceConfig.loginThreshold}
                onChange={(e) =>
                  setIntelligenceConfig({
                    ...intelligenceConfig,
                    loginThreshold: Number.parseInt(e.target.value),
                  })
                }
                className="w-20 border border-gray-300 rounded px-2 py-1"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Notificações Automáticas</p>
                <p className="text-sm text-gray-500">Enviar alertas automaticamente</p>
              </div>
              <input
                type="checkbox"
                checked={intelligenceConfig.autoNotifications}
                onChange={(e) =>
                  setIntelligenceConfig({
                    ...intelligenceConfig,
                    autoNotifications: e.target.checked,
                  })
                }
                className="rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Alertas por Email</p>
                <p className="text-sm text-gray-500">Enviar notificações por email</p>
              </div>
              <input
                type="checkbox"
                checked={intelligenceConfig.emailAlerts}
                onChange={(e) =>
                  setIntelligenceConfig({
                    ...intelligenceConfig,
                    emailAlerts: e.target.checked,
                  })
                }
                className="rounded"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )


  
  const renderSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configurações LDAP */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Integração LDAP</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Habilitar LDAP</p>
                <p className="text-sm text-gray-500">Autenticação via Active Directory</p>
              </div>
              <input
                type="checkbox"
                checked={systemConfig.ldapEnabled}
                onChange={(e) =>
                  setSystemConfig({
                    ...systemConfig,
                    ldapEnabled: e.target.checked,
                  })
                }
                className="rounded"
              />
            </div>
            {systemConfig.ldapEnabled && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Servidor LDAP</label>
                  <input
                    type="text"
                    value={systemConfig.ldapServer}
                    onChange={(e) =>
                      setSystemConfig({
                        ...systemConfig,
                        ldapServer: e.target.value,
                      })
                    }
                    placeholder="ldap.empresa.com"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Porta</label>
                  <input
                    type="text"
                    value={systemConfig.ldapPort}
                    onChange={(e) =>
                      setSystemConfig({
                        ...systemConfig,
                        ldapPort: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Base DN</label>
                  <input
                    type="text"
                    value={systemConfig.ldapBaseDN}
                    onChange={(e) =>
                      setSystemConfig({
                        ...systemConfig,
                        ldapBaseDN: e.target.value,
                      })
                    }
                    placeholder="DC=empresa,DC=com"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Configurações de API */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>API e Integrações</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Habilitar API</p>
                <p className="text-sm text-gray-500">Permitir integrações externas</p>
              </div>
              <input
                type="checkbox"
                checked={systemConfig.apiEnabled}
                onChange={(e) =>
                  setSystemConfig({
                    ...systemConfig,
                    apiEnabled: e.target.checked,
                  })
                }
                className="rounded"
              />
            </div>
            {systemConfig.apiEnabled && (
              <div>
                <label className="block text-sm font-medium mb-1">Chave da API</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={systemConfig.apiKey}
                    readOnly
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
                  />
                  <button className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Configurações de Segurança */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Segurança</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Autenticação de Dois Fatores</p>
                <p className="text-sm text-gray-500">Requer 2FA para todos os usuários</p>
              </div>
              <input type="checkbox" className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Log de Auditoria</p>
                <p className="text-sm text-gray-500">Registrar todas as ações do sistema</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Sessão Automática</p>
                <p className="text-sm text-gray-500">Logout após inatividade</p>
              </div>
              <select className="border border-gray-300 rounded-md px-3 py-2">
                <option>30 minutos</option>
                <option>1 hora</option>
                <option>2 horas</option>
                <option>4 horas</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Configurações de Backup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Backup e Recuperação</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Backup Automático</p>
                <p className="text-sm text-gray-500">Backup regular dos dados</p>
              </div>
              <input
                type="checkbox"
                checked={systemConfig.backupEnabled}
                onChange={(e) =>
                  setSystemConfig({
                    ...systemConfig,
                    backupEnabled: e.target.checked,
                  })
                }
                className="rounded"
              />
            </div>
            {systemConfig.backupEnabled && (
              <div>
                <label className="block text-sm font-medium mb-1">Frequência</label>
                <select
                  value={systemConfig.backupFrequency}
                  onChange={(e) =>
                    setSystemConfig({
                      ...systemConfig,
                      backupFrequency: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="daily">Diário</option>
                  <option value="weekly">Semanal</option>
                  <option value="monthly">Mensal</option>
                </select>
              </div>
            )}
            <div className="pt-4">
              <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
                Fazer Backup Agora
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )




  const renderWiki = () => (
    <div className="flex h-full">
      {/* Sidebar da Wiki */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <h2 className="font-semibold text-lg mb-4">Documentação</h2>
        <nav className="space-y-2">
          {[
            { id: "overview", label: "Visão Geral", icon: BookOpen },
            { id: "inventory", label: "Gestão de Inventário", icon: Package },
            { id: "protocols", label: "Protocolos", icon: FileText },
            { id: "terms", label: "Termos de Responsabilidade", icon: FileCheck },
            { id: "intelligence", label: "Inteligência", icon: Brain },
            { id: "settings", label: "Configurações", icon: Settings },
            { id: "api", label: "API", icon: Database },
            { id: "troubleshooting", label: "Solução de Problemas", icon: AlertTriangle },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setWikiSection(item.id)}
              className={`w-full flex items-center space-x-2 px-3 py-2 text-left rounded-lg transition-colors ${
                wikiSection === item.id ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Conteúdo da Wiki */}
      <div className="flex-1 p-6 overflow-y-auto">
        {wikiSection === "overview" && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Sistema de Inventário ITIL</h1>
            <div className="prose max-w-none">
              <h2>Visão Geral</h2>
              <p>
                O Sistema de Inventário ITIL é uma solução completa para gestão de ativos de TI seguindo as melhores
                práticas do framework ITIL (Information Technology Infrastructure Library).
              </p>

              <h3>Principais Funcionalidades</h3>
              <ul>
                <li>
                  <strong>Gestão de Inventário:</strong> Controle completo de ativos de TI com informações detalhadas
                </li>
                <li>
                  <strong>Controle de Estoque:</strong> Monitoramento de níveis de estoque e movimentações
                </li>
                <li>
                  <strong>Protocolos de Empréstimo:</strong> Gestão de empréstimos de equipamentos
                </li>
                <li>
                  <strong>Termos de Responsabilidade:</strong> Controle de termos com assinatura digital
                </li>
                <li>
                  <strong>Inteligência e Monitoramento:</strong> Alertas automáticos e análise de uso
                </li>
                <li>
                  <strong>Timeline de Transações:</strong> Auditoria completa de todas as operações
                </li>
              </ul>

              <h3>Benefícios</h3>
              <ul>
                <li>Conformidade com padrões ITIL</li>
                <li>Rastreabilidade completa de ativos</li>
                <li>Redução de perdas e extravios</li>
                <li>Automatização de processos</li>
                <li>Relatórios e dashboards em tempo real</li>
              </ul>
            </div>
          </div>
        )}

        {wikiSection === "inventory" && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Gestão de Inventário</h1>
            <div className="prose max-w-none">
              <h2>Como Usar</h2>
              <p>O módulo de Gestão de Inventário permite controlar todos os ativos de TI da organização.</p>

              <h3>Adicionando Novos Itens</h3>
              <ol>
                <li>Clique no botão "Adicionar Item" no canto superior direito</li>
                <li>Preencha todas as informações obrigatórias</li>
                <li>Inclua patrimônio, nota fiscal e chamado de compra</li>
                <li>Salve o item no sistema</li>
              </ol>

              <h3>Visualizando Timeline</h3>
              <p>Clique no nome do equipamento para ver o histórico completo de uso, incluindo:</p>
              <ul>
                <li>Usuários que utilizaram o equipamento</li>
                <li>Períodos de uso</li>
                <li>Departamentos envolvidos</li>
                <li>Termos de responsabilidade assinados</li>
              </ul>

              <h3>Filtros Disponíveis</h3>
              <ul>
                <li>
                  <strong>Status:</strong> Disponível, Em Uso, Manutenção
                </li>
                <li>
                  <strong>Plataforma:</strong> Windows, Linux
                </li>
                <li>
                  <strong>Tipo:</strong> Laptop, Desktop, Monitor, etc.
                </li>
                <li>
                  <strong>Termo:</strong> Válido, Vencido, Sem Termo
                </li>
              </ul>
            </div>
          </div>
        )}

        {wikiSection === "protocols" && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Protocolos de Empréstimo</h1>
            <div className="prose max-w-none">
              <h2>Gerenciamento de Protocolos</h2>
              <p>Os protocolos de empréstimo formalizam a cessão temporária de equipamentos.</p>

              <h3>Criando um Novo Protocolo</h3>
              <ol>
                <li>Acesse "Operações e Protocolos" → "Protocolos de Empréstimo"</li>
                <li>Clique em "Novo Protocolo"</li>
                <li>Selecione o usuário e equipamentos</li>
                <li>Defina data de devolução esperada</li>
                <li>Adicione chamado e observações</li>
                <li>Salve o protocolo</li>
              </ol>

              <h3>Visualizações</h3>
              <p>Os protocolos podem ser visualizados em dois formatos:</p>
              <ul>
                <li>
                  <strong>Cards:</strong> Visão detalhada com todas as informações
                </li>
                <li>
                  <strong>Tabela:</strong> Visão compacta para muitos protocolos
                </li>
              </ul>

              <h3>Status dos Protocolos</h3>
              <ul>
                <li>
                  <strong>Ativo:</strong> Protocolo em vigência
                </li>
                <li>
                  <strong>Vencido:</strong> Passou da data de devolução
                </li>
                <li>
                  <strong>Concluído:</strong> Equipamento devolvido
                </li>
              </ul>
            </div>
          </div>
        )}

        {wikiSection === "terms" && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Termos de Responsabilidade</h1>
            <div className="prose max-w-none">
              <h2>Gestão de Termos</h2>
              <p>Os termos de responsabilidade garantem o uso adequado dos equipamentos.</p>

              <h3>Templates Disponíveis</h3>
              <ul>
                <li>
                  <strong>Termo de Cessão de Uso:</strong> Para empréstimo de equipamentos
                </li>
                <li>
                  <strong>Termo de Devolução:</strong> Para formalizar devoluções
                </li>
              </ul>

              <h3>Assinatura Digital</h3>
              <p>O sistema permite assinatura digital dos termos:</p>
              <ol>
                <li>Preencha os dados do responsável</li>
                <li>Selecione o template apropriado</li>
                <li>Desenhe a assinatura no canvas</li>
                <li>Confirme a assinatura digital</li>
              </ol>

              <h3>Controle de Vencimento</h3>
              <p>O sistema monitora automaticamente:</p>
              <ul>
                <li>Termos próximos ao vencimento</li>
                <li>Termos vencidos</li>
                <li>Alertas automáticos</li>
                <li>Renovação de termos</li>
              </ul>
            </div>
          </div>
        )}

        {wikiSection === "intelligence" && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Inteligência e Monitoramento</h1>
            <div className="prose max-w-none">
              <h2>Sistema Inteligente</h2>
              <p>O módulo de inteligência monitora automaticamente o uso dos equipamentos.</p>

              <h3>Tipos de Alertas</h3>
              <ul>
                <li>
                  <strong>Termo Vencido:</strong> Quando um termo de responsabilidade vence
                </li>
                <li>
                  <strong>Login Recorrente:</strong> Uso excessivo de equipamentos
                </li>
                <li>
                  <strong>Equipamento Inativo:</strong> Equipamentos sem uso prolongado
                </li>
                <li>
                  <strong>Devolução em Atraso:</strong> Equipamentos não devolvidos
                </li>
              </ul>

              <h3>Configurações</h3>
              <p>Personalize os alertas conforme suas necessidades:</p>
              <ul>
                <li>Dias de antecedência para vencimento de termos</li>
                <li>Limite de logins para alertas</li>
                <li>Notificações automáticas</li>
                <li>Alertas por email</li>
              </ul>
            </div>
          </div>
        )}

        {wikiSection === "api" && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">API do Sistema</h1>
            <div className="prose max-w-none">
              <h2>Integração via API</h2>
              <p>O sistema oferece uma API REST completa para integrações externas.</p>

              <h3>Endpoints Principais</h3>
              <ul>
                <li>
                  <code>GET /api/inventory</code> - Lista todos os itens do inventário
                </li>
                <li>
                  <code>POST /api/inventory</code> - Cria novo item
                </li>
                <li>
                  <code>GET /api/protocols</code> - Lista protocolos
                </li>
                <li>
                  <code>POST /api/protocols</code> - Cria novo protocolo
                </li>
                <li>
                  <code>GET /api/terms</code> - Lista termos de responsabilidade
                </li>
                <li>
                  <code>POST /api/terms</code> - Cria novo termo
                </li>
              </ul>

              <h3>Autenticação</h3>
              <p>Use a chave da API no header das requisições:</p>
              <pre>
                <code>Authorization: Bearer {`{API_KEY}`}</code>
              </pre>

              <h3>Exemplo de Uso</h3>
              <pre>
                <code>{`curl -X GET "https://api.inventario.com/api/inventory" \\
  -H "Authorization: Bearer sk-1234567890abcdef" \\
  -H "Content-Type: application/json"`}</code>
              </pre>
            </div>
          </div>
        )}

        {wikiSection === "troubleshooting" && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Solução de Problemas</h1>
            <div className="prose max-w-none">
              <h2>Problemas Comuns</h2>
              <p>Esta seção aborda problemas comuns e suas soluções.</p>

              <h3>Não Consigo Acessar o Sistema</h3>
              <ol>
                <li>Verifique sua conexão com a internet</li>
                <li>Confirme se o servidor está online</li>
                <li>Limpe o cache do navegador</li>
                <li>Tente outro navegador</li>
              </ol>

              <h3>Esqueci Minha Senha</h3>
              <ol>
                <li>Clique em "Esqueci Minha Senha" na tela de login</li>
                <li>Siga as instruções enviadas para seu email</li>
                <li>Crie uma nova senha segura</li>
              </ol>

              <h3>Problemas com a Assinatura Digital</h3>
              <ol>
                <li>Verifique se o canvas está habilitado</li>
                <li>Use um mouse ou caneta stylus</li>
                <li>Limpe a área de assinatura</li>
                <li>Confirme a assinatura</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  return (
    // Layout Principal
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`${
          sidebarCollapsed ? "w-16" : "w-64"
        } bg-white shadow-sm border-r border-gray-200 transition-all duration-300 
        ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 fixed lg:relative z-50 h-full`}
      >
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            {!sidebarCollapsed && (
              <div>
                <h1 className="text-lg font-bold text-gray-900">Inventário ITIL</h1>
                <p className="text-xs text-gray-500">Sistema de Gestão</p>
              </div>
            )}
          </div>
        </div>

        <nav className="px-4 pb-4">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedModule(item.id)}
                className={`w-full flex items-center ${sidebarCollapsed ? "justify-center" : "space-x-3"} px-3 py-2 text-left rounded-lg transition-colors ${
                  selectedModule === item.id ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                }`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <item.icon className="h-5 w-5" />
                {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden w-full lg:w-auto">
        <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
              title="Abrir menu"
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors hidden lg:block"
              title={sidebarCollapsed ? "Expandir menu" : "Recolher menu"}
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
            <h2 className="text-lg font-semibold text-gray-900 lg:hidden">
              {sidebarItems.find((item) => item.id === selectedModule)?.label}
            </h2>
          </div>
        </div>

        <div className="h-full overflow-y-auto p-4 lg:p-6">
          {selectedModule === "dashboard" && renderDashboard()}
          {selectedModule === "inventory" && renderInventory()}
          {selectedModule === "operations" && renderOperations()}
          {selectedModule === "intelligence" && renderIntelligence()}
          {selectedModule === "settings" && renderSettings()}
          {selectedModule === "wiki" && renderWiki()}
        </div>
      </div>

      {showUserSignatureModal && selectedTermToSign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Assinatura Digital - {selectedTermToSign.id}</h2>
                <button onClick={() => setShowUserSignatureModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Informações do Termo */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">{selectedTermToSign.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{selectedTermToSign.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Equipamento:</span> {selectedTermToSign.equipment}
                    </div>
                    <div>
                      <span className="font-medium">Patrimônio:</span> {selectedTermToSign.patrimony}
                    </div>
                  </div>
                </div>

                {/* Texto Completo do Termo */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-blue-900 mb-4">TERMO DE CESSÃO DE USO DE EQUIPAMENTOS</h4>
                  <div className="text-sm text-gray-800 space-y-4 leading-relaxed">
                    <p>
                      Eu,{" "}
                      <strong>
                        {userSignatureData.name ||
                          "____________________________________________________________________"}
                      </strong>
                      , inscrito(a) no CPF sob o nº{" "}
                      <strong>{userSignatureData.cpf || "_______________________"}</strong>, declaro que recebi o
                      material de trabalho cedido pela minha empregadora{" "}
                      <strong>{userSignatureData.companyName || "________________________________"}</strong>, inscrita
                      no CNPJ sob o nº <strong>{userSignatureData.companyCnpj || "___________________________"}</strong>
                      , a título de empréstimo para execução de minhas atividades durante o período de trabalho, os
                      equipamentos especificados neste termo, ficando ciente de que retornarei os equipamentos completos
                      e em perfeito estado de conservação, considerando-se o tempo do uso do mesmo.
                    </p>

                    <div className="bg-white p-4 rounded border">
                      <p className="font-medium mb-2">Descrição dos equipamentos recebidos:</p>
                      <p>
                        Patrimônio: <strong>{userSignatureData.equipmentPatrimony || "_______________"}</strong>
                        <br />
                        Marca/Modelo:{" "}
                        <strong>
                          {userSignatureData.equipmentBrand || "_______________"}{" "}
                          {userSignatureData.equipmentModel || "_______________"}
                        </strong>
                        <br />
                        Número de Série: <strong>{userSignatureData.equipmentSerial || "_______________"}</strong>
                      </p>
                    </div>

                    <p>
                      Pelo presente Termo de Cessão de Uso, o declarante acima qualificado registra que recebeu os
                      equipamentos e acessórios acima especificados.
                    </p>

                    <p>
                      O Fornecedor abaixo assinado, Responsável pela Entrega, declara que entregou os equipamentos e
                      acessórios ao funcionário acima qualificado.
                    </p>

                    <div className="flex justify-between pt-8 border-t">
                      <div className="text-center">
                        <div className="border-t border-gray-400 pt-2 w-64">
                          <p className="text-xs">Assinatura do Funcionário</p>
                          <p className="text-xs font-medium">{userSignatureData.name}</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="border-t border-gray-400 pt-2 w-64">
                          <p className="text-xs">Assinatura do Responsável pela Entrega</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Formulário de Dados do Usuário */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo *</label>
                    <input
                      type="text"
                      value={userSignatureData.name}
                      onChange={(e) => setUserSignatureData({ ...userSignatureData, name: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Digite seu nome completo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      value={userSignatureData.email}
                      onChange={(e) => setUserSignatureData({ ...userSignatureData, email: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="seu.email@empresa.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CPF *</label>
                    <input
                      type="text"
                      value={userSignatureData.cpf}
                      onChange={(e) => setUserSignatureData({ ...userSignatureData, cpf: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="000.000.000-00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
                    <input
                      type="text"
                      value={userSignatureData.department}
                      onChange={(e) => setUserSignatureData({ ...userSignatureData, department: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Seu departamento"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Empresa *</label>
                    <input
                      type="text"
                      value={userSignatureData.companyName}
                      onChange={(e) => setUserSignatureData({ ...userSignatureData, companyName: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Nome da empresa empregadora"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CNPJ da Empresa *</label>
                    <input
                      type="text"
                      value={userSignatureData.companyCnpj}
                      onChange={(e) => setUserSignatureData({ ...userSignatureData, companyCnpj: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="00.000.000/0001-00"
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Informações do Equipamento</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Patrimônio *</label>
                      <input
                        type="text"
                        value={userSignatureData.equipmentPatrimony}
                        onChange={(e) =>
                          setUserSignatureData({ ...userSignatureData, equipmentPatrimony: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="PAT-2023-001"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Marca *</label>
                      <input
                        type="text"
                        value={userSignatureData.equipmentBrand}
                        onChange={(e) => setUserSignatureData({ ...userSignatureData, equipmentBrand: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Dell, HP, Lenovo..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Modelo *</label>
                      <input
                        type="text"
                        value={userSignatureData.equipmentModel}
                        onChange={(e) => setUserSignatureData({ ...userSignatureData, equipmentModel: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Latitude 5520, EliteDesk 800..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Número de Série</label>
                      <input
                        type="text"
                        value={userSignatureData.equipmentSerial}
                        onChange={(e) =>
                          setUserSignatureData({ ...userSignatureData, equipmentSerial: e.target.value })
                        }
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="DL5520001, HP800002..."
                      />
                    </div>
                  </div>
                </div>

                {/* Área de Assinatura */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assinatura Digital *</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <canvas
                      ref={canvasRef}
                      width={600}
                      height={200}
                      className="w-full border border-gray-200 rounded cursor-crosshair bg-white"
                      style={{ touchAction: "none" }}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={(e) => {
                        e.preventDefault()
                        const touch = e.touches[0]
                        const mouseEvent = new MouseEvent("mousedown", {
                          clientX: touch.clientX,
                          clientY: touch.clientY,
                        })
                        startDrawing(mouseEvent)
                      }}
                      onTouchMove={(e) => {
                        e.preventDefault()
                        const touch = e.touches[0]
                        const mouseEvent = new MouseEvent("mousemove", {
                          clientX: touch.clientX,
                          clientY: touch.clientY,
                        })
                        draw(mouseEvent)
                      }}
                      onTouchEnd={(e) => {
                        e.preventDefault()
                        stopDrawing()
                      }}
                    />
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm text-gray-500">Desenhe sua assinatura acima</p>
                      <button
                        type="button"
                        onClick={clearSignature}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        Limpar
                      </button>
                    </div>
                  </div>
                </div>

                {/* Checkbox de Concordância */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={userSignatureData.agreed}
                    onChange={(e) => setUserSignatureData({ ...userSignatureData, agreed: e.target.checked })}
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="text-sm text-gray-700">
                    Declaro que li e concordo com todos os termos e condições descritos neste documento. Estou ciente de
                    minhas responsabilidades e comprometo-me a cumprir todas as obrigações estabelecidas. Confirmo que
                    as informações do equipamento estão corretas. *
                  </label>
                </div>

                {/* Botões de Ação */}
                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <button
                    onClick={() => setShowUserSignatureModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      const canvas = canvasRef.current
                      if (!canvas) {
                        alert("Erro no canvas de assinatura.")
                        return
                      }

                      // Verificar se há assinatura
                      const ctx = canvas.getContext("2d")
                      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
                      const data = imageData.data
                      let hasSignature = false

                      for (let i = 0; i < data.length; i += 4) {
                        if (data[i + 3] > 0) {
                          hasSignature = true
                          break
                        }
                      }

                      if (!hasSignature) {
                        alert("Por favor, desenhe sua assinatura antes de continuar.")
                        return
                      }

                      // Validar campos obrigatórios
                      if (
                        !userSignatureData.name ||
                        !userSignatureData.email ||
                        !userSignatureData.cpf ||
                        !userSignatureData.companyName ||
                        !userSignatureData.companyCnpj ||
                        !userSignatureData.equipmentPatrimony ||
                        !userSignatureData.equipmentBrand ||
                        !userSignatureData.equipmentModel
                      ) {
                        alert("Por favor, preencha todos os campos obrigatórios.")
                        return
                      }

                      if (!userSignatureData.agreed) {
                        alert("É necessário concordar com os termos para prosseguir.")
                        return
                      }

                      const signatureDataURL = canvas.toDataURL()
                      handleCompleteUserSignature({
                        ...userSignatureData,
                        term: selectedTermToSign,
                        signature: signatureDataURL,
                        timestamp: new Date().toISOString(),
                        userAgent: navigator.userAgent,
                      })
                    }}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <PenTool className="h-4 w-4" />
                    <span>Finalizar Assinatura</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showTermModal && selectedTerm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Visualizar Termo de Responsabilidade</h2>
                <button onClick={() => setShowTermModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Informações do Termo */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-700">Status:</span>
                    <Badge variant={selectedTerm.status === "Válido" ? "default" : "destructive"} className="ml-2">
                      {selectedTerm.status}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Equipamento:</span>
                    <span className="ml-2">{selectedTerm.equipment}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Patrimônio:</span>
                    <span className="ml-2">{selectedTerm.patrimony}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Assinado por:</span>
                    <span className="ml-2">{selectedTerm.signedBy}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Data de Assinatura:</span>
                    <span className="ml-2">{selectedTerm.signedDate}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Data de Vencimento:</span>
                    <span className="ml-2">{selectedTerm.expiryDate}</span>
                  </div>
                </div>

                {/* Conteúdo do Termo */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Conteúdo do Termo</h3>
                  <div className="whitespace-pre-line text-sm text-gray-800 leading-relaxed">
                    {selectedTerm.content}
                  </div>
                </div>

                {/* Assinatura Digital */}
                {selectedTerm.digitalSignature && (
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Assinatura Digital</h3>
                    <div className="flex items-center space-x-4">
                      <img
                        src={selectedTerm.digitalSignature || "/placeholder.svg"}
                        alt="Assinatura Digital"
                        className="border border-gray-300 rounded"
                      />
                      <div className="text-sm text-gray-600">
                        <p>Assinado digitalmente por: {selectedTerm.signedBy}</p>
                        <p>Data: {selectedTerm.signedDate}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Ações */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                  >
                    <Printer className="h-4 w-4" />
                    <span>Imprimir</span>
                  </button>
                  <button
                    onClick={() => {
                      const link = document.createElement("a")
                      link.href = selectedTerm.documentUrl || "#"
                      link.download = `termo-${selectedTerm.id}.pdf`
                      link.click()
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Baixar PDF</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
