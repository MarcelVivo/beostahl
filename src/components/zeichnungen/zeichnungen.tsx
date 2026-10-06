/**
 * Schematische Konstruktionszeichnungen (nicht massstäblich).
 * Jede Funktion liefert die Grafik und benannte Ankerpunkte für die Hinweislinien.
 */
import {
  Auto, C, Fundament, GlasBand, Led, Linie, Pflanze, Poly, Rect, Schraube, SolarBand, Terrain, Text, Traeger, Tropfen, Wand,
  type Gezeichnet, type Ids,
} from './kit';

type Fn = (ids: Ids) => Gezeichnet;

/* ── Carport (Querschnitt Doppelcarport) ─────────────────────── */
const carport: Fn = (ids) => ({
  el: (
    <g>
      <Terrain ids={ids} />
      <Fundament ids={ids} x={100} />
      <Fundament ids={ids} x={390} />
      <Auto x={150} />
      <Auto x={272} />
      <Rect x={108} y={120} w={14} h={180} f={C.stahl} />
      <Rect x={398} y={120} w={14} h={180} f={C.stahl} />
      <Traeger a={[80, 106]} b={[444, 106]} d={14} />
      <SolarBand a={[76, 106]} b={[448, 106]} d={8} />
      <Rect x={102} y={116} w={26} h={10} f={C.stahlHell} />
      <Rect x={392} y={116} w={26} h={10} f={C.stahlHell} />
      <path d="M444,100 L444,116 L456,116 L456,100" fill="none" stroke={C.linie} strokeWidth={1.4} />
      <Linie a={[405, 128]} b={[405, 296]} s={C.wasser} w={1} dash="3 3" />
      <Led a={[130, 121]} b={[390, 121]} />
      <Rect x={412} y={204} w={12} h={26} f={C.kabel} />
      <circle cx={418} cy={212} r={2.4} fill={C.led} />
      <path d="M418,230 q0,22 -20,30" fill="none" stroke={C.kabel} strokeWidth={1.5} />
    </g>
  ),
  a: { solardach: [220, 102], traeger: [300, 113], stuetze: [115, 220], knoten: [115, 121], rinne: [450, 108], led: [260, 121], wallbox: [418, 217], fundament: [115, 316] },
});

/* ── Terrassenüberdachung (Schnitt, Hauswand rechts) ─────────── */
const terrasse = (solar: boolean): Fn => (ids) => ({
  el: (
    <g>
      <Terrain ids={ids} x1={30} x2={420} />
      <Wand ids={ids} x={420} y={30} w={50} h={284} />
      <Text x={445} y={24}>Hauswand</Text>
      <Fundament ids={ids} x={96} w={28} />
      <Rect x={124} y={160} w={290} h={138} f={C.glas} o={0.25} dash="4 4" />
      <Rect x={104} y={150} w={14} h={150} f={C.stahl} />
      <Traeger a={[94, 136]} b={[128, 136]} d={18} />
      {solar ? <SolarBand a={[96, 136]} b={[420, 106]} d={7} /> : <GlasBand a={[96, 136]} b={[420, 106]} d={6} />}
      <Traeger a={[100, 140]} b={[416, 111]} d={6} f={C.stahlHell} />
      <Rect x={410} y={100} w={10} h={24} f={C.stahlHell} />
      <Schraube x={415} y={112} />
      <path d="M88,128 L88,144 L96,144" fill="none" stroke={C.linie} strokeWidth={1.4} />
      <Tropfen x={92} y1={146} y2={170} />
      <Rect x={392} y={116} w={22} h={12} f={C.alu} />
      <Linie a={[392, 128]} b={[220, 145]} s={C.stoff} w={4} />
      <Led a={[96, 155]} b={[124, 155]} />
    </g>
  ),
  a: { dach: [260, 117], traeger: [112, 145], knoten: [111, 152], wand: [415, 112], stuetze: [111, 230], beschattung: [300, 137], led: [110, 155], rinne: [90, 140], seitenglas: [270, 230], fundament: [110, 315] },
});

