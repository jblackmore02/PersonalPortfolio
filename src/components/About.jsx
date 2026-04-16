import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CircuitNode from './circuit/CircuitNode';

const skills = [
  'C++', 'Python', 'SQL', 'Docker',
  'GitHub', 'Modular Development', 'CMake', 'Linux',
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={ref}
      style={{
        position: 'relative',
        zIndex: 1,
        padding: '60px 24px',
        maxWidth: '1000px',
        margin: '0 auto',
      }}
    >
      <CircuitNode id="about" type="SYS_INFO" chipId="ROM-02" pins={['BIO', 'SKILL', 'XP', 'EDU']}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ padding: '48px' }}
        >
          <SectionLabel>About</SectionLabel>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 700,
            color: 'var(--text-bright)',
            marginBottom: '40px',
            letterSpacing: '-0.02em',
          }}>
            Who I Am
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
            <div>
              <p style={{ color: 'var(--text)', lineHeight: 1.8, marginBottom: '20px', fontSize: '16px' }}>
                I write C++ and Python, working primarily on the software engineering side with a focus on modular, version-controlled code. I also work as a contractor doing human reinforcement training for frontier AI models.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '16px' }}>
                Still building out my project portfolio, check back soon!
              </p>
            </div>

            <div>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--accent3)',
                marginBottom: '16px',
                letterSpacing: '0.1em',
              }}>
                // tech_stack[]
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    style={{
                      padding: '5px 12px',
                      background: 'rgba(0,255,136,0.05)',
                      border: '1px solid rgba(0,255,136,0.2)',
                      borderRadius: '3px',
                      fontSize: '12px',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--accent3)',
                      cursor: 'default',
                      transition: 'border-color 0.2s, background 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'var(--accent3)';
                      e.currentTarget.style.background = 'rgba(0,255,136,0.12)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(0,255,136,0.2)';
                      e.currentTarget.style.background = 'rgba(0,255,136,0.05)';
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </CircuitNode>
    </section>
  );
}

export function SectionLabel({ children }) {
  return (
    <p style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '12px',
      color: 'var(--text-muted)',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      marginBottom: '10px',
    }}>
      {'<'}{children}{' />'}
    </p>
  );
}
