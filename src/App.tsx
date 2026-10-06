import { useEffect, useMemo, useState } from 'react';
import {
  ExternalLink,
  Gamepad2,
  Swords,
  Bot,
  FlaskConical,
  Crosshair,
  Gift,
  BookOpen,
  Languages,
  ShieldCheck,
  Coins,
  KeyRound,
  Link2,
} from 'lucide-react';
import {
  ANG_ROLL,
  CHAPTERS,
  CHEST_MULT,
  CHEST_TYPES,
  CIRCUIT,
  DISCORD_URL,
  GAME_URL,
  GAME_VERSION,
  LEGEND,
  MODES,
  STATE_LABEL,
  TELEGRAM_URL,
  TIER_ROWS,
  TRAITS,
  UPDATED,
  chapterProgress,
  overallProgress,
  type Lang,
  type L,
  type State,
  type Tone,
} from './content';

const base = import.meta.env.BASE_URL;

const UI = {
  docTitle: { es: 'Angry Axies — Roadmap y sistema NFT/ANG', en: 'Angry Axies — Roadmap and NFT/ANG system' },
  metaDesc: {
    es: 'Hacer a Ronin grande otra vez. Roadmap de Angry Axies: juego, NFT, cofres, token ANG y verificación de partidas.',
    en: 'Make Ronin great again. Angry Axies roadmap: game, NFTs, chests, ANG token and match verification.',
  },
  pill: { es: 'Roadmap vivo', en: 'Live roadmap' },
  heroMission: {
    es: 'Hacer a Ronin grande otra vez.',
    en: 'Make Ronin great again.',
  },
  heroSub: {
    es: 'Angry Axies nació para traer diversión a Ronin, una economía sana y nuevos jugadores, bajando la fricción al máximo.',
    en: 'Angry Axies was born to bring fun to Ronin, a healthy economy and new players, cutting friction to the minimum.',
  },
  missionPill: { es: 'Nuestra misión', en: 'Our mission' },
  missionTitle: { es: 'Hacer a Ronin grande otra vez', en: 'Make Ronin great again' },
  missionLead: {
    es: 'Todo lo que construimos —el juego, los NFT, los cofres y el token ANG— apunta a lo mismo: que Ronin vuelva a tener un juego divertido que traiga jugadores nuevos y una economía que se sostenga.',
    en: 'Everything we build —the game, the NFTs, the chests and the ANG token— points at the same thing: Ronin getting a fun game again that brings in new players and an economy that sustains itself.',
  },
  pillars: [
    {
      b: { es: 'Diversión primero', en: 'Fun first' },
      t: { es: 'Física real, partidas cortas y castillos que se derrumban en cadena. Si no es divertido, nada de lo demás importa.', en: 'Real physics, short matches and castles that collapse in chains. If it is not fun, nothing else matters.' },
    },
    {
      b: { es: 'Economía sana', en: 'Healthy economy' },
      t: { es: 'Emisión limitada, premios que nacen de jugar y sin asignación inicial. Una economía pensada para durar, no para extraer.', en: 'Limited issuance, rewards that come from playing and no initial allocation. An economy built to last, not to extract.' },
    },
    {
      b: { es: 'Nuevos jugadores, cero fricción', en: 'New players, zero friction' },
      t: { es: 'Se juega gratis en el navegador, sin wallet y sin instalar nada. La blockchain es opcional y vive afuera del juego.', en: 'Play free in the browser, no wallet and nothing to install. The blockchain is optional and lives outside the game.' },
    },
  ],
  roadMission: {
    es: 'Cada fase apunta a la misma meta: hacer a Ronin grande otra vez.',
    en: 'Every phase points at the same goal: making Ronin great again.',
  },
  h1a: { es: 'Construí. Apuntá.', en: 'Build. Aim.' },
  h1b: { es: 'Destruí en la blockchain.', en: 'Destroy on the blockchain.' },
  heroP: {
    es: 'Angry Axies es un juego de honda y construcción con física real. Los NFT y el token ANG suman beneficios y premios, pero la blockchain nunca toca el juego: todo lo que firma tu wallet ocurre en páginas externas.',
    en: 'Angry Axies is a slingshot-and-building game with real physics. NFTs and the ANG token add benefits and rewards, but the blockchain never touches the game: everything your wallet signs happens on external pages.',
  },
  play: { es: 'Jugar ahora', en: 'Play now' },
  overall: { es: 'Avance total', en: 'Overall progress' },
  version: { es: 'Versión del juego', en: 'Game version' },
  network: { es: 'Entorno actual', en: 'Current environment' },
  networkV: { es: 'Ronin Mainnet · pruebas', en: 'Ronin Mainnet · testing' },
  updated: { es: 'Actualizado', en: 'Updated' },
  honesty: {
    es: 'El porcentaje es el estado interno de cada fase. Un hito se da por completo solo con implementación funcional y pruebas, no por un test aislado ni por una intención.',
    en: 'The percentage is the internal state of each phase. A milestone counts as complete only with a working implementation and tests, not on an isolated test or on intent.',
  },
  gameTitle: { es: 'El juego', en: 'The game' },
  gameSub: { es: 'Seis formas de jugar, todas en horizontal, en PC y celular.', en: 'Six ways to play, all in landscape, on PC and mobile.' },
  roadTitle: { es: 'Roadmap por fases', en: 'Roadmap by phase' },
  roadSub: {
    es: 'El porcentaje de cada fase se calcula con el estado de sus hitos. Sin fechas prometidas: cada pieza avanza cuando está probada.',
    en: 'Each phase percentage is computed from its milestones. No dates promised: each piece moves forward once it is proven.',
  },
  legend: { es: 'Cómo leer los estados', en: 'How to read the states' },
  docPill: { es: 'Documento · NFT y ANG', en: 'Document · NFT and ANG' },
  docTitle2: { es: 'Sistema NFT y token ANG', en: 'NFT and ANG token system' },
  docLead: {
    es: 'Qué se vende, qué da cada NFT dentro del juego y cómo se cobra el token. Las cifras de este documento son las vigentes en la red de pruebas; la colección definitiva puede ajustarlas antes del lanzamiento.',
    en: 'What is sold, what each NFT gives inside the game and how the token is collected. Figures here are the ones in force on the test network; the final collection may adjust them before launch.',
  },
  s1: { es: 'Colección y tiers', en: 'Collection and tiers' },
  s1p: {
    es: 'Siete tiers de arcos de madera. T1 y T2 son reclamos virtuales dentro del juego; T3 a T7 son NFT reales en Ronin, con un total de 2.620 cupos. Todos los NFT de la colección de prueba se compran por 0,001 RON; en la venta real el precio en RON de cada tier se fija una sola vez al crear el contrato, aproximado a su valor en dólares.',
    en: 'Seven tiers of wooden arches. T1 and T2 are virtual in-game claims; T3 to T7 are real NFTs on Ronin, with 2,620 slots in total. Every NFT of the test collection costs 0.001 RON; in the real sale each tier’s RON price is fixed once when the contract is created, approximating its dollar value.',
  },
  thTier: { es: 'Tier', en: 'Tier' },
  thSupply: { es: 'Cupos', en: 'Slots' },
  thPrice: { es: 'Valor objetivo', en: 'Target value' },
  thKind: { es: 'Naturaleza', en: 'Nature' },
  tierNote: {
    es: 'T1 y T2: cupos de venta + reserva del juego, sin emisión en cadena.',
    en: 'T1 and T2: sale slots + game reserve, no on-chain issuance.',
  },
  s2: { es: 'Ocho rasgos ocultos', en: 'Eight hidden traits' },
  s2p: {
    es: 'Al comprar, los rasgos están ocultos. Un número aleatorio verificable (Chainlink VRF) los revela y no pueden deducirse del número de serie. Cada rasgo vale de ★ a ★★★★★.',
    en: 'When you buy, the traits are hidden. A verifiable random number (Chainlink VRF) reveals them and they cannot be deduced from the serial number. Each trait is rated ★ to ★★★★★.',
  },
  s3: { es: 'Qué da un NFT dentro del juego', en: 'What an NFT gives inside the game' },
  s3a: { es: 'Una estructura, la mejor', en: 'One structure, the best one' },
  s3ap: {
    es: 'Podés construir con la estructura NFT del tier más alto que poseas. T6 + T7 habilita solo la T7; los duplicados no apilan estructuras.',
    en: 'You can build with the NFT structure of the highest tier you own. T6 + T7 enables only the T7; duplicates do not stack structures.',
  },
  s3b: { es: 'Rasgos: el mejor valor, nunca la suma', en: 'Traits: the best value, never the sum' },
  s3bp: {
    es: 'Para cada rasgo cuenta el mejor valor entre todos tus NFT revelados. Poseer más NFT no multiplica el beneficio de gameplay; sí da más cupos de cofre.',
    en: 'For each trait the best value among all your revealed NFTs counts. Owning more NFTs does not multiply the gameplay benefit; it does give more chest slots.',
  },
  s3ex: { es: 'Ejemplo de la regla del mejor valor', en: 'Best-value rule example' },
  s3exp: {
    es: 'NFT A → Daño ★★★★ · NFT B → Daño ★★★ · NFT C → Daño ★★★★★. Resultado aplicado: ★★★★★. Así todos tus NFT sirven, sin que la cantidad se vuelva ventaja acumulativa.',
    en: 'NFT A → Damage ★★★★ · NFT B → Damage ★★★ · NFT C → Damage ★★★★★. Applied result: ★★★★★. Every NFT stays useful, without quantity becoming a cumulative advantage.',
  },
  s3c: { es: 'Cofres: un cajón por tier', en: 'Chests: one drawer per tier' },
  s3cp: {
    es: 'Cada victoria da primero el cofre común y luego un cofre por cada tier distinto que tengas. Dos NFT del mismo tier dan un solo cofre de ese tier, pero suman cupos.',
    en: 'Each win gives the common chest first, then one chest per distinct tier you own. Two NFTs of the same tier give a single chest of that tier, but add slots.',
  },
  s3d: { es: 'Cupos y bloqueos', en: 'Slots and locks' },
  s3dp: {
    es: 'Cada NFT recibe hasta 10 cofres por ventana de 24 h; un cofre recibido consume un cupo, se abra o no. Si transferís un NFT directamente a otra wallet queda 72 h sin dar cofres; una venta comprobada en un mercado no activa ese bloqueo.',
    en: 'Each NFT receives up to 10 chests per 24-hour window; a received chest uses one slot whether you open it or not. If you transfer an NFT directly to another wallet it gives no chests for 72 h; a verified sale on a market does not trigger that lock.',
  },
  s4: { es: 'Premios del cofre NFT', en: 'NFT chest rewards' },
  s4p: {
    es: 'Un cofre NFT paga lo mismo que uno del juego (oro, madera, piedra, ladrillo, diamante, explosivos, memes) multiplicado según el tier, más ANG. El servidor sortea el premio al pedir la firma; el jugador no elige ni puede repetir el sorteo.',
    en: 'An NFT chest pays the same as an in-game one (gold, wood, stone, brick, diamond, explosives, memes) multiplied by tier, plus ANG. The server rolls the prize when the signature is requested; the player neither chooses nor can re-roll.',
  },
  thMult: { es: 'Premios del juego', en: 'Game rewards' },
  multNote: { es: 'Punto de partida, ajustable con las pruebas.', en: 'Starting point, adjustable with testing.' },
  thChest: { es: 'Tipo de cofre', en: 'Chest type' },
  thOdds: { es: 'Probabilidad', en: 'Probability' },
  thFactor: { es: 'Factor de ANG', en: 'ANG factor' },
  rollTitle: { es: 'Cantidad de ANG por cofre', en: 'ANG amount per chest' },
  rollP: {
    es: 'Se sortea una vez por cofre, con rango uniforme dentro de cada franja. M es el premio medio de ese tipo y tier; el promedio total es exactamente M.',
    en: 'Rolled once per chest, uniform within each band. M is the average prize for that type and tier; the overall average is exactly M.',
  },
  thRange: { es: 'Rango', en: 'Range' },
  s5: { es: 'El token ANG', en: 'The ANG token' },
  angCards: [
    { b: { es: 'Tope fijo: 100.000.000', en: 'Fixed cap: 100,000,000' }, t: { es: 'No existe emisión por encima del tope; el contrato lo impone.', en: 'No issuance above the cap; the contract enforces it.' } },
    { b: { es: 'Nace solo de los cofres', en: 'Born only from chests' }, t: { es: 'El único emisor es el contrato de reclamo. No hay premine ni emisión a tesorería.', en: 'The only minter is the claim contract. No premine and no issuance to treasury.' } },
    { b: { es: 'Una transacción por cofre', en: 'One transaction per chest' }, t: { es: 'El servidor firma el resultado y vos enviás UN reclamo. Límites actuales del contrato: 1.000 ANG por cofre y 100.000 por día por wallet; pueden ajustarse antes del lanzamiento si las pruebas económicas o de seguridad lo piden.', en: 'The server signs the result and you send ONE claim. Current contract limits: 1,000 ANG per chest and 100,000 per day per wallet; they may be adjusted before launch if economic or security testing requires it.' } },
    { b: { es: 'Sin asignación inicial', en: 'No initial allocation' }, t: { es: 'No hay tokens reservados para tesorería, equipo, inversores, venta privada ni airdrop inicial.', en: 'No tokens reserved for treasury, team, investors, private sale or an initial airdrop.' } },
    { b: { es: 'Cobrar un cofre no paga impuesto', en: 'Collecting a chest is tax-free' }, t: { es: 'El premio llega íntegro; el gas lo paga quien reclama.', en: 'The prize arrives in full; whoever claims pays the gas.' } },
  ],
  taxTitle: { es: 'Diseño económico confirmado, aún sin implementar', en: 'Confirmed economic design, not yet implemented' },
  taxP: {
    es: 'Para transferencias y pagos del token se prevé un impuesto general del 10 %: 3 % quema irreversible, 5 % tesorería del juego y 2 % desarrollo. El VIP usa su propio esquema (30 % quema, 50 % tesorería, 20 % desarrollo). Quedan exentos los premios de cofres, los premios de torneos, las devoluciones de subastas y las transferencias entre wallets. La tesorería financia torneos sin un porcentaje obligatorio.',
    en: 'For token transfers and payments a 10% general tax is planned: 3% irreversible burn, 5% game treasury and 2% development. VIP uses its own scheme (30% burn, 50% treasury, 20% development). Exempt: chest rewards, tournament prizes, auction refunds and wallet-to-wallet transfers. The treasury funds tournaments with no mandatory percentage.',
  },
  usesTitle: { es: 'Usos previstos de ANG', en: 'Planned uses of ANG' },
  uses: [
    { es: 'Mercado interno: intercambiar con otros jugadores por bienes transferibles.', en: 'In-game market: trade with other players for transferable goods.' },
    { es: 'Subastas de NFT nuevos: gana la puja más alta y se devuelve íntegro a los no ganadores.', en: 'New-NFT auctions: the highest bid wins and non-winners are fully refunded.' },
    { es: 'VIP: acceso a un torneo exclusivo con NFT para ganadores y ANG para participantes.', en: 'VIP: access to an exclusive tournament with NFTs for winners and ANG for participants.' },
  ],
  circuitTitle: { es: 'El recorrido completo', en: 'The full journey' },
  circuitP: {
    es: 'De la cuenta al premio, siete pasos. Cada paso de blockchain ocurre fuera del juego; el servidor comprueba la cadena y le entrega al juego el resultado.',
    en: 'From account to reward, seven steps. Every blockchain step happens outside the game; the server checks the chain and hands the result to the game.',
  },
  archLine: { es: 'Juego → Servidor → Portal web → Wallet → Blockchain', en: 'Game → Server → Web portal → Wallet → Blockchain' },
  archP: {
    es: 'El cliente del juego no ejecuta firmas, mint, reclamos directos, gestión de claves ni operaciones críticas on-chain. Esa separación mantiene el gameplay independiente de la blockchain y reduce la superficie de ataque.',
    en: 'The game client does not run signatures, mint, direct claims, key management or critical on-chain operations. That separation keeps gameplay independent from the blockchain and shrinks the attack surface.',
  },
  nextTitle: { es: 'Próximos hitos', en: 'Next milestones' },
  nextNow: { es: 'Prioridad crítica', en: 'Critical priority' },
  nextNowL: [
    { es: 'Finalizar la verificación de partidas.', en: 'Finish match verification.' },
    { es: 'Completar las pruebas de punta a punta.', en: 'Complete the end-to-end tests.' },
    { es: 'Aplicar por completo los atributos NFT en el servidor.', en: 'Fully apply NFT attributes on the server.' },
    { es: 'Cerrar el anti-abuso y validar recompensas en condiciones reales.', en: 'Close anti-abuse and validate rewards under real conditions.' },
    { es: 'Auditoría de contratos y lanzamiento de la colección.', en: 'Contract audit and collection launch.' },
  ],
  nextLater: { es: 'Después del lanzamiento', en: 'After launch' },
  nextLaterL: [
    { es: 'Mercado interno.', en: 'In-game market.' },
    { es: 'Torneos y VIP.', en: 'Tournaments and VIP.' },
    { es: 'Economía secundaria.', en: 'Secondary economy.' },
    { es: 'Subastas con ANG.', en: 'ANG auctions.' },
    { es: 'Temporadas.', en: 'Seasons.' },
    { es: 'Liquidez de ANG y expansión del ecosistema.', en: 'ANG liquidity and ecosystem expansion.' },
  ],
  ecoNote: {
    es: 'Estas funciones dependen del comportamiento real de la economía después del lanzamiento y no son compromisos de implementación.',
    en: 'These features depend on how the economy actually behaves after launch and are not implementation commitments.',
  },
  goal: { es: 'Jugar → competir → ganar → coleccionar → intercambiar', en: 'Play → compete → win → collect → trade' },
  goalP: {
    es: 'La prioridad es el juego. La blockchain es la infraestructura: una capa externa de propiedad, recompensas y economía.',
    en: 'The game comes first. The blockchain is infrastructure: an external layer of ownership, rewards and economy.',
  },
  safeTitle: { es: 'Qué nunca hace el juego', en: 'What the game never does' },
  safe: [
    { i: 'key', b: { es: 'Nunca te pide claves ni firmas', en: 'Never asks for keys or signatures' }, t: { es: 'El cliente del juego no conecta wallets, no envía transacciones ni consulta la cadena.', en: 'The game client does not connect wallets, send transactions or query the chain.' } },
    { i: 'link', b: { es: 'La wallet vive en páginas externas', en: 'The wallet lives on external pages' }, t: { es: 'Mint, firma, revelado y cobro se hacen desde Discord o páginas dedicadas; al volver, tu estado se recupera solo.', en: 'Mint, signing, reveal and payout are done from Discord or dedicated pages; when you return, your state recovers by itself.' } },
    { i: 'shield', b: { es: 'El equipo nunca vende ANG por mensaje', en: 'The team never sells ANG by DM' }, t: { es: 'Desconfiá de cualquiera que lo ofrezca. Las únicas fuentes son los cofres NFT y, más adelante, el mercado y un exchange.', en: 'Distrust anyone offering it. The only sources are NFT chests and, later, the market and an exchange.' } },
    { i: 'coins', b: { es: 'Hoy es un entorno de pruebas', en: 'Today is a test environment' }, t: { es: 'La colección y el token actuales son descartables y no están listados en el Market. Pueden reemplazarse antes del lanzamiento.', en: 'The current collection and token are disposable and not listed on the Market. They may be replaced before launch.' } },
  ],
  linksTitle: { es: 'Enlaces oficiales', en: 'Official links' },
  linkGame: { es: 'Jugar en el navegador', en: 'Play in the browser' },
  footer: {
    es: 'Este roadmap describe el estado real del proyecto y no constituye una promesa de rendimiento ni asesoramiento financiero. Los tokens y NFT de la red de pruebas no tienen valor garantizado.',
    en: 'This roadmap describes the real state of the project and is not a promise of returns or financial advice. Test-network tokens and NFTs carry no guaranteed value.',
  },
} as const;

