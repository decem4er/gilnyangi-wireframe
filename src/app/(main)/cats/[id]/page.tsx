"use client";
import { useParams, useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { CATS } from "@/lib/mock";

export default function CatDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { selectCat } = useStore();
  const cat = CATS.find((c) => c.id === id) ?? CATS[0];

  const hire = () => {
    selectCat(cat);
    router.push("/hire");
  };

  const REVIEWS = [
    { user: "박지수", score: 5, text: "정말 신속하게 처리해 주셨어요. 쥐가 사라졌습니다!", date: "04.01" },
    { user: "김민준", score: 5, text: "야간에도 성실하게 일해주셨어요. 재고용 예정입니다.", date: "03.15" },
    { user: "이수현", score: 4, text: "깔끔하게 처리해 주셨어요. 만족합니다.", date: "02.28" },
  ];

  return (
    <div className="max-w-[900px] mx-auto px-8 py-8 flex flex-col gap-6">
      {/* Back */}
      <button onClick={() => router.back()} className="text-[14px] text-p hover:underline self-start">
        ← 탐색으로 돌아가기
      </button>

      {/* Header */}
      <div className="bg-white rounded-2xl p-8 flex gap-8">
        <div className="w-28 h-28 rounded-full bg-av flex-shrink-0" />
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-[28px] font-bold text-td">{cat.name}</h1>
              <p className="text-[16px] text-tm mt-1">{cat.spec}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[22px] font-bold text-p">★{cat.rating}</span>
              <span className="text-[13px] text-tl">리뷰 {cat.reviews}건 · 고용 {cat.hires}회</span>
            </div>
          </div>
          <p className="text-[14px] text-tm">📍 {cat.area}</p>
          <div className="flex flex-wrap gap-2">
            {cat.tags.map((t) => (
              <span key={t} className="bg-pl text-p text-[12px] font-medium px-3 h-7 rounded-full flex items-center">
                {t}
              </span>
            ))}
          </div>
          <p className="text-[15px] text-td bg-bg rounded-xl p-3">"{cat.appeal}"</p>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Left */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Services */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-[18px] font-bold text-td mb-4">제공 서비스</h2>
            <div className="flex flex-col gap-2">
              {cat.services.map((s) => (
                <div key={s} className="flex items-center gap-3 py-2 border-b border-bg last:border-0">
                  <span className="text-p">✓</span>
                  <span className="text-[15px] text-td">{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-[18px] font-bold text-td mb-4">리뷰 ({cat.reviews})</h2>
            <div className="flex flex-col gap-4">
              {REVIEWS.map((r, i) => (
                <div key={i} className="flex flex-col gap-1 pb-4 border-b border-bg last:border-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-medium text-td">{r.user}</span>
                    <span className="text-[13px] text-tl">{r.date}</span>
                  </div>
                  <span className="text-[13px] text-p">{"★".repeat(r.score)}</span>
                  <p className="text-[14px] text-tm">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right - hire card */}
        <div className="w-[280px] flex-shrink-0">
          <div className="bg-white rounded-2xl p-6 flex flex-col gap-4 sticky top-8">
            <h2 className="text-[18px] font-bold text-td">고용하기</h2>
            <div className="flex flex-col gap-2">
              {[
                { label: "쥐 퇴치 (4시간)", price: "80,000원" },
                { label: "야간 순찰 (8시간)", price: "120,000원" },
                { label: "창고 방역 (6시간)", price: "100,000원" },
              ].map((p) => (
                <div key={p.label} className="flex justify-between items-center py-2 border-b border-bg last:border-0">
                  <span className="text-[14px] text-td">{p.label}</span>
                  <span className="text-[14px] font-bold text-p">{p.price}</span>
                </div>
              ))}
            </div>
            <button
              onClick={hire}
              className="bg-p text-white rounded-xl font-bold text-[16px] h-13 py-3 hover:brightness-105 transition-all"
            >
              고용 신청
            </button>
            <button
              onClick={() => router.push("/messages")}
              className="bg-pl text-p rounded-xl font-medium text-[15px] h-11 hover:brightness-97 transition-all"
            >
              메시지 보내기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
