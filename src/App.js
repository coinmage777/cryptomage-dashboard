import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight, Play, Zap, Shield, TrendingUp, Layers, Brain, MessageCircle, BarChart3, Sparkles, ArrowUpRight, Clock, DollarSign, Users, Target, X, Menu } from 'lucide-react';

/* ══════════════════════════════════════════════════════════════════════ */
/*  ENRICHED PROJECT DATA — Obsidian Vault + Dashboard merge            */
/*  TGE completed removed: Monad, Backpack(BP), OpenSea, Paradex       */
/* ══════════════════════════════════════════════════════════════════════ */

const P = [
  // ──── TIER 1 에어드랍 ────
  {id:1,n:"GRVT",cat:"에어드랍",ch:"zkSync",st:"진행중",diff:"보통",rw:"중형~대형",tier:1,fund:"$47.2M · Matrix, Delphi Digital",dist:"28% 커뮤니티 (S1:10%, S2:18%)",tge:"Q3 2026",desc:"ZKsync Validium L2 기반 하이브리드 탈중앙화 거래소. CEX급 UX에 예치만으로 연 10% 이자 + 포인트 파밍. S2 배분이 18%로 넉넉해서 기대치 높음.",strat:"거래량 축적 + 포인트 파밍. 봇 자동화 가능.",sum:"하이브리드 탈중앙화 거래소. 예치만으로 연 10% 이자 + 포인트.",steps:["grvt.io 접속 → 회원가입 & KYC","USDC 예치 (연 10% 이자)","현물/선물 거래로 볼륨 쌓기","수수료 최소화 세팅","자동매매 봇으로 극대화"],lk:{o:"https://grvt.io"},tg:["거래소","포인트"],vids:[{t:"초보자도 손해 없이 시작하는 GRVT 올인원 가이드",v:"551회",a:"1개월 전"},{t:"수수료 최소화로 볼륨 쌓는 법",v:"212회",a:"2주 전"},{t:"바이브코딩으로 GRVT 자동매매 봇",v:"365회",a:"2주 전"},{t:"고수익 + 에어드랍 + 보너스까지",v:"432회",a:"7개월 전"},{t:"GRVT 제2의 하이퍼리퀴드",v:"858회",a:"11개월 전"}]},
  {id:2,n:"Nado",cat:"에어드랍",ch:"Ink (Kraken L2)",st:"진행중",diff:"보통",rw:"대형",tier:1,fund:"Kraken 인큐베이팅",dist:"$INK 에어드랍 확정",tge:"2026 Jul–Sep",desc:"Kraken이 만든 Ink L2 기반 Perp DEX. 크로스마진 네이티브, 통합증거금 시스템. Nado 사용자가 $INK 배분 최다 수혜 예상. S1 완료, S2 파밍 중. 24/7 봇 운영 중.",strat:"USDC/USDT/kBTC/WETH로 Perp 거래. NLP 예치. kBTC 홀딩 중 거래 시 보너스.",sum:"크라켄이 만든 온체인 Perp DEX. 통합증거금 시스템.",steps:["nado.xyz 접속 → 지갑 연결","증거금 예치","선물 포지션 오픈","다양한 마켓 활동","자동매매 봇 활용"],lk:{o:"https://www.nado.xyz"},tg:["크라켄","PerpDEX"],vids:[{t:"크라켄이 만든 온체인 퍼프덱스 Nado",v:"324회",a:"8일 전"},{t:"수수료 최소화 자동매매 봇",v:"615회",a:"2주 전"}]},
  {id:33,n:"Variational",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"쉬움",rw:"대형",tier:1,fund:"$11.8M · Bain Capital, Coinbase Ventures, Peak XV",dist:"50% 커뮤니티 할당 (역대 최고)",tge:"미정",desc:"500+ 페어 Perp DEX. 커뮤니티 배분 50%는 역대 최고 수준. 0% 수수료 + 손실 환급 정책으로 초보자도 부담 없이 시작 가능.",strat:"Perp 거래 + 레퍼럴 활동. 무수수료라 자본 효율 최상.",sum:"0% 수수료 + 손실 환급. VC 라인업 초강력.",steps:["variational.io 접속","지갑 연결","거래 활동","손실 환급","포인트"],lk:{o:"https://variational.io"},tg:["PerpDEX","무수수료"],vids:[{t:"0% 수수료 + 손실 환급까지?",v:"1.8천회",a:"4개월 전"}]},
  {id:60,n:"Extended",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"보통",rw:"중형~대형",tier:1,fund:"$6.5M",dist:"30% 에어드랍 확정",tge:"Q2 2026",desc:"주식/원자재(금, 은, SPX) 포함 다양한 자산 Perp 거래 가능. XVS 예치로 추가 수익. 30% 확정 배분으로 확실한 기회.",strat:"Perp 거래 (주식/원자재 포함). XVS 예치.",sum:"5천만원 수익 퍼프덱스 메타 다음 타자.",steps:["extended.exchange 접속","USDC 입금","거래","포인트","볼륨"],lk:{o:"https://extended.exchange"},tg:["PerpDEX","메타"],vids:[{t:"5천만원 수익 Extended",v:"1.2천회",a:"5개월 전"}]},
  {id:34,n:"Glider",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"쉬움",rw:"대형",tier:1,fund:"a16z, Coinbase, Uniswap",dist:"미정",tge:"미정",desc:"AI 기반 DeFi 수익 최적화 프로토콜. 자동 리밸런싱. a16z + Coinbase + Uniswap 삼중 백업. 쉬운 난이도 대비 대형 보상 기대.",strat:"예치 + 포인트 적립. AI가 자동 최적화.",sum:"a16z + Coinbase + Uniswap이 미는 프로젝트.",steps:["glider.fi 접속","지갑 연결","전략 선택","예치","포인트"],lk:{o:"https://glider.fi"},tg:["a16z","DeFi"],vids:[{t:"지금하면 7배 Glider",v:"1.4천회",a:"4개월 전"}]},
  {id:10,n:"Polymarket",cat:"에어드랍",ch:"Polygon",st:"확인됨",diff:"보통",rw:"대형",tier:1,fund:"$74M+ · a16z, Founders Fund",dist:"33.3% 커뮤니티",tge:"미정",desc:"세계 최대 탈중앙화 예측 시장. CMO가 에어드랍 공식 확인. $74M 1차 에어드랍 이미 실행. 추가 시즌 진행 중.",strat:"예측 마켓 베팅. 주간 활성 거래 유지.",sum:"탈중앙화 예측 시장. CMO가 에어드랍 공식 확인.",steps:["polymarket.com 접속","USDC 입금","예측 마켓 베팅","주간 활성 거래","다양한 카테고리"],lk:{o:"https://polymarket.com"},tg:["예측시장","확정"],vids:[{t:"VC는 같은 결론에 도달했다",v:"2.1천회",a:"2개월 전"}]},
  {id:145,n:"Base",cat:"에어드랍",ch:"Base (Coinbase L2)",st:"예상",diff:"보통",rw:"대형",tier:1,fund:"Coinbase 인큐베이팅 ($500M+)",dist:"20-25% 커뮤니티 가능",tge:"Q2–Q4 2026",desc:"Coinbase L2. Jesse Pollak이 네트워크 토큰 탐색 중 공식 확인. JPMorgan 추정 $12-34B 시가총액. 에어드랍 규모 $2.4-8.5B 가능성. OP Stack 기반.",strat:"Base 생태계 활동 (Basedapp, Avantis 등). 브릿지 + DEX 사용.",sum:"Coinbase L2. 토큰 탐색 공식 확인.",steps:["Base 생태계 dApp 사용","브릿지 활동","DEX 거래","NFT 활동","다양한 온체인 활동"],lk:{o:"https://base.org"},tg:["Coinbase","L2"],vids:[]},
  {id:61,n:"Basedapp",cat:"에어드랍",ch:"Base",st:"진행중",diff:"보통",rw:"대형",tier:1,fund:"Base 에코시스템",dist:"미정",tge:"미정",desc:"Base 네이티브 올인원 DeFi 앱. 3중 파밍 구조 + 비자카드 연동. Coinbase 백업이라 대형 보상 기대.",strat:"Base 에코 활동 + 포인트 적립. 3중 파밍 구조.",sum:"수퍼앱 시대. Base + 비자카드.",steps:["basedapp.com 가입","Base 활동","비자카드","수퍼앱","포인트"],lk:{o:"https://basedapp.com"},tg:["Base","수퍼앱"],vids:[{t:"Base 대형 에드작",v:"1.2천회",a:"3개월 전"},{t:"BasedApp 3중파밍",v:"961회",a:"6개월 전"}]},

  // ──── TIER 2 에어드랍 ────
  {id:30,n:"edgeX",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"보통",rw:"대형",tier:2,fund:"Amber Group",dist:"25% Genesis + 5% Pre-TGE",tge:"2026.03.31",desc:"StarkEx 기반 Perp DEX. 월간 ATH $167B 거래량 (시장 점유 14%). XP 가중치: 거래량 60% (스팟 3x 가산), 손실 보상 10%, TVL 기여 10%. TGE 임박.",strat:"거래량 파밍. TGE 임박이라 마지막 스퍼트.",sum:"Amber Group Perp DEX. 얍핑+볼트+포인트 3중.",steps:["edgex.exchange 접속","USDC 입금","거래 활동","Vault 예치","얍핑 활동"],lk:{o:"https://edgex.exchange"},tg:["PerpDEX","Amber"],vids:[{t:"올해 단 하나만 한다면 edgeX",v:"731회",a:"3개월 전"},{t:"edgeX 올인원",v:"993회",a:"8개월 전"},{t:"25년 최고의 perp dex",v:"1.5천회",a:"1년 전"}]},
  {id:4,n:"Silhouette",cat:"에어드랍",ch:"Hyperliquid",st:"진행중",diff:"보통",rw:"중형~대형",tier:2,fund:"$3M · Hyperliquid 생태계",dist:"미정",tge:"미정",desc:"HyperEVM 기반 Shielded Trading (프라이버시 거래). 극초기 단계라 선점 기회. HyperBeat 포인트 적립 중.",strat:"USDC 브릿지 → Shielded 거래. 초기 활동 기록 중요.",sum:"하이퍼리퀴드 위 프라이빗 Shielded Trading. 극초기.",steps:["silhouette.fi 접속","USDC 브릿지","Shielded 거래","포지션 오픈","초기 활동 기록"],lk:{o:"https://silhouette.fi"},tg:["하이퍼리퀴드","프라이버시"],vids:[{t:"실루엣 Shielded Trading 극초기",v:"311회",a:"3주 전"}]},
  {id:36,n:"Reya",cat:"에어드랍",ch:"Ethereum",st:"진행중",diff:"보통",rw:"중형~대형",tier:2,fund:"$19M · Framework, Coinbase Ventures",dist:"45% 커뮤니티 할당",tge:"미정",desc:"이더리움 기반 Perp DEX. 자체 L2 모듈러 체인 운영. 45% 커뮤니티 할당은 매우 높은 수준. Wintermute 참여.",strat:"Perp 거래 + 레퍼럴.",sum:"이더리움의 나스닥. 대형 VC 지원.",steps:["reya.network 접속","USDC 입금","거래 활동","유동성 공급","포인트"],lk:{o:"https://reya.network"},tg:["이더리움","PerpDEX"],vids:[{t:"Reya 이더리움의 나스닥",v:"717회",a:"4개월 전"}]},
  {id:68,n:"Ethereal",cat:"에어드랍",ch:"Ethereum",st:"진행중",diff:"보통",rw:"대형",tier:2,fund:"Ethena 에코시스템",dist:"15% ENA 홀더 거버넌스",tge:"미정",desc:"Ethena 생태계 Perp DEX. USDe 마진 사용. Season Zero 활성. ENA 홀더에게 15% 거버넌스 토큰 배분. 30x Ethena 리워드.",strat:"USDe 예치 + Perp 거래. ENA 스테이킹 병행.",sum:"ENA 1순위 예치작. USDe 마진.",steps:["ethereal.trade 접속","USDe/ETH 예치","Perp 거래","포인트","복리"],lk:{o:"https://ethereal.trade"},tg:["이더리움","Ethena"],vids:[{t:"ENA 1순위 예치작 Etheral",v:"1.4천회",a:"1년 전"}]},
  {id:146,n:"MegaETH",cat:"에어드랍",ch:"MegaETH L2",st:"예상",diff:"보통",rw:"중형~대형",tier:2,fund:"$107M · Vitalik Buterin, Dragonfly",dist:"5%+ (Fluffle NFT 홀더 보장)",tge:"Polymarket 67% 확률 2026.06.30 이전",desc:"초고속 L2. 35,000 TPS. Vitalik 직접 투자. 메인넷 2026.02.09 라이브. 공식적으로 프로모셔널 에어드랍 없다고 했지만 KPI 기반 스테이킹 모델 운영.",strat:"Pre-Deposit Bridge + 테스트넷 활동 + MegaETH dApp 사용.",sum:"Vitalik 투자 초고속 L2. 35,000 TPS.",steps:["MegaETH Bridge","테스트넷 활동","dApp 사용","Fluffle NFT","생태계 참여"],lk:{o:"https://megaeth.systems"},tg:["L2","Vitalik"],vids:[]},
  {id:5,n:"Kodiak",cat:"에어드랍",ch:"Berachain",st:"진행중",diff:"보통",rw:"중형~대형",tier:2,fund:"Amber, Hack VC",dist:"미정",tge:"미정",desc:"베라체인 핵심 DEX. PoL(Proof of Liquidity) 네이티브. KDK/xKDK 토큰 페어링 구조.",strat:"유동성 풀 참여 + 거래 활동.",sum:"베라체인 핵심 DEX. Perp DEX 인프라.",steps:["kodiak.finance 접속","베라체인 추가","유동성 풀 참여","거래 활동","포인트 프로그램"],lk:{o:"https://kodiak.finance"},tg:["베라체인","유동성"],vids:[{t:"베라체인이 키운 Kodiak",v:"449회",a:"2개월 전"}]},
  {id:6,n:"EVEDEX",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"보통",rw:"중형",tier:2,fund:"Bitget, Morning Star, Foresight",dist:"미정",tge:"미정",desc:"유명 VC 투자 하이브리드 Perp DEX. Bitget 백업으로 안정성 확보.",strat:"선물 거래 + 포인트 적립.",sum:"유명 VC 투자 하이브리드 Perp DEX.",steps:["evedex.com 접속","USDC 입금","선물 거래","포인트 적립","이벤트 참여"],lk:{o:"https://evedex.com"},tg:["PerpDEX","Bitget"],vids:[{t:"EVEDEX 하이브리드 Perp DEX",v:"298회",a:"2개월 전"}]},
  {id:147,n:"Aztec",cat:"에어드랍",ch:"Aztec L2",st:"진행중",diff:"보통",rw:"대형",tier:2,fund:"$119.1M · a16z, Paradigm",dist:"미정",tge:"미정",desc:"프라이버시 L2. zk-rollup 기반. a16z + Paradigm 투자. 테스트넷 활성 중. $500+ 예상 가치.",strat:"테스트넷 참여 + 프라이버시 트랜잭션.",sum:"프라이버시 L2. a16z + Paradigm $119M 투자.",steps:["Aztec 테스트넷 접속","지갑 연결","프라이버시 트랜잭션","활동 누적","커뮤니티"],lk:{o:"https://aztec.network"},tg:["프라이버시","L2"],vids:[]},
  {id:148,n:"Zama",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"보통",rw:"대형",tier:2,fund:"$57M Series B · Pantera",dist:"미정",tge:"미정",desc:"FHE(완전동형암호화) 프라이버시 인프라. 유니콘 밸류에이션. Pantera 리드. 테스트넷 활성 중.",strat:"테스트넷 참여 + FHE 트랜잭션.",sum:"FHE 프라이버시 인프라. 유니콘 밸류에이션.",steps:["Zama 테스트넷","fhEVM 사용","활동 기록","커뮤니티","포인트"],lk:{o:"https://zama.ai"},tg:["프라이버시","FHE"],vids:[]},
  {id:149,n:"Ritual",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"보통",rw:"중형~대형",tier:2,fund:"Polychain, Archetype",dist:"미정",tge:"미정",desc:"AI 인프라 프로토콜. Infernet SDK. 프라이빗 테스트넷 단계. $300+ 예상 가치.",strat:"테스트넷 참여 + Infernet 사용.",sum:"AI 인프라. Polychain + Archetype 투자.",steps:["Ritual 테스트넷","Infernet SDK","활동 기록","커뮤니티","포인트"],lk:{o:"https://ritual.net"},tg:["AI","인프라"],vids:[]},
  {id:150,n:"Kaito",cat:"에어드랍",ch:"Multi-chain",st:"확인됨",diff:"보통",rw:"대형",tier:2,fund:"대형 VC",dist:"33.3% 커뮤니티",tge:"추가 시즌 진행 중",desc:"InfoFi 프로토콜. Yap 포인트 시스템 (트위터 활동 기반). $74M 1차 에어드랍 완료. 추가 시즌 진행 중.",strat:"트위터 활동 (Yap 포인트) + 얍핑.",sum:"InfoFi. $74M 1차 에어드랍 완료. 추가 시즌.",steps:["Kaito 연동","트위터 활동","Yap 포인트","얍핑","추가 시즌"],lk:{o:"https://kaito.ai"},tg:["InfoFi","얍핑"],vids:[]},

  // ──── 기타 에어드랍 ────
  {id:7,n:"Hylo·Loopscale·OnRe",cat:"에어드랍",ch:"Solana",st:"진행중",diff:"쉬움",rw:"중형 (4중)",fund:"솔라나 DeFi",dist:"미정",tge:"미정",desc:"솔라나 고정 수익 3종 세트. 7% 이자 + 4중 에드파밍 구조. Phantom 지갑으로 간편 참여.",strat:"스테이블코인 예치 → 고정 수익 + 4중 에드파밍.",sum:"솔라나 고정 수익. 7% 이자 + 4중 파밍.",steps:["Phantom 지갑 연결","스테이블코인 예치","고정 수익 상품","4중 에드파밍","복리 재투자"],lk:{o:"https://hylo.finance"},tg:["솔라나","고정수익"],vids:[{t:"7% 이자 + 4중 에드파밍",v:"571회",a:"1개월 전"}]},
  {id:8,n:"Titan",cat:"에어드랍",ch:"Solana",st:"예상",diff:"보통",rw:"중형~대형",fund:"솔라나",dist:"미정",tge:"미정",desc:"솔라나 기반 인프라 프로젝트. 초기 참여 시 높은 수익 가능성.",strat:"Phantom 지갑 + SOL 거래/LP.",sum:"솔라나에서 가장 먼저 해야 할 프로젝트.",steps:["Phantom 지갑 연결","SOL 입금","현물 거래","유동성 풀","거래량 누적"],lk:{o:"https://titan.exchange"},tg:["솔라나","DEX"],vids:[{t:"Solana 가장 먼저 해야 할 프로젝트",v:"699회",a:"3개월 전"}]},
  {id:9,n:"Dexari",cat:"에어드랍",ch:"BNB",st:"예상",diff:"쉬움",rw:"중형~대형",fund:"Binance US",dist:"미정",tge:"미정",desc:"Binance US 관련 차세대 DEX/트레이딩 터미널. BNB 체인 기반.",strat:"거래 활동 + 초기 사용자 보너스.",sum:"바이낸스 US 관련 차세대 DEX.",steps:["Dexari 접속","BNB/USDT 입금","거래 활동","유동성 공급","이벤트 참여"],lk:{o:"https://dexari.com"},tg:["바이낸스","DEX"],vids:[{t:"BINANCE US — Dexari",v:"571회",a:"3개월 전"}]},
  {id:11,n:"Minara",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"쉬움",rw:"중형",fund:"Circle Ventures",dist:"미정",tge:"미정",desc:"Circle Ventures 투자 AI 에이전트. Tesla 이벤트 + NFT 배포 진행.",strat:"AI 에이전트 미션 + 포인트 적립.",sum:"Circle이 찍은 AI 에이전트.",steps:["공식 사이트 접속","지갑 연결","AI 에이전트 미션","포인트 적립","커뮤니티"],lk:{o:"https://minara.ai"},tg:["AI","Circle"],vids:[{t:"Circle이 찍은 AI 에이전트 Minara",v:"744회",a:"3개월 전"}]},
  {id:12,n:"Tempo",cat:"에어드랍",ch:"Tempo L1",st:"진행중",diff:"쉬움",rw:"중형~대형",fund:"Stripe, Paradigm, Visa, Coupang",dist:"미정",tge:"미정",desc:"결제 전용 블록체인. Visa, Coupang, DoorDash, Stripe 등 글로벌 대기업 파트너십. 테스트넷 활성.",strat:"파우셋 토큰 + 테스트넷 거래 + 일일 퀘스트.",sum:"결제 전용 블록체인. 글로벌 대기업 파트너십.",steps:["tempo.xyz 접속","파우셋 토큰","테스트넷 거래","일일 퀘스트","소셜 연동"],lk:{o:"https://tempo.xyz"},tg:["결제","대기업"],vids:[{t:"비자·쿠팡이 붙은 체인 Tempo",v:"739회",a:"2개월 전"},{t:"Tempo 다음은 Arc",v:"415회",a:"1개월 전"}]},
  {id:13,n:"Arc",cat:"에어드랍",ch:"Arc",st:"예상",diff:"보통",rw:"중형",fund:"Visa, Coupang, DoorDash",dist:"미정",tge:"미정",desc:"Tempo 이후 주목할 결제 블록체인. 동일 대기업 투자 라인.",strat:"얼리 액세스 + 테스트넷 참여.",sum:"Tempo 다음 주목할 결제 블록체인.",steps:["공식 사이트","얼리 액세스","커뮤니티","테스트넷","포인트"],lk:{o:"https://arc.xyz"},tg:["결제","인프라"],vids:[{t:"대기업이 만드는 결제 블록체인",v:"415회",a:"1개월 전"}]},
  {id:15,n:"OpenLedger",cat:"에어드랍",ch:"OpenLedger",st:"진행중",diff:"보통",rw:"중형~대형",fund:"다수 VC",dist:"미정",tge:"미정",desc:"AI판 이더리움. 자체 체인에 40개 프로젝트 합류. 탈중앙 AI 데이터 인프라.",strat:"노드 운영 + 데이터 기여. 자체 체인 초기 참여.",sum:"AI판 이더리움. 40개 프로젝트 합류.",steps:["openledger.xyz 접속","지갑 생성","dApp 사용","데이터 기여","노드 운영"],lk:{o:"https://openledger.xyz"},tg:["AI","메인넷"],vids:[{t:"OpenLedger 메인넷 출시!",v:"718회",a:"3개월 전"}]},
  {id:16,n:"Fair Shares",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"쉬움",rw:"소형~중형",fund:"비공개",dist:"미정",tge:"미정",desc:"무료 에어드랍으로 토큰화된 주식을 지급. 1분 딸깍으로 참여 가능. RWA 섹터.",strat:"회원가입 → 1분 딸깍 → 주식 수령.",sum:"무료 에어드랍인데 '주식'을 준다! 1분 딸깍.",steps:["앱 접속","회원가입","1분 딸깍","주식 수령","추가 미션"],lk:{o:"https://fairshares.io"},tg:["주식","무료"],vids:[{t:"무료 에어드랍인데 주식을 준다고?",v:"387회",a:"2일 전"}]},
  {id:18,n:"MetaMask",cat:"에어드랍",ch:"Multi-chain",st:"예상",diff:"쉬움",rw:"대형",fund:"ConsenSys",dist:"미정",tge:"미정",desc:"세계 최대 지갑. 토큰 도입 예정. Swap/Bridge/Portfolio 사용이 핵심.",strat:"Swap 활용 + Bridge 사용 + 다양한 체인 활동.",sum:"세계 최대 지갑. 토큰 도입 예정.",steps:["MetaMask 설치","Swap 활용","Bridge 사용","Portfolio 연결","다양한 체인"],lk:{o:"https://metamask.io"},tg:["지갑","대형"],vids:[]},
  {id:37,n:"StandX",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"보통",rw:"중형",fund:"Solana Foundation, ex-Binance",dist:"미정",tge:"미정",desc:"크로스체인 Perp DEX. DUSD 볼트 1.25x 가산. 봇 연동으로 자동화 가능.",strat:"거래 볼륨 파밍. 봇 자동화.",sum:"담보가 돈 버는 PerpDEX.",steps:["standx.io 접속","담보 예치","거래 활동","수익 확인","포인트"],lk:{o:"https://standx.io"},tg:["바이낸스","PerpDEX"],vids:[{t:"StandX 담보가 돈 버는 PerpDEX",v:"780회",a:"4개월 전"}]},
  {id:38,n:"lit.trade",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"보통",rw:"중형~대형",fund:"다수 VC",dist:"미정",tge:"미정",desc:"소셜 트레이딩 + Perp DEX 결합. Embers 포인트 시스템. 주식+크립토 Perp.",strat:"거래 + 소셜 활동(팔로워, 카피트레이딩) 병행.",sum:"최대 15% 혜택 제공.",steps:["lit.trade 접속","지갑 연결","거래 활동","보상 확인","추가 혜택"],lk:{o:"https://lit.trade"},tg:["PerpDEX","혜택"],vids:[{t:"lit.trade 15% 최대 혜택",v:"998회",a:"4개월 전"}]},
  {id:39,n:"Liquid Perps",cat:"에어드랍",ch:"Hyperliquid L1",st:"진행중",diff:"보통",rw:"중형~대형",fund:"Two Sigma, Citadel 출신 · $7.6M",dist:"미정",tge:"미정",desc:"HyperBFT 위 Perp DEX. Two Sigma, Citadel 출신 팀. Hyperliquid L1 네이티브.",strat:"Perp 거래 볼륨 + LP 제공.",sum:"Hyperliquid L1 × Paradigm × 모바일.",steps:["앱 설치","USDC 입금","모바일 거래","포인트","유동성"],lk:{o:"https://liquidperps.xyz"},tg:["하이퍼리퀴드","모바일"],vids:[{t:"Liquid Perps 올인원",v:"1.3천회",a:"5개월 전"}]},
  {id:40,n:"Theo",cat:"에어드랍",ch:"HyperEVM",st:"진행중",diff:"쉬움",rw:"중형",fund:"TradFi + DeFi",dist:"미정",tge:"미정",desc:"HyperEVM 기반 수익 집계 프로토콜. 국채(thBILL) 기반 수익 + 에어드랍. 가스비 저렴.",strat:"USDC 입금 → thBILL 민팅 → HyperEVM 동시 파밍.",sum:"국채 기반 에어드랍. TradFi와 DeFi 융합.",steps:["theo.finance 접속","USDC 입금","thBILL 민팅","HyperEVM 동시파밍","얍핑"],lk:{o:"https://theo.finance"},tg:["RWA","국채"],vids:[{t:"국채 기반 에어드랍 Theo",v:"773회",a:"6개월 전"}]},
  {id:42,n:"Stork Oracle",cat:"에어드랍",ch:"Sui",st:"진행중",diff:"쉬움",rw:"중형",fund:"윈터뮤트, OKX",dist:"미정",tge:"미정",desc:"Sui 생태계 오라클 프로바이더. 1티어 무료 에드작. DePIN.",strat:"가입 → 데이터 제공 → 포인트 적립.",sum:"1티어 무료 에드작. Sui 기반 DePIN.",steps:["stork.network 접속","가입","데이터 제공","포인트","미션"],lk:{o:"https://stork.network"},tg:["Sui","DePIN"],vids:[{t:"Stork Oracle 1티어 무료",v:"600회",a:"10개월 전"}]},
  {id:43,n:"Felix",cat:"에어드랍",ch:"HyperEVM",st:"진행중",diff:"보통",rw:"중형~대형",fund:"HyperEVM 생태계",dist:"미정",tge:"미정",desc:"HyperEVM 첫 스테이블코인 프로토콜 (feUSD). USDH 대출 → HIP-3 거래. 초기 TVL 기여자 보너스.",strat:"USDC 브릿지 → feUSD 민팅 → 유동성 제공.",sum:"HyperEVM 첫 스테이블코인. feUSD.",steps:["felix.finance 접속","USDC 브릿지","feUSD 민팅","유동성","포인트"],lk:{o:"https://felix.finance"},tg:["하이퍼리퀴드","스테이블"],vids:[{t:"HyperEVM 첫 스테이블 Felix",v:"835회",a:"10개월 전"}]},
  {id:44,n:"Mitosis",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"보통",rw:"중형",fund:"다수 VC",dist:"미정",tge:"미정",desc:"크로스체인 유동성 프로토콜. 브릿지 + 유동성 레이어. 자산 묶임 해방.",strat:"크로스체인 브릿지 사용 + 유동성 제공.",sum:"DeFi 혁명. 자산 묶임 해방 + 얍핑.",steps:["mitosis.org 접속","자산 예치","유동성 해제","얍핑","온체인"],lk:{o:"https://mitosis.org"},tg:["DeFi","유동성"],vids:[{t:"Mitosis DeFi 혁명",v:"337회",a:"7개월 전"}]},
  {id:45,n:"Nexus",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"쉬움",rw:"중형",fund:"다수 VC",dist:"미정",tge:"미정",desc:"zkVM 기반 검증 가능한 컴퓨팅. AI + 영지식증명. CLI 노드 백그라운드 실행.",strat:"CLI 노드 실행 → 자동 포인트 적립.",sum:"웹 마이닝 자동화. 무료.",steps:["nexus.xyz 접속","마이닝 시작","자동화","일일 확인","포인트"],lk:{o:"https://nexus.xyz"},tg:["마이닝","무료"],vids:[{t:"Nexus 웹 마이닝 자동화",v:"1.4천회",a:"1년 전"}]},
  {id:47,n:"Walrus",cat:"에어드랍",ch:"Sui",st:"진행중",diff:"보통",rw:"중형~대형",fund:"Mysten Labs (Sui 개발사)",dist:"미정",tge:"미정",desc:"Sui 공식 탈중앙화 스토리지. Mysten Labs(Sui 개발사) 직접 개발. 스토리지 노드 운영 가능.",strat:"테스트넷 참여 + 스토리지 노드 운영.",sum:"Sui 공식 탈중앙화 스토리지.",steps:["walrus.xyz 접속","Sui 지갑 연결","스토리지 사용","업로드","포인트"],lk:{o:"https://walrus.xyz"},tg:["Sui","스토리지"],vids:[{t:"Walrus 에어드랍 가이드",v:"686회",a:"1년 전"}]},
  {id:48,n:"PIN AI",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"쉬움",rw:"중형",fund:"a16z, Sam Altman",dist:"미정",tge:"미정",desc:"개인 AI 에이전트 플랫폼. 사용자 데이터 소유권. a16z + Sam Altman 투자. 텔레그램 앱.",strat:"텔레그램 봇 → 일일 미션 → 포인트.",sum:"A16z + 샘 알트만. 텔레그램.",steps:["텔레그램 봇","가입","일일 미션","AI","포인트"],lk:{o:"https://pinai.io"},tg:["AI","텔레그램"],vids:[{t:"PIN AI A16z 텔레그램",v:"580회",a:"1년 전"}]},
  {id:51,n:"Kite AI",cat:"에어드랍",ch:"Avalanche",st:"진행중",diff:"쉬움",rw:"중형",fund:"삼성넥스트, 해시드",dist:"미정",tge:"미정",desc:"Avalanche 기반 AI 에이전트 인프라. 삼성넥스트 + 해시드 투자. 무료 테스트넷.",strat:"테스트넷 참여 + AI 에이전트 배포.",sum:"아발란체 무료 테넷작.",steps:["kiteai.xyz 접속","지갑 연결","테스트넷","AI 미션","포인트"],lk:{o:"https://kiteai.xyz"},tg:["AI","아발란체"],vids:[{t:"Kite AI 아발란체 무료",v:"714회",a:"1년 전"}]},
  {id:52,n:"LayerEdge",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"쉬움",rw:"중형",fund:"다수 VC",dist:"미정",tge:"미정",desc:"비트코인 보안 활용 탈중앙 인프라. 무료 테스트넷 참여 가능.",strat:"노드 운영 + 테스트넷 참여.",sum:"무료 테스트넷. 난이도 최하.",steps:["layeredge.xyz","가입","테스트넷","미션","포인트"],lk:{o:"https://layeredge.xyz"},tg:["테스트넷","무료"],vids:[{t:"LayerEdge 무료 테스트넷",v:"1.1천회",a:"1년 전"}]},
  {id:53,n:"Credible",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"쉬움",rw:"중형",fund:"Circle",dist:"미정",tge:"미정",desc:"탈중앙 신용 프로토콜. 최소 10달러 예치로 시작. Circle 투자.",strat:"10달러 예치 → 수익 확인 → 포인트 적립.",sum:"최소 10달러 DeFi 혁신.",steps:["credible.finance","10달러 예치","수익 확인","포인트","추가 예치"],lk:{o:"https://credible.finance"},tg:["DeFi","소액"],vids:[{t:"최소 10달러 DeFi 혁신",v:"803회",a:"1년 전"}]},
  {id:54,n:"Avantis",cat:"에어드랍",ch:"Base",st:"진행중",diff:"보통",rw:"중형",fund:"Pantera",dist:"미정",tge:"미정",desc:"Base 기반 Perp DEX. 합성 자산 트레이딩. 실물 자산까지 최대 500배.",strat:"거래 볼륨 + LP 제공.",sum:"실물 자산까지. 최대 500배.",steps:["avantis.finance","USDC 입금","거래","다양한 자산","포인트"],lk:{o:"https://avantis.finance"},tg:["PerpDEX","RWA"],vids:[{t:"최대 500배 PerpDEX Avantis",v:"319회",a:"8개월 전"}]},
  {id:55,n:"Rails",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"보통",rw:"중형",fund:"Kraken",dist:"미정",tge:"미정",desc:"Kraken 투자 Perp DEX. 오더북 기반. 주간 $75K 상금풀.",strat:"거래 + 드립 캠페인 참여.",sum:"Kraken 투자. 주간 $75K 상금풀.",steps:["rails.xyz","지갑 연결","거래","드립 캠페인","상금"],lk:{o:"https://rails.xyz"},tg:["PerpDEX","Kraken"],vids:[{t:"Kraken 투자 Rails.xyz",v:"473회",a:"8개월 전"}]},
  {id:56,n:"Tread.Fi",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"보통",rw:"중형~대형",fund:"다수 VC",dist:"미정",tge:"미정",desc:"Perp DEX 허브. 여러 DEX 통합.",strat:"거래 + 유동성 제공.",sum:"Perp DEX 전쟁의 끝.",steps:["tread.fi","지갑 연결","거래","유동성","포인트"],lk:{o:"https://tread.fi"},tg:["PerpDEX","허브"],vids:[{t:"Tread.Fi Perp DEX 전쟁의 끝",v:"884회",a:"3개월 전"}]},
  {id:57,n:"MemeMax",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"쉬움",rw:"대형 (30억)",fund:"다수 VC",dist:"Perp 15억 + 트위터 15억",tge:"미정",desc:"밈코인 특화 Perp DEX. 총 30억 토큰 보상 풀. 보상 규모 최대.",strat:"Perp 거래 + 트위터 글쓰기.",sum:"Perp 15억 + 트위터 15억 보상.",steps:["mememax.xyz","거래","트위터 글쓰기","포인트","보상"],lk:{o:"https://mememax.xyz"},tg:["밈코인","PerpDEX"],vids:[{t:"Perp 보상 15억 MemeMax",v:"895회",a:"3개월 전"}]},
  {id:58,n:"Bluewhale",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"보통",rw:"중형",fund:"다수 VC",dist:"미정",tge:"미정",desc:"기관급 DeFi 프로토콜. AI 데이터 자산화.",strat:"데이터 제공 + AI 에이전트 활동.",sum:"AI 혁명 2막. 데이터를 자산으로.",steps:["bluewhale.ai","데이터 제공","AI 에이전트","포인트","커뮤니티"],lk:{o:"https://bluewhale.ai"},tg:["AI","데이터"],vids:[{t:"Bluewhale 데이터를 자산으로",v:"348회",a:"3개월 전"}]},
  {id:59,n:"Bullpen",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"쉬움",rw:"중형 (4중)",fund:"다수 VC",dist:"미정",tge:"미정",desc:"4중 파밍: Unit + hype + PerpDEX + 밈코인.",strat:"4중 파밍 구조 활용.",sum:"4중 파밍. Unit+hype+PerpDEX+밈코인.",steps:["bullpen.xyz","지갑 연결","4중 파밍","거래","포인트"],lk:{o:"https://bullpen.xyz"},tg:["PerpDEX","4중파밍"],vids:[{t:"Bullpen 4중 에드작",v:"928회",a:"4개월 전"}]},
  {id:62,n:"Malda",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"보통",rw:"중형",fund:"RISC Zero, Linea",dist:"미정",tge:"미정",desc:"ZK 통합 대출/렌딩 프로토콜. 극초기.",strat:"대출/예치 활동 + ZK 트랜잭션.",sum:"ZK 통합 대출. 극초기.",steps:["malda.finance","지갑 연결","대출/예치","포인트","ZK"],lk:{o:"https://malda.finance"},tg:["ZK","DeFi"],vids:[{t:"Malda ZK 통합 대출 극초기",v:"317회",a:"9개월 전"}]},
  {id:63,n:"PrismaX",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"쉬움",rw:"중형",fund:"a16z",dist:"미정",tge:"미정",desc:"AI + 로봇 + 블록체인 융합. DeFi 수익 최적화. 무료 참여.",strat:"가입 → 무료 미션 → AI 포인트.",sum:"AI + 로봇 + 블록체인. 무료.",steps:["prismafx.ai","가입","무료 미션","AI","포인트"],lk:{o:"https://prismafx.ai"},tg:["AI","로봇"],vids:[{t:"PrismaX 무료 a16z",v:"680회",a:"7개월 전"}]},
  {id:64,n:"Rootstock",cat:"에어드랍",ch:"Bitcoin",st:"진행중",diff:"보통",rw:"중형",fund:"비트코인 사이드체인",dist:"미정",tge:"미정",desc:"비트코인 사이드체인. BTC DeFi 활동.",strat:"BTC 브릿지 + DeFi.",sum:"비트코인 위 진짜 DeFi.",steps:["rootstock.io","BTC 브릿지","DeFi","이벤트","포인트"],lk:{o:"https://rootstock.io"},tg:["비트코인","DeFi"],vids:[{t:"Rootstock 비트코인 디파이",v:"338회",a:"7개월 전"}]},
  {id:66,n:"Skate",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"쉬움",rw:"중형",fund:"다수 VC",dist:"미정",tge:"미정",desc:"크로스체인 실행 레이어. Kaito 스피드런 얍핑 + 앱 실사용.",strat:"Kaito 연동 + 얍핑 + 앱 사용.",sum:"Kaito 스피드런 얍핑 + 앱 실사용.",steps:["skatechain.org","Kaito 연동","얍핑","앱 사용","포인트"],lk:{o:"https://skatechain.org"},tg:["얍핑","크로스체인"],vids:[{t:"Skate x Kaito 스피드런",v:"288회",a:"8개월 전"}]},
  {id:67,n:"UniversalX",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"보통",rw:"중형",fund:"1티어 VC",dist:"미정",tge:"미정",desc:"크로스체인 DEX. 원클릭 스왑. 고빈도 자동매매.",strat:"자동매매 + 크로스체인 스왑.",sum:"1티어 에드작. 고빈도 자동매매.",steps:["universalx.io","지갑 연결","자동매매","거래","포인트"],lk:{o:"https://universalx.io"},tg:["DEX","자동매매"],vids:[{t:"UniversalX 고빈도 자동매매",v:"782회",a:"11개월 전"}]},
  {id:69,n:"SuperForm",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"쉬움",rw:"중형",fund:"VanEck",dist:"미정",tge:"미정",desc:"크로스체인 수익 집계. 여러 체인의 볼트를 하나의 인터페이스로. 스테이블 20% 이자.",strat:"다양한 체인에 예치 → SuperPoints.",sum:"스테이블 예치 20% 이자.",steps:["superform.xyz","스테이블코인 예치","20% 이자","에어드랍","복리"],lk:{o:"https://superform.xyz"},tg:["예치","파밍"],vids:[{t:"SuperForm 스테이블 20%",v:"478회",a:"1년 전"}]},
  {id:70,n:"Talus",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"쉬움",rw:"중형",fund:"Polychain",dist:"미정",tge:"미정",desc:"AI 에이전트 프레임워크. Move 기반. Polychain 투자.",strat:"테스트넷 참여 + 에이전트 배포.",sum:"폴리체인 무료. AI Agent.",steps:["talus.network","가입","AI Agent","포인트","커뮤니티"],lk:{o:"https://talus.network"},tg:["AI","폴리체인"],vids:[{t:"Talus 폴리체인 AI agent",v:"603회",a:"1년 전"}]},
  {id:71,n:"Gradient",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"쉬움",rw:"중형",fund:"Sequoia",dist:"미정",tge:"미정",desc:"탈중앙 컴퓨팅 네트워크. 브라우저 확장으로 참여. Sentry Node 포인트 적립. Sequoia 투자.",strat:"브라우저 익스텐션 설치 → 방치.",sum:"넥스트 Grass. 세콰이어.",steps:["gradient.network","확장 프로그램","자동 실행","포인트","일일 확인"],lk:{o:"https://gradient.network"},tg:["DePIN","무료"],vids:[{t:"Gradient 세콰이어 넥스트 Grass",v:"514회",a:"1년 전"}]},
  {id:72,n:"Gata",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"쉬움",rw:"중형",fund:"다수 VC",dist:"미정",tge:"미정",desc:"AI 데이터 레이블링 + DePIN. ChatGPT 사용하면 포인트. 모바일 가능.",strat:"ChatGPT 사용 → 데이터 레이블링 → 포인트.",sum:"ChatGPT 쓰면 포인트. 무료.",steps:["gata.io","가입","ChatGPT","포인트","미션"],lk:{o:"https://gata.io"},tg:["AI","무료"],vids:[{t:"Gata 무료 에어드랍",v:"673회",a:"8개월 전"}]},
  {id:73,n:"Tomo",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"쉬움",rw:"중형",fund:"다수 VC",dist:"미정",tge:"미정",desc:"소셜 월렛/앱. SocialFi 섹터. 밈코인 분석 기능.",strat:"소셜 로그인 → 밈코인 분석 → 거래.",sum:"소셜 로그인 + 밈코인 분석.",steps:["tomo.inc","소셜 로그인","밈코인 분석","거래","에어드랍"],lk:{o:"https://tomo.inc"},tg:["지갑","밈코인"],vids:[{t:"Tomo 에어드랍",v:"380회",a:"8개월 전"}]},
  {id:74,n:"Doma",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"쉬움",rw:"중형",fund:"Paradigm",dist:"미정",tge:"미정",desc:"도메인/신원 인프라. Paradigm 투자. D3 연동.",strat:"도메인 구매 + 등록 → 포인트.",sum:"도메인으로 에어드랍.",steps:["doma.xyz","도메인 구매","등록","포인트","D3"],lk:{o:"https://doma.xyz"},tg:["도메인","패러다임"],vids:[{t:"도메인 에어드랍 Doma + D3",v:"253회",a:"9개월 전"}]},
  {id:35,n:"Recall",cat:"에어드랍",ch:"Multi-chain",st:"진행중",diff:"보통",rw:"중형~대형",fund:"AI 관련 VC",dist:"미정",tge:"미정",desc:"탈중앙 AI 데이터 레이어. AI 모델 학습 데이터 관리.",strat:"데이터 기여 + 노드 운영.",sum:"AI가 4,493% 수익 따라하는 AI 에이전트.",steps:["recall.ai 접속","AI 에이전트 설정","전략 선택","실행","수익 확인"],lk:{o:"https://recall.ai"},tg:["AI","에이전트"],vids:[{t:"AI가 4,493% 수익 따라하는법",v:"1.4천회",a:"4개월 전"}]},

  // ──── AI 툴 ────
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

  // ──── 밈코인 ────
  {id:200,n:"밈코인 올인원",cat:"밈코인",ch:null,st:null,diff:"보통",rw:null,sum:"4363% 수익 인증. 슈퍼사이클.",steps:["기초","트렌드","지갑","타이밍","리스크"],lk:{},tg:["밈코인","가이드"],vids:[{t:"4363% 밈코인 올인원 (50분)",v:"1.9만회",a:"1년 전"},{t:"밈코인 슈퍼사이클",v:"2.4천회",a:"1년 전"},{t:"밈코인 필수 Tool",v:"4.3천회",a:"1년 전"}]},
  {id:201,n:"GMGN",cat:"밈코인",ch:null,st:null,diff:"보통",rw:null,sum:"GMGN.AI 스마트머니 카피.",steps:["gmgn.ai","추적","카피","매매","수익"],lk:{o:"https://gmgn.ai"},tg:["밈코인","스마트머니"],vids:[{t:"GMGN.AI 스마트머니",v:"7.8천회",a:"1년 전"}]},
  {id:202,n:"카피트레이딩",cat:"밈코인",ch:null,st:null,diff:"보통",rw:null,sum:"2만원→41억. 자동 카피.",steps:["플랫폼","지갑","자동 카피","리스크","수익"],lk:{},tg:["카피트레이딩","스마트머니"],vids:[{t:"2만원→41억 카피트레이딩",v:"1.9만회",a:"1년 전"},{t:"스마트머니 지갑추천",v:"3.6천회",a:"1년 전"},{t:"4000% 카피트레이딩 심화",v:"3천회",a:"1년 전"}]},
  {id:203,n:"밈코인 봉크봇",cat:"밈코인",ch:null,st:null,diff:"보통",rw:null,sum:"6087% 봉크봇 실전매매.",steps:["봉크봇","지갑","세팅","실전","수익"],lk:{},tg:["봉크봇","실전"],vids:[{t:"6087% 봉크봇 실전매매",v:"3.9천회",a:"1년 전"}]},

  // ──── 트레이딩 ────
  {id:300,n:"Breakout",cat:"트레이딩",ch:null,st:null,diff:"보통",rw:null,sum:"2.7억 지원 프랍.",steps:["breakout.trade","테스트","합격","트레이딩","분배"],lk:{o:"https://breakout.trade"},tg:["프랍","트레이딩"],vids:[{t:"2.7억 Breakout 프랍",v:"6.7천회",a:"11개월 전"},{t:"프랍 혜택 총정리",v:"1.5천회",a:"9개월 전"}]},
  {id:301,n:"PropW",cat:"트레이딩",ch:null,st:null,diff:"보통",rw:null,sum:"100달러→1만불.",steps:["propw.com","쿠폰","테스트","합격","운용"],lk:{o:"https://propw.com"},tg:["프랍","저자본"],vids:[{t:"100달러 1만불 PropW",v:"1.3천회",a:"11개월 전"},{t:"2억9천 시드 트레이더",v:"1.2천회",a:"11개월 전"}]},
  {id:302,n:"Nansen",cat:"트레이딩",ch:null,st:null,diff:"보통",rw:null,sum:"고래 추적 + 알파 시그널.",steps:["nansen.ai","지갑 추적","시그널","분석","전략"],lk:{o:"https://nansen.ai"},tg:["분석","고래"],vids:[{t:"Nansen 고래 추적 실전",v:"746회",a:"9개월 전"}]},
  {id:303,n:"Strata·Pendle",cat:"트레이딩",ch:"Solana",st:null,diff:"보통",rw:null,sum:"Pendle YT 3종 파밍.",steps:["Strata","Pendle YT","예치","3종 파밍","수익"],lk:{},tg:["DeFi","파밍"],vids:[{t:"3종 수익 극대화",v:"524회",a:"6개월 전"}]},

  // ──── 얍핑 ────
  {id:400,n:"얍핑 입문",cat:"얍핑",ch:null,st:null,diff:"쉬움",rw:null,sum:"초보 가능. 트윗으로 돈.",steps:["Kaito","Virtual","트위터","글 작성","포인트"],lk:{},tg:["Kaito","Virtual"],vids:[{t:"초보 얍핑 입문",v:"5.6천회",a:"8개월 전"},{t:"0원으로 350만원",v:"1.6천회",a:"8개월 전"}]},
  {id:401,n:"얍핑 심화",cat:"얍핑",ch:null,st:null,diff:"보통",rw:null,sum:"트윗 하나 = 60만원.",steps:["인플루언스","멀티 프로젝트","점수 최적화","보상 극대화","3콤보"],lk:{},tg:["얍핑","수익"],vids:[{t:"트윗 하나로 60만원",v:"1.5천회",a:"8개월 전"},{t:"3콤보 전략",v:"694회",a:"8개월 전"}]},

  // ──── 시장 분석 ────
  {id:500,n:"BTC 시그널",cat:"시장 분석",ch:null,st:null,diff:"쉬움",rw:null,sum:"비트코인 94K. AI 시그널.",steps:["시장 데이터","AI 시그널","매크로","온체인","전략"],lk:{},tg:["비트코인","시그널"],vids:[{t:"AI가 설명하는 비트코인",v:"426회",a:"2개월 전"}]},
  {id:501,n:"에어드랍 올인원",cat:"시장 분석",ch:null,st:null,diff:"쉬움",rw:null,sum:"하루 10분 → 월 300.",steps:["선정","루틴","10분","포인트","수익"],lk:{},tg:["에어드랍","입문"],vids:[{t:"하루 10분 월 300",v:"5천회",a:"7개월 전"},{t:"다음 100배",v:"1.4천회",a:"4개월 전"},{t:"목표 10억",v:"1.9천회",a:"4개월 전"}]},
  {id:502,n:"DePIN 11종",cat:"시장 분석",ch:null,st:null,diff:"쉬움",rw:null,sum:"5천만원 수익 DePIN 11종.",steps:["DePIN 이해","11종","설치","자동화","수익"],lk:{},tg:["DePIN","올인원"],vids:[{t:"DePIN 11종",v:"1.9천회",a:"1년 전"}]},
  {id:503,n:"NordVPN",cat:"시장 분석",ch:null,st:null,diff:"쉬움",rw:null,sum:"코인 투자자 필수 VPN.",steps:["가입","설치","Kill Switch","서버","보안"],lk:{},tg:["보안","VPN"],vids:[{t:"NordVPN 필수인 이유",v:"394회",a:"9개월 전"}]},
  {id:504,n:"ZKCODEX",cat:"시장 분석",ch:null,st:null,diff:"쉬움",rw:null,sum:"에어드랍 체커 올인원.",steps:["ZKCODEX","지갑","체크","자격","클레임"],lk:{},tg:["체커","에어드랍"],vids:[]},
];

