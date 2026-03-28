import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Play, TrendingUp, Users, Video, ExternalLink, ChevronDown, Menu, X } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════════ */
/* COLOR & STYLING MAPPINGS */
/* ═══════════════════════════════════════════════════════════════════════════════ */

const CAT_COLORS = {
  "전체": "bg-slate-700",
  "에어드랍": "bg-purple-500",
  "AI 툴": "bg-blue-500",
  "밈코인": "bg-pink-500",
  "얍핑": "bg-amber-500",
  "트레이딩": "bg-orange-500",
  "시장 분석": "bg-emerald-500",
};

const STATUS_COLORS = {
  "진행중": "bg-purple-500/20 text-purple-300 border border-purple-500/40",
  "확인됨": "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40",
  "예상": "bg-amber-500/20 text-amber-300 border border-amber-500/40",
};

const DIFFICULTY_COLORS = {
  "쉬움": "bg-teal-500/20 text-teal-300",
  "보통": "bg-amber-500/20 text-amber-300",
  "어려움": "bg-red-500/20 text-red-300",
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
  {id:504,n:"ZKCODEX",cat:"시장 분석",ch:null,st:null,diff:"쉬움",rw:null,sum:"에어드랍 체커 올인원.",steps:["ZKCODEX","지갑","체크","자격","클레임"],lk:{},tg:["체커","에어드랍"],vids:[]}
];

const CATEGORIES = ["전체","에어드랍","AI 툴","밈코인","얍핑","트레이딩","시장 분석"];
const SORT_OPTIONS = ["최신순","이름","난이도","조회수"];

/* ═════════════════════════════════════════════════════════════════════════════════ */
/* MAIN APP COMPONENT */
/* ═════════════════════════════════════════════════════════════════════════════════ */

