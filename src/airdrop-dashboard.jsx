import { useState, useEffect, useRef } from "react";

const YT = "https://www.youtube.com/@cryptocurrencymage";
const yt = (t) => `https://www.youtube.com/@cryptocurrencymage/search?query=${encodeURIComponent(t)}`;

/* ═══ Palette ═══ */
const GOLD = "#C9A96E";
const GOLD_DIM = "#A08B5A";
const CAT_COLORS = {
  "에어드랍": "#C9A96E",
  "AI 툴": "#6BA3BE",
  "밈코인": "#D4735E",
  "얍핑": "#9B7EC8",
  "트레이딩": "#5EAD8C",
  "시장 분석": "#7E8BA8",
};
const DIFF_STYLE = {
  "쉬움": { bg: "rgba(94,173,140,.12)", color: "#5EAD8C", border: "rgba(94,173,140,.2)" },
  "보통": { bg: "rgba(201,169,110,.12)", color: "#C9A96E", border: "rgba(201,169,110,.2)" },
  "어려움": { bg: "rgba(212,115,94,.12)", color: "#D4735E", border: "rgba(212,115,94,.2)" },
};

/* ═══ All 67 Projects ═══ */
const P=[
  {id:1,n:"GRVT",cat:"에어드랍",ch:"zkSync",st:"진행중",diff:"보통",rw:"중형~대형",fund:"Matrix Partners, Delphi Digital",sum:"하이브리드 탈중앙화 거래소. 예치만으로 연 10% 이자 + 포인트.",steps:["grvt.io 접속 → 회원가입 & KYC","USDC 예치 (연 10% 이자)","현물/선물 거래로 볼륨 쌓기","수수료 최소화 세팅","자동매매 봇으로 극대화"],lk:{o:"https://grvt.io"},tg:["거래소","포인트"],vids:[{t:"초보자도 손해 없이 시작하는 GRVT 올인원 가이드",v:"551회",a:"1개월 전"},{t:"수수료 최소화로 볼륨 쌓는 법",v:"212회",a:"2주 전"},{t:"바이브코딩으로 GRVT 자동매매 봇",v:"365회",a:"2주 전"},{t:"고수익 + 에어드랍 + 보너스까지",v:"432회",a:"7개월 전"},{t:"GRVT 제2의 하이퍼리퀴드",v:"858회",a:"11개월 전"}]},
  {id:2,n:"Nado",cat:"에어드랍",ch:"Ink (Kraken L2)",st:"진행중",diff:"보통",rw:"대형",fund:"Kraken",sum:"크라켄이 만든 온체인 Perp DEX. 통합증거금 시스템.",steps:["nado.xyz 접속 → 지갑 연결","증거금 예치","선물 포지션 오픈","다양한 마켓 활동","자동매매 봇 활용"],lk:{o:"https://www.nado.xyz"},tg:["크라켄","PerpDEX"],vids:[{t:"크라켄이 만든 온체인 퍼프덱스 Nado",v:"324회",a:"8일 전"},{t:"수수료 최소화 자동매매 봇",v:"615회",a:"2주 전"}]},
  {id:3,n:"Backpack",cat:"에어드랍",ch:"Solana",st:"예상",diff:"쉬움",rw:"대형",fund:"Jump Trading",sum:"솔라나 기반 거래소 + 지갑. SuperApp의 시대.",steps:["backpack.exchange 가입","KYC 인증","SOL/USDC 입금","현물+선물 거래","자동매매 봇"],lk:{o:"https://backpack.exchange"},tg:["솔라나","거래소"],vids:[{t:"Backpack 자동매매 봇 가이드",v:"743회",a:"2주 전"},{t:"26년 졸업픽 — SuperApp의 시대",v:"1.3천회",a:"4개월 전"}]},
  {id:4,n:"Silhouette",cat:"에어드랍",ch:"Hyperliquid",st:"진행중",diff:"보통",rw:"중형~대형",fund:"하이퍼리퀴드 생태계",sum:"하이퍼리퀴드 위 프라이빗 Shielded Trading. 극초기.",steps:["silhouette.fi 접속","USDC 브릿지","Shielded 거래","포지션 오픈","초기 활동 기록"],lk:{o:"https://silhouette.fi"},tg:["하이퍼리퀴드","프라이버시"],vids:[{t:"실루엣 Shielded Trading 극초기",v:"311회",a:"3주 전"}]},
  {id:5,n:"Kodiak",cat:"에어드랍",ch:"Berachain",st:"진행중",diff:"보통",rw:"중형~대형",fund:"Amber, Hack VC",sum:"베라체인 핵심 DEX. Perp DEX 인프라.",steps:["kodiak.finance 접속","베라체인 추가","유동성 풀 참여","거래 활동","포인트 프로그램"],lk:{o:"https://kodiak.finance"},tg:["베라체인","유동성"],vids:[{t:"베라체인이 키운 Kodiak",v:"449회",a:"2개월 전"}]},
  {id:6,n:"EVEDEX",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"보통",rw:"중형",fund:"Bitget, Morning Star, Foresight",sum:"유명 VC 투자 하이브리드 Perp DEX.",steps:["evedex.com 접속","USDC 입금","선물 거래","포인트 적립","이벤트 참여"],lk:{o:"https://evedex.com"},tg:["PerpDEX","Bitget"],vids:[{t:"EVEDEX 하이브리드 Perp DEX",v:"298회",a:"2개월 전"}]},
  {id:7,n:"Hylo·Loopscale·OnRe",cat:"에어드랍",ch:"Solana",st:"진행중",diff:"쉬움",rw:"중형 (4중)",fund:"솔라나 DeFi",sum:"솔라나 고정 수익. 7% 이자 + 4중 파밍.",steps:["Phantom 지갑 연결","스테이블코인 예치","고정 수익 상품","4중 에드파밍","복리 재투자"],lk:{o:"https://hylo.finance"},tg:["솔라나","고정수익"],vids:[{t:"7% 이자 + 4중 에드파밍",v:"571회",a:"1개월 전"}]},
  {id:8,n:"Titan",cat:"에어드랍",ch:"Solana",st:"예상",diff:"보통",rw:"중형~대형",fund:"솔라나",sum:"솔라나에서 가장 먼저 해야 할 프로젝트.",steps:["Phantom 지갑 연결","SOL 입금","현물 거래","유동성 풀","거래량 누적"],lk:{o:"https://titan.exchange"},tg:["솔라나","DEX"],vids:[{t:"Solana 가장 먼저 해야 할 프로젝트",v:"699회",a:"3개월 전"}]},
  {id:9,n:"Dexari",cat:"에어드랍",ch:"BNB",st:"예상",diff:"쉬움",rw:"중형~대형",fund:"Binance US",sum:"바이낸스 US 관련 차세대 DEX.",steps:["Dexari 접속","BNB/USDT 입금","거래 활동","유동성 공급","이벤트 참여"],lk:{o:"https://dexari.com"},tg:["바이낸스","DEX"],vids:[{t:"BINANCE US — Dexari",v:"571회",a:"3개월 전"}]},
  {id:10,n:"Polymarket",cat:"에어드랍",ch:"Polygon",st:"확인됨",diff:"보통",rw:"대형",fund:"a16z, Founders Fund $74M+",sum:"탈중앙화 예측 시장. CMO가 에어드랍 공식 확인.",steps:["polymarket.com 접속","USDC 입금","예측 마켓 베팅","주간 활성 거래","다양한 카테고리"],lk:{o:"https://polymarket.com"},tg:["예측시장","확정"],vids:[{t:"VC는 같은 결론에 도달했다",v:"2.1천회",a:"2개월 전"}]},
  {id:11,n:"Minara",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"쉬움",rw:"중형",fund:"Circle",sum:"Circle이 찍은 AI 에이전트.",steps:["공식 사이트 접속","지갑 연결","AI 에이전트 미션","포인트 적립","커뮤니티"],lk:{o:"https://minara.ai"},tg:["AI","Circle"],vids:[{t:"Circle이 찍은 AI 에이전트 Minara",v:"744회",a:"3개월 전"}]},
  {id:12,n:"Tempo",cat:"에어드랍",ch:"Tempo L1",st:"진행중",diff:"쉬움",rw:"중형~대형",fund:"Stripe, Paradigm, Visa, Coupang",sum:"결제 전용 블록체인. 글로벌 대기업 파트너십.",steps:["tempo.xyz 접속","파우셋 토큰","테스트넷 거래","일일 퀘스트","소셜 연동"],lk:{o:"https://tempo.xyz"},tg:["결제","대기업"],vids:[{t:"비자·쿠팡이 붙은 체인 Tempo",v:"739회",a:"2개월 전"},{t:"Tempo 다음은 Arc",v:"415회",a:"1개월 전"}]},
  {id:13,n:"Arc",cat:"에어드랍",ch:"Arc",st:"예상",diff:"보통",rw:"중형",fund:"대기업",sum:"Tempo 다음 주목할 결제 블록체인.",steps:["공식 사이트","얼리 액세스","커뮤니티","테스트넷","포인트"],lk:{o:"https://arc.xyz"},tg:["결제","인프라"],vids:[{t:"대기업이 만드는 결제 블록체인",v:"415회",a:"1개월 전"}]},
  {id:14,n:"Monad",cat:"에어드랍",ch:"Monad (EVM)",st:"예상",diff:"보통",rw:"대형",fund:"Paradigm $225M",sum:"초고속 EVM L1. 10,000 TPS. 대형 에어드랍 예상.",steps:["디스코드 가입","테스트넷 참여","dApp 사용","소셜 활동","퀘스트"],lk:{o:"https://monad.xyz"},tg:["L1","EVM"],vids:[{t:"모나드 에드작 지금이 최적",v:"828회",a:"3개월 전"},{t:"Monad 0티어 올인원",v:"2.6천회",a:"1년 전"}]},
  {id:15,n:"OpenLedger",cat:"에어드랍",ch:"OpenLedger",st:"진행중",diff:"보통",rw:"중형~대형",fund:"다수 VC",sum:"AI판 이더리움. 40개 프로젝트 합류.",steps:["openledger.xyz 접속","지갑 생성","dApp 사용","데이터 기여","노드 운영"],lk:{o:"https://openledger.xyz"},tg:["AI","메인넷"],vids:[{t:"OpenLedger 메인넷 출시!",v:"718회",a:"3개월 전"}]},
  {id:16,n:"Fair Shares",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"쉬움",rw:"소형~중형",fund:"비공개",sum:"무료 에어드랍인데 '주식'을 준다! 1분 딸깍.",steps:["앱 접속","회원가입","1분 딸깍","주식 수령","추가 미션"],lk:{o:"https://fairshares.io"},tg:["주식","무료"],vids:[{t:"무료 에어드랍인데 주식을 준다고?",v:"387회",a:"2일 전"}]},
  {id:17,n:"OpenSea",cat:"에어드랍",ch:"Multi-chain",st:"확인됨",diff:"보통",rw:"대형 (50%)",fund:"$300M+ (a16z)",sum:"SEA 토큰 Q1 2026 TGE. 50% 커뮤니티 에어드랍 확정.",steps:["opensea.io 접속","NFT 거래","OS2 활동","Voyages XP 적립","다양한 체인"],lk:{o:"https://opensea.io"},tg:["NFT","확정"],vids:[]},
  {id:18,n:"MetaMask",cat:"에어드랍",ch:"Multi-chain",st:"예상",diff:"쉬움",rw:"대형",fund:"ConsenSys",sum:"세계 최대 지갑. 토큰 도입 예정.",steps:["MetaMask 설치","Swap 활용","Bridge 사용","Portfolio 연결","다양한 체인"],lk:{o:"https://metamask.io"},tg:["지갑","대형"],vids:[]},
  {id:30,n:"edgeX",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"보통",rw:"대형",fund:"Amber Group",sum:"Amber Group Perp DEX. 얍핑+볼트+포인트 3중.",steps:["edgex.exchange 접속","USDC 입금","거래 활동","Vault 예치","얍핑 활동"],lk:{o:"https://edgex.exchange"},tg:["PerpDEX","Amber"],vids:[{t:"올해 단 하나만 한다면 edgeX",v:"731회",a:"3개월 전"},{t:"edgeX 올인원",v:"993회",a:"8개월 전"},{t:"25년 최고의 perp dex",v:"1.5천회",a:"1년 전"}]},
  {id:33,n:"Variational",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"쉬움",rw:"대형",fund:"적폐급 VC 라인",sum:"0% 수수료 + 손실 환급. VC 라인업 초강력.",steps:["variational.io 접속","지갑 연결","거래 활동","손실 환급","포인트"],lk:{o:"https://variational.io"},tg:["PerpDEX","무수수료"],vids:[{t:"0% 수수료 + 손실 환급까지?",v:"1.8천회",a:"4개월 전"}]},
  {id:34,n:"Glider",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"쉬움",rw:"대형",fund:"a16z, Coinbase, Uniswap",sum:"a16z + Coinbase + Uniswap이 미는 프로젝트.",steps:["glider.fi 접속","지갑 연결","전략 선택","예치","포인트"],lk:{o:"https://glider.fi"},tg:["a16z","DeFi"],vids:[{t:"지금하면 7배 Glider",v:"1.4천회",a:"4개월 전"}]},
  {id:35,n:"Recall",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"보통",rw:"중형~대형",fund:"AI 관련 VC",sum:"AI가 4,493% 수익 따라하는 AI 에이전트.",steps:["recall.ai 접속","AI 에이전트 설정","전략 선택","실행","수익 확인"],lk:{o:"https://recall.ai"},tg:["AI","에이전트"],vids:[{t:"AI가 4,493% 수익 따라하는법",v:"1.4천회",a:"4개월 전"}]},
  {id:36,n:"Reya",cat:"에어드랍",ch:"Ethereum",st:"진행중",diff:"보통",rw:"중형~대형",fund:"Coinbase Ventures, 윈터뮤트",sum:"이더리움의 나스닥. 대형 VC 지원.",steps:["reya.network 접속","USDC 입금","거래 활동","유동성 공급","포인트"],lk:{o:"https://reya.network"},tg:["이더리움","PerpDEX"],vids:[{t:"Reya 이더리움의 나스닥",v:"717회",a:"4개월 전"}]},
  {id:37,n:"StandX",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"보통",rw:"중형",fund:"Binance 커넥션",sum:"담보가 돈 버는 PerpDEX.",steps:["standx.io 접속","담보 예치","거래 활동","수익 확인","포인트"],lk:{o:"https://standx.io"},tg:["바이낸스","PerpDEX"],vids:[{t:"StandX 담보가 돈 버는 PerpDEX",v:"780회",a:"4개월 전"}]},
  {id:38,n:"lit.trade",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"보통",rw:"중형~대형",fund:"다수 VC",sum:"최대 15% 혜택 제공.",steps:["lit.trade 접속","지갑 연결","거래 활동","보상 확인","추가 혜택"],lk:{o:"https://lit.trade"},tg:["PerpDEX","혜택"],vids:[{t:"lit.trade 15% 최대 혜택",v:"998회",a:"4개월 전"}]},
  {id:39,n:"Liquid Perps",cat:"에어드랍",ch:"Hyperliquid L1",st:"진행중",diff:"보통",rw:"중형~대형",fund:"Paradigm",sum:"Hyperliquid L1 × Paradigm × 모바일.",steps:["앱 설치","USDC 입금","모바일 거래","포인트","유동성"],lk:{o:"https://liquidperps.xyz"},tg:["하이퍼리퀴드","모바일"],vids:[{t:"Liquid Perps 올인원",v:"1.3천회",a:"5개월 전"}]},
  {id:40,n:"Theo",cat:"에어드랍",ch:"HyperEVM",st:"진행중",diff:"쉬움",rw:"중형",fund:"TradFi + DeFi",sum:"국채 기반 에어드랍. TradFi와 DeFi 융합.",steps:["theo.finance 접속","USDC 입금","thBILL 민팅","HyperEVM 동시파밍","얍핑"],lk:{o:"https://theo.finance"},tg:["RWA","국채"],vids:[{t:"국채 기반 에어드랍 Theo",v:"773회",a:"6개월 전"}]},
  {id:42,n:"Stork Oracle",cat:"에어드랍",ch:"Sui",st:"진행중",diff:"쉬움",rw:"중형",fund:"윈터뮤트, OKX",sum:"1티어 무료 에드작. Sui 기반 DePIN.",steps:["stork.network 접속","가입","데이터 제공","포인트","미션"],lk:{o:"https://stork.network"},tg:["Sui","DePIN"],vids:[{t:"Stork Oracle 1티어 무료",v:"600회",a:"10개월 전"}]},
  {id:43,n:"Felix",cat:"에어드랍",ch:"HyperEVM",st:"진행중",diff:"보통",rw:"중형~대형",fund:"HyperEVM",sum:"HyperEVM 첫 스테이블코인. feUSD.",steps:["felix.finance 접속","USDC 브릿지","feUSD 민팅","유동성","포인트"],lk:{o:"https://felix.finance"},tg:["하이퍼리퀴드","스테이블"],vids:[{t:"HyperEVM 첫 스테이블 Felix",v:"835회",a:"10개월 전"}]},
  {id:44,n:"Mitosis",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"보통",rw:"중형",fund:"다수 VC",sum:"DeFi 혁명. 자산 묶임 해방 + 얍핑.",steps:["mitosis.org 접속","자산 예치","유동성 해제","얍핑","온체인"],lk:{o:"https://mitosis.org"},tg:["DeFi","유동성"],vids:[{t:"Mitosis DeFi 혁명",v:"337회",a:"7개월 전"}]},
  {id:45,n:"Nexus",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"쉬움",rw:"중형",fund:"다수 VC",sum:"웹 마이닝 자동화. 무료.",steps:["nexus.xyz 접속","마이닝 시작","자동화","일일 확인","포인트"],lk:{o:"https://nexus.xyz"},tg:["마이닝","무료"],vids:[{t:"Nexus 웹 마이닝 자동화",v:"1.4천회",a:"1년 전"}]},
  {id:47,n:"Walrus",cat:"에어드랍",ch:"Sui",st:"진행중",diff:"보통",rw:"중형~대형",fund:"Sui Foundation",sum:"Sui 공식 탈중앙화 스토리지.",steps:["walrus.xyz 접속","Sui 지갑 연결","스토리지 사용","업로드","포인트"],lk:{o:"https://walrus.xyz"},tg:["Sui","스토리지"],vids:[{t:"Walrus 에어드랍 가이드",v:"686회",a:"1년 전"}]},
  {id:48,n:"PIN AI",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"쉬움",rw:"중형",fund:"A16z, Sam Altman",sum:"A16z + 샘 알트만. 텔레그램.",steps:["텔레그램 봇","가입","일일 미션","AI","포인트"],lk:{o:"https://pinai.io"},tg:["AI","텔레그램"],vids:[{t:"PIN AI A16z 텔레그램",v:"580회",a:"1년 전"}]},
  {id:51,n:"Kite AI",cat:"에어드랍",ch:"Avalanche",st:"진행중",diff:"쉬움",rw:"중형",fund:"삼성넥스트, 해시드",sum:"아발란체 무료 테넷작.",steps:["kiteai.xyz 접속","지갑 연결","테스트넷","AI 미션","포인트"],lk:{o:"https://kiteai.xyz"},tg:["AI","아발란체"],vids:[{t:"Kite AI 아발란체 무료",v:"714회",a:"1년 전"}]},
  {id:52,n:"LayerEdge",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"쉬움",rw:"중형",fund:"다수 VC",sum:"무료 테스트넷. 난이도 최하.",steps:["layeredge.xyz","가입","테스트넷","미션","포인트"],lk:{o:"https://layeredge.xyz"},tg:["테스트넷","무료"],vids:[{t:"LayerEdge 무료 테스트넷",v:"1.1천회",a:"1년 전"}]},
  {id:53,n:"Credible",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"쉬움",rw:"중형",fund:"Circle",sum:"최소 10달러 예치. DeFi 혁신.",steps:["credible.finance","10달러 예치","수익 확인","포인트","추가 예치"],lk:{o:"https://credible.finance"},tg:["DeFi","소액"],vids:[{t:"최소 10달러 DeFi 혁신",v:"803회",a:"1년 전"}]},
  {id:54,n:"Avantis",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"보통",rw:"중형",fund:"판테라",sum:"실물 자산까지. 최대 500배.",steps:["avantis.finance","USDC 입금","거래","다양한 자산","포인트"],lk:{o:"https://avantis.finance"},tg:["PerpDEX","RWA"],vids:[{t:"최대 500배 PerpDEX Avantis",v:"319회",a:"8개월 전"}]},
  {id:55,n:"Rails",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"보통",rw:"중형",fund:"Kraken",sum:"Kraken 투자. 주간 $75K 상금풀.",steps:["rails.xyz","지갑 연결","거래","드립 캠페인","상금"],lk:{o:"https://rails.xyz"},tg:["PerpDEX","Kraken"],vids:[{t:"Kraken 투자 Rails.xyz",v:"473회",a:"8개월 전"}]},
  {id:56,n:"Tread.Fi",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"보통",rw:"중형~대형",fund:"다수 VC",sum:"Perp DEX 전쟁의 끝.",steps:["tread.fi","지갑 연결","거래","유동성","포인트"],lk:{o:"https://tread.fi"},tg:["PerpDEX","허브"],vids:[{t:"Tread.Fi Perp DEX 전쟁의 끝",v:"884회",a:"3개월 전"}]},
  {id:57,n:"MemeMax",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"쉬움",rw:"대형 (30억)",fund:"다수 VC",sum:"Perp 15억 + 트위터 15억 보상.",steps:["mememax.xyz","거래","트위터 글쓰기","포인트","보상"],lk:{o:"https://mememax.xyz"},tg:["밈코인","PerpDEX"],vids:[{t:"Perp 보상 15억 MemeMax",v:"895회",a:"3개월 전"}]},
  {id:58,n:"Bluewhale",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"보통",rw:"중형",fund:"다수 VC",sum:"AI 혁명 2막. 데이터를 자산으로.",steps:["bluewhale.ai","데이터 제공","AI 에이전트","포인트","커뮤니티"],lk:{o:"https://bluewhale.ai"},tg:["AI","데이터"],vids:[{t:"Bluewhale 데이터를 자산으로",v:"348회",a:"3개월 전"}]},
  {id:59,n:"Bullpen",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"쉬움",rw:"중형 (4중)",fund:"다수 VC",sum:"4중 파밍. Unit+hype+PerpDEX+밈코인.",steps:["bullpen.xyz","지갑 연결","4중 파밍","거래","포인트"],lk:{o:"https://bullpen.xyz"},tg:["PerpDEX","4중파밍"],vids:[{t:"Bullpen 4중 에드작",v:"928회",a:"4개월 전"}]},
  {id:60,n:"Extended",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"보통",rw:"중형~대형",fund:"다수 VC",sum:"5천만원 수익 퍼프덱스 메타 다음 타자.",steps:["extended.exchange","USDC 입금","거래","포인트","볼륨"],lk:{o:"https://extended.exchange"},tg:["PerpDEX","메타"],vids:[{t:"5천만원 수익 Extended",v:"1.2천회",a:"5개월 전"}]},
  {id:61,n:"Basedapp",cat:"에어드랍",ch:"Base",st:"진행중",diff:"보통",rw:"대형",fund:"Base",sum:"수퍼앱 시대. Base + 비자카드.",steps:["basedapp.com","가입","Base 활동","비자카드","수퍼앱"],lk:{o:"https://basedapp.com"},tg:["Base","수퍼앱"],vids:[{t:"Base 대형 에드작",v:"1.2천회",a:"3개월 전"},{t:"BasedApp 3중파밍",v:"961회",a:"6개월 전"}]},
  {id:62,n:"Malda",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"보통",rw:"중형",fund:"RISC Zero, Linea",sum:"ZK 통합 대출. 극초기.",steps:["malda.finance","지갑 연결","대출/예치","포인트","ZK"],lk:{o:"https://malda.finance"},tg:["ZK","DeFi"],vids:[{t:"Malda ZK 통합 대출 극초기",v:"317회",a:"9개월 전"}]},
  {id:63,n:"PrismaX",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"쉬움",rw:"중형",fund:"a16z",sum:"AI + 로봇 + 블록체인. 무료.",steps:["prismafx.ai","가입","무료 미션","AI","포인트"],lk:{o:"https://prismafx.ai"},tg:["AI","로봇"],vids:[{t:"PrismaX 무료 a16z",v:"680회",a:"7개월 전"}]},
  {id:64,n:"Rootstock",cat:"에어드랍",ch:"Bitcoin",st:"진행중",diff:"보통",rw:"중형",fund:"비트코인",sum:"비트코인 위 진짜 DeFi.",steps:["rootstock.io","BTC 브릿지","DeFi","이벤트","포인트"],lk:{o:"https://rootstock.io"},tg:["비트코인","DeFi"],vids:[{t:"Rootstock 비트코인 디파이",v:"338회",a:"7개월 전"}]},
  {id:66,n:"Skate",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"쉬움",rw:"중형",fund:"다수 VC",sum:"Kaito 스피드런 얍핑 + 앱 실사용.",steps:["skatechain.org","Kaito 연동","얍핑","앱 사용","포인트"],lk:{o:"https://skatechain.org"},tg:["얍핑","크로스체인"],vids:[{t:"Skate x Kaito 스피드런",v:"288회",a:"8개월 전"}]},
  {id:67,n:"UniversalX",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"보통",rw:"중형",fund:"1티어",sum:"1티어 에드작. 고빈도 자동매매.",steps:["universalx.io","지갑 연결","자동매매","거래","포인트"],lk:{o:"https://universalx.io"},tg:["DEX","자동매매"],vids:[{t:"UniversalX 고빈도 자동매매",v:"782회",a:"11개월 전"}]},
  {id:68,n:"Etheral",cat:"에어드랍",ch:"Ethereum",st:"진행중",diff:"보통",rw:"대형",fund:"ENA",sum:"ENA 1순위 예치작. 2천=2천.",steps:["etheral.finance","ETH/USDC 예치","수익","포인트","복리"],lk:{o:"https://etheral.finance"},tg:["이더리움","예치"],vids:[{t:"ENA 1순위 예치작 Etheral",v:"1.4천회",a:"1년 전"}]},
  {id:69,n:"SuperForm",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"쉬움",rw:"중형",fund:"반에크",sum:"스테이블 예치 20% 이자.",steps:["superform.xyz","스테이블코인 예치","20% 이자","에어드랍","복리"],lk:{o:"https://superform.xyz"},tg:["예치","파밍"],vids:[{t:"SuperForm 스테이블 20%",v:"478회",a:"1년 전"}]},
  {id:70,n:"Talus",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"쉬움",rw:"중형",fund:"Polychain",sum:"폴리체인 무료. AI Agent.",steps:["talus.network","가입","AI Agent","포인트","커뮤니티"],lk:{o:"https://talus.network"},tg:["AI","폴리체인"],vids:[{t:"Talus 폴리체인 AI agent",v:"603회",a:"1년 전"}]},
  {id:71,n:"Gradient",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"쉬움",rw:"중형",fund:"세콰이어",sum:"넥스트 Grass. 세콰이어.",steps:["gradient.network","확장 프로그램","자동 실행","포인트","일일 확인"],lk:{o:"https://gradient.network"},tg:["DePIN","무료"],vids:[{t:"Gradient 세콰이어 넥스트 Grass",v:"514회",a:"1년 전"}]},
  {id:72,n:"Gata",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"쉬움",rw:"중형",fund:"다수 VC",sum:"ChatGPT 쓰면 포인트. 무료.",steps:["gata.io","가입","ChatGPT","포인트","미션"],lk:{o:"https://gata.io"},tg:["AI","무료"],vids:[{t:"Gata 무료 에어드랍",v:"673회",a:"8개월 전"}]},
  {id:73,n:"Tomo",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"쉬움",rw:"중형",fund:"다수 VC",sum:"소셜 로그인 + 밈코인 분석.",steps:["tomo.inc","소셜 로그인","밈코인 분석","거래","에어드랍"],lk:{o:"https://tomo.inc"},tg:["지갑","밈코인"],vids:[{t:"Tomo 에어드랍",v:"380회",a:"8개월 전"}]},
  {id:74,n:"Doma",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"쉬움",rw:"중형",fund:"Paradigm",sum:"도메인으로 에어드랍.",steps:["doma.xyz","도메인 구매","등록","포인트","D3"],lk:{o:"https://doma.xyz"},tg:["도메인","패러다임"],vids:[{t:"도메인 에어드랍 Doma + D3",v:"253회",a:"9개월 전"}]},
  {id:100,n:"ComfyUI",cat:"AI 툴",ch:null,st:null,diff:"보통",rw:null,sum:"2026 최신판. 설치~첫 이미지.",steps:["ComfyUI 설치","워크플로우","모델 다운로드","프롬프트","이미지 생성"],lk:{o:"https://comfy.org"},tg:["ComfyUI","입문"],vids:[{t:"ComfyUI 완벽 입문 2026",v:"2.3천회",a:"2주 전"}]},
  {id:101,n:"ControlNet",cat:"AI 툴",ch:null,st:null,diff:"어려움",rw:null,sum:"정밀 이미지 제어.",steps:["ComfyUI 세팅","ControlNet 모델","노드 연결","프리프로세서","미세 조정"],lk:{o:"https://comfy.org"},tg:["ControlNet","고급"],vids:[{t:"ComfyUI 필수 ControlNet",v:"554회",a:"2주 전"}]},
  {id:102,n:"SD 입문",cat:"AI 툴",ch:null,st:null,diff:"쉬움",rw:null,sum:"Stable Diffusion 완전 입문.",steps:["Python & Git","WebUI","모델","프롬프트","txt2img"],lk:{},tg:["SD","입문"],vids:[{t:"스테이블 디퓨전 초보자 가이드",v:"1.4천회",a:"3주 전"}]},
  {id:103,n:"SD LoRA",cat:"AI 툴",ch:null,st:null,diff:"어려움",rw:null,sum:"얼굴 고정~캐릭터 복제.",steps:["학습 데이터","환경","파라미터","학습","LoRA 적용"],lk:{},tg:["LoRA","캐릭터"],vids:[{t:"SD LoRA 완전정복",v:"338회",a:"3주 전"}]},
  {id:104,n:"AI 영상",cat:"AI 툴",ch:null,st:null,diff:"보통",rw:null,sum:"그림 하나 → AI 영상.",steps:["SD 이미지","Grok AI","업로드","모션","영상"],lk:{},tg:["영상","Grok"],vids:[{t:"그림 하나로 AI 영상",v:"246회",a:"3주 전"}]},
  {id:105,n:"Claude",cat:"AI 툴",ch:null,st:null,diff:"쉬움",rw:null,sum:"코딩 없이 자동 시그널 리포트.",steps:["Claude AI","프롬프트","데이터","리포트","활용"],lk:{o:"https://claude.ai"},tg:["Claude","자동화"],vids:[{t:"Claude 자동 시그널 리포트",v:"2.8천회",a:"3주 전"}]},
  {id:106,n:"OpenClaw",cat:"AI 툴",ch:null,st:null,diff:"보통",rw:null,sum:"텔레그램 AI 비서 구축.",steps:["OpenClaw 설치","봇 토큰","AI 모델","커스터마이징","테스트"],lk:{},tg:["텔레그램봇","AI비서"],vids:[{t:"텔레그램 AI 비서",v:"7.8천회",a:"2주 전"}]},
  {id:107,n:"Cursor",cat:"AI 툴",ch:null,st:null,diff:"쉬움",rw:null,sum:"코딩 0 → 배포까지.",steps:["Cursor","AI 코드","GitHub","Vercel","확인"],lk:{o:"https://cursor.com"},tg:["Cursor","바이브코딩"],vids:[{t:"Cursor DCA 시뮬레이터",v:"44회",a:"5시간 전"}]},
  {id:108,n:"Surf",cat:"AI 툴",ch:null,st:null,diff:"보통",rw:null,sum:"에어드랍 파머 AI 코파일럿.",steps:["Surf","브라우저","자동화","AI","효율화"],lk:{},tg:["AI코파일럿","자동화"],vids:[{t:"Surf 에어드랍 파머 필수",v:"1.4천회",a:"6개월 전"}]},
  {id:109,n:"Alva",cat:"AI 툴",ch:null,st:null,diff:"쉬움",rw:null,sum:"코인러 전용 ChatGPT.",steps:["alva.xyz","가입","크레딧","분석","전략"],lk:{},tg:["AI","분석"],vids:[{t:"Alva 코인러 ChatGPT",v:"285회",a:"1년 전"}]},
  {id:200,n:"밈코인 올인원",cat:"밈코인",ch:null,st:null,diff:"보통",rw:null,sum:"4363% 수익 인증. 슈퍼사이클.",steps:["기초","트렌드","지갑","타이밍","리스크"],lk:{},tg:["밈코인","가이드"],vids:[{t:"4363% 밈코인 올인원 (50분)",v:"1.9만회",a:"1년 전"},{t:"밈코인 슈퍼사이클",v:"2.4천회",a:"1년 전"},{t:"밈코인 필수 Tool",v:"4.3천회",a:"1년 전"}]},
  {id:201,n:"GMGN",cat:"밈코인",ch:null,st:null,diff:"보통",rw:null,sum:"GMGN.AI 스마트머니 카피.",steps:["gmgn.ai","추적","카피","매매","수익"],lk:{o:"https://gmgn.ai"},tg:["밈코인","스마트머니"],vids:[{t:"GMGN.AI 스마트머니",v:"7.8천회",a:"1년 전"}]},
  {id:202,n:"카피트레이딩",cat:"밈코인",ch:null,st:null,diff:"보통",rw:null,sum:"2만원→41억. 자동 카피.",steps:["플랫폼","지갑","자동 카피","리스크","수익"],lk:{},tg:["카피트레이딩","스마트머니"],vids:[{t:"2만원→41억 카피트레이딩",v:"1.9만회",a:"1년 전"},{t:"스마트머니 지갑추천",v:"3.6천회",a:"1년 전"},{t:"4000% 카피트레이딩 심화",v:"3천회",a:"1년 전"}]},
  {id:203,n:"밈코인 봉크봇",cat:"밈코인",ch:null,st:null,diff:"보통",rw:null,sum:"6087% 봉크봇 실전매매.",steps:["봉크봇","지갑","세팅","실전","수익"],lk:{},tg:["봉크봇","실전"],vids:[{t:"6087% 봉크봇 실전매매",v:"3.9천회",a:"1년 전"}]},
  {id:300,n:"Breakout",cat:"트레이딩",ch:null,st:null,diff:"보통",rw:null,sum:"2.7억 지원 프랍.",steps:["breakout.trade","테스트","합격","트레이딩","분배"],lk:{o:"https://breakout.trade"},tg:["프랍","트레이딩"],vids:[{t:"2.7억 Breakout 프랍",v:"6.7천회",a:"11개월 전"},{t:"프랍 혜택 총정리",v:"1.5천회",a:"9개월 전"}]},
  {id:301,n:"PropW",cat:"트레이딩",ch:null,st:null,diff:"보통",rw:null,sum:"100달러→1만불.",steps:["propw.com","쿠폰","테스트","합격","운용"],lk:{o:"https://propw.com"},tg:["프랍","저자본"],vids:[{t:"100달러 1만불 PropW",v:"1.3천회",a:"11개월 전"},{t:"2억9천 시드 트레이더",v:"1.2천회",a:"11개월 전"}]},
  {id:302,n:"Nansen",cat:"트레이딩",ch:null,st:null,diff:"보통",rw:null,sum:"고래 추적 + 알파 시그널.",steps:["nansen.ai","지갑 추적","시그널","분석","전략"],lk:{o:"https://nansen.ai"},tg:["분석","고래"],vids:[{t:"Nansen 고래 추적 실전",v:"746회",a:"9개월 전"}]},
  {id:303,n:"Strata·Pendle",cat:"트레이딩",ch:"Solana",st:null,diff:"보통",rw:null,sum:"Pendle YT 3종 파밍.",steps:["Strata","Pendle YT","예치","3종 파밍","수익"],lk:{},tg:["DeFi","파밍"],vids:[{t:"3종 수익 극대화",v:"524회",a:"6개월 전"}]},
  {id:400,n:"얍핑 입문",cat:"얍핑",ch:null,st:null,diff:"쉬움",rw:null,sum:"초보 가능. 트윗으로 돈.",steps:["Kaito","Virtual","트위터","글 작성","포인트"],lk:{},tg:["Kaito","Virtual"],vids:[{t:"초보 얍핑 입문",v:"5.6천회",a:"8개월 전"},{t:"0원으로 350만원",v:"1.6천회",a:"8개월 전"}]},
  {id:401,n:"얍핑 심화",cat:"얍핑",ch:null,st:null,diff:"보통",rw:null,sum:"트윗 하나 = 60만원.",steps:["인플루언스","멀티 프로젝트","점수 최적화","보상 극대화","3콤보"],lk:{},tg:["얍핑","수익"],vids:[{t:"트윗 하나로 60만원",v:"1.5천회",a:"8개월 전"},{t:"3콤보 전략",v:"694회",a:"8개월 전"}]},
  {id:500,n:"BTC 시그널",cat:"시장 분석",ch:null,st:null,diff:"쉬움",rw:null,sum:"비트코인 94K. AI 시그널.",steps:["시장 데이터","AI 시그널","매크로","온체인","전략"],lk:{},tg:["비트코인","시그널"],vids:[{t:"AI가 설명하는 비트코인",v:"426회",a:"2개월 전"}]},
  {id:501,n:"에어드랍 올인원",cat:"시장 분석",ch:null,st:null,diff:"쉬움",rw:null,sum:"하루 10분 → 월 300.",steps:["선정","루틴","10분","포인트","수익"],lk:{},tg:["에어드랍","입문"],vids:[{t:"하루 10분 월 300",v:"5천회",a:"7개월 전"},{t:"다음 100배",v:"1.4천회",a:"4개월 전"},{t:"목표 10억",v:"1.9천회",a:"4개월 전"}]},
  {id:502,n:"DePIN 11종",cat:"시장 분석",ch:null,st:null,diff:"쉬움",rw:null,sum:"5천만원 수익 DePIN 11종.",steps:["DePIN 이해","11종","설치","자동화","수익"],lk:{},tg:["DePIN","올인원"],vids:[{t:"DePIN 11종",v:"1.9천회",a:"1년 전"}]},
  {id:503,n:"NordVPN",cat:"시장 분석",ch:null,st:null,diff:"쉬움",rw:null,sum:"코인 투자자 필수 VPN.",steps:["가입","설치","Kill Switch","서버","보안"],lk:{},tg:["보안","VPN"],vids:[{t:"NordVPN 필수인 이유",v:"394회",a:"9개월 전"}]},
  {id:504,n:"ZKCODEX",cat:"시장 분석",ch:null,st:null,diff:"쉬움",rw:null,sum:"에어드랍 체커 올인원.",steps:["ZKCODEX","지갑","체크","자격","클레임"],lk:{},tg:["체커","툴"],vids:[{t:"ZKCODEX 에어드랍 체커",v:"1천회",a:"1년 전"}]},
  {id:505,n:"코인 밋업",cat:"시장 분석",ch:null,st:null,diff:"쉬움",rw:null,sum:"밋업 알파 파머 전략.",steps:["밋업 정보","리서치","참여","네트워킹","알파"],lk:{},tg:["밋업","네트워킹"],vids:[{t:"코인 밋업 알파 파머",v:"376회",a:"7개월 전"}]},
  {id:506,n:"메타마스크 가이드",cat:"시장 분석",ch:null,st:null,diff:"쉬움",rw:null,sum:"메타마스크 완전 입문.",steps:["크롬 확장","지갑","시드","네트워크","토큰"],lk:{o:"https://metamask.io"},tg:["지갑","입문"],vids:[{t:"메타마스크 설치 사용법",v:"240회",a:"1년 전"}]},
  {id:507,n:"업비트→바이낸스",cat:"시장 분석",ch:null,st:null,diff:"쉬움",rw:null,sum:"업비트→바이낸스 전송.",steps:["업비트 출금","바이낸스 주소","네트워크","전송","확인"],lk:{},tg:["거래소","입문"],vids:[{t:"업비트→바이낸스 전송법",v:"371회",a:"1년 전"}]},
  {id:508,n:"Atok",cat:"시장 분석",ch:null,st:null,diff:"쉬움",rw:null,sum:"걷기+미션 = Web3 리워드앱.",steps:["Atok 앱","가입","광고","걷기","미션"],lk:{},tg:["리워드","무료"],vids:[{t:"Web3 리워드앱 Atok",v:"621회",a:"8개월 전"}]},
];

