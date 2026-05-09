type MarkProps = {
  size?: number;
  className?: string;
  arcColor?: string;
  arrowColor?: string;
  strokeWidth?: number;
  title?: string;
};

export function Mark({
  size = 120,
  className,
  arcColor = "currentColor",
  arrowColor = "var(--royal)",
  strokeWidth = 6,
  title,
}: MarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 150 150"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <g transform="rotate(30 75 75)">
        <path
          d="M 120 100 A 55 55 0 1 1 120 50"
          fill="none"
          stroke={arcColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <path d="M 116 68 L 122 80 L 130 68 Z" fill={arrowColor} />
      </g>
    </svg>
  );
}
