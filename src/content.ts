/**
 * Contenido del roadmap de Angry Axies (ES/EN).
 * Fuente de verdad del estado: docs/ESTADO-MAESTRO-ANGRY-AXIES.md del repo del juego.
 * Regla: el estado de cada hito se asciende solo con evidencia; nunca por inferencia.
 */
export type Lang = 'es' | 'en';
export type L = { es: string; en: string };

export type State = 'planned' | 'design' | 'building' | 'testnet' | 'live' | 'done' | 'blocked';

/** Peso de cada estado para el avance de cada fase (se calcula, no se escribe a mano). */
export const STATE_WEIGHT: Record<State, number> = {
  planned: 0,
  design: 10,
  building: 35,
  testnet: 65,
  live: 85,
  done: 100,
  blocked: 0,
};

export const STATE_LABEL: Record<State, L> = {
  planned: { es: 'Planeado', en: 'Planned' },
  design: { es: 'Diseñado', en: 'Designed' },
  building: { es: 'En desarrollo', en: 'In development' },
  testnet: { es: 'Probado en red de pruebas', en: 'Proven on test network' },
  live: { es: 'Publicado', en: 'Live' },
  done: { es: 'Verificado', en: 'Verified' },
  blocked: { es: 'Bloqueado por un tercero', en: 'Blocked by a third party' },
};

export type Milestone = { label: L; state: State; note?: L };
export type Tone = 'amber' | 'teal' | 'violet' | 'sky' | 'emerald' | 'rose';
export type Chapter = {
  id: number;
  badge: string;
  title: L;
  subtitle: L;
  tone: Tone;
  milestones: Milestone[];
};

export const UPDATED = '06/10/2026';
export const GAME_VERSION = '1.696';
export const GAME_URL = 'https://angryaxies.servehttp.com';
export const DISCORD_URL = 'https://discord.gg/xJV6UAV38c';
export const TELEGRAM_URL = 'https://t.me/AngryAxies';

