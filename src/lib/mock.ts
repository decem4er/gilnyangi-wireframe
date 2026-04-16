export type Cat = {
  id: string;
  name: string;
  spec: string;
  rating: number;
  reviews: number;
  hires: number;
  area: string;
  tags: string[];
  services: string[];
  appeal: string;
};

export type HireRecord = {
  id: string;
  catId: string;
  catName: string;
  spec: string;
  date: string;
  status: "업무예정" | "업무중" | "업무완료" | "보상완료";
};

export type Message = {
  id: string;
  name: string;
  preview: string;
  time: string;
  unread: number;
  active?: boolean;
};

export type ChatMessage = {
  id: string;
  text: string;
  fromSelf: boolean;
  time: string;
};

export const CATS: Cat[] = [
  { id: "1", name: "치즈", spec: "쥐 퇴치 전문", rating: 4.8, reviews: 32, hires: 45, area: "서울 마포구, 서대문구, 은평구", tags: ["쥐퇴치","야행성","민첩함","5년경력"], services: ["쥐 포획 및 처리","야간 해충 순찰","창고 방역","먼지 청소"], appeal: "쥐 잡기 5년 경력! 야간 출동 환영합니다" },
  { id: "2", name: "나비", spec: "바퀴벌레 박멸", rating: 4.5, reviews: 18, hires: 30, area: "서울 강남구, 서초구", tags: ["바퀴벌레","실내전문","꼼꼼함"], services: ["바퀴벌레 박멸","먼지 청소"], appeal: "깔끔하고 신속한 처리 전문입니다" },
  { id: "3", name: "고등어", spec: "먼지 청소", rating: 4.2, reviews: 9, hires: 15, area: "서울 용산구, 마포구", tags: ["청소","주간전문"], services: ["먼지 청소","일반 청소"], appeal: "청소는 저한테 맡겨두세요" },
  { id: "4", name: "삼색이", spec: "야간 순찰", rating: 4.0, reviews: 5, hires: 8, area: "서울 은평구, 종로구", tags: ["야간순찰","경비"], services: ["야간 순찰","해충 탐지"], appeal: "야간 전문 순찰로 안전을 지킵니다" },
  { id: "5", name: "호랑이", spec: "창고 해충", rating: 3.9, reviews: 3, hires: 5, area: "경기 고양시", tags: ["창고전문","해충"], services: ["창고 방역","해충 처리"], appeal: "창고 전문 해충 처리사입니다" },
  { id: "6", name: "흰둥이", spec: "전문 청소", rating: 3.8, reviews: 7, hires: 12, area: "서울 노원구", tags: ["청소전문","성실"], services: ["전문 청소","먼지 제거"], appeal: "성실하고 꼼꼼한 청소 전문가" },
  { id: "7", name: "점박이", spec: "바퀴벌레 전문", rating: 3.7, reviews: 4, hires: 6, area: "인천 남동구", tags: ["바퀴벌레","해충"], services: ["바퀴벌레 박멸"], appeal: "해충 걱정 없는 집 만들어 드립니다" },
  { id: "8", name: "복순이", spec: "주간 청소", rating: 3.6, reviews: 2, hires: 3, area: "서울 송파구", tags: ["청소","주간"], services: ["주간 청소","먼지 제거"], appeal: "낮 시간 청소 전문입니다" },
];

export const HIRE_RECORDS: HireRecord[] = [
  { id: "1", catId: "1", catName: "치즈", spec: "해충박멸", date: "04.05", status: "업무완료" },
  { id: "2", catId: "2", catName: "나비", spec: "청소", date: "03.28", status: "보상완료" },
  { id: "3", catId: "3", catName: "고등어", spec: "쥐퇴치", date: "03.10", status: "업무완료" },
  { id: "4", catId: "4", catName: "삼색이", spec: "야간순찰", date: "02.28", status: "보상완료" },
  { id: "5", catId: "5", catName: "호랑이", spec: "창고해충", date: "02.15", status: "보상완료" },
];

export const MESSAGES: Message[] = [
  { id: "1", name: "치즈", preview: "지금 출발할게요! 주방 쪽 준비해 주세요", time: "22:10", unread: 2, active: true },
  { id: "2", name: "박지수", preview: "다음 주 일정 확인 부탁드려요", time: "21:45", unread: 0 },
  { id: "3", name: "나비", preview: "바퀴벌레 처리 완료했습니다", time: "어제", unread: 0 },
  { id: "4", name: "고등어", preview: "견적서 보내드렸어요", time: "어제", unread: 0 },
  { id: "5", name: "삼색이", preview: "야간 출동 가능합니다", time: "3일 전", unread: 0 },
  { id: "6", name: "흰둥이", preview: "청소 일정 잡아드릴게요", time: "4일 전", unread: 0 },
];

export const CHAT_MESSAGES: ChatMessage[] = [
  { id: "1", text: "박지수님, 지금 출발합니다! 주방 쪽 창문 잠겨있으면 열어두세요.", fromSelf: false, time: "22:00" },
  { id: "2", text: "네 알겠어요! 준비해 놓을게요.", fromSelf: true, time: "22:01" },
  { id: "3", text: "도착했습니다. 시작하겠습니다.", fromSelf: false, time: "22:10" },
  { id: "4", text: "쥐 발견! 추적 중입니다.", fromSelf: false, time: "22:30" },
  { id: "5", text: "수고하세요!", fromSelf: true, time: "22:31" },
  { id: "6", text: "작업 완료했습니다. 두 마리 처리했어요.", fromSelf: false, time: "22:55" },
];

export const ACTIVITY_LOG = [
  { time: "22:10", action: "주방 구역 순찰 시작" },
  { time: "22:30", action: "쥐 1마리 발견 및 추적 중" },
  { time: "22:55", action: "쥐 처리 완료" },
  { time: "23:10", action: "2구역 이동 중" },
  { time: "23:30", action: "창고 점검 완료" },
  { time: "23:50", action: "야간 순찰 마무리 중" },
];

export const STATUS_COLORS: Record<string, string> = {
  "업무예정": "bg-bw text-td",
  "업무중":   "bg-p text-white",
  "업무완료": "bg-pl text-td",
  "보상완료": "bg-green-100 text-td",
};
