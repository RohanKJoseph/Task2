import { useId } from 'react'

export function HealthScoreCircle({ score = 0, size = 45 }) {
  const id = useId()
  const radius = 16
  const circumference = 2 * Math.PI * radius
  const sanitized = Number.isFinite(Number(score)) ? Math.max(0, Math.min(100, Number(score))) : 0
  const offset = circumference - (sanitized / 100) * circumference

  // pick gradient based on score
  let colorFrom = '#ef4444' // red
  let colorTo = '#fb923c'   // orange
  if (sanitized >= 75) {
    colorFrom = '#10b981' // green-500
    colorTo = '#34d399'   // green-300
  } else if (sanitized >= 50) {
    colorFrom = '#f59e0b' // amber-500
    colorTo = '#fbbf24'   // amber-400
  }

  const gradientId = `health-score-gradient-${id}`

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="rotate-[-90deg]" width={size} height={size} viewBox="0 0 40 40">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colorFrom} />
            <stop offset="100%" stopColor={colorTo} />
          </linearGradient>
        </defs>

        {/* Background track */}
        <circle
          className="stroke-zinc-100 dark:stroke-zinc-800"
          strokeWidth="3.5"
          fill="transparent"
          r={radius}
          cx="20"
          cy="20"
        />

        {/* Progress */}
        <circle
          stroke={`url(#${gradientId})`}
          strokeWidth="4"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: offset, transition: 'stroke-dashoffset 800ms ease' }}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx="20"
          cy="20"
        />
      </svg>

      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-[11px] font-bold text-zinc-950 dark:text-white leading-none">{sanitized}</span>
      </div>
    </div>
  )
}