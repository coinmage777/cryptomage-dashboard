import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight, Play, Sparkles, ArrowUpRight, X, ChevronDown, Star, CircleDot, Rocket, Code2, Terminal, Hash, ExternalLink, ChevronUp } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════ */
/*  LOGO HELPER                                              */
/* ═══════════════════════════════════════════════════════════ */
const LL = (slug) => `https://icons.llamao.fi/icons/protocols/${slug}`;
const CL = (slug) => `https://icons.llamao.fi/icons/chains/rsz_${slug}`;

function Logo({ src, name, size = 32 }) {
  const [err, setErr] = useState(false);
  if (err || !src) return (
    <div style={{ width: size, height: size }} className="rounded-lg bg-white/[0.06] flex items-center justify-center text-xs font-bold text-zinc-500 flex-shrink-0">
      {(name || '?')[0]}
    </div>
  );
  return <img src={src} alt={name} width={size} height={size} className="rounded-lg flex-shrink-0 bg-white/[0.04]" onError={() => setErr(true)} />;
}

/* ═══════════════════════════════════════════════════════════ */
/*  PROJECT DATA — 구독자 공개용 (개인정보 제거)              */
/*  레퍼럴 링크 · 유튜브 · DeFiLlama 로고 포함              */
/* ═══════════════════════════════════════════════════════════ */

