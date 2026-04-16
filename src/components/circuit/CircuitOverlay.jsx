import PCBBackground from './PCBBackground';
import CircuitTraces from './CircuitTraces';
import PulseLayer from './PulseLayer';

export default function CircuitOverlay() {
  return (
    <svg
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'visible',
        // Fade at viewport edges so traces don't hard-clip
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)',
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="pcb-bg">
        <PCBBackground />
      </g>
      <g className="traces">
        <CircuitTraces />
      </g>
      <g className="pulses">
        <PulseLayer />
      </g>
    </svg>
  );
}
