"use client";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { CATS, HIRE_RECORDS } from "@/lib/mock";
import CatCard from "@/components/CatCard";
import Badge from "@/components/Badge";

export default function HomePage() {
  const router = useRouter();
  const { selectCat } = useStore();

  const activeCat = CATS[0]; // 치즈 - 업무중
  const recommended = CATS.slice(0, 4);

  return (
    <div className="max-w-[1200px] mx-auto px-8 py-8 flex flex-col gap-8">
      {/* Active task banner */}
      <div className="bg-p rounded-2xl p-6 flex items-center gap-6 text-white">
        <div className="w-16 h-16 rounded-full bg-white/20 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-[13px] text-orange-100 mb-1">현재 업무 중</p>
          <h2 className="text-[22px] font-bold">{activeCat.name} · {activeCat.spec}</h2>
          <p className="text-[14px] text-orange-100 mt-1">오늘 22:00 출동 · 마포구 합정동</p>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => { selectCat(activeCat); router.push("/monitor"); }}
            className="bg-white text-p font-bold text-[14px] px-5 h-10 rounded-xl hover:brightness-95 transition-all"
          >
            모니터링 보기
          </button>
          <button
            onClick={() => router.push("/messages")}
            className="bg-white/20 text-white font-medium text-[14px] px-5 h-10 rounded-xl hover:bg-white/30 transition-all"
          >
            메시지 보내기
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Left column */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Recommended cats */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[20px] font-bold text-td">추천 고양이</h2>
              <button onClick={() => router.push("/cats")} className="text-[14px] text-p hover:underline">
                전체 보기
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {recommended.map((cat) => (
                <CatCard key={cat.id} cat={cat} />
              ))}
            </div>
          </section>

          {/* Recent hire records */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[20px] font-bold text-td">최근 고용내역</h2>
              <button onClick={() => router.push("/records")} className="text-[14px] text-p hover:underline">
                전체 보기
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {HIRE_RECORDS.slice(0, 3).map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => router.push(`/records/${rec.id}`)}
                  className="bg-white rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:brightness-97 transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-av flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-[16px] font-bold text-td">{rec.catName}</p>
                    <p className="text-[13px] text-tm">{rec.spec} · {rec.date}</p>
                  </div>
                  <Badge status={rec.status} />
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right column */}
        <div className="w-[300px] flex-shrink-0 flex flex-col gap-4">
          {/* My stats */}
          <div className="bg-white rounded-2xl p-5 flex flex-col gap-4">
            <h3 className="text-[16px] font-bold text-td">내 활동 요약</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "총 고용", value: "5회" },
                { label: "이번 달", value: "2회" },
                { label: "즐겨찾기", value: "3마리" },
                { label: "리뷰 작성", value: "4건" },
              ].map((s) => (
                <div key={s.label} className="bg-pl rounded-xl p-3 flex flex-col gap-1">
                  <p className="text-[12px] text-tm">{s.label}</p>
                  <p className="text-[20px] font-bold text-p">{s.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick menu */}
          <div className="bg-white rounded-2xl p-5 flex flex-col gap-3">
            <h3 className="text-[16px] font-bold text-td">빠른 메뉴</h3>
            {[
              { label: "고양이 탐색하기", icon: "🔍", path: "/cats" },
              { label: "고용내역 보기", icon: "📋", path: "/records" },
              { label: "메시지함", icon: "💬", path: "/messages" },
              { label: "마이페이지", icon: "👤", path: "/mypage" },
            ].map((m) => (
              <button
                key={m.path}
                onClick={() => router.push(m.path)}
                className="flex items-center gap-3 h-12 px-4 bg-bg rounded-xl hover:bg-pl transition-all text-left"
              >
                <span>{m.icon}</span>
                <span className="text-[14px] font-medium text-td">{m.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