export const CHAPTERS: Chapter[] = [
  {
    id: 0,
    badge: 'BASE',
    title: { es: 'El juego', en: 'The game' },
    subtitle: {
      es: 'Física real, castillos y honda: lo que ya se juega hoy en el navegador.',
      en: 'Real physics, castles and slingshots: what you can already play today in the browser.',
    },
    tone: 'amber',
    milestones: [
      { label: { es: 'Historia de 100 niveles', en: '100-level Story mode' }, state: 'live' },
      { label: { es: 'Última Bala e Historia Imposible', en: 'Last Shot and Impossible Story' }, state: 'live' },
      { label: { es: 'PvP 1 vs 1 online, contra bots y Solo', en: 'Online 1v1 PvP, vs bots and Solo' }, state: 'live', note: { es: 'Probado en producción con emulación; falta validar en dispositivos físicos.', en: 'Proven in production with emulation; physical-device validation pending.' } },
      { label: { es: 'Laboratorio de Axies (recetas y atributos por partes)', en: 'Axie Laboratory (recipes and per-part attributes)' }, state: 'live' },
      { label: { es: 'Cofres, memes, chat y ranking', en: 'Chests, memes, chat and ranking' }, state: 'live' },
      { label: { es: 'Cuatro idiomas: ES, EN, JA, FIL', en: 'Four languages: ES, EN, JA, FIL' }, state: 'live' },
      { label: { es: 'Navegador (PC y móvil en horizontal)', en: 'Browser (PC and mobile, landscape)' }, state: 'live' },
      { label: { es: 'Apps de Android e iPhone', en: 'Android and iPhone apps' }, state: 'live' },
    ],
  },
  {
    id: 1,
    badge: 'NFT',
    title: { es: 'NFT y beneficios en partida', en: 'NFTs and in-game benefits' },
    subtitle: {
      es: 'Siete tiers de arcos de madera, ocho rasgos ocultos y beneficios reales dentro del juego.',
      en: 'Seven tiers of wooden arches, eight hidden traits and real benefits inside the game.',
    },
    tone: 'teal',
    milestones: [
      { label: { es: 'Diseño y contorno físico de los siete arcos (T1–T7)', en: 'Art and physical outline of the seven arches (T1–T7)' }, state: 'live' },
      { label: { es: 'T1 y T2 como reclamos virtuales del juego', en: 'T1 and T2 as virtual in-game claims' }, state: 'live', note: { es: 'No son NFT en cadena; una conversión futura entrega solo su tier.', en: 'Not on-chain NFTs; a future conversion delivers only their tier.' } },
      { label: { es: 'Colección T3–T7 con ocho rasgos ocultos', en: 'T3–T7 collection with eight hidden traits' }, state: 'testnet', note: { es: 'Minteada y revelada de verdad en la red de pruebas de Ronin Mainnet.', en: 'Really minted and revealed on the Ronin Mainnet test environment.' } },
      { label: { es: 'Revelado verificable con Chainlink VRF', en: 'Verifiable reveal with Chainlink VRF' }, state: 'testnet' },
      { label: { es: 'Página externa de mint (sin wallet dentro del juego)', en: 'External mint page (no wallet inside the game)' }, state: 'testnet' },
      { label: { es: 'Vinculación cuenta ↔ wallet desde página externa', en: 'Account ↔ wallet linking from an external page' }, state: 'building' },
      { label: { es: 'Beneficios en partida con la regla del mejor valor por rasgo', en: 'In-game benefits using the best-value-per-trait rule' }, state: 'building', note: { es: 'Publicado en el servidor; falta la prueba con una cuenta real vinculada.', en: 'Deployed on the server; real linked-account test pending.' } },
    ],
  },
  {
    id: 2,
    badge: 'ANG',
    title: { es: 'Cofres NFT y token ANG', en: 'NFT chests and the ANG token' },
    subtitle: {
      es: 'El servidor sortea, el jugador firma una sola transacción y cobra ANG más premios del juego.',
      en: 'The server rolls, the player signs a single transaction and collects ANG plus in-game rewards.',
    },
    tone: 'violet',
    milestones: [
      { label: { es: 'Contratos ChestClaim y ANG (tope 100.000.000)', en: 'ChestClaim and ANG contracts (100,000,000 cap)' }, state: 'testnet' },
      { label: { es: 'Sorteo en servidor + firma EIP-712 + una transacción de reclamo', en: 'Server roll + EIP-712 signature + one claim transaction' }, state: 'testnet' },
      { label: { es: 'Premios del juego dentro del cofre NFT (oro, madera, piedra…) × tier', en: 'In-game rewards inside the NFT chest (gold, wood, stone…) × tier' }, state: 'testnet' },
      { label: { es: 'Página externa de cofres con ceremonia animada', en: 'External chests page with animated ceremony' }, state: 'testnet' },
      { label: { es: 'Registro en Proof of Distribution de Ronin', en: 'Registration in Ronin Proof of Distribution' }, state: 'live', note: { es: 'Contratos de reclamo y colección registrados en el perfil del builder.', en: 'Claim and collection contracts registered under the builder profile.' } },
      { label: { es: 'Saldo ANG en el menú del juego', en: 'ANG balance in the game menu' }, state: 'testnet', note: { es: 'Probado; a la espera del token oficial, terminadas las pruebas.', en: 'Tested; waiting for the official token once testing is finished.' } },
      { label: { es: 'Anti-abuso diario del lado del servidor', en: 'Server-side daily anti-abuse' }, state: 'building' },
      { label: { es: 'Logo de ANG en Ronin Wallet y explorador', en: 'ANG logo in Ronin Wallet and explorer' }, state: 'planned' },
    ],
  },
  {
    id: 3,
    badge: 'E2E',
    title: { es: 'Prueba integral en Ronin Mainnet', en: 'End-to-end test on Ronin Mainnet' },
    subtitle: {
      es: 'Un solo recorrido, de punta a punta, en un entorno de prueba descartable y sin listar en el Market.',
      en: 'One single run, end to end, on a disposable test environment not listed on the Market.',
    },
    tone: 'sky',
    milestones: [
      { label: { es: 'Mint desde la página externa', en: 'Mint from the external page' }, state: 'testnet' },
      { label: { es: 'Revelado de rasgos con VRF real', en: 'Trait reveal with real VRF' }, state: 'testnet' },
      { label: { es: 'Partida ganada → cofre asignado por el servidor', en: 'Won match → chest assigned by the server' }, state: 'testnet' },
      { label: { es: 'Reclamo del cofre y cobro de ANG en cadena', en: 'Chest claim and on-chain ANG payout' }, state: 'testnet' },
      { label: { es: 'Volver al juego y ver el premio una sola vez', en: 'Return to the game and see the reward exactly once' }, state: 'building' },
      { label: { es: 'Rechazo de firmas inválidas o vencidas', en: 'Rejection of invalid or expired signatures' }, state: 'building' },
      { label: { es: 'Detección de red o cuenta incorrectas', en: 'Detection of wrong network or account' }, state: 'building' },
      { label: { es: 'Protección contra reclamos duplicados y repetidos (replay)', en: 'Protection against duplicate and replayed claims' }, state: 'building' },
      { label: { es: 'Recuperación ante respuesta perdida o estado inconsistente', en: 'Recovery from a lost response or inconsistent state' }, state: 'building' },
      { label: { es: 'Recorrido completo con una cuenta real, de ida y vuelta', en: 'Full round trip with a real account' }, state: 'building' },
    ],
  },
  {
    id: 4,
    badge: 'VER',
    title: { es: 'Verificación autoritativa de partidas', en: 'Authoritative match verification' },
    subtitle: {
      es: 'Que el servidor pueda comprobar una partida, no solo creer lo que informa el cliente.',
      en: 'So the server can check a match instead of just trusting what the client reports.',
    },
    tone: 'emerald',
    milestones: [
      { label: { es: 'Progreso y ranking ordinarios (marcados como no verificados)', en: 'Ordinary progress and ranking (flagged as unverified)' }, state: 'live', note: { es: 'Hoy las partidas ordinarias llevan verified = false, a propósito.', en: 'Today ordinary matches carry verified = false, on purpose.' } },
      { label: { es: 'Motor de simulación de física y registro journalizado en SQLite', en: 'Physics simulation engine and journaled SQLite log' }, state: 'building' },
      { label: { es: 'Verificación de Historia', en: 'Story verification' }, state: 'building' },
      { label: { es: 'Verificación de PvP', en: 'PvP verification' }, state: 'building' },
      { label: { es: 'Verificación de Solo', en: 'Solo verification' }, state: 'building' },
      { label: { es: 'Verificación de partidas contra bots', en: 'Verification of bot matches' }, state: 'building' },
      { label: { es: 'Recuperación ante desconexiones y reinicios sin perder premios', en: 'Recovery from disconnects and restarts without losing rewards' }, state: 'building' },
      { label: { es: 'Rendimiento de los niveles más pesados dentro del presupuesto', en: 'Performance of the heaviest levels within budget' }, state: 'building' },
      { label: { es: 'Habilitar recompensas NFT solo con partida verificada', en: 'Enable NFT rewards only for verified matches' }, state: 'planned' },
    ],
  },
  {
    id: 5,
    badge: 'LAUNCH',
    title: { es: 'Lanzamiento oficial', en: 'Official launch' },
    subtitle: {
      es: 'Colección definitiva, venta pública y listado en Ronin Market, cuando las pruebas lo permitan.',
      en: 'Final collection, public sale and Ronin Market listing, once testing allows it.',
    },
    tone: 'rose',
    milestones: [
      { label: { es: 'Colección definitiva que reemplaza a la de pruebas', en: 'Final collection replacing the test one' }, state: 'planned' },
      { label: { es: 'Precio en RON fijado una sola vez por tier (≈ USD 25 a 1.000)', en: 'RON price fixed once per tier (≈ USD 25 to 1,000)' }, state: 'design' },
      { label: { es: 'Contrato de venta con revelado en lote (ballenas)', en: 'Sale contract with batch reveal (whales)' }, state: 'design' },
      { label: { es: 'Metadatos e imágenes en IPFS con dos pins independientes', en: 'Metadata and images on IPFS with two independent pins' }, state: 'design' },
      { label: { es: 'Auditoría independiente de contratos', en: 'Independent contract audit' }, state: 'planned' },
      { label: { es: 'Listado en Ronin Market', en: 'Ronin Market listing' }, state: 'planned', note: { es: 'No se lista hasta terminar las pruebas.', en: 'Not listed until testing is finished.' } },
      { label: { es: 'Validación en iPhone y Android físicos', en: 'Validation on physical iPhone and Android devices' }, state: 'planned' },
    ],
  },
  {
    id: 6,
    badge: 'ECO',
    title: { es: 'Economía ampliada', en: 'Expanded economy' },
    subtitle: {
      es: 'Más formas de usar ANG, sin prometer fechas hasta que cada pieza esté probada.',
      en: 'More ways to use ANG, with no dates promised until each piece is proven.',
    },
    tone: 'amber',
    milestones: [
      { label: { es: 'Mercado interno: vender objetos del juego por ANG', en: 'In-game market: sell game items for ANG' }, state: 'design' },
      { label: { es: 'Subastas de NFT nuevos pagadas solo con ANG', en: 'New-NFT auctions paid only in ANG' }, state: 'design' },
      { label: { es: 'VIP y torneos con premios de la tesorería', en: 'VIP and tournaments funded from the treasury' }, state: 'design' },
      { label: { es: 'Temporadas con presupuesto anunciado', en: 'Seasons with a published budget' }, state: 'design' },
      { label: { es: 'ANG en un exchange y liquidez', en: 'ANG on an exchange and liquidity' }, state: 'planned' },
    ],
  },
];