/* ── Wintergarten (Schnitt, Hauswand rechts) ─────────────────── */
const wintergarten: Fn = (ids) => ({
  el: (
    <g>
      <Terrain ids={ids} x1={30} x2={420} />
      <Wand ids={ids} x={430} y={30} w={44} h={284} />
      <Text x={452} y={24}>Hauswand</Text>
      <Rect x={98} y={300} w={332} h={14} f={`url(#${ids.beton})`} />
      <Fundament ids={ids} x={98} y={314} w={26} h={20} />
      <GlasBand a={[98, 132]} b={[430, 100]} d={6} />
      <Traeger a={[102, 135]} b={[426, 104]} d={6} f={C.stahlHell} />
      <Rect x={104} y={136} w={14} h={164} f={C.stahl} />
      <Rect x={118} y={144} w={6} h={154} f={C.glas} />
      <Rect x={124} y={150} w={6} h={148} f={C.glas} />
      <Rect x={98} y={126} w={26} h={14} f={C.stahlHell} />
      <path d="M90,124 L90,138 L98,138" fill="none" stroke={C.linie} strokeWidth={1.4} />
      <Linie a={[404, 116]} b={[230, 133]} s={C.stoff} w={4} />
      <Rect x={404} y={110} w={22} h={10} f={C.alu} />
      <Led a={[140, 141]} b={[220, 133]} />
      <Rect x={350} y={250} w={36} h={50} f={C.stahl} />
      <Rect x={358} y={262} w={20} h={18} f="#2B2F36" />
      <path d="M368,278 q-6,-7 0,-14 q6,7 0,14" fill={C.led} />
      <Rect x={364} y={150} w={8} h={100} f={C.stahlHell} />
    </g>
  ),
  a: { dach: [270, 113], knoten: [111, 133], rahmen: [111, 220], schiebe: [124, 230], rinne: [93, 131], beschattung: [300, 125], led: [180, 137], ofen: [368, 270], fundament: [111, 324] },
});

/* ── Vordach (Schnitt, Hauswand rechts) ─────────────────────── */
const vordach = (solar: boolean): Fn => (ids) => ({
  el: (
    <g>
      <Terrain ids={ids} x1={30} x2={380} />
      <Wand ids={ids} x={380} y={30} w={44} h={284} />
      <Text x={402} y={24}>Hauswand</Text>
      <Rect x={374} y={190} w={6} h={110} f="#2B2F36" />
      <Text x={330} y={250}>Eingang</Text>
      <Linie a={[160, 122]} b={[376, 44]} s={C.linie} w={1.6} />
      <Rect x={370} y={36} w={10} h={16} f={C.stahlHell} />
      {solar ? <SolarBand a={[150, 122]} b={[380, 122]} d={7} /> : <GlasBand a={[150, 122]} b={[380, 122]} d={6} />}
      <Traeger a={[154, 122]} b={[380, 122]} d={10} />
      <Rect x={368} y={112} w={12} h={30} f={C.stahlHell} />
      <Schraube x={374} y={120} />
      <Schraube x={374} y={134} />
      <Linie a={[180, 128]} b={[372, 128]} s={C.kabel} w={1.2} dash="4 3" />
      <Led a={[170, 133]} b={[360, 133]} />
      <path d="M144,112 L144,126 L154,126" fill="none" stroke={C.linie} strokeWidth={1.4} />
      <Tropfen x={148} y1={128} y2={160} />
      <Rect x={340} y={133} w={12} h={8} f={C.kabel} />
      <circle cx={346} cy={142} r={3} fill={C.gummi} />
    </g>
  ),
  a: { dach: [250, 118], traeger: [260, 127], zugstange: [268, 83], konsole: [374, 127], kabel: [300, 128], led: [230, 133], rinne: [147, 120], kamera: [346, 140] },
});

