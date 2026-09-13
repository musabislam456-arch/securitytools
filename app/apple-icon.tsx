import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

function Shield() {
  return (
    <svg width="80" height="92" viewBox="0 0 56 64" fill="none">
      <path d="M28 2L52 12V28C52 45 42 56 28 62C14 56 4 45 4 28V12L28 2Z" fill="#052e21" stroke="#052e21" />
      <path d="M18 32L25 39L38 24" stroke="#10b981" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#10b981',
        }}
      >
        <Shield />
      </div>
    ),
    { ...size }
  );
}
