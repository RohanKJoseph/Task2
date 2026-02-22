import React from 'react'

export function HealthScoreCircle({ score = 0, size = 60, strokeWidth = 4 }) {
  // Ensure score is a valid number between 0-100
  const normalizedScore = Math.max(0, Math.min(100, Number(score) || 0))
  
  // Circle parameters
  const radius = (size / 2) * 0.6
  const normalizedRadius = radius - strokeWidth / 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference

  // Smooth color gradient from red to green
  const getColorFromScore = (scoreValue) => {
    let r, g, b;
    
    if (scoreValue <= 50) {
      // Red to Yellow: 0-50
      r = 239; // Red
      g = Math.floor((scoreValue / 50) * 158); // 0 to 158
      b = 68; // Constant blue
    } else {
      // Yellow to Green: 50-100
      const ratio = (scoreValue - 50) / 50;
      r = Math.floor(239 - (ratio * 229)); // 239 to 10
      g = Math.floor(158 + (ratio * 137)); // 158 to 295 (capped at 255)
      b = Math.floor(68 - (ratio * 68)); // 68 to 0
    }
    
    // Convert to hex
    return `rgb(${Math.min(255, r)}, ${Math.min(255, g)}, ${Math.min(255, b)})`
  }

  const strokeColor = getColorFromScore(normalizedScore)

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
        
        {/* Progress circle with smooth color transition */}
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
        className="absolute font-semibold text-gray-700"
        style={{ 
          fontSize: `${size * 0.25}px`,
          pointerEvents: 'none',
          userSelect: 'none' 
        }}
      >
        {normalizedScore}
      </div>
    </div>
  )
}