"use client";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { CATS, ACTIVITY_LOG } from "@/lib/mock";
import { useEffect, useState } from "react";

export default function MonitorPage() {
  const router = useRouter();
  const { selectedCat } = useStore();
  const cat = selectedCat ?? CATS[0];

  const [time, setTime] = useState(new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }));
  const [logs, setLogs] = useState(ACTIVITY_LOG);
  const [newAlert, setNewAlert] = useState(false);

  // 실시간 시계
  useEffect(() => {
    const t = setInterval(() => {
      setTime(new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="h-full flex">
      {/* Left — 영상 + 상태 + 버튼 */}
      <div className="flex-1 flex flex-col bg-td">
        {/* 영상 영역 */}
        <div className="flex-1 relative bg-av flex items-center justify-center overflow-hidden">
          {/* 카메라 피드 플레이스홀더 */}
          <div className="flex flex-col items-center gap-4 text-white/40">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <rect x="8" y="20" width="64" height="44" rx="6" stroke="currentColor" strokeWidth="3"/>
              <circle cx="40" cy="42" r="12" stroke="currentColor" strokeWidth="3"/>
              <path d="M56 20l8-10h8v10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            <p className="text-[18px] font-medium">실시간 영상 연결 중...</p>
          </div>

          {/* 오버레이 — 상단 정보 */}
          <div className="absolute top-5 left-5 flex items-center gap-2 bg-black/50 rounded-xl px-4 py-2">
            <div className="w-2.5 h-2.5 bg-red rounded-full animate-pulse" />
            <span className="text-white text-[14px] font-medium">LIVE</span>
            <span className="text-white/60 text-[14px] ml-2">{time}</span>
          </div>

          {/* 오버레이 — 우상단 닫기 */}
          <div className="absolute top-5 right-5 flex gap-2">
            <button
              onClick={() => router.push("/home")}
              className="bg-black/50 text-white text-[13px] px-4 h-9 rounded-xl hover:bg-black/70 transition-all"
            >
              ✕ 닫기
            </button>
          </div>

          {/* 오버레이 — 고양이 위치 핀 */}
          <div className="absolute bottom-32 left-1/3 flex flex-col items-center">
            <div className="bg-p text-white text-[12px] font-bold px-3 py-1 rounded-lg shadow-lg">
              {cat.name} · 주방 구역
            </div>
            <div className="w-2 h-2 bg-p rotate-45 -mt-1 shadow" />
          </div>
        </div>

        {/* 상태 바 */}
        <div className="bg-pl flex items-center gap-4 px-8 h-[72px] flex-shrink-0">
          <div className="w-3.5 h-3.5 bg-p rounded-full animate-pulse flex-shrink-0" />
          <span className="text-[16px] font-medium text-td">
            활동 중 &nbsp;•&nbsp; 주방 구역 &nbsp;•&nbsp; 쥐 탐색 중
          </span>
          <span className="ml-auto text-[14px] text-tm">업무 시작: 22:00</span>
        </div>

        {/* 버튼 */}
        <div className="flex flex-shrink-0">
          <button
            onClick={() => router.push("/messages")}
            className="flex-1 h-14 bg-pl text-td text-[15px] font-medium hover:brightness-97 transition-all"
          >
            💬 메시지 보내기
          </button>
          <button
            onClick={() => router.push("/cat-review")}
            className="flex-1 h-14 bg-p text-white text-[15px] font-bold hover:brightness-105 transition-all"
          >
            업무 완료 · 고용인 평가
          </button>
        </div>
      </div>

      {/* Right — 활동 로그 */}
      <div className="w-[460px] flex-shrink-0 bg-white flex flex-col">
        {/* 헤더 */}
        <div className="px-8 pt-7 pb-4 border-b border-bw flex items-center justify-between">
          <h2 className="text-[20px] font-bold text-td">활동 로그</h2>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-[13px] text-tl">실시간 업데이트 중</span>
          </div>
        </div>

        {/* 로그 목록 */}
        <div className="flex-1 overflow-y-auto px-8 py-5 flex flex-col gap-0">
          {logs.map((log, i) => (
            <div key={i} className="flex gap-4 pb-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 bg-p rounded-full flex-shrink-0 mt-0.5" />
                {i < logs.length - 1 && <div className="w-0.5 flex-1 bg-bw mt-1" />}
              </div>
              <div className="pb-1">
                <p className="text-[13px] text-tl mb-0.5">{log.time}</p>
                <p className="text-[15px] text-td">{log.action}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 알림 배너 */}
        <div className="mx-6 mb-5 bg-[#FEF3E2] border border-p/30 rounded-xl px-5 py-4">
          <p className="text-[14px] font-medium text-td">
            🔔 [알림] {cat.name}가 쥐를 처리 완료했습니다
          </p>
          <p className="text-[12px] text-tl mt-1">22:55</p>
        </div>

        {/* 고양이 정보 */}
        <div className="border-t border-bw px-8 py-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-av flex-shrink-0" />
          <div className="flex-1">
            <p className="text-[15px] font-bold text-td">{cat.name}</p>
            <p className="text-[13px] text-tm">{cat.spec}</p>
          </div>
          <button
            onClick={() => router.push(`/cats/${cat.id}`)}
            className="text-[13px] text-p hover:underline"
          >
            프로필 보기
          </button>
        </div>
      </div>
    </div>
  );
}