const tx = (l: L, lang: Lang) => l[lang];

const TONE: Record<Tone, { bar: string; ring: string; text: string; glow: string }> = {
  amber: { bar: 'from-orange-500 to-amber-400', ring: 'ring-orange-400/30', text: 'text-orange-300', glow: 'from-orange-500/25' },
  teal: { bar: 'from-teal-400 to-emerald-400', ring: 'ring-teal-400/30', text: 'text-teal-300', glow: 'from-teal-500/25' },
  violet: { bar: 'from-violet-400 to-fuchsia-400', ring: 'ring-violet-400/30', text: 'text-violet-300', glow: 'from-violet-500/25' },
  sky: { bar: 'from-sky-400 to-cyan-300', ring: 'ring-sky-400/30', text: 'text-sky-300', glow: 'from-sky-500/25' },
  emerald: { bar: 'from-emerald-400 to-lime-300', ring: 'ring-emerald-400/30', text: 'text-emerald-300', glow: 'from-emerald-500/25' },
  rose: { bar: 'from-rose-400 to-orange-300', ring: 'ring-rose-400/30', text: 'text-rose-300', glow: 'from-rose-500/25' },
};

const STATE_STYLE: Record<State, string> = {
  planned: 'bg-zinc-700/40 text-zinc-300 ring-zinc-500/40',
  design: 'bg-sky-500/15 text-sky-200 ring-sky-400/35',
  building: 'bg-amber-500/15 text-amber-200 ring-amber-400/35',
  testnet: 'bg-violet-500/15 text-violet-200 ring-violet-400/35',
  live: 'bg-emerald-500/15 text-emerald-200 ring-emerald-400/35',
  done: 'bg-teal-400/20 text-teal-100 ring-teal-300/45',
  blocked: 'bg-rose-500/15 text-rose-200 ring-rose-400/35',
};

