import { useEffect, useRef, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const RING_SIZE = 90;
const RING_RADIUS = 38;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function UnitRing({
  value,
  label,
  maxValue,
  accent,
  delay,
}: {
  value: number;
  label: string;
  maxValue: number;
  accent: 'aether' | 'gold';
  delay: string;
}) {
  const prevValueRef = useRef(value);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (prevValueRef.current !== value) {
      setFlip(true);
      const t = setTimeout(() => setFlip(false), 400);
      prevValueRef.current = value;
      return () => clearTimeout(t);
    }
  }, [value]);

  const progress = maxValue > 0 ? value / maxValue : 0;
  const dashOffset = RING_CIRCUMFERENCE * (1 - progress);

  const gradientId = `ring-grad-${accent}-${label}`;
  const glowColor = accent === 'aether' ? '#8b5bf7' : '#d49920';
  const strokeUrl = `url(#${gradientId})`;
  const textColor = accent === 'aether' ? 'text-aether-300' : 'text-gold-300';
  const labelColor = accent === 'aether' ? 'text-aether-400/60' : 'text-gold-400/60';

  return (
    <div className="flex flex-col items-center" style={{ animationDelay: delay }}>
      <div className="relative" style={{ width: RING_SIZE, height: RING_SIZE }}>
        <svg
          width={RING_SIZE}
          height={RING_SIZE}
          viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
          className="absolute inset-0 -rotate-90"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              {accent === 'aether' ? (
                <>
                  <stop offset="0%" stopColor="#a87fff" />
                  <stop offset="100%" stopColor="#7738ec" />
                </>
              ) : (
                <>
                  <stop offset="0%" stopColor="#edcb5d" />
                  <stop offset="100%" stopColor="#b97617" />
                </>
              )}
            </linearGradient>
          </defs>

          {/* Track */}
          <circle
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RING_RADIUS}
            fill="none"
            stroke="rgba(139,91,247,0.08)"
            strokeWidth="3"
          />

          {/* Progress arc */}
          <circle
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RING_RADIUS}
            fill="none"
            stroke={strokeUrl}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            style={{
              transition: 'stroke-dashoffset 1s ease-out',
              filter: `drop-shadow(0 0 6px ${glowColor}66)`,
            }}
          />

          {/* Tick marks around the ring */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * 2 * Math.PI;
            const x1 = RING_SIZE / 2 + Math.cos(angle) * (RING_RADIUS + 6);
            const y1 = RING_SIZE / 2 + Math.sin(angle) * (RING_RADIUS + 6);
            const x2 = RING_SIZE / 2 + Math.cos(angle) * (RING_RADIUS + 9);
            const y2 = RING_SIZE / 2 + Math.sin(angle) * (RING_RADIUS + 9);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={glowColor}
                strokeWidth="1"
                opacity="0.2"
              />
            );
          })}
        </svg>

        {/* Orbiting dot */}
        <div
          className="absolute inset-0 animate-spin-slow"
          style={{ animationDuration: '8s' }}
        >
          <div
            className="absolute h-1.5 w-1.5 rounded-full"
            style={{
              top: '4px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: glowColor,
              boxShadow: `0 0 8px ${glowColor}`,
            }}
          />
        </div>

        {/* Center number with flip animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`font-display text-2xl font-semibold tabular-nums sm:text-3xl ${textColor}`}
            style={{
              transition: 'transform 0.3s ease, opacity 0.3s ease',
              transform: flip ? 'rotateX(90deg) scale(0.8)' : 'rotateX(0deg) scale(1)',
              opacity: flip ? 0.3 : 1,
              textShadow: `0 0 20px ${glowColor}44`,
            }}
          >
            {String(value).padStart(2, '0')}
          </span>
        </div>

        {/* Outer glow ring */}
        <div
          className="absolute inset-0 rounded-full animate-glow-pulse"
          style={{
            boxShadow: `0 0 25px ${glowColor}22, inset 0 0 20px ${glowColor}11`,
            animationDelay: delay,
          }}
        />
      </div>

      <div className={`mt-3 text-[10px] uppercase tracking-[0.25em] ${labelColor} sm:text-xs`}>
        {label}
      </div>
    </div>
  );
}

export default function Countdown({ target }: { target: Date }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(target));
  const initialDaysRef = useRef(timeLeft.days);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(target));
    }, 1000);
    return () => clearInterval(interval);
  }, [target]);

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-8">
      <UnitRing
        value={timeLeft.days}
        label="Days"
        maxValue={Math.max(initialDaysRef.current, 1)}
        accent="gold"
        delay="0s"
      />

      <div className="flex flex-col gap-1.5 -mt-4">
        <div className="h-1.5 w-1.5 rounded-full bg-aether-500/40" />
        <div className="h-1.5 w-1.5 rounded-full bg-aether-500/20" />
      </div>

      <UnitRing
        value={timeLeft.hours}
        label="Hours"
        maxValue={24}
        accent="aether"
        delay="0.5s"
      />

      <div className="flex flex-col gap-1.5 -mt-4">
        <div className="h-1.5 w-1.5 rounded-full bg-gold-500/40" />
        <div className="h-1.5 w-1.5 rounded-full bg-gold-500/20" />
      </div>

      <UnitRing
        value={timeLeft.minutes}
        label="Minutes"
        maxValue={60}
        accent="gold"
        delay="1s"
      />

      <div className="flex flex-col gap-1.5 -mt-4">
        <div className="h-1.5 w-1.5 rounded-full bg-aether-500/40" />
        <div className="h-1.5 w-1.5 rounded-full bg-aether-500/20" />
      </div>

      <UnitRing
        value={timeLeft.seconds}
        label="Seconds"
        maxValue={60}
        accent="aether"
        delay="1.5s"
      />
    </div>
  );
}
