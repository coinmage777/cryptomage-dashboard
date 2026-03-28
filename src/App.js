import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight, Play, TrendingUp, Layers, Brain, MessageCircle, BarChart3, Sparkles, ArrowUpRight, Target, X, Activity, Cpu, Globe, ChevronDown, Star, Timer, AlertTriangle, CircleDot, Rocket, Code2, Bot, Terminal, Hash, ArrowRight } from 'lucide-react';

/* ═══════════════════════════════════════════════════════ */
/*  LIVE OPERATIONS DATA                                  */
/* ═══════════════════════════════════════════════════════ */

const BOTS = [
  { name: "Perp DEX Pair Trader", status: "running", exchanges: 12, pairs: "ETH/SOL", leverage: "15x", desc: "16개 DEX 동시 페어트레이딩", uptime: "99.2%" },
  { name: "Polymarket Bot", status: "running", exchanges: 1, pairs: "예측마켓", leverage: "-", desc: "자동 예측 베팅", uptime: "97.8%" },
  { name: "MM Bot", status: "standby", exchanges: 2, pairs: "BTC/ETH", leverage: "5x", desc: "마켓메이킹 스프레드 수익", uptime: "-" },
];

const DEADLINES = [
  { name: "EdgeX TGE", date: "2026-03-31", icon: "🔥", urgent: true },
  { name: "Ethereal S5 마감", date: "2026-03-31", icon: "⏰", urgent: true },
  { name: "Nado S1 마감", date: "2026-05-18", icon: "📅", urgent: false },
  { name: "GRVT S2 마감", date: "2026-06-30", icon: "📅", urgent: false },
];

const FARMING = [
  { name: "Hyperliquid", progress: 71, value: "$1K-5K", status: "봇 24/7", tasks: "5/7" },
  { name: "Nado", progress: 67, value: "$500-2K", status: "봇 24/7", tasks: "4/6" },
  { name: "Ethereal", progress: 100, value: "$200-800", status: "봇 활성", tasks: "4/4" },
  { name: "GRVT", progress: 60, value: "$300-1K", status: "재가동 필요", tasks: "3/5" },
];

const BOT_EXCHANGES = [
  "Hyperliquid","Lighter","Paradex","EdgeX","Backpack","GRVT",
  "Nado","Hotstuff","Bulk","StandX","TreadFi","Pacifica"
];

const VIBE_VIDS = [
  { t: "AI한테 시켜서 16개 DEX 동시 자동매매 봇", v: "1.3K", tag: "봇" },
  { t: "바이브코딩으로 Nado 자동매매", v: "702", tag: "봇" },
  { t: "GRVT 자동매매 봇 만들기", v: "438", tag: "봇" },
  { t: "Claude로 리서치 보고서 자동화", v: "3.1K", tag: "AI" },
  { t: "AI 이미지 ComfyUI 완전정복", v: "6.5K", tag: "AI" },
  { t: "AI로 클로 뽑기 게임 만들기", v: "10K", tag: "AI" },
];

/* ═══════════════════════════════════════════════════════ */
/*  PROJECT DATA                                          */
/* ═══════════════════════════════════════════════════════ */