export function chapterProgress(ch: Chapter): number {
  const sum = ch.milestones.reduce((a, m) => a + STATE_WEIGHT[m.state], 0);
  return Math.round(sum / ch.milestones.length);
}

export function overallProgress(): number {
  const all = CHAPTERS.flatMap((c) => c.milestones);
  return Math.round(all.reduce((a, m) => a + STATE_WEIGHT[m.state], 0) / all.length);
}

/* ------------------------------------------------------------------ */
/* Documento NFT + ANG                                                 */
/* ------------------------------------------------------------------ */

export const MODES: { icon: string; title: L; text: L }[] = [
  { icon: 'story', title: { es: 'Historia · 100 niveles', en: 'Story · 100 levels' }, text: { es: 'Campaña con jefes, física por nivel y torres que caen en cadena.', en: 'Campaign with bosses, per-level physics and towers that collapse in chains.' } },
  { icon: 'pvp', title: { es: 'PvP 1 vs 1', en: '1v1 PvP' }, text: { es: 'Construí tu castillo, apuntá y soltá; el rival ve cada tiro reproducido igual.', en: 'Build your castle, aim and release; your rival sees every shot replayed identically.' } },
  { icon: 'bot', title: { es: 'Bots y Solo', en: 'Bots and Solo' }, text: { es: 'Bots claramente identificados, fantasmas de partidas reales y práctica libre.', en: 'Clearly labeled bots, ghosts of real matches and free practice.' } },
  { icon: 'lab', title: { es: 'Laboratorio de Axies', en: 'Axie Laboratory' }, text: { es: 'Combiná partes y familias: cada una cambia vida y resistencias.', en: 'Combine parts and families: each one changes health and resistances.' } },
  { icon: 'shot', title: { es: 'Última Bala e Imposible', en: 'Last Shot and Impossible' }, text: { es: 'Un solo tiro por encuentro, y una versión de la historia sin margen de error.', en: 'One shot per encounter, and a Story variant with no margin for error.' } },
  { icon: 'chest', title: { es: 'Cofres, memes y ranking', en: 'Chests, memes and ranking' }, text: { es: 'Premios por ganar, colección de memes y tablas semanales.', en: 'Rewards for winning, meme collection and weekly boards.' } },
];