export default function App() {
  const [selectedCat, setSelectedCat] = useState("전체");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("최신순");
  const [expanded, setExpanded] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filtered = P.filter(p => {
    const matchCat = selectedCat === "전체" || p.cat === selectedCat;
    const matchSearch = p.n.toLowerCase().includes(searchTerm.toLowerCase()) || p.sum.includes(searchTerm);
    return matchCat && matchSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "이름") return a.n.localeCompare(b.n, 'ko');
    if (sortBy === "난이도") {
      const diff = { "쉬움": 0, "보통": 1, "어려움": 2 };
      return (diff[a.diff] || 0) - (diff[b.diff] || 0);
    }
    if (sortBy === "조회수") {
      const getViews = (v) => parseInt(v?.replace(/[^0-9]/g, '') || 0) * (v?.includes('만') ? 10000 : 1);
      return (getViews(b.vids[0]?.v) || 0) - (getViews(a.vids[0]?.v) || 0);
    }
    return 0;
  });

  const confirmed = sorted.filter(p => p.st === "확인됨");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <HeroSection />
      {confirmed.length > 0 && <ConfirmedSection confirmed={confirmed} />}
      <FilterBar selectedCat={selectedCat} setSelectedCat={setSelectedCat} searchTerm={searchTerm} setSearchTerm={setSearchTerm} sortBy={sortBy} setSortBy={setSortBy} />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {sorted.map((project, i) => (
              <ProjectCard key={project.id} project={project} isExpanded={expanded === project.id} onToggle={() => setExpanded(expanded === project.id ? null : project.id)} index={i} />
            ))}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function Header({ mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <motion.header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50" initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.3 }}>
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">C</div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-white">CryptoMage</h1>
            <p className="text-xs text-slate-400">7,700 구독자</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="https://www.youtube.com/@cryptomage7700" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-red-600/50">
            <span style={{fontSize:18}}>▶</span>YouTube
          </a>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="sm:hidden text-slate-300 hover:text-white">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="sm:hidden border-t border-slate-800/50 bg-slate-900/50">
          <div className="px-4 py-4 flex gap-3">
            <a href="https://www.youtube.com/@cryptomage7700" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all">
              <span style={{fontSize:18}}>▶</span>YouTube
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}

function HeroSection() {
  const stats = [
    { label: "프로젝트", value: 70 },
    { label: "영상", value: 156 },
    { label: "구독자", value: 7700 },
  ];

  return (
    <motion.section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-emerald-600/10 opacity-50" />
      <div className="relative max-w-4xl mx-auto text-center">
        <motion.h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
          에어드랍 & 크립토 가이드
        </motion.h2>
        <motion.p className="text-lg sm:text-xl text-slate-300 mb-12" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
          에어드랍, 자동매매 봇, 밈코인, AI 툴 — 직접 해본 것만 정리합니다.
        </motion.p>
        <motion.div className="grid grid-cols-3 gap-4 sm:gap-8 mb-8" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
          {stats.map((stat, i) => (
            <div key={i} className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-4 sm:p-6 hover:border-slate-600/50 transition-all duration-300">
              <div className="text-2xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400 mb-2">
                <CountUp target={stat.value} />
                {stat.label === "구독자" ? "K+" : "+"}
              </div>
              <p className="text-xs sm:text-sm text-slate-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

function CountUp({ target }) {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    let start = 0;
    const duration = 1.5;
    const increment = target / (duration * 60);
    const interval = setInterval(() => {
      start += increment;
      setCount(Math.floor(start));
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      }
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, [target]);
  return <>{count}</>;
}

function ConfirmedSection({ confirmed }) {
  return (
    <motion.section className="py-12 px-4 sm:px-6 lg:px-8 bg-emerald-600/5 border-y border-emerald-600/20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
      <div className="max-w-7xl mx-auto">
        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
          <div className="w-1 h-8 bg-emerald-500 rounded-full" />확정 에어드랍
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {confirmed.slice(0, 2).map(p => (
            <motion.div key={p.id} className="bg-gradient-to-br from-emerald-600/20 to-emerald-600/5 border border-emerald-600/30 rounded-2xl p-6 hover:border-emerald-500/50 transition-all duration-300 group" whileHover={{ y: -4 }}>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <h4 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2">{p.n}</h4>
                  <p className="text-sm text-slate-400 mt-1">{p.fund}</p>
                </div>
                <span className="px-3 py-1 bg-emerald-500/30 text-emerald-300 text-xs font-bold rounded-lg border border-emerald-500/50">확정</span>
              </div>
              <p className="text-slate-300 text-sm mb-4">{p.sum}</p>
              {p.lk?.o && (
                <a href={p.lk.o} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium text-sm">
                  웹사이트 방문<ExternalLink size={14} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function FilterBar({ selectedCat, setSelectedCat, searchTerm, setSearchTerm, sortBy, setSortBy }) {
  return (
    <motion.div className="sticky top-[72px] z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50 py-4 px-4 sm:px-6 lg:px-8" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-slate-400" size={20} />
          <input type="text" placeholder="프로젝트 검색..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all" />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <div className="flex-1 overflow-x-auto pb-2 sm:pb-0">
            <div className="flex gap-2 min-w-max sm:min-w-0 sm:flex-wrap">
              {CATEGORIES.map(cat => (
                <motion.button key={cat} onClick={() => setSelectedCat(cat)} className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all duration-200 ${selectedCat === cat ? "bg-purple-600 text-white ring-2 ring-purple-400/30" : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/50"}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <div className="flex items-center gap-2">
                    {cat !== "전체" && <div className={`w-2 h-2 rounded-full ${CAT_COLORS[cat]}`} />}
                    {cat}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            {SORT_OPTIONS.map(opt => (
              <button key={opt} onClick={() => setSortBy(opt)} className={`px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${sortBy === opt ? "bg-emerald-600/30 text-emerald-300 border border-emerald-500/50" : "bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:border-slate-600/50"}`}>
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, isExpanded, onToggle, index }) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ delay: index * 0.05 }} className="h-full">
      <motion.div className="h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl overflow-hidden cursor-pointer group hover:border-slate-600/50 transition-all duration-300 flex flex-col" onClick={onToggle} whileHover={{ y: -4, borderColor: "rgba(148, 113, 233, 0.3)" }}>
        <div className="p-5 sm:p-6 border-b border-slate-700/30 group-hover:bg-slate-700/20 transition-colors">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2">{project.n}</h3>
            </div>
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} className="flex-shrink-0 text-slate-400 group-hover:text-slate-300">
              <ChevronDown size={20} />
            </motion.div>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {project.st && <span className={`text-xs px-2 py-1 rounded-lg font-bold ${STATUS_COLORS[project.st] || "bg-slate-700/50 text-slate-300"}`}>{project.st}</span>}
            {project.ch && <span className="text-xs px-2 py-1 bg-slate-700/50 text-slate-300 rounded-lg font-medium">{project.ch}</span>}
            {project.diff && <span className={`text-xs px-2 py-1 rounded-lg font-bold ${DIFFICULTY_COLORS[project.diff]}`}>{project.diff}</span>}
          </div>
          <p className="text-sm text-slate-400 line-clamp-2 group-hover:text-slate-300 transition-colors">{project.sum}</p>
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
              <div className="p-5 sm:p-6 space-y-5 bg-slate-900/50">
                {project.steps && project.steps.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-slate-300 mb-3 flex items-center gap-2">
                      <div className="w-1 h-4 bg-purple-500 rounded-full" />진행 단계
                    </h4>
                    <ol className="space-y-2">
                      {project.steps.map((step, i) => (
                        <li key={i} className="flex gap-3 text-xs sm:text-sm text-slate-400">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-600/30 border border-purple-500/50 flex items-center justify-center text-xs font-bold text-purple-300">
                            {i + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
                {project.vids && project.vids.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-slate-300 mb-3 flex items-center gap-2">
                      <Video size={16} className="text-emerald-400" />관련 영상
                    </h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {project.vids.map((vid, i) => (
                        <div key={i} className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/30 hover:border-slate-600/50 transition-colors">
                          <p className="text-xs sm:text-sm text-slate-300 font-medium line-clamp-2 mb-1">{vid.t}</p>
                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Play size={12} />{vid.v}
                            </span>
                            <span>{vid.a}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {project.tg && project.tg.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.tg.map((tag, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-slate-700/50 text-slate-300 rounded-lg">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                {project.lk?.o && (
                  <a href={project.lk.o} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 border border-purple-500/50 rounded-lg font-medium text-sm transition-all duration-200">
                    공식 웹사이트<ExternalLink size={14} />
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function Footer() {
  return (
    <motion.footer className="mt-16 border-t border-slate-800/50 bg-slate-950/80 backdrop-blur-md py-12 px-4 sm:px-6 lg:px-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
      <div className="max-w-7xl mx-auto text-center space-y-6">
        <div className="flex items-center justify-center gap-2 text-slate-400">
          <p>크립토메이지와 함께 에어드랍 정복하기</p>
        </div>
        <a href="https://www.youtube.com/@cryptomage7700" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-600/50 rounded-lg font-medium transition-all duration-200">
          <span style={{fontSize:18}}>▶</span>YouTube 채널 구독하기
        </a>
        <p className="text-xs text-slate-500 mt-8">© 2026 CryptoMage. 직접 해본 것만 정리합니다.</p>
      </div>
    </motion.footer>
  );
}
