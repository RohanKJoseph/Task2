import React from 'react'

export function HealthScoreCircle({ score = 0, size = 60 }) {
  // Ensure score is a valid number between 0-100
  const normalizedScore = Math.max(0, Math.min(100, Number(score) || 0))
  
  // Circle parameters
  const strokeWidth = 4
  const radius = 18
  const normalizedRadius = radius - strokeWidth / 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference

  // Color based on score
  let strokeColor = '#ef4444' // red for 0-49
  if (normalizedScore >= 75) {
    strokeColor = '#10b981' // green for 75-100
  } else if (normalizedScore >= 50) {
    strokeColor = '#f59e0b' // amber for 50-74
  }

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        height={size}
        width={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={size / 2}
          cy={size / 2}
        />
        
        {/* Progress circle */}
        <circle
          stroke={strokeColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={size / 2}
          cy={size / 2}
          className="transition-all duration-700 ease-in-out"
        />
      </svg>
      
      {/* Score text */}
      <div 
        className="absolute text-sm font-semibold text-gray-500"
        style={{ 
          pointerEvents: 'none',
          userSelect: 'none' 
        }}
      >
        {normalizedScore}
      </div>
    </div>
  )
}