const MODE_ICON: Record<string, JSX.Element> = {
  story: <Gamepad2 className="h-5 w-5" />,
  pvp: <Swords className="h-5 w-5" />,
  bot: <Bot className="h-5 w-5" />,
  lab: <FlaskConical className="h-5 w-5" />,
  shot: <Crosshair className="h-5 w-5" />,
  chest: <Gift className="h-5 w-5" />,
};

const SAFE_ICON: Record<string, JSX.Element> = {
  key: <KeyRound className="h-5 w-5" />,
  link: <Link2 className="h-5 w-5" />,
  shield: <ShieldCheck className="h-5 w-5" />,
  coins: <Coins className="h-5 w-5" />,
};

function Chip({ state, lang }: { state: State; lang: Lang }) {
  return (
    <span className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 ${STATE_STYLE[state]}`}>
      {tx(STATE_LABEL[state], lang)}
    </span>
  );
}

function Bar({ value, tone }: { value: number; tone: Tone }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
      <div className={`h-full rounded-full bg-gradient-to-r ${TONE[tone].bar}`} style={{ width: `${Math.max(value, 2)}%` }} />
    </div>
  );
}

const card = 'rounded-2xl border border-zinc-600/40 bg-zinc-900/65 p-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.07)]';
const th = 'px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-400';

function SectionTitle({ n, children }: { n?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-zinc-600/35 pb-3">
      {n && <span className="font-mono text-sm font-bold text-teal-300">{n}</span>}
      <h3 className="text-lg font-extrabold tracking-tight text-white md:text-xl">{children}</h3>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      return localStorage.getItem('aa-roadmap-lang') === 'en' ? 'en' : 'es';
    } catch {
      return 'es';
    }
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = tx(UI.docTitle, lang);
    document.querySelector('meta[name="description"]')?.setAttribute('content', tx(UI.metaDesc, lang));
  }, [lang]);

  const toggle = () =>
    setLang((p) => {
      const next: Lang = p === 'es' ? 'en' : 'es';
      try {
        localStorage.setItem('aa-roadmap-lang', next);
      } catch {
        /* sin almacenamiento: la página sigue funcionando */
      }
      return next;
    });

  const overall = useMemo(() => overallProgress(), []);

  return (
    <div className="min-h-screen bg-[#070d12] text-slate-200 antialiased">
      <div className="pointer-events-none fixed inset-0 -z-0 bg-[radial-gradient(ellipse_at_top,rgba(20,184,166,0.12),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(249,115,22,0.08),transparent_50%)]" />

      <header className="sticky top-0 z-30 border-b border-zinc-700/50 bg-[#070d12]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <a href="#top" className="flex items-center gap-2 font-black tracking-tight text-white no-underline">
            <img src={`${base}img/ang-coin.webp`} alt="" className="h-7 w-7" />
            Angry Axies
          </a>
          <nav className="hidden items-center gap-5 text-sm text-slate-300 md:flex">
            <a className="hover:text-white" href="#mision">{tx(UI.missionPill, lang)}</a>
            <a className="hover:text-white" href="#juego">{tx(UI.gameTitle, lang)}</a>
            <a className="hover:text-white" href="#roadmap">Roadmap</a>
            <a className="hover:text-white" href="#documento-nft-ang">NFT · ANG</a>
            <a className="hover:text-white" href="#recorrido">{tx(UI.circuitTitle, lang)}</a>
          </nav>
          <button
            onClick={toggle}
            className="inline-flex items-center gap-2 rounded-full border border-teal-500/35 bg-teal-600/15 px-3 py-1.5 text-xs font-semibold text-teal-100 hover:bg-teal-500/25"
          >
            <Languages className="h-4 w-4" />
            {lang === 'es' ? 'English' : 'Español'}
          </button>
        </div>
      </header>

      <main id="top" className="relative z-10 mx-auto max-w-6xl px-4 pb-24">
        {/* HERO */}
        <section className="grid items-center gap-8 pt-12 md:grid-cols-2 md:pt-16">
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-400/25 bg-teal-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-100">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-300" />
              {tx(UI.pill, lang)}
            </span>
            <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-white md:text-6xl">
              {tx(UI.h1a, lang)}{' '}
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-teal-300 bg-clip-text text-transparent">
                {tx(UI.h1b, lang)}
              </span>
            </h1>
            <p className="text-lg font-extrabold tracking-tight text-teal-200 md:text-xl">{tx(UI.heroMission, lang)}</p>
            <p className="max-w-xl text-base leading-relaxed text-slate-200 md:text-lg">{tx(UI.heroSub, lang)}</p>
            <p className="max-w-xl text-sm leading-relaxed text-slate-400">{tx(UI.heroP, lang)}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={GAME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 px-5 py-2.5 text-sm font-extrabold text-zinc-950 no-underline shadow-[0_0_28px_rgba(249,115,22,0.35)] hover:brightness-110"
              >
                <Gamepad2 className="h-4 w-4" /> {tx(UI.play, lang)}
              </a>
              <a
                href="#documento-nft-ang"
                className="inline-flex items-center gap-2 rounded-xl border border-teal-500/40 bg-teal-600/15 px-5 py-2.5 text-sm font-bold text-teal-50 no-underline hover:bg-teal-500/25"
              >
                <BookOpen className="h-4 w-4" /> NFT · ANG
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-3 rounded-[1.6rem] bg-gradient-to-br from-orange-500/20 via-transparent to-teal-400/20 blur-2xl" />
            <img
              src={`${base}img/hero.webp`}
              alt="Angry Axies"
              className="relative w-full rounded-[1.35rem] border border-zinc-500/50 shadow-[0_24px_70px_-18px_rgba(0,0,0,0.8)]"
            />
          </div>
        </section>

        {/* STATS */}
        <section className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className={card}>
            <div className="text-[10px] uppercase tracking-widest text-slate-400">{tx(UI.overall, lang)}</div>
            <div className="mt-1 text-3xl font-black text-white">{overall}%</div>
            <div className="mt-2"><Bar value={overall} tone="teal" /></div>
          </div>
          <div className={card}>
            <div className="text-[10px] uppercase tracking-widest text-slate-400">{tx(UI.version, lang)}</div>
            <div className="mt-1 text-3xl font-black text-white">{GAME_VERSION}</div>
          </div>
          <div className={card}>
            <div className="text-[10px] uppercase tracking-widest text-slate-400">{tx(UI.network, lang)}</div>
            <div className="mt-1 text-lg font-extrabold text-white">{tx(UI.networkV, lang)}</div>
          </div>
          <div className={card}>
            <div className="text-[10px] uppercase tracking-widest text-slate-400">{tx(UI.updated, lang)}</div>
            <div className="mt-1 text-lg font-extrabold text-white">{UPDATED}</div>
          </div>
        </section>
        <p className="mt-4 text-sm text-slate-400">{tx(UI.honesty, lang)}</p>

        {/* MISION */}
        <section id="mision" className="relative mt-16 scroll-mt-24 overflow-hidden rounded-[1.35rem] border border-teal-500/30 bg-gradient-to-br from-zinc-900/95 via-[#0e1a1f] to-[#1f1a10] p-6 md:p-10">
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-orange-500/12 blur-[100px]" />
          <div className="relative max-w-3xl space-y-3">
            <span className="inline-flex items-center rounded-full border border-orange-500/25 bg-orange-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-100">
              {tx(UI.missionPill, lang)}
            </span>
            <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">{tx(UI.missionTitle, lang)}</h2>
            <p className="text-[15px] leading-relaxed text-slate-300 md:text-base">{tx(UI.missionLead, lang)}</p>
          </div>
          <div className="relative mt-8 grid gap-4 md:grid-cols-3">
            {UI.pillars.map((p, i) => (
              <div key={p.b.es} className={card}>
                <div className="font-mono text-sm font-bold text-orange-300">0{i + 1}</div>
                <div className="mt-1 text-base font-extrabold text-white">{tx(p.b, lang)}</div>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-300">{tx(p.t, lang)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* JUEGO */}
        <section id="juego" className="mt-16 scroll-mt-24">
          <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">{tx(UI.gameTitle, lang)}</h2>
          <p className="mt-2 text-slate-400">{tx(UI.gameSub, lang)}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MODES.map((m) => (
              <div key={m.icon} className={card}>
                <div className="flex items-center gap-2 font-bold text-white">
                  <span className="text-orange-300">{MODE_ICON[m.icon]}</span>
                  {tx(m.title, lang)}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{tx(m.text, lang)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ROADMAP */}
        <section id="roadmap" className="mt-20 scroll-mt-24">
          <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">{tx(UI.roadTitle, lang)}</h2>
          <p className="mt-2 max-w-3xl text-slate-400">{tx(UI.roadSub, lang)}</p>
          <p className="mt-2 max-w-3xl text-sm font-semibold text-teal-300">{tx(UI.roadMission, lang)}</p>

          <div className={`${card} mt-5`}>
            <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">{tx(UI.legend, lang)}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {LEGEND.map((s) => (<Chip key={s} state={s} lang={lang} />))}
            </div>
          </div>

          <div className="mt-8 space-y-6">
            {CHAPTERS.map((ch) => {
              const p = chapterProgress(ch);
              const tone = TONE[ch.tone];
              return (
                <article
                  key={ch.id}
                  className={`relative scroll-mt-20 overflow-hidden rounded-[1.35rem] border border-zinc-500/50 bg-gradient-to-br from-zinc-900/92 to-zinc-950/95 p-6 ring-1 ${tone.ring} md:p-8`}
                >
                  <div className={`pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br ${tone.glow} to-transparent blur-3xl`} />
                  <div className="relative">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <span className={`font-mono text-xs font-bold tracking-[0.25em] ${tone.text}`}>{ch.badge}</span>
                        <h3 className="mt-1 text-xl font-black tracking-tight text-white md:text-2xl">{tx(ch.title, lang)}</h3>
                        <p className="mt-1 max-w-2xl text-sm text-slate-400">{tx(ch.subtitle, lang)}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-black text-white">{p}%</div>
                      </div>
                    </div>
                    <div className="mt-4"><Bar value={p} tone={ch.tone} /></div>
                    <ul className="mt-5 divide-y divide-zinc-700/50">
                      {ch.milestones.map((m, i) => (
                        <li key={i} className="flex flex-col gap-1.5 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                          <div>
                            <div className="text-sm font-semibold text-slate-100">{tx(m.label, lang)}</div>
                            {m.note && <div className="mt-0.5 text-xs leading-relaxed text-slate-400">{tx(m.note, lang)}</div>}
                          </div>
                          <Chip state={m.state} lang={lang} />
                        </li>
                      ))}
                    </ul>
                    {ch.id === 6 && <p className="mt-3 text-xs italic text-slate-400">{tx(UI.ecoNote, lang)}</p>}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* DOCUMENTO NFT + ANG */}
        <section
          id="documento-nft-ang"
          className="relative mt-20 scroll-mt-24 overflow-hidden rounded-[1.35rem] border border-teal-500/30 bg-gradient-to-br from-zinc-900/95 via-[#0e1a1f] to-[#1a1424] p-6 md:p-10"
        >
          <div className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-teal-500/12 blur-[100px]" />
          <div className="relative max-w-3xl space-y-4">
            <span className="inline-flex items-center rounded-full border border-teal-500/25 bg-teal-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-100">
              {tx(UI.docPill, lang)}
            </span>
            <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">{tx(UI.docTitle2, lang)}</h2>
            <p className="text-[15px] leading-relaxed text-slate-300 md:text-base">{tx(UI.docLead, lang)}</p>
          </div>

          <div className="relative mt-12 space-y-14">
            {/* 1 tiers */}
            <div className="space-y-5">
              <SectionTitle n="1">{tx(UI.s1, lang)}</SectionTitle>
              <p className="max-w-3xl text-sm leading-relaxed text-slate-300">{tx(UI.s1p, lang)}</p>
              <div className="overflow-x-auto rounded-2xl border border-zinc-600/50 bg-zinc-950/50">
                <table className="w-full min-w-[520px] text-left text-[13px] text-slate-200">
                  <thead>
                    <tr className="border-b border-zinc-600/60 bg-zinc-900/85">
                      <th className={th}>{tx(UI.thTier, lang)}</th>
                      <th className={th}></th>
                      <th className={th}>{tx(UI.thSupply, lang)}</th>
                      <th className={th}>{tx(UI.thPrice, lang)}</th>
                      <th className={th}>{tx(UI.thKind, lang)}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-700/60">
                    {TIER_ROWS.map((r, i) => (
                      <tr key={r.tier} className="bg-zinc-950/40">
                        <td className="px-4 py-2 font-mono font-bold text-teal-200">{r.tier}</td>
                        <td className="px-2 py-1"><img src={`${base}img/arch-t${i + 1}.webp`} alt={`Arco ${r.tier}`} className="h-12 w-auto" loading="lazy" /></td>
                        <td className="px-4 py-2 font-mono text-white">{r.supply}</td>
                        <td className="px-4 py-2 font-mono text-slate-200">{tx(r.price, lang)}</td>
                        <td className="px-4 py-2 text-slate-300">{tx(r.kind, lang)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-500">{tx(UI.tierNote, lang)}</p>
            </div>

            {/* 2 rasgos */}
            <div className="space-y-5">
              <SectionTitle n="2">{tx(UI.s2, lang)}</SectionTitle>
              <p className="max-w-3xl text-sm leading-relaxed text-slate-300">{tx(UI.s2p, lang)}</p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {TRAITS.map((t) => (
                  <div key={t.name.es} className={card}>
                    <div className="text-sm font-extrabold text-white">{tx(t.name, lang)}</div>
                    <div className="mt-1 text-xs leading-relaxed text-slate-400">{tx(t.text, lang)}</div>
                    <div className="mt-2 text-sm tracking-widest text-amber-300">★★★☆☆</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3 beneficios */}
            <div className="space-y-5">
              <SectionTitle n="3">{tx(UI.s3, lang)}</SectionTitle>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  [UI.s3a, UI.s3ap],
                  [UI.s3b, UI.s3bp],
                  [UI.s3c, UI.s3cp],
                  [UI.s3d, UI.s3dp],
                ].map(([a, b]) => (
                  <div key={a.es} className={card}>
                    <div className="text-sm font-extrabold text-white">{tx(a, lang)}</div>
                    <p className="mt-2 text-[13px] leading-relaxed text-slate-300">{tx(b, lang)}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-amber-400/30 bg-amber-500/5 p-4">
                <div className="text-sm font-extrabold text-amber-100">{tx(UI.s3ex, lang)}</div>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-300">{tx(UI.s3exp, lang)}</p>
              </div>
            </div>

            {/* 4 cofres */}
            <div className="space-y-5">
              <SectionTitle n="4">{tx(UI.s4, lang)}</SectionTitle>
              <p className="max-w-3xl text-sm leading-relaxed text-slate-300">{tx(UI.s4p, lang)}</p>
              <div className="grid gap-5 lg:grid-cols-2">
                <div className="overflow-x-auto rounded-2xl border border-zinc-600/50 bg-zinc-950/50">
                  <table className="w-full text-left text-[13px] text-slate-200">
                    <thead>
                      <tr className="border-b border-zinc-600/60 bg-zinc-900/85">
                        <th className={th}>Tier</th><th className={th}></th><th className={th}>{tx(UI.thMult, lang)}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-700/60">
                      {CHEST_MULT.map((r, i) => (
                        <tr key={r.tier}>
                          <td className="px-4 py-2 font-mono font-bold text-teal-200">{r.tier}</td>
                          <td className="px-2 py-1"><img src={`${base}img/box-t${i + 3}.webp`} alt="" className="h-9 w-auto" loading="lazy" /></td>
                          <td className="px-4 py-2 font-mono text-white">{r.mult}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="px-4 pb-3 pt-2 text-xs text-slate-500">{tx(UI.multNote, lang)}</p>
                </div>
                <div className="overflow-x-auto rounded-2xl border border-zinc-600/50 bg-zinc-950/50">
                  <table className="w-full text-left text-[13px] text-slate-200">
                    <thead>
                      <tr className="border-b border-zinc-600/60 bg-zinc-900/85">
                        <th className={th}>{tx(UI.thChest, lang)}</th><th className={th}>{tx(UI.thOdds, lang)}</th><th className={th}>{tx(UI.thFactor, lang)}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-700/60">
                      {CHEST_TYPES.map((r) => (
                        <tr key={r.name.es}>
                          <td className="px-4 py-2 font-semibold text-white">{tx(r.name, lang)}</td>
                          <td className="px-4 py-2 font-mono">{r.odds}</td>
                          <td className="px-4 py-2 font-mono text-amber-200">{r.factor}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className={card}>
                <div className="text-sm font-extrabold text-white">{tx(UI.rollTitle, lang)}</div>
                <p className="mt-1 text-[13px] text-slate-300">{tx(UI.rollP, lang)}</p>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {ANG_ROLL.map((r) => (
                    <div key={r.odds} className="rounded-xl border border-zinc-600/40 bg-zinc-950/60 p-3 text-center">
                      <div className="text-xl font-black text-violet-300">{r.odds}</div>
                      <div className="mt-1 text-xs text-slate-300">{tx(r.range, lang)}</div>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-xs text-slate-500">{tx(UI.thRange, lang)}: M = {lang === 'es' ? 'premio medio' : 'average prize'}</p>
              </div>
            </div>

            {/* 5 ANG */}
            <div className="space-y-5">
              <SectionTitle n="5">{tx(UI.s5, lang)}</SectionTitle>
              <div className="flex items-center gap-4">
                <img src={`${base}img/ang-coin.webp`} alt="ANG" className="h-20 w-20 shrink-0" />
                <p className="text-sm text-slate-300">Angry Axies Token · <span className="font-mono text-amber-200">ANG</span></p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {UI.angCards.map((c) => (
                  <div key={c.b.es} className={card}>
                    <div className="text-sm font-extrabold text-white">{tx(c.b, lang)}</div>
                    <p className="mt-2 text-[13px] leading-relaxed text-slate-300">{tx(c.t, lang)}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-sky-400/30 bg-sky-500/5 p-4">
                <div className="text-sm font-extrabold text-sky-100">{tx(UI.taxTitle, lang)}</div>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-300">{tx(UI.taxP, lang)}</p>
              </div>
              <div className={card}>
                <div className="text-sm font-extrabold text-white">{tx(UI.usesTitle, lang)}</div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-[13px] text-slate-300">
                  {UI.uses.map((u) => (<li key={u.es}>{tx(u, lang)}</li>))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* RECORRIDO */}
        <section id="recorrido" className="mt-20 scroll-mt-24">
          <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">{tx(UI.circuitTitle, lang)}</h2>
          <p className="mt-2 max-w-3xl text-slate-400">{tx(UI.circuitP, lang)}</p>
          <div className="mt-6 rounded-2xl border border-teal-400/30 bg-teal-500/5 p-4">
            <div className="text-center font-mono text-sm font-bold text-teal-100 md:text-base">{tx(UI.archLine, lang)}</div>
            <p className="mt-2 text-center text-[13px] leading-relaxed text-slate-300">{tx(UI.archP, lang)}</p>
          </div>
          <ol className="mt-6 grid gap-4 md:grid-cols-2">
            {CIRCUIT.map((s) => (
              <li key={s.n} className={`${card} flex gap-4`}>
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-400 text-sm font-black text-zinc-950">{s.n}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="font-extrabold text-white">{tx(s.title, lang)}</div>
                    <Chip state={s.state} lang={lang} />
                  </div>
                  <p className="mt-1 text-[13px] leading-relaxed text-slate-300">{tx(s.text, lang)}</p>
                  <div className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-teal-300">{tx(s.where, lang)}</div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* SEGURIDAD */}
        <section className="mt-20">
          <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">{tx(UI.safeTitle, lang)}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {UI.safe.map((s) => (
              <div key={s.i} className={card}>
                <div className="flex items-center gap-2 font-bold text-white">
                  <span className="text-teal-300">{SAFE_ICON[s.i]}</span>
                  {tx(s.b, lang)}
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-300">{tx(s.t, lang)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PROXIMOS HITOS */}
        <section className="mt-20">
          <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">{tx(UI.nextTitle, lang)}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className={`${card} border-rose-400/30`}>
              <div className="text-sm font-extrabold text-rose-200">{tx(UI.nextNow, lang)}</div>
              <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-[13px] text-slate-300">
                {UI.nextNowL.map((u) => (<li key={u.es}>{tx(u, lang)}</li>))}
              </ol>
            </div>
            <div className={`${card} border-amber-400/30`}>
              <div className="text-sm font-extrabold text-amber-200">{tx(UI.nextLater, lang)}</div>
              <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-[13px] text-slate-300">
                {UI.nextLaterL.map((u) => (<li key={u.es}>{tx(u, lang)}</li>))}
              </ol>
            </div>
          </div>
          <div className="mt-8 rounded-2xl border border-teal-400/25 bg-gradient-to-r from-teal-500/10 to-orange-500/10 p-6 text-center">
            <div className="text-xl font-black text-white md:text-2xl">{tx(UI.goal, lang)}</div>
            <p className="mt-2 text-sm text-slate-300">{tx(UI.goalP, lang)}</p>
            <p className="mt-3 text-sm font-extrabold uppercase tracking-widest text-orange-300">{tx(UI.heroMission, lang)}</p>
          </div>
        </section>

        {/* ENLACES */}
        <section id="enlaces-oficiales" className="mt-20 scroll-mt-24">
          <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">{tx(UI.linksTitle, lang)}</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {[
              [tx(UI.linkGame, lang), GAME_URL],
              ['Discord', DISCORD_URL],
              ['Telegram', TELEGRAM_URL],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-500/50 bg-zinc-900/70 px-4 py-2.5 text-sm font-bold text-slate-100 no-underline hover:border-teal-400/50 hover:bg-zinc-800/80"
              >
                {label} <ExternalLink className="h-3.5 w-3.5 opacity-70" />
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-zinc-800 py-8">
        <p className="mx-auto max-w-6xl px-4 text-xs leading-relaxed text-slate-500">{tx(UI.footer, lang)}</p>
      </footer>
    </div>
  );
}