const CATS = ["전체","에어드랍","AI 툴","밈코인","얍핑","트레이딩","시장 분석"];

/* ═══ Time parser ═══ */
const parseAge = a => { if (!a) return 9999; const n = parseFloat(a); if (a.includes("시간")) return n / 24; if (a.includes("일")) return n; if (a.includes("주")) return n * 7; if (a.includes("개월")) return n * 30; if (a.includes("년")) return n * 365; return 9999; };
const newest = p => { if (!p.vids?.length) return 9999; return Math.min(...p.vids.map(v => parseAge(v.a))); };

export default function App() {
  const [cat, setCat] = useState("전체");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(null);
  const [sort, setSort] = useState("default");
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const list = P
    .filter(p => cat === "전체" || p.cat === cat)
    .filter(p => !q || p.n.toLowerCase().includes(q.toLowerCase()) || p.sum.includes(q) || p.tg.some(t => t.includes(q)))
    .sort((a, b) => {
      if (sort === "name") return a.n.localeCompare(b.n);
      if (sort === "diff") return ["쉬움","보통","어려움"].indexOf(a.diff) - ["쉬움","보통","어려움"].indexOf(b.diff);
      if (sort === "views") { const g = p => { const v = p.vids?.[0]?.v || "0"; return v.includes("천") ? parseFloat(v) * 1000 : v.includes("만") ? parseFloat(v) * 10000 : parseFloat(v); }; return g(b) - g(a); }
      return newest(a) - newest(b);
    });
  const isAir = p => p.cat === "에어드랍";
  const tv = P.reduce((s, p) => s + (p.vids?.length || 0), 0);
  const confirmed = P.filter(p => p.st === "확인됨");

  const Badge = ({st}) => {
    if (st === "확인됨") return <span style={{fontSize:9,padding:"3px 10px",borderRadius:4,background:`linear-gradient(135deg,${GOLD},#DFC07A)`,color:"#1A1714",fontWeight:700,fontFamily:"'Sora'",letterSpacing:".02em",boxShadow:`0 2px 8px ${GOLD}40`}}>CONFIRMED</span>;
    if (st === "예상") return <span style={{fontSize:9,padding:"3px 10px",borderRadius:4,border:"1px solid rgba(201,169,110,.3)",color:GOLD_DIM,fontWeight:600,fontFamily:"'Sora'"}}>EXPECTED</span>;
    if (st === "진행중") return <span style={{fontSize:9,padding:"3px 10px",borderRadius:4,background:"rgba(255,255,255,.04)",color:"#5A554D",fontWeight:500,fontFamily:"'Sora'"}}>ACTIVE</span>;
    return null;
  };

  return (
    <div style={{minHeight:"100vh",background:"#0C0B09",color:"#A09888",fontFamily:"'Sora','Noto Sans KR',sans-serif"}}>
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700;9..144,800;9..144,900&family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body{background:#0C0B09}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#0C0B09}::-webkit-scrollbar-thumb{background:#1F1D19;border-radius:2px}
::selection{background:rgba(201,169,110,.2);color:#F0E8D8}
@keyframes fadeUp{0%{opacity:0;transform:translateY(18px)}100%{opacity:1;transform:translateY(0)}}
@keyframes slideDown{0%{opacity:0;max-height:0;padding-top:0}100%{opacity:1;max-height:4000px;padding-top:20px}}
@keyframes glow{0%,100%{opacity:.3}50%{opacity:.6}}
@keyframes grain{0%{transform:translate(0,0)}10%{transform:translate(-5%,-10%)}20%{transform:translate(-15%,5%)}30%{transform:translate(7%,-25%)}40%{transform:translate(-5%,25%)}50%{transform:translate(-15%,10%)}60%{transform:translate(15%,0%)}70%{transform:translate(0%,15%)}80%{transform:translate(3%,35%)}90%{transform:translate(-10%,10%)}100%{transform:translate(0,0)}}
.c{transition:all .28s cubic-bezier(.4,0,.2,1);position:relative}
.c:hover{transform:translateY(-3px);border-color:rgba(201,169,110,.15)!important;box-shadow:0 12px 40px rgba(0,0,0,.4),0 0 0 1px rgba(201,169,110,.06)}
.c:hover .c-glow{opacity:.08!important}
.tab{position:relative;transition:color .2s;cursor:pointer;border:none;background:transparent;padding:10px 2px;font-family:'Sora','Noto Sans KR';font-size:12.5px;font-weight:500;color:#3D3830;letter-spacing:-.01em}
.tab:hover{color:#8A7F72}
.tab.on{color:${GOLD};font-weight:600}
.tab.on::after{content:'';position:absolute;bottom:0;left:0;right:0;height:1.5px;background:linear-gradient(90deg,${GOLD},transparent);border-radius:1px}
.sb{transition:all .15s;cursor:pointer;border:none;background:transparent;font-family:'Sora';font-size:10px;padding:5px 12px;border-radius:4px;color:#3D3830;letter-spacing:.02em}
.sb:hover{color:#8A7F72}.sb.on{background:rgba(201,169,110,.08);color:${GOLD};font-weight:600}
.vl{transition:all .15s;text-decoration:none;display:block;border-radius:6px;margin-bottom:2px}
.vl:hover{background:rgba(201,169,110,.03)!important}
.confirmed-card{position:relative;overflow:hidden;cursor:pointer;transition:all .3s cubic-bezier(.4,0,.2,1)}
.confirmed-card:hover{transform:translateY(-4px);box-shadow:0 16px 48px rgba(201,169,110,.15)}
.cta{transition:all .2s;text-decoration:none;display:inline-flex;align-items:center;gap:6px}
.cta:hover{opacity:.85}
      `}</style>

      {/* ═══ Film Grain Overlay ═══ */}
      <div style={{position:"fixed",inset:0,zIndex:999,pointerEvents:"none",opacity:.035,mixBlendMode:"overlay"}}>
        <svg width="100%" height="100%"><filter id="gr"><feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#gr)"/></svg>
      </div>

      {/* ═══ Ambient Glow Orbs ═══ */}
      <div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",overflow:"hidden"}}>
        <div style={{position:"absolute",width:"45vw",height:"45vw",maxWidth:600,maxHeight:600,left:"-12%",top:"-8%",borderRadius:"50%",background:`radial-gradient(circle,${GOLD}08 0%,transparent 60%)`,animation:"glow 8s ease-in-out infinite"}}/>
        <div style={{position:"absolute",width:"35vw",height:"35vw",maxWidth:450,maxHeight:450,right:"-8%",bottom:"5%",borderRadius:"50%",background:"radial-gradient(circle,rgba(107,163,190,.05) 0%,transparent 60%)",animation:"glow 10s ease-in-out 3s infinite"}}/>
        <div style={{position:"absolute",width:"25vw",height:"25vw",maxWidth:350,maxHeight:350,left:"40%",bottom:"-5%",borderRadius:"50%",background:"radial-gradient(circle,rgba(155,126,200,.04) 0%,transparent 60%)",animation:"glow 12s ease-in-out 5s infinite"}}/>
      </div>

      <div style={{position:"relative",zIndex:1}}>

        {/* ═══ Header ═══ */}
        <header style={{borderBottom:"1px solid rgba(255,255,255,.03)"}}>
          <div style={{maxWidth:1120,margin:"0 auto",padding:"16px 36px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <div style={{width:34,height:34,borderRadius:8,background:`linear-gradient(135deg,${GOLD},#DFC07A)`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 4px 16px ${GOLD}25`}}>
                <span style={{fontFamily:"'Fraunces',serif",fontSize:17,fontWeight:800,color:"#0C0B09"}}>C</span>
              </div>
              <div>
                <div style={{fontSize:14,fontWeight:700,letterSpacing:"-.02em",color:"#E8E0D0"}}>CryptoMage</div>
                <div style={{fontSize:9,color:"#3D3830",fontWeight:500,letterSpacing:".04em",textTransform:"uppercase"}}>7.42K subscribers</div>
              </div>
            </div>
            <a href={YT} target="_blank" rel="noopener noreferrer" style={{padding:"7px 20px",borderRadius:6,background:"rgba(201,169,110,.06)",border:`1px solid rgba(201,169,110,.12)`,color:GOLD_DIM,fontSize:12,fontWeight:500,textDecoration:"none",transition:"all .2s"}} onMouseOver={e => {e.target.style.background="rgba(201,169,110,.1)";e.target.style.color=GOLD}} onMouseOut={e => {e.target.style.background="rgba(201,169,110,.06)";e.target.style.color=GOLD_DIM}}>YouTube ↗</a>
          </div>
        </header>

        {/* ═══ Hero ═══ */}
        <section style={{maxWidth:1120,margin:"0 auto",padding:"72px 36px 56px"}}>
          <div style={{animation:mounted?"fadeUp .7s ease both":"none"}}>
            <p style={{fontFamily:"'Sora'",fontSize:11,fontWeight:600,color:GOLD,letterSpacing:".12em",textTransform:"uppercase",marginBottom:20}}>Dashboard 2026</p>
            <h1 style={{fontFamily:"'Fraunces',serif",fontSize:"clamp(34px,5.5vw,58px)",fontWeight:800,lineHeight:1.05,letterSpacing:"-.035em",color:"#F0E8D8",marginBottom:16}}>
              에어드랍 & 크립토<br/><span style={{background:`linear-gradient(135deg,${GOLD},#E8C97A)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>가이드 대시보드</span>
            </h1>
            <p style={{fontSize:14.5,lineHeight:1.8,color:"#5A554D",maxWidth:460,fontFamily:"'Sora','Noto Sans KR'"}}>놓치면 후회할 프로젝트부터 밈코인, 얍핑, 프랍 트레이딩, AI 코딩 가이드까지 한 곳에서.</p>
          </div>
          <div style={{display:"flex",gap:0,marginTop:48,animation:mounted?"fadeUp .7s ease .15s both":"none",borderRadius:12,overflow:"hidden",border:"1px solid rgba(255,255,255,.04)",background:"rgba(255,255,255,.015)"}}>
            {[{v:P.length,l:"총 콘텐츠",c:GOLD},{v:P.filter(isAir).length,l:"에어드랍",c:GOLD},{v:tv,l:"관련 영상",c:"#6BA3BE"},{v:6,l:"카테고리",c:"#9B7EC8"}].map((s,i)=>(
              <div key={i} style={{flex:1,padding:"24px 28px",borderRight:i<3?"1px solid rgba(255,255,255,.03)":"none"}}>
                <div style={{fontFamily:"'Fraunces',serif",fontSize:34,fontWeight:800,letterSpacing:"-.02em",color:s.c,lineHeight:1}}>{s.v}</div>
                <div style={{fontSize:10,color:"#3D3830",marginTop:6,fontWeight:500,letterSpacing:".04em",textTransform:"uppercase"}}>{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ Spotlight: Confirmed ═══ */}
        {cat === "전체" && !q && confirmed.length > 0 && (
          <section style={{maxWidth:1120,margin:"0 auto",padding:"0 36px 48px",animation:mounted?"fadeUp .7s ease .25s both":"none"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:GOLD,boxShadow:`0 0 12px ${GOLD}60`}}/>
              <span style={{fontFamily:"'Sora'",fontSize:11,fontWeight:600,color:GOLD,letterSpacing:".1em",textTransform:"uppercase"}}>Confirmed</span>
              <div style={{flex:1,height:1,background:`linear-gradient(90deg,rgba(201,169,110,.15),transparent)`}}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:`repeat(${Math.min(confirmed.length,3)},1fr)`,gap:16}}>
              {confirmed.map(p => {const hv = p.vids?.length > 0;
                return (
                  <div key={p.id} className="confirmed-card" onClick={() => setOpen(open === p.id ? null : p.id)}
                    style={{borderRadius:14,background:"linear-gradient(145deg,#1A1714 0%,#15130F 100%)",border:`1px solid rgba(201,169,110,.12)`,overflow:"hidden"}}>
                    <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at top left,${GOLD}08,transparent 60%)`,pointerEvents:"none"}}/>
                    <div style={{position:"relative",padding:"26px 24px 22px"}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18}}>
                        <Badge st="확인됨"/>
                        {hv && <span style={{fontSize:10,color:"#5A554D"}}>{p.vids.length}편</span>}
                      </div>
                      <h3 style={{fontFamily:"'Fraunces',serif",fontSize:26,fontWeight:800,lineHeight:1.08,color:"#F0E8D8",marginBottom:8}}>{p.n}</h3>
                      <p style={{fontSize:12.5,color:"#6B6358",lineHeight:1.65,marginBottom:16,fontFamily:"'Sora','Noto Sans KR'"}}>{p.sum}</p>
                      <div style={{display:"flex",gap:6}}>
                        {p.rw && <span style={{fontSize:10,padding:"4px 12px",borderRadius:4,background:"rgba(201,169,110,.06)",border:"1px solid rgba(201,169,110,.1)",color:GOLD_DIM,fontWeight:500}}>{p.rw}</span>}
                        <span style={{fontSize:10,padding:"4px 12px",borderRadius:4,background:"rgba(255,255,255,.03)",color:"#5A554D",fontWeight:500}}>{p.ch}</span>
                      </div>
                    </div>
                    {open === p.id && (
                      <div onClick={e => e.stopPropagation()} style={{animation:"slideDown .3s ease both",borderTop:"1px solid rgba(201,169,110,.08)",padding:"0 24px 22px"}}>
                        {p.fund && <div style={{marginBottom:14}}><div style={{fontSize:9,fontWeight:600,letterSpacing:".08em",color:"#3D3830",marginBottom:5,textTransform:"uppercase"}}>Investors</div><div style={{fontSize:13,color:"#8A7F72",fontFamily:"'Sora','Noto Sans KR'"}}>{p.fund}</div></div>}
                        <div style={{marginBottom:14}}><div style={{fontSize:9,fontWeight:600,letterSpacing:".08em",color:"#3D3830",marginBottom:8,textTransform:"uppercase"}}>Steps</div>
                          {p.steps.map((s,i) => <div key={i} style={{fontSize:12.5,padding:"5px 0",color:"#6B6358",fontFamily:"'Sora','Noto Sans KR'"}}><span style={{color:`${GOLD}50`,marginRight:10,fontWeight:600,fontSize:10}}>{String(i+1).padStart(2,"0")}</span>{s}</div>)}</div>
                        {hv && <div><div style={{fontSize:9,fontWeight:600,letterSpacing:".08em",color:"#3D3830",marginBottom:8,textTransform:"uppercase"}}>Videos</div>
                          {p.vids.map((v,i) => <a key={i} href={yt(v.t)} target="_blank" rel="noopener noreferrer" className="vl" style={{display:"block",padding:"8px 0",borderTop:i?"1px solid rgba(255,255,255,.03)":"none",textDecoration:"none",color:"#8A7F72",fontSize:12}}>{v.t} <span style={{color:"#3D3830",fontSize:10}}>· {v.v}</span></a>)}</div>}
                        <div style={{display:"flex",gap:8,marginTop:14}}>
                          {p.lk?.o && <a href={p.lk.o} target="_blank" rel="noopener noreferrer" className="cta" style={{padding:"8px 20px",borderRadius:6,background:`linear-gradient(135deg,${GOLD},#DFC07A)`,color:"#0C0B09",fontSize:12,fontWeight:700}}>사이트 열기 ↗</a>}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ═══ Controls ═══ */}
        <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(12,11,9,.88)",backdropFilter:"saturate(200%) blur(16px)",borderBottom:"1px solid rgba(255,255,255,.03)",borderTop:"1px solid rgba(255,255,255,.02)"}}>
          <div style={{maxWidth:1120,margin:"0 auto",padding:"0 36px",display:"flex",alignItems:"center",gap:12}}>
            <div style={{display:"flex",gap:18,flex:1,overflowX:"auto"}}>
              {CATS.map(c => {
                const cnt = c === "전체" ? P.length : P.filter(p => p.cat === c).length;
                const sel = cat === c;
                const cc = c === "전체" ? GOLD : CAT_COLORS[c];
                return (
                  <button key={c} className={`tab${sel?" on":""}`} onClick={() => setCat(c)} style={sel ? {color: cc} : {}}>
                    {sel && <span style={{display:"inline-block",width:5,height:5,borderRadius:"50%",background:cc,marginRight:6,boxShadow:`0 0 6px ${cc}40`}}/>}
                    {c}
                    <span style={{fontSize:9,marginLeft:4,opacity:.4}}>{cnt}</span>
                  </button>
                );
              })}
            </div>
            <div style={{position:"relative"}}>
              <svg style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",opacity:.3}} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#A09888" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input placeholder="검색..." value={q} onChange={e => setQ(e.target.value)} style={{padding:"7px 12px 7px 30px",background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.04)",borderRadius:6,color:"#A09888",fontSize:12,width:160,fontFamily:"'Sora','Noto Sans KR'",outline:"none",transition:"border .2s"}} onFocus={e => e.target.style.borderColor=`${GOLD}30`} onBlur={e => e.target.style.borderColor="rgba(255,255,255,.04)"}/>
            </div>
            <div style={{display:"flex",gap:2}}>
              {[["default","최신순"],["name","이름"],["diff","난이도"],["views","조회"]].map(([k,l]) => (
                <button key={k} className={`sb${sort===k?" on":""}`} onClick={() => setSort(k)}>{l}</button>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ Grid ═══ */}
        <div style={{maxWidth:1120,margin:"0 auto",padding:"28px 36px 100px"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))",gap:10}}>
            {list.filter(p => !(cat === "전체" && !q && p.st === "확인됨")).map((p, idx) => {
              const isO = open === p.id;
              const hv = p.vids?.length > 0;
              const air = isAir(p);
              const cc = CAT_COLORS[p.cat] || GOLD;
              const ds = DIFF_STYLE[p.diff] || DIFF_STYLE["보통"];
              return (
                <div key={p.id} className="c" onClick={() => setOpen(isO ? null : p.id)}
                  style={{borderRadius:12,border:"1px solid rgba(255,255,255,.04)",background:"rgba(255,255,255,.015)",cursor:"pointer",overflow:"hidden",animation:mounted?`fadeUp .4s ease ${Math.min(idx*.02,.55)}s both`:"none",...(isO?{gridColumn:"1/-1",background:"rgba(255,255,255,.02)",borderColor:"rgba(201,169,110,.1)"}:{})}}>
                  {/* Category glow on hover */}
                  <div className="c-glow" style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at top left,${cc}20,transparent 55%)`,opacity:0,transition:"opacity .3s",pointerEvents:"none"}}/>
                  <div style={{display:"flex",position:"relative"}}>
                    <div style={{width:3,background:`linear-gradient(180deg,${cc},transparent)`,opacity:isO?1:.25,transition:"opacity .3s"}}/>
                    <div style={{flex:1,padding:"18px 22px"}}>
                      <div style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:12}}>
                        {/* Logo */}
                        <div style={{width:40,height:40,borderRadius:10,flexShrink:0,background:`${cc}0A`,border:`1px solid ${cc}15`,display:"flex",alignItems:"center",justifyContent:"center",transition:"all .3s",...(isO?{background:`${cc}12`,borderColor:`${cc}25`,boxShadow:`0 4px 16px ${cc}15`}:{})}}>
                          <span style={{fontFamily:"'Fraunces',serif",fontSize:18,fontWeight:700,color:cc}}>{p.n?.charAt(0)}</span>
                        </div>
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{display:"flex",alignItems:"center",gap:7,flexWrap:"wrap"}}>
                            <h3 style={{fontSize:14.5,fontWeight:700,color:"#E8E0D0",letterSpacing:"-.015em"}}>{p.n}</h3>
                            <Badge st={p.st}/>
                            {hv && <span style={{fontSize:9,color:"#3D3830",fontFamily:"'Sora'"}}>{p.vids.length}편</span>}
                          </div>
                          <div style={{fontSize:10,color:"#3D3830",marginTop:3,fontWeight:400}}>{[p.ch,p.cat].filter(Boolean).join(" · ")}</div>
                        </div>
                        <svg style={{width:14,height:14,color:"#3D3830",transition:"all .25s cubic-bezier(.4,0,.2,1)",transform:isO?"rotate(180deg)":"",flexShrink:0,marginTop:4}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
                      </div>
                      <div style={{display:"flex",gap:6,marginBottom:10}}>
                        <span style={{fontSize:10,padding:"3px 10px",borderRadius:4,background:ds.bg,color:ds.color,border:`1px solid ${ds.border}`,fontWeight:600,fontFamily:"'Sora'"}}>{p.diff}</span>
                        {p.rw && <span style={{fontSize:10,padding:"3px 10px",borderRadius:4,background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.04)",color:"#5A554D",fontWeight:500}}>{p.rw}</span>}
                      </div>
                      <p style={{fontSize:13,lineHeight:1.65,color:"#6B6358",fontFamily:"'Sora','Noto Sans KR'"}}>{p.sum}</p>

                      {/* ═══ Expanded ═══ */}
                      {isO && (
                        <div onClick={e => e.stopPropagation()} style={{animation:"slideDown .3s ease both",borderTop:"1px solid rgba(255,255,255,.04)",marginTop:18}}>
                          {hv && (
                            <div style={{marginBottom:20}}>
                              <div style={{fontSize:9,fontWeight:600,color:"#3D3830",letterSpacing:".08em",marginBottom:10,textTransform:"uppercase"}}>Videos</div>
                              {p.vids.map((v, i) => (
                                <a key={i} href={yt(v.t)} target="_blank" rel="noopener noreferrer" className="vl" style={{padding:"12px 14px",border:"1px solid rgba(255,255,255,.03)",marginBottom:4}}>
                                  <div style={{display:"flex",alignItems:"center",gap:12}}>
                                    <div style={{width:34,height:34,borderRadius:8,background:`${cc}08`,border:`1px solid ${cc}12`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                                      <svg width="10" height="10" viewBox="0 0 24 24" fill={cc}><path d="M8 5v14l11-7z"/></svg>
                                    </div>
                                    <div style={{flex:1,minWidth:0}}>
                                      <div style={{fontSize:12.5,color:"#A09888",fontWeight:500,fontFamily:"'Sora','Noto Sans KR'",marginBottom:2}}>{v.t}</div>
                                      <div style={{fontSize:10,color:"#3D3830"}}>{v.v} · {v.a}</div>
                                    </div>
                                    <span style={{color:"#3D3830",fontSize:13,transition:"color .15s"}}>↗</span>
                                  </div>
                                </a>
                              ))}
                            </div>
                          )}
                          {air && p.fund && (
                            <div style={{padding:16,borderRadius:8,background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.04)",marginBottom:16}}>
                              <div style={{fontSize:9,fontWeight:600,color:"#3D3830",letterSpacing:".08em",marginBottom:5,textTransform:"uppercase"}}>Investors</div>
                              <div style={{fontSize:13,color:"#8A7F72",fontFamily:"'Sora','Noto Sans KR'"}}>{p.fund}</div>
                            </div>
                          )}
                          <div style={{marginBottom:16}}>
                            <div style={{fontSize:9,fontWeight:600,color:"#3D3830",letterSpacing:".08em",marginBottom:10,textTransform:"uppercase"}}>Steps</div>
                            {p.steps.map((s, i) => (
                              <div key={i} style={{display:"flex",gap:12,padding:"6px 10px",borderRadius:4,transition:"background .15s"}} onMouseOver={e=>e.currentTarget.style.background="rgba(255,255,255,.015)"} onMouseOut={e=>e.currentTarget.style.background="transparent"}>
                                <span style={{fontSize:10,fontWeight:700,color:`${cc}45`,fontFamily:"'Sora'",width:18,textAlign:"right",flexShrink:0,lineHeight:"20px"}}>{String(i + 1).padStart(2, "0")}</span>
                                <span style={{fontSize:12.5,color:"#6B6358",fontFamily:"'Sora','Noto Sans KR'",lineHeight:"20px"}}>{s}</span>
                              </div>
                            ))}
                          </div>
                          <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:16}}>
                            {p.tg.map(t => <span key={t} style={{fontSize:10,padding:"3px 10px",borderRadius:4,background:"rgba(255,255,255,.02)",border:"1px solid rgba(255,255,255,.04)",color:"#5A554D",fontFamily:"'Sora'"}}>#{t}</span>)}
                          </div>
                          <div style={{display:"flex",gap:8}}>
                            {p.lk?.o && <a href={p.lk.o} target="_blank" rel="noopener noreferrer" className="cta" style={{padding:"9px 22px",borderRadius:6,background:`linear-gradient(135deg,${GOLD},#DFC07A)`,color:"#0C0B09",fontSize:12,fontWeight:700}}>사이트 열기 ↗</a>}
                            {hv && <a href={YT+"/videos"} target="_blank" rel="noopener noreferrer" className="cta" style={{padding:"9px 22px",borderRadius:6,border:"1px solid rgba(255,255,255,.06)",color:"#6B6358",fontSize:12,fontWeight:500}}>채널 ↗</a>}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {!list.length && <div style={{textAlign:"center",padding:"100px 20px",color:"#2A2520",fontFamily:"'Sora'",fontSize:14}}>검색 결과가 없습니다</div>}
        </div>

        {/* ═══ Footer ═══ */}
        <footer style={{borderTop:"1px solid rgba(255,255,255,.03)",padding:"28px 36px"}}>
          <div style={{maxWidth:1120,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:5,height:5,borderRadius:"50%",background:GOLD,opacity:.3}}/>
              <span style={{fontSize:10,color:"#2A2520"}}>CryptoMage · 정보 제공 목적이며 투자 조언이 아닙니다 · DYOR</span>
            </div>
            <span style={{fontSize:10,color:"#1A1714"}}>© 2026</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
