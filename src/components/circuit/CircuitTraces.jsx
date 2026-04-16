import { useCircuit } from './CircuitContext';

// Connection map — defines which nodes connect and the trace style
export const CONNECTIONS = [
  { id: 'trace-hero-about',     from: 'hero',     to: 'about',    type: 'POWER',   pulses: 3, color: '#00d4ff' },
  { id: 'trace-about-projects', from: 'about',    to: 'projects', type: 'DATA',    pulses: 4, color: '#7b61ff' },
  { id: 'trace-projects-contact', from: 'projects', to: 'contact', type: 'CONTROL', pulses: 2, color: '#ff6b35' },
];

const TRACE_STYLES = {
  POWER:   { stroke: '#00d4ff', strokeWidth: 1.5, dash: 'none' },
  DATA:    { stroke: '#7b61ff', strokeWidth: 1.2, dash: '6 3' },
  CONTROL: { stroke: '#ff6b35', strokeWidth: 1,   dash: '3 4' },
};

function orthogonalPath(fromRect, toRect) {
  if (!fromRect || !toRect) return null;

  const exitX = fromRect.left + fromRect.width / 2;
  const exitY = fromRect.bottom;
  const entryX = toRect.left + toRect.width / 2;
  const entryY = toRect.top;
  const midY = (exitY + entryY) / 2;

  // If nodes are closely aligned horizontally, go straight down
  // Otherwise add a jog
  const dx = entryX - exitX;
  if (Math.abs(dx) < 20) {
    return `M ${exitX} ${exitY} L ${entryX} ${entryY}`;
  }

  return `M ${exitX} ${exitY} L ${exitX} ${midY} L ${entryX} ${midY} L ${entryX} ${entryY}`;
}

export default function CircuitTraces() {
  const { nodePositions, hoveredNode } = useCircuit();

  return (
    <g>
      {CONNECTIONS.map(conn => {
        const fromRect = nodePositions[conn.from];
        const toRect   = nodePositions[conn.to];
        const d = orthogonalPath(fromRect, toRect);
        if (!d) return null;

        const style = TRACE_STYLES[conn.type];
        const isHighlighted = hoveredNode === conn.from || hoveredNode === conn.to;

        return (
          <g key={conn.id}>
            {/* Glow layer */}
            <path
              d={d}
              fill="none"
              stroke={style.stroke}
              strokeWidth={isHighlighted ? style.strokeWidth * 4 : style.strokeWidth * 2}
              strokeDasharray={style.dash}
              opacity={isHighlighted ? 0.4 : 0.15}
              style={{ filter: `blur(4px)` }}
            />
            {/* Main trace */}
            <path
              id={conn.id}
              d={d}
              fill="none"
              stroke={style.stroke}
              strokeWidth={isHighlighted ? style.strokeWidth * 1.8 : style.strokeWidth}
              strokeDasharray={style.dash}
              opacity={isHighlighted ? 1 : 0.6}
            />
          </g>
        );
      })}
    </g>
  );
}