const TIER1 = [
  {id:1,n:"GRVT",cat:"PerpDEX",ch:"zkSync",st:"진행중",diff:"보통",rw:"중형~대형",fund:"$47.2M",dist:"28%",tge:"Q3 2026",desc:"ZKsync L2 하이브리드 거래소. 예치만으로 연 10% + 포인트 파밍. S2 배분 18%.",strat:"거래량 축적 + 포인트 파밍. 봇 자동화.",lk:"https://grvt.io",vids:5},
  {id:2,n:"Nado",cat:"PerpDEX",ch:"Ink (Kraken)",st:"진행중",diff:"보통",rw:"대형",fund:"Kraken",dist:"$INK 확정",tge:"Jul-Sep 2026",desc:"Kraken Ink L2 Perp DEX. 크로스마진, 통합증거금. $INK 에어드랍 확정.",strat:"USDC/kBTC Perp 거래. NLP 예치.",lk:"https://nado.xyz",vids:2},
  {id:3,n:"Variational",cat:"PerpDEX",ch:"Multi",st:"진행중",diff:"쉬움",rw:"대형",fund:"$11.8M",dist:"50%",tge:"미정",desc:"500+ 페어 Perp DEX. 커뮤니티 50% 역대 최고. 0% 수수료 + 손실 환급.",strat:"Perp 거래 + 레퍼럴. 무수수료라 부담 0.",lk:"https://variational.io",vids:1},
  {id:4,n:"Extended",cat:"PerpDEX",ch:"Multi",st:"진행중",diff:"보통",rw:"대형",fund:"$6.5M",dist:"30% 확정",tge:"Q2 2026",desc:"주식/금/SPX 포함 Perp 거래. XVS 예치 추가 수익. 30% 확정 배분.",strat:"Perp 거래 + XVS 예치.",lk:"https://extended.exchange",vids:1},
  {id:5,n:"Glider",cat:"DeFi",ch:"Multi",st:"진행중",diff:"쉬움",rw:"대형",fund:"a16z, Coinbase",dist:"미정",tge:"미정",desc:"AI 기반 DeFi 수익 최적화. a16z + Coinbase + Uniswap 삼중 백업.",strat:"예치 + 포인트 적립. AI 자동 최적화.",lk:"https://glider.fi",vids:1},
  {id:6,n:"Polymarket",cat:"예측시장",ch:"Polygon",st:"확인됨",diff:"보통",rw:"대형",fund:"$74M+",dist:"33.3%",tge:"미정",desc:"세계 최대 예측 시장. CMO가 에어드랍 공식 확인. $74M 1차 에어드랍 완료.",strat:"예측 마켓 베팅. 주간 활성 거래.",lk:"https://polymarket.com",vids:1},
  {id:7,n:"Base",cat:"L2",ch:"Base",st:"예상",diff:"보통",rw:"대형",fund:"Coinbase",dist:"20-25%",tge:"Q2-Q4 2026",desc:"Coinbase L2. 토큰 탐색 공식 확인. JPMorgan 추정 $12-34B.",strat:"Base 생태계 활동. 브릿지 + DEX.",lk:"https://base.org",vids:0},
  {id:8,n:"Basedapp",cat:"DeFi",ch:"Base",st:"진행중",diff:"보통",rw:"대형",fund:"Base 에코",dist:"미정",tge:"미정",desc:"Base 올인원 DeFi. 3중 파밍 + 비자카드. Coinbase 백업.",strat:"Base 에코 활동 + 3중 파밍.",lk:"https://basedapp.com",vids:2},
];