/* ── Anbaubalkon (Schnitt, Hauswand rechts) ─────────────────── */
const anbaubalkon: Fn = (ids) => ({
  el: (
    <g>
      <Terrain ids={ids} x1={30} x2={420} />
      <Wand ids={ids} x={420} y={30} w={50} h={284} />
      <Text x={445} y={24}>Hauswand</Text>
      <Fundament ids={ids} x={93} w={26} />
      <Rect x={100} y={166} w={12} h={134} f={C.stahl} />
      <Traeger a={[88, 150]} b={[420, 150]} d={16} />
      <Rect x={88} y={140} w={332} h={10} f={C.belag} />
      <Rect x={92} y={70} w={6} h={72} f={C.glas} />
      <Rect x={88} y={136} w={14} h={6} f={C.alu} />
      <path d="M80,138 L80,152 L88,152" fill="none" stroke={C.linie} strokeWidth={1.4} />
      <Tropfen x={84} y1={154} y2={178} />
      <Rect x={96} y={160} w={20} h={12} f={C.stahlHell} />
      <Rect x={410} y={144} w={10} h={28} f={C.stahlHell} />
      <Schraube x={415} y={152} />
      <Schraube x={415} y={164} />
      <Led a={[124, 167]} b={[400, 167]} />
      <Linie a={[418, 236]} b={[340, 167]} s={C.stahlHell} w={5} dash="8 4" />
    </g>
  ),
  a: { boden: [260, 145], traeger: [250, 158], stuetze: [106, 235], fundament: [106, 316], gelaender: [95, 100], rinne: [83, 146], wand: [415, 158], knoten: [106, 166], led: [260, 167], konsole: [380, 202] },
});

/* ── Balkonanlage gestapelt (Seitenansicht) ─────────────────── */
const balkonanlage: Fn = (ids) => {
  const lv = [96, 176, 256];
  return {
    el: (
      <g>
        <Terrain ids={ids} x1={30} x2={420} />
        <Wand ids={ids} x={420} y={20} w={50} h={294} />
        <Text x={445} y={16}>Fassade</Text>
        <Fundament ids={ids} x={93} w={26} />
        <Rect x={100} y={60} w={12} h={240} f={C.stahl} />
        <Linie a={[106, 70]} b={[106, 296]} s={C.wasser} w={1} dash="3 3" />
        {lv.map((y) => (
          <g key={y}>
            <Traeger a={[88, y]} b={[420, y]} d={12} />
            <Rect x={88} y={y - 8} w={332} h={8} f={C.belag} />
            <Rect x={90} y={y - 52} w={5} h={46} f={C.glas} />
            <Rect x={96} y={y + 2} w={20} h={10} f={C.stahlHell} />
            <Rect x={410} y={y - 4} w={10} h={22} f={C.stahlHell} />
            <Schraube x={415} y={y + 6} />
          </g>
        ))}
      </g>
    ),
    a: { knoten: [106, 183], stapelung: [260, 182], glas: [92, 210], fassade: [415, 264], rinne: [106, 286], fundament: [106, 316] },
  };
};

