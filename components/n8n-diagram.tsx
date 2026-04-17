'use client'

interface Node {
  name: string
  icon: string
  color: string
}

interface N8nDiagramProps {
  nodes: Node[]
  title?: string
}

export function N8nDiagram({ nodes, title }: N8nDiagramProps) {
  const nodeWidth = 110
  const nodeHeight = 65
  const horizontalGap = 140
  const verticalGap = 90

  const nodesPerRow = Math.min(nodes.length, 3)
  const rowCount = Math.ceil(nodes.length / nodesPerRow)

  const totalWidth = nodesPerRow * nodeWidth + (nodesPerRow - 1) * horizontalGap + 140
  const totalHeight = rowCount * nodeHeight + (rowCount - 1) * verticalGap + 100

  const getNodePosition = (index: number) => {
    const row = Math.floor(index / nodesPerRow)
    const col = index % nodesPerRow
    const x = 70 + col * (nodeWidth + horizontalGap)
    const y = 50 + row * (nodeHeight + verticalGap)
    return { x, y, row, col }
  }

  const renderConnections = () => {
    const connections: JSX.Element[] = []
    
    for (let i = 0; i < nodes.length - 1; i++) {
      const current = getNodePosition(i)
      const next = getNodePosition(i + 1)
      
      const startX = current.x + nodeWidth
      const startY = current.y + nodeHeight / 2
      const endX = next.x
      const endY = next.y + nodeHeight / 2

      if (current.row !== next.row) {
        const cornerY = (startY + endY) / 2
        connections.push(
          <g key={`conn-${i}`}>
            <line
              x1={startX}
              y1={startY}
              x2={startX}
              y2={cornerY}
              stroke="#00FFC2"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.35"
            />
            <line
              x1={startX}
              y1={cornerY}
              x2={endX}
              y2={cornerY}
              stroke="#00FFC2"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.35"
            />
            <line
              x1={endX}
              y1={cornerY}
              x2={endX}
              y2={endY}
              stroke="#00FFC2"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.35"
            />
          </g>
        )
      } else {
        connections.push(
          <line
            key={`conn-${i}`}
            x1={startX}
            y1={startY}
            x2={endX}
            y2={endY}
            stroke="#00FFC2"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.35"
          />
        )
      }
    }
    
    return connections
  }

  return (
    <div className="w-full overflow-x-auto custom-scrollbar-diagram">
      <div className="min-w-max rounded-lg border border-[#3a4a43]/10 bg-[#0c1324] p-6">
        <svg
          width={totalWidth}
          height={totalHeight}
          viewBox={`0 0 ${totalWidth} ${totalHeight}`}
          className="w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {nodes.map((node, idx) => (
              <linearGradient
                key={`grad-${idx}`}
                id={`gradient-n8n-${idx}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor={node.color} stopOpacity="0.85" />
                <stop offset="100%" stopColor={node.color} stopOpacity="0.35" />
              </linearGradient>
            ))}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Connections */}
          {renderConnections()}

          {/* Nodes */}
          {nodes.map((node, idx) => {
            const { x, y } = getNodePosition(idx)

            return (
              <g key={`node-${idx}`} className="cursor-pointer">
                {/* Glow effect */}
                <rect
                  x={x - 2}
                  y={y - 2}
                  width={nodeWidth + 4}
                  height={nodeHeight + 4}
                  rx="10"
                  fill={node.color}
                  fillOpacity="0.12"
                  filter="url(#glow)"
                />
                
                {/* Main card */}
                <rect
                  x={x}
                  y={y}
                  width={nodeWidth}
                  height={nodeHeight}
                  rx="8"
                  fill={`url(#gradient-n8n-${idx})`}
                  stroke={node.color}
                  strokeWidth="1.5"
                />
                
                {/* Inner border */}
                <rect
                  x={x + 1}
                  y={y + 1}
                  width={nodeWidth - 2}
                  height={nodeHeight - 2}
                  rx="7"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                  strokeOpacity="0.08"
                />
                
                {/* Icon */}
                <text
                  x={x + nodeWidth / 2}
                  y={y + 24}
                  textAnchor="middle"
                  fontSize="18"
                  fontFamily="system-ui"
                >
                  {node.icon}
                </text>
                
                {/* Name */}
                <text
                  x={x + nodeWidth / 2}
                  y={y + 44}
                  textAnchor="middle"
                  fontSize="8.5"
                  fill="#e2e8f0"
                  fontFamily="system-ui"
                  fontWeight="500"
                >
                  {node.name}
                </text>
                
                {/* Number badge */}
                <circle cx={x + nodeWidth - 8} cy={y + 8} r="8" fill={node.color} stroke="#0c1324" strokeWidth="1.5"/>
                <text
                  x={x + nodeWidth - 8}
                  y={y + 8}
                  textAnchor="middle"
                  fontSize="8"
                  fill="white"
                  fontFamily="system-ui"
                  fontWeight="bold"
                  dominantBaseline="middle"
                >
                  {idx + 1}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