const PROJECTS = [
  // ── TIER 1 ──
  {id:1,n:"GRVT",tier:1,cat:"PerpDEX",ch:"zkSync",logo:LL("grvt"),st:"진행중",rw:"중형~대형",fund:"$47.2M",dist:"28%",tge:"Q3 2026",
    desc:"ZKsync Validium L2 기반 하이브리드 거래소. CEX급 UX에 예치만으로 연 10% 이자 + 포인트 파밍. S2 배분이 18%로 넉넉해서 기대치 높음.",
    strat:"거래량 축적 + 포인트 파밍. 봇 자동화 가능.",
    ref:"https://grvt.io/exchange/sign-up?ref=1O9U2GG",
    yt:[{t:"초보자 GRVT 올인원 가이드",u:"https://youtu.be/cYnAPdjzjhk"},{t:"GRVT 자동매매 봇 만들기",u:"https://www.youtube.com/watch?v=aIBweqY8A4s"}]},
  {id:2,n:"Nado",tier:1,cat:"PerpDEX",ch:"Ink (Kraken)",logo:LL("nado"),st:"진행중",rw:"대형",fund:"Kraken",dist:"$INK 확정",tge:"Jul-Sep 2026",
    desc:"Kraken이 만든 Ink L2 기반 Perp DEX. 크로스마진, 통합증거금 시스템. $INK 에어드랍 확정. S1 완료, S2 파밍 중.",
    strat:"USDC/kBTC/WETH로 Perp 거래. NLP 예치.",
    ref:"https://nado.xyz",
    yt:[{t:"크라켄이 만든 퍼프덱스 Nado",u:"https://youtu.be/Fyq8M2Cy__I"},{t:"Nado 자동매매 봇",u:"https://www.youtube.com/watch?v=Fyq8M2Cy__I"}]},
  {id:3,n:"Variational",tier:1,cat:"PerpDEX",ch:"Multi-chain",logo:LL("variational"),st:"진행중",rw:"대형",fund:"$11.8M",dist:"50%",tge:"미정",
    desc:"500+ 페어 Perp DEX. 커뮤니티 배분 50%는 역대 최고 수준. 0% 수수료 + 손실 환급 정책.",
    strat:"Perp 거래 + 레퍼럴. 무수수료라 자본 효율 최상.",
    ref:"https://variational.io",
    yt:[{t:"0% 수수료 + 손실 환급까지?",u:"https://youtu.be/3InSD1rIxwk"}]},
  {id:4,n:"Extended",tier:1,cat:"PerpDEX",ch:"Multi-chain",logo:LL("extended"),st:"진행중",rw:"대형",fund:"$6.5M",dist:"30% 확정",tge:"Q2 2026",
    desc:"주식/원자재(금, 은, SPX) 포함 다양한 자산 Perp 거래. XVS 예치 추가 수익. 30% 확정 배분.",
    strat:"Perp 거래 (주식/원자재 포함). XVS 예치.",
    ref:"https://app.extended.exchange/join/COINMAGE",
    yt:[{t:"5천만원 수익 퍼프덱스 메타 다음 타자",u:"https://youtu.be/3InSD1rIxwk"}]},
  {id:5,n:"Glider",tier:1,cat:"DeFi",ch:"Multi-chain",logo:LL("glider"),st:"진행중",rw:"대형",fund:"a16z, Coinbase",dist:"미정",tge:"미정",
    desc:"AI 기반 DeFi 수익 최적화 프로토콜. 자동 리밸런싱. a16z + Coinbase + Uniswap 삼중 백업.",
    strat:"예치 + 포인트 적립. AI 자동 최적화.",
    ref:"https://glider.fi",
    yt:[{t:"지금하면 7배 Glider",u:"https://youtu.be/3InSD1rIxwk"}]},
  {id:6,n:"Polymarket",tier:1,cat:"예측시장",ch:"Polygon",logo:LL("polymarket"),st:"확인됨",rw:"대형",fund:"$74M+",dist:"33.3%",tge:"미정",
    desc:"세계 최대 탈중앙화 예측 시장. CMO가 에어드랍 공식 확인. $74M 1차 에어드랍 이미 실행.",
    strat:"예측 마켓 베팅. 주간 활성 거래 유지.",
    ref:"https://polymarket.com",
    yt:[{t:"VC는 같은 결론에 도달했다",u:"https://youtu.be/3InSD1rIxwk"}]},
  {id:7,n:"Base",tier:1,cat:"L2",ch:"Base",logo:CL("base"),st:"예상",rw:"대형",fund:"Coinbase ($500M+)",dist:"20-25%",tge:"Q2-Q4 2026",
    desc:"Coinbase L2. Jesse Pollak이 토큰 탐색 중 공식 확인. JPMorgan 추정 $12-34B 시가총액.",
    strat:"Base 생태계 활동. 브릿지 + DEX.",
    ref:"https://base.app/invite/coinmage/VGM6F57T",
    yt:[{t:"중국이 주목하는 에어드랍 2026",u:"https://youtu.be/aIr4gE59IWQ"}]},
  {id:8,n:"Basedapp",tier:1,cat:"DeFi",ch:"Base",logo:LL("basedapp"),st:"진행중",rw:"대형",fund:"Base 에코",dist:"미정",tge:"미정",
    desc:"Base 네이티브 올인원 DeFi 앱. 3중 파밍 구조 + 비자카드 연동. Coinbase 백업.",
    strat:"Base 에코 활동 + 포인트. 3중 파밍.",
    ref:"https://basedapp.com",
    yt:[{t:"Base 대형 에드작",u:"https://youtu.be/aIr4gE59IWQ"},{t:"BasedApp 3중파밍",u:"https://youtu.be/aIr4gE59IWQ"}]},

  // ── TIER 2 ──
  {id:20,n:"edgeX",tier:2,cat:"PerpDEX",ch:"Multi-chain",logo:LL("edgex"),st:"진행중",rw:"대형",fund:"Amber Group",dist:"30%",tge:"03.31",
    desc:"StarkEx 기반 Perp DEX. 월간 ATH $167B 거래량 (시장 점유 14%). TGE 임박.",
    strat:"거래량 파밍. TGE 임박이라 마지막 스퍼트.",
    ref:"https://pro.edgex.exchange/referral/570254647",
    yt:[{t:"올해 단 하나만 한다면 edgeX",u:"https://youtu.be/X-fXkGELRes"}]},
  {id:21,n:"Silhouette",tier:2,cat:"PerpDEX",ch:"HyperEVM",logo:LL("silhouette"),st:"진행중",rw:"중형~대형",fund:"$3M",dist:"미정",tge:"미정",
    desc:"HyperEVM 기반 Shielded Trading (프라이버시 거래). 극초기 단계라 선점 기회.",
    strat:"USDC 브릿지 → Shielded 거래. 초기 활동.",
    ref:"https://silhouette.fi",
    yt:[{t:"실루엣 Shielded Trading 극초기",u:"https://www.youtube.com/watch?v=UTWmrmTF9Wg"}]},
  {id:22,n:"Reya",tier:2,cat:"PerpDEX",ch:"Ethereum",logo:LL("reya-network"),st:"진행중",rw:"중형~대형",fund:"$19M",dist:"45%",tge:"미정",
    desc:"이더리움 기반 Perp DEX. 자체 L2 모듈러 체인. 45% 커뮤니티 할당. Wintermute 참여.",
    strat:"Perp 거래 + 레퍼럴.",
    ref:"https://reya.network",
    yt:[{t:"Reya 이더리움의 나스닥",u:"https://youtu.be/3InSD1rIxwk"}]},
  {id:23,n:"Ethereal",tier:2,cat:"PerpDEX",ch:"Ethereum",logo:LL("ethereal"),st:"진행중",rw:"대형",fund:"Ethena",dist:"15%",tge:"미정",
    desc:"Ethena 생태계 Perp DEX. USDe 마진. 30x Ethena 리워드. Season Zero 활성.",
    strat:"USDe 예치 + Perp 거래. ENA 스테이킹 병행.",
    ref:"https://ethereal.trade",
    yt:[{t:"ENA 1순위 예치작 Ethereal",u:"https://youtu.be/3InSD1rIxwk"}]},
  {id:24,n:"MegaETH",tier:2,cat:"L2",ch:"MegaETH",logo:LL("megaeth"),st:"예상",rw:"대형",fund:"$107M",dist:"5%+",tge:"Q2 2026",
    desc:"초고속 L2. 35,000 TPS. Vitalik 직접 투자. 메인넷 라이브.",
    strat:"Pre-Deposit Bridge + dApp 사용.",
    ref:"https://megaeth.systems",yt:[]},
  {id:25,n:"Aztec",tier:2,cat:"L2",ch:"Aztec",logo:LL("aztec"),st:"진행중",rw:"대형",fund:"$119M",dist:"미정",tge:"미정",
    desc:"프라이버시 zk-rollup L2. a16z + Paradigm 투자. 테스트넷 활성.",
    strat:"테스트넷 참여 + 프라이버시 트랜잭션.",
    ref:"https://aztec.network",
    yt:[{t:"Aztec 테스트넷 가이드",u:"https://www.youtube.com/watch?v=91eNcuninV0"}]},
  {id:26,n:"Kodiak",tier:2,cat:"DEX",ch:"Berachain",logo:LL("kodiak"),st:"진행중",rw:"중형~대형",fund:"Amber, Hack VC",dist:"미정",tge:"미정",
    desc:"베라체인 핵심 DEX. PoL(Proof of Liquidity) 네이티브.",
    strat:"유동성 풀 참여 + 거래 활동.",
    ref:"https://kodiak.finance",
    yt:[{t:"베라체인이 키운 Kodiak",u:"https://youtu.be/3InSD1rIxwk"}]},
  {id:27,n:"EVEDEX",tier:2,cat:"PerpDEX",ch:"Multi-chain",logo:LL("evedex"),st:"진행중",rw:"중형",fund:"Bitget",dist:"미정",tge:"미정",
    desc:"Bitget 백업 하이브리드 Perp DEX.",
    strat:"선물 거래 + 포인트 적립.",
    ref:"https://evedex.com",yt:[]},
  {id:28,n:"Zama",tier:2,cat:"인프라",ch:"Multi-chain",logo:LL("zama"),st:"진행중",rw:"대형",fund:"$57M",dist:"미정",tge:"미정",
    desc:"FHE(완전동형암호화) 프라이버시 인프라. 유니콘 밸류에이션. Pantera 리드.",
    strat:"테스트넷 참여 + FHE 트랜잭션.",
    ref:"https://zama.ai",yt:[]},
  {id:29,n:"Avantis",tier:2,cat:"PerpDEX",ch:"Base",logo:LL("avantis"),st:"진행중",rw:"중형",fund:"Base 에코",dist:"미정",tge:"미정",
    desc:"Base 위 RWA 파생상품 Perp DEX. 레버리지 롱/숏.",
    strat:"RWA 거래 + 레퍼럴.",
    ref:"https://www.avantisfi.com/referral?code=coinmage",
    yt:[{t:"Avantis RWA Perp",u:"https://youtu.be/uTPhivRidMo"}]},
  {id:30,n:"Lighter",tier:2,cat:"PerpDEX",ch:"Multi-chain",logo:LL("lighter"),st:"TGE 완료",rw:"완료",fund:"a16z",dist:"완료",tge:"완료",
    desc:"a16z 투자 Perp DEX. TGE 완료. 스냅샷 종료.",
    strat:"TGE 완료 — 클레임 확인.",
    ref:"https://app.lighter.xyz/trade/ETH?referral=GMYPZWQK69X4",
    yt:[{t:"Lighter 올인원 가이드",u:"https://youtu.be/Lii9mokD8Qw"}]},
  {id:31,n:"Pacifica",tier:2,cat:"PerpDEX",ch:"Multi-chain",logo:LL("pacifica"),st:"진행중",rw:"중형~대형",fund:"-",dist:"미정",tge:"미정",
    desc:"신규 Perp DEX. 초기 파밍 단계.",
    strat:"거래 활동 + 포인트.",
    ref:"https://app.pacifica.fi?referral=cryptocurrencymage",
    yt:[{t:"Pacifica Perp DEX",u:"https://youtu.be/kabzoJJBto0"}]},

  // ── TIER 3 ──
  {id:40,n:"Recall",tier:3,cat:"AI",ch:"Multi-chain",logo:LL("recall"),rw:"중형~대형",ref:"#",yt:[]},
  {id:41,n:"StandX",tier:3,cat:"PerpDEX",ch:"Multi-chain",logo:LL("standx"),rw:"중형",ref:"#",yt:[]},
  {id:42,n:"Theo",tier:3,cat:"DeFi",ch:"Multi-chain",logo:LL("theo"),rw:"중형",ref:"#",yt:[]},
  {id:43,n:"Felix",tier:3,cat:"DeFi",ch:"Multi-chain",logo:LL("felix-protocol"),rw:"중형~대형",ref:"#",yt:[]},
  {id:44,n:"Mitosis",tier:3,cat:"DeFi",ch:"Multi-chain",logo:LL("mitosis"),rw:"중형",ref:"#",yt:[]},
  {id:45,n:"Nexus",tier:3,cat:"AI",ch:"Multi-chain",logo:LL("nexus"),rw:"중형",ref:"#",yt:[]},
  {id:46,n:"Walrus",tier:3,cat:"스토리지",ch:"Sui",logo:LL("walrus"),rw:"중형~대형",ref:"#",yt:[]},
  {id:47,n:"PIN AI",tier:3,cat:"AI",ch:"Multi-chain",logo:LL("pin-ai"),rw:"중형",ref:"#",yt:[]},
  {id:48,n:"Kite AI",tier:3,cat:"AI",ch:"Multi-chain",logo:LL("kite-ai"),rw:"중형",ref:"#",yt:[]},
  {id:49,n:"LayerEdge",tier:3,cat:"AI",ch:"Multi-chain",logo:LL("layeredge"),rw:"중형",ref:"#",yt:[]},
  {id:50,n:"Avantis",tier:3,cat:"PerpDEX",ch:"Base",logo:LL("avantis"),rw:"중형",ref:"https://www.avantisfi.com/referral?code=coinmage",yt:[]},
  {id:51,n:"Bluewhale",tier:3,cat:"DeFi",ch:"Multi-chain",logo:LL("bluewhale"),rw:"중형",ref:"#",yt:[]},
  {id:52,n:"Malda",tier:3,cat:"DeFi",ch:"Multi-chain",logo:LL("malda"),rw:"중형",ref:"#",yt:[]},
  {id:53,n:"UniversalX",tier:3,cat:"DEX",ch:"Multi-chain",logo:LL("universalx"),rw:"중형",ref:"#",yt:[]},
  {id:54,n:"SuperForm",tier:3,cat:"DeFi",ch:"Multi-chain",logo:LL("superform"),rw:"중형",ref:"#",yt:[]},
  {id:55,n:"Gradient",tier:3,cat:"AI",ch:"Multi-chain",logo:LL("gradient"),rw:"중형",ref:"#",yt:[]},
  {id:56,n:"Tomo",tier:3,cat:"소셜",ch:"Multi-chain",logo:LL("tomo"),rw:"중형",ref:"#",yt:[]},
  {id:57,n:"OpenLedger",tier:3,cat:"AI",ch:"Multi-chain",logo:LL("openledger"),rw:"중형~대형",ref:"#",yt:[]},
  {id:58,n:"Fogo",tier:3,cat:"L1",ch:"Fogo",logo:LL("fogo"),rw:"중형",ref:"#",yt:[]},
  {id:59,n:"Kalshi",tier:3,cat:"예측시장",ch:"Multi-chain",logo:LL("kalshi"),rw:"중형~대형",ref:"#",yt:[]},
  {id:60,n:"Kaito",tier:3,cat:"InfoFi",ch:"Multi-chain",logo:LL("kaito"),rw:"중형",ref:"#",yt:[]},
  {id:61,n:"Linea",tier:3,cat:"L2",ch:"Linea",logo:CL("linea"),rw:"중형",ref:"#",yt:[]},
  {id:62,n:"Abstract",tier:3,cat:"L2",ch:"Abstract",logo:CL("abstract"),rw:"중형",ref:"#",yt:[]},
  {id:63,n:"Symbiotic",tier:3,cat:"DeFi",ch:"Ethereum",logo:LL("symbiotic"),rw:"중형",ref:"#",yt:[]},
  {id:64,n:"MemeMax",tier:3,cat:"PerpDEX",ch:"Multi-chain",logo:LL("mememax"),rw:"대형",ref:"#",yt:[]},
  {id:65,n:"Kinetiq",tier:3,cat:"PerpDEX",ch:"HyperEVM",logo:LL("kinetiq"),rw:"중형~대형",ref:"#",yt:[]},
  {id:66,n:"Hylo",tier:3,cat:"DeFi",ch:"Multi-chain",logo:LL("hylo"),rw:"중형",ref:"#",yt:[{t:"Hylo 수익률 극대화",u:"https://youtu.be/15JiPzLcwdU"}]},
  {id:67,n:"Stork Oracle",tier:3,cat:"오라클",ch:"Multi-chain",logo:LL("stork"),rw:"중형",ref:"#",yt:[]},
  {id:68,n:"Credible",tier:3,cat:"DeFi",ch:"Multi-chain",logo:LL("credible"),rw:"중형",ref:"#",yt:[]},
  {id:69,n:"Rootstock",tier:3,cat:"인프라",ch:"Bitcoin",logo:CL("rootstock"),rw:"중형",ref:"#",yt:[]},
  {id:70,n:"Limitless",tier:3,cat:"예측시장",ch:"Multi-chain",logo:LL("limitless"),rw:"중형",ref:"#",yt:[]},
];

