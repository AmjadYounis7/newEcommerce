import type { CSSProperties } from 'react';

const paths = {
  arrow: 'M4 12h15m-6-6 6 6-6 6',
  diagonal: 'M6 18 18 6M6 6h12v12',
  down: 'm6 9 6 6 6-6',
  heart:
    'M20.8 8.6c0 4.2-4.2 7.4-8.8 11-4.6-3.6-8.8-6.8-8.8-11C3.2 3.4 9.8 2.4 12 7c2.2-4.6 8.8-3.6 8.8 1.6Z',
  bag: 'M5 7.5h14l1 13H4l1-13Zm3.5 0V6a3.5 3.5 0 0 1 7 0v1.5',
  truck:
    'M2 5h12v12H8m6-9h4l4 4v5h-3m-5 0h1M2 16h2m4 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm11 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z',
  plus: 'M5 12h14m-7-7v14',
  minus: 'M5 12h14',
  close: 'm6 6 12 12M18 6 6 18',
  check: 'm4 12 5 5L20 6',
  search: 'M16 10a6 6 0 1 1-12 0 6 6 0 0 1 12 0Zm-1 5 6 6',
  walk: 'm6 16 9-10a3 3 0 0 1 4 4l-3 3-4-3m-4 4-3 3a2 2 0 0 0 3 3l3-3',
  play: 'M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-8c0 5 4 8 8 8M4 12c4 0 8 3 8 8',
  dine: 'M5 9h14l2.5 10h-19L5 9Zm1-3 1-2m5 2V3m5 3-1-2',
  rest: 'M3 18v-7m18 7v-7M3 15h18M5 12V8c0-1 1-2 2-2h10c1 0 2 1 2 2v4M3 12h18',
  menu: 'M3 6h18M3 12h18M3 18h18',
  tag: 'm3 12 9-9h8v8l-9 10-8-9Zm13-5h.01',
  trash: 'M4 6h16m-11 0V3h6v3m3 0-1 15H7L6 6m4 4v7m4-7v7',
};
export type IconName = keyof typeof paths | 'paw';
export function Icon({
  name,
  size = 20,
  filled = false,
  style,
}: {
  name: IconName;
  size?: number;
  filled?: boolean;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled || name === 'paw' ? 'currentColor' : 'none'}
      stroke={name === 'paw' ? 'none' : 'currentColor'}
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={style}
    >
      {name === 'paw' ? (
        <g>
          <ellipse
            cx="4"
            cy="10"
            rx="2.35"
            ry="3.1"
            transform="rotate(-24 4 10)"
          />
          <ellipse
            cx="9"
            cy="5.8"
            rx="2.3"
            ry="3.1"
            transform="rotate(-11 9 5.8)"
          />
          <ellipse
            cx="15.3"
            cy="5.8"
            rx="2.3"
            ry="3.1"
            transform="rotate(14 15.3 5.8)"
          />
          <ellipse
            cx="20.3"
            cy="10.4"
            rx="2.3"
            ry="3.1"
            transform="rotate(25 20.3 10.4)"
          />
          <path d="M5 18c0-2.7 4.4-8.3 7.2-8.3S19.5 15.2 19.5 18c0 4.3-4.2 3-7.3 2.3C9.7 20.8 5 22.2 5 18Z" />
        </g>
      ) : (
        <path d={paths[name]} />
      )}
    </svg>
  );
}
