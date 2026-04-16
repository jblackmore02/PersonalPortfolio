// Static SVG PCB background — grid, crosshairs, glow zones, vias
export default function PCBBackground() {
  const W = 3000;
  const H = 6000;
  const GRID = 40;

  // Generate via holes at random-ish grid positions
  const vias = [];
  const viaPositions = [
    [3,2],[7,5],[12,3],[18,8],[5,14],[15,12],[9,18],[20,4],
    [2,20],[14,22],[8,25],[19,28],[4,30],[11,35],[17,40],[6,45],
    [21,10],[3,50],[13,55],[20,60],[7,65],[16,70],[10,75],[22,80],
  ];
  viaPositions.forEach(([gx, gy], i) => {
    vias.push(
      <g key={i}>
        <circle cx={gx * GRID} cy={gy * GRID} r={4} fill="none" stroke="rgba(0,212,255,0.12)" strokeWidth="1.5" />
        <circle cx={gx * GRID} cy={gy * GRID} r={2} fill="rgba(0,212,255,0.08)" />
      </g>
    );
  });

  // Corner bracket markup helper
  const Bracket = ({ x, y, flip }) => {
    const sx = flip ? -1 : 1;
    return (
      <g transform={`translate(${x}, ${y}) scale(${sx}, 1)`}>
        <path d="M 0 20 L 0 0 L 20 0" fill="none" stroke="rgba(0,212,255,0.2)" strokeWidth="1.5" />
      </g>
    );
  };

  return (
    <g>
      <defs>
        {/* Fine grid pattern */}
        <pattern id="pcb-grid" x="0" y="0" width={GRID} height={GRID} patternUnits="userSpaceOnUse">
          <path d={`M ${GRID} 0 L 0 0 0 ${GRID}`} fill="none" stroke="rgba(0,212,255,0.04)" strokeWidth="0.5" />
        </pattern>

        {/* Glow filters */}
        <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="40" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glow-purple" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="40" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="trace-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Substrate */}
      <rect width="100%" height="100%" fill="transparent" />

      {/* Grid */}
      <rect width={W} height={H} fill="url(#pcb-grid)" />

      {/* Crosshairs at every 4th intersection */}
      {Array.from({ length: Math.floor(W / (GRID * 4)) + 1 }, (_, xi) =>
        Array.from({ length: Math.floor(H / (GRID * 4)) + 1 }, (_, yi) => (
          <g key={`ch-${xi}-${yi}`} transform={`translate(${xi * GRID * 4}, ${yi * GRID * 4})`}>
            <line x1="-5" y1="0" x2="5" y2="0" stroke="rgba(0,212,255,0.1)" strokeWidth="0.8" />
            <line x1="0" y1="-5" x2="0" y2="5" stroke="rgba(0,212,255,0.1)" strokeWidth="0.8" />
          </g>
        ))
      )}

      {/* Glow zones — radial ambient light per section */}
      <circle cx="50%" cy="10%" r="300" fill="rgba(0,212,255,0.025)" filter="url(#glow-cyan)" />
      <circle cx="50%" cy="33%" r="280" fill="rgba(0,255,136,0.02)" filter="url(#glow-purple)" />
      <circle cx="50%" cy="58%" r="320" fill="rgba(123,97,255,0.025)" filter="url(#glow-purple)" />
      <circle cx="50%" cy="85%" r="260" fill="rgba(255,107,53,0.02)" filter="url(#glow-cyan)" />

      {/* Via holes */}
      {vias}
    </g>
  );
}