const CATEGORIES = ["전체","에어드랍","AI 툴","밈코인","얍핑","트레이딩","시장 분석"];

const CAT_ICONS = {"에어드랍":Zap,"AI 툴":Brain,"밈코인":Sparkles,"얍핑":MessageCircle,"트레이딩":TrendingUp,"시장 분석":BarChart3};
const CAT_ACCENT = {"에어드랍":"from-violet-500 to-fuchsia-500","AI 툴":"from-cyan-500 to-blue-500","밈코인":"from-pink-500 to-rose-500","얍핑":"from-amber-500 to-orange-500","트레이딩":"from-emerald-500 to-teal-500","시장 분석":"from-sky-500 to-indigo-500"};

const STATUS_MAP = {
  "진행중": { bg: "bg-violet-500/15", text: "text-violet-300", border: "border-violet-500/30", dot: "bg-violet-400" },
  "확인됨": { bg: "bg-emerald-500/15", text: "text-emerald-300", border: "border-emerald-500/30", dot: "bg-emerald-400" },
  "예상": { bg: "bg-amber-500/15", text: "text-amber-300", border: "border-amber-500/30", dot: "bg-amber-400" },
};

const DIFF_MAP = {
  "쉬움": { text: "text-teal-400", label: "Easy" },
  "보통": { text: "text-amber-400", label: "Mid" },
  "어려움": { text: "text-rose-400", label: "Hard" },
};