/* ── Ganzglasgeländer (zwei Schnitte: Terrasse und Balkon) ──── */
const glasgelaender: Fn = (ids) => (
  {
    el: (
      <g>
        <Text x={130} y={24}>Montage auf der Platte</Text>
        <Rect x={40} y={220} w={180} h={40} f={`url(#${ids.beton})`} />
        <Rect x={40} y={212} w={180} h={8} f={C.belag} />
        <Rect x={76} y={180} w={26} h={34} f={C.alu} />
        <Rect x={86} y={60} w={7} h={140} f={C.glas} />
        <Led a={[78, 210]} b={[100, 210]} />
        <Rect x={80} y={52} w={20} h={10} f={C.edelstahl} dash="3 2" />
        <Schraube x={89} y={226} />
        <Text x={380} y={24}>Montage an der Stirnseite</Text>
        <Rect x={330} y={180} w={160} h={44} f={`url(#${ids.beton})`} />
        <Rect x={330} y={172} w={160} h={8} f={C.belag} />
        <Rect x={302} y={150} w={26} h={80} f={C.alu} />
        <Rect x={312} y={40} w={7} h={170} f={C.glas} />
        <Linie a={[328, 200]} b={[348, 200]} w={2.2} />
        <Schraube x={340} y={200} />
        <g transform="translate(372,252)">
          <Text x={40} y={0} size={10}>Ecke (Draufsicht)</Text>
          <path d="M10,60 L10,14 L70,14" fill="none" stroke={C.glas} strokeWidth={6} />
          <path d="M10,60 L10,14 L70,14" fill="none" stroke={C.linie} strokeWidth={0.7} />
          <Rect x={4} y={8} w={12} h={12} f={C.alu} />
        </g>
      </g>
    ),
    a: { glas: [89, 120], profil: [89, 194], led: [89, 210], terrasse: [150, 236], balkon: [315, 190], handlauf: [90, 56], ecke: [382, 272], befestigung: [340, 200] },
  }
);

/* ── Geländer (Ansicht) ─────────────────────────────────────── */
const gelaender: Fn = (ids) => {
  const pf = [80, 200, 320, 440];
  return {
    el: (
      <g>
        <Rect x={40} y={262} w={440} h={36} f={`url(#${ids.beton})`} />
        {pf.map((x) => (
          <g key={x}>
            <Rect x={x - 5} y={84} w={10} h={176} f={C.stahl} />
            <Rect x={x - 12} y={256} w={24} h={6} f={C.stahlHell} />
            <Schraube x={x - 7} y={259} r={1.6} />
            <Schraube x={x + 7} y={259} r={1.6} />
          </g>
        ))}
        <Rect x={64} y={72} w={392} h={12} f={C.holz} />
        <Rect x={75} y={232} w={370} h={6} f={C.stahl} />
        {pf.slice(0, 3).map((x, i) =>
          i === 1 ? (
            <Rect key={x} x={x + 8} y={98} w={104} h={128} f={C.glas} />
          ) : (
            <g key={x}>{Array.from({ length: 9 }, (_, k) => <Rect key={k} x={x + 14 + k * 11} y={92} w={4} h={140} f={C.stahlHell} />)}</g>
          ),
        )}
      </g>
    ),
    a: { handlauf: [260, 78], pfosten: [200, 170], fuellung: [130, 160], glas: [260, 160], befestigung: [320, 259], platte: [380, 280] },
  };
};

/* ── Treppe (Seitenansicht) ─────────────────────────────────── */
const treppe: Fn = (ids) => {
  const stufen = Array.from({ length: 10 }, (_, i) => i);
  return {
    el: (
      <g>
        <Terrain ids={ids} x1={30} x2={490} />
        <Fundament ids={ids} x={84} y={292} w={40} h={22} />
        <Poly pts={[[92, 300], [372, 112], [384, 122], [108, 306]]} f={C.stahl} />
        {stufen.map((i) => {
          const x = 108 + i * 27;
          const y = 280 - i * 18.4;
          return <Rect key={i} x={x} y={y} w={30} h={6} f={C.holz} />;
        })}
        <Rect x={372} y={104} w={110} h={12} f={C.stahl} />
        <Rect x={372} y={98} w={110} h={6} f={C.holz} />
        <Rect x={470} y={116} w={12} h={184} f={C.stahl} />
        <Fundament ids={ids} x={464} w={24} h={20} />
        {[120, 220, 320].map((x, i) => (
          <Linie key={x} a={[x, 262 - i * 68]} b={[x, 192 - i * 68]} s={C.stahlHell} w={3} />
        ))}
        <Linie a={[110, 196]} b={[372, 22]} s={C.stahlHell} w={4} />
        <Linie a={[372, 22]} b={[482, 22]} s={C.stahlHell} w={4} />
        <Linie a={[482, 22]} b={[482, 98]} s={C.stahlHell} w={3} />
      </g>
    ),
    a: { wange: [240, 214], stufen: [270, 166], podest: [430, 110], gelaender: [250, 104], anschluss: [104, 300], stuetze: [476, 220] },
  };
};

