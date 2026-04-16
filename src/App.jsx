import './App.css';
import CircuitBoard from './components/circuit/CircuitBoard';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="app">
      <CircuitBoard>
        <Navbar />
        <main style={{ position: 'relative', zIndex: 1 }}>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
        <footer style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          padding: '24px',
          borderTop: '1px solid var(--border)',
          color: 'var(--text-muted)',
          fontSize: '12px',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.08em',
        }}>
          SYSTEM_READY — Jamie Blackmore — {new Date().getFullYear()}
        </footer>
      </CircuitBoard>
    </div>
  );
}

export default App;