const TIER2 = [
  {id:20,n:"edgeX",cat:"PerpDEX",ch:"Multi",st:"진행중",diff:"보통",rw:"대형",fund:"Amber",dist:"30%",tge:"03.31",desc:"StarkEx 기반. 월 ATH $167B 거래량.",lk:"https://edgex.exchange"},
  {id:21,n:"Silhouette",cat:"PerpDEX",ch:"HyperEVM",st:"진행중",diff:"보통",rw:"중형~대형",fund:"$3M",dist:"미정",tge:"미정",desc:"HyperEVM Shielded Trading. 극초기.",lk:"https://silhouette.fi"},
  {id:22,n:"Reya",cat:"PerpDEX",ch:"Ethereum",st:"진행중",diff:"보통",rw:"중형~대형",fund:"$19M",dist:"45%",tge:"미정",desc:"이더리움 Perp DEX. 45% 커뮤니티.",lk:"https://reya.network"},
  {id:23,n:"Ethereal",cat:"PerpDEX",ch:"Ethereum",st:"진행중",diff:"보통",rw:"대형",fund:"Ethena",dist:"15%",tge:"미정",desc:"Ethena 생태계. USDe 마진. 30x 리워드.",lk:"https://ethereal.trade"},
  {id:24,n:"MegaETH",cat:"L2",ch:"MegaETH",st:"예상",diff:"보통",rw:"대형",fund:"$107M",dist:"5%+",tge:"Q2 2026",desc:"Vitalik 투자 초고속 L2. 35K TPS.",lk:"https://megaeth.systems"},
  {id:25,n:"Aztec",cat:"L2",ch:"Aztec",st:"진행중",diff:"보통",rw:"대형",fund:"$119M",dist:"미정",tge:"미정",desc:"프라이버시 zk-rollup. a16z + Paradigm.",lk:"https://aztec.network"},
  {id:26,n:"Zama",cat:"인프라",ch:"Multi",st:"진행중",diff:"보통",rw:"대형",fund:"$57M",dist:"미정",tge:"미정",desc:"FHE 프라이버시 인프라. 유니콘.",lk:"https://zama.ai"},
  {id:27,n:"Kodiak",cat:"DEX",ch:"Berachain",st:"진행중",diff:"보통",rw:"중형~대형",fund:"Amber",dist:"미정",tge:"미정",desc:"베라체인 핵심 DEX. PoL 네이티브.",lk:"https://kodiak.finance"},
  {id:28,n:"EVEDEX",cat:"PerpDEX",ch:"Multi",st:"진행중",diff:"보통",rw:"중형",fund:"Bitget",dist:"미정",tge:"미정",desc:"Bitget 백업 하이브리드 Perp DEX.",lk:"https://evedex.com"},
  {id:29,n:"MemeMax",cat:"PerpDEX",ch:"Multi",st:"진행중",diff:"쉬움",rw:"대형",fund:"-",dist:"30억 토큰",tge:"미정",desc:"밈코인 특화 Perp DEX. 30억 보상.",lk:"#"},
  {id:30,n:"Kinetiq",cat:"PerpDEX",ch:"HyperEVM",st:"진행중",diff:"보통",rw:"중형~대형",fund:"-",dist:"30%",tge:"미정",desc:"HyperEVM Perp. 30% 할당.",lk:"#"},
];

const TIER3 = [
  {n:"Recall",cat:"AI",rw:"중형~대형"},{n:"StandX",cat:"PerpDEX",rw:"중형"},{n:"lit.trade",cat:"PerpDEX",rw:"중형~대형"},
  {n:"Liquid Perps",cat:"PerpDEX",rw:"중형~대형"},{n:"Theo",cat:"DeFi",rw:"중형"},{n:"Stork Oracle",cat:"오라클",rw:"중형"},
  {n:"Felix",cat:"DeFi",rw:"중형~대형"},{n:"Mitosis",cat:"DeFi",rw:"중형"},{n:"Nexus",cat:"AI",rw:"중형"},
  {n:"Walrus",cat:"스토리지",rw:"중형~대형"},{n:"PIN AI",cat:"AI",rw:"중형"},{n:"Kite AI",cat:"AI",rw:"중형"},
  {n:"LayerEdge",cat:"AI",rw:"중형"},{n:"Credible",cat:"DeFi",rw:"중형"},{n:"Avantis",cat:"PerpDEX",rw:"중형"},
  {n:"Rails",cat:"PerpDEX",rw:"중형"},{n:"Bluewhale",cat:"DeFi",rw:"중형"},{n:"Malda",cat:"DeFi",rw:"중형"},
  {n:"PrismaX",cat:"DeFi",rw:"중형"},{n:"Rootstock",cat:"인프라",rw:"중형"},{n:"Skate",cat:"인프라",rw:"중형"},
  {n:"UniversalX",cat:"DEX",rw:"중형"},{n:"SuperForm",cat:"DeFi",rw:"중형"},{n:"Talus",cat:"AI",rw:"중형"},
  {n:"Gradient",cat:"AI",rw:"중형"},{n:"Gata",cat:"AI",rw:"중형"},{n:"Tomo",cat:"소셜",rw:"중형"},
  {n:"Doma",cat:"인프라",rw:"중형"},{n:"OpenLedger",cat:"AI",rw:"중형~대형"},{n:"Titan",cat:"인프라",rw:"중형~대형"},
  {n:"Dexari",cat:"DEX",rw:"중형~대형"},{n:"Fogo",cat:"L1",rw:"중형"},{n:"Limitless",cat:"예측시장",rw:"중형"},
  {n:"Kalshi",cat:"예측시장",rw:"중형~대형"},{n:"Hylo",cat:"DeFi",rw:"중형"},{n:"Kaito",cat:"InfoFi",rw:"중형"},
  {n:"Linea",cat:"L2",rw:"중형"},{n:"Abstract",cat:"L2",rw:"중형"},{n:"Symbiotic",cat:"DeFi",rw:"중형"},
];

