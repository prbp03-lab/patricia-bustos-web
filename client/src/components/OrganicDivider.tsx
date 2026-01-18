interface OrganicDividerProps {
  position?: 'top' | 'bottom';
  color?: 'accent' | 'primary' | 'secondary';
  className?: string;
}

export default function OrganicDivider({
  position = 'bottom',
  color = 'accent',
  className = '',
}: OrganicDividerProps) {
  const colorMap = {
    accent: '#10b981',
    primary: '#0f172a',
    secondary: '#f1f5f9',
  };

  const isTop = position === 'top';
  const pathData = isTop
    ? 'M0,50 Q250,0 500,50 T1000,50 L1000,0 L0,0 Z'
    : 'M0,0 Q250,50 500,0 T1000,0 L1000,50 L0,50 Z';

  return (
    <svg
      viewBox="0 0 1000 50"
      preserveAspectRatio="none"
      className={`w-full h-12 md:h-16 ${className}`}
      style={{
        display: 'block',
        transform: isTop ? 'scaleY(-1)' : 'none',
      }}
    >
      <path
        d={pathData}
        fill={colorMap[color]}
        opacity="0.1"
      />
      <path
        d={pathData}
        fill="none"
        stroke={colorMap[color]}
        strokeWidth="2"
        opacity="0.3"
      />
    </svg>
  );
}
