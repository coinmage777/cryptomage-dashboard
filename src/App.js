import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Play, Sparkles, ArrowUpRight, X, ChevronDown, Star, CircleDot, Rocket, Code2, Terminal, Hash, ExternalLink, ChevronUp, Flame, Zap, TrendingUp, Shield, Globe, Layers } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════ */
/*  HELPERS                                                   */
/* ═══════════════════════════════════════════════════════════ */
const LL = s => `https://icons.llamao.fi/icons/protocols/${s}`;
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

/* Animated counter */
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
/*  PROJECT DATA                                              */
/* ═══════════════════════════════════════════════════════════ */

const P = [
  // ══ TIER 1 ══
  {id:1,n:"GRVT",tier:1,cat:"PerpDEX",ch:"zkSync",logo:LL("grvt"),st:"진행중",rw:"중형~대형",fund:"$47.2M",dist:"28%",tge:"Q3 2026",
    desc:"ZKsync Validium 기반 하이브리드 거래소. CEX급 속도와 UX를 갖춘 차세대 Perp DEX.",
    insight:"Matrix Partners + Delphi Digital 리드 투자. 계정 기반 참여 시스템으로 시빌을 효과적으로 걸러내는 구조. 메이커 수수료가 마이너스(리베이트)라서 마켓메이킹할수록 수수료를 돌려받는 구조. S2 배분이 18%로 매우 넉넉하며, 예치만으로도 연 10% 이자를 제공하는 Earn 프로그램이 별도로 운영 중. zkSync Validium 기술로 이더리움 보안을 유지하면서도 초당 2만 TPS 처리 가능.",
    strat:"거래량 축적 + Earn 예치 + 포인트 파밍. 봇 자동화 가능.", ref:"https://grvt.io/exchange/sign-up?ref=1O9U2GG",
    yt:[{t:"초보자 GRVT 올인원 가이드",u:"https://youtu.be/cYnAPdjzjhk"},{t:"GRVT 자동매매 봇",u:"https://www.youtube.com/watch?v=aIBweqY8A4s"}]},
  {id:2,n:"Nado",tier:1,cat:"PerpDEX",ch:"Ink (Kraken)",logo:TW("2037738709110640640/e8VZdaut_400x400.jpg"),st:"진행중",rw:"대형",fund:"Kraken",dist:"$INK 확정",tge:"Q3-Q4 2026",
    desc:"Kraken이 직접 인큐베이팅한 Ink L2 네이티브 Perp DEX. 크로스마진 + 통합증거금.",
    insight:"Kraken이 $150B+ 거래량 인프라를 기반으로 직접 만든 프로젝트. $INK 토큰 에어드랍이 공식 확정된 극소수 프로젝트 중 하나. Nado 사용 시 Ink L2 배분에서 최다 수혜가 예상되며, NLP(네이티브 유동성 풀) 예치로 추가 수익 창출 가능. USDC/kBTC/WETH Perp 거래가 핵심이며, 크로스마진 기능으로 자본 효율성이 높음.",
    strat:"USDC/kBTC/WETH Perp 거래 + NLP 예치 + 포인트 파밍.", ref:"https://nado.xyz",
    yt:[{t:"크라켄이 만든 퍼프덱스 Nado",u:"https://youtu.be/Fyq8M2Cy__I"},{t:"Nado 자동매매 봇",u:"https://www.youtube.com/watch?v=Fyq8M2Cy__I"}]},
  {id:3,n:"Aster",tier:1,cat:"PerpDEX",ch:"Aster L1",logo:TW("2001105770780483585/Ph9MFPHV_400x400.jpg"),st:"진행중",rw:"대형",fund:"YZi Labs (CZ)",dist:"53.5%",tge:"진행중",hot:true,
    desc:"CZ가 어드바이저로 참여하는 차세대 Perp DEX. 1001x 레버리지, 히든오더, 크로스체인.",
    insight:"역대 최대 53.5% 커뮤니티 에어드랍으로 화제. 현재 Stage 6 진행중이며 일일 거래량 $787M ATH 기록. 전 바이낸스 직원 다수가 합류한 팀 구성. 자체 L1 테스트넷을 가동하며 1001x 레버리지, 히든오더(대규모 주문 숨김), 크로스체인 결제 등 혁신적 기능 탑재. YZi Labs(구 Binance Labs) 직접 지원으로 바이낸스 상장 가능성도 높게 점쳐짐.",
    strat:"Stage 6 파밍 + 거래 볼륨 + 스테이킹.", ref:"https://aster.trade",
    yt:[]},
  {id:4,n:"Genius",tier:1,cat:"PerpDEX",ch:"Multi-chain",logo:TW("1979619700825874432/2XVWJSRF_400x400.jpg"),st:"진행중",rw:"대형",fund:"YZi Labs (CZ)",dist:"미정",tge:"Apr 12, 2026",hot:true,
    desc:"YZi Labs 8자리 투자 + CZ 어드바이저. 올인원 트레이딩 터미널.",
    insight:"2026.04.12 GENIUS 토큰 생성이 확정된 상태로 TGE 임박. YZi Labs(구 Binance Labs)가 8자리 달러를 투자한 프로젝트. S1 마감이 임박해 조기 참여가 유리. 주간 1,000만 GP(Genius Points) 배포 중이며, 포인트→토큰 전환 시 50% 보너스가 예정되어 있어 실질 수익률이 높음. 스팟 거래 볼륨이 GP 배분의 핵심 기준.",
    strat:"스팟 거래 볼륨 축적 (GP 배분 기준) + S1 참여.", ref:"https://genius.trade",
    yt:[]},
  {id:5,n:"Variational",tier:1,cat:"PerpDEX",ch:"Multi-chain",logo:LL("variational"),st:"진행중",rw:"대형",fund:"$11.8M",dist:"50%",tge:"미정",
    desc:"500+ 페어 Perp DEX. 커뮤니티 50% 배분. 0% 수수료 + 손실 환급.",
    insight:"Bain Capital Crypto + Coinbase Ventures + Peak XV(구 세쿼이아 인디아) 등 대형 VC $11.8M 투자. 커뮤니티 배분 50%는 Aster와 함께 역대 최고 수준. 무수수료(0% 수수료)라서 거래 비용 부담이 전혀 없고, 손실 환급 프로그램까지 운영 중. 양방 OI(오픈인터레스트) 유지 전략과 알트코인 가중치 활용이 효율적인 파밍법.",
    strat:"Perp 거래 (양방 OI 유지) + 레퍼럴 + 알트코인 가중치 활용.", ref:"https://variational.io",
    yt:[{t:"Variational 양방 OI 유지",u:"https://youtu.be/AfH8wppr0xc"}]},
  {id:6,n:"Extended",tier:1,cat:"PerpDEX",ch:"Multi-chain",logo:LL("extended"),st:"진행중",rw:"대형",fund:"$6.5M",dist:"30% 확정",tge:"Q2 2026",
    desc:"주식/금/SPX Perp 거래. Revolut DNA + ZK 롤업. 30% 확정 배분.",
    insight:"2026년 주요 트렌드인 TradFi 자산 온체인화(Equity Perps)를 선도하는 프로젝트. 소프트뱅크 비전펀드가 Revolut에 $1.6B 투자한 것과 같은 DNA. 주식(SPX, 테슬라 등), 금, 원자재를 Perp으로 24시간 거래 가능. ZK 롤업 기반이라 이더리움 보안 + 초고속 체결. 30% 커뮤니티 배분이 확정되어 있어 불확실성 낮음.",
    strat:"주식/원자재 Perp 거래 + XVS 예치 + 포인트 파밍.", ref:"https://app.extended.exchange/join/COINMAGE",
    yt:[{t:"Extended Revolut DNA",u:"https://youtu.be/3InSD1rIxwk"}]},
  {id:7,n:"Polymarket",tier:1,cat:"예측시장",ch:"Polygon",logo:LL("polymarket"),st:"확인됨",rw:"대형",fund:"$74M+",dist:"33.3%",tge:"미정",
    desc:"세계 최대 예측 시장. CMO가 에어드랍 공식 확인. $POLY 토큰 확정.",
    insight:"누적 거래량 $200억 이상으로 예측시장 압도적 1위. $74M 규모 1차 에어드랍을 이미 완료했고 추가 시즌 진행중. 33.3% 커뮤니티 배분 확정. 미국 대선부터 스포츠, 경제지표까지 다양한 마켓을 제공하며, 2026년 메인스트림 채택률 1위. 델타뉴트럴 전략(Yes/No 동시 포지션)으로 리스크를 최소화하면서 에어드랍 파밍 가능.",
    strat:"예측 마켓 주간 활성 거래 + 델타뉴트럴 전략.", ref:"https://polymarket.com",
    yt:[]},
  {id:8,n:"Glider",tier:1,cat:"DeFi",ch:"Multi-chain",logo:LL("glider"),st:"진행중",rw:"대형",fund:"a16z, Coinbase",dist:"미정",tge:"미정",
    desc:"AI DeFi 수익 최적화. a16z + Coinbase + Uniswap 삼중 백업.",
    insight:"a16z + Coinbase Ventures + Uniswap Labs 삼대 메이저가 동시 투자한 극히 이례적인 케이스. AI가 자동으로 DeFi 포트폴리오를 리밸런싱하고 수익률을 최적화하므로 사용자 난이도가 최하 수준. 예치만 해두면 AI가 알아서 최적 전략을 실행하는 구조라 DeFi 초보자도 접근 가능. 쉬운 난이도 대비 VC 급의 대형 보상이 기대됨.",
    strat:"예치 + 포인트 축적. AI 자동 최적화로 별도 관리 불필요.", ref:"https://glider.fi",yt:[]},
  {id:9,n:"Base",tier:1,cat:"L2",ch:"Base",logo:CL("base"),st:"예상",rw:"대형",fund:"Coinbase ($500M+)",dist:"20-25%",tge:"Q2-Q4 2026",
    desc:"Coinbase L2. 토큰 탐색 공식 확인. JPMorgan 추정 $12-34B.",
    insight:"Jesse Pollak(Base 리더)이 네트워크 토큰 탐색을 공식 확인. JPMorgan은 에어드랍 규모를 $2.4-8.5B로 추정 — 역대 최대 에어드랍이 될 수 있음. OP Stack 기반 최대 L2로 이미 수백만 활성 유저를 보유. Coinbase $500M+ 자금력 + 8,000만 인증 유저 베이스가 핵심 차별점. Base 생태계 dApp 활동과 브릿지가 자격 기준이 될 가능성 높음.",
    strat:"Base 생태계 dApp 활동 + 브릿지 + Basedapp 3중 파밍.", ref:"https://base.app/invite/coinmage/VGM6F57T",
    yt:[{t:"중국이 주목하는 에어드랍 2026",u:"https://youtu.be/aIr4gE59IWQ"}]},
  {id:10,n:"Basedapp",tier:1,cat:"DeFi",ch:"Base",logo:LL("basedapp"),st:"진행중",rw:"대형",fund:"Base 에코",dist:"미정",tge:"미정",
    desc:"Base 올인원 DeFi. 3중 파밍 + 비자카드. Coinbase 백업.",
    insight:"Base 토큰 출시 시 에코시스템 전체가 수혜를 받는 구조이므로 Basedapp이 가장 직접적 수혜자. 비자카드 연동으로 실사용 가치가 있으며, 3중 파밍 구조(Base 포인트 + Basedapp 포인트 + DeFi 수익)로 복리 효과를 극대화할 수 있음.",
    strat:"3중 파밍 (Base+Basedapp+DeFi) + 비자카드 활용.", ref:"https://basedapp.com",
    yt:[{t:"Base 대형 에드작",u:"https://youtu.be/aIr4gE59IWQ"}]},

  // ══ TIER 2 ══
  {id:20,n:"edgeX",tier:2,cat:"PerpDEX",ch:"Multi-chain",logo:LL("edgex"),st:"TGE임박",rw:"대형",fund:"Amber Group",dist:"30%",tge:"03.31",
    desc:"StarkEx 기반 Perp DEX. 월 ATH $167B 거래량으로 시장 점유 14%.",
    insight:"XP 가중치 구조: 거래량 60%(스팟 3x 가산), 손실보상 10%, TVL기여 10%. TGE가 3월 31일로 임박한 상태라 마지막 스퍼트 구간. 25% 제네시스 + 5% 프리TGE 배분으로 총 30% 커뮤니티 할당. StarkEx 기반으로 가스비 없이 고속 거래 가능. 현재 월간 ATH $167B 거래량을 기록하며 시장 점유율 14%를 차지.",
    strat:"거래량 파밍 (스팟 3x 가중치 활용) + TGE 전 마지막 포인트 축적.", ref:"https://pro.edgex.exchange/referral/570254647",
    yt:[{t:"올해 하나만 한다면 edgeX",u:"https://youtu.be/X-fXkGELRes"}]},
  {id:21,n:"Ethereal",tier:2,cat:"PerpDEX",ch:"Ethereum",logo:LL("ethereal"),st:"진행중",rw:"대형",fund:"Ethena",dist:"15%",tge:"미정",
    desc:"Ethena 생태계 Perp DEX. USDe 마진. 30x Ethena 리워드.",
    insight:"Ethena(USDe 발행사)가 직접 인큐베이팅한 Perp DEX. ENA 홀더에게 15% 거버넌스 토큰을 직접 배분하는 구조. Ethena 사용하면 30x 리워드 부스트를 받을 수 있어 기존 ENA/USDe 홀더에게 극도로 유리. USDe를 마진으로 사용하므로 스테이블 예치 수익 + 거래 리워드를 동시에 획득 가능한 이중 수익 구조.",
    strat:"USDe 마진 예치 + Perp 거래 + ENA 홀딩 부스트.", ref:"https://ethereal.trade",yt:[]},
  {id:22,n:"Based",tier:2,cat:"PerpDEX",ch:"Multi-chain",logo:LL("based-markets"),st:"진행중",rw:"중형~대형",fund:"-",dist:"미정",tge:"미정",
    desc:"Hyperliquid 기반 6중 파밍 Perp DEX.",
    insight:"하이퍼리퀴드 기반 모바일 PerpDEX로 6중 보상 구조를 구현: HL XP + Based Points + Builder Code + 이벤트 보상 + 레퍼럴 + LP 수익. 한 번의 거래로 6개 보상을 동시에 수확하는 효율 극대화 전략. Hyperliquid L1 위에서 작동하므로 HYPE 38.8% 미래 커뮤니티 보상에서도 간접 수혜.",
    strat:"6중 파밍 (HL+Based+Builder+이벤트+레퍼럴+LP) + 모바일 거래.", ref:"https://app.based.one/register?ref=COINMAGE",
    yt:[{t:"Based 6중 파밍법",u:"https://youtu.be/0hqZI7P8Iyc"}]},
  {id:23,n:"Lighter",tier:2,cat:"PerpDEX",ch:"Multi-chain",logo:LL("lighter"),st:"TGE완료",rw:"중형",fund:"a16z",dist:"완료",tge:"완료",
    desc:"a16z + Founders Fund 투자 Perp DEX. TGE 완료.",
    insight:"a16z + Founders Fund(Peter Thiel) 투자. OTC 가격 포인트당 $95+ 기록하며 높은 시장 평가. TGE 완료 후 시빌 재분배가 진행중이라 정직한 유저에게 추가 배분이 이루어질 가능성. 중화권 에드작 리스트에서도 '가장 불리시한 프로젝트'로 선정될 만큼 시장 평가가 높음.",
    strat:"클레임 확인 + 시빌 재분배 추가 배분 기대.", ref:"https://app.lighter.xyz/trade/ETH?referral=GMYPZWQK69X4",
    yt:[{t:"Lighter 올인원",u:"https://youtu.be/Lii9mokD8Qw"}]},
  {id:24,n:"Backpack",tier:2,cat:"PerpDEX",ch:"Solana",logo:LL("backpack"),st:"TGE완료",rw:"중형",fund:"VARA 라이선스",dist:"완료",tge:"완료",
    desc:"Solana 기반 규제 준수 거래소. VARA 라이선스 보유.",
    insight:"중동 VARA 규제 라이선스를 보유한 합법 거래소. Solana 생태계 핵심 인프라로 자리잡았으며, 2026.03.23에 2.5억 BP 토큰(25%) 에어드랍 완료. xNFT 기술(실행가능 NFT)로 차별화. 클레임이 완료된 상태이므로 추가 시즌 발표를 모니터링할 것.",
    strat:"클레임 확인 + 추가 시즌 모니터링.", ref:"https://backpack.exchange/join/i3bkhbg4",
    yt:[{t:"Backpack Solana DEX",u:"https://youtu.be/NEgGBv2X0M4"}]},
  {id:25,n:"Silhouette",tier:2,cat:"PerpDEX",ch:"HyperEVM",logo:LL("silhouette"),st:"진행중",rw:"중형~대형",fund:"$3M",dist:"미정",tge:"미정",
    desc:"HyperEVM 최초 Shielded Trading. 프라이버시 Perp DEX.",
    insight:"2026년 3대 내러티브 중 하나인 프라이버시를 HyperEVM 위에서 최초 구현. 극초기 단계라 선점 효과가 극대화되는 시기. USDC를 브릿지하여 Shielded 거래를 수행하면 거래 내역이 공개되지 않아 MEV(샌드위치 공격) 방어가 가능. $3M 시드 펀딩 완료.",
    strat:"USDC 브릿지 → Shielded 거래 + 극초기 포인트 파밍.", ref:"https://silhouette.fi",
    yt:[{t:"실루엣 Shielded Trading",u:"https://www.youtube.com/watch?v=UTWmrmTF9Wg"}]},
  {id:26,n:"MegaETH",tier:2,cat:"L2",ch:"MegaETH",logo:LL("megaeth"),st:"예상",rw:"대형",fund:"$107M",dist:"5%+",tge:"Q2 2026",
    desc:"Vitalik 투자 초고속 L2. 35K TPS. 리얼타임 블록체인.",
    insight:"Vitalik Buterin + Dragonfly가 $107M을 투자한 초고속 L2. 35K TPS로 Solana급 속도를 이더리움 보안 위에서 구현. Polymarket에서 67% 확률로 2026.06.30 이전 TGE가 예측됨. Fluffle NFT 홀더에게 5% 토큰 보장이 확정된 상태. 메인넷 2026.02.09 라이브.",
    strat:"브릿지 + dApp 사용 + Fluffle NFT 보유 시 토큰 보장.", ref:"https://megaeth.systems",yt:[]},
  {id:27,n:"Reya",tier:2,cat:"PerpDEX",ch:"Ethereum",logo:LL("reya-network"),st:"진행중",rw:"중형~대형",fund:"$19M",dist:"45%",tge:"미정",
    desc:"이더리움 모듈러 PerpDEX 체인. 45% 커뮤니티. Wintermute 참여.",
    insight:"Framework Ventures + Coinbase Ventures $19M 투자. 커뮤니티 45% 할당은 전체 PerpDEX 중 상위권(Variational 50%, Aster 53.5% 다음). 자체 L2 모듈러 체인을 구축하여 가스비 없는 거래 환경 제공. 2 Sigma(퀀트펀드) 출신 팀.",
    strat:"Perp 거래 + 유동성 제공.", ref:"https://reya.network",yt:[]},
  {id:28,n:"Pacifica",tier:2,cat:"PerpDEX",ch:"Solana",logo:LL("pacifica"),st:"진행중",rw:"중형~대형",fund:"Self-funded",dist:"미정",tge:"미정",
    desc:"FTX 전 COO Constance Wang 설립. VC 없이 자체 펀딩 (하이퍼리퀴드 모델).",
    insight:"Constance Wang(FTX 전 COO)이 설립한 프로젝트로, 하이퍼리퀴드처럼 VC 자금을 받지 않고 자체 펀딩으로 운영. VC가 없다는 것은 토큰 배분에서 커뮤니티 비율이 극대화된다는 의미. 매주 목요일 1,000만 포인트를 배포하며, 안티시빌 정책을 강하게 적용하므로 정직한 유저에게 유리.",
    strat:"거래 볼륨 축적 + 주간 포인트 + 안티시빌 우대.", ref:"https://app.pacifica.fi?referral=cryptocurrencymage",
    yt:[{t:"Pacifica Perp DEX",u:"https://youtu.be/kabzoJJBto0"}]},
  {id:29,n:"Avantis",tier:2,cat:"PerpDEX",ch:"Base",logo:LL("avantis"),st:"진행중",rw:"중형",fund:"Base 에코",dist:"미정",tge:"미정",
    desc:"Base RWA 파생 Perp DEX. Equity Perps (주식/FX/원자재).",
    insight:"Equity Perps 내러티브의 Base 생태계 대표 주자. TradFi 자산(주식, 외환, 금, 원자재)을 온체인 Perp으로 거래 가능. Base 토큰 출시 시 에코시스템 수혜 + Avantis 자체 보상의 이중 효과. Extended와 함께 2026년 Equity Perps 트렌드를 이끄는 핵심 프로젝트.",
    strat:"RWA Perp 거래 (주식/FX/원자재) + Base 포인트 동시 파밍.", ref:"https://www.avantisfi.com/referral?code=coinmage",
    yt:[{t:"Avantis RWA Perp",u:"https://youtu.be/uTPhivRidMo"}]},
  {id:30,n:"Supercexy",tier:2,cat:"PerpDEX",ch:"HyperEVM",logo:TW("2000613313902780418/m6MlsRpl_400x400.jpg"),st:"진행중",rw:"중형~대형",fund:"-",dist:"미정",tge:"미정",
    desc:"Hyperliquid L1 모바일 최적화 Perp DEX. 50x 레버리지 + 고급 주문.",
    insight:"모바일 최적화 PerpDEX로 Hyperliquid 생태계의 핵심 프론트엔드. 트레일링 스탑, 아이스버그 주문, TP/SL 등 고급 주문 기능 지원. HYPE 38.8% 미래 커뮤니티 보상 풀에서 간접 수혜 가능. Builder Code를 통해 한 번의 거래로 HL XP + Supercexy 포인트를 동시 획득. 레퍼럴은 $10K 거래량 달성 후 해금.",
    strat:"모바일 Perp 거래 + HL 포인트 동시 파밍.", ref:"https://supercexy.com/@coinmage",
    yt:[{t:"Supercexy 모바일 PerpDEX",u:"https://youtu.be/m3PVod_jg2s"}]},
  {id:31,n:"Predict.fun",tier:2,cat:"예측시장",ch:"Multi-chain",logo:LL("predict-fun"),st:"진행중",rw:"중형",fund:"-",dist:"미정",tge:"미정",
    desc:"예측 시장 + 폴리마켓 보조 동시 파밍 플랫폼.",
    insight:"Polymarket의 보조 베팅 플랫폼으로 동시 파밍이 가능한 효율적 구조. 같은 예측 이벤트에 Polymarket + Predict.fun 양쪽에서 참여하면 두 플랫폼의 에어드랍/리워드를 동시에 수확할 수 있음. 중화권 에드작 가이드에서도 '델타뉴트럴 사용' 전략으로 추천.",
    strat:"Polymarket과 동시 베팅 + 델타뉴트럴 전략.", ref:"https://predict.fun?ref=5302B",yt:[]},
  {id:32,n:"Kaito",tier:2,cat:"InfoFi",ch:"Multi-chain",logo:LL("kaito"),st:"진행중",rw:"중형",fund:"-",dist:"33.3%",tge:"완료",
    desc:"InfoFi 프로토콜. AI 기반 크립토 정보 가치 토큰화.",
    insight:"정보의 가치를 토큰화하는 InfoFi 내러티브의 선두 주자. Yap Score 시스템으로 X(트위터)에서 양질의 크립토 분석/리서치를 생산하면 보상. 주간 Top 50 Yappers는 $5,000 sKAITO 수령. S1에서 $74M을 배분했고 33.3% 커뮤니티 할당 중 상당 부분이 미래 시즌용으로 남아있어 추가 배분 기대.",
    strat:"X에서 양질의 크립토 리서치 작성 + Yap Score 최적화.", ref:"https://kaito.ai",yt:[]},
  {id:33,n:"Hylo",tier:2,cat:"DeFi",ch:"Solana",logo:LL("hylo"),st:"진행중",rw:"중형",fund:"-",dist:"미정",tge:"미정",
    desc:"Solana 레버리지 수익률 프로토콜.",
    insight:"Solana DeFi에서 레버리지 수익률을 구현하는 프로토콜. OnRe와 함께 Solana 수익률 파밍의 핵심 조합을 이룸. SOL 예치 후 레버리지를 활용해 수익률을 증폭시키는 전략이 핵심.",
    strat:"SOL 예치 + 레버리지 수익률.", ref:"https://hylo.so/leverage?ref=RGCOFI",
    yt:[{t:"Hylo+OnRe 수익률",u:"https://youtu.be/15JiPzLcwdU"}]},
  {id:34,n:"Miracle",tier:2,cat:"PerpDEX",ch:"Multi-chain",logo:LL("miracle"),st:"진행중",rw:"중형~대형",fund:"-",dist:"미정",tge:"미정",
    desc:"Perp DEX 애그리게이터 터미널. 다중 거래소 통합 실행.",
    insight:"여러 Perp DEX의 주문을 하나의 터미널에서 통합 실행하는 애그리게이터. 각 DEX의 최적 가격을 비교하여 자동 라우팅하므로 최적의 체결 가격을 보장. 여러 DEX 포인트를 동시에 파밍하면서 최적 가격 거래가 가능한 일석이조 구조.",
    strat:"터미널 통해 다중 DEX 동시 파밍 + 최적 체결.", ref:"https://miracletrade.com/?ref=coinmage",
    yt:[{t:"Miracle 터미널",u:"https://youtu.be/jNCnE_meJTw"}]},
  {id:35,n:"Aztec",tier:2,cat:"L2",ch:"Aztec",logo:LL("aztec"),st:"진행중",rw:"대형",fund:"$119M",dist:"미정",tge:"미정",
    desc:"프라이버시 zk-rollup L2. a16z + Paradigm. $119M 투자.",
    insight:"a16z + Paradigm이 $119M을 투자한 프라이버시 L2로 역대 최대 규모 프라이버시 프로젝트. 완전한 zk-zk 프라이버시 구현으로 거래 내역, 잔고, 스마트컨트랙트 로직까지 모두 비공개. 2026년 프라이버시 내러티브의 절대적 핵심. 테스트넷 초기 참여가 레트로 에어드랍 자격에 유리.",
    strat:"테스트넷 활동 + 트랜잭션 축적.", ref:"https://aztec.network",yt:[]},
  {id:36,n:"Kodiak",tier:2,cat:"DEX",ch:"Berachain",logo:LL("kodiak"),st:"TGE완료",rw:"중형~대형",fund:"Hack VC, Amber",dist:"미정",tge:"완료",
    desc:"베라체인 공식 인큐베이팅 DEX. KDK 토큰 출시. PoL 유동성 허브.",
    insight:"Build-a-Bera 액셀러레이터 출신 유일 DEX. Hack VC 리드 + Amber Group 유동성 지원. 2025.12 KDK 토큰 출시. Kodiak Amber로 집중 유동성을 자동 리밸런싱하며, xKDK→KDK 1:1 전환 가능. PoL(Proof of Liquidity) 메커니즘 통해 LP→BGT→거버넌스 플라이휠 구조.",
    strat:"유동성 풀 + xKDK 퀘스트 + BGT 보상.", ref:"https://kodiak.finance",yt:[]},
  {id:37,n:"Zama",tier:2,cat:"인프라",ch:"Multi-chain",logo:LL("zama"),st:"진행중",rw:"대형",fund:"$57M",dist:"미정",tge:"미정",
    desc:"FHE 프라이버시 인프라. Pantera 리드. 유니콘 밸류에이션.",
    insight:"Pantera Capital 리드 $57M 투자로 유니콘 밸류에이션 달성. 완전동형암호화(FHE)를 블록체인에 적용하는 인프라 프로젝트. FHE는 암호화된 데이터를 복호화 없이 연산할 수 있는 기술로, 프라이버시의 궁극적 해법. Aztec과 함께 2026년 프라이버시 내러티브의 양대 축.",
    strat:"테스트넷 참여 + 개발자 캠페인.", ref:"https://zama.ai",yt:[]},
  {id:38,n:"Ranger",tier:2,cat:"PerpDEX",ch:"Solana",logo:TW("1958859776378507264/rKl4ICq-_400x400.jpg"),st:"진행중",rw:"중형~대형",fund:"-",dist:"미정",tge:"미정",
    desc:"Solana 최초 PerpDEX 애그리게이터. 다중 DEX 통합.",
    insight:"Solana 생태계 최초의 PerpDEX 애그리게이터로 Jupiter(스팟)의 Perp 버전. 다수 Solana Perp DEX의 호가를 비교하여 최적 가격으로 자동 라우팅. Solana의 빠른 체결 속도 + 애그리게이터의 최적 가격이 결합. 퍼프덱스 메가트렌드 가이드에서 Solana축 핵심 프로젝트로 선정.",
    strat:"Ranger 통한 Solana Perp 거래 + 포인트 파밍.", ref:"https://ranger.finance",
    yt:[{t:"Ranger Solana",u:"https://youtu.be/Aaez44YeR8U"}]},

  // ══ TIER 3 — 모니터링 ══
  {id:50,n:"StandX",tier:3,cat:"PerpDEX",ch:"Multi",logo:TW("2005237613246959616/UHa0DROv_400x400.jpg"),rw:"중형",st:"진행중",fund:"미공개",dist:"미정",tge:"Q1 2026",
    desc:"바이낸스 선물 창립팀 + 골드만삭스 출신이 만든 Perp DEX.",
    insight:"CEO AG가 바이낸스 선물을 처음부터 구축한 핵심 인물이며, 골드만삭스 출신 팀이 합류. DUSD 수익형 스테이블코인을 마진으로 사용하며, DUSD 보유 기간이 길수록 에어드랍 포인트가 가산되는 구조. 스테이블 예치만으로 파밍이 가능한 저리스크 구조.",
    strat:"DUSD 전환 + 예치 + Perp 거래 포인트 파밍.", ref:"https://standx.io",
    yt:[{t:"StandX",u:"https://youtu.be/x7m7B5uJewE"}]},
  {id:51,n:"Theo",tier:3,cat:"DeFi",ch:"HyperEVM",logo:LL("theo"),rw:"중형",st:"진행중",fund:"$20M",dist:"미정",tge:"미정",
    desc:"$20M 펀딩. 델타뉴트럴 볼트 + thGOLD 토큰화 금 자산.",
    insight:"$20M 대형 펀딩 완료. 델타뉴트럴 전략으로 시장 방향과 무관하게 안정적 수익을 창출하는 볼트 운영. thGOLD(토큰화 금)를 출시하여 금 $5,100 돌파 시점에 맞춤. S2 포인트가 매주 금요일 배포되며, 최소 $1,000 예치를 권장. HyperEVM 핵심 DeFi 프로토콜.",
    strat:"스테이블/ETH 예치 + S2 포인트 파밍.", ref:"https://theo.xyz",
    yt:[{t:"THEO 예치작업",u:"https://youtu.be/spjWF2_NaK0"}]},
  {id:52,n:"GRASS",tier:3,cat:"DePIN",ch:"Solana",logo:LL("grass"),rw:"중형~대형",st:"진행중",fund:"미공개",dist:"S2 진행",tge:"완료",
    desc:"850만 MAU DePIN 대장. 유휴 대역폭으로 AI 학습 데이터 제공.",
    insight:"2026.03에 $33M 월간 수익을 달성하며 토큰 가격 38% 급등. S2에서 1.7억 GRASS 토큰 배포 중. 안드로이드 앱 출시가 예정되어 모바일 파밍이 가능해질 전망. 브라우저 익스텐션만 설치하면 자동으로 유휴 대역폭이 AI 학습에 활용되는 완전 패시브 구조.",
    strat:"브라우저 익스텐션 상시 가동 + 노드 운영.", ref:"https://app.getgrass.io/register/?referralCode=2gde8V1AxJaFo2F",yt:[]},
  {id:53,n:"Nodepay",tier:3,cat:"DePIN",ch:"Multi",logo:LL("nodepay"),rw:"중형",st:"진행중",fund:"OKX, Animoca",dist:"S2 진행",tge:"완료",
    desc:"AI 예측 인텔리전스 DePIN. 180개국 200만+ 유저. OKX/Animoca 투자.",
    insight:"OKX Ventures + Animoca Brands 투자. 5만+ 소스에서 감성 분석을 수행하는 AI 예측 인텔리전스 네트워크. NC 토큰이 OKX/Bitget/Coinbase에 상장. S2 에어드랍 진행중. Staking V2로 가스비 18% 절감 업그레이드 완료.",
    strat:"노드 운영 + NC 스테이킹 V2.", ref:"https://app.nodepay.ai/register?ref=Q5X91tiuPwB14IG",yt:[]},
  {id:54,n:"Gradient",tier:3,cat:"AI",ch:"Solana",logo:LL("gradient"),rw:"중형",st:"진행중",fund:"$10M Pantera",dist:"미정",tge:"미정",
    desc:"탈중앙 AI 런타임. Pantera + Multicoin $10M. 160만 노드.",
    insight:"Pantera Capital + Multicoin Capital + HSG(전 세쿼이아 차이나) $10M 시드. 전 Helium 재단 CEO 출신이 이끄는 팀. Echo-2 모델로 AI 학습비 80% 절감을 달성. 190개국에서 160만+ Sentry Node가 배포. EXP 포인트가 추후 토큰 전환될 것으로 예상.",
    strat:"Sentry Node 브라우저 익스텐션 상시 가동.", ref:"https://app.gradient.network/signup?code=O58PXU",yt:[]},
  {id:55,n:"Recall",tier:3,cat:"AI",ch:"Multi",logo:LL("recall"),rw:"중형~대형",st:"TGE완료",fund:"미공개",dist:"10%",tge:"완료",
    desc:"AI 에이전트 데이터 레이어. 10억 RECALL 중 10% 에어드랍.",
    insight:"Textile.io + 3Box Labs가 합병하여 탄생한 프로젝트. 총 10억 RECALL 중 10% 에어드랍 + 30% 커뮤니티/생태계 할당. TGE 시 20% 즉시 해금. AI 에이전트가 지식을 증명/저장/수익화하는 인프라로 AI 시대 핵심 미들웨어.",
    strat:"클레임 확인 + 생태계 활동.", ref:"https://recall.network",yt:[]},
  {id:56,n:"Felix",tier:3,cat:"DeFi",ch:"HyperEVM",logo:LL("felix-protocol"),rw:"중형~대형",st:"진행중",fund:"미공개",dist:"미정",tge:"미정",
    desc:"HyperEVM 스테이블코인 feUSD 민팅 + Stability Pool 수익.",
    insight:"HyperEVM 핵심 스테이블코인 프로토콜. ETH/HYPE를 담보로 feUSD를 민팅하고, Stability Pool에 예치하여 청산 수익을 획득하는 구조. S2 포인트 파밍 진행중. Polymarket에서 2026년 내 TGE 예측. HYPE 생태계가 성장할수록 직접적 수혜.",
    strat:"feUSD 민팅 + Stability Pool 예치.", ref:"https://usefelix.xyz",yt:[]},
  {id:58,n:"Walrus",tier:3,cat:"스토리지",ch:"Sui",logo:LL("walrus"),rw:"중형~대형",st:"TGE완료",fund:"미공개",dist:"10%",tge:"완료",
    desc:"Sui 탈중앙 스토리지. WAL 50억 총공급. 8만+ 지갑 에어드랍.",
    insight:"Sui 생태계 핵심 스토리지 인프라. 총 50억 WAL 중 10% 커뮤니티 할당(4% NFT 에어드랍 + 6% 초기 기여자). 2026.03.27 클레임 오픈. 8만+ 지갑이 자격을 충족. 다중 NFT 에어드랍 라운드가 진행되어 Sui NFT 홀더에게 유리.",
    strat:"Sui NFT 홀딩 + WAL 클레임.", ref:"https://walrus.xyz",yt:[]},
  {id:59,n:"PIN AI",tier:3,cat:"AI",ch:"Multi",logo:LL("pin-ai"),rw:"중형",st:"진행중",fund:"$10M a16z",dist:"미정",tge:"Q2 2026",
    desc:"a16z + Hack VC $10M. AI 의사결정 플랫폼.",
    insight:"a16z crypto CSX + Hack VC + NEAR 창립자 일리아 폴로수킨이 투자. Google Brain, Stanford, MIT 출신 올스타 팀 구성. TGE Q2 2026 예상. HiPIN 포인트 파밍 + Galxe에서 100만 PIN Points 캠페인이 활성화된 상태.",
    strat:"HiPIN 포인트 파밍 + Galxe 캠페인.", ref:"https://pinai.io",yt:[]},
  {id:60,n:"Kite AI",tier:3,cat:"AI",ch:"Multi",logo:LL("kite-ai"),rw:"중형",st:"진행중",fund:"미공개",dist:"미정",tge:"미정",
    desc:"AI 에이전트 프레임워크. 테스트넷 포인트 파밍 가능.",
    insight:"AI 에이전트 생태계 인프라 프로젝트. 테스트넷에서 포인트를 파밍할 수 있으며, AI 에이전트 내러티브의 초기 투자 기회.",
    strat:"테스트넷 참여 + 포인트 파밍.", ref:"https://testnet.gokite.ai?r=FDBrFYKW",yt:[]},
  {id:61,n:"OnRe",tier:3,cat:"DeFi",ch:"Solana",logo:LL("onre"),rw:"중형",st:"진행중",fund:"미공개",dist:"미정",tge:"미정",
    desc:"Solana 수익률 프로토콜. 리더보드 기반 보상.",
    insight:"Solana DeFi 수익률 최적화 프로토콜. 리더보드 경쟁으로 추가 보상 획득 가능. Hylo와 함께 Solana 수익률 파밍의 핵심 조합.",
    strat:"SOL/스테이블 예치 + 리더보드 순위.", ref:"https://app.onre.finance/earn/leaderboard?ref=FQLFHEYMW",
    yt:[{t:"Solana 수익률",u:"https://youtu.be/15JiPzLcwdU"}]},
  {id:62,n:"Linea",tier:3,cat:"L2",ch:"Linea",logo:CL("linea"),rw:"중형",st:"진행중",fund:"ConsenSys",dist:"미정",tge:"미정",
    desc:"ConsenSys(MetaMask 모회사) L2. LXP 이중 포인트 시스템.",
    insight:"메타마스크 모회사 ConsenSys가 만든 L2. LXP(활동 포인트) + LXP-L(유동성 포인트) 이중 시스템으로 두 가지 경로에서 에어드랍 자격 확보 가능. 메타마스크 8,000만 유저 베이스와의 통합이 핵심.",
    strat:"브릿지 + DeFi 활동 + LXP/LXP-L 이중 포인트.", ref:"https://referrals.linea.build/?refCode=plOzXsJ9qL",yt:[]},
  {id:63,n:"Plume",tier:3,cat:"RWA",ch:"Plume",logo:LL("plume"),rw:"중형",st:"진행중",fund:"미공개",dist:"미정",tge:"미정",
    desc:"RWA 특화 L1. 실물자산 토큰화 인프라.",
    insight:"RWA(실물자산) 토큰화 전문 체인. Miles 포인트 프로그램이 활성화된 상태. 2026년 RWA 시장이 BlackRock 등 대형 기관 참여로 급성장하면서 직접 수혜 예상.",
    strat:"Miles 포인트 파밍 + 생태계 활동.", ref:"https://miles.plumenetwork.xyz/join?invite=PLUME-MC0GB",yt:[]},
  {id:64,n:"Layer3",tier:3,cat:"퀘스트",ch:"Multi",logo:LL("layer3"),rw:"중형",st:"진행중",fund:"미공개",dist:"미정",tge:"미정",
    desc:"멀티체인 퀘스트 플랫폼. 다양한 프로젝트 에어드랍 동시 파밍.",
    insight:"하나의 플랫폼에서 여러 프로젝트의 에어드랍 자격을 동시에 확보할 수 있는 효율적 허브. 일일 퀘스트 + 주간 미션 루틴을 만들면 최소 노력으로 다수 프로젝트 파밍 가능.",
    strat:"일일 퀘스트 + 주간 미션 루틴.", ref:"https://app.layer3.xyz/?ref=coinmage777.eth",yt:[]},
  {id:65,n:"SuperForm",tier:3,cat:"DeFi",ch:"Multi",logo:LL("superform"),rw:"중형",st:"TGE완료",fund:"미공개",dist:"50.4%",tge:"완료",
    desc:"크로스체인 DeFi 자산관리. $10B+ TVL. UP 토큰 출시.",
    insight:"18만+ 예치자를 보유한 크로스체인 수익률 애그리게이터. UP 토큰 2026.02.10 TGE. 50.4% 커뮤니티/생태계 배분은 역대급 수준. Hyperliquid 통합이 완료되어 HL 생태계에서도 활용 가능.",
    strat:"크로스체인 예치 + UP 토큰 파밍.", ref:"https://superform.xyz",yt:[]},
  {id:66,n:"OpenLedger",tier:3,cat:"AI",ch:"Multi",logo:LL("openledger"),rw:"중형~대형",st:"TGE완료",fund:"미공개",dist:"15%",tge:"완료",
    desc:"탈중앙 AI 데이터 네트워크. 자체 체인. OPEN 토큰 출시.",
    insight:"AI/ML 데이터를 기여하면서 데이터 소유권을 유지하는 탈중앙 네트워크. OPEN 토큰 2025.09 출시. 2026.03에 2차 배포로 1,500만 OPEN(총공급 15%) 추가 분배. 자체 체인 메인넷 안정화 로드맵 진행 중.",
    strat:"데이터 기여 + OPEN 토큰 활동.", ref:"https://openledger.xyz",yt:[]},
  {id:67,n:"Fogo",tier:3,cat:"L1",ch:"Fogo",logo:LL("fogo"),rw:"중형",st:"TGE완료",fund:"미공개",dist:"S2 2%",tge:"완료",
    desc:"SVM 초고속 L1. 40ms 블록, 54K TPS. Firedancer 밸리데이터.",
    insight:"Solana VM 기반 독립 L1으로 40ms 미만 블록타임 + 54K TPS 달성. 2026.01.13 TGE 완료. 에어드랍 클레임이 4/15 마감이므로 반드시 확인 필요. 약 22,300명에게 평균 6,700 FOGO 배분. S2가 확정되어 2% 토큰 추가 배분 예정.",
    strat:"클레임 확인 (4/15 마감 주의!) + S2 참여.", ref:"https://fogo.io",yt:[]},
  {id:68,n:"Kalshi",tier:3,cat:"예측시장",ch:"Multi",logo:LL("kalshi"),rw:"중형~대형",st:"진행중",fund:"$1B+",dist:"미정",tge:"미정",
    desc:"CFTC 규제 준수 예측시장. $11B 밸류. 주간 $2.3B 거래량.",
    insight:"미국 CFTC로부터 규제 승인을 받은 유일한 예측시장으로 합법성이 보장됨. $1B+ 펀딩으로 $11B 밸류에이션 달성. 2026.01 Coinbase와 파트너십 체결. BTC/ETH 이벤트 콘트랙트 지원. 네이티브 토큰은 아직 없지만 Solana 토큰화 계약 도입으로 향후 토큰 출시 가능성.",
    strat:"예측 마켓 활동 + Polymarket 동시 파밍.", ref:"https://kalshi.com",yt:[]},
  {id:69,n:"Abstract",tier:3,cat:"L2",ch:"Abstract",logo:CL("abstract"),rw:"중형",st:"진행중",fund:"$11M",dist:"미정",tge:"미정",
    desc:"Pudgy Penguins 모회사 Igloo L2. XP 포인트 시스템.",
    insight:"Pudgy Penguins(월마트 판매 1위 NFT) 모회사 Igloo Inc.가 만든 소비자 친화 L2. $11M 펀딩. XP 포인트 + 배지 시스템 활성. PENGU 홀더에게 보너스 예상. 중화권 가이드에서는 주간 $100 카드 소비로 40-60K 포인트 획득 전략 추천.",
    strat:"XP 포인트 + 생태계 dApp 활동.", ref:"https://abs.xyz",yt:[]},
  {id:70,n:"Symbiotic",tier:3,cat:"DeFi",ch:"Ethereum",logo:LL("symbiotic"),rw:"중형",st:"진행중",fund:"$34.8M",dist:"미정",tge:"미정",
    desc:"퍼미션리스 리스테이킹. Pantera + Paradigm $34.8M.",
    insight:"Paradigm + Pantera Capital $34.8M 투자 + Coinbase Ventures + Polygon 참여. ERC-20 스테이킹 자산으로 블록체인 보안을 제공하는 리스테이킹 프로토콜. 2026년 AI + Bitcoin LST 확장 계획. 포인트 프로그램이 레트로 에어드랍 자격으로 전환될 가능성 높음.",
    strat:"ETH/LST 예치 + 포인트 파밍.", ref:"https://symbiotic.fi",yt:[]},
  {id:71,n:"Kinetiq",tier:3,cat:"DeFi",ch:"HyperEVM",logo:LL("kinetiq"),rw:"중형~대형",st:"TGE완료",fund:"$1.75M",dist:"30%",tge:"완료",
    desc:"HyperEVM 리퀴드 스테이킹 + Markets 25x 레버리지.",
    insight:"Maven 11 + Pier Two $1.75M 투자. KNTQ 2025.11 출시, 24% 에어드랍 완료. 30% Protocol Growth & Rewards 할당으로 추가 시즌 여력 충분. Markets에서 주식(US500) + 크립토 25x 레버리지 거래. S2 파밍 진행중.",
    strat:"Markets 거래 + KNTQ S2 파밍.", ref:"https://kinetiq.xyz",yt:[]},
  {id:72,n:"xStocks",tier:3,cat:"DeFi",ch:"Multi",logo:TW("1945919546302324737/kgyYjk0p_400x400.jpg"),rw:"중형",st:"진행중",fund:"미공개",dist:"미정",tge:"미정",
    desc:"온체인 주식 토큰 거래. Equity Perps 내러티브.",
    insight:"TradFi 주식을 온체인에서 토큰화 거래하는 프로젝트. Extended, Avantis와 함께 2026년 Equity Perps 내러티브의 핵심 3인방. 규제 리스크가 존재하지만 내러티브 성장 잠재력이 크고, 규제가 명확해지면 폭발적 성장 예상.",
    strat:"주식 토큰 거래 + 포인트 파밍.", ref:"https://xstocks.io",
    yt:[{t:"xStocks 에어드랍",u:"https://www.youtube.com/watch?v=E-fHENsX-Gk"}]},
  {id:73,n:"EVEDEX",tier:3,cat:"PerpDEX",ch:"Multi",logo:TW("1952222952776212480/i6OXq9XG_400x400.jpg"),rw:"중형",st:"진행중",fund:"미공개",dist:"미정",tge:"미정",
    desc:"차세대 Perp DEX. 초대 기반 접근.",
    insight:"초대 코드 기반 접근으로 초기 유저를 우대하는 구조. PerpDEX 시장 과포화 속에서 차별화된 온보딩 전략으로 커뮤니티 퀄리티를 높이는 접근.",
    strat:"초대 코드로 가입 + 거래 파밍.", ref:"https://invite.evedex.com",yt:[]},
  {id:74,n:"Arc",tier:3,cat:"인프라",ch:"Multi",logo:LL("arc"),rw:"중형",st:"진행중",fund:"미공개",dist:"미정",tge:"미정",
    desc:"인프라 프로토콜. 테스트넷 활성.",
    insight:"중화권 에드작 리스트에서 레이어 체인 카테고리의 잠재적 레트로 에어드랍 후보로 언급. 대형 VC 참여로 인한 높은 밸류에이션 예상. 테스트넷 초기 참여가 레트로 에어드랍 자격에 유리한 전형적 패턴.",
    strat:"테스트넷 활동 + 트랜잭션 축적.", ref:"https://arc.tech",
    yt:[{t:"Arc 테스트넷",u:"https://youtu.be/xNphMdfP0yU"}]},
  {id:75,n:"Minara",tier:3,cat:"AI",ch:"Multi",logo:LL("minara"),rw:"중형",st:"진행중",fund:"Circle Ventures",dist:"미정",tge:"미정",
    desc:"AI 자동매매 + NFT 캠페인. Circle Ventures(USDC 발행사) 투자.",
    insight:"USDC 발행사 Circle의 벤처 투자 부문인 Circle Ventures가 직접 투자한 AI 트레이딩 프로젝트. AI 자동 트레이딩 + 테슬라 이벤트 연동이라는 독특한 조합. NFT 기반 에어드랍 구조.",
    strat:"AI 트레이딩 활동 + NFT 보유.", ref:"https://minara.ai",
    yt:[{t:"Minara AI",u:"https://www.youtube.com/watch?v=9DJKCrlkkLI"}]},
  {id:76,n:"Limitless",tier:3,cat:"예측시장",ch:"Base",logo:TW("2016406158039228416/PqSALjbE_400x400.jpg"),rw:"중형",st:"진행중",fund:"$4M+",dist:"미정",tge:"미정",
    desc:"Base 예측시장. LMTS 토큰. S3 진행중.",
    insight:"$4M+ 전략적 펀딩. LMTS 토큰 출시 완료. S3가 2026.01.26-05.25 기간으로 진행중. 최소 $200 거래량이 필요하며, 수시로 2x 포인트 멀티플라이어 이벤트 진행. 레퍼럴 최대 6% 보너스. Base 토큰 출시 시 에코시스템 수혜도 기대.",
    strat:"S3 예측 거래 + 포인트 파밍.", ref:"https://limitless.exchange",yt:[]},
];

