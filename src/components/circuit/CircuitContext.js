import { createContext, useContext } from 'react';

export const CircuitContext = createContext({
  nodePositions: {},
  registerNode: () => {},
  unregisterNode: () => {},
  hoveredNode: null,
  setHoveredNode: () => {},
});

export const useCircuit = () => useContext(CircuitContext);
