import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'SecurityTools — Zero-Knowledge Cybersecurity Utilities';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

function Shield() {
  return (
    <svg width="56" height="64" viewBox="0 0 56 64" fill="none">
      <path d="M28 2L52 12V28C52 45 42 56 28 62C14 56 4 45 4 28V12L28 2Z" fill="#052e21" stroke="#052e21" />
      <path d="M18 32L25 39L38 24" stroke="#10b981" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(circle at 50% 30%, #052e21 0%, #020617 65%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 36 }}>
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: 22,
              background: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(16,185,129,0.45)',
            }}
          >
            <Shield />
          </div>
          <div style={{ fontSize: 60, fontWeight: 800, color: '#ffffff', letterSpacing: -1 }}>
            SecurityTools
          </div>
        </div>
        <div style={{ fontSize: 28, color: '#6ee7b7', maxWidth: 940, textAlign: 'center' }}>
          Free Client-Side Cybersecurity Utilities
        </div>
        <div style={{ marginTop: 44, display: 'flex', gap: 16 }}>
          {['Password Strength', 'Generator', 'Passphrase'].map((t) => (
            <div
              key={t}
              style={{
                padding: '10px 24px',
                borderRadius: 999,
                background: 'rgba(16,185,129,0.08)',
                color: '#a7f3d0',
                fontSize: 20,
                border: '1px solid rgba(16,185,129,0.35)',
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