const VIBE_VIDS = [
  {t:"AI 16개 DEX 동시 자동매매 봇",v:"1.3K",u:"https://www.youtube.com/watch?v=0dZdAMJK_l4"},
  {t:"Nado 자동매매 봇 만들기",v:"702",u:"https://www.youtube.com/watch?v=Fyq8M2Cy__I"},
  {t:"GRVT 자동매매 봇 만들기",v:"438",u:"https://www.youtube.com/watch?v=aIBweqY8A4s"},
  {t:"Claude로 리서치 자동화",v:"3.1K",u:"https://www.youtube.com/watch?v=Bx5zgBbR_oU"},
  {t:"Cursor DCA 시뮬레이터",v:"1.2K",u:"https://www.youtube.com/watch?v=H1bOhm0b6R0"},
  {t:"퍼프덱스 메가트렌드 총정리",v:"2.1K",u:"https://youtu.be/ADpLc3c6wSE"},
];

const CEX_REFS = [
  {n:"OKX",ref:"https://www.okx.com/join/COINMAGE",logo:"https://icons.llamao.fi/icons/protocols/okx"},
  {n:"Binance",ref:"https://www.binance.com/activity/referral-entry/CPA?ref=CPA_007KXFMF71",logo:"https://icons.llamao.fi/icons/protocols/binance"},
  {n:"Bybit",ref:"https://www.bybit.com/en/invite/?ref=7XJ62O",logo:"https://icons.llamao.fi/icons/protocols/bybit"},
  {n:"Bitget",ref:"https://www.bitget.com/asia/events/activities/?clacCode=PC2AQ797",logo:"https://icons.llamao.fi/icons/protocols/bitget"},
  {n:"Coinone",ref:"https://coinone.co.kr/user/signup?ref=0578IN69",logo:"https://icons.llamao.fi/icons/protocols/coinone"},
];

