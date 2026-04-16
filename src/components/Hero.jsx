import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CircuitNode from './circuit/CircuitNode';

const ROLES = ['Software Engineer', 'C++ Developer', 'Python Developer', 'Problem Solver'];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = ROLES[roleIndex];
    let timeout;

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex(i => (i + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <section
      id="hero"
      style={{ position: 'relative', zIndex: 1, minHeight: '100vh', padding: '80px 24px 40px' }}
    >
    <CircuitNode id="hero" type="CORE" chipId="CPU-01" pins={['VDD', 'GND', 'DATA', 'CLK', 'INT', 'RST']}>
      <div style={{
        minHeight: 'calc(100vh - 200px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 24px',
      }}>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p style={{
          fontFamily: 'var(--font-mono)',
          color: 'var(--accent)',
          fontSize: '14px',
          letterSpacing: '0.2em',
          marginBottom: '20px',
          textTransform: 'uppercase',
        }}>
          Hello, world. I'm
        </p>

        <h1 style={{
          fontSize: 'clamp(48px, 8vw, 88px)',
          fontWeight: 700,
          color: 'var(--text-bright)',
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          marginBottom: '24px',
        }}>
          Jamie
          <span style={{
            display: 'block',
            background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Blackmore
          </span>
        </h1>

        <div style={{
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '40px',
        }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '20px' }}>{'// '}</span>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '20px',
            color: 'var(--text)',
          }}>
            {displayed}
            <span style={{
              display: 'inline-block',
              width: '2px',
              height: '1.2em',
              background: 'var(--accent)',
              marginLeft: '3px',
              verticalAlign: 'text-bottom',
              animation: 'blink 1s step-end infinite',
            }} />
          </span>
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: 'center',
          marginBottom: '48px',
        }}>
          {['Contractor', 'C++ Developer', 'Python Developer', 'AI Model Trainer'].map(role => (
            <span key={role} style={{
              padding: '5px 14px',
              border: '1px solid rgba(0,212,255,0.25)',
              borderRadius: '3px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--accent)',
              background: 'rgba(0,212,255,0.05)',
              letterSpacing: '0.05em',
            }}>
              {role}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="#projects"
            style={{
              padding: '12px 32px',
              background: 'var(--accent)',
              color: '#000',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '15px',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 0 20px rgba(0,212,255,0.3)',
            }}
            onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 0 30px rgba(0,212,255,0.5)'; }}
            onMouseLeave={e => { e.target.style.transform = ''; e.target.style.boxShadow = '0 0 20px rgba(0,212,255,0.3)'; }}
          >
            View Projects
          </a>
          <a
            href="#contact"
            style={{
              padding: '12px 32px',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              fontWeight: 500,
              fontSize: '15px',
              color: 'var(--text)',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; }}
          >
            Get in Touch
          </a>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ position: 'absolute', bottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
      >
        <span style={{ fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--accent), transparent)' }} />
      </motion.div>

      <style>{`
        @keyframes blink { 0%,100% { opacity: 1 } 50% { opacity: 0 } }
      `}</style>
      </div>
    </CircuitNode>
    </section>
  );
}
