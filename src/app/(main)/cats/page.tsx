"use client";
import { useState } from "react";
import { CATS } from "@/lib/mock";
import CatCard from "@/components/CatCard";

const FILTERS = ["전체", "쥐 퇴치", "바퀴벌레 박멸", "청소", "야간 순찰", "창고 방역"];

export default function CatsPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("전체");

  const filtered = CATS.filter((cat) => {
    const matchFilter = activeFilter === "전체" || cat.services.some((s) => s.includes(activeFilter.replace(" 박멸", "").replace(" 퇴치", "")));
    const matchQuery = !query || cat.name.includes(query) || cat.spec.includes(query) || cat.area.includes(query);
    return matchFilter && matchQuery;
  });

  return (
    <div className="h-full flex">
      {/* Map area */}
      <div className="flex-1 bg-map relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🗺️</div>
            <p className="text-tm text-[15px]">지도 영역</p>
            <p className="text-tl text-[13px]">서울 · 경기 지역 고양이 분포</p>
          </div>
        </div>
        {/* Map pins */}
        {[
          { x: "30%", y: "40%", cat: CATS[0] },
          { x: "55%", y: "35%", cat: CATS[1] },
          { x: "45%", y: "60%", cat: CATS[2] },
          { x: "25%", y: "55%", cat: CATS[3] },
          { x: "70%", y: "50%", cat: CATS[4] },
        ].map((pin, i) => (
          <div
            key={i}
            className="absolute flex flex-col items-center cursor-pointer"
            style={{ left: pin.x, top: pin.y, transform: "translate(-50%, -100%)" }}
          >
            <div className="bg-p text-white text-[12px] font-bold px-2 py-1 rounded-lg shadow">
              {pin.cat.name}
            </div>
            <div className="w-2 h-2 bg-p rotate-45 -mt-1" />
          </div>
        ))}
      </div>

      {/* Right panel */}
      <div className="w-[420px] flex-shrink-0 flex flex-col bg-bg border-l border-bw">
        {/* Search */}
        <div className="p-4 border-b border-bw">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="이름, 전문 분야, 지역 검색..."
            className="w-full h-11 px-4 rounded-xl border border-bw bg-white text-[14px] text-td focus:outline-none focus:border-p"
          />
        </div>

        {/* Filters */}
        <div className="px-4 py-3 border-b border-bw flex gap-2 overflow-x-auto">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex-shrink-0 px-3 h-8 rounded-full text-[13px] font-medium transition-all ${
                activeFilter === f ? "bg-p text-white" : "bg-white text-tm border border-bw hover:border-p"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          <p className="text-[13px] text-tl">{filtered.length}마리 검색됨</p>
          {filtered.map((cat) => (
            <CatCard key={cat.id} cat={cat} compact />
          ))}
        </div>
      </div>
    </div>
  );
}