const CAT_C = {"PerpDEX":"text-violet-300 bg-violet-500/15 border-violet-500/20","DeFi":"text-blue-300 bg-blue-500/15 border-blue-500/20","AI":"text-cyan-300 bg-cyan-500/15 border-cyan-500/20","예측시장":"text-amber-300 bg-amber-500/15 border-amber-500/20","L2":"text-emerald-300 bg-emerald-500/15 border-emerald-500/20","L1":"text-emerald-300 bg-emerald-500/15 border-emerald-500/20","DEX":"text-fuchsia-300 bg-fuchsia-500/15 border-fuchsia-500/20","인프라":"text-orange-300 bg-orange-500/15 border-orange-500/20","DePIN":"text-lime-300 bg-lime-500/15 border-lime-500/20","InfoFi":"text-indigo-300 bg-indigo-500/15 border-indigo-500/20","스토리지":"text-teal-300 bg-teal-500/15 border-teal-500/20","퀘스트":"text-pink-300 bg-pink-500/15 border-pink-500/20","RWA":"text-yellow-300 bg-yellow-500/15 border-yellow-500/20","소셜":"text-pink-300 bg-pink-500/15 border-pink-500/20"};
const ST_DOT = {"진행중":"bg-emerald-400 shadow-emerald-400/50","확인됨":"bg-blue-400 shadow-blue-400/50","예상":"bg-amber-400 shadow-amber-400/50","TGE완료":"bg-zinc-400","TGE임박":"bg-red-400 shadow-red-400/50 animate-pulse"};

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

