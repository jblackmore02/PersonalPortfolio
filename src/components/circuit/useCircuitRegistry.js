import { useState, useRef, useCallback, useEffect } from 'react';

export function useCircuitRegistry() {
  const nodeRefs = useRef(new Map()); // id -> React ref
  const [nodePositions, setNodePositions] = useState({});

  const updatePositions = useCallback(() => {
    const next = {};
    nodeRefs.current.forEach((ref, id) => {
      if (ref.current) {
        next[id] = ref.current.getBoundingClientRect();
      }
    });
    setNodePositions(next);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', updatePositions, { passive: true });
    window.addEventListener('resize', updatePositions);
    const ro = new ResizeObserver(updatePositions);
    ro.observe(document.body);
    updatePositions();
    return () => {
      window.removeEventListener('scroll', updatePositions);
      window.removeEventListener('resize', updatePositions);
      ro.disconnect();
    };
  }, [updatePositions]);

  const registerNode = useCallback((id, ref) => {
    nodeRefs.current.set(id, ref);
    // Trigger a position update after registering
    setTimeout(updatePositions, 50);
  }, [updatePositions]);

  const unregisterNode = useCallback((id) => {
    nodeRefs.current.delete(id);
  }, []);

  return { nodePositions, registerNode, unregisterNode };
}
