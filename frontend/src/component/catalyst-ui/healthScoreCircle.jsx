
import React, { useId } from 'react';

/**
 * Semi-circular health score gauge (arc 220deg -> -40deg).
 * Red (0-25) -> orange (25-50) -> yellow (50-80) -> green (80-100).
 *
 * @param {Object} props
 * @param {number} props.score - Score 0-100
 * @param {'sm'|'lg'} [props.size='lg'] - 'sm' = 50px, 'lg' = 140px
 * @param {boolean} [props.showLabel] - Default: true for lg, false for sm
 */
const HealthScoreCircle = ({ score = 0, size = 'lg', showLabel: showLabelProp }) => {
  const isSm = size === 'sm';
  const pixelSize = isSm ? 50 : 140;
  const strokeWidth = isSm ? 10 : 24;
  const showLabel = showLabelProp ?? !isSm;

  const radius = (pixelSize - strokeWidth) / 2;
  const center = pixelSize / 2;

  const startAngle = 220;
  const endAngle = -40;
  const angleRange = startAngle - endAngle;
  const scoreEndAngle = startAngle - (score / 100) * angleRange;

  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  const getPoint = (angleDeg) => {
    const rad = toRadians(angleDeg);
    return {
      x: center + radius * Math.cos(rad),
      y: center - radius * Math.sin(rad),
    };
  };
  const describeArc = (startDeg, endDeg) => {
    const start = getPoint(startDeg);
    const end = getPoint(endDeg);
    const largeArcFlag = Math.abs(startDeg - endDeg) > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
  };

  const getGradientStops = (s) => {
    if (s <= 25) {
      return [
        { offset: '0%', color: '#ef4444' },
        { offset: '100%', color: '#ef4444' },
      ];
    }
    if (s <= 50) {
      return [
        { offset: '0%', color: '#ef4444' },
        { offset: '100%', color: '#f97316' },
      ];
    }
    if (s <= 80) {
      return [
        { offset: '0%', color: '#ef4444' },
        { offset: '50%', color: '#f59e0b' },
        { offset: '100%', color: '#eab308' },
      ];
    }
    return [
      { offset: '0%', color: '#ef4444' },
      { offset: '25%', color: '#f97316' },
      { offset: '50%', color: '#eab308' },
      { offset: '100%', color: '#22c55e' },
    ];
  };

  const getLabel = (s) => {
    if (s >= 80) return 'Good';
    if (s >= 50) return 'Average';
    if (s >= 25) return 'Poor';
    return 'Critical';
  };

  const gradientId = useId().replace(/:/g, '-') + '-gauge';

  return (
    <div
      className="relative flex flex-col items-center justify-center"
      style={isSm ? { width: pixelSize, height: pixelSize } : undefined}
    >
      <svg
        width={pixelSize}
        height={isSm ? pixelSize : pixelSize * 0.65}
        viewBox={`0 0 ${pixelSize} ${pixelSize}`}
        className={!isSm ? 'overflow-visible' : ''}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="50%" x2="100%" y2="50%">
            {getGradientStops(score).map((stop, i) => (
              <stop key={i} offset={stop.offset} stopColor={stop.color} />
            ))}
          </linearGradient>
        </defs>

        <path
          d={describeArc(startAngle, endAngle)}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          strokeLinecap="butt"
        />
        {score > 0 && (
          <path
            d={describeArc(startAngle, scoreEndAngle)}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeLinecap="butt"
          />
        )}
      </svg>

      {isSm ? (
        <span className="text-xs font-medium text-zinc-500 -mt-3">{score}</span>
      ) : showLabel ? (
        <div className="absolute bottom-2 text-center">
          <div className="text-3xl font-bold text-zinc-600">{score}</div>
          <div className="text-sm text-zinc-500">{getLabel(score)}</div>
        </div>
      ) : (
        <div className="absolute bottom-2 text-center">
          <div className="text-3xl font-bold text-zinc-600">{score}</div>
        </div>
      )}
    </div>
  );
};

export { HealthScoreCircle };
export default HealthScoreCircle;