/*
  Ilustraciones sencillas en SVG, dibujadas con líneas gruesas y alto contraste.
  No dependen de internet y escalan con el tamaño de letra.
*/
export type ClaveIlustracion =
  | "boton-encendido" | "raton" | "teclado" | "ventana" | "documento" | "imagen"
  | "guardar" | "carpeta" | "presentacion" | "celular" | "cable" | "whatsapp" | "alerta" | "ayuda";

const RIO = "#1D4E89";
const TINTA = "#1A1A1A";
const ARENA = "#F5F1E8";

const dibujos: Record<ClaveIlustracion, JSX.Element> = {
  "boton-encendido": (
    <>
      <rect x="20" y="30" width="200" height="120" rx="12" fill={ARENA} stroke={TINTA} strokeWidth="4" />
      <circle cx="120" cy="90" r="34" fill="#fff" stroke={RIO} strokeWidth="6" />
      <path d="M120 66 v22" stroke={RIO} strokeWidth="7" strokeLinecap="round" />
      <path d="M104 78 a22 22 0 1 0 32 0" fill="none" stroke={RIO} strokeWidth="7" strokeLinecap="round" />
    </>
  ),
  raton: (
    <>
      <path d="M120 30 c-40 0 -55 30 -55 70 v20 c0 30 25 50 55 50 s55 -20 55 -50 v-20 c0 -40 -15 -70 -55 -70z" fill="#fff" stroke={TINTA} strokeWidth="4" />
      <path d="M120 30 v60 M65 90 h110" stroke={TINTA} strokeWidth="4" />
      <path d="M65 40 c0 25 25 50 55 50 v-60 c-30 0 -55 5 -55 10z" fill={RIO} opacity="0.9" />
      <text x="40" y="22" fontSize="16" fontWeight="700" fill={RIO}>Izquierdo</text>
    </>
  ),
  teclado: (
    <>
      <rect x="10" y="40" width="220" height="110" rx="10" fill={ARENA} stroke={TINTA} strokeWidth="4" />
      {[0,1,2,3,4,5,6,7,8].map((i) => <rect key={i} x={22 + i * 22} y="52" width="18" height="18" rx="3" fill="#fff" stroke={TINTA} strokeWidth="2" />)}
      {[0,1,2,3,4,5,6,7].map((i) => <rect key={i} x={30 + i * 22} y="76" width="18" height="18" rx="3" fill="#fff" stroke={TINTA} strokeWidth="2" />)}
      <rect x="22" y="100" width="34" height="18" rx="3" fill={RIO} />
      <text x="26" y="113" fontSize="10" fontWeight="700" fill="#fff">Shift</text>
      <rect x="60" y="100" width="110" height="18" rx="3" fill={RIO} />
      <text x="90" y="113" fontSize="10" fontWeight="700" fill="#fff">Espacio</text>
      <rect x="176" y="76" width="40" height="42" rx="3" fill={RIO} />
      <text x="182" y="100" fontSize="10" fontWeight="700" fill="#fff">Enter</text>
    </>
  ),
  ventana: (
    <>
      <rect x="20" y="30" width="200" height="130" rx="8" fill="#fff" stroke={TINTA} strokeWidth="4" />
      <rect x="20" y="30" width="200" height="28" rx="8" fill={ARENA} stroke={TINTA} strokeWidth="4" />
      <path d="M148 44 h12" stroke={TINTA} strokeWidth="4" />
      <rect x="170" y="38" width="12" height="12" fill="none" stroke={TINTA} strokeWidth="3" />
      <path d="M196 38 l12 12 M208 38 l-12 12" stroke="#B00020" strokeWidth="4" />
    </>
  ),
  documento: (
    <>
      <path d="M60 20 h90 l40 40 v120 h-130z" fill="#fff" stroke={TINTA} strokeWidth="4" />
      <path d="M150 20 v40 h40" fill="none" stroke={TINTA} strokeWidth="4" />
      <rect x="78" y="80" width="80" height="12" rx="3" fill={RIO} />
      {[104,124,144].map((y) => <rect key={y} x="78" y={y} width="94" height="8" rx="3" fill={TINTA} opacity="0.5" />)}
    </>
  ),
  imagen: (
    <>
      <rect x="30" y="30" width="180" height="130" rx="8" fill="#fff" stroke={TINTA} strokeWidth="4" />
      <circle cx="80" cy="70" r="14" fill={RIO} />
      <path d="M40 150 l50 -50 l40 40 l30 -30 l40 40z" fill="#2E6B3A" />
    </>
  ),
  guardar: (
    <>
      <rect x="40" y="30" width="160" height="140" rx="10" fill={RIO} stroke={TINTA} strokeWidth="4" />
      <rect x="70" y="30" width="100" height="45" fill="#fff" stroke={TINTA} strokeWidth="4" />
      <rect x="70" y="110" width="100" height="60" rx="4" fill={ARENA} stroke={TINTA} strokeWidth="4" />
    </>
  ),
  carpeta: (
    <>
      <path d="M30 60 h60 l20 20 h100 v80 h-180z" fill="#F0C060" stroke={TINTA} strokeWidth="4" />
      <path d="M30 80 h180" stroke={TINTA} strokeWidth="4" />
    </>
  ),
  presentacion: (
    <>
      <rect x="20" y="30" width="200" height="110" rx="6" fill="#fff" stroke={TINTA} strokeWidth="4" />
      <rect x="40" y="50" width="120" height="16" rx="3" fill={RIO} />
      <rect x="40" y="80" width="90" height="8" rx="3" fill={TINTA} opacity="0.5" />
      <rect x="40" y="96" width="70" height="8" rx="3" fill={TINTA} opacity="0.5" />
      <path d="M120 140 v20 M90 160 h60" stroke={TINTA} strokeWidth="4" />
    </>
  ),
  celular: (
    <>
      <rect x="80" y="20" width="80" height="150" rx="14" fill="#fff" stroke={TINTA} strokeWidth="4" />
      <rect x="90" y="38" width="60" height="110" fill={ARENA} />
      <circle cx="120" cy="160" r="5" fill={TINTA} />
      <circle cx="120" cy="93" r="18" fill="none" stroke={RIO} strokeWidth="5" />
      <circle cx="120" cy="93" r="7" fill={RIO} />
    </>
  ),
  cable: (
    <>
      <rect x="20" y="40" width="70" height="120" rx="12" fill="#fff" stroke={TINTA} strokeWidth="4" />
      <rect x="140" y="30" width="90" height="130" rx="6" fill="#fff" stroke={TINTA} strokeWidth="4" />
      <path d="M90 100 c25 0 25 20 50 20" fill="none" stroke={RIO} strokeWidth="6" strokeLinecap="round" />
    </>
  ),
  whatsapp: (
    <>
      <circle cx="120" cy="95" r="62" fill="#2E6B3A" />
      <path d="M92 130 l-14 28 l30 -12" fill="#2E6B3A" />
      <path d="M100 80 c0 -8 8 -8 8 0 c0 8 6 20 16 24 c8 0 8 8 0 8 c-24 0 -24 -24 -24 -32z" fill="#fff" />
    </>
  ),
  alerta: (
    <>
      <path d="M120 25 l95 150 h-190z" fill="#FBEEDC" stroke="#8A5200" strokeWidth="5" strokeLinejoin="round" />
      <path d="M120 75 v50" stroke="#8A5200" strokeWidth="9" strokeLinecap="round" />
      <circle cx="120" cy="148" r="6" fill="#8A5200" />
    </>
  ),
  ayuda: (
    <>
      <circle cx="120" cy="95" r="62" fill={RIO} />
      <path d="M100 78 c0 -22 40 -22 40 0 c0 14 -20 14 -20 30" fill="none" stroke="#fff" strokeWidth="9" strokeLinecap="round" />
      <circle cx="120" cy="128" r="6" fill="#fff" />
    </>
  ),
};

export default function Ilustracion({ clave, titulo }: { clave: ClaveIlustracion; titulo?: string }) {
  return (
    <svg viewBox="0 0 240 190" role="img" aria-label={titulo ?? clave} className="w-full max-w-[18rem] h-auto">
      {dibujos[clave]}
    </svg>
  );
}
