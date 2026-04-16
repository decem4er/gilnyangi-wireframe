"use client";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { HIRE_RECORDS } from "@/lib/mock";
import GNB from "@/components/GNB";
import { useState } from "react";

const RATING_CATEGORIES = [
  { key: "environment", label: "작업 환경", desc: "청결, 안전, 편의시설" },
  { key: "communication", label: "소통", desc: "지시 명확성, 응답 속도" },
  { key: "payment", label: "보상 지급", desc: "약속된 보상 이행" },
  { key: "rehire", label: "재고용 의사", desc: "다시 일하고 싶은 고용인" },
];

export default function CatReviewPage() {
  const router = useRouter();
  const { selectedCat } = useStore();

  const rec = HIRE_RECORDS[0];

  const [scores, setScores] = useState<Record<string, number>>({
    environment: 5, communication: 4, payment: 5, rehire: 4,
  });
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const avgScore = (Object.values(scores).reduce((a, b) => a + b, 0) / RATING_CATEGORIES.length).toFixed(1);

  const handleSubmit = () => setSubmitted(true);

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      {/* 모바일 back-nav GNB (M15) */}
      <header className="md:hidden bg-white h-14 flex items-center justify-between px-5 flex-shrink-0 border-b border-bw">
        <button
          onClick={() => router.back()}
          className="text-[14px] font-medium text-p"
        >
          ← 뒤로
        </button>
        <span className="text-[16px] font-bold text-td">고용인 평가</span>
        <div className="w-10" />
      </header>

      {/* 태블릿/데스크톱 표준 GNB (T15/D15) */}
      <div className="hidden md:block">
        <GNB />
      </div>

      {/* Content */}
      <main className="flex-1 overflow-auto">
        {submitted ? (
          <div className="max-w-[700px] md:max-w-[800px] mx-auto px-5 md:px-8 py-12 md:py-16 flex flex-col items-center gap-8">
            <div className="w-24 h-24 bg-pl rounded-full flex items-center justify-center text-5xl">🐱</div>
            <div className="text-center flex flex-col gap-2">
              <h1 className="text-[28px] font-bold text-td">평가 완료!</h1>
              <p className="text-[15px] text-tm">박지수님에 대한 평가가 등록되었습니다.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 w-full flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-medium text-td">평균 점수</span>
                <span className="text-[24px] font-bold text-p">★ {avgScore}</span>
              </div>
              {RATING_CATEGORIES.map(cat => (
                <div key={cat.key} className="flex items-center justify-between py-2 border-b border-bg last:border-0">
                  <span className="text-[14px] text-tm">{cat.label}</span>
                  <span className="text-[14px] text-p">{"★".repeat(scores[cat.key])}{"☆".repeat(5 - scores[cat.key])}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3 w-full">
              <button onClick={() => router.push("/records")} className="py-3 bg-p text-white rounded-xl font-bold text-[16px] hover:brightness-105 transition-all">
                고용내역으로
              </button>
              <button onClick={() => router.push("/home")} className="h-11 text-tl text-[14px] hover:text-tm transition-all">
                홈으로
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-[700px] md:max-w-[800px] mx-auto px-5 md:px-8 py-6 md:py-10 flex flex-col gap-5 md:gap-6">
            {/* 데스크톱에서만 제목 표시 (모바일은 GNB에 있음) */}
            <h1 className="hidden md:block text-[26px] font-bold text-td">고용인 평가</h1>

            {/* 고용인 카드 */}
            <div className="bg-white rounded-2xl p-4 md:p-5 flex items-center gap-3 md:gap-4">
              <div className="w-[52px] h-[52px] md:w-16 md:h-16 rounded-full bg-av flex-shrink-0" />
              <div className="flex-1 flex flex-col gap-1">
                <h2 className="text-[16px] md:text-[20px] font-bold text-td">박지수</h2>
                <p className="text-[13px] md:text-[14px] text-tm">{rec.spec} · {rec.date} · 서울 마포구 합정동</p>
                <span className="md:hidden bg-pl text-p text-[11px] font-medium px-2 h-6 rounded-full flex items-center w-fit">업무완료</span>
              </div>
              <span className="hidden md:flex bg-pl text-p text-[12px] font-medium px-3 h-7 rounded-full items-center">업무완료</span>
            </div>

            {/* 항목별 평가 */}
            <div className="bg-white rounded-2xl px-5 md:px-6 pt-4 md:pt-6 pb-2 md:pb-4 flex flex-col">
              <h2 className="text-[15px] md:text-[18px] font-bold text-td mb-3 md:mb-4">항목별 평가</h2>
              <div className="h-px bg-bw" />
              {RATING_CATEGORIES.map((cat, i) => (
                <div key={cat.key} className={`py-4 md:py-5 flex items-center justify-between ${i < RATING_CATEGORIES.length - 1 ? "border-b border-bw" : ""}`}>
                  <p className="text-[14px] md:text-[15px] font-medium text-td">{cat.label}</p>
                  <div className="flex gap-1 md:gap-1.5">
                    {[1, 2, 3, 4, 5].map(s => (
                      <button
                        key={s}
                        onClick={() => setScores(prev => ({ ...prev, [cat.key]: s }))}
                        className={`text-[18px] md:text-[22px] transition-all hover:scale-110 ${s <= scores[cat.key] ? "text-p" : "text-bw"}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 총평 */}
            <div className="bg-white rounded-2xl p-4 md:p-6 flex flex-col gap-3">
              <h2 className="text-[15px] md:text-[18px] font-bold text-td">총평 <span className="text-[13px] font-normal text-tl">(선택)</span></h2>
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                rows={4}
                placeholder="고용인에 대한 솔직한 후기를 남겨주세요"
                className="px-4 py-3 rounded-xl border border-bw bg-bg text-[13px] md:text-[14px] text-td focus:outline-none focus:border-p resize-none"
              />
              <p className="text-[12px] text-tl text-right">{comment.length} / 300자</p>
            </div>

            {/* 제출 */}
            <button
              onClick={handleSubmit}
              className="h-[52px] md:h-14 bg-p text-white rounded-[14px] font-bold text-[16px] hover:brightness-105 transition-all"
            >
              평가 제출하기
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