export const TIER_ROWS: { tier: string; supply: string; price: L; kind: L }[] = [
  { tier: 'T1', supply: '5.000 + 5.000', price: { es: '—', en: '—' }, kind: { es: 'Virtual en el juego (+10 % madera, arco +50 % de vida)', en: 'Virtual in-game (+10% wood, arch +50% health)' } },
  { tier: 'T2', supply: '2.500 + 2.500', price: { es: '—', en: '—' }, kind: { es: 'Virtual en el juego (+30 % madera, arco +80 % de vida)', en: 'Virtual in-game (+30% wood, arch +80% health)' } },
  { tier: 'T3', supply: '1.500', price: { es: '≈ USD 25', en: '≈ USD 25' }, kind: { es: 'NFT en Ronin', en: 'NFT on Ronin' } },
  { tier: 'T4', supply: '700', price: { es: '≈ USD 50', en: '≈ USD 50' }, kind: { es: 'NFT en Ronin', en: 'NFT on Ronin' } },
  { tier: 'T5', supply: '300', price: { es: '≈ USD 100', en: '≈ USD 100' }, kind: { es: 'NFT en Ronin', en: 'NFT on Ronin' } },
  { tier: 'T6', supply: '100', price: { es: '≈ USD 500', en: '≈ USD 500' }, kind: { es: 'NFT en Ronin', en: 'NFT on Ronin' } },
  { tier: 'T7', supply: '20', price: { es: '≈ USD 1.000', en: '≈ USD 1,000' }, kind: { es: 'NFT en Ronin', en: 'NFT on Ronin' } },
];