/* ═══════════════════════════════════════════════════════ */
/*  HOOKS                                                 */
/* ═══════════════════════════════════════════════════════ */

function useCountdown(dateStr) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(t);
  }, []);
  const diff = new Date(dateStr).getTime() - now;
  if (diff <= 0) return "마감";
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  if (d > 30) return `${d}일`;
  if (d > 0) return `${d}일 ${h}시간`;
  return `${h}시간`;
}

/* ═══════════════════════════════════════════════════════ */
/*  COMPONENTS                                            */
/* ═══════════════════════════════════════════════════════ */

const STATUS_COLOR = { "진행중": "bg-violet-500", "확인됨": "bg-emerald-500", "예상": "bg-amber-500" };
const CAT_ICON = { "PerpDEX": TrendingUp, "DeFi": Layers, "AI": Brain, "예측시장": Target, "L2": Globe, "L1": Globe, "DEX": BarChart3, "인프라": Cpu, "오라클": Activity, "스토리지": Layers, "소셜": MessageCircle, "InfoFi": Sparkles };

/* — Nav — */
function Nav({ section, setSection }) {
  const tabs = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "airdrops", label: "Airdrops", icon: Rocket },
    { id: "vibe", label: "Vibe Coding", icon: Code2 },
  ];
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-[#050507]/80 border-b border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
            <Sparkles size={14} className="text-white" />
          </div>
          <span className="font-semibold text-sm text-white tracking-tight">CryptoMage</span>
        </div>
        <div className="flex items-center gap-0.5 bg-white/[0.04] rounded-xl p-0.5">
          {tabs.map(t => {
            const Icon = t.icon;
            const active = section === t.id;
            return (
              <button key={t.id} onClick={() => setSection(t.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${active ? 'bg-white/[0.1] text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}>
                <Icon size={13} />
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            );
          })}
        </div>
        <a href="https://www.youtube.com/@CryptoMage" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors">
          <Play size={12} fill="currentColor" />
          <span className="hidden sm:inline">7.7K</span>
        </a>
      </div>
    </nav>
  );
}

/* — Countdown Badge — */
function Countdown({ date, urgent }) {
  const label = useCountdown(date);
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-medium ${urgent ? 'bg-red-500/10 text-red-400 ring-1 ring-red-500/20' : 'bg-zinc-800/60 text-zinc-400'}`}>
      <Timer size={10} />
      {label}
    </span>
  );
}

/* — Bot Status Dot — */
function StatusDot({ status }) {
  const running = status === "running";
  return (
    <span className="relative flex h-2 w-2">
      {running && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />}
      <span className={`relative inline-flex rounded-full h-2 w-2 ${running ? 'bg-emerald-400' : 'bg-zinc-600'}`} />
    </span>
  );
}

/* — Bento Card — */
function BentoCard({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`rounded-2xl bg-white/[0.02] border border-white/[0.04] p-5 backdrop-blur-sm hover:bg-white/[0.04] hover:border-white/[0.06] transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* — Section Title — */
function SectionTitle({ icon: Icon, title, count, sub }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-1">
        <Icon size={16} className="text-violet-400" />
        <h2 className="text-base font-semibold text-white tracking-tight">{title}</h2>
        {count != null && <span className="text-[10px] font-mono text-zinc-500 bg-white/[0.04] px-1.5 py-0.5 rounded-md">{count}</span>}
      </div>
      {sub && <p className="text-xs text-zinc-500 ml-6">{sub}</p>}
    </div>
  );
}

/* — Project Row (compact for tier tables) — */
function ProjectRow({ p, onClick }) {
  const CatIcon = CAT_ICON[p.cat] || Layers;
  return (
    <button onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.03] transition-all text-left group">
      <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
        <CatIcon size={14} className="text-zinc-400 group-hover:text-violet-400 transition-colors" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white truncate">{p.n}</span>
          {p.st && <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${STATUS_COLOR[p.st] || 'bg-zinc-600'}`} />}
        </div>
        <span className="text-[11px] text-zinc-500 truncate block">{p.cat} · {p.ch || "Multi"}</span>
      </div>
      <div className="text-right flex-shrink-0">
        <div className="text-[11px] font-medium text-zinc-300">{p.rw}</div>
        {p.fund && <div className="text-[10px] text-zinc-600">{p.fund}</div>}
      </div>
      <ChevronRight size={14} className="text-zinc-700 group-hover:text-zinc-400 transition-colors flex-shrink-0" />
    </button>
  );
}

/* — Project Detail Modal — */
function ProjectModal({ p, onClose }) {
  if (!p) return null;
  const CatIcon = CAT_ICON[p.cat] || Layers;
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={onClose}>
        <motion.div
          initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          className="w-full sm:max-w-lg bg-[#111113] border border-white/[0.06] rounded-t-3xl sm:rounded-2xl max-h-[85vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}>
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-violet-500/10 flex items-center justify-center">
                  <CatIcon size={20} className="text-violet-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{p.n}</h3>
                  <span className="text-xs text-zinc-500">{p.cat} · {p.ch || "Multi"}</span>
                </div>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center hover:bg-white/[0.1] transition-colors">
                <X size={16} className="text-zinc-400" />
              </button>
            </div>

            {/* Meta pills */}
            <div className="flex flex-wrap gap-2 mb-5">
              {p.st && <span className={`px-2.5 py-1 rounded-lg text-[11px] font-medium ${p.st === '진행중' ? 'bg-violet-500/10 text-violet-300' : p.st === '확인됨' ? 'bg-emerald-500/10 text-emerald-300' : 'bg-amber-500/10 text-amber-300'}`}>{p.st}</span>}
              {p.diff && <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/[0.04] text-zinc-400">{p.diff}</span>}
              {p.rw && <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/[0.04] text-zinc-300">{p.rw}</span>}
              {p.tge && <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/[0.04] text-zinc-400">TGE {p.tge}</span>}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 mb-5">
              {p.fund && <div className="bg-white/[0.02] rounded-xl p-3 border border-white/[0.04]"><div className="text-[10px] text-zinc-500 mb-1">펀딩</div><div className="text-sm font-medium text-white">{p.fund}</div></div>}
              {p.dist && <div className="bg-white/[0.02] rounded-xl p-3 border border-white/[0.04]"><div className="text-[10px] text-zinc-500 mb-1">배분율</div><div className="text-sm font-medium text-violet-300">{p.dist}</div></div>}
            </div>

            {/* Description */}
            {p.desc && <div className="mb-5"><div className="text-[10px] uppercase tracking-widest text-zinc-600 mb-2">소개</div><p className="text-sm text-zinc-300 leading-relaxed">{p.desc}</p></div>}

            {/* Strategy */}
            {p.strat && <div className="mb-5 bg-violet-500/[0.04] border border-violet-500/10 rounded-xl p-4"><div className="text-[10px] uppercase tracking-widest text-violet-400 mb-2">추천 전략</div><p className="text-sm text-zinc-300 leading-relaxed">{p.strat}</p></div>}

            {/* Link */}
            {p.lk && p.lk !== "#" && (
              <a href={p.lk} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm font-medium text-white hover:bg-white/[0.08] transition-colors">
                바로가기 <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════ */
/*  SECTIONS                                              */
/* ═══════════════════════════════════════════════════════ */

function OverviewSection() {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="text-center pt-6 pb-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">CryptoMage</span> Dashboard
        </h1>
        <p className="text-sm text-zinc-500 max-w-md mx-auto">에어드랍 파밍 · 바이브코딩 · 봇 자동화</p>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "활성 프로젝트", value: `${TIER1.length + TIER2.length + TIER3.length}`, sub: "트래킹 중" },
          { label: "활성 봇", value: BOTS.filter(b => b.status === "running").length + "", sub: "24/7 운영" },
          { label: "지원 거래소", value: BOT_EXCHANGES.length + "", sub: "DEX 연결" },
        ].map((s, i) => (
          <BentoCard key={i} delay={i * 0.05} className="text-center py-4">
            <div className="text-xl font-bold text-white font-mono">{s.value}</div>
            <div className="text-[10px] text-zinc-500 mt-0.5">{s.label}</div>
          </BentoCard>
        ))}
      </div>

      {/* Bot Status */}
      <div>
        <SectionTitle icon={Bot} title="봇 상태" count={BOTS.length} />
        <div className="space-y-2">
          {BOTS.map((b, i) => (
            <BentoCard key={i} delay={i * 0.05}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <StatusDot status={b.status} />
                  <div>
                    <div className="text-sm font-medium text-white">{b.name}</div>
                    <div className="text-[11px] text-zinc-500">{b.desc}</div>
                  </div>
                </div>
                <div className="text-right">
                  {b.status === "running" ? (
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">LIVE</span>
                  ) : (
                    <span className="text-[10px] font-mono text-zinc-600 bg-zinc-800/40 px-2 py-0.5 rounded-md">STANDBY</span>
                  )}
                </div>
              </div>
              {b.status === "running" && (
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/[0.04]">
                  <div className="text-[10px] text-zinc-500"><span className="text-zinc-300 font-mono">{b.exchanges}</span> 거래소</div>
                  <div className="text-[10px] text-zinc-500"><span className="text-zinc-300 font-mono">{b.pairs}</span></div>
                  {b.leverage !== "-" && <div className="text-[10px] text-zinc-500"><span className="text-zinc-300 font-mono">{b.leverage}</span></div>}
                  <div className="text-[10px] text-zinc-500">uptime <span className="text-emerald-400 font-mono">{b.uptime}</span></div>
                </div>
              )}
            </BentoCard>
          ))}
        </div>
      </div>

      {/* Deadlines */}
      <div>
        <SectionTitle icon={AlertTriangle} title="마감 임박" count={DEADLINES.length} />
        <div className="grid grid-cols-2 gap-2">
          {DEADLINES.map((d, i) => (
            <BentoCard key={i} delay={i * 0.03} className={d.urgent ? "border-red-500/10" : ""}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg">{d.icon}</span>
                <Countdown date={d.date} urgent={d.urgent} />
              </div>
              <div className="text-sm font-medium text-white">{d.name}</div>
              <div className="text-[10px] text-zinc-500 font-mono">{d.date}</div>
            </BentoCard>
          ))}
        </div>
      </div>

      {/* Active Farming */}
      <div>
        <SectionTitle icon={Activity} title="파밍 현황" count={FARMING.length} sub="24/7 활성 파밍 프로젝트" />
        <div className="space-y-2">
          {FARMING.map((f, i) => (
            <BentoCard key={i} delay={i * 0.04}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">{f.name}</span>
                  <span className="text-[10px] font-mono text-zinc-500">{f.tasks}</span>
                </div>
                <span className="text-xs font-mono text-violet-300">{f.value}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${f.progress}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className={`h-full rounded-full ${f.progress === 100 ? 'bg-emerald-400' : 'bg-gradient-to-r from-violet-500 to-fuchsia-500'}`} />
                </div>
                <span className="text-[10px] font-mono text-zinc-500">{f.progress}%</span>
              </div>
              <div className="mt-1.5 text-[10px] text-zinc-600">
                {f.status === "재가동 필요" ? (
                  <span className="text-amber-400">⚠ {f.status}</span>
                ) : (
                  <span className="text-emerald-400/60">{f.status}</span>
                )}
              </div>
            </BentoCard>
          ))}
        </div>
      </div>
    </div>
  );
}

function AirdropsSection() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [tier, setTier] = useState("all");
  const [showTier3, setShowTier3] = useState(false);

  const filteredT1 = useMemo(() => {
    if (tier === "2" || tier === "3") return [];
    return TIER1.filter(p => !search || p.n.toLowerCase().includes(search.toLowerCase()) || p.cat.toLowerCase().includes(search.toLowerCase()));
  }, [search, tier]);

  const filteredT2 = useMemo(() => {
    if (tier === "1" || tier === "3") return [];
    return TIER2.filter(p => !search || p.n.toLowerCase().includes(search.toLowerCase()) || p.cat.toLowerCase().includes(search.toLowerCase()));
  }, [search, tier]);

  const filteredT3 = useMemo(() => {
    if (tier === "1" || tier === "2") return [];
    return TIER3.filter(p => !search || p.n.toLowerCase().includes(search.toLowerCase()) || p.cat.toLowerCase().includes(search.toLowerCase()));
  }, [search, tier]);

  return (
    <div className="space-y-5">
      <SectionTitle icon={Rocket} title="에어드랍" count={TIER1.length + TIER2.length + TIER3.length} sub="Tier 1-3 분류, 옵시디언 볼트 기반" />

      {/* Search + Filter */}
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="프로젝트 검색..."
            className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/30 transition-colors" />
        </div>
        <div className="flex items-center gap-0.5 bg-white/[0.03] rounded-xl p-0.5">
          {[{id:"all",label:"All"},{id:"1",label:"T1"},{id:"2",label:"T2"},{id:"3",label:"T3"}].map(t => (
            <button key={t.id} onClick={() => setTier(t.id)}
              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all ${tier === t.id ? 'bg-white/[0.1] text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tier 1 */}
      {filteredT1.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2 px-1">
            <Star size={12} className="text-amber-400" />
            <span className="text-xs font-medium text-amber-400/80">Tier 1 — 최우선</span>
            <span className="text-[10px] text-zinc-600 font-mono">{filteredT1.length}</span>
          </div>
          <div className="bg-white/[0.01] rounded-2xl border border-white/[0.04] divide-y divide-white/[0.03]">
            {filteredT1.map(p => <ProjectRow key={p.id} p={p} onClick={() => setSelected(p)} />)}
          </div>
        </div>
      )}

      {/* Tier 2 */}
      {filteredT2.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2 px-1">
            <CircleDot size={12} className="text-violet-400" />
            <span className="text-xs font-medium text-violet-400/80">Tier 2 — 주요</span>
            <span className="text-[10px] text-zinc-600 font-mono">{filteredT2.length}</span>
          </div>
          <div className="bg-white/[0.01] rounded-2xl border border-white/[0.04] divide-y divide-white/[0.03]">
            {filteredT2.map(p => <ProjectRow key={p.id} p={p} onClick={() => setSelected(p)} />)}
          </div>
        </div>
      )}

      {/* Tier 3 */}
      {filteredT3.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2 px-1">
            <Hash size={12} className="text-zinc-500" />
            <span className="text-xs font-medium text-zinc-500">Tier 3 — 모니터링</span>
            <span className="text-[10px] text-zinc-600 font-mono">{filteredT3.length}</span>
          </div>
          {!showTier3 && tier !== "3" ? (
            <button onClick={() => setShowTier3(true)}
              className="w-full py-3 rounded-2xl border border-dashed border-white/[0.06] text-xs text-zinc-500 hover:text-zinc-300 hover:border-white/[0.1] transition-all">
              {filteredT3.length}개 프로젝트 더 보기 <ChevronDown size={12} className="inline ml-1" />
            </button>
          ) : (
            <div className="bg-white/[0.01] rounded-2xl border border-white/[0.04] divide-y divide-white/[0.03]">
              {filteredT3.map((p, i) => <ProjectRow key={i} p={p} onClick={() => setSelected(p)} />)}
            </div>
          )}
        </div>
      )}

      <ProjectModal p={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

function VibeCodingSection() {
  return (
    <div className="space-y-6">
      <SectionTitle icon={Code2} title="Vibe Coding" sub="AI로 자동매매 봇, 트레이딩 도구 직접 만들기" />

      {/* Bot Architecture Hero */}
      <BentoCard className="border-violet-500/10">
        <div className="flex items-center gap-2 mb-4">
          <Terminal size={16} className="text-violet-400" />
          <span className="text-sm font-semibold text-white">Multi-Perp-DEX Bot</span>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-md ml-auto">v2.0 RUNNING</span>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed mb-4">
          16개 Perp DEX 동시 자동매매. ETH/SOL 페어트레이딩, 15x 레버리지.
          유전 알고리즘으로 시그널 조합 자동 진화. 트레일링 스탑 + 적응형 BBO.
        </p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-white/[0.02] rounded-lg p-2.5 border border-white/[0.04]">
            <div className="text-[10px] text-zinc-500">아키텍처</div>
            <div className="text-xs text-zinc-200 mt-1">Abstract Base Class<br/>Factory + Lazy Loading</div>
          </div>
          <div className="bg-white/[0.02] rounded-lg p-2.5 border border-white/[0.04]">
            <div className="text-[10px] text-zinc-500">핵심 기능</div>
            <div className="text-xs text-zinc-200 mt-1">트레일링 스탑<br/>적응형 BBO 오프셋</div>
          </div>
          <div className="bg-white/[0.02] rounded-lg p-2.5 border border-white/[0.04]">
            <div className="text-[10px] text-zinc-500">최적화</div>
            <div className="text-xs text-zinc-200 mt-1">6h 백테스트 Auto<br/>12h 유전 알고리즘</div>
          </div>
          <div className="bg-white/[0.02] rounded-lg p-2.5 border border-white/[0.04]">
            <div className="text-[10px] text-zinc-500">안전장치</div>
            <div className="text-xs text-zinc-200 mt-1">Graceful Restart<br/>State 저장/복원</div>
          </div>
        </div>

        {/* Exchanges Grid */}
        <div className="text-[10px] uppercase tracking-widest text-zinc-600 mb-2">지원 거래소</div>
        <div className="flex flex-wrap gap-1.5">
          {BOT_EXCHANGES.map((ex, i) => (
            <span key={i} className="px-2 py-1 rounded-lg bg-white/[0.03] border border-white/[0.05] text-[11px] text-zinc-400 font-mono">
              {ex}
            </span>
          ))}
        </div>
      </BentoCard>

      {/* Videos */}
      <div>
        <div className="flex items-center gap-2 mb-3 px-1">
          <Play size={12} fill="currentColor" className="text-red-400" />
          <span className="text-xs font-medium text-zinc-300">바이브코딩 영상</span>
        </div>
        <div className="space-y-2">
          {VIBE_VIDS.map((v, i) => (
            <BentoCard key={i} delay={i * 0.04} className="flex items-center gap-3 py-3">
              <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/10 flex items-center justify-center flex-shrink-0">
                <Play size={14} fill="currentColor" className="text-red-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-white truncate">{v.t}</div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-zinc-500">{v.v} views</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.04] text-zinc-500">{v.tag}</span>
                </div>
              </div>
            </BentoCard>
          ))}
        </div>
      </div>

      {/* CTA */}
      <a href="https://www.youtube.com/@CryptoMage" target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/10 text-sm font-medium text-violet-300 hover:from-violet-500/20 hover:to-fuchsia-500/20 transition-all">
        YouTube에서 더 보기 <ArrowRight size={14} />
      </a>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════ */
/*  APP                                                   */
/* ═══════════════════════════════════════════════════════ */

export default function App() {
  const [section, setSection] = useState("overview");

  return (
    <div className="min-h-screen bg-[#050507] text-zinc-200">
      {/* Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[50%] rounded-full bg-violet-600/[0.03] blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[40%] rounded-full bg-fuchsia-600/[0.02] blur-[120px]" />
      </div>

      <Nav section={section} setSection={setSection} />

      <main className="relative max-w-2xl mx-auto px-4 pb-24 pt-4">
        <AnimatePresence mode="wait">
          {section === "overview" && <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}><OverviewSection /></motion.div>}
          {section === "airdrops" && <motion.div key="airdrops" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}><AirdropsSection /></motion.div>}
          {section === "vibe" && <motion.div key="vibe" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}><VibeCodingSection /></motion.div>}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#050507] to-transparent pointer-events-none">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-center">
          <span className="text-[10px] text-zinc-700 font-mono">cryptomage.xyz · {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