/* ── Stahlrahmen (Ansicht mit Knoten) ───────────────────────── */
const stahlrahmen: Fn = (ids) => ({
  el: (
    <g>
      <Terrain ids={ids} />
      <Fundament ids={ids} x={108} w={36} />
      <Fundament ids={ids} x={376} w={36} />
      <Rect x={116} y={92} w={20} h={204} f={C.stahl} />
      <Rect x={384} y={92} w={20} h={204} f={C.stahl} />
      <Traeger a={[116, 78]} b={[404, 78]} d={22} />
      <Poly pts={[[136, 100], [176, 100], [136, 136]]} f={C.stahl} />
      <Poly pts={[[384, 100], [344, 100], [384, 136]]} f={C.stahl} />
      <Rect x={134} y={84} w={6} h={56} f={C.stahlHell} />
      {[92, 104, 116, 128].map((y) => <Schraube key={y} x={137} y={y} r={1.8} />)}
      <Rect x={110} y={292} w={32} h={8} f={C.stahlHell} />
      <Rect x={378} y={292} w={32} h={8} f={C.stahlHell} />
      {[116, 136, 384, 404].map((x) => <Linie key={x} a={[x, 300]} b={[x, 326]} w={2} />)}
      <Linie a={[136, 150]} b={[384, 290]} s={C.stahlHell} w={3} dash="10 5" />
      <Linie a={[384, 150]} b={[136, 290]} s={C.stahlHell} w={3} dash="10 5" />
    </g>
  ),
  a: { stuetze: [126, 220], traeger: [260, 89], ecke: [137, 110], fussplatte: [126, 296], verband: [260, 220] },
});

/* ── Halle (Querschnitt) ────────────────────────────────────── */
const halle: Fn = (ids) => ({
  el: (
    <g>
      <Terrain ids={ids} x1={10} x2={510} />
      <Fundament ids={ids} x={84} w={30} />
      <Fundament ids={ids} x={426} w={30} />
      <Rect x={90} y={86} w={18} h={214} f={C.stahl} />
      <Rect x={432} y={86} w={18} h={214} f={C.stahl} />
      <Poly pts={[[90, 86], [270, 52], [450, 86], [450, 100], [270, 66], [90, 100]]} f={C.stahl} />
      <Poly pts={[[84, 80], [270, 44], [456, 80], [456, 86], [270, 50], [84, 86]]} f={C.alu} />
      <Traeger a={[20, 150]} b={[90, 150]} d={10} />
      <Linie a={[24, 150]} b={[90, 108]} s={C.stahlHell} w={2} />
      <Rect x={18} y={146} w={74} h={4} f={C.alu} />
      <Rect x={310} y={196} w={122} h={10} f={C.stahl} />
      <Rect x={316} y={206} w={8} h={94} f={C.stahl} />
      <Linie a={[310, 166]} b={[432, 166]} s={C.stahlHell} w={3} />
      {[316, 360, 404].map((x) => <Linie key={x} a={[x, 166]} b={[x, 196]} s={C.stahlHell} w={2.5} />)}
      <Poly pts={[[200, 300], [310, 198], [310, 208], [214, 300]]} f={C.stahlHell} />
      {Array.from({ length: 7 }, (_, i) => <Rect key={i} x={208 + i * 15} y={286 - i * 14} w={16} h={4} f={C.stahl} />)}
    </g>
  ),
  a: { rahmen: [99, 200], dach: [270, 49], vordach: [50, 151], plattform: [380, 201], treppe: [255, 250], fundament: [99, 316] },
});

