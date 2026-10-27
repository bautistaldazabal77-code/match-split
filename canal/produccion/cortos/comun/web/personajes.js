// Bustos de los personajes (SVG de 600 x 700). o.ropa: color del uniforme; o.chaleco: chaleco naranja reflectivo;
// o.casco: casco blanco de obra; o.gorro: gorro de lana de marino; o.parche: parche con la bandera argentina en el hombro.
function busto(o = {}) {
  const id = 'b' + Math.random().toString(36).slice(2, 7), ropa = o.ropa || '#1d2a3b', piel = o.piel || '#d79f7b';
  return `<svg viewBox="0 0 600 700" style="width:100%;height:100%">
  <defs><radialGradient id="${id}" cx=".5" cy=".55" r=".5"><stop offset="0" stop-color="${o.halo || '#ffb23e'}" stop-opacity=".22"/><stop offset="1" stop-color="${o.halo || '#ffb23e'}" stop-opacity="0"/></radialGradient></defs>
  <ellipse cx="300" cy="380" rx="300" ry="320" fill="url(#${id})"/>
  <path d="M40,700 C52,560 140,500 228,482 L372,482 C460,500 548,560 560,700 Z" fill="${ropa}"/>
  ${o.chaleco ? `<path d="M80,700 C92,582 150,522 230,496 L268,566 L258,700 Z" fill="#ff7a1a"/><path d="M520,700 C508,582 450,522 370,496 L332,566 L342,700 Z" fill="#ff7a1a"/>
  <path d="M86,612 L262,612 L262,634 L83,640 Z M80,660 L260,660 L259,684 L79,688 Z M514,612 L338,612 L338,634 L517,640 Z M520,660 L340,660 L341,684 L521,688 Z" fill="#e3e8ec"/>` :
  `<path d="M300,520 L300,700" stroke="#000" stroke-opacity=".25" stroke-width="6"/><path d="M110,600 L250,600 M350,600 L490,600" stroke="#000" stroke-opacity=".18" stroke-width="5"/>`}
  ${o.parche ? `<g transform="translate(92 556) rotate(-24)"><rect width="64" height="40" rx="4" fill="#74acdf"/><rect y="13" width="64" height="14" fill="#fff"/><circle cx="32" cy="20" r="5" fill="#f6b40e"/></g>` : ''}
  <path d="M238,486 L300,560 L362,486 L346,474 L300,522 L254,474 Z" fill="#000" opacity=".25"/>
  <path d="M256,392 L256,490 C278,518 322,518 344,490 L344,392 Z" fill="#c2856a"/>
  <path d="M256,420 C280,450 320,450 344,420 L344,452 C320,470 280,470 256,452 Z" fill="#9c654f" opacity=".7"/>
  <ellipse cx="214" cy="318" rx="15" ry="26" fill="#c98b6c"/><ellipse cx="386" cy="318" rx="15" ry="26" fill="#b97c60"/>
  <path d="M216,300 C216,224 256,182 300,182 C344,182 384,224 384,300 C384,372 348,432 300,437 C252,432 216,372 216,300 Z" fill="${piel}"/>
  <path d="M300,182 C344,182 384,224 384,300 C384,372 348,432 300,437 C322,400 330,350 330,300 C330,240 322,200 300,182 Z" fill="#b5795c" opacity=".45"/>
  <path d="M226,360 C240,410 270,434 300,437 C330,434 360,410 374,360 C360,392 336,410 300,412 C264,410 240,392 226,360 Z" fill="#5a3a2c" opacity="${o.barba ?? .28}"/>
  <path d="M220,276 C214,236 226,214 240,206 L244,262 Z M380,276 C386,236 374,214 360,206 L356,262 Z" fill="#231a15"/>
  <path d="M246,272 Q264,262 284,268" stroke="#2a1d16" stroke-width="8" stroke-linecap="round" fill="none"/>
  <path d="M316,268 Q336,262 354,272" stroke="#2a1d16" stroke-width="8" stroke-linecap="round" fill="none"/>
  <ellipse cx="266" cy="298" rx="8" ry="6.5" fill="#1b1410"/><ellipse cx="334" cy="298" rx="8" ry="6.5" fill="#1b1410"/>
  <circle cx="269" cy="296" r="2" fill="#fff" opacity=".8"/><circle cx="337" cy="296" r="2" fill="#fff" opacity=".8"/>
  <path d="M302,296 Q298,334 289,348 Q299,356 312,349" stroke="#a5684f" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M278,386 Q300,393 322,386" stroke="#7d4636" stroke-width="6" fill="none" stroke-linecap="round"/>
  ${o.casco ? `<path d="M198,266 C198,170 244,120 300,120 C356,120 402,170 402,266 Z" fill="#f2f4f6"/><path d="M300,120 C356,120 402,170 402,266 L330,266 C340,200 330,150 300,120 Z" fill="#c9ced5" opacity=".6"/>
  <path d="M288,123 L312,123 L316,264 L284,264 Z" fill="#dde1e6"/><path d="M178,262 Q300,242 422,262 L424,282 Q300,266 176,282 Z" fill="#e4e8ec"/><rect x="280" y="186" width="40" height="26" rx="7" fill="#2b2f36"/><circle cx="300" cy="199" r="8" fill="#ffe9a8"/>` : ''}
  ${o.gorro ? `<path d="M206,262 C200,170 246,128 300,128 C354,128 400,170 394,262 Z" fill="${o.gorro}"/><path d="M200,236 Q300,214 400,236 L402,270 Q300,250 198,270 Z" fill="#000" opacity=".3"/>
  <path d="M232,160 Q300,140 368,160" stroke="#fff" stroke-opacity=".08" stroke-width="10" fill="none"/>` : ''}
</svg>`;
}