export const TRAITS: { name: L; text: L }[] = [
  { name: { es: 'Vida del arco', en: 'Arch health' }, text: { es: 'Más resistencia de la estructura NFT.', en: 'More durability for the NFT structure.' } },
  { name: { es: 'Vida de la madera', en: 'Wood health' }, text: { es: 'Las piezas de madera aguantan más golpes.', en: 'Wooden pieces survive more hits.' } },
  { name: { es: 'Explosiones', en: 'Explosions' }, text: { es: 'Menos daño recibido por explosivos.', en: 'Less damage taken from explosives.' } },
  { name: { es: 'Dureza', en: 'Hardness' }, text: { es: 'Menos daño por impacto de los materiales.', en: 'Less impact damage to materials.' } },
  { name: { es: 'Daño', en: 'Damage' }, text: { es: 'Más daño de tus proyectiles.', en: 'More damage from your projectiles.' } },
  { name: { es: 'Recursos', en: 'Resources' }, text: { es: 'Más recursos ganados al jugar.', en: 'More resources earned while playing.' } },
  { name: { es: 'Suerte', en: 'Luck' }, text: { es: 'Mejor suerte en los tickets del juego.', en: 'Better luck on in-game tickets.' } },
  { name: { es: 'Meme de diamante', en: 'Diamond meme' }, text: { es: 'Más chance de meme en los cofres de diamante.', en: 'Better meme chance in diamond chests.' } },
];

export const CHEST_MULT: { tier: string; mult: string }[] = [
  { tier: 'T3', mult: '×1' },
  { tier: 'T4', mult: '×1,5' },
  { tier: 'T5', mult: '×2' },
  { tier: 'T6', mult: '×3' },
  { tier: 'T7', mult: '×4' },
];

export const CHEST_TYPES: { name: L; odds: string; factor: string }[] = [
  { name: { es: 'Carbón', en: 'Coal' }, odds: '45 %', factor: '×0,7' },
  { name: { es: 'Madera', en: 'Wood' }, odds: '30 %', factor: '×1' },
  { name: { es: 'Piedra', en: 'Stone' }, odds: '17 %', factor: '×1,6' },
  { name: { es: 'Ladrillo', en: 'Brick' }, odds: '6 %', factor: '×2,2' },
  { name: { es: 'Diamante', en: 'Diamond' }, odds: '2 %', factor: '×4' },
];

