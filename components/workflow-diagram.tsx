"use client"

import { useState } from "react"
import {
  MessageSquare,
  Database,
  Bell,
  CheckCircle2,
  ShoppingCart,
  Mail,
  BarChart3,
  Clock,
  AlertTriangle,
  FileText,
  Send,
  UserCheck,
  Globe,
  type LucideIcon,
} from "lucide-react"

interface WorkflowNode {
  id: string
  label: string
  icon: LucideIcon
  color: string
  row: number
  col: number
}

interface WorkflowConnection {
  from: string
  to: string
}

interface WorkflowDiagramProps {
  variant: "bot" | "report" | "form"
}

const flows: Record<string, { nodes: WorkflowNode[]; connections: WorkflowConnection[] }> = {
  bot: {
    nodes: [
      { id: "trigger", label: "Telegram Bot", icon: Send, color: "#0088cc", row: 1, col: 0 },
      { id: "parse", label: "Interpretar Mensaje", icon: MessageSquare, color: "#0d9488", row: 0, col: 1 },
      { id: "menu", label: "Consultar Menú", icon: Database, color: "#2563eb", row: 2, col: 1 },
      { id: "order", label: "Crear Pedido", icon: ShoppingCart, color: "#ea580c", row: 0, col: 2 },
      { id: "confirm", label: "Confirmar Cliente", icon: CheckCircle2, color: "#16a34a", row: 2, col: 2 },
      { id: "notify", label: "Notificar Dueño", icon: Bell, color: "#eab308", row: 1, col: 3 },
    ],
    connections: [
      { from: "trigger", to: "parse" }, { from: "trigger", to: "menu" },
      { from: "parse", to: "order" }, { from: "menu", to: "confirm" },
      { from: "order", to: "notify" }, { from: "confirm", to: "notify" },
    ],
  },
  report: {
    nodes: [
      { id: "cron", label: "Cron Lunes 8AM", icon: Clock, color: "#9333ea", row: 1, col: 0 },
      { id: "query", label: "Consultar Ventas", icon: Database, color: "#2563eb", row: 0, col: 1 },
      { id: "stock", label: "Revisar Stock", icon: AlertTriangle, color: "#ea580c", row: 2, col: 1 },
      { id: "chart", label: "Generar Gráficos", icon: BarChart3, color: "#0d9488", row: 0, col: 2 },
      { id: "alert", label: "Alertas Stock Bajo", icon: Bell, color: "#eab308", row: 2, col: 2 },
      { id: "email", label: "Enviar Email", icon: Mail, color: "#16a34a", row: 1, col: 3 },
    ],
    connections: [
      { from: "cron", to: "query" }, { from: "cron", to: "stock" },
      { from: "query", to: "chart" }, { from: "stock", to: "alert" },
      { from: "chart", to: "email" }, { from: "alert", to: "email" },
    ],
  },
  form: {
    nodes: [
      { id: "form", label: "Formulario Web", icon: Globe, color: "#9333ea", row: 1, col: 0 },
      { id: "db", label: "Guardar en BD", icon: Database, color: "#2563eb", row: 0, col: 1 },
      { id: "file", label: "Adjuntar Ficha", icon: FileText, color: "#ea580c", row: 2, col: 1 },
      { id: "notify", label: "Notificar Equipo", icon: Send, color: "#eab308", row: 0, col: 2 },
      { id: "automail", label: "Email Confirmación", icon: Mail, color: "#0d9488", row: 2, col: 2 },
      { id: "assign", label: "Asignar Vendedor", icon: UserCheck, color: "#16a34a", row: 1, col: 3 },
    ],
    connections: [
      { from: "form", to: "db" }, { from: "form", to: "file" },
      { from: "db", to: "notify" }, { from: "file", to: "automail" },
      { from: "notify", to: "assign" }, { from: "automail", to: "assign" },
    ],
  },
}

const COL_POSITIONS = [30, 180, 350, 510]
const ROW_POSITIONS = [10, 95, 180]
const NODE_W = 130
const NODE_H = 40

function getNodePixelPos(node: WorkflowNode) {
  return { x: COL_POSITIONS[node.col], y: ROW_POSITIONS[node.row] }
}

function getRightEdge(node: WorkflowNode) {
  const pos = getNodePixelPos(node)
  return { x: pos.x + NODE_W, y: pos.y + NODE_H / 2 }
}

function getLeftEdge(node: WorkflowNode) {
  const pos = getNodePixelPos(node)
  return { x: pos.x, y: pos.y + NODE_H / 2 }
}

function buildPath(fromNode: WorkflowNode, toNode: WorkflowNode) {
  const from = getRightEdge(fromNode)
  const to = getLeftEdge(toNode)
  if (fromNode.row === toNode.row) {
    return `M${from.x},${from.y} L${to.x},${to.y}`
  }
  const midX = from.x + (to.x - from.x) / 2
  return `M${from.x},${from.y} L${midX},${from.y} L${midX},${to.y} L${to.x},${to.y}`
}

export function WorkflowDiagram({ variant }: WorkflowDiagramProps) {
  const { nodes, connections } = flows[variant]
  const [isVisible] = useState(false)

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-border/40 bg-[hsl(220,20%,5%)]">
      <div className="flex items-center gap-2 border-b border-border/30 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-[hsl(43,74%,66%)]/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary/60" />
        <span className="ml-3 text-xs text-muted-foreground">n8n workflow</span>
      </div>

      <div className="relative w-full overflow-x-auto">
        <svg viewBox="0 0 640 240" preserveAspectRatio="xMidYMid meet" className="block h-auto w-full" style={{ minWidth: 400 }}>
          <defs>
            <marker id={`arrow-${variant}`} markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="hsl(172,66%,50%)" opacity="0.35" />
            </marker>
          </defs>

          {connections.map((conn) => {
            const fromNode = nodes.find((n) => n.id === conn.from)!
            const toNode = nodes.find((n) => n.id === conn.to)!
            const d = buildPath(fromNode, toNode)

            return (
              <path
                key={`${conn.from}-${conn.to}`}
                d={d}
                fill="none"
                stroke="hsl(220,14%,18%)"
                strokeWidth={1}
                strokeDasharray="4 3"
                strokeLinejoin="round"
                strokeLinecap="round"
                markerEnd={`url(#arrow-${variant})`}
              />
            )
          })}

          {nodes.map((node) => {
            const Icon = node.icon
            const pos = getNodePixelPos(node)

            return (
              <foreignObject key={node.id} x={pos.x} y={pos.y} width={NODE_W} height={NODE_H}>
                <div
                  className="flex h-full items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[10px] font-medium leading-tight"
                  style={{
                    borderColor: node.color,
                    background: `linear-gradient(135deg, ${node.color}18, ${node.color}08)`,
                    color: "hsl(210,20%,95%)",
                    boxShadow: `0 0 16px ${node.color}20`,
                  }}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: node.color }} />
                  <span className="truncate">{node.label}</span>
                </div>
              </foreignObject>
            )
          })}
        </svg>
      </div>

      <div className="flex items-center justify-between border-t border-border/30 px-4 py-2">
        <span className="text-[10px] text-muted-foreground">{nodes.length} nodos</span>
        <span className="text-[10px] text-muted-foreground">Listo</span>
      </div>
    </div>
  )
}