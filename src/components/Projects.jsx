import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionLabel } from './About';
import CircuitNode from './circuit/CircuitNode';

const projects = [
  {
    name: 'Deterministic Fault Injection Framework',
    description: 'Testing tool for modular systems. Injects seeded faults via a transparent proxy, then uses trace minimisation and delta debugging to replay and reduce failure cases. Enables deterministic chaos testing with reproducible results.',
    tags: ['C++', 'Fault Injection', 'Delta Debugging', 'Proxy', 'Testing'],
    link: '#',
    accent: '#00d4ff',
    accentRgb: '0,212,255',
    moduleId: 'MOD-A1',
  },
  {
    name: '[Project Name]',
    description: 'Short description of what this project does, the problem it solves, and any notable technical details worth highlighting.',
    tags: ['Python', 'SQL', 'Docker'],
    link: '#',
    accent: '#7b61ff',
    accentRgb: '123,97,255',
    moduleId: 'MOD-B2',
  },
  {
    name: '[Project Name]',
    description: 'Short description of what this project does, the problem it solves, and any notable technical details worth highlighting.',
    tags: ['C++', 'GitHub', 'Linux'],
    link: '#',
    accent: '#00d4ff',
    accentRgb: '0,212,255',
    moduleId: 'MOD-C3',
  },
  {
    name: '[Project Name]',
    description: 'Short description of what this project does, the problem it solves, and any notable technical details worth highlighting.',
    tags: ['Python', 'C++', 'SQL'],
    link: '#',
    accent: '#7b61ff',
    accentRgb: '123,97,255',
    moduleId: 'MOD-D4',
  },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="projects"
      ref={ref}
      style={{
        position: 'relative',
        zIndex: 1,
        padding: '60px 24px',
        maxWidth: '1100px',
        margin: '0 auto',
      }}
    >
      <CircuitNode id="projects" type="MODULE_ARRAY" chipId="RAM-03" pins={['ADDR', 'DATA', 'WE', 'OE', 'CS', 'CLK']}>
        <div style={{ padding: '48px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '48px' }}
          >
            <SectionLabel>Projects</SectionLabel>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 700,
              color: 'var(--text-bright)',
              letterSpacing: '-0.02em',
            }}>
              Things I've Built
            </h2>
          </motion.div>

          {/* Bus bar */}
          <div style={{
            width: '100%',
            height: '2px',
            background: 'linear-gradient(to right, transparent, rgba(123,97,255,0.4), rgba(123,97,255,0.4), transparent)',
            marginBottom: '32px',
            position: 'relative',
          }}>
            {/* Bus label */}
            <span style={{
              position: 'absolute',
              top: '-18px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: 'rgba(123,97,255,0.6)',
              letterSpacing: '0.1em',
              whiteSpace: 'nowrap',
            }}>
              MODULE_DATA_BUS
            </span>
            {/* Tap points on bus */}
            {[25, 42, 58, 75].map(pct => (
              <div key={pct} style={{
                position: 'absolute',
                top: '-3px',
                left: `${pct}%`,
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'rgba(123,97,255,0.6)',
                boxShadow: '0 0 6px rgba(123,97,255,0.8)',
              }} />
            ))}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(460px, 1fr))',
            gap: '20px',
          }}>
            {projects.map((project, i) => (
              <ProjectCard key={project.name} project={project} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </CircuitNode>
    </section>
  );
}

function ProjectCard({ project, index, inView }) {
  return (
    <motion.a
      href={project.link}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -2 }}
      style={{
        display: 'block',
        padding: '0',
        background: `rgba(${project.accentRgb}, 0.04)`,
        border: `1px solid rgba(${project.accentRgb}, 0.2)`,
        borderRadius: '4px',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        clipPath: 'polygon(10px 0%, 100% 0%, 100% 100%, 0% 100%, 0% 10px)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = project.accent;
        e.currentTarget.style.boxShadow = `0 0 20px rgba(${project.accentRgb}, 0.15)`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = `rgba(${project.accentRgb}, 0.2)`;
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Card header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 16px',
        background: `rgba(${project.accentRgb}, 0.08)`,
        borderBottom: `1px solid rgba(${project.accentRgb}, 0.15)`,
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: project.accent,
          letterSpacing: '0.1em',
          opacity: 0.8,
        }}>
          [{project.moduleId}]
        </span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={project.accent} strokeWidth="2" opacity="0.6">
          <path d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </div>

      {/* Card body */}
      <div style={{ padding: '20px 20px 16px' }}>
        <h3 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--text-bright)', marginBottom: '10px' }}>
          {project.name}
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.7, marginBottom: '18px' }}>
          {project.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              padding: '3px 9px',
              background: `rgba(${project.accentRgb}, 0.08)`,
              border: `1px solid rgba(${project.accentRgb}, 0.25)`,
              borderRadius: '3px',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              color: project.accent,
              opacity: 0.85,
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}
