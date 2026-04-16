"use client";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Badge from "@/components/Badge";
import { useState } from "react";

const ITEMS = [
  { label: "대시보드" },
  { label: "업무 현황" },
  { label: "수익 내역" },
  { label: "프로필 관리" },
  { label: "설정" },
];

const JOBS = [
  { employer: "박지수 의뢰", spec: "해충박멸(쥐)", date: "04.07", status: "업무중" },
  { employer: "김민준 의뢰", spec: "청소", date: "04.03", status: "업무완료" },
  { employer: "이서영 의뢰", spec: "바퀴벌레", date: "03.28", status: "보상완료" },
  { employer: "정다운 의뢰", spec: "야간순찰", date: "03.15", status: "보상완료" },
];

const REVIEWS = [
  { employer: "박지수", stars: 5, comment: "쥐 퇴치 완벽합니다!" },
  { employer: "김민준", stars: 4, comment: "신속하고 깔끔해요" },
  { employer: "이서영", stars: 5, comment: "또 부탁드려요" },
];

export default function HelperMyPage() {
  const router = useRouter();
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="h-full flex">
      <Sidebar
        name="박지수"
        role="가사도우미"
        items={ITEMS}
        activeIdx={activeIdx}
        onSelect={setActiveIdx}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {activeIdx === 0 && (
          <>
            <div className="bg-white flex h-[72px] items-center px-10 flex-shrink-0 border-b border-bw">
              <h1 className="text-[22px] font-bold text-td">가사도우미 대시보드</h1>
            </div>

            <div className="bg-bg flex h-[100px] items-center flex-shrink-0 border-b border-bw">
              {[
                { label: "총 고용", value: "45" },
                { label: "평균 평점", value: "4.8" },
                { label: "총 수익", value: "₩225K" },
                { label: "진행 중", value: "2" },
              ].map((s, i, arr) => (
                <div key={s.label} className={`flex-1 flex flex-col items-center gap-2 py-4 ${i < arr.length - 1 ? "border-r border-bw" : ""}`}>
                  <p className="text-[30px] font-bold text-td">{s.value}</p>
                  <p className="text-[13px] text-tl">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-1 min-h-0">
              {/* Left: 어필 + 업무현황 */}
              <div className="flex-1 flex flex-col gap-4 pl-10 pr-6 py-6 overflow-y-auto">
                <h2 className="text-[18px] font-bold text-td flex-shrink-0">나의 한줄 어필</h2>
                <div className="bg-white h-[60px] rounded-xl flex items-center justify-between px-6 flex-shrink-0">
                  <p className="text-[15px] text-td">"쥐 잡기 5년 경력! 야간 출동 환영합니다"</p>
                  <button className="text-[14px] font-medium text-p hover:underline">수정</button>
                </div>

                <h2 className="text-[18px] font-bold text-td flex-shrink-0 mt-2">업무 현황</h2>
                {JOBS.map((job, i) => (
                  <div key={i} className="bg-white h-[60px] rounded-xl flex items-center pl-[14px] pr-5 gap-3 flex-shrink-0">
                    <div className="w-11 h-11 rounded-full bg-av flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[16px] font-bold text-td">{job.employer}</p>
                      <p className="text-[13px] text-tl">{job.spec} · {job.date}</p>
                    </div>
                    <Badge status={job.status as any} />
                  </div>
                ))}
              </div>

              <div className="bg-bw w-px flex-shrink-0" />

              {/* Right: 수익 + 최근 평가 */}
              <div className="flex-1 flex flex-col gap-4 p-6 overflow-y-auto bg-bg">
                <h2 className="text-[18px] font-bold text-td flex-shrink-0">이번 달 수익</h2>
                <p className="text-[40px] font-bold text-p leading-none flex-shrink-0">₩78,000</p>
                <p className="text-[14px] text-tl flex-shrink-0">전월 대비 +12%</p>

                <div className="bg-bw h-px flex-shrink-0" />

                <h2 className="text-[18px] font-bold text-td flex-shrink-0">최근 수신 평가</h2>
                {REVIEWS.map((r, i) => (
                  <div key={i} className="bg-white rounded-xl px-5 py-3 flex flex-col gap-2 flex-shrink-0">
                    <p className="text-[14px] text-tl">
                      {r.employer} · {"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}
                    </p>
                    <p className="text-[15px] text-td">{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeIdx > 0 && (
          <div className="flex-1 flex flex-col p-8 gap-4 overflow-y-auto">
            <h1 className="text-[26px] font-bold text-td">{ITEMS[activeIdx].label}</h1>
            <div className="bg-white rounded-2xl p-12 flex items-center justify-center">
              <p className="text-tl text-[15px]">해당 기능은 준비 중입니다.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
