import { useRef, useEffect } from 'react';
import { useCircuit } from './CircuitContext';

const NODE_THEMES = {
  CORE:         { accent: 'var(--accent)',  accentRgb: 'var(--accent-rgb)',  label: '<<CORE>>' },
  SYS_INFO:     { accent: 'var(--accent3)', accentRgb: 'var(--accent3-rgb)', label: '<<SYS_INFO>>' },
  MODULE_ARRAY: { accent: 'var(--accent2)', accentRgb: 'var(--accent2-rgb)', label: '<<MODULE[]>>' },
  IO_PORT:      { accent: 'var(--accent4)', accentRgb: 'var(--accent4-rgb)', label: '<<I/O PORT>>' },
};

export default function CircuitNode({ id, type = 'CORE', chipId, pins = [], children }) {
  const ref = useRef(null);
  const { registerNode, unregisterNode, hoveredNode, setHoveredNode } = useCircuit();
  const theme = NODE_THEMES[type] ?? NODE_THEMES.CORE;
  const isHovered = hoveredNode === id;

  useEffect(() => {
    registerNode(id, ref);
    return () => unregisterNode(id);
  }, [id, registerNode, unregisterNode]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHoveredNode(id)}
      onMouseLeave={() => setHoveredNode(null)}
      style={{
        position: 'relative',
        border: `1px solid ${isHovered ? theme.accent : 'rgba(255,255,255,0.1)'}`,
        borderRadius: '4px',
        // IC chip corner notch — top-left
        clipPath: 'polygon(16px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 16px)',
        boxShadow: isHovered
          ? `0 0 30px rgba(${theme.accentRgb}, 0.25), inset 0 0 40px rgba(${theme.accentRgb}, 0.04)`
          : `0 0 12px rgba(${theme.accentRgb}, 0.06), inset 0 0 30px rgba(${theme.accentRgb}, 0.02)`,
        transition: 'border-color 0.3s, box-shadow 0.3s',
        background: 'rgba(6, 10, 18, 0.7)',
        backdropFilter: 'blur(2px)',
      }}
    >
      {/* Corner notch triangle indicator */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '16px 16px 0 0',
        borderColor: `${isHovered ? theme.accent : 'rgba(255,255,255,0.15)'} transparent transparent transparent`,
        zIndex: 2,
        transition: 'border-color 0.3s',
      }} />

      {/* Header strip */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 20px 10px 28px',
        background: `rgba(${theme.accentRgb}, 0.07)`,
        borderBottom: `1px solid rgba(${theme.accentRgb}, 0.2)`,
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: theme.accent,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          opacity: 0.9,
        }}>
          {theme.label}
        </span>
        {chipId && (
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
          }}>
            [{chipId}]
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>

      {/* Pin row */}
      {pins.length > 0 && (
        <div style={{
          display: 'flex',
          gap: '16px',
          padding: '12px 20px',
          borderTop: `1px solid rgba(${theme.accentRgb}, 0.12)`,
          background: `rgba(${theme.accentRgb}, 0.03)`,
          flexWrap: 'wrap',
        }}>
          {pins.map(pin => (
            <div key={pin} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                background: theme.accent,
                borderRadius: '1px',
                boxShadow: `0 0 6px ${theme.accent}`,
                opacity: 0.7,
              }} />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                color: 'var(--text-muted)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}>
                {pin}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