/* Glass Card */
function PCard({p,onClick}) {
  const cc = CAT_C[p.cat]||CAT_C["DeFi"];
  return (
    <motion.button initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.3}} onClick={onClick}
      className="w-full text-left backdrop-blur-md bg-white/[0.025] hover:bg-white/[0.055] border border-white/[0.06] hover:border-white/[0.14] rounded-2xl p-4 transition-all duration-300 group relative overflow-hidden">
      {/* Gradient glow on hover */}
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
      {p.tier<=2 && p.desc && <p className="mt-3 text-[12px] text-zinc-500 leading-relaxed line-clamp-2 pl-[52px]">{p.desc}</p>}
    </motion.button>
  );
}

/* Project Modal — Glass morphism */
function PModal({p,onClose}) {
  if(!p) return null;
  const cc = CAT_C[p.cat]||CAT_C["DeFi"];
  return (
    <AnimatePresence><motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <motion.div initial={{y:80,opacity:0}} animate={{y:0,opacity:1}} transition={{type:"spring",damping:30,stiffness:350}}
        className="w-full sm:max-w-lg backdrop-blur-2xl bg-[#111115]/95 border border-white/[0.1] rounded-t-3xl sm:rounded-3xl max-h-[88vh] overflow-y-auto scrollbar-none shadow-2xl shadow-black/50" onClick={e=>e.stopPropagation()}>

        {/* Header gradient bar */}
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

          {/* Status badges */}
          <div className="flex flex-wrap gap-2 mb-5">
            {p.st && <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/[0.04] text-zinc-300 border border-white/[0.06] flex items-center gap-1.5"><span className={`w-1.5 h-1.5 rounded-full ${ST_DOT[p.st]||'bg-zinc-600'}`}/>{p.st}</span>}
            {p.rw && <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/[0.04] text-zinc-300 border border-white/[0.06]">{p.rw}</span>}
            {p.tge && <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/[0.04] text-zinc-400 border border-white/[0.06]">TGE {p.tge}</span>}
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-2.5 mb-5">
            {p.fund && p.fund!=="-" && <div className="backdrop-blur-sm bg-white/[0.03] rounded-xl p-3 border border-white/[0.06]"><div className="text-[9px] uppercase tracking-widest text-zinc-600 mb-1.5 flex items-center gap-1"><Shield size={9}/>펀딩</div><div className="text-sm font-semibold text-white">{p.fund}</div></div>}
            {p.dist && p.dist!=="미정" && <div className="backdrop-blur-sm bg-gradient-to-br from-violet-500/[0.06] to-fuchsia-500/[0.04] rounded-xl p-3 border border-violet-500/10"><div className="text-[9px] uppercase tracking-widest text-violet-400 mb-1.5 flex items-center gap-1"><Layers size={9}/>배분율</div><div className="text-sm font-bold bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent">{p.dist}</div></div>}
          </div>

          {p.desc && <p className="text-[14px] text-zinc-300 leading-relaxed mb-5">{p.desc}</p>}

          {/* 핵심 정보 — Glassmorphism insight card */}
          {p.insight && (
            <div className="mb-5 backdrop-blur-lg bg-gradient-to-br from-violet-500/[0.08] via-fuchsia-500/[0.04] to-pink-500/[0.06] border border-violet-500/15 rounded-2xl p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/[0.06] rounded-full blur-3xl pointer-events-none"/>
              <div className="relative">
                <div className="text-[10px] uppercase tracking-widest text-violet-400 mb-2 flex items-center gap-1.5 font-semibold"><Zap size={11} className="text-violet-400"/>핵심 정보</div>
                <p className="text-[13px] text-zinc-200 leading-[1.8]">{p.insight}</p>
              </div>
            </div>
          )}

          {/* Strategy */}
          {p.strat && (
            <div className="mb-5 backdrop-blur-sm bg-white/[0.025] border border-white/[0.06] rounded-xl p-4">
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2 flex items-center gap-1.5 font-semibold"><TrendingUp size={11}/>추천 전략</div>
              <p className="text-[13px] text-zinc-300 leading-relaxed">{p.strat}</p>
            </div>
          )}

          {/* YouTube */}
          {p.yt && p.yt.length>0 && (
            <div className="mb-5">
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2.5 font-semibold">관련 영상</div>
              <div className="space-y-2">
                {p.yt.map((v,i)=>(<a key={i} href={v.u} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:bg-red-500/[0.06] hover:border-red-500/15 transition-all duration-200 group"><div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0"><Play size={12} fill="currentColor" className="text-red-400"/></div><span className="text-[13px] text-zinc-300 group-hover:text-white truncate flex-1">{v.t}</span><ExternalLink size={11} className="text-zinc-600 flex-shrink-0"/></a>))}
              </div>
            </div>
          )}

          {/* CTA */}
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
  const [tf,setTf]=useState("all");
  const [cf,setCf]=useState("all");
  const [show3,setShow3]=useState(false);

  const cats = useMemo(()=>{const s=new Set();P.forEach(p=>s.add(p.cat));return["all",...Array.from(s)];},[]);

  const fil = useMemo(()=>{
    const s=q.toLowerCase();
    return arr=>arr.filter(p=>{
      if(s && !p.n.toLowerCase().includes(s) && !(p.cat||'').toLowerCase().includes(s) && !(p.ch||'').toLowerCase().includes(s)) return false;
      if(cf!=="all" && p.cat!==cf) return false;
      return true;
    });
  },[q,cf]);

  const t1=useMemo(()=>(tf==="2"||tf==="3")?[]:fil(P.filter(p=>p.tier===1)),[tf,fil]);
  const t2=useMemo(()=>(tf==="1"||tf==="3")?[]:fil(P.filter(p=>p.tier===2)),[tf,fil]);
  const t3=useMemo(()=>(tf==="1"||tf==="2")?[]:fil(P.filter(p=>p.tier===3)),[tf,fil]);

  return (
    <div className="space-y-5">
      {/* Hero */}
      <div className="pt-6 pb-2">
        <motion.h1 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="text-2xl sm:text-3xl font-bold text-white mb-1 tracking-tight">에어드랍 트래커</motion.h1>
        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.1}} className="text-sm text-zinc-500 mb-5">유망 프로젝트 리서치 + 레퍼럴 코드 + 참여 전략</motion.p>
        <div className="grid grid-cols-3 gap-3">
          {[{v:P.length,l:"프로젝트",c:"from-violet-500/20 to-fuchsia-500/10",t:"text-white",I:Globe},{v:42,l:"레퍼럴",c:"from-emerald-500/20 to-teal-500/10",t:"text-emerald-300",I:Layers},{v:"15.5K",l:"TG 메시지 분석",c:"from-amber-500/20 to-orange-500/10",t:"text-amber-300",I:TrendingUp}].map((s,i)=>(
            <motion.div key={i} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.1+i*0.05}}
              className={`bg-gradient-to-br ${s.c} backdrop-blur-sm border border-white/[0.06] rounded-2xl p-4 text-center relative overflow-hidden`}>
              <div className="absolute top-2 right-2 opacity-10"><s.I size={28}/></div>
              <div className={`text-2xl font-bold font-mono ${s.t} relative`}>{typeof s.v==='number'?<Counter value={s.v}/>:s.v}</div>
              <div className="text-[10px] text-zinc-500 mt-1 font-medium">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"/>
        <input type="text" value={q} onChange={e=>setQ(e.target.value)} placeholder="프로젝트, 카테고리, 체인 검색..."
          className="w-full backdrop-blur-md bg-white/[0.035] border border-white/[0.08] rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/40 focus:bg-white/[0.05] transition-all duration-200"/>
      </div>

      {/* Filters */}
      <div className="flex gap-2.5 overflow-x-auto scrollbar-none pb-1">
        <div className="flex items-center gap-0.5 bg-white/[0.03] backdrop-blur-sm rounded-xl p-1 flex-shrink-0 border border-white/[0.05]">
          {[{id:"all",l:"All"},{id:"1",l:"T1"},{id:"2",l:"T2"},{id:"3",l:"T3"}].map(t=>(
            <button key={t.id} onClick={()=>setTf(t.id)} className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all duration-200 ${tf===t.id?'bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 text-white shadow-sm border border-white/[0.08]':'text-zinc-500 hover:text-zinc-300'}`}>{t.l}</button>
          ))}
        </div>
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          {cats.map(c=>(<button key={c} onClick={()=>setCf(c)} className={`px-2.5 py-1.5 rounded-lg text-[10px] font-medium whitespace-nowrap transition-all duration-200 ${cf===c?'bg-violet-500/20 text-violet-300 border border-violet-500/20':'text-zinc-600 hover:text-zinc-400'}`}>{c==="all"?"전체":c}</button>))}
        </div>
      </div>

      {/* CEX Referrals */}
      {tf==="all" && cf==="all" && !q && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="backdrop-blur-md bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4">
          <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-3 font-semibold">거래소 가입 (수수료 할인)</div>
          <div className="flex flex-wrap gap-2">
            {CEX_REFS.map((c,i)=>(<a key={i} href={c.ref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.14] transition-all duration-200 text-[12px] font-medium text-zinc-300"><Logo src={c.logo} name={c.n} size={20}/>{c.n}</a>))}
          </div>
        </motion.div>
      )}

      {/* Tier 1 */}
      {t1.length>0 && (
        <div>
          <div className="flex items-center gap-2.5 mb-3 px-1">
            <div className="w-6 h-6 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20"><Star size={12} className="text-amber-400"/></div>
            <span className="text-sm font-bold text-amber-400/90">Tier 1 — 최우선</span>
            <span className="text-[11px] text-zinc-600 font-mono bg-white/[0.03] px-2 py-0.5 rounded-md">{t1.length}</span>
          </div>
          <div className="space-y-2">{t1.map(p=><PCard key={p.id} p={p} onClick={()=>setSel(p)}/>)}</div>
        </div>
      )}

      {/* Tier 2 */}
      {t2.length>0 && (
        <div className="mt-2">
          <div className="flex items-center gap-2.5 mb-3 px-1">
            <div className="w-6 h-6 rounded-lg bg-violet-500/10 flex items-center justify-center border border-violet-500/20"><CircleDot size={12} className="text-violet-400"/></div>
            <span className="text-sm font-bold text-violet-400/90">Tier 2 — 주요</span>
            <span className="text-[11px] text-zinc-600 font-mono bg-white/[0.03] px-2 py-0.5 rounded-md">{t2.length}</span>
          </div>
          <div className="space-y-2">{t2.map(p=><PCard key={p.id} p={p} onClick={()=>setSel(p)}/>)}</div>
        </div>
      )}

      {/* Tier 3 */}
      {t3.length>0 && (
        <div className="mt-2">
          <div className="flex items-center gap-2.5 mb-3 px-1">
            <div className="w-6 h-6 rounded-lg bg-zinc-700/30 flex items-center justify-center border border-zinc-700/30"><Hash size={12} className="text-zinc-500"/></div>
            <span className="text-sm font-bold text-zinc-500">Tier 3 — 모니터링</span>
            <span className="text-[11px] text-zinc-600 font-mono bg-white/[0.03] px-2 py-0.5 rounded-md">{t3.length}</span>
          </div>
          {!show3 && tf!=="3" ? (
            <button onClick={()=>setShow3(true)} className="w-full py-4 rounded-2xl border border-dashed border-white/[0.08] text-sm text-zinc-500 hover:text-zinc-300 hover:border-white/[0.16] hover:bg-white/[0.02] transition-all duration-200">{t3.length}개 프로젝트 더 보기 <ChevronDown size={14} className="inline ml-1.5"/></button>
          ) : (
            <div className="space-y-2">{t3.map((p,i)=><PCard key={p.id||i} p={p} onClick={()=>setSel(p)}/>)}{tf!=="3" && <button onClick={()=>setShow3(false)} className="w-full py-3 text-xs text-zinc-600 hover:text-zinc-400 transition-colors">접기 <ChevronUp size={12} className="inline ml-1"/></button>}</div>
          )}
        </div>
      )}

      <PModal p={sel} onClose={()=>setSel(null)}/>
    </div>
  );
}

function VibeCodingSection() {
  return (
    <div className="space-y-6 pt-6">
      <div>
        <motion.h1 initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="text-2xl sm:text-3xl font-bold text-white mb-1 tracking-tight">바이브코딩</motion.h1>
        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.1}} className="text-sm text-zinc-500">AI로 자동매매 봇, 트레이딩 도구 직접 만들기</motion.p>
      </div>

      {/* Featured Bot */}
      <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.15}}
        className="backdrop-blur-md bg-white/[0.025] border border-violet-500/15 rounded-2xl p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-violet-500/[0.04] rounded-full blur-3xl pointer-events-none"/>
        <div className="relative">
          <div className="flex items-center gap-2.5 mb-4"><div className="w-8 h-8 rounded-xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20"><Terminal size={16} className="text-violet-400"/></div><span className="text-base font-bold text-white">Multi-Perp-DEX 자동매매 봇</span></div>
          <p className="text-[13px] text-zinc-400 leading-relaxed mb-5">16개 Perp DEX 동시 자동매매. ETH/SOL 페어트레이딩, 15x 레버리지. 유전 알고리즘 시그널 자동 최적화.</p>
          <div className="grid grid-cols-2 gap-2.5 mb-5">
            {[["아키텍처","ABC + Factory Pattern"],["핵심기능","트레일링 스탑 + BBO"],["최적화","유전 알고리즘 12h"],["안전장치","Graceful Restart"]].map(([l,v],i)=>(
              <div key={i} className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.05]"><div className="text-[9px] text-zinc-600 font-medium uppercase tracking-wider">{l}</div><div className="text-[12px] text-zinc-300 mt-1 font-mono">{v}</div></div>
            ))}
          </div>
          <div className="text-[9px] uppercase tracking-widest text-zinc-600 mb-2.5 font-semibold">지원 거래소 (12+)</div>
          <div className="flex flex-wrap gap-1.5">{["Hyperliquid","Lighter","Paradex","EdgeX","Backpack","GRVT","Nado","Hotstuff","Bulk","StandX","TreadFi","Pacifica"].map((ex,i)=>(<span key={i} className="px-2 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[10px] text-zinc-500 font-mono">{ex}</span>))}</div>
        </div>
      </motion.div>

      {/* Videos */}
      <div>
        <div className="flex items-center gap-2.5 mb-3 px-1">
          <div className="w-6 h-6 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20"><Play size={12} fill="currentColor" className="text-red-400"/></div>
          <span className="text-sm font-bold text-zinc-300">바이브코딩 영상</span>
        </div>
        <div className="space-y-2">
          {VIBE_VIDS.map((v,i)=>(
            <motion.a key={i} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={{delay:0.05*i}}
              href={v.u} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3.5 backdrop-blur-sm bg-white/[0.025] border border-white/[0.06] rounded-2xl p-4 hover:bg-red-500/[0.04] hover:border-red-500/15 transition-all duration-200 group">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0 border border-red-500/10 group-hover:bg-red-500/20 transition-all"><Play size={14} fill="currentColor" className="text-red-400"/></div>
              <div className="flex-1 min-w-0"><div className="text-[14px] text-white truncate group-hover:text-red-200 transition-colors">{v.t}</div><div className="text-[11px] text-zinc-600 mt-0.5">{v.v} views</div></div>
              <ExternalLink size={13} className="text-zinc-700 flex-shrink-0"/>
            </motion.a>
          ))}
        </div>
      </div>

      <a href="https://www.youtube.com/@CryptoMage" target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/15 text-sm font-semibold text-red-300 hover:from-red-500/20 hover:to-red-600/20 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300">
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
      {/* Ambient background */}
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
