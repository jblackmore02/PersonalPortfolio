import PulseDot from './PulseDot';
import { CONNECTIONS } from './CircuitTraces';
import { useCircuit } from './CircuitContext';

const SPEEDS = { POWER: 1.8, DATA: 1.2, CONTROL: 0.8 };

export default function PulseLayer() {
  const { nodePositions } = useCircuit();

  return (
    <g>
      {CONNECTIONS.map(conn => {
        // Don't render pulses if nodes aren't positioned yet
        if (!nodePositions[conn.from] || !nodePositions[conn.to]) return null;

        const speed = SPEEDS[conn.type] ?? 1;
        return Array.from({ length: conn.pulses }, (_, i) => (
          <PulseDot
            key={`${conn.id}-pulse-${i}`}
            pathId={conn.id}
            color={conn.color}
            speed={speed}
            delay={i / conn.pulses}
            size={i % 2 === 0 ? 5 : 3.5}
          />
        ));
      })}
    </g>
  );
}
