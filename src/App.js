import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight, Play, Sparkles, ArrowUpRight, X, ChevronDown, Star, CircleDot, Rocket, Code2, Terminal, Hash, ExternalLink, ChevronUp, MessageCircle, Flame, Zap } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════ */
/*  HELPERS                                                   */
/* ═══════════════════════════════════════════════════════════ */
const LL = s => `https://icons.llamao.fi/icons/protocols/${s}`;
const CL = s => `https://icons.llamao.fi/icons/chains/rsz_${s}`;

function Logo({ src, name, size = 32 }) {
  const [e, setE] = useState(false);
  if (e || !src) return <div style={{width:size,height:size}} className="rounded-lg bg-white/[0.06] flex items-center justify-center text-xs font-bold text-zinc-500 flex-shrink-0">{(name||'?')[0]}</div>;
  return <img src={src} alt={name} width={size} height={size} className="rounded-lg flex-shrink-0 bg-white/[0.04]" onError={()=>setE(true)} />;
}

/* ═══════════════════════════════════════════════════════════ */
/*  PROJECT DATA — 구독자용 · TG 15,546 메시지 기반 인사이트 */
/*  42개 플랫폼 레퍼럴 · 트위터 리서치 반영                  */
/* ═══════════════════════════════════════════════════════════ */

