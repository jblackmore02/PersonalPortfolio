import { useState } from 'react';
import { CircuitContext } from './CircuitContext';
import { useCircuitRegistry } from './useCircuitRegistry';
import CircuitOverlay from './CircuitOverlay';

export default function CircuitBoard({ children }) {
  const { nodePositions, registerNode, unregisterNode } = useCircuitRegistry();
  const [hoveredNode, setHoveredNode] = useState(null);

  return (
    <CircuitContext.Provider value={{ nodePositions, registerNode, unregisterNode, hoveredNode, setHoveredNode }}>
      <CircuitOverlay />
      {children}
    </CircuitContext.Provider>
  );
}
