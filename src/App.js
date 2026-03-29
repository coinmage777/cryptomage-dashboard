import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Play, Sparkles, ArrowUpRight, X, Star, Rocket, Code2, ExternalLink, Flame, Zap, TrendingUp, Shield, Globe, Clock } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════ */
/*  HELPERS                                                   */
/* ═══════════════════════════════════════════════════════════ */
const LL = s => `https://icons.llama.fi/${s}`;
const CL = s => `https://icons.llamao.fi/icons/chains/rsz_${s}`;
const TW = id => `https://pbs.twimg.com/profile_images/${id}`;

function Logo({ src, name, size = 36 }) {
  const [e, setE] = useState(false);
  if (e || !src) return (
    <div style={{width:size,height:size}} className="rounded-xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] flex items-center justify-center text-xs font-bold text-zinc-400 flex-shrink-0 border border-white/[0.06]">
      {(name||'?')[0]}
    </div>
  );
  return <img src={src} alt={name} width={size} height={size} className="rounded-xl flex-shrink-0 bg-white/[0.04]" onError={()=>setE(true)} />;
}

function Counter({value, duration=1.5}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const num = typeof value === 'string' ? parseInt(value.replace(/[^0-9]/g,''),10) : value;
  const suffix = typeof value === 'string' ? value.replace(/[0-9.,]/g,'') : '';
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const step = Math.max(1, Math.ceil(num / (duration * 60)));
        const timer = setInterval(() => {
          start += step;
          if (start >= num) { setCount(num); clearInterval(timer); }
          else setCount(start);
        }, 1000/60);
        observer.disconnect();
        return () => clearInterval(timer);
      }
    }, {threshold: 0.3});
    if(ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ═══════════════════════════════════════════════════════════ */
/*  PROJECT DATA — 에어드랍 미확정 프로젝트만 수록            */
/* ═══════════════════════════════════════════════════════════ */

const P = [
  // ══ 추천 프로젝트 ══
  {id:1,n:"GRVT",pick:true,cat:"PerpDEX",ch:"zkSync",logo:LL("grvt-perps.jpg"),st:"진행중",rw:"중형~대형",fund:"$47.2M",dist:"28%",tge:"Q3 2026",
    desc:"ZKsync Validium 기반 하이브리드 거래소. CEX급 속도와 UX.",
    insight:"Matrix Partners + Delphi Digital 리드 $47.2M 투자. 계정 기반 참여로 시빌을 효과적으로 걸러내는 구조. 메이커 수수료가 마이너스(리베이트)라 마켓메이킹할수록 돌려받음. S2 배분이 18%로 넉넉하며 예치만으로 연 10% 이자를 제공하는 Earn 프로그램 별도 운영. zkSync Validium 기술로 이더리움 보안 유지 + 초당 2만 TPS.",
    strat:"거래량 축적 + Earn 예치 + 포인트 파밍. 봇 자동화 가능.", ref:"https://grvt.io/exchange/sign-up?ref=1O9U2GG",
    yt:[{t:"초보자 GRVT 올인원 가이드",u:"https://youtu.be/cYnAPdjzjhk"},{t:"GRVT 자동매매 봇",u:"https://www.youtube.com/watch?v=aIBweqY8A4s"}]},

  {id:3,n:"Aster",pick:true,cat:"PerpDEX",ch:"Aster L1",logo:LL("aster-bridge.jpg"),st:"진행중",rw:"대형",fund:"YZi Labs (CZ)",dist:"53.5%",tge:"진행중",hot:true,
    desc:"CZ 어드바이저. 1001x 레버리지, 히든오더, 크로스체인 차세대 Perp DEX.",
    insight:"역대 최대 53.5% 커뮤니티 에어드랍으로 화제. Stage 6 진행중이며 일일 거래량 $787M ATH 기록. 전 바이낸스 직원 다수 합류. 자체 L1 테스트넷 가동 중이며 1001x 레버리지, 히든오더(대규모 주문 숨김), 크로스체인 결제 등 혁신적 기능 탑재. YZi Labs(구 Binance Labs) 직접 지원으로 바이낸스 상장 가능성도 높게 점쳐짐.",
    strat:"Stage 6 파밍 + 거래 볼륨 + 스테이킹.", ref:"https://aster.trade",yt:[]},

  {id:4,n:"Genius",pick:true,cat:"PerpDEX",ch:"Multi-chain",logo:TW("1937894252031148032/PRE0DE0Z_400x400.jpg"),st:"진행중",rw:"대형",fund:"YZi Labs (CZ)",dist:"미정",tge:"Apr 12, 2026",hot:true,
    desc:"YZi Labs 8자리 투자 + CZ 어드바이저. 올인원 트레이딩 터미널.",
    insight:"2026.04.12 GENIUS 토큰 생성 확정. TGE 임박이라 지금이 마지막 참여 기회. YZi Labs가 8자리 달러를 투자. S1 마감 임박 — 주간 1,000만 GP(Genius Points) 배포 중이며 포인트→토큰 전환 시 50% 보너스 예정. 스팟 거래 볼륨이 GP 배분 핵심 기준.",
    strat:"스팟 거래 볼륨 축적 (GP 배분 기준) + S1 마감 전 참여.", ref:"https://www.tradegenius.com/ref/A33HVN",yt:[]},

  {id:5,n:"Variational",pick:true,cat:"PerpDEX",ch:"Multi-chain",logo:LL("variational.jpg"),st:"진행중",rw:"대형",fund:"$11.8M",dist:"50%",tge:"미정",
    desc:"500+ 페어 Perp DEX. 커뮤니티 50% 배분. 0% 수수료 + 손실 환급.",
    insight:"Bain Capital Crypto + Coinbase Ventures + Peak XV(구 세쿼이아 인디아) $11.8M 투자. 커뮤니티 50% 배분은 역대 최고 수준. 무수수료(0%)라서 거래 비용 부담 없고 손실 환급 프로그램까지 운영. 양방 OI(오픈인터레스트) 유지 전략과 알트코인 가중치 활용이 효율적인 파밍법.",
    strat:"양방 OI 유지 + 레퍼럴 + 알트코인 가중치 활용.", ref:"https://variational.io",
    yt:[{t:"Variational 양방 OI 유지",u:"https://youtu.be/AfH8wppr0xc"}]},

  {id:6,n:"Extended",pick:true,cat:"PerpDEX",ch:"Multi-chain",logo:LL("extended.jpg"),st:"진행중",rw:"대형",fund:"$6.5M",dist:"30% 확정",tge:"Q2 2026",
    desc:"주식/금/SPX Perp 거래. Revolut DNA + ZK 롤업. 30% 확정 배분.",
    insight:"2026년 핵심 트렌드 Equity Perps(TradFi 온체인화) 선도. 소프트뱅크가 Revolut에 $1.6B 투자한 것과 같은 DNA. 주식(SPX, 테슬라), 금, 원자재를 Perp으로 24시간 거래 가능. ZK 롤업 기반 이더리움 보안 + 초고속 체결. 30% 커뮤니티 배분 확정으로 불확실성 낮음.",
    strat:"주식/원자재 Perp 거래 + XVS 예치.", ref:"https://app.extended.exchange/join/COINMAGE",
    yt:[{t:"Extended Revolut DNA",u:"https://youtu.be/3InSD1rIxwk"}]},

  {id:7,n:"Glider",pick:true,cat:"DeFi",ch:"Multi-chain",logo:TW("2008111141957021696/fUFRZjS3_400x400.jpg"),st:"진행중",rw:"대형",fund:"a16z, Coinbase",dist:"미정",tge:"미정",
    desc:"AI DeFi 수익 최적화. a16z + Coinbase + Uniswap 삼중 백업.",
    insight:"a16z + Coinbase Ventures + Uniswap Labs 삼대 메이저 동시 투자는 극히 이례적. AI가 DeFi 포트폴리오를 자동 리밸런싱하고 수익률 최적화. 예치만 하면 AI가 최적 전략 실행하는 구조라 난이도 최하. DeFi 초보자도 접근 가능한 쉬운 난이도 대비 대형 VC급 보상 기대.",
    strat:"예치 + 포인트 축적. AI가 알아서 관리.", ref:"https://glider.fi",yt:[]},

  {id:8,n:"Base",pick:true,cat:"L2",ch:"Base",logo:CL("base"),st:"예상",rw:"대형",fund:"Coinbase ($500M+)",dist:"20-25%",tge:"Q2-Q4 2026",
    desc:"Coinbase L2. 토큰 탐색 공식 확인. JPMorgan 추정 $12-34B.",
    insight:"Jesse Pollak(Base 리더)이 네트워크 토큰 탐색 공식 확인. JPMorgan 추정 에어드랍 규모 $2.4-8.5B — 역대 최대 에어드랍 가능성. OP Stack 기반 최대 L2로 수백만 활성 유저 보유. Coinbase 8,000만 인증 유저 베이스가 핵심 차별점.",
    strat:"Base dApp 활동 + 브릿지 + DeFi 파밍.", ref:"https://base.app/invite/coinmage/VGM6F57T",
    yt:[{t:"중국이 주목하는 에어드랍 2026",u:"https://youtu.be/aIr4gE59IWQ"}]},

  // ══ 일반 프로젝트 ══
  {id:20,n:"Ethereal",cat:"PerpDEX",ch:"Ethereum",logo:LL("ethereal-dex.jpg"),st:"진행중",rw:"대형",fund:"Ethena",dist:"15%",tge:"미정",
    desc:"Ethena 생태계 Perp DEX. USDe 마진. 30x 리워드 부스트.",
    insight:"Ethena(USDe 발행사) 직접 인큐베이팅. ENA 홀더에게 15% 거버넌스 토큰 직접 배분. Ethena 사용 시 30x 리워드 부스트. USDe 마진으로 스테이블 예치 수익 + 거래 리워드 이중 수익 구조.",
    strat:"USDe 마진 예치 + Perp 거래 + ENA 홀딩 부스트.", ref:"https://ethereal.trade",yt:[]},

  {id:21,n:"Based",cat:"PerpDEX",ch:"Hyperliquid",logo:LL("basedmarkets.png"),st:"진행중",rw:"중형~대형",fund:"-",dist:"미정",tge:"미정",
    desc:"Hyperliquid 기반 6중 파밍 모바일 Perp DEX.",
    insight:"HL XP + Based Points + Builder Code + 이벤트 + 레퍼럴 + LP 수익 6중 보상. 한 번의 거래로 6개 보상 동시 수확하는 역대급 효율. HYPE 38.8% 미래 커뮤니티 보상 간접 수혜. 모바일 앱 UX가 CEX급으로 초보자도 쉽게 접근 가능. Hyperliquid 생태계 성장과 함께 직접 수혜 기대.",
    strat:"6중 파밍 + 모바일 거래.", ref:"https://app.based.one/register?ref=COINMAGE",
    yt:[{t:"Based 6중 파밍법",u:"https://youtu.be/0hqZI7P8Iyc"}]},

  {id:22,n:"Silhouette",cat:"PerpDEX",ch:"HyperEVM",logo:LL("silhouette-naked.jpg"),st:"진행중",rw:"중형~대형",fund:"$3M",dist:"미정",tge:"미정",
    desc:"HyperEVM 최초 프라이버시 Perp DEX. Shielded Trading.",
    insight:"2026년 3대 내러티브 프라이버시를 HyperEVM 위에서 최초 구현. 극초기 선점 효과 극대화 가능. USDC 브릿지 후 Shielded 거래로 MEV(샌드위치 공격)를 완전히 방어하여 대규모 트레이더에게 특히 유리. $3M 시드 완료로 개발 자금 확보. Hyperliquid 생태계 최초 프라이버시 솔루션이라 희소성 프리미엄 기대.",
    strat:"USDC 브릿지 → Shielded 거래 + 극초기 포인트.", ref:"https://silhouette.fi",
    yt:[{t:"실루엣 Shielded Trading",u:"https://www.youtube.com/watch?v=UTWmrmTF9Wg"}]},

  {id:23,n:"MegaETH",cat:"L2",ch:"MegaETH",logo:CL("megaeth"),st:"예상",rw:"대형",fund:"$107M",dist:"5%+",tge:"Q2 2026",
    desc:"Vitalik 투자. 35K TPS 리얼타임 L2.",
    insight:"Vitalik + Dragonfly $107M 투자. 35K TPS로 Solana급 속도를 이더리움 보안 위에서 구현. Polymarket에서 67% 확률 2026.06.30 이전 TGE 예측. Fluffle NFT 홀더 5% 보장. 2026.02.09 메인넷 라이브.",
    strat:"브릿지 + dApp 사용 + Fluffle NFT 보유 시 보장.", ref:"https://megaeth.systems",yt:[]},

  {id:24,n:"Reya",cat:"PerpDEX",ch:"Ethereum",logo:LL("reya-perps.jpg"),st:"진행중",rw:"중형~대형",fund:"$19M",dist:"45%",tge:"미정",
    desc:"모듈러 PerpDEX 체인. 45% 커뮤니티. 2 Sigma 출신 팀.",
    insight:"Framework Ventures + Coinbase Ventures $19M. 커뮤니티 45%는 PerpDEX 중 상위권(Variational 50%, Aster 53.5% 다음). 자체 L2 모듈러 체인으로 가스비 없는 환경. 2 Sigma(퀀트펀드) 출신 팀.",
    strat:"Perp 거래 + 유동성 제공.", ref:"https://reya.network",yt:[]},

  {id:25,n:"Pacifica",cat:"PerpDEX",ch:"Solana",logo:LL("pacifica.jpg"),st:"진행중",rw:"중형~대형",fund:"Self-funded",dist:"미정",tge:"미정",
    desc:"FTX 전 COO 설립. VC 없이 자체 펀딩 (하이퍼리퀴드 모델).",
    insight:"Constance Wang(FTX 전 COO) 설립. 하이퍼리퀴드처럼 VC 없이 자체 펀딩 — 커뮤니티 배분 비율 극대화 가능. 매주 목요일 1,000만 포인트 배포. 안티시빌을 강하게 적용해 정직한 유저에게 유리.",
    strat:"거래 볼륨 + 주간 포인트 + 안티시빌 우대.", ref:"https://app.pacifica.fi?referral=cryptocurrencymage",
    yt:[{t:"Pacifica Perp DEX",u:"https://youtu.be/kabzoJJBto0"}]},

  {id:28,n:"Hylo",cat:"DeFi",ch:"Solana",logo:LL("hylo-protocol.jpg"),st:"진행중",rw:"중형",fund:"-",dist:"미정",tge:"미정",
    desc:"Solana 레버리지 수익률 프로토콜.",
    insight:"Solana DeFi에서 레버리지 수익률을 구현하는 핵심 프로토콜. SOL/USDC 예치 후 최대 5x 레버리지로 수익률 증폭 가능. OnRe와 조합하면 Solana 수익률 파밍 시너지 극대화. 일반 스테이킹 대비 3-5배 높은 APY를 안정적으로 제공. Solana DeFi 르네상스 핵심 인프라.",
    strat:"SOL 예치 + 레버리지 수익률.", ref:"https://hylo.so/leverage?ref=RGCOFI",
    yt:[{t:"Hylo+OnRe 수익률",u:"https://youtu.be/15JiPzLcwdU"}]},

  {id:29,n:"Miracle",cat:"PerpDEX",ch:"Multi-chain",logo:LL("miracle.jpg"),st:"진행중",rw:"중형~대형",fund:"-",dist:"미정",tge:"미정",
    desc:"Perp DEX 애그리게이터 터미널.",
    insight:"여러 Perp DEX 주문을 하나의 터미널에서 통합 실행하는 애그리게이터. 각 DEX 최적 가격 비교 후 자동 라우팅으로 항상 최저 슬리피지 보장. 여러 DEX 포인트를 동시 파밍하면서 최적 가격 거래 가능. 1inch가 스팟 DEX 애그리게이터의 표준이 된 것처럼, Miracle은 Perp DEX 애그리게이터 표준을 목표.",
    strat:"터미널 통해 다중 DEX 동시 파밍.", ref:"https://miracletrade.com/?ref=coinmage",
    yt:[{t:"Miracle 터미널",u:"https://youtu.be/jNCnE_meJTw"}]},

  {id:50,n:"StandX",cat:"PerpDEX",ch:"Multi",logo:LL("standx-perps.jpg"),rw:"중형",st:"진행중",
    desc:"바이낸스 선물 창립팀 + 골드만삭스 출신 Perp DEX.",
    insight:"CEO AG가 바이낸스 선물 창립 멤버 + 골드만삭스 출신 팀으로 구성된 엘리트 프로젝트. DUSD 수익형 스테이블코인을 마진으로 사용하여 보유 기간에 비례해 포인트가 가산되는 독특한 구조. 스테이블 예치만으로도 파밍이 가능해 시장 변동 리스크 최소화. 바이낸스 선물 인프라를 만든 팀이라 거래 엔진 성능이 검증됨.",
    strat:"DUSD 전환 + 예치 + Perp 거래.", ref:"https://standx.io",
    yt:[{t:"StandX",u:"https://youtu.be/x7m7B5uJewE"}]},

  {id:51,n:"Theo",cat:"DeFi",ch:"HyperEVM",logo:LL("theo-straddle-vaults.jpg"),rw:"중형",st:"진행중",fund:"$20M",
    desc:"$20M 펀딩 델타뉴트럴 볼트 + thGOLD 토큰화 금.",
    insight:"$20M 대형 펀딩 완료로 자금력 검증. 델타뉴트럴 전략으로 시장 방향과 무관하게 안정 수익을 제공하는 볼트 운영. thGOLD(토큰화 금) 출시로 RWA 시장 진입. S2 포인트 매주 금요일 배포 중이며 최소 $1,000 이상 예치 시 효율적. HyperEVM 핵심 DeFi 프로토콜로 HYPE 생태계 성장과 직결.",
    strat:"스테이블/ETH 예치 + S2 포인트.", ref:"https://theo.xyz",
    yt:[{t:"THEO 예치작업",u:"https://youtu.be/spjWF2_NaK0"}]},

  {id:52,n:"Felix",cat:"DeFi",ch:"HyperEVM",logo:LL("felix-cdp.jpg"),rw:"중형~대형",st:"진행중",
    desc:"HyperEVM 스테이블코인 feUSD 민팅 + Stability Pool.",
    insight:"HyperEVM 핵심 스테이블코인 프로토콜. ETH/HYPE를 담보로 feUSD 민팅 후 Stability Pool에 예치하면 청산 이벤트 발생 시 할인된 담보를 수익으로 획득. S2 포인트 진행중이며 초기 참여자 우대 가능성. HYPE 생태계의 MakerDAO 역할로 생태계 성장 시 핵심 인프라로 직접 수혜. Liquity V2 포크 기반으로 검증된 코드베이스.",
    strat:"feUSD 민팅 + Stability Pool 예치.", ref:"https://usefelix.xyz",yt:[]},

  {id:54,n:"OnRe",cat:"DeFi",ch:"Solana",logo:LL("onre.jpg"),rw:"중형",st:"진행중",
    desc:"Solana 수익률 프로토콜. 리더보드 보상.",
    insight:"Solana DeFi 수익률 최적화 전문 프로토콜. 리더보드 경쟁 시스템으로 상위 유저에게 추가 보상 지급. Hylo와 조합하면 Solana 수익률 파밍 시너지 극대화. SOL/스테이블코인 예치로 안정적 수익 + 리더보드 순위 보너스 이중 수익 구조. Solana TVL 성장세와 함께 직접 수혜 기대.",
    strat:"SOL/스테이블 예치 + 리더보드 순위.", ref:"https://app.onre.finance/earn/leaderboard?ref=FQLFHEYMW",
    yt:[{t:"Solana 수익률",u:"https://youtu.be/15JiPzLcwdU"}]},

  {id:57,n:"xStocks",cat:"DeFi",ch:"Multi",logo:LL("xstocks.jpg"),rw:"중형",st:"진행중",
    desc:"온체인 주식 토큰 거래. Equity Perps.",
    insight:"TradFi 주식을 온체인 토큰으로 변환하여 24시간 거래 가능하게 하는 프로젝트. Extended와 함께 2026 Equity Perps 핵심 프로젝트. 미국 주식시장 $50T+ 규모의 온체인 유입이 시작되면 폭발적 성장 잠재력. 규제 환경이 명확해지는 2026년이 핵심 전환점.",
    strat:"주식 토큰 거래 + 포인트.", ref:"https://xstocks.io",
    yt:[{t:"xStocks 에어드랍",u:"https://www.youtube.com/watch?v=E-fHENsX-Gk"}]},

  {id:58,n:"EVEDEX",cat:"PerpDEX",ch:"Multi",logo:LL("evedex.jpg"),rw:"중형",st:"진행중",
    desc:"차세대 Perp DEX. 초대 기반 접근.",
    insight:"초대 코드 기반 접근으로 초기 유저를 강력히 우대하는 구조. PerpDEX 시장에서 유저 퀄리티 중심 차별화 전략 채택. 초기 참여자에게 더 높은 배분 비율이 예상되며, 커뮤니티 규모보다 활동 깊이를 보상하는 모델. 멀티체인 지원으로 다양한 네트워크에서 거래 가능.",
    strat:"초대 코드 가입 + 거래.", ref:"https://invite.evedex.com",yt:[]},

  {id:59,n:"Minara",cat:"AI",ch:"Multi",logo:LL("minara-ai-perps.jpg"),rw:"중형",st:"진행중",fund:"Circle Ventures",
    desc:"AI 자동매매. Circle Ventures(USDC 발행사) 투자.",
    insight:"USDC 발행사 Circle의 벤처 부문(Circle Ventures)이 직접 투자한 AI 트레이딩 프로젝트. AI가 시장 데이터를 분석하여 자동 매매 시그널 생성. NFT 기반 에어드랍 시스템으로 NFT 보유자에게 우선 배분. Circle 투자는 결제/스테이블코인 생태계와 연결 가능성을 시사.",
    strat:"AI 트레이딩 + NFT 보유.", ref:"https://minara.ai",
    yt:[{t:"Minara AI",u:"https://www.youtube.com/watch?v=9DJKCrlkkLI"}]},

  {id:60,n:"Abstract",cat:"L2",ch:"Abstract",logo:CL("abstract"),rw:"중형",st:"진행중",fund:"$11M",
    desc:"Pudgy Penguins 모회사 Igloo L2. XP 포인트.",
    insight:"Pudgy Penguins(월마트 판매 1위 NFT) 모회사 Igloo가 만든 L2. $11M 펀딩 완료. XP + 배지 시스템으로 활동 기반 포인트 축적. PENGU 홀더에게 보너스 기대. 소비자 친화적 L2로 NFT, 게임, 소셜 분야 킬러앱 유치에 집중. 강력한 브랜드 인지도가 핵심 차별점.",
    strat:"XP 포인트 + 생태계 dApp 활동.", ref:"https://abs.xyz",yt:[]},
];

const YT = id => `https://www.youtube.com/watch?v=${id}`;
const THUMB = id => `https://img.youtube.com/vi/${id}/mqdefault.jpg`;

const ALL_VIDS = [
  // ═ 자동매매 봇 ═
  {t:"PerpDEX 16개 동시 자동매매 봇",v:"1.3K",id:"jNCnE_meJTw",g:"bot"},
  {t:"GRVT 자동매매 봇 실거래",v:"440",id:"oiG4ppTB3rQ",g:"bot"},
  {t:"GRVT 워시 & OI 부스팅 실전",v:"251",id:"TmJY4S7Y_oU",g:"bot"},
  {t:"Backpack 자동매매 봇 가이드",v:"783",id:"q84UWHMtbQA",g:"bot"},
  {t:"PerpDEX 자동매매 봇 (NADO)",v:"709",id:"Fyq8M2Cy__I",g:"bot"},
  // ═ AI 도구 ═
  {t:"AI + 옵시디언 수익률 데이터",v:"242",id:"91eNcuninV0",g:"ai"},
  {t:"Claude 자동 시그널 리포트",v:"3.1K",id:"Bx5zgBbR_oU",g:"ai"},
  {t:"Cursor DCA 시뮬레이터",v:"436",id:"H1bOhm0b6R0",g:"ai"},
  {t:"AI 에이전트 사주앱 (Claude Code)",v:"546",id:"PQ_EjWX0Fnw",g:"ai"},
  {t:"OpenClaw 텔레그램 AI 비서",v:"10K",id:"HAMHYvAekjw",g:"ai"},
  {t:"비트코인 AI 시그널 분석",v:"429",id:"222YdCeJe3o",g:"ai"},
  // ═ AI 아트 ═
  {t:"ComfyUI 완벽 입문 2026",v:"7K",id:"MN4PpubmG10",g:"art"},
  {t:"ComfyUI ControlNet 끝내기",v:"909",id:"3En3BJW2tjc",g:"art"},
  {t:"SD → Grok AI 영상 만들기",v:"516",id:"dSsbWFwOpe4",g:"art"},
  {t:"SD LoRA 완전정복",v:"1K",id:"k9o_dar13Vc",g:"art"},
  {t:"스테이블 디퓨전 초보자 가이드",v:"3.4K",id:"b4j58RMiakU",g:"art"},
  // ═ 에어드랍 가이드 ═
  {t:"Minara 서클벤처 + AI자동매매",v:"250",id:"bCC-6jacJ9U",g:"drop"},
  {t:"TCG 에어드랍 4종 정리",v:"1K",id:"p_9ibz1zPwA",g:"drop"},
  {t:"xStocks 에어드랍 파밍",v:"399",id:"E-fHENsX-Gk",g:"drop"},
  {t:"Fair Shares 무료 에드",v:"513",id:"c5ykmklMJoU",g:"drop"},
  {t:"Nado 통합증거금 혁신",v:"385",id:"0dZdAMJK_l4",g:"drop"},
  {t:"실루엣 Shielded Trading",v:"341",id:"UTWmrmTF9Wg",g:"drop"},
  {t:"GRVT 올인원 가이드",v:"614",id:"aIBweqY8A4s",g:"drop"},
  {t:"Hylo · OnRe 고정수익 4중 파밍",v:"581",id:"vkrCgskj_GA",g:"drop"},
  {t:"Arc 결제 전용 블록체인",v:"433",id:"MUTrYFUQOU0",g:"drop"},
  {t:"퍼프덱스 메가트렌드 총정리",v:"2.4K",id:"mkUG7rb_GEM",g:"drop"},
  {t:"Tempo 테스트넷 작업",v:"753",id:"xNphMdfP0yU",g:"drop"},
  {t:"Kodiak Amber 베라체인 인프라",v:"456",id:"_69zUhSi8NM",g:"drop"},
];

const VID_GROUPS = [
  {id:"all",l:"전체"},
  {id:"bot",l:"자동매매 봇"},
  {id:"ai",l:"AI 도구"},
  {id:"art",l:"AI 아트"},
  {id:"drop",l:"에어드랍"},
];


const CAT_C = {"PerpDEX":"text-violet-300 bg-violet-500/15 border-violet-500/20","DeFi":"text-blue-300 bg-blue-500/15 border-blue-500/20","AI":"text-cyan-300 bg-cyan-500/15 border-cyan-500/20","L2":"text-emerald-300 bg-emerald-500/15 border-emerald-500/20","L1":"text-emerald-300 bg-emerald-500/15 border-emerald-500/20","DEX":"text-fuchsia-300 bg-fuchsia-500/15 border-fuchsia-500/20","인프라":"text-orange-300 bg-orange-500/15 border-orange-500/20","RWA":"text-yellow-300 bg-yellow-500/15 border-yellow-500/20"};
const ST_DOT = {"진행중":"bg-emerald-400 shadow-emerald-400/50","확인됨":"bg-blue-400 shadow-blue-400/50","예상":"bg-amber-400 shadow-amber-400/50","TGE임박":"bg-red-400 shadow-red-400/50 animate-pulse"};

/* ═══════════════════════════════════════════════════════════ */
/*  COMPONENTS                                               */
/* ═══════════════════════════════════════════════════════════ */

function Nav({sec,setSec}) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h, {passive:true});
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-2xl bg-[#0a0a0f]/90 border-b border-white/[0.06] shadow-lg shadow-black/20' : 'bg-transparent'}`}>
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <a href="https://www.youtube.com/@CryptoMage" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 flex items-center justify-center shadow-lg shadow-violet-500/25"><Sparkles size={14} className="text-white"/></div>
          <div className="flex flex-col">
            <span className="font-bold text-sm text-white tracking-tight leading-none">CryptoMage</span>
            <span className="text-[9px] text-zinc-600 font-mono leading-none mt-0.5">7.7K subscribers</span>
          </div>
        </a>
        <div className="flex items-center gap-1 bg-white/[0.04] backdrop-blur-xl rounded-xl p-1 border border-white/[0.06]">
          {[{id:"airdrops",l:"에어드랍",I:Rocket},{id:"vibe",l:"바이브코딩",I:Code2}].map(t=>(
            <button key={t.id} onClick={()=>setSec(t.id)} className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${sec===t.id?'bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 text-white shadow-inner border border-white/[0.08]':'text-zinc-500 hover:text-zinc-300'}`}>
              <t.I size={13}/>{t.l}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2.5">
          <a href="https://blog.naver.com/coinmage" target="_blank" rel="noopener noreferrer" className="text-[11px] text-zinc-500 hover:text-white transition-colors hidden sm:block">블로그</a>
          <a href="https://t.me/cryptocurrencymage" target="_blank" rel="noopener noreferrer" className="text-[11px] text-zinc-500 hover:text-white transition-colors hidden sm:block">텔레그램</a>
          <a href="https://www.youtube.com/@CryptoMage" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-[11px] font-medium hover:bg-red-500/20 transition-all border border-red-500/10"><Play size={10} fill="currentColor"/>YouTube</a>
        </div>
      </div>
    </nav>
  );
}

function PCard({p,onClick}) {
  const cc = CAT_C[p.cat]||CAT_C["DeFi"];
  return (
    <motion.button initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.3}} onClick={onClick}
      className="w-full text-left backdrop-blur-md bg-white/[0.025] hover:bg-white/[0.055] border border-white/[0.06] hover:border-white/[0.14] rounded-2xl p-4 transition-all duration-300 group relative overflow-hidden">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-violet-500/[0.03] via-transparent to-fuchsia-500/[0.03] pointer-events-none"/>
      <div className="relative flex items-center gap-3.5">
        <div className="relative">
          <Logo src={p.logo} name={p.n} size={40}/>
          {p.hot && <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/40"><Flame size={9} className="text-white"/></span>}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[15px] font-semibold text-white">{p.n}</span>
            {p.st && <span className={`w-2 h-2 rounded-full flex-shrink-0 shadow-[0_0_6px] ${ST_DOT[p.st]||'bg-zinc-600'}`}/>}
            {p.pick && <span className="text-[9px] px-2 py-0.5 rounded-md bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 font-semibold border border-amber-500/20">추천</span>}
            {p.hot && <span className="text-[9px] px-2 py-0.5 rounded-md bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 font-semibold border border-orange-500/20">HOT</span>}
            {p.yt && p.yt.length>0 && <Play size={11} fill="currentColor" className="text-red-400 flex-shrink-0"/>}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-medium border ${cc}`}>{p.cat}</span>
            <span className="text-[10px] text-zinc-500">{p.ch}</span>
          </div>
        </div>
        <div className="text-right flex-shrink-0 hidden sm:flex flex-col items-end gap-1">
          {p.fund && p.fund!=="-" && <div className="text-[10px] text-zinc-500 font-mono">{p.fund}</div>}
          {p.dist && p.dist!=="미정" && <div className="text-[12px] font-mono font-bold bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent">{p.dist}</div>}
        </div>
        <div className="w-8 h-8 rounded-xl bg-white/[0.03] flex items-center justify-center group-hover:bg-white/[0.08] transition-all flex-shrink-0">
          <ArrowUpRight size={14} className="text-zinc-600 group-hover:text-white transition-colors"/>
        </div>
      </div>
      {p.desc && <p className="mt-3 text-[12px] text-zinc-500 leading-relaxed line-clamp-2 pl-[52px]">{p.desc}</p>}
    </motion.button>
  );
}

function PModal({p,onClose}) {
  useEffect(()=>{
    if(!p) return;
    const h=e=>{if(e.key==='Escape') onClose();};
    window.addEventListener('keydown',h);
    return ()=>window.removeEventListener('keydown',h);
  },[p,onClose]);
  if(!p) return null;
  const cc = CAT_C[p.cat]||CAT_C["DeFi"];
  return (
    <AnimatePresence><motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <motion.div initial={{y:80,opacity:0}} animate={{y:0,opacity:1}} transition={{type:"spring",damping:30,stiffness:350}}
        className="w-full sm:max-w-lg backdrop-blur-2xl bg-[#111115]/95 border border-white/[0.1] rounded-t-3xl sm:rounded-3xl max-h-[88vh] overflow-y-auto scrollbar-none shadow-2xl shadow-black/50" onClick={e=>e.stopPropagation()}>
        <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 rounded-t-3xl"/>
        <div className="p-6">
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3.5">
              <Logo src={p.logo} name={p.n} size={48}/>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-white">{p.n}</h3>
                  {p.hot && <span className="text-[9px] px-2 py-0.5 rounded-md bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-300 font-semibold border border-orange-500/20">HOT</span>}
                </div>
                <div className="flex items-center gap-2"><span className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-medium border ${cc}`}>{p.cat}</span><span className="text-[11px] text-zinc-500">{p.ch}</span></div>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-xl bg-white/[0.06] flex items-center justify-center hover:bg-white/[0.14] transition-all border border-white/[0.06]"><X size={14} className="text-zinc-400"/></button>
          </div>

          <div className="flex flex-wrap gap-2 mb-5">
            {p.st && <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/[0.04] text-zinc-300 border border-white/[0.06] flex items-center gap-1.5"><span className={`w-1.5 h-1.5 rounded-full ${ST_DOT[p.st]||'bg-zinc-600'}`}/>{p.st}</span>}
            {p.rw && <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/[0.04] text-zinc-300 border border-white/[0.06]">{p.rw}</span>}
            {p.tge && <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/[0.04] text-zinc-400 border border-white/[0.06]">TGE {p.tge}</span>}
          </div>

          <div className="grid grid-cols-2 gap-2.5 mb-5">
            {p.fund && p.fund!=="-" && <div className="backdrop-blur-sm bg-white/[0.03] rounded-xl p-3 border border-white/[0.06]"><div className="text-[9px] uppercase tracking-widest text-zinc-600 mb-1.5 flex items-center gap-1"><Shield size={9}/>펀딩</div><div className="text-sm font-semibold text-white">{p.fund}</div></div>}
            {p.dist && p.dist!=="미정" && <div className="backdrop-blur-sm bg-gradient-to-br from-violet-500/[0.06] to-fuchsia-500/[0.04] rounded-xl p-3 border border-violet-500/10"><div className="text-[9px] uppercase tracking-widest text-violet-400 mb-1.5 flex items-center gap-1"><Sparkles size={9}/>배분율</div><div className="text-sm font-bold bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent">{p.dist}</div></div>}
          </div>

          {p.desc && <p className="text-[14px] text-zinc-300 leading-relaxed mb-5">{p.desc}</p>}

          {p.insight && (
            <div className="mb-5 backdrop-blur-lg bg-gradient-to-br from-violet-500/[0.08] via-fuchsia-500/[0.04] to-pink-500/[0.06] border border-violet-500/15 rounded-2xl p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/[0.06] rounded-full blur-3xl pointer-events-none"/>
              <div className="relative">
                <div className="text-[10px] uppercase tracking-widest text-violet-400 mb-2 flex items-center gap-1.5 font-semibold"><Zap size={11}/>핵심 정보</div>
                <p className="text-[13px] text-zinc-200 leading-[1.9]">{p.insight}</p>
              </div>
            </div>
          )}

          {p.strat && (
            <div className="mb-5 backdrop-blur-sm bg-white/[0.025] border border-white/[0.06] rounded-xl p-4">
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2 flex items-center gap-1.5 font-semibold"><TrendingUp size={11}/>추천 전략</div>
              <p className="text-[13px] text-zinc-300 leading-relaxed">{p.strat}</p>
            </div>
          )}

          {p.yt && p.yt.length>0 && (
            <div className="mb-5">
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2.5 font-semibold">관련 영상</div>
              <div className="space-y-2">
                {p.yt.map((v,i)=>(<a key={i} href={v.u} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:bg-red-500/[0.06] hover:border-red-500/15 transition-all duration-200 group"><div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0"><Play size={12} fill="currentColor" className="text-red-400"/></div><span className="text-[13px] text-zinc-300 group-hover:text-white truncate flex-1">{v.t}</span><ExternalLink size={11} className="text-zinc-600 flex-shrink-0"/></a>))}
              </div>
            </div>
          )}

          {p.ref && p.ref!=="#" && (
            <a href={p.ref} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-sm font-semibold text-white hover:shadow-lg hover:shadow-violet-500/25 hover:scale-[1.02] transition-all duration-300 active:scale-[0.98]">
              시작하기 <ArrowUpRight size={15}/>
            </a>
          )}
        </div>
      </motion.div>
    </motion.div></AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════ */
/*  SECTIONS                                                 */
/* ═══════════════════════════════════════════════════════════ */

function AirdropsSection() {
  const [sel,setSel]=useState(null);
  const [q,setQ]=useState("");
  const [pf,setPf]=useState("all"); // "all" | "pick"
  const [cf,setCf]=useState("all");

  const cats = useMemo(()=>{const s=new Set();P.forEach(p=>s.add(p.cat));return["all",...Array.from(s)];},[]);
  const pickCount = useMemo(()=>P.filter(p=>p.pick).length,[]);

  const filtered = useMemo(()=>{
    const s=q.toLowerCase();
    return P.filter(p=>{
      if(s && !p.n.toLowerCase().includes(s) && !(p.cat||'').toLowerCase().includes(s) && !(p.ch||'').toLowerCase().includes(s)) return false;
      if(cf!=="all" && p.cat!==cf) return false;
      if(pf==="pick" && !p.pick) return false;
      return true;
    });
  },[q,cf,pf]);

  // 추천 프로젝트를 상단으로
  const sorted = useMemo(()=>[...filtered].sort((a,b)=>(b.pick?1:0)-(a.pick?1:0)),[filtered]);

  return (
    <div className="space-y-5">
      <div className="pt-6 pb-2">
        <motion.h1 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="text-2xl sm:text-3xl font-bold text-white mb-1 tracking-tight">에어드랍 트래커</motion.h1>
        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.1}} className="text-sm text-zinc-500 mb-1">미상장 유망 프로젝트 · 참여 전략</motion.p>
        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.15}} className="text-[10px] text-zinc-600 mb-5 flex items-center gap-1.5"><Clock size={10}/>Last updated: 2026.03.29</motion.p>
        <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.1}}
          className="flex gap-3">
          <div className="bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10 backdrop-blur-sm border border-white/[0.06] rounded-2xl px-5 py-3 relative overflow-hidden">
            <div className="absolute top-2 right-2 opacity-10"><Globe size={24}/></div>
            <div className="text-2xl font-bold font-mono text-white relative"><Counter value={P.length}/></div>
            <div className="text-[10px] text-zinc-500 mt-0.5 font-medium">프로젝트</div>
          </div>
          <div className="bg-gradient-to-br from-amber-500/15 to-orange-500/10 backdrop-blur-sm border border-white/[0.06] rounded-2xl px-5 py-3 relative overflow-hidden">
            <div className="absolute top-2 right-2 opacity-10"><Star size={24}/></div>
            <div className="text-2xl font-bold font-mono text-amber-300 relative"><Counter value={pickCount}/></div>
            <div className="text-[10px] text-zinc-500 mt-0.5 font-medium">추천</div>
          </div>
        </motion.div>
      </div>

      <div className="relative">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"/>
        <input type="text" value={q} onChange={e=>setQ(e.target.value)} placeholder="프로젝트, 카테고리, 체인 검색..."
          className="w-full backdrop-blur-md bg-white/[0.035] border border-white/[0.08] rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/40 focus:bg-white/[0.05] transition-all duration-200"/>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
        <div className="flex items-center gap-0.5 bg-white/[0.03] backdrop-blur-sm rounded-xl p-1 flex-shrink-0 border border-white/[0.05]">
          {[{id:"all",l:"전체"},{id:"pick",l:`추천 ${pickCount}`}].map(t=>(
            <button key={t.id} onClick={()=>setPf(t.id)} className={`px-3.5 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-200 ${pf===t.id?'bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 text-white shadow-sm border border-white/[0.08]':'text-zinc-500 hover:text-zinc-300'}`}>{t.l}</button>
          ))}
        </div>
        <div className="w-px h-5 bg-white/[0.08] flex-shrink-0"/>
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          {cats.map(c=>(<button key={c} onClick={()=>setCf(c)} className={`px-2.5 py-1.5 rounded-lg text-[10px] font-medium whitespace-nowrap transition-all duration-200 ${cf===c?'bg-violet-500/20 text-violet-300 border border-violet-500/20':'text-zinc-600 hover:text-zinc-400'}`}>{c==="all"?"카테고리":c}</button>))}
        </div>
      </div>

      {(q || pf!=="all" || cf!=="all") && <div className="text-[11px] text-zinc-600 font-medium">{sorted.length}개 프로젝트</div>}
      <div className="space-y-2">
        {sorted.map(p=><PCard key={p.id} p={p} onClick={()=>setSel(p)}/>)}
        {sorted.length===0 && <div className="text-center py-12 text-zinc-600 text-sm">검색 결과가 없습니다</div>}
      </div>

      <PModal p={sel} onClose={()=>setSel(null)}/>
    </div>
  );
}

function VibeCodingSection() {
  const [vf,setVf]=useState("all");
  const vids = useMemo(()=>vf==="all"?ALL_VIDS:ALL_VIDS.filter(v=>v.g===vf),[vf]);

  return (
    <div className="space-y-5 pt-6">
      <div>
        <motion.h1 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="text-2xl sm:text-3xl font-bold text-white mb-1 tracking-tight">영상 라이브러리</motion.h1>
        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.1}} className="text-sm text-zinc-500">자동매매 봇, AI 도구, 에어드랍 가이드 영상 모음</motion.p>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.15}} className="mt-3 flex gap-3">
          <div className="bg-gradient-to-br from-red-500/15 to-pink-500/10 backdrop-blur-sm border border-white/[0.06] rounded-2xl px-5 py-3">
            <div className="text-2xl font-bold font-mono text-red-300"><Counter value={ALL_VIDS.length}/></div>
            <div className="text-[10px] text-zinc-500 mt-0.5 font-medium">영상</div>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
        {VID_GROUPS.map(g=>(
          <button key={g.id} onClick={()=>setVf(g.id)} className={`px-3 py-1.5 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all duration-200 ${vf===g.id?'bg-gradient-to-r from-red-500/20 to-pink-500/20 text-white border border-red-500/20':'text-zinc-500 hover:text-zinc-300'}`}>{g.l}</button>
        ))}
      </div>

      <div className="text-[11px] text-zinc-600 font-medium">{vids.length}개 영상</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {vids.map((v,i)=>(
          <motion.a key={v.id} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={{delay:0.03*i}}
            href={YT(v.id)} target="_blank" rel="noopener noreferrer" className="flex gap-3 backdrop-blur-sm bg-white/[0.025] border border-white/[0.06] rounded-2xl p-3 hover:bg-red-500/[0.04] hover:border-red-500/15 transition-all duration-200 group overflow-hidden">
            <div className="w-24 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-white/[0.04] relative">
              <img src={THUMB(v.id)} alt={v.t} className="w-full h-full object-cover" loading="lazy"/>
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"><Play size={16} fill="currentColor" className="text-white drop-shadow-lg"/></div>
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <div className="text-[13px] text-white line-clamp-2 leading-snug group-hover:text-red-200 transition-colors">{v.t}</div>
              <div className="text-[10px] text-zinc-600 mt-1">{v.v} views</div>
            </div>
          </motion.a>
        ))}
      </div>

      <a href="https://www.youtube.com/@CryptoMage" target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/15 text-sm font-semibold text-red-300 hover:from-red-500/20 hover:to-red-600/20 transition-all duration-300">
        <Play size={14} fill="currentColor"/> 크립토메이지 YouTube 구독
      </a>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════ */
/*  APP                                                      */
/* ═══════════════════════════════════════════════════════════ */
export default function App() {
  const [sec,setSec]=useState("airdrops");
  return (
    <div className="min-h-screen bg-[#08080d] text-zinc-200 selection:bg-violet-500/30">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-40%] left-[-25%] w-[80%] h-[70%] rounded-full bg-violet-900/[0.05] blur-[180px] animate-pulse" style={{animationDuration:'8s'}}/>
        <div className="absolute bottom-[-30%] right-[-20%] w-[60%] h-[50%] rounded-full bg-fuchsia-900/[0.04] blur-[150px] animate-pulse" style={{animationDuration:'12s'}}/>
        <div className="absolute top-[40%] left-[50%] w-[40%] h-[30%] rounded-full bg-blue-900/[0.03] blur-[120px] animate-pulse" style={{animationDuration:'10s'}}/>
      </div>
      <Nav sec={sec} setSec={setSec}/>
      <main className="relative max-w-2xl mx-auto px-4 pb-24">
        <AnimatePresence mode="wait">
          {sec==="airdrops" && <motion.div key="a" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.2}}><AirdropsSection/></motion.div>}
          {sec==="vibe" && <motion.div key="v" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.2}}><VibeCodingSection/></motion.div>}
        </AnimatePresence>
      </main>
      <footer className="relative border-t border-white/[0.04] py-8">
        <div className="max-w-2xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
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