const VIBE_VIDS = [
  { t: "AI한테 시켜서 16개 DEX 동시 자동매매 봇 만들기", v: "1.3K", u: "https://www.youtube.com/watch?v=0dZdAMJK_l4" },
  { t: "바이브코딩으로 Nado 자동매매 봇 만들기", v: "702", u: "https://www.youtube.com/watch?v=Fyq8M2Cy__I" },
  { t: "GRVT 자동매매 봇 만들기", v: "438", u: "https://www.youtube.com/watch?v=aIBweqY8A4s" },
  { t: "Claude로 리서치 보고서 자동화", v: "3.1K", u: "https://www.youtube.com/watch?v=Bx5zgBbR_oU" },
  { t: "AI 이미지 ComfyUI 완전정복", v: "6.5K", u: "https://youtu.be/3InSD1rIxwk" },
  { t: "AI로 클로 뽑기 게임 만들기", v: "10K", u: "https://youtu.be/3InSD1rIxwk" },
];

const CAT_COLORS = {
  "PerpDEX":"from-violet-500/20 to-violet-600/10 text-violet-300 ring-violet-500/20",
  "DeFi":"from-blue-500/20 to-blue-600/10 text-blue-300 ring-blue-500/20",
  "AI":"from-cyan-500/20 to-cyan-600/10 text-cyan-300 ring-cyan-500/20",
  "예측시장":"from-amber-500/20 to-amber-600/10 text-amber-300 ring-amber-500/20",
  "L2":"from-emerald-500/20 to-emerald-600/10 text-emerald-300 ring-emerald-500/20",
  "L1":"from-emerald-500/20 to-emerald-600/10 text-emerald-300 ring-emerald-500/20",
  "DEX":"from-fuchsia-500/20 to-fuchsia-600/10 text-fuchsia-300 ring-fuchsia-500/20",
  "인프라":"from-orange-500/20 to-orange-600/10 text-orange-300 ring-orange-500/20",
  "오라클":"from-rose-500/20 to-rose-600/10 text-rose-300 ring-rose-500/20",
  "스토리지":"from-teal-500/20 to-teal-600/10 text-teal-300 ring-teal-500/20",
  "소셜":"from-pink-500/20 to-pink-600/10 text-pink-300 ring-pink-500/20",
  "InfoFi":"from-indigo-500/20 to-indigo-600/10 text-indigo-300 ring-indigo-500/20",
};

