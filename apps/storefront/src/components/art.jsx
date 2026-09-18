/*
 * Every picture in the storefront is drawn here as inline SVG. No image files
 * and no remote assets, so the app works with the network switched off.
 */

export function Logo() {
  return (
    <svg className="brand__mark" viewBox="0 0 32 32" role="img" aria-label="Acme Water">
      <path
        d="M16 3c5 6.2 8.5 10.7 8.5 15a8.5 8.5 0 0 1-17 0C7.5 13.7 11 9.2 16 3Z"
        fill="currentColor"
      />
      <path
        d="M13 18.5c0 2 1.4 3.4 3.2 3.6"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const artwork = {
  pitcher: (
    <g>
      <path d="M32 34h44l-4 50a8 8 0 0 1-8 7H44a8 8 0 0 1-8-7Z" />
      <path d="M76 44c10 2 14 7 14 13s-4 10-12 11" />
      <path d="M32 34c4-6 9-9 22-9s18 3 22 9" />
      <path d="M38 66c6-5 12-5 18 0s12 5 18 0" />
    </g>
  ),
  tap: (
    <g>
      <path d="M30 30h18v22" />
      <path d="M48 36h24a12 12 0 0 1 12 12v12" />
      <rect x="72" y="60" width="24" height="16" rx="4" />
      <path d="M84 84v6M78 88v4M90 88v4" />
    </g>
  ),
  undersink: (
    <g>
      <rect x="24" y="36" width="30" height="52" rx="8" />
      <rect x="66" y="36" width="30" height="52" rx="8" />
      <path d="M54 50h12" />
      <path d="M39 36V24h42v12" />
      <path d="M39 62h15M66 62h15" />
    </g>
  ),
  carafe: (
    <g>
      <path d="M50 22h20v18l10 20a10 10 0 0 1 1 5v22a8 8 0 0 1-8 8H47a8 8 0 0 1-8-8V65a10 10 0 0 1 1-5l10-20Z" />
      <path d="M40 72c7-4 13-4 20 0s13 4 20 0" />
      <path d="M50 22h20" />
    </g>
  ),
  cartridge: (
    <g>
      <rect x="40" y="20" width="40" height="80" rx="18" />
      <path d="M40 44h40M40 60h40M40 76h40" />
      <path d="M54 20v-8h12v8" />
    </g>
  ),
  guard: (
    <g>
      <path d="M60 18l30 10v26c0 22-13 35-30 42-17-7-30-20-30-42V28Z" />
      <path d="M60 44c6 8 10 13 10 18a10 10 0 0 1-20 0c0-5 4-10 10-18Z" />
    </g>
  ),
};

export function ProductArt({ kind }) {
  return (
    <svg className="product-art" viewBox="0 0 120 120" aria-hidden="true">
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {artwork[kind] ?? artwork.cartridge}
      </g>
    </svg>
  );
}

export function StepIcon({ step }) {
  return (
    <svg className="step__icon" viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeWidth="2" />
      <text x="24" y="31" textAnchor="middle" fontSize="20" fill="currentColor">
        {step}
      </text>
    </svg>
  );
}