export const ANG_ROLL: { odds: string; range: L }[] = [
  { odds: '70 %', range: { es: '0,25 M a 0,75 M', en: '0.25 M to 0.75 M' } },
  { odds: '25 %', range: { es: '0,75 M a 1,25 M', en: '0.75 M to 1.25 M' } },
  { odds: '4 %', range: { es: '3 M a 7 M', en: '3 M to 7 M' } },
  { odds: '1 %', range: { es: '15 M a 25 M', en: '15 M to 25 M' } },
];

export type Step = { n: number; title: L; text: L; where: L; state: State };
export const CIRCUIT: Step[] = [
  { n: 1, title: { es: 'Cuenta y wallet', en: 'Account and wallet' }, text: { es: 'Vinculás tu cuenta del juego con tu wallet de Ronin.', en: 'You link your game account with your Ronin wallet.' }, where: { es: 'Discord / página externa', en: 'Discord / external page' }, state: 'building' },
  { n: 2, title: { es: 'Mint externo', en: 'External mint' }, text: { es: 'Elegís tier y comprás tu NFT; los ocho rasgos quedan ocultos.', en: 'You pick a tier and buy your NFT; the eight traits stay hidden.' }, where: { es: 'Página de mint', en: 'Mint page' }, state: 'testnet' },
  { n: 3, title: { es: 'VRF y revelado', en: 'VRF and reveal' }, text: { es: 'Un número aleatorio verificable define los rasgos; no se pueden deducir del número de serie.', en: 'A verifiable random number sets the traits; they cannot be deduced from the serial number.' }, where: { es: 'Página de mint', en: 'Mint page' }, state: 'testnet' },
  { n: 4, title: { es: 'Atributos → servidor', en: 'Attributes → server' }, text: { es: 'El servidor lee tu inventario finalizado y aplica la estructura y el mejor valor de cada rasgo.', en: 'The server reads your finalized inventory and applies the structure and the best value of each trait.' }, where: { es: 'Servidor → juego', en: 'Server → game' }, state: 'building' },
  { n: 5, title: { es: 'Partida', en: 'Match' }, text: { es: 'Jugás y ganás; el servidor guarda la partida.', en: 'You play and win; the server records the match.' }, where: { es: 'Juego', en: 'Game' }, state: 'testnet' },
  { n: 6, title: { es: 'Verificación', en: 'Verification' }, text: { es: 'El servidor comprueba que la partida sea válida antes de dar recompensas NFT. Hoy las partidas ordinarias llevan verified = false.', en: 'The server checks the match is valid before granting NFT rewards. Today ordinary matches carry verified = false.' }, where: { es: 'Servidor', en: 'Server' }, state: 'building' },
  { n: 7, title: { es: 'Cofre y premio', en: 'Chest and reward' }, text: { es: 'El servidor asigna los cofres y sortea el premio al pedir la firma; vos no elegís ni repetís el sorteo.', en: 'The server assigns the chests and rolls the prize when the signature is requested; you neither choose nor re-roll.' }, where: { es: 'Servidor', en: 'Server' }, state: 'testnet' },
  { n: 8, title: { es: 'Claim externo (EIP-712)', en: 'External claim (EIP-712)' }, text: { es: 'Tocás el cofre: se abre la página externa, firmás UNA transacción y cobrás.', en: 'You tap the chest: the external page opens, you sign ONE transaction and collect.' }, where: { es: 'Página de cofres', en: 'Chests page' }, state: 'testnet' },
  { n: 9, title: { es: 'Validación on-chain y vuelta', en: 'On-chain validation and return' }, text: { es: 'El servidor comprueba la cadena y el juego te muestra ANG, oro y materiales una sola vez.', en: 'The server checks the chain and the game shows you ANG, gold and materials exactly once.' }, where: { es: 'Servidor → juego', en: 'Server → game' }, state: 'building' },
];

export const LEGEND: State[] = ['planned', 'design', 'building', 'testnet', 'live', 'done'];