const STATUS_DOT = { "진행중":"bg-emerald-400", "확인됨":"bg-blue-400", "예상":"bg-amber-400", "TGE 완료":"bg-zinc-500" };

/* ═══════════════════════════════════════════════════════════ */
/*  COMPONENTS                                               */
/* ═══════════════════════════════════════════════════════════ */

/* — Nav — */
function Nav({ section, setSection }) {
  const tabs = [
    { id: "airdrops", label: "에어드랍", icon: Rocket },
    { id: "vibe", label: "바이브코딩", icon: Code2 },
  ];
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-[#0a0a0f]/80 border-b border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-4 h-12 flex items-center justify-between">
        <a href="https://www.youtube.com/@CryptoMage" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
            <Sparkles size={12} className="text-white" />
          </div>
          <span className="font-semibold text-sm text-white tracking-tight">CryptoMage</span>
          <span className="text-[10px] text-zinc-600 font-mono hidden sm:inline">7.7K subs</span>
        </a>
        <div className="flex items-center gap-1 bg-white/[0.03] rounded-lg p-0.5">
          {tabs.map(t => {
            const Icon = t.icon;
            const active = section === t.id;
            return (
              <button key={t.id} onClick={() => setSection(t.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${active ? 'bg-white/[0.08] text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>
                <Icon size={12} />
                {t.label}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <a href="https://blog.naver.com/coinmage" target="_blank" rel="noopener noreferrer"
            className="text-[11px] text-zinc-500 hover:text-white transition-colors hidden sm:block">블로그</a>
          <a href="https://t.me/cryptocurrencymage" target="_blank" rel="noopener noreferrer"
            className="text-[11px] text-zinc-500 hover:text-white transition-colors hidden sm:block">텔레그램</a>
          <a href="https://www.youtube.com/@CryptoMage" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-1 rounded-md bg-red-500/10 text-red-400 text-[11px] font-medium hover:bg-red-500/20 transition-colors">
            <Play size={10} fill="currentColor" />
            YouTube
          </a>
        </div>
      </div>
    </nav>
  );
}

/* — Project Card (DeFiLlama style) — */
function ProjectCard({ p, onClick }) {
  const catColor = CAT_COLORS[p.cat] || CAT_COLORS["DeFi"];
  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className="w-full text-left bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05] hover:border-white/[0.1] rounded-xl p-3.5 transition-all duration-200 group">
      <div className="flex items-center gap-3">
        <Logo src={p.logo} name={p.n} size={36} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm font-semibold text-white">{p.n}</span>
            {p.st && <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${STATUS_DOT[p.st] || 'bg-zinc-600'}`} />}
            {p.tier <= 2 && p.yt && p.yt.length > 0 && (
              <Play size={10} fill="currentColor" className="text-red-400 flex-shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`inline-flex px-1.5 py-0.5 rounded text-[9px] font-medium bg-gradient-to-r ring-1 ${catColor}`}>{p.cat}</span>
            <span className="text-[10px] text-zinc-600">{p.ch}</span>
          </div>
        </div>
        <div className="text-right flex-shrink-0 hidden sm:block">
          {p.fund && p.fund !== "-" && <div className="text-[10px] text-zinc-500 mb-0.5">{p.fund}</div>}
          {p.dist && p.dist !== "미정" && <div className="text-[11px] font-mono font-medium text-violet-300">{p.dist}</div>}
        </div>
        <ChevronRight size={14} className="text-zinc-700 group-hover:text-zinc-400 transition-colors flex-shrink-0" />
      </div>
      {p.tier <= 2 && p.desc && (
        <p className="mt-2 text-[11px] text-zinc-500 leading-relaxed line-clamp-2 pl-12">{p.desc}</p>
      )}
    </motion.button>
  );
}

/* — Project Detail Modal — */
function ProjectModal({ p, onClose }) {
  if (!p) return null;
  const catColor = CAT_COLORS[p.cat] || CAT_COLORS["DeFi"];
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={onClose}>
        <motion.div
          initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 28, stiffness: 350 }}
          className="w-full sm:max-w-md bg-[#111115] border border-white/[0.08] rounded-t-2xl sm:rounded-2xl max-h-[85vh] overflow-y-auto scrollbar-none"
          onClick={e => e.stopPropagation()}>
          <div className="p-5">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Logo src={p.logo} name={p.n} size={44} />
                <div>
                  <h3 className="text-lg font-bold text-white">{p.n}</h3>
                  <div className="flex items-center gap-1.5">
                    <span className={`inline-flex px-1.5 py-0.5 rounded text-[9px] font-medium bg-gradient-to-r ring-1 ${catColor}`}>{p.cat}</span>
                    <span className="text-[10px] text-zinc-500">{p.ch}</span>
                  </div>
                </div>
              </div>
              <button onClick={onClose} className="w-7 h-7 rounded-full bg-white/[0.06] flex items-center justify-center hover:bg-white/[0.12] transition-colors">
                <X size={14} className="text-zinc-400" />
              </button>
            </div>

            {/* Pills */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {p.st && <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/[0.04] text-zinc-300">{p.st}</span>}
              {p.rw && <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/[0.04] text-zinc-300">{p.rw}</span>}
              {p.tge && <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/[0.04] text-zinc-400">TGE {p.tge}</span>}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {p.fund && p.fund !== "-" && <div className="bg-white/[0.02] rounded-lg p-2.5 border border-white/[0.04]"><div className="text-[9px] uppercase tracking-wider text-zinc-600 mb-1">펀딩</div><div className="text-xs font-medium text-white">{p.fund}</div></div>}
              {p.dist && p.dist !== "미정" && <div className="bg-white/[0.02] rounded-lg p-2.5 border border-white/[0.04]"><div className="text-[9px] uppercase tracking-wider text-zinc-600 mb-1">배분율</div><div className="text-xs font-medium text-violet-300">{p.dist}</div></div>}
            </div>

            {/* Description */}
            {p.desc && <p className="text-[13px] text-zinc-300 leading-relaxed mb-4">{p.desc}</p>}

            {/* Strategy */}
            {p.strat && (
              <div className="mb-4 bg-violet-500/[0.05] border border-violet-500/10 rounded-lg p-3">
                <div className="text-[9px] uppercase tracking-wider text-violet-400 mb-1">추천 전략</div>
                <p className="text-xs text-zinc-300 leading-relaxed">{p.strat}</p>
              </div>
            )}

            {/* YouTube Videos */}
            {p.yt && p.yt.length > 0 && (
              <div className="mb-4">
                <div className="text-[9px] uppercase tracking-wider text-zinc-600 mb-2">관련 영상</div>
                <div className="space-y-1.5">
                  {p.yt.map((v, i) => (
                    <a key={i} href={v.u} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:bg-red-500/[0.06] hover:border-red-500/10 transition-all group">
                      <Play size={12} fill="currentColor" className="text-red-400 flex-shrink-0" />
                      <span className="text-xs text-zinc-300 group-hover:text-white transition-colors truncate">{v.t}</span>
                      <ExternalLink size={10} className="text-zinc-600 flex-shrink-0 ml-auto" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex gap-2">
              {p.ref && p.ref !== "#" && (
                <a href={p.ref} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 text-sm font-medium text-white hover:from-violet-500 hover:to-fuchsia-500 transition-all">
                  시작하기 <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════ */
/*  SECTIONS                                                 */
/* ═══════════════════════════════════════════════════════════ */

function AirdropsSection() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState("all");
  const [catFilter, setCatFilter] = useState("all");
  const [showTier3, setShowTier3] = useState(false);

  const cats = useMemo(() => {
    const s = new Set();
    PROJECTS.forEach(p => s.add(p.cat));
    return ["all", ...Array.from(s)];
  }, []);

  const applyFilter = useMemo(() => {
    const s = search.toLowerCase();
    return (arr) => arr.filter(p => {
      if (s && !p.n.toLowerCase().includes(s) && !(p.cat||'').toLowerCase().includes(s) && !(p.ch||'').toLowerCase().includes(s)) return false;
      if (catFilter !== "all" && p.cat !== catFilter) return false;
      return true;
    });
  }, [search, catFilter]);

  const t1 = useMemo(() => (tierFilter === "2" || tierFilter === "3") ? [] : applyFilter(PROJECTS.filter(p => p.tier === 1)), [tierFilter, applyFilter]);
  const t2 = useMemo(() => (tierFilter === "1" || tierFilter === "3") ? [] : applyFilter(PROJECTS.filter(p => p.tier === 2)), [tierFilter, applyFilter]);
  const t3 = useMemo(() => (tierFilter === "1" || tierFilter === "2") ? [] : applyFilter(PROJECTS.filter(p => p.tier === 3)), [tierFilter, applyFilter]);
  const total = t1.length + t2.length + t3.length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-end justify-between pt-4">
        <div>
          <h1 className="text-xl font-bold text-white mb-1">에어드랍 트래커</h1>
          <p className="text-xs text-zinc-500">{total}개 프로젝트 · 크립토메이지 리서치 기반</p>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold font-mono text-white">{PROJECTS.length}</div>
          <div className="text-[10px] text-zinc-600">Total</div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="프로젝트, 카테고리, 체인 검색..."
          className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/30 transition-colors" />
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
        <div className="flex items-center gap-0.5 bg-white/[0.03] rounded-lg p-0.5 flex-shrink-0">
          {[{id:"all",l:"All"},{id:"1",l:"T1"},{id:"2",l:"T2"},{id:"3",l:"T3"}].map(t => (
            <button key={t.id} onClick={() => setTierFilter(t.id)}
              className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-all ${tierFilter === t.id ? 'bg-white/[0.1] text-white' : 'text-zinc-500'}`}>
              {t.l}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          {cats.map(c => (
            <button key={c} onClick={() => setCatFilter(c)}
              className={`px-2 py-1 rounded-md text-[10px] font-medium whitespace-nowrap transition-all ${catFilter === c ? 'bg-violet-500/20 text-violet-300' : 'text-zinc-600 hover:text-zinc-400'}`}>
              {c === "all" ? "전체" : c}
            </button>
          ))}
        </div>
      </div>

      {/* Tier 1 */}
      {t1.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2 px-1">
            <Star size={12} className="text-amber-400" />
            <span className="text-xs font-semibold text-amber-400/90">Tier 1 — 최우선</span>
            <span className="text-[10px] text-zinc-600 font-mono">{t1.length}</span>
          </div>
          <div className="space-y-1.5">
            {t1.map(p => <ProjectCard key={p.id} p={p} onClick={() => setSelected(p)} />)}
          </div>
        </div>
      )}

      {/* Tier 2 */}
      {t2.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2 px-1 mt-4">
            <CircleDot size={12} className="text-violet-400" />
            <span className="text-xs font-semibold text-violet-400/90">Tier 2 — 주요</span>
            <span className="text-[10px] text-zinc-600 font-mono">{t2.length}</span>
          </div>
          <div className="space-y-1.5">
            {t2.map(p => <ProjectCard key={p.id} p={p} onClick={() => setSelected(p)} />)}
          </div>
        </div>
      )}

      {/* Tier 3 */}
      {t3.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2 px-1 mt-4">
            <Hash size={12} className="text-zinc-500" />
            <span className="text-xs font-semibold text-zinc-500">Tier 3 — 모니터링</span>
            <span className="text-[10px] text-zinc-600 font-mono">{t3.length}</span>
          </div>
          {!showTier3 && tierFilter !== "3" ? (
            <button onClick={() => setShowTier3(true)}
              className="w-full py-3 rounded-xl border border-dashed border-white/[0.06] text-xs text-zinc-500 hover:text-zinc-300 hover:border-white/[0.12] transition-all">
              {t3.length}개 프로젝트 더 보기 <ChevronDown size={12} className="inline ml-1" />
            </button>
          ) : (
            <div className="space-y-1.5">
              {t3.map((p, i) => <ProjectCard key={p.id || i} p={p} onClick={() => setSelected(p)} />)}
              {tierFilter !== "3" && (
                <button onClick={() => setShowTier3(false)} className="w-full py-2 text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
                  접기 <ChevronUp size={12} className="inline ml-1" />
                </button>
              )}
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
    <div className="space-y-5 pt-4">
      <div>
        <h1 className="text-xl font-bold text-white mb-1">바이브코딩</h1>
        <p className="text-xs text-zinc-500">AI로 자동매매 봇, 트레이딩 도구 직접 만들기</p>
      </div>

      {/* Bot Architecture Card */}
      <div className="bg-white/[0.02] border border-violet-500/10 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Terminal size={16} className="text-violet-400" />
          <span className="text-sm font-bold text-white">Multi-Perp-DEX 자동매매 봇</span>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed mb-4">
          16개 Perp DEX에서 동시 자동매매. ETH/SOL 페어트레이딩, 15x 레버리지.
          유전 알고리즘으로 시그널 자동 최적화. Abstract Base Class + Factory 패턴.
        </p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {[
            ["아키텍처","ABC + Factory Pattern"],
            ["핵심기능","트레일링 스탑 + BBO"],
            ["최적화","유전 알고리즘 12h"],
            ["안전장치","Graceful Restart"]
          ].map(([label, val], i) => (
            <div key={i} className="bg-white/[0.02] rounded-lg p-2 border border-white/[0.04]">
              <div className="text-[9px] text-zinc-600">{label}</div>
              <div className="text-[11px] text-zinc-300 mt-0.5">{val}</div>
            </div>
          ))}
        </div>
        <div className="text-[9px] uppercase tracking-wider text-zinc-600 mb-2">지원 거래소 (12+)</div>
        <div className="flex flex-wrap gap-1">
          {["Hyperliquid","Lighter","Paradex","EdgeX","Backpack","GRVT","Nado","Hotstuff","Bulk","StandX","TreadFi","Pacifica"].map((ex, i) => (
            <span key={i} className="px-1.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.05] text-[10px] text-zinc-500 font-mono">{ex}</span>
          ))}
        </div>
      </div>

      {/* Videos */}
      <div>
        <div className="flex items-center gap-2 mb-3 px-1">
          <Play size={12} fill="currentColor" className="text-red-400" />
          <span className="text-xs font-semibold text-zinc-300">바이브코딩 영상</span>
        </div>
        <div className="space-y-1.5">
          {VIBE_VIDS.map((v, i) => (
            <a key={i} href={v.u} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white/[0.02] border border-white/[0.05] rounded-xl p-3 hover:bg-red-500/[0.04] hover:border-red-500/10 transition-all group">
              <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                <Play size={14} fill="currentColor" className="text-red-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-white truncate group-hover:text-red-200 transition-colors">{v.t}</div>
                <div className="text-[10px] text-zinc-600 mt-0.5">{v.v} views</div>
              </div>
              <ExternalLink size={12} className="text-zinc-700 flex-shrink-0" />
            </a>
          ))}
        </div>
      </div>

      {/* YouTube CTA */}
      <a href="https://www.youtube.com/@CryptoMage" target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/10 text-sm font-medium text-red-300 hover:from-red-500/20 hover:to-red-600/20 transition-all">
        <Play size={14} fill="currentColor" /> 크립토메이지 YouTube 구독하기
      </a>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════ */
/*  APP                                                      */
/* ═══════════════════════════════════════════════════════════ */

export default function App() {
  const [section, setSection] = useState("airdrops");

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-zinc-200">
      {/* Subtle ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-30%] left-[-20%] w-[70%] h-[60%] rounded-full bg-violet-900/[0.04] blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-15%] w-[50%] h-[40%] rounded-full bg-fuchsia-900/[0.03] blur-[120px]" />
      </div>

      <Nav section={section} setSection={setSection} />

      <main className="relative max-w-2xl mx-auto px-4 pb-20">
        <AnimatePresence mode="wait">
          {section === "airdrops" && (
            <motion.div key="air" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              <AirdropsSection />
            </motion.div>
          )}
          {section === "vibe" && (
            <motion.div key="vibe" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              <VibeCodingSection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] py-6 mt-8">
        <div className="max-w-2xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <a href="https://www.youtube.com/@CryptoMage" target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-600 hover:text-red-400 transition-colors">YouTube</a>
            <a href="https://blog.naver.com/coinmage" target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-600 hover:text-emerald-400 transition-colors">Blog</a>
            <a href="https://t.me/cryptocurrencymage" target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-600 hover:text-blue-400 transition-colors">Telegram</a>
          </div>
          <span className="text-[10px] text-zinc-700 font-mono">CryptoMage © {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
