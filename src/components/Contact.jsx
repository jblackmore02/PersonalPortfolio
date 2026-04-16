import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionLabel } from './About';
import CircuitNode from './circuit/CircuitNode';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        position: 'relative',
        zIndex: 1,
        padding: '60px 24px 100px',
        maxWidth: '720px',
        margin: '0 auto',
      }}
    >
      <CircuitNode id="contact" type="IO_PORT" chipId="I/O-04" pins={['TX', 'RX', 'GND', 'VCC']}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ padding: '48px', textAlign: 'center' }}
        >
          <SectionLabel>Contact</SectionLabel>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 700,
            color: 'var(--text-bright)',
            marginBottom: '20px',
            letterSpacing: '-0.02em',
          }}>
            Let's Work Together
          </h2>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '16px',
            lineHeight: 1.7,
            marginBottom: '40px',
            maxWidth: '480px',
            margin: '0 auto 40px',
          }}>
            Whether you have a project in mind, want to collaborate, or just want to say hi!
          </p>

          {/* Signal status indicator */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: 'rgba(255,107,53,0.08)',
            border: '1px solid rgba(255,107,53,0.2)',
            borderRadius: '4px',
            marginBottom: '32px',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--accent4)',
          }}>
            <div style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: 'var(--accent4)',
              boxShadow: '0 0 8px var(--accent4)',
              animation: 'pulse-dot 2s ease-in-out infinite',
            }} />
            SIGNAL_STATUS: ONLINE
          </div>

          <div style={{ display: 'block' }}>
            <a
              href="mailto:jamieblackmore1@outlook.com"
              style={{
                display: 'inline-block',
                padding: '13px 36px',
                border: '1px solid var(--accent4)',
                borderRadius: '4px',
                color: 'var(--accent4)',
                fontSize: '15px',
                fontWeight: 500,
                letterSpacing: '0.05em',
                transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
                boxShadow: '0 0 16px rgba(255,107,53,0.15)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--accent4)';
                e.currentTarget.style.color = '#000';
                e.currentTarget.style.boxShadow = '0 0 28px rgba(255,107,53,0.4)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--accent4)';
                e.currentTarget.style.boxShadow = '0 0 16px rgba(255,107,53,0.15)';
              }}
            >
              Transmit Message
            </a>
          </div>

        </motion.div>
      </CircuitNode>
      <style>{`@keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.7)} }`}</style>
    </section>
  );
}