const P = [
  // ══ TIER 1 ══
  {id:1,n:"GRVT",tier:1,cat:"PerpDEX",ch:"zkSync",logo:LL("grvt"),st:"진행중",rw:"중형~대형",fund:"$47.2M",dist:"28%",tge:"Q3 2026",mentions:205,
    desc:"ZKsync Validium L2 하이브리드 거래소. CEX급 UX + 예치만으로 연 10% 이자. S2 배분 18%로 넉넉.",
    insight:"Matrix + Delphi Digital 투자. 메이커 수수료 마이너스(리베이트). 계정 기반 참여로 시빌 걸러냄. TG에서 205회 언급으로 핵심 추천작.",
    strat:"거래량 축적 + 포인트 파밍. 봇 자동화 가능.", ref:"https://grvt.io/exchange/sign-up?ref=1O9U2GG",
    yt:[{t:"초보자 GRVT 올인원 가이드",u:"https://youtu.be/cYnAPdjzjhk"},{t:"GRVT 자동매매 봇",u:"https://www.youtube.com/watch?v=aIBweqY8A4s"}]},
  {id:2,n:"Nado",tier:1,cat:"PerpDEX",ch:"Ink (Kraken)",logo:LL("nado"),st:"진행중",rw:"대형",fund:"Kraken",dist:"$INK 확정",tge:"Jul-Sep 2026",mentions:139,
    desc:"Kraken Ink L2 Perp DEX. 크로스마진 + 통합증거금. $INK 에어드랍 확정.",
    insight:"Kraken이 직접 인큐베이팅. $INK 토큰 에어드랍이 공식 확정된 몇 안되는 프로젝트. Nado 사용자가 Ink L2 배분 최다 수혜 예상.",
    strat:"USDC/kBTC/WETH Perp 거래. NLP 예치.", ref:"https://nado.xyz",
    yt:[{t:"크라켄이 만든 퍼프덱스 Nado",u:"https://youtu.be/Fyq8M2Cy__I"},{t:"Nado 자동매매 봇",u:"https://www.youtube.com/watch?v=Fyq8M2Cy__I"}]},
  {id:3,n:"Aster",tier:1,cat:"PerpDEX",ch:"Aster L1",logo:LL("aster-dex"),st:"진행중",rw:"대형",fund:"YZi Labs (CZ)",dist:"53.5%",tge:"진행중",mentions:0,hot:true,
    desc:"CZ가 어드바이저로 참여하는 차세대 Perp DEX. 1001x 레버리지, 히든오더, 크로스체인.",
    insight:"🔥 역대 최대 53.5% 커뮤니티 에어드랍. Stage 6 진행중. 일일 거래량 $787M ATH 기록. 전 바이낸스 직원 다수 합류. 자체 L1 테스트넷 가동.",
    strat:"Stage 6 파밍. 거래 + 스테이킹.", ref:"https://aster.trade",
    yt:[]},
  {id:4,n:"Genius",tier:1,cat:"PerpDEX",ch:"Multi-chain",logo:LL("genius-terminal"),st:"진행중",rw:"대형",fund:"YZi Labs (CZ)",dist:"미정",tge:"Apr 12, 2026",mentions:0,hot:true,
    desc:"YZi Labs 8자리 투자. CZ 어드바이저. Perp DEX 트레이딩 터미널.",
    insight:"🔥 2026.04.12 토큰 생성 확정. S1 마감 임박. 주간 1000만 GP 배포. 포인트→토큰 전환 시 50% 보너스 예정. 일일 $787M 거래량 달성.",
    strat:"스팟 거래 볼륨 쌓기 (GP 배분 기준).", ref:"https://genius.trade",
    yt:[]},
  {id:5,n:"Variational",tier:1,cat:"PerpDEX",ch:"Multi-chain",logo:LL("variational"),st:"진행중",rw:"대형",fund:"$11.8M",dist:"50%",tge:"미정",mentions:140,
    desc:"500+ 페어 Perp DEX. 커뮤니티 50% 역대급. 0% 수수료 + 손실 환급.",
    insight:"Bain Capital + Coinbase Ventures + Peak XV 투자. 커뮤니티 배분 50%는 Aster와 함께 역대 최고 수준. 무수수료라 리스크 제로.",
    strat:"Perp 거래 + 레퍼럴. 양방 OI 유지, 알트코인 가중치.", ref:"https://variational.io",
    yt:[{t:"Variational 양방 OI 유지",u:"https://youtu.be/AfH8wppr0xc"}]},
  {id:6,n:"Extended",tier:1,cat:"PerpDEX",ch:"Multi-chain",logo:LL("extended"),st:"진행중",rw:"대형",fund:"$6.5M",dist:"30% 확정",tge:"Q2 2026",mentions:78,
    desc:"주식/금/SPX Perp 거래. Revolut DNA + ZK 롤업. 30% 확정 배분.",
    insight:"Equity Perps 내러티브 선두. 2026년 주요 트렌드인 TradFi 자산 온체인화를 선도. 소프트뱅크 등 대형 VC 참여.",
    strat:"Perp 거래 (주식/원자재 포함). XVS 예치.", ref:"https://app.extended.exchange/join/COINMAGE",
    yt:[{t:"Extended Revolut DNA",u:"https://youtu.be/3InSD1rIxwk"}]},
  {id:7,n:"Polymarket",tier:1,cat:"예측시장",ch:"Polygon",logo:LL("polymarket"),st:"확인됨",rw:"대형",fund:"$74M+",dist:"33.3%",tge:"미정",mentions:239,
    desc:"세계 최대 예측 시장. CMO가 에어드랍 공식 확인. $POLY 토큰 확정.",
    insight:"$20억+ 누적 거래량. $74M 1차 에어드랍 완료. 추가 시즌 진행중. 2026 예측시장 내러티브 핵심. 메인스트림 채택 1위.",
    strat:"예측 마켓 베팅. 주간 활성 거래.", ref:"https://polymarket.com",
    yt:[]},
  {id:8,n:"Glider",tier:1,cat:"DeFi",ch:"Multi-chain",logo:LL("glider"),st:"진행중",rw:"대형",fund:"a16z, Coinbase",dist:"미정",tge:"미정",mentions:0,
    desc:"AI DeFi 수익 최적화. a16z + Coinbase + Uniswap 삼중 백업.",
    insight:"삼대 메이저 VC 동시 투자는 극히 이례적. AI가 자동 리밸런싱하므로 난이도 최하. 쉬운 난이도 대비 대형 보상 기대.",
    strat:"예치 + 포인트. AI 자동 최적화.", ref:"https://glider.fi",yt:[]},
  {id:9,n:"Base",tier:1,cat:"L2",ch:"Base",logo:CL("base"),st:"예상",rw:"대형",fund:"Coinbase ($500M+)",dist:"20-25%",tge:"Q2-Q4 2026",mentions:246,
    desc:"Coinbase L2. 토큰 탐색 공식 확인. JPMorgan 추정 $12-34B.",
    insight:"TG 246회 언급. Jesse Pollak이 네트워크 토큰 탐색 공식 확인. JPMorgan 추정 에어드랍 규모 $2.4-8.5B. OP Stack 기반 최대 L2.",
    strat:"Base 생태계 dApp 활동 + 브릿지.", ref:"https://base.app/invite/coinmage/VGM6F57T",
    yt:[{t:"중국이 주목하는 에어드랍 2026",u:"https://youtu.be/aIr4gE59IWQ"}]},
  {id:10,n:"Basedapp",tier:1,cat:"DeFi",ch:"Base",logo:LL("basedapp"),st:"진행중",rw:"대형",fund:"Base 에코",dist:"미정",tge:"미정",mentions:0,
    desc:"Base 올인원 DeFi. 3중 파밍 + 비자카드. Coinbase 백업.",
    insight:"Base 토큰 출시 시 에코시스템 전체가 수혜. 비자카드 연동으로 실사용 가치. 3중 파밍 구조로 복리 효과.",
    strat:"Base 에코 활동 + 3중 파밍.", ref:"https://basedapp.com",
    yt:[{t:"Base 대형 에드작",u:"https://youtu.be/aIr4gE59IWQ"}]},

  // ══ TIER 2 ══
  {id:20,n:"edgeX",tier:2,cat:"PerpDEX",ch:"Multi-chain",logo:LL("edgex"),st:"진행중",rw:"대형",fund:"Amber Group",dist:"30%",tge:"03.31",mentions:505,
    desc:"StarkEx 기반. 월 ATH $167B 거래량 (시장 점유 14%).",
    insight:"TG 최다 언급 505회! XP 가중치: 거래량 60%(스팟 3x 가산), 손실보상 10%, TVL기여 10%. TGE 임박이라 마지막 스퍼트.",
    strat:"거래량 파밍. 스팟 3x 가중치 활용.", ref:"https://pro.edgex.exchange/referral/570254647",
    yt:[{t:"올해 하나만 한다면 edgeX",u:"https://youtu.be/X-fXkGELRes"}]},
  {id:21,n:"Ethereal",tier:2,cat:"PerpDEX",ch:"Ethereum",logo:LL("ethereal"),st:"진행중",rw:"대형",fund:"Ethena",dist:"15%",tge:"미정",mentions:324,
    desc:"Ethena 생태계 Perp DEX. USDe 마진. 30x Ethena 리워드.",
    insight:"TG 324회 언급. ENA 홀더에게 15% 거버넌스 토큰 직접 배분. Ethena 사용하면 30x 리워드 부스트.",
    strat:"USDe 예치 + Perp 거래.", ref:"https://ethereal.trade",yt:[]},
  {id:22,n:"Based",tier:2,cat:"PerpDEX",ch:"Multi-chain",logo:LL("based-markets"),st:"진행중",rw:"중형~대형",fund:"-",dist:"미정",tge:"미정",mentions:236,
    desc:"6중 파밍 Perp DEX. Hyperliquid 기반.",
    insight:"TG 236회 언급. 하이퍼리퀴드 기반 모바일 PerpDEX. 6중 보상 구조로 효율 극대화.",
    strat:"6중 파밍 + 거래.", ref:"https://app.based.one/register?ref=COINMAGE",
    yt:[{t:"Based 6중 파밍법",u:"https://youtu.be/0hqZI7P8Iyc"}]},
  {id:23,n:"Lighter",tier:2,cat:"PerpDEX",ch:"Multi-chain",logo:LL("lighter"),st:"TGE완료",rw:"중형",fund:"a16z",dist:"완료",tge:"완료",mentions:411,
    desc:"a16z 투자 Perp DEX. TGE 완료.",
    insight:"TG 411회 언급. 시빌 재분배 진행중이라 정직한 유저에게 추가 배분 가능성.",
    strat:"클레임 확인.", ref:"https://app.lighter.xyz/trade/ETH?referral=GMYPZWQK69X4",
    yt:[{t:"Lighter 올인원",u:"https://youtu.be/Lii9mokD8Qw"}]},
  {id:24,n:"Backpack",tier:2,cat:"PerpDEX",ch:"Solana",logo:LL("backpack"),st:"TGE완료",rw:"중형",fund:"VARA 라이선스",dist:"완료",tge:"완료",mentions:201,
    desc:"Solana 기반 거래소. VARA 라이선스 보유.",
    insight:"TG 201회 언급. 규제 준수 거래소. Solana 생태계 핵심 인프라.",
    strat:"클레임 확인.", ref:"https://backpack.exchange/join/i3bkhbg4",
    yt:[{t:"Backpack Solana DEX",u:"https://youtu.be/NEgGBv2X0M4"}]},
  {id:25,n:"Silhouette",tier:2,cat:"PerpDEX",ch:"HyperEVM",logo:LL("silhouette"),st:"진행중",rw:"중형~대형",fund:"$3M",dist:"미정",tge:"미정",mentions:0,
    desc:"HyperEVM Shielded Trading. 프라이버시 거래. 극초기.",
    insight:"2026년 3대 내러티브 중 하나인 프라이버시. HyperEVM 위 첫 프라이버시 트레이딩. 극초기라 선점 효과 극대화.",
    strat:"USDC 브릿지 → Shielded 거래.", ref:"https://silhouette.fi",
    yt:[{t:"실루엣 Shielded Trading",u:"https://www.youtube.com/watch?v=UTWmrmTF9Wg"}]},
  {id:26,n:"MegaETH",tier:2,cat:"L2",ch:"MegaETH",logo:LL("megaeth"),st:"예상",rw:"대형",fund:"$107M",dist:"5%+",tge:"Q2 2026",mentions:85,
    desc:"Vitalik 투자 초고속 L2. 35K TPS.",
    insight:"Vitalik + Dragonfly $107M 투자. Polymarket에서 67% 확률로 2026.06.30 이전 TGE 예측. Fluffle NFT 홀더 보장.",
    strat:"Bridge + dApp 사용.", ref:"https://megaeth.systems",yt:[]},
  {id:27,n:"Reya",tier:2,cat:"PerpDEX",ch:"Ethereum",logo:LL("reya-network"),st:"진행중",rw:"중형~대형",fund:"$19M",dist:"45%",tge:"미정",mentions:0,
    desc:"이더리움 Perp DEX. 45% 커뮤니티. Wintermute 참여.",
    insight:"Framework + Coinbase Ventures $19M. 커뮤니티 45% 할당은 상위권. 자체 L2 모듈러 체인.",
    strat:"Perp 거래.", ref:"https://reya.network",yt:[]},
  {id:28,n:"Pacifica",tier:2,cat:"PerpDEX",ch:"Solana",logo:LL("pacifica"),st:"진행중",rw:"중형~대형",fund:"Self-funded",dist:"미정",tge:"미정",mentions:134,
    desc:"FTX 전 COO 설립. 자체 펀딩 (VC 없음 = 하이퍼리퀴드 모델).",
    insight:"TG 134회 언급. Constance Wang(FTX 전 COO) 설립. 하이퍼리퀴드처럼 VC 없이 자체 펀딩. 매주 목요일 1000만 포인트 배포. 안티시빌.",
    strat:"거래 볼륨 + 포인트.", ref:"https://app.pacifica.fi?referral=cryptocurrencymage",
    yt:[{t:"Pacifica Perp DEX",u:"https://youtu.be/kabzoJJBto0"}]},
  {id:29,n:"Avantis",tier:2,cat:"PerpDEX",ch:"Base",logo:LL("avantis"),st:"진행중",rw:"중형",fund:"Base 에코",dist:"미정",tge:"미정",mentions:0,
    desc:"Base RWA 파생 Perp DEX. Equity Perps.",
    insight:"Equity Perps 내러티브. TradFi 자산 온체인 거래. Base 에코시스템 핵심.",
    strat:"RWA 거래.", ref:"https://www.avantisfi.com/referral?code=coinmage",
    yt:[{t:"Avantis RWA Perp",u:"https://youtu.be/uTPhivRidMo"}]},
  {id:30,n:"Supercexy",tier:2,cat:"PerpDEX",ch:"HyperEVM",logo:LL("supercexy"),st:"진행중",rw:"중형~대형",fund:"-",dist:"미정",tge:"미정",mentions:0,
    desc:"Hyperliquid L1 모바일 Perp DEX. 50x 레버리지 + 트레일링 스탑/아이스버그 주문.",
    insight:"모바일 최적화 PerpDEX로 HL 생태계 핵심 프론트엔드. 고급 주문(TP/SL/아이스버그/트레일링 스탑) 지원. HYPE 38.8% 미래 커뮤니티 보상 풀에서 간접 수혜 가능. 레퍼럴은 $10K 거래량 달성 후 해금.",
    strat:"모바일 Perp 거래 + HL 포인트 동시 파밍.", ref:"https://supercexy.com/@coinmage",
    yt:[{t:"Supercexy 모바일 PerpDEX",u:"https://youtu.be/m3PVod_jg2s"}]},
  {id:31,n:"Predict.fun",tier:2,cat:"예측시장",ch:"Multi-chain",logo:LL("predict-fun"),st:"진행중",rw:"중형",fund:"-",dist:"미정",tge:"미정",mentions:148,
    desc:"예측 시장. 폴리마켓 보조.",
    insight:"TG 148회 언급. Polymarket의 보조 베팅 플랫폼으로 동시 파밍 가능.",
    strat:"예측 마켓 거래.", ref:"https://predict.fun?ref=5302B",yt:[]},
  {id:32,n:"Kaito",tier:2,cat:"InfoFi",ch:"Multi-chain",logo:LL("kaito"),st:"진행중",rw:"중형",fund:"-",dist:"미정",tge:"미정",mentions:151,
    desc:"InfoFi. AI 기반 크립토 정보 플랫폼.",
    insight:"TG 151회 언급. Yaps 기반 인플루언서 보상. 정보 생산자에게 토큰 보상하는 InfoFi 내러티브 선두.",
    strat:"Yaps 활동.", ref:"#",yt:[]},
  {id:33,n:"Hylo",tier:2,cat:"DeFi",ch:"Solana",logo:LL("hylo"),st:"진행중",rw:"중형",fund:"-",dist:"미정",tge:"미정",mentions:0,
    desc:"Solana 레버리지 수익률.",
    strat:"SOL 예치 + 레버리지.", ref:"https://hylo.so/leverage?ref=RGCOFI",
    yt:[{t:"Hylo+OnRe 수익률",u:"https://youtu.be/15JiPzLcwdU"}]},
  {id:34,n:"Miracle",tier:2,cat:"PerpDEX",ch:"Multi-chain",logo:LL("miracle"),st:"진행중",rw:"중형~대형",fund:"-",dist:"미정",tge:"미정",mentions:18,
    desc:"Perp DEX 터미널. 다중 거래소 통합.",
    strat:"거래 터미널 활용.", ref:"https://miracletrade.com/?ref=coinmage",
    yt:[{t:"Miracle 터미널",u:"https://youtu.be/jNCnE_meJTw"}]},
  {id:35,n:"Aztec",tier:2,cat:"L2",ch:"Aztec",logo:LL("aztec"),st:"진행중",rw:"대형",fund:"$119M",dist:"미정",tge:"미정",mentions:0,
    desc:"프라이버시 zk-rollup. a16z + Paradigm.",
    insight:"$119M 투자. 프라이버시 L2 최대 규모. 2026 프라이버시 내러티브 핵심.",
    strat:"테스트넷 활동.", ref:"https://aztec.network",yt:[]},
  {id:36,n:"Kodiak",tier:2,cat:"DEX",ch:"Berachain",logo:LL("kodiak"),st:"TGE완료",rw:"중형~대형",fund:"Hack VC, Amber",dist:"미정",tge:"완료",mentions:0,
    desc:"베라체인 유일 공식 인큐베이팅 DEX. KDK 토큰 출시. PoL 네이티브 유동성 허브.",
    insight:"Build-a-Bera 액셀러레이터 출신 유일 DEX. KDK 2025.12 출시. Kodiak Amber로 집중 유동성 자동 리밸런싱. xKDK→KDK 1:1 전환 가능. PoL 메커니즘 통해 LP→BGT→거버넌스 플라이휠.",
    strat:"유동성 풀 제공 + xKDK 퀘스트. BGT 보상 수확.", ref:"https://kodiak.finance",yt:[]},
  {id:37,n:"Zama",tier:2,cat:"인프라",ch:"Multi-chain",logo:LL("zama"),st:"진행중",rw:"대형",fund:"$57M",dist:"미정",tge:"미정",mentions:0,
    desc:"FHE 프라이버시 인프라. 유니콘.",
    insight:"Pantera 리드 $57M. 완전동형암호화(FHE) 인프라. 유니콘 밸류에이션.",
    strat:"테스트넷 참여.", ref:"https://zama.ai",yt:[]},
  {id:38,n:"Ranger",tier:2,cat:"PerpDEX",ch:"Solana",logo:LL("ranger"),st:"진행중",rw:"중형~대형",fund:"-",dist:"미정",tge:"미정",mentions:0,
    desc:"Solana PerpDEX 애그리게이터.",
    strat:"Perp 애그리게이션.", ref:"https://t.me/cryptocurrencymage/8438",
    yt:[{t:"Ranger Solana",u:"https://youtu.be/Aaez44YeR8U"}]},

  // ══ TIER 3 — 모니터링 ══
  {id:50,n:"StandX",tier:3,cat:"PerpDEX",ch:"Multi",logo:LL("standx"),rw:"중형",st:"진행중",fund:"미공개",dist:"미정",tge:"Q1 2026",mentions:0,
    desc:"바이낸스 선물 창립팀 출신 Perp DEX. DUSD 수익형 스테이블코인 마진.",
    insight:"CEO AG가 바이낸스 선물을 처음부터 구축한 인물. 골드만삭스 출신 팀. DUSD 보유 기간이 길수록 에어드랍 포인트 가산. 스테이블 예치만으로 파밍 가능한 저리스크 구조.",
    strat:"DUSD 전환 + 예치 + Perp 거래 포인트 파밍.", ref:"https://standx.io",
    yt:[{t:"StandX",u:"https://youtu.be/x7m7B5uJewE"}]},
  {id:51,n:"Theo",tier:3,cat:"DeFi",ch:"HyperEVM",logo:LL("theo"),rw:"중형",st:"진행중",fund:"$20M",dist:"미정",tge:"미정",mentions:0,
    desc:"$20M 펀딩. 델타뉴트럴 볼트 + thGOLD 수익형 토큰화 금.",
    insight:"델타뉴트럴 전략으로 시장 방향 무관 수익. thGOLD 출시 (금 $5,100 돌파 시점). S2 포인트 매주 금요일 배포. 최소 $1,000 예치 권장. HyperEVM 핵심 DeFi.",
    strat:"스테이블/ETH 예치 + S2 포인트 파밍.", ref:"https://theo.xyz",
    yt:[{t:"THEO 예치작업",u:"https://youtu.be/spjWF2_NaK0"}]},
  {id:52,n:"GRASS",tier:3,cat:"DePIN",ch:"Solana",logo:LL("grass"),rw:"중형~대형",st:"진행중",fund:"미공개",dist:"S2 진행",tge:"완료",mentions:72,
    desc:"850만 MAU DePIN 대장. 유휴 대역폭으로 AI 학습 데이터 제공. S2 1.7억 토큰 배포.",
    insight:"TG 72회 언급. 2026.03 $33M 수익 달성 (38% 가격 급등). 안드로이드 앱 출시 예정으로 모바일 파밍 가능해질 전망. S2 진행중이며 1.7억 GRASS 배포. 네이티브 월렛 인프라 업그레이드 중.",
    strat:"브라우저 익스텐션 상시 가동 + 노드 운영.", ref:"https://app.getgrass.io/register/?referralCode=2gde8V1AxJaFo2F",yt:[]},
  {id:53,n:"Nodepay",tier:3,cat:"DePIN",ch:"Multi",logo:LL("nodepay"),rw:"중형",st:"진행중",fund:"OKX, Animoca",dist:"S2 진행",tge:"완료",mentions:32,
    desc:"AI 예측 인텔리전스 DePIN. 5만+ 소스 감성 분석. OKX/Animoca 투자.",
    insight:"TG 32회 언급. OKX Ventures + Animoca Brands 투자. 180개국 200만+ 유저. NC 토큰 OKX/Bitget/Coinbase 상장. S2 에어드랍 진행중. Staking V2 가스비 18% 절감 업그레이드 완료.",
    strat:"노드 운영 + NC 스테이킹 V2.", ref:"https://app.nodepay.ai/register?ref=Q5X91tiuPwB14IG",yt:[]},
  {id:54,n:"Gradient",tier:3,cat:"AI",ch:"Solana",logo:LL("gradient"),rw:"중형",st:"진행중",fund:"$10M Pantera",dist:"미정",tge:"미정",mentions:0,
    desc:"탈중앙 AI 런타임. Pantera + Multicoin $10M. 190개국 160만 노드.",
    insight:"Pantera Capital + Multicoin Capital + HSG(전 세쿼이아 차이나) $10M 시드. 전 Helium 재단 출신 CEO. Echo-2로 AI 학습비 80% 절감. 160만+ Sentry Node 배포. EXP 포인트 시스템으로 추후 토큰 전환 예상.",
    strat:"Sentry Node 브라우저 익스텐션 상시 가동.", ref:"https://app.gradient.network/signup?code=O58PXU",yt:[]},
  {id:55,n:"Recall",tier:3,cat:"AI",ch:"Multi",logo:LL("recall"),rw:"중형~대형",st:"TGE완료",fund:"미공개",dist:"10%",tge:"완료",mentions:0,
    desc:"AI 에이전트 데이터 레이어. 검증된 지식 온체인 저장/교환. 10억 RECALL 중 10% 에어드랍.",
    insight:"Textile.io + 3Box Labs 합병 프로젝트. 총 10억 RECALL 중 10% 에어드랍 + 30% 커뮤니티/생태계. TGE 20% 즉시 해금. AI 에이전트가 지식을 증명/저장/수익화하는 인프라.",
    strat:"클레임 확인 + 생태계 활동.", ref:"https://recall.network",yt:[]},
  {id:56,n:"Felix",tier:3,cat:"DeFi",ch:"HyperEVM",logo:LL("felix-protocol"),rw:"중형~대형",st:"진행중",fund:"미공개",dist:"미정",tge:"미정",mentions:0,
    desc:"HyperEVM 스테이블코인 feUSD 민팅 + Stability Pool 수익.",
    insight:"HyperEVM 핵심 스테이블코인 프로토콜. feUSD 담보 민팅 + Stability Pool 예치로 수익. S2 포인트 파밍 진행중. Polymarket에서 2026년 내 TGE 예측. HYPE 생태계 성장 시 직접 수혜.",
    strat:"feUSD 민팅 + Stability Pool 예치.", ref:"https://usefelix.xyz",yt:[]},
  {id:58,n:"Walrus",tier:3,cat:"스토리지",ch:"Sui",logo:LL("walrus"),rw:"중형~대형",st:"TGE완료",fund:"미공개",dist:"10%",tge:"완료",mentions:0,
    desc:"Sui 탈중앙 스토리지. WAL 50억 총공급. 8만+ 지갑 에어드랍.",
    insight:"Sui 생태계 핵심 스토리지 인프라. 총 50억 WAL 중 10% 커뮤니티 (4% NFT 에어드랍 + 6% 초기 기여자). 2026.03.27 클레임 오픈. 8만+ 지갑 자격. 다중 NFT 에어드랍 라운드 진행중.",
    strat:"Sui NFT 홀딩 + WAL 클레임.", ref:"https://walrus.xyz",yt:[]},
  {id:59,n:"PIN AI",tier:3,cat:"AI",ch:"Multi",logo:LL("pin-ai"),rw:"중형",st:"진행중",fund:"$10M a16z",dist:"미정",tge:"Q2 2026",mentions:0,
    desc:"a16z + Hack VC $10M. AI 의사결정 플랫폼. Google Brain/Stanford 출신 팀.",
    insight:"a16z crypto CSX + Hack VC + NEAR 일리아 폴로수킨 투자. 팀이 Ethereum/Google Brain/Stanford/MIT 출신 올스타. TGE Q2 2026 예상. HiPIN 포인트 + Galxe 100만 PIN Points 캠페인 활성.",
    strat:"HiPIN 포인트 파밍 + Galxe 캠페인.", ref:"https://pinai.io",yt:[]},
  {id:60,n:"Kite AI",tier:3,cat:"AI",ch:"Multi",logo:LL("kite-ai"),rw:"중형",st:"진행중",fund:"미공개",dist:"미정",tge:"미정",mentions:0,
    desc:"AI 에이전트 프레임워크. 테스트넷 활성.",
    insight:"AI 에이전트 생태계 인프라. 테스트넷 포인트 파밍 가능.",
    strat:"테스트넷 참여 + 포인트 파밍.", ref:"https://testnet.gokite.ai?r=FDBrFYKW",yt:[]},
  {id:61,n:"OnRe",tier:3,cat:"DeFi",ch:"Solana",logo:LL("onre"),rw:"중형",st:"진행중",fund:"미공개",dist:"미정",tge:"미정",mentions:0,
    desc:"Solana 수익률 프로토콜. 리더보드 기반 보상.",
    insight:"Solana DeFi 수익률 최적화. 리더보드 경쟁으로 추가 보상. Hylo와 함께 Solana 수익률 파밍의 핵심 조합.",
    strat:"SOL/스테이블 예치 + 리더보드 순위.", ref:"https://app.onre.finance/earn/leaderboard?ref=FQLFHEYMW",
    yt:[{t:"Solana 수익률",u:"https://youtu.be/15JiPzLcwdU"}]},
  {id:62,n:"Linea",tier:3,cat:"L2",ch:"Linea",logo:CL("linea"),rw:"중형",st:"진행중",fund:"ConsenSys",dist:"미정",tge:"미정",mentions:0,
    desc:"ConsenSys(MetaMask) L2. LXP + LXP-L 포인트 프로그램.",
    insight:"메타마스크 모회사 ConsenSys가 만든 L2. LXP(활동) + LXP-L(유동성) 이중 포인트 시스템. 메타마스크 통합으로 사용자 베이스 압도적.",
    strat:"브릿지 + DeFi 활동 + LXP 포인트.", ref:"https://referrals.linea.build/?refCode=plOzXsJ9qL",yt:[]},
  {id:63,n:"Plume",tier:3,cat:"RWA",ch:"Plume",logo:LL("plume"),rw:"중형",st:"진행중",fund:"미공개",dist:"미정",tge:"미정",mentions:0,
    desc:"RWA 특화 L1. 실물자산 토큰화 인프라.",
    insight:"RWA(실물자산) 토큰화 특화 체인. Miles 포인트 프로그램 활성. 2026 RWA 내러티브 성장 수혜 예상.",
    strat:"Miles 포인트 파밍 + 생태계 활동.", ref:"https://miles.plumenetwork.xyz/join?invite=PLUME-MC0GB",yt:[]},
  {id:64,n:"Layer3",tier:3,cat:"퀘스트",ch:"Multi",logo:LL("layer3"),rw:"중형",st:"진행중",fund:"미공개",dist:"미정",tge:"미정",mentions:59,
    desc:"멀티체인 퀘스트 플랫폼. 다양한 프로젝트 에어드랍 동시 파밍.",
    insight:"TG 59회 언급. 퀘스트 완료로 다수 프로젝트 에어드랍 자격 동시 확보. 한 플랫폼에서 여러 에어드랍 파밍 가능한 효율적 허브.",
    strat:"일일 퀘스트 + 주간 미션 루틴.", ref:"https://app.layer3.xyz/?ref=coinmage777.eth",yt:[]},
  {id:65,n:"SuperForm",tier:3,cat:"DeFi",ch:"Multi",logo:LL("superform"),rw:"중형",st:"TGE완료",fund:"미공개",dist:"50.4%",tge:"완료",mentions:0,
    desc:"크로스체인 DeFi 자산관리. $10B+ TVL. UP 토큰 2026.02 출시.",
    insight:"크로스체인 수익률 애그리게이터. 18만+ 예치자. UP 토큰 2026.02.10 TGE. 50.4% 커뮤니티/생태계 배분은 역대급. Hyperliquid 통합 완료.",
    strat:"크로스체인 예치 + UP 토큰 파밍.", ref:"https://superform.xyz",yt:[]},
  {id:66,n:"OpenLedger",tier:3,cat:"AI",ch:"Multi",logo:LL("openledger"),rw:"중형~대형",st:"TGE완료",fund:"미공개",dist:"15%",tge:"완료",mentions:0,
    desc:"탈중앙 AI 데이터 네트워크. 자체 체인. OPEN 토큰 출시.",
    insight:"AI/ML 데이터 기여하면서 소유권 유지하는 탈중앙 데이터 네트워크. OPEN 토큰 2025.09 출시. 2026.03 2차 배포로 1,500만 OPEN(총공급 15%) 추가 분배. 자체 체인 메인넷 안정화 로드맵 진행.",
    strat:"데이터 기여 + OPEN 토큰 활동.", ref:"https://openledger.xyz",yt:[]},
  {id:67,n:"Fogo",tier:3,cat:"L1",ch:"Fogo",logo:LL("fogo"),rw:"중형",st:"TGE완료",fund:"미공개",dist:"S2 2%",tge:"완료",mentions:0,
    desc:"SVM 기반 초고속 L1. 40ms 미만 블록, 5.4만 TPS. Firedancer 밸리데이터.",
    insight:"Solana VM 기반이지만 독립 L1. 40ms 미만 블록타임 + 5.4만 TPS. 2026.01.13 TGE. 에어드랍 클레임 4/15까지. 약 22,300명, 평균 6,700 FOGO. S2 확정 (2% 토큰).",
    strat:"S2 참여 + 클레임 확인 (4/15 마감!).", ref:"https://fogo.io",yt:[]},
  {id:68,n:"Kalshi",tier:3,cat:"예측시장",ch:"Multi",logo:LL("kalshi"),rw:"중형~대형",st:"진행중",fund:"$1B+",dist:"미정",tge:"미정",mentions:0,
    desc:"CFTC 규제 준수 예측시장. $11B 밸류. 주간 $2.3B 거래량.",
    insight:"CFTC 규제 유일 예측시장. $1B+ 펀딩으로 $11B 밸류에이션. 2026.01 Coinbase 파트너십 체결. BTC/ETH 이벤트 콘트랙트 지원. 네이티브 토큰은 없지만 Solana 토큰화 계약 도입으로 토큰 가능성.",
    strat:"예측 마켓 활동 + Polymarket 동시 파밍.", ref:"https://kalshi.com",yt:[]},
  {id:69,n:"Abstract",tier:3,cat:"L2",ch:"Abstract",logo:CL("abstract"),rw:"중형",st:"진행중",fund:"$11M",dist:"미정",tge:"미정",mentions:0,
    desc:"Pudgy Penguins 모회사 Igloo L2. XP 포인트 시스템.",
    insight:"Pudgy Penguins 모회사가 만든 접근성 특화 L2. $11M 펀딩. XP 포인트 + 배지 시스템 활성. PENGU 홀더 보너스 예상. 중화권 에드작 리스트에서 주간 $100 카드 소비로 40-60K 포인트.",
    strat:"XP 포인트 + 생태계 dApp 활동.", ref:"https://abs.xyz",yt:[]},
  {id:70,n:"Symbiotic",tier:3,cat:"DeFi",ch:"Ethereum",logo:LL("symbiotic"),rw:"중형",st:"진행중",fund:"$34.8M",dist:"미정",tge:"미정",mentions:0,
    desc:"퍼미션리스 리스테이킹. Pantera $29M + Paradigm $5.8M.",
    insight:"Paradigm + Pantera Capital $34.8M. Coinbase Ventures + Polygon도 참여. ERC-20 스테이킹 자산으로 블록체인 보안 제공. 2026년 AI + Bitcoin LST 확장 계획. 포인트 프로그램이 레트로 에어드랍 자격.",
    strat:"ETH/LST 예치 + 포인트 파밍.", ref:"https://symbiotic.fi",yt:[]},
  {id:71,n:"Kinetiq",tier:3,cat:"PerpDEX",ch:"HyperEVM",logo:LL("kinetiq"),rw:"중형~대형",st:"TGE완료",fund:"$1.75M",dist:"30%",tge:"완료",mentions:0,
    desc:"HyperEVM 리퀴드 스테이킹 + 25x 레버리지 PerpDEX Markets.",
    insight:"Maven 11 + Pier Two $1.75M. KNTQ 2025.11 출시, 24% 에어드랍 완료. S2 진행중. 30% Protocol Growth & Rewards 할당. Markets에서 주식(US500) + 크립토 25x 레버리지 거래.",
    strat:"Markets 거래 + KNTQ S2 파밍.", ref:"https://kinetiq.xyz",yt:[]},
  {id:72,n:"xStocks",tier:3,cat:"DeFi",ch:"Multi",logo:LL("xstocks"),rw:"중형",st:"진행중",fund:"미공개",dist:"미정",tge:"미정",mentions:0,
    desc:"온체인 주식 토큰 거래. Equity Perps 내러티브.",
    insight:"TradFi 주식을 온체인에서 토큰화 거래. Extended와 함께 2026 Equity Perps 내러티브 핵심. 규제 리스크 있지만 내러티브 성장 잠재력.",
    strat:"주식 토큰 거래 + 포인트 파밍.", ref:"https://xstocks.io",
    yt:[{t:"xStocks 에어드랍",u:"https://www.youtube.com/watch?v=E-fHENsX-Gk"}]},
  {id:73,n:"EVEDEX",tier:3,cat:"PerpDEX",ch:"Multi",logo:LL("evedex"),rw:"중형",st:"진행중",fund:"미공개",dist:"미정",tge:"미정",mentions:0,
    desc:"차세대 Perp DEX. 초대 기반 파밍.",
    insight:"초대 코드 기반 접근으로 초기 유저 우대 구조. Perp DEX 과포화 시장에서 차별화 시도.",
    strat:"초대 코드로 가입 + 거래 파밍.", ref:"https://invite.evedex.com",yt:[]},
  {id:74,n:"Arc",tier:3,cat:"인프라",ch:"Multi",logo:LL("arc"),rw:"중형",st:"진행중",fund:"미공개",dist:"미정",tge:"미정",mentions:0,
    desc:"인프라 프로토콜. 테스트넷 활성.",
    insight:"중화권 에드작 리스트에서 레이어 체인 카테고리 언급. 대형 VC 참여로 레트로 에어드랍 잠재력. 테스트넷 초기 참여 중요.",
    strat:"테스트넷 활동 + 트랜잭션 축적.", ref:"https://arc.tech",
    yt:[{t:"Arc 테스트넷",u:"https://youtu.be/xNphMdfP0yU"}]},
  {id:75,n:"Minara",tier:3,cat:"AI",ch:"Multi",logo:LL("minara"),rw:"중형",st:"진행중",fund:"Circle Ventures",dist:"미정",tge:"미정",mentions:0,
    desc:"AI 자동매매 + NFT 캠페인. Circle Ventures 투자.",
    insight:"Circle Ventures(USDC 발행사) 직접 투자. AI 자동 트레이딩 + 테슬라 이벤트 연동. NFT 기반 에어드랍 구조.",
    strat:"AI 트레이딩 활동 + NFT 보유.", ref:"https://minara.ai",
    yt:[{t:"Minara AI",u:"https://www.youtube.com/watch?v=9DJKCrlkkLI"}]},
  {id:76,n:"Limitless",tier:3,cat:"예측시장",ch:"Base",logo:LL("limitless"),rw:"중형",st:"진행중",fund:"$4M+",dist:"미정",tge:"미정",mentions:0,
    desc:"Base 예측시장. LMTS 토큰. S3 진행중 (5/25 종료).",
    insight:"$4M+ 전략적 펀딩. LMTS 토큰 출시. S3 2026.01.26-05.25 진행중. 최소 $200 거래량 필요. 2x 포인트 멀티플라이어 이벤트 수시 진행. 레퍼럴 최대 6% 보너스.",
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
  {n:"OKX",ref:"https://www.okx.com/join/COINMAGE",mentions:270},
  {n:"Binance",ref:"https://www.binance.com/activity/referral-entry/CPA?ref=CPA_007KXFMF71",mentions:589},
  {n:"Bybit",ref:"https://www.bybit.com/en/invite/?ref=7XJ62O",mentions:209},
  {n:"Bitget",ref:"https://www.bitget.com/asia/events/activities/?clacCode=PC2AQ797",mentions:139},
  {n:"Coinone",ref:"https://coinone.co.kr/user/signup?ref=0578IN69",mentions:53},
];

const CAT_C = {"PerpDEX":"text-violet-300 bg-violet-500/15","DeFi":"text-blue-300 bg-blue-500/15","AI":"text-cyan-300 bg-cyan-500/15","예측시장":"text-amber-300 bg-amber-500/15","L2":"text-emerald-300 bg-emerald-500/15","L1":"text-emerald-300 bg-emerald-500/15","DEX":"text-fuchsia-300 bg-fuchsia-500/15","인프라":"text-orange-300 bg-orange-500/15","DePIN":"text-lime-300 bg-lime-500/15","InfoFi":"text-indigo-300 bg-indigo-500/15","스토리지":"text-teal-300 bg-teal-500/15","퀘스트":"text-pink-300 bg-pink-500/15","RWA":"text-yellow-300 bg-yellow-500/15","소셜":"text-pink-300 bg-pink-500/15"};
const ST_DOT = {"진행중":"bg-emerald-400","확인됨":"bg-blue-400","예상":"bg-amber-400","TGE완료":"bg-zinc-500"};

/* ═══════════════════════════════════════════════════════════ */
/*  COMPONENTS                                               */
/* ═══════════════════════════════════════════════════════════ */

function Nav({sec,setSec}) {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-[#0a0a0f]/80 border-b border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-4 h-12 flex items-center justify-between">
        <a href="https://www.youtube.com/@CryptoMage" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center"><Sparkles size={12} className="text-white"/></div>
          <span className="font-semibold text-sm text-white tracking-tight">CryptoMage</span>
          <span className="text-[10px] text-zinc-600 font-mono hidden sm:inline">7.7K</span>
        </a>
        <div className="flex items-center gap-0.5 bg-white/[0.03] rounded-lg p-0.5">
          {[{id:"airdrops",l:"에어드랍",I:Rocket},{id:"vibe",l:"바이브코딩",I:Code2}].map(t=>(
            <button key={t.id} onClick={()=>setSec(t.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${sec===t.id?'bg-white/[0.08] text-white':'text-zinc-500 hover:text-zinc-300'}`}>
              <t.I size={12}/>{t.l}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a href="https://blog.naver.com/coinmage" target="_blank" rel="noopener noreferrer" className="text-[11px] text-zinc-500 hover:text-white transition-colors hidden sm:block">블로그</a>
          <a href="https://t.me/cryptocurrencymage" target="_blank" rel="noopener noreferrer" className="text-[11px] text-zinc-500 hover:text-white transition-colors hidden sm:block">텔레그램</a>
          <a href="https://www.youtube.com/@CryptoMage" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-2 py-1 rounded-md bg-red-500/10 text-red-400 text-[11px] font-medium hover:bg-red-500/20 transition-colors"><Play size={10} fill="currentColor"/>YouTube</a>
        </div>
      </div>
    </nav>
  );
}

function PCard({p,onClick}) {
  const cc = CAT_C[p.cat]||CAT_C["DeFi"];
  return (
    <motion.button initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} onClick={onClick}
      className="w-full text-left bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05] hover:border-white/[0.1] rounded-xl p-3.5 transition-all group">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Logo src={p.logo} name={p.n} size={36}/>
          {p.hot && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center"><Flame size={8} className="text-white"/></span>}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm font-semibold text-white">{p.n}</span>
            {p.st && <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${ST_DOT[p.st]||'bg-zinc-600'}`}/>}
            {p.hot && <span className="text-[9px] px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-300 font-medium">HOT</span>}
            {p.yt && p.yt.length>0 && <Play size={10} fill="currentColor" className="text-red-400 flex-shrink-0"/>}
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`inline-flex px-1.5 py-0.5 rounded text-[9px] font-medium ${cc}`}>{p.cat}</span>
            <span className="text-[10px] text-zinc-600">{p.ch}</span>
            {p.mentions>0 && <span className="text-[9px] text-zinc-600 flex items-center gap-0.5"><MessageCircle size={8}/>{p.mentions}</span>}
          </div>
        </div>
        <div className="text-right flex-shrink-0 hidden sm:block">
          {p.fund && p.fund!=="-" && <div className="text-[10px] text-zinc-500 mb-0.5">{p.fund}</div>}
          {p.dist && p.dist!=="미정" && <div className="text-[11px] font-mono font-medium text-violet-300">{p.dist}</div>}
        </div>
        <ChevronRight size={14} className="text-zinc-700 group-hover:text-zinc-400 transition-colors flex-shrink-0"/>
      </div>
      {p.tier<=2 && p.desc && <p className="mt-2 text-[11px] text-zinc-500 leading-relaxed line-clamp-2 pl-12">{p.desc}</p>}
    </motion.button>
  );
}

function PModal({p,onClose}) {
  if(!p) return null;
  const cc = CAT_C[p.cat]||CAT_C["DeFi"];
  return (
    <AnimatePresence><motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <motion.div initial={{y:60,opacity:0}} animate={{y:0,opacity:1}} transition={{type:"spring",damping:28,stiffness:350}}
        className="w-full sm:max-w-md bg-[#111115] border border-white/[0.08] rounded-t-2xl sm:rounded-2xl max-h-[85vh] overflow-y-auto scrollbar-none" onClick={e=>e.stopPropagation()}>
        <div className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <Logo src={p.logo} name={p.n} size={44}/>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">{p.n}</h3>
                  {p.hot && <span className="text-[9px] px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-300 font-medium">HOT</span>}
                </div>
                <div className="flex items-center gap-1.5"><span className={`inline-flex px-1.5 py-0.5 rounded text-[9px] font-medium ${cc}`}>{p.cat}</span><span className="text-[10px] text-zinc-500">{p.ch}</span></div>
              </div>
            </div>
            <button onClick={onClose} className="w-7 h-7 rounded-full bg-white/[0.06] flex items-center justify-center hover:bg-white/[0.12] transition-colors"><X size={14} className="text-zinc-400"/></button>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {p.st && <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/[0.04] text-zinc-300">{p.st}</span>}
            {p.rw && <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/[0.04] text-zinc-300">{p.rw}</span>}
            {p.tge && <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/[0.04] text-zinc-400">TGE {p.tge}</span>}
            {p.mentions>0 && <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-violet-500/10 text-violet-300 flex items-center gap-1"><MessageCircle size={9}/>TG {p.mentions}회</span>}
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {p.fund && p.fund!=="-" && <div className="bg-white/[0.02] rounded-lg p-2.5 border border-white/[0.04]"><div className="text-[9px] uppercase tracking-wider text-zinc-600 mb-1">펀딩</div><div className="text-xs font-medium text-white">{p.fund}</div></div>}
            {p.dist && p.dist!=="미정" && <div className="bg-white/[0.02] rounded-lg p-2.5 border border-white/[0.04]"><div className="text-[9px] uppercase tracking-wider text-zinc-600 mb-1">배분율</div><div className="text-xs font-medium text-violet-300">{p.dist}</div></div>}
          </div>

          {p.desc && <p className="text-[13px] text-zinc-300 leading-relaxed mb-4">{p.desc}</p>}

          {p.insight && (
            <div className="mb-4 bg-gradient-to-r from-violet-500/[0.06] to-fuchsia-500/[0.04] border border-violet-500/10 rounded-lg p-3">
              <div className="text-[9px] uppercase tracking-wider text-violet-400 mb-1.5 flex items-center gap-1"><Zap size={10}/>크립토메이지 인사이트</div>
              <p className="text-xs text-zinc-200 leading-relaxed">{p.insight}</p>
            </div>
          )}

          {p.strat && (
            <div className="mb-4 bg-white/[0.02] border border-white/[0.04] rounded-lg p-3">
              <div className="text-[9px] uppercase tracking-wider text-zinc-600 mb-1">추천 전략</div>
              <p className="text-xs text-zinc-300 leading-relaxed">{p.strat}</p>
            </div>
          )}

          {p.yt && p.yt.length>0 && (
            <div className="mb-4">
              <div className="text-[9px] uppercase tracking-wider text-zinc-600 mb-2">관련 영상</div>
              <div className="space-y-1.5">
                {p.yt.map((v,i)=>(<a key={i} href={v.u} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:bg-red-500/[0.06] hover:border-red-500/10 transition-all group"><Play size={12} fill="currentColor" className="text-red-400 flex-shrink-0"/><span className="text-xs text-zinc-300 group-hover:text-white truncate">{v.t}</span><ExternalLink size={10} className="text-zinc-600 flex-shrink-0 ml-auto"/></a>))}
              </div>
            </div>
          )}

          {p.ref && p.ref!=="#" && (
            <a href={p.ref} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 text-sm font-medium text-white hover:from-violet-500 hover:to-fuchsia-500 transition-all">
              시작하기 <ArrowUpRight size={14}/>
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
  // eslint-disable-next-line no-unused-vars
  const tot=t1.length+t2.length+t3.length;

  return (
    <div className="space-y-4">
      {/* Hero Stats */}
      <div className="pt-4 pb-2">
        <h1 className="text-xl font-bold text-white mb-2">에어드랍 트래커</h1>
        <div className="grid grid-cols-4 gap-2">
          {[{v:P.length,l:"프로젝트",c:"text-white"},{v:"15.5K",l:"TG 메시지",c:"text-violet-300"},{v:"42",l:"레퍼럴",c:"text-emerald-300"},{v:P.filter(p=>p.mentions>0).length,l:"언급 프로젝트",c:"text-amber-300"}].map((s,i)=>(
            <div key={i} className="bg-white/[0.02] border border-white/[0.04] rounded-lg p-2.5 text-center">
              <div className={`text-lg font-bold font-mono ${s.c}`}>{s.v}</div>
              <div className="text-[9px] text-zinc-600">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"/>
        <input type="text" value={q} onChange={e=>setQ(e.target.value)} placeholder="프로젝트, 카테고리, 체인 검색..."
          className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/30 transition-colors"/>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
        <div className="flex items-center gap-0.5 bg-white/[0.03] rounded-lg p-0.5 flex-shrink-0">
          {[{id:"all",l:"All"},{id:"1",l:"T1"},{id:"2",l:"T2"},{id:"3",l:"T3"}].map(t=>(
            <button key={t.id} onClick={()=>setTf(t.id)} className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-all ${tf===t.id?'bg-white/[0.1] text-white':'text-zinc-500'}`}>{t.l}</button>
          ))}
        </div>
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          {cats.map(c=>(<button key={c} onClick={()=>setCf(c)} className={`px-2 py-1 rounded-md text-[10px] font-medium whitespace-nowrap transition-all ${cf===c?'bg-violet-500/20 text-violet-300':'text-zinc-600 hover:text-zinc-400'}`}>{c==="all"?"전체":c}</button>))}
        </div>
      </div>

      {/* CEX Referrals */}
      {tf==="all" && cf==="all" && !q && (
        <div className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-3">
          <div className="text-[9px] uppercase tracking-wider text-zinc-600 mb-2">거래소 가입 (수수료 할인)</div>
          <div className="flex flex-wrap gap-1.5">
            {CEX_REFS.map((c,i)=>(<a key={i} href={c.ref} target="_blank" rel="noopener noreferrer" className="px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.12] transition-all text-[11px] font-medium text-zinc-300 flex items-center gap-1.5">{c.n}<span className="text-[9px] text-zinc-600">{c.mentions}</span></a>))}
          </div>
        </div>
      )}

      {/* T1 */}
      {t1.length>0 && (<div><div className="flex items-center gap-2 mb-2 px-1"><Star size={12} className="text-amber-400"/><span className="text-xs font-semibold text-amber-400/90">Tier 1 — 최우선</span><span className="text-[10px] text-zinc-600 font-mono">{t1.length}</span></div><div className="space-y-1.5">{t1.map(p=><PCard key={p.id} p={p} onClick={()=>setSel(p)}/>)}</div></div>)}

      {/* T2 */}
      {t2.length>0 && (<div><div className="flex items-center gap-2 mb-2 px-1 mt-4"><CircleDot size={12} className="text-violet-400"/><span className="text-xs font-semibold text-violet-400/90">Tier 2 — 주요</span><span className="text-[10px] text-zinc-600 font-mono">{t2.length}</span></div><div className="space-y-1.5">{t2.map(p=><PCard key={p.id} p={p} onClick={()=>setSel(p)}/>)}</div></div>)}

      {/* T3 */}
      {t3.length>0 && (<div><div className="flex items-center gap-2 mb-2 px-1 mt-4"><Hash size={12} className="text-zinc-500"/><span className="text-xs font-semibold text-zinc-500">Tier 3 — 모니터링</span><span className="text-[10px] text-zinc-600 font-mono">{t3.length}</span></div>
        {!show3 && tf!=="3" ? (
          <button onClick={()=>setShow3(true)} className="w-full py-3 rounded-xl border border-dashed border-white/[0.06] text-xs text-zinc-500 hover:text-zinc-300 hover:border-white/[0.12] transition-all">{t3.length}개 더 보기 <ChevronDown size={12} className="inline ml-1"/></button>
        ) : (
          <div className="space-y-1.5">{t3.map((p,i)=><PCard key={p.id||i} p={p} onClick={()=>setSel(p)}/>)}{tf!=="3" && <button onClick={()=>setShow3(false)} className="w-full py-2 text-xs text-zinc-600 hover:text-zinc-400">접기 <ChevronUp size={12} className="inline ml-1"/></button>}</div>
        )}
      </div>)}

      <PModal p={sel} onClose={()=>setSel(null)}/>
    </div>
  );
}

function VibeCodingSection() {
  return (
    <div className="space-y-5 pt-4">
      <div><h1 className="text-xl font-bold text-white mb-1">바이브코딩</h1><p className="text-xs text-zinc-500">AI로 자동매매 봇, 트레이딩 도구 직접 만들기</p></div>

      <div className="bg-white/[0.02] border border-violet-500/10 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3"><Terminal size={16} className="text-violet-400"/><span className="text-sm font-bold text-white">Multi-Perp-DEX 자동매매 봇</span></div>
        <p className="text-xs text-zinc-400 leading-relaxed mb-4">16개 Perp DEX 동시 자동매매. ETH/SOL 페어트레이딩, 15x 레버리지. 유전 알고리즘 시그널 자동 최적화.</p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {[["아키텍처","ABC + Factory Pattern"],["핵심기능","트레일링 스탑 + BBO"],["최적화","유전 알고리즘 12h"],["안전장치","Graceful Restart"]].map(([l,v],i)=>(
            <div key={i} className="bg-white/[0.02] rounded-lg p-2 border border-white/[0.04]"><div className="text-[9px] text-zinc-600">{l}</div><div className="text-[11px] text-zinc-300 mt-0.5">{v}</div></div>
          ))}
        </div>
        <div className="text-[9px] uppercase tracking-wider text-zinc-600 mb-2">지원 거래소 (12+)</div>
        <div className="flex flex-wrap gap-1">{["Hyperliquid","Lighter","Paradex","EdgeX","Backpack","GRVT","Nado","Hotstuff","Bulk","StandX","TreadFi","Pacifica"].map((ex,i)=>(<span key={i} className="px-1.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.05] text-[10px] text-zinc-500 font-mono">{ex}</span>))}</div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3 px-1"><Play size={12} fill="currentColor" className="text-red-400"/><span className="text-xs font-semibold text-zinc-300">바이브코딩 영상</span></div>
        <div className="space-y-1.5">
          {VIBE_VIDS.map((v,i)=>(
            <a key={i} href={v.u} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white/[0.02] border border-white/[0.05] rounded-xl p-3 hover:bg-red-500/[0.04] hover:border-red-500/10 transition-all group">
              <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0"><Play size={14} fill="currentColor" className="text-red-400"/></div>
              <div className="flex-1 min-w-0"><div className="text-sm text-white truncate group-hover:text-red-200 transition-colors">{v.t}</div><div className="text-[10px] text-zinc-600 mt-0.5">{v.v} views</div></div>
              <ExternalLink size={12} className="text-zinc-700 flex-shrink-0"/>
            </a>
          ))}
        </div>
      </div>

      <a href="https://www.youtube.com/@CryptoMage" target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/10 text-sm font-medium text-red-300 hover:from-red-500/20 hover:to-red-600/20 transition-all">
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
    <div className="min-h-screen bg-[#0a0a0f] text-zinc-200">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-30%] left-[-20%] w-[70%] h-[60%] rounded-full bg-violet-900/[0.04] blur-[150px]"/>
        <div className="absolute bottom-[-20%] right-[-15%] w-[50%] h-[40%] rounded-full bg-fuchsia-900/[0.03] blur-[120px]"/>
      </div>
      <Nav sec={sec} setSec={setSec}/>
      <main className="relative max-w-2xl mx-auto px-4 pb-20">
        <AnimatePresence mode="wait">
          {sec==="airdrops" && <motion.div key="a" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.15}}><AirdropsSection/></motion.div>}
          {sec==="vibe" && <motion.div key="v" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.15}}><VibeCodingSection/></motion.div>}
        </AnimatePresence>
      </main>
      <footer className="border-t border-white/[0.04] py-6 mt-8">
        <div className="max-w-2xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <a href="https://www.youtube.com/@CryptoMage" target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-600 hover:text-red-400 transition-colors">YouTube</a>
            <a href="https://blog.naver.com/coinmage" target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-600 hover:text-emerald-400 transition-colors">Blog</a>
            <a href="https://t.me/cryptocurrencymage" target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-600 hover:text-blue-400 transition-colors">Telegram</a>
          </div>
          <span className="text-[10px] text-zinc-700 font-mono">CryptoMage © {new Date().getFullYear()} · 15,546 TG messages analyzed</span>
        </div>
      </footer>
    </div>
  );
}
