"use client";
import { useRouter } from "next/navigation";
import { HIRE_RECORDS, CATS } from "@/lib/mock";
import Badge from "@/components/Badge";
import { useState } from "react";

const TABS = ["전체", "업무예정", "업무중", "업무완료", "보상완료"];

export default function RecordsPage() {
  const router = useRouter();
  const [tab, setTab] = useState("전체");

  const filtered = HIRE_RECORDS.filter((r) => tab === "전체" || r.status === tab);

  return (
    <div className="max-w-[900px] mx-auto px-8 py-8 flex flex-col gap-6">
      <h1 className="text-[26px] font-bold text-td">고용내역</h1>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-bw">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 h-11 text-[14px] font-medium border-b-2 transition-all ${
              tab === t ? "border-p text-p" : "border-transparent text-tl hover:text-td"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Records list */}
      <div className="flex flex-col gap-3">
        {filtered.length === 0 && (
          <div className="text-center py-16 text-tl">해당 상태의 고용내역이 없습니다.</div>
        )}
        {filtered.map((rec) => {
          const cat = CATS.find((c) => c.id === rec.catId);
          return (
            <div
              key={rec.id}
              onClick={() => router.push(`/records/${rec.id}`)}
              className="bg-white rounded-2xl p-6 flex items-center gap-6 cursor-pointer hover:brightness-97 transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-av flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-[18px] font-bold text-td">{rec.catName}</h3>
                  <Badge status={rec.status} />
                </div>
                <p className="text-[14px] text-tm">{rec.spec}</p>
                <p className="text-[13px] text-tl mt-1">📅 {rec.date} · 📍 {cat?.area ?? "서울"}</p>
              </div>
              <div className="flex flex-col gap-2">
                {rec.status === "업무중" && (
                  <button
                    onClick={(e) => { e.stopPropagation(); router.push("/monitor"); }}
                    className="bg-p text-white text-[13px] font-medium px-4 h-9 rounded-lg hover:brightness-110 transition-all"
                  >
                    모니터링
                  </button>
                )}
                {rec.status === "업무완료" && (
                  <button
                    onClick={(e) => { e.stopPropagation(); router.push(`/records/${rec.id}?tab=review`); }}
                    className="bg-pl text-p text-[13px] font-medium px-4 h-9 rounded-lg hover:brightness-97 transition-all"
                  >
                    리뷰 작성
                  </button>
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); router.push("/messages"); }}
                  className="border border-bw text-tm text-[13px] px-4 h-9 rounded-lg hover:border-p hover:text-p transition-all"
                >
                  메시지
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
