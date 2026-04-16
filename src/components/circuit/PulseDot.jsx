import { useEffect, useRef } from 'react';

export default function PulseDot({ pathId, color, speed = 1.2, delay = 0, size = 5 }) {
  const circleRef = useRef(null);
  const progressRef = useRef(delay);
  const pathRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    // Grab the path element by id — it lives in the same SVG
    const findPath = () => {
      pathRef.current = document.getElementById(pathId);
    };
    findPath();
    // Retry a few times in case SVG isn't rendered yet
    const t = setTimeout(findPath, 200);
    return () => clearTimeout(t);
  }, [pathId]);

  useEffect(() => {
    const animate = () => {
      const path = pathRef.current;
      const circle = circleRef.current;
      if (path && circle) {
        const totalLength = path.getTotalLength();
        if (totalLength > 0) {
          progressRef.current = (progressRef.current + speed / totalLength) % 1;
          const point = path.getPointAtLength(progressRef.current * totalLength);
          circle.setAttribute('cx', point.x);
          circle.setAttribute('cy', point.y);
        }
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [pathId, speed]);

  return (
    <circle
      ref={circleRef}
      r={size / 2}
      fill={color}
      style={{ filter: `drop-shadow(0 0 ${size}px ${color})` }}
    />
  );
}
