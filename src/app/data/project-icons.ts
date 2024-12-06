import { ProjectKey } from '../types/types';

export const PROJECT_ICONS: Record<ProjectKey, string> = {
  chatHub: `<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="chatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#60A5FA;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#3B82F6;stop-opacity:1" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="128" height="128" rx="32" fill="#0F172A"/>
              <path d="M32 40 H96 A16 16 0 0 1 112 56 V72 A16 16 0 0 1 96 88 H72 L64 104 L56 88 H32 A16 16 0 0 1 16 72 V56 A16 16 0 0 1 32 40" fill="url(#chatGradient)"/>
              <path d="M44 64 A4 4 0 0 0 52 64 A4 4 0 0 0 44 64" fill="white"/>
              <path d="M60 64 A4 4 0 0 0 68 64 A4 4 0 0 0 60 64" fill="white"/>
              <path d="M76 64 A4 4 0 0 0 84 64 A4 4 0 0 0 76 64" fill="white"/>
            </svg>`,
  easyTrade: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" rx="20" fill="#1E293B"/>

                <g stroke="#38BDF8" stroke-width="2">
                  <line x1="20" y1="30" x2="20" y2="70" />
                  <rect x="18" y="35" width="4" height="20" fill="#38BDF8"/>

                  <line x1="35" y1="25" x2="35" y2="75" />
                  <rect x="33" y="55" width="4" height="15" fill="#38BDF8"/>

                  <line x1="50" y1="20" x2="50" y2="80" />
                  <rect x="48" y="30" width="4" height="35" fill="#38BDF8"/>

                  <line x1="65" y1="25" x2="65" y2="75" />
                  <rect x="63" y="40" width="4" height="25" fill="#38BDF8"/>

                  <line x1="80" y1="30" x2="80" y2="70" />
                  <rect x="78" y="45" width="4" height="15" fill="#38BDF8"/>
                </g>

                <path
                  d="M15 65 Q 30 60, 45 50 T 85 35"
                  fill="none"
                  stroke="#22C55E"
                  stroke-width="2"
                />

                <g fill="#CBD5E1" font-size="8">
                  <circle cx="15" cy="25" r="2"/>
                  <circle cx="15" cy="50" r="2"/>
                  <circle cx="15" cy="75" r="2"/>
                </g>
              </svg>`,
  techSpec: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#22d3ee;stop-opacity:1" />
                </linearGradient>
              </defs>

              <rect x="2" y="2" width="28" height="28" rx="8"
                    fill="url(#grad)" />

              <path d="M8 8h16v4h-6v12h-4V12H8V8z"
                    fill="rgba(0,0,0,0.85)"
                    stroke="none" />

              <path d="M24 16a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2"
                    fill="none"
                    stroke="rgba(0,0,0,0.85)"
                    stroke-width="2"
                    stroke-linecap="round" />
            </svg>`
};
