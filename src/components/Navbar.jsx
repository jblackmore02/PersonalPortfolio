import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const links = ['About', 'Projects', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 48px',
        background: scrolled ? 'rgba(6, 10, 18, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(22, 32, 53, 0.8)' : '1px solid transparent',
        transition: 'background 0.3s, border-color 0.3s',
      }}
    >
      <span style={{
        fontFamily: 'var(--font-mono)',
        color: 'var(--accent)',
        fontSize: '18px',
        fontWeight: 500,
        letterSpacing: '0.05em',
      }}>
        &lt;JBlackmore /&gt;
      </span>

      <ul style={{ display: 'flex', gap: '36px', listStyle: 'none' }}>
        {links.map(link => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase()}`}
              style={{
                fontSize: '14px',
                color: 'var(--text-muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                transition: 'color 0.2s',
                fontWeight: 500,
              }}
              onMouseEnter={e => e.target.style.color = 'var(--accent)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
