import clsx from 'clsx'

export function HealthScoreCircle({ score, size = 45 }) {
  const radius = 16
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  
  // Create a unique ID for the gradient to avoid conflicts if multiple circles exist
  const gradientId = `score-gradient-${score}`

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="rotate-[-90deg]" width={size} height={size} viewBox="0 0 40 40">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" /> {/* Tailwind orange-500 */}
            <stop offset="100%" stopColor="#fbbf24" /> {/* Tailwind amber-400 */}
          </linearGradient>
        </defs>
        
        {/* Background Track (Grey) */}
        <circle
          className="stroke-zinc-100 dark:stroke-zinc-800"
          strokeWidth="3.5"
          fill="transparent"
          r={radius}
          cx="20"
          cy="20"
        />
        
        {/* Progress Bar (Gradient) */}
        <circle
          stroke={`url(#${gradientId})`}
          strokeWidth="4"
          strokeDasharray={circumference}
          style={{ 
            strokeDashoffset: offset,
            transition: 'stroke-dashoffset 1s ease-in-out' 
          }}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx="20"
          cy="20"
        />
      </svg>
      
      {/* Score Text Allignment */}
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-[11px] font-bold text-zinc-950 dark:text-white leading-none">
          {score}
        </span>
      </div>
    </div>
  )
}