/* ── Lärmschutzwand (Ansicht) ───────────────────────────────── */
const laermschutz = (pv: boolean): Fn => (ids) => {
  const pf = [60, 170, 280, 390, 470];
  return {
    el: (
      <g>
        <Terrain ids={ids} x1={20} x2={500} />
        {pf.map((x) => (
          <Fundament key={x} ids={ids} x={x - 12} w={24} h={26} />
        ))}
        {pf.slice(0, -1).map((x, i) => {
          const x2 = pf[i + 1];
          const w = x2 - x - 8;
          return (
            <g key={x}>
              {pv ? (
                <g>
                  <Rect x={x + 4} y={170} w={w} h={128} f={`url(#${ids.akustik})`} />
                  <Rect x={x + 4} y={70} w={w} h={98} f={C.modul} />
                  {Array.from({ length: Math.floor(w / 22) }, (_, k) => <Linie key={k} a={[x + 4 + (k + 1) * 22, 72]} b={[x + 4 + (k + 1) * 22, 166]} s={C.zelle} />)}
                  <Linie a={[x + 4, 119]} b={[x + 4 + w, 119]} s={C.zelle} />
                </g>
              ) : i === 1 ? (
                <g>
                  <Rect x={x + 4} y={150} w={w} h={148} f={C.holz} />
                  {Array.from({ length: 8 }, (_, k) => <Linie key={k} a={[x + 4, 160 + k * 17]} b={[x + 4 + w, 160 + k * 17]} s={C.holzMaser} />)}
                  <Rect x={x + 4} y={70} w={w} h={78} f={C.glas} />
                </g>
              ) : (
                <g>
                  <Rect x={x + 4} y={110} w={w} h={188} f={`url(#${ids.akustik})`} />
                  <Rect x={x + 4} y={70} w={w} h={38} f={C.glas} />
                </g>
              )}
            </g>
          );
        })}
        {pf.map((x) => (
          <Rect key={`p${x}`} x={x - 4} y={60} w={8} h={240} f={C.stahl} />
        ))}
        {!pv && [70, 130, 330, 420].map((x) => <Pflanze key={x} x={x} y={300} s={1.1} />)}
        {pv &&
          [0, 1, 2].map((k) => (
            <path key={k} d={`M${30 - k * 0},${240 - k * 26} q-14,-16 0,-32`} fill="none" stroke={C.hilfslinie} strokeWidth={1.4} transform={`translate(${-k * 8},${k * 16})`} />
          ))}
        {pv && (
          <g>
            <circle cx={470} cy={24} r={10} fill="none" stroke={C.led} strokeWidth={2} />
            {Array.from({ length: 8 }, (_, k) => {
              const ang = (k * Math.PI) / 4;
              return <Linie key={k} a={[470 + Math.cos(ang) * 14, 24 + Math.sin(ang) * 14]} b={[470 + Math.cos(ang) * 20, 24 + Math.sin(ang) * 20]} s={C.led} w={1.6} />;
            })}
          </g>
        )}
      </g>
    ),
    a: (pv
      ? { pv: [225, 118], akustik: [335, 230], pfosten: [390, 140], fundament: [280, 314], schall: [26, 210] }
      : { pfosten: [280, 200], akustik: [115, 220], holz: [225, 230], glas: [335, 90], begruenung: [130, 286], fundament: [390, 314] }) as Gezeichnet['a'],
  };
};

/* ── Sicht- und Windschutz (Ansicht) ────────────────────────── */
const sichtschutz: Fn = (ids) => {
  const pf = [70, 190, 310, 430];
  return {
    el: (
      <g>
        <Terrain ids={ids} x1={30} x2={490} />
        <Rect x={78} y={110} w={104} h={188} f={C.glas} o={0.85} />
        <Rect x={86} y={118} w={88} h={172} f="#fff" o={0.35} s="none" />
        <Rect x={198} y={110} w={104} h={188} f={C.alu} />
        {Array.from({ length: 9 }, (_, k) => <Rect key={k} x={320 + k * 11} y={110} w={7} h={188} f={C.holz} />)}
        {pf.map((x) => (
          <Rect key={x} x={x - 4} y={100} w={8} h={200} f={C.stahl} />
        ))}
        <Rect x={438} y={258} w={44} h={42} f={C.stahl} />
        <Pflanze x={460} y={258} s={1.5} />
      </g>
    ),
    a: { glas: [130, 200], metall: [250, 200], holz: [370, 200], pfosten: [190, 140], pflanze: [460, 236], fundament: [70, 300] },
  };
};

/* ── Solar als Bauteil (Hausansicht) ────────────────────────── */
const solarHaus: Fn = (ids) => ({
  el: (
    <g>
      <Terrain ids={ids} x1={10} x2={510} />
      <Rect x={190} y={110} w={170} h={190} f="#F4F5F6" />
      <Rect x={186} y={102} w={178} h={10} f={C.stahl} />
      <SolarBand a={[206, 186]} b={[344, 186]} d={60} />
      <Rect x={252} y={232} w={26} h={68} f="#2B2F36" />
      <Traeger a={[236, 222]} b={[296, 222]} d={5} />
      <SolarBand a={[236, 222]} b={[296, 222]} d={4} />
      <Rect x={30} y={190} w={8} h={110} f={C.stahl} />
      <Rect x={160} y={190} w={8} h={110} f={C.stahl} />
      <SolarBand a={[24, 190]} b={[176, 190]} d={8} />
      <Auto x={44} w={104} />
      <Traeger a={[360, 188]} b={[460, 196]} d={5} f={C.stahlHell} />
      <SolarBand a={[360, 188]} b={[460, 196]} d={5} />
      <Rect x={450} y={196} w={8} h={104} f={C.stahl} />
      <Rect x={472} y={238} w={30} h={62} f={`url(#${ids.akustik})`} />
      <SolarBand a={[472, 238]} b={[502, 238]} d={22} />
    </g>
  ),
  a: { carport: [100, 186], fassade: [275, 156], vordach: [266, 219], terrasse: [410, 189], laerm: [487, 226] },
});

/* ── Sonderkonstruktion: freitragendes Dach am Mast ─────────── */
const sonder: Fn = (ids) => ({
  el: (
    <g>
      <Terrain ids={ids} />
      <Fundament ids={ids} x={242} w={36} h={30} />
      <Rect x={252} y={40} w={16} h={260} f={C.stahl} />
      <Traeger a={[90, 150]} b={[430, 150]} d={10} />
      <GlasBand a={[86, 150]} b={[434, 150]} d={6} />
      <Linie a={[260, 46]} b={[96, 150]} w={1.6} />
      <Linie a={[260, 46]} b={[424, 150]} w={1.6} />
      <Linie a={[260, 46]} b={[176, 150]} w={1.2} />
      <Linie a={[260, 46]} b={[344, 150]} w={1.2} />
      <Rect x={248} y={140} w={24} h={26} f={C.stahlHell} />
    </g>
  ),
  a: { mast: [260, 230], kragarm: [150, 155], zug: [180, 100], glas: [380, 146], knoten: [260, 153], fundament: [260, 316] },
});

/* ── Renovation: Bestand und Erweiterung ────────────────────── */
const renovation: Fn = (ids) => ({
  el: (
    <g>
      <Terrain ids={ids} x1={30} x2={430} />
      <Wand ids={ids} x={430} y={30} w={44} h={284} />
      <Text x={452} y={24}>Bestand</Text>
      <Rect x={300} y={140} w={130} h={22} f={`url(#${ids.beton})`} />
      <Rect x={300} y={162} w={130} h={8} f={C.stahlHell} />
      <Schraube x={330} y={166} r={1.8} />
      <Schraube x={390} y={166} r={1.8} />
      <Traeger a={[120, 146]} b={[300, 146]} d={16} />
      <Rect x={120} y={136} w={180} h={10} f={C.belag} />
      <Rect x={124} y={162} w={12} h={138} f={C.stahl} />
      <Fundament ids={ids} x={118} w={24} />
      <Rect x={114} y={66} w={7} h={72} f={C.modul} />
      <Rect x={114} y={30} w={7} h={34} f={C.glas} />
      <Text x={210} y={128}>Erweiterung</Text>
    </g>
  ),
  a: { bestand: [380, 150], verstaerkung: [360, 166], erweiterung: [210, 154], gelaender: [118, 46], solar: [118, 100], stuetze: [130, 230] },
});


/* ── Aussenküche mit Pizzaofen unter Terrassenüberdachung ───── */
const aussenkueche: Fn = (ids) => ({
  el: (
    <g>
      <Terrain ids={ids} x1={30} x2={420} />
      <Wand ids={ids} x={420} y={30} w={50} h={284} />
      <Text x={445} y={24}>Hauswand</Text>
      <Rect x={150} y={288} w={240} h={12} f={`url(#${ids.beton})`} />
      <Fundament ids={ids} x={96} w={28} />
      <Rect x={104} y={136} w={14} h={164} f={C.stahl} />
      <GlasBand a={[96, 128]} b={[420, 98]} d={6} />
      <Traeger a={[100, 132]} b={[416, 103]} d={6} f={C.stahlHell} />
      <Rect x={410} y={92} w={10} h={24} f={C.stahlHell} />
      <Schraube x={415} y={104} />
      <Rect x={170} y={214} w={200} h={74} f={C.stahl} />
      <Rect x={176} y={222} w={60} h={60} f="#2B2F36" />
      {[0, 1, 2, 3].map((k) => <Rect key={k} x={182 + k * 13} y={232} w={8} h={44} f="#3A3F45" />)}
      <Rect x={244} y={222} w={58} h={60} f="#2B2F36" />
      <Rect x={310} y={222} w={54} h={60} f="#2B2F36" />
      <Rect x={164} y={206} w={212} h={8} f={C.edelstahl} />
      <path d="M248,206 L248,186 Q248,150 286,150 Q324,150 324,186 L324,206 Z" fill="#B23A2B" stroke={C.linie} strokeWidth={0.7} />
      <path d="M268,206 L268,192 Q268,180 286,180 Q304,180 304,192 L304,206 Z" fill="#1E2226" />
      <path d="M276,204 q4,-14 10,-6 q6,-12 10,6 Z" fill={C.led} />
      <Rect x={280} y={88} w={12} h={64} f={C.edelstahl} />
      <Rect x={274} y={78} w={24} h={10} f={C.edelstahl} />
      <Rect x={272} y={100} w={28} h={8} f={C.belag} />
      <path d="M340,206 q6,-10 0,-18 q-6,8 0,18" fill="none" stroke={C.hilfslinie} strokeWidth={1} />
      <Linie a={[364, 280]} b={[420, 280]} s="#C8A23A" w={2} dash="6 3" />
      <Text x={392} y={274} size={9}>Gas</Text>
    </g>
  ),
  a: { dach: [200, 122], stuetze: [111, 230], ofen: [300, 172], rauchrohr: [286, 120], durchfuehrung: [286, 104], arbeitsplatte: [200, 210], unterbau: [340, 250], holzlager: [206, 252], anschluss: [400, 280], fundament: [270, 294] },
});

export const ZEICHNUNGEN = {
  aussenkueche,
  carport,
  terrasse: terrasse(false),
  terrasseSolar: terrasse(true),
  wintergarten,
  vordach: vordach(false),
  vordachSolar: vordach(true),
  anbaubalkon,
  balkonanlage,
  glasgelaender,
  gelaender,
  treppe,
  stahlrahmen,
  halle,
  laermschutz: laermschutz(false),
  laermschutzPv: laermschutz(true),
  sichtschutz,
  solarHaus,
  sonder,
  renovation,
} satisfies Record<string, Fn>;

export type ZeichnungKey = keyof typeof ZEICHNUNGEN;
