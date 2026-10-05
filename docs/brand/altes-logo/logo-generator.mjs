import opentype from 'opentype.js';
import sharp from 'sharp';
import fs from 'fs';
const b = fs.readFileSync('Michroma.ttf'); const mich = opentype.parse(b.buffer.slice(b.byteOffset, b.byteOffset+b.byteLength));
const OUT = process.argv[2];
fs.mkdirSync(OUT, { recursive: true });

const C = { steel:'#1E2226', graphite:'#3A3F45', concrete:'#F2F3F4', white:'#FFFFFF', gold:'#D9A55B', goldText:'#8C6526' };

// Text als Pfad mit Laufweite (tracking in em)
function textPath(font, str, x, y, size, tracking=0){
  let cx = x, d = '';
  const scale = size / font.unitsPerEm;
  for (const ch of str){
    const g = font.charToGlyph(ch);
    d += g.getPath(cx, y, size).toPathData(2);
    cx += g.advanceWidth*scale + tracking*size;
  }
  return { d, width: cx - x - tracking*size };
}
function measure(font, str, size, tracking=0){ return textPath(font,str,0,0,size,tracking).width; }

// Bildmarke 64x64: Stahlportal, LED-Linie, Glas mit Bergsilhouette
function markFine(theme, ox=0, oy=0, s=1){
  const dark = theme==='dark';
  const steel = dark ? C.white : C.steel;
  const glass = dark ? 'rgba(255,255,255,0.12)' : '#E3E6E9';
  const mtn = dark ? 'rgba(255,255,255,0.5)' : '#5A6068';
  return `<g transform="translate(${ox} ${oy}) scale(${s})">
    <rect x="13" y="13" width="32" height="49" fill="${glass}"/>
    <path d="M13 62 L13 50 L17 46.5 L20.5 43 L23.5 47 L26 44.5 L29.5 39.5 L32.5 44 L35 42 L38.5 37.5 L42 43 L45 46 L45 62 Z" fill="${mtn}"/>
    <rect x="13" y="13" width="32" height="1.6" fill="${C.gold}"/>
    <rect x="2" y="8" width="54" height="5" fill="${steel}"/>
    <rect x="8" y="13" width="5" height="49" fill="${steel}"/>
    <rect x="45" y="13" width="5" height="49" fill="${steel}"/>
  </g>`;
}
function mark(theme, ox=0, oy=0, s=1){
  const dark = theme==='dark';
  const steel = dark ? C.white : C.steel;
  const glass = dark ? 'rgba(255,255,255,0.14)' : '#DDE1E4';
  const mtn = dark ? 'rgba(255,255,255,0.55)' : C.graphite;
  return `<g transform="translate(${ox} ${oy}) scale(${s})">
    <rect x="18" y="20" width="28" height="36" fill="${glass}"/>
    <path d="M18 56 L18 44 L24 36 L28 40 L33 31 L38 38 L41 35 L46 41 L46 56 Z" fill="${mtn}"/>
    <rect x="18" y="18" width="28" height="2.4" fill="${C.gold}"/>
    <rect x="4" y="9" width="56" height="9" fill="${steel}"/>
    <rect x="10" y="18" width="8" height="38" fill="${steel}"/>
    <rect x="46" y="18" width="8" height="38" fill="${steel}"/>
  </g>`;
}

function horizontal(theme){
  const dark = theme==='dark';
  const fg = dark ? C.white : C.steel;
  const sub = dark ? '#C9CDD1' : C.graphite;
  const x0 = 70;
  const beoSize = 40;
  const beo = textPath(mich, 'BEO', x0, 38, beoSize, 0.12);
  const subStr = 'STAHL & GLASBAU', subSize = 7.4;
  // Laufweite so wählen, dass Unterzeile exakt BEO-Breite erreicht oder überragt
  const lastE = mich.charToGlyph('O').getPath(0,0,beoSize).getBoundingBox();
  const vis0 = x0 + 3.75;
  const lineW = (beo.width - mich.charToGlyph('O').advanceWidth*beoSize/mich.unitsPerEm + lastE.x2) - 3.75;
  const base = measure(mich, subStr, subSize, 0);
  const sL = mich.charToGlyph('S').getPath(0,0,subSize).getBoundingBox().x1;
  const uG = mich.charToGlyph('U'); const uB = uG.getPath(0,0,subSize).getBoundingBox();
  const uRight = uG.advanceWidth*subSize/mich.unitsPerEm - uB.x2;
  const tr = (lineW + sL + uRight - base) / ((subStr.length-1)*subSize);
  const subP = textPath(mich, subStr, vis0 - sL, 62, subSize, tr);
  const W = Math.ceil(vis0 + lineW + 2), H = 66;
  return { W, H, svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W*3}" height="${H*3}" role="img" aria-labelledby="t"><title id="t">BEO Stahl &amp; Glasbau</title>
  ${markFine(theme)}
  <path d="${beo.d}" fill="${fg}"/>
  <rect x="${vis0}" y="45.5" width="${lineW.toFixed(2)}" height="1" fill="${C.gold}"/>
  <path d="${subP.d}" fill="${sub}"/>
</svg>` };
}

function markOnly(theme){
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 2 58 64" width="174" height="192" role="img" aria-labelledby="t"><title id="t">BEO Stahl &amp; Glasbau</title>${markFine(theme)}</svg>`;
}
function favicon(){
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="10" fill="${C.steel}"/>${mark('dark',6,8,52/64*1.0)}</svg>`.replace('scale(0.8125)','scale(0.8125)');
}

const files = {
  'logo.svg': horizontal('light').svg,
  'logo-inverse.svg': horizontal('dark').svg,
  'logo-mark.svg': markOnly('light'),
  'logo-mark-inverse.svg': markOnly('dark'),
  'favicon.svg': favicon(),
};
for (const [n,s] of Object.entries(files)) fs.writeFileSync(`${OUT}/${n}`, s);

// PNG-Ableitungen
await sharp(Buffer.from(files['favicon.svg'])).resize(180,180).png().toFile(`${OUT}/apple-touch-icon.png`);
await sharp(Buffer.from(files['favicon.svg'])).resize(512,512).png().toFile(`${OUT}/icon-512.png`);

// Vorschau-Tafel
const h1 = horizontal('light'), h2 = horizontal('dark');
const prev = `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="900" viewBox="0 0 1400 900">
<rect width="1400" height="450" fill="#FFFFFF"/><rect y="450" width="1400" height="450" fill="${C.steel}"/>
<g transform="translate(80 120) scale(3)">${h1.svg.replace(/<svg[^>]*>|<\/svg>|<title.*?<\/title>/g,'')}</g>
<g transform="translate(80 570) scale(3)">${h2.svg.replace(/<svg[^>]*>|<\/svg>|<title.*?<\/title>/g,'')}</g>
<g transform="translate(1180 140) scale(1.6)">${favicon().replace(/<svg[^>]*>|<\/svg>/g,'')}</g>
<g transform="translate(1180 600) scale(0.6)">${favicon().replace(/<svg[^>]*>|<\/svg>/g,'')}</g>
<g transform="translate(1260 600) scale(0.25)">${favicon().replace(/<svg[^>]*>|<\/svg>/g,'')}</g>
</svg>`;
await sharp(Buffer.from(prev)).png().toFile(process.argv[3]);
console.log('W,H', h1.W, h1.H);