/* ══════════════════════════════════════════════════════════════════════ */
/*  MAIN APP                                                            */
/* ══════════════════════════════════════════════════════════════════════ */

export default function App() {
  const [cat, setCat] = useState("전체");
  const [q, setQ] = useState("");
  const [expanded, setExpanded] = useState(null);
  const [showTier1, setShowTier1] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const filtered = useMemo(() => {
    return P.filter(p => {
      const mc = cat === "전체" || p.cat === cat;
      const ms = !q || p.n.toLowerCase().includes(q.toLowerCase()) || p.sum.includes(q) || (p.desc||'').includes(q) || (p.tg||[]).some(t => t.includes(q));
      return mc && ms;
    });
  }, [cat, q]);

  const tier1 = filtered.filter(p => p.tier === 1);
  const confirmed = filtered.filter(p => p.st === "확인됨");
  const catCounts = useMemo(() => {
    const counts = {};
    CATEGORIES.forEach(c => { counts[c] = c === "전체" ? P.length : P.filter(p => p.cat === c).length; });
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-[#050507] text-zinc-100 selection:bg-violet-500/30">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full bg-violet-600/[0.04] blur-[120px]" />
        <div className="absolute -bottom-[30%] -right-[20%] w-[60%] h-[60%] rounded-full bg-fuchsia-600/[0.03] blur-[120px]" />
      </div>

      <div className="relative">
        <Nav mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
        <Hero />

        {/* Tier 1 Spotlight */}
        {tier1.length > 0 && cat === "전체" && !q && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-8">
            <button onClick={() => setShowTier1(!showTier1)} className="flex items-center gap-3 mb-6 group">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 border border-violet-500/30">
                <Target size={14} className="text-violet-400" />
                <span className="text-sm font-semibold text-violet-300">Tier 1</span>
              </div>
              <span className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">최우선 프로젝트 {tier1.length}개</span>
              <ChevronRight size={16} className={`text-zinc-500 transition-transform duration-200 ${showTier1 ? 'rotate-90' : ''}`} />
            </button>
            <AnimatePresence>
              {showTier1 && (
                <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}} className="overflow-hidden">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {tier1.map((p,i) => (
                      <motion.div key={p.id} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*0.04}} onClick={() => setExpanded(expanded===p.id?null:p.id)}
                        className="group relative p-4 rounded-xl bg-gradient-to-br from-violet-500/[0.08] to-fuchsia-500/[0.04] border border-violet-500/20 hover:border-violet-500/40 cursor-pointer transition-all duration-200">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-white group-hover:text-violet-200 transition-colors">{p.n}</h3>
                          {p.st && <StatusBadge status={p.st} />}
                        </div>
                        <p className="text-xs text-zinc-400 line-clamp-2 mb-3">{p.desc || p.sum}</p>
                        <div className="flex items-center gap-3 text-xs text-zinc-500">
                          {p.ch && <span className="px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-400">{p.ch}</span>}
                          {p.rw && <span className="text-violet-400">{p.rw}</span>}
                          {p.dist && p.dist !== "미정" && <span className="text-emerald-400">{p.dist.split(' ')[0]}</span>}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        )}

        {/* Confirmed */}
        {confirmed.length > 0 && cat === "전체" && !q && (
          <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                <Shield size={14} className="text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-300">확정</span>
              </div>
              <span className="text-sm text-zinc-400">에어드랍 확정 {confirmed.length}개</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {confirmed.map((p,i) => (
                <motion.div key={p.id} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:i*0.04}} onClick={() => setExpanded(expanded===p.id?null:p.id)}
                  className="group p-4 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/20 hover:border-emerald-500/40 cursor-pointer transition-all duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-white group-hover:text-emerald-200">{p.n}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">확정</span>
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-2 mb-2">{p.desc || p.sum}</p>
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    {p.fund && <span className="text-emerald-400/80">{p.fund.split('·')[0]}</span>}
                    {p.dist && p.dist !== "미정" && <span>· {p.dist.split(' ')[0]}</span>}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Filter */}
        <div className="sticky top-0 z-40 bg-[#050507]/80 backdrop-blur-xl border-b border-zinc-800/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-zinc-500" size={16} />
              <input type="text" placeholder="프로젝트 검색..." value={q} onChange={e=>setQ(e.target.value)}
                className="w-full bg-zinc-900/60 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all" />
              {q && <button onClick={()=>setQ("")} className="absolute right-3 top-2.5 text-zinc-500 hover:text-zinc-300"><X size={16}/></button>}
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {CATEGORIES.map(c => {
                const Icon = CAT_ICONS[c];
                const active = cat === c;
                return (
                  <button key={c} onClick={()=>setCat(c)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 ${active ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40' : 'bg-zinc-900/40 text-zinc-500 border border-zinc-800/50 hover:text-zinc-300 hover:border-zinc-700'}`}>
                    {Icon && <Icon size={12} />}
                    {c}
                    <span className={`ml-0.5 text-[10px] ${active?'text-violet-400':'text-zinc-600'}`}>{catCounts[c]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-zinc-500">{filtered.length}개 프로젝트</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((p,i) => (
                <Card key={p.id} p={p} isOpen={expanded===p.id} toggle={()=>setExpanded(expanded===p.id?null:p.id)} i={i} />
              ))}
            </AnimatePresence>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <Search size={40} className="mx-auto text-zinc-700 mb-4" />
              <p className="text-zinc-500">검색 결과가 없습니다</p>
            </div>
          )}
        </div>

        <Footer />
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {expanded && <Detail p={P.find(x=>x.id===expanded)} onClose={()=>setExpanded(null)} />}
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════ */
/*  COMPONENTS                                                          */
/* ══════════════════════════════════════════════════════════════════════ */

function Nav({ mobileMenu, setMobileMenu }) {
  return (
    <header className="sticky top-0 z-50 bg-[#050507]/60 backdrop-blur-xl border-b border-zinc-800/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-black text-sm">C</div>
          <div>
            <span className="text-sm font-bold text-white tracking-tight">CryptoMage</span>
            <span className="hidden sm:inline text-[10px] text-zinc-600 ml-2">7,700 구독자</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="https://www.youtube.com/@cryptocurrencymage" target="_blank" rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 text-xs font-medium transition-all">
            <Play size={12} fill="currentColor" />YouTube
          </a>
          <a href="https://t.me/cryptomage7700" target="_blank" rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 hover:bg-sky-500/20 text-xs font-medium transition-all">
            <MessageCircle size={12} />Telegram
          </a>
          <button onClick={()=>setMobileMenu(!mobileMenu)} className="sm:hidden p-1.5 text-zinc-400 hover:text-white">
            {mobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {mobileMenu && (
          <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}} className="sm:hidden border-t border-zinc-800/40 bg-zinc-950/80 px-4 py-3 flex gap-2">
            <a href="https://www.youtube.com/@cryptocurrencymage" target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-medium">
              <Play size={12} fill="currentColor" />YouTube
            </a>
            <a href="https://t.me/cryptomage7700" target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-medium">
              <MessageCircle size={12} />Telegram
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const stats = [
    { label: "프로젝트", value: `${P.filter(p=>p.cat==='에어드랍').length}+`, icon: Layers },
    { label: "영상", value: "156", icon: Play },
    { label: "구독자", value: "7.7K", icon: Users },
    { label: "Tier 1", value: `${P.filter(p=>p.tier===1).length}`, icon: Target },
  ];
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-8 sm:pt-16 sm:pb-12">
      <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.5}}>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-3">
          에어드랍 & 크립토<br className="sm:hidden" />{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">가이드</span>
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 mb-8 max-w-xl">
          에어드랍, 자동매매 봇, 밈코인, AI 툴 — 직접 해본 것만 정리합니다.
        </p>
      </motion.div>
      <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.15,duration:0.5}}
        className="grid grid-cols-4 gap-2 sm:gap-3">
        {stats.map(({label,value,icon:Icon},i) => (
          <div key={i} className="relative group p-3 sm:p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60 hover:border-zinc-700/60 transition-all duration-200">
            <div className="flex items-center gap-1.5 mb-1">
              <Icon size={12} className="text-zinc-600" />
              <span className="text-[10px] sm:text-xs text-zinc-600 uppercase tracking-wider">{label}</span>
            </div>
            <p className="text-lg sm:text-2xl font-black text-white font-mono">{value}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

function StatusBadge({ status }) {
  const s = STATUS_MAP[status];
  if (!s) return null;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${s.bg} ${s.text} border ${s.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}

function Card({ p, isOpen, toggle, i }) {
  const accent = CAT_ACCENT[p.cat] || "from-zinc-500 to-zinc-600";

  return (
    <motion.div layout initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0,scale:0.95}} transition={{delay:Math.min(i*0.02,0.3)}}
      onClick={toggle}
      className="group relative rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/70 cursor-pointer transition-all duration-200 overflow-hidden">
      {/* Top accent line */}
      <div className={`h-[2px] w-full bg-gradient-to-r ${accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {p.tier && (
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${p.tier===1?'bg-violet-500/20 text-violet-300':'bg-zinc-700/50 text-zinc-400'}`}>
                  T{p.tier}
                </span>
              )}
              <h3 className="text-sm font-bold text-white group-hover:text-violet-200 transition-colors truncate">{p.n}</h3>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {p.st && <StatusBadge status={p.st} />}
              {p.ch && <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-500">{p.ch}</span>}
            </div>
          </div>
          <ChevronRight size={14} className={`text-zinc-600 mt-1 flex-shrink-0 transition-transform duration-200 ${isOpen?'rotate-90':''}`} />
        </div>

        {/* Summary */}
        <p className="text-xs text-zinc-500 line-clamp-2 mb-3">{p.sum}</p>

        {/* Meta */}
        <div className="flex items-center gap-3 text-[10px] text-zinc-600">
          {p.diff && <span className={DIFF_MAP[p.diff]?.text}>{p.diff}</span>}
          {p.rw && <span>{p.rw}</span>}
          {p.vids?.length > 0 && <span className="flex items-center gap-0.5"><Play size={9}/>{p.vids.length}</span>}
        </div>
      </div>
    </motion.div>
  );
}

function Detail({ p, onClose }) {
  if (!p) return null;
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div initial={{y:40,opacity:0}} animate={{y:0,opacity:1}} exit={{y:40,opacity:0}} transition={{type:'spring',damping:25,stiffness:300}}
        onClick={e=>e.stopPropagation()}
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-zinc-900 border border-zinc-800 rounded-t-2xl sm:rounded-2xl sm:m-4">

        {/* Header */}
        <div className="sticky top-0 bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-800/50 px-5 py-4 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {p.tier && <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${p.tier===1?'bg-violet-500/20 text-violet-300':'bg-zinc-700/50 text-zinc-400'}`}>Tier {p.tier}</span>}
              {p.st && <StatusBadge status={p.st} />}
            </div>
            <h2 className="text-xl font-black text-white">{p.n}</h2>
            {p.ch && <p className="text-xs text-zinc-500 mt-0.5">{p.ch}</p>}
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="px-5 py-4 space-y-5">
          {/* Description */}
          <p className="text-sm text-zinc-300 leading-relaxed">{p.desc || p.sum}</p>

          {/* Key Info Grid */}
          <div className="grid grid-cols-2 gap-2">
            {p.fund && (
              <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-800">
                <DollarSign size={12} className="text-zinc-600 mb-1" />
                <p className="text-[10px] text-zinc-600 mb-0.5">펀딩</p>
                <p className="text-xs text-zinc-300 font-medium">{p.fund}</p>
              </div>
            )}
            {p.dist && p.dist !== "미정" && (
              <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-800">
                <Users size={12} className="text-zinc-600 mb-1" />
                <p className="text-[10px] text-zinc-600 mb-0.5">배분</p>
                <p className="text-xs text-zinc-300 font-medium">{p.dist}</p>
              </div>
            )}
            {p.tge && p.tge !== "미정" && (
              <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-800">
                <Clock size={12} className="text-zinc-600 mb-1" />
                <p className="text-[10px] text-zinc-600 mb-0.5">예상 TGE</p>
                <p className="text-xs text-zinc-300 font-medium">{p.tge}</p>
              </div>
            )}
            {p.diff && (
              <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-800">
                <Target size={12} className="text-zinc-600 mb-1" />
                <p className="text-[10px] text-zinc-600 mb-0.5">난이도</p>
                <p className={`text-xs font-medium ${DIFF_MAP[p.diff]?.text}`}>{p.diff} {p.rw && `· ${p.rw}`}</p>
              </div>
            )}
          </div>

          {/* Strategy */}
          {p.strat && (
            <div className="p-3 rounded-lg bg-violet-500/[0.06] border border-violet-500/20">
              <p className="text-[10px] text-violet-400 font-semibold mb-1">전략</p>
              <p className="text-xs text-zinc-300">{p.strat}</p>
            </div>
          )}

          {/* Steps */}
          {p.steps?.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-zinc-400 mb-2">진행 단계</p>
              <div className="space-y-1.5">
                {p.steps.map((s,i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] font-bold text-zinc-500">{i+1}</span>
                    <span className="text-zinc-400 pt-0.5">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Videos */}
          {p.vids?.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-zinc-400 mb-2">관련 영상</p>
              <div className="space-y-1.5">
                {p.vids.map((v,i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-zinc-800/40 border border-zinc-800/60 hover:border-zinc-700 transition-colors">
                    <div className="w-7 h-7 rounded bg-red-500/10 flex items-center justify-center flex-shrink-0">
                      <Play size={10} className="text-red-400" fill="currentColor" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-zinc-300 font-medium truncate">{v.t}</p>
                      <p className="text-[10px] text-zinc-600">{v.v} · {v.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {p.tg?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {p.tg.map((t,i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800/60 text-zinc-500 border border-zinc-800">#{t}</span>
              ))}
            </div>
          )}

          {/* Link */}
          {p.lk?.o && (
            <a href={p.lk.o} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/30 text-violet-300 text-sm font-medium transition-all duration-200">
              공식 웹사이트<ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-zinc-800/40 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-black text-[10px]">C</div>
          <span className="text-xs text-zinc-600">© 2026 CryptoMage</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="https://www.youtube.com/@cryptocurrencymage" target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-600 hover:text-red-400 transition-colors">YouTube</a>
          <span className="text-zinc-800">·</span>
          <a href="https://t.me/cryptomage7700" target="_blank" rel="noopener noreferrer" className="text-xs text-zinc-600 hover:text-sky-400 transition-colors">Telegram</a>
        </div>
      </div>
    </footer>
  );
}
