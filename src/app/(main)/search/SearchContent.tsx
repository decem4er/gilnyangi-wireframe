"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CATS } from "@/lib/mock";
import CatCard from "@/components/CatCard";

export default function SearchContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const results = query.trim()
    ? CATS.filter(
        (c) =>
          c.name.includes(query) ||
          c.spec.includes(query) ||
          c.area.includes(query) ||
          c.tags.some((t) => t.includes(query))
      )
    : [];

  return (
    <div className="max-w-[900px] mx-auto px-8 py-8 flex flex-col gap-6">
      {/* Search bar */}
      <div className="flex gap-3">
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="고양이 이름, 전문 분야, 지역 검색..."
          className="flex-1 h-12 px-5 rounded-xl border border-bw bg-white text-td text-[15px] focus:outline-none focus:border-p"
        />
        <button
          onClick={() => setQuery("")}
          className="h-12 px-5 border border-bw rounded-xl text-tm text-[14px] hover:border-p hover:text-p transition-all"
        >
          초기화
        </button>
      </div>

      {/* 추천 태그 */}
      {!query && (
        <div className="flex flex-col gap-3">
          <p className="text-[14px] font-medium text-tm">추천 검색어</p>
          <div className="flex flex-wrap gap-2">
            {["쥐 퇴치", "바퀴벌레", "야간 순찰", "청소", "마포구", "강남구", "4.5 이상"].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-4 h-9 bg-white border border-bw text-td text-[13px] rounded-full hover:border-p hover:text-p transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {query.trim() && (
        <>
          <p className="text-[14px] text-tl">
            <span className="text-td font-medium">"{query}"</span> 검색 결과 {results.length}마리
          </p>
          {results.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-20 text-center">
              <span className="text-5xl">🔍</span>
              <p className="text-[16px] font-medium text-td">검색 결과가 없습니다</p>
              <p className="text-[14px] text-tl">다른 키워드로 검색해 보세요</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {results.map((cat) => (
                <CatCard key={cat.id} cat={cat} compact />
              ))}
            </div>
          )}
        </>
      )}

      {/* Recent searches placeholder */}
      {!query && (
        <div className="flex flex-col gap-3">
          <p className="text-[14px] font-medium text-tm">최근 검색</p>
          <div className="flex flex-col gap-2">
            {["치즈", "쥐 퇴치", "마포구"].map((s) => (
              <button
                key={s}
                onClick={() => setQuery(s)}
                className="flex items-center gap-3 h-11 px-4 bg-white rounded-xl hover:bg-pl transition-all text-left"
              >
                <span className="text-tl text-[16px]">🕐</span>
                <span className="text-[14px] text-td">{s}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
