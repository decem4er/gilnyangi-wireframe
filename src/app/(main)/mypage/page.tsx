"use client";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import Sidebar from "@/components/Sidebar";
import { HIRE_RECORDS, CATS } from "@/lib/mock";
import Badge from "@/components/Badge";
import { useState } from "react";

const ITEMS = [
  { label: "대시보드" },
  { label: "고용 내역" },
  { label: "찜한 냥이" },
  { label: "결제 내역" },
  { label: "설정" },
];

const CAT_RATINGS = [
  { catName: "치즈", spec: "해충박멸", date: "04.05", avg: 4.5 },
  { catName: "나비", spec: "청소", date: "03.28", avg: 4.5 },
  { catName: "고등어", spec: "쥐퇴치", date: "03.10", avg: 3.8 },
];

export default function MyPage() {
  const router = useRouter();
  const { logout } = useStore();
  const [activeIdx, setActiveIdx] = useState(0);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="h-full flex">
      <Sidebar
        name="박지수"
        role="고용인"
        items={ITEMS}
        activeIdx={activeIdx}
        onSelect={setActiveIdx}
      />

      <div className="flex-1 flex flex-col overflow-hidden">

        {/* D09: 대시보드 */}
        {activeIdx === 0 && (
          <>
            <div className="bg-white flex h-[76px] items-center justify-between px-10 flex-shrink-0 border-b border-bw">
              <h1 className="text-[22px] font-bold text-td">대시보드</h1>
              <button className="text-[15px] font-medium text-p hover:underline">정보 수정</button>
            </div>

            <div className="bg-bg flex h-[108px] items-center flex-shrink-0 border-b border-bw">
              {[
                { label: "총 고용", value: "45" },
                { label: "진행 중", value: "3" },
                { label: "찜한 냥이", value: "5" },
                { label: "총 지출", value: "₩132K" },
              ].map((s, i, arr) => (
                <div key={s.label} className={`flex-1 flex flex-col items-center gap-2 py-5 ${i < arr.length - 1 ? "border-r border-bw" : ""}`}>
                  <p className="text-[32px] font-bold text-td">{s.value}</p>
                  <p className="text-[14px] text-tl">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-1 min-h-0">
              {/* Left: Recent hires + Cat Ratings */}
              <div className="flex-1 flex flex-col gap-3 pl-10 pr-7 py-6 overflow-y-auto">
                <h2 className="text-[18px] font-bold text-td flex-shrink-0">최근 고용 내역</h2>
                {HIRE_RECORDS.map((rec) => (
                  <div
                    key={rec.id}
                    onClick={() => router.push(`/records/${rec.id}`)}
                    className="bg-white h-[60px] rounded-xl flex items-center pl-[14px] pr-5 gap-3 cursor-pointer hover:brightness-97 transition-all flex-shrink-0"
                  >
                    <div className="w-11 h-11 rounded-full bg-av flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[16px] font-bold text-td">{rec.catName}</p>
                      <p className="text-[13px] text-tl">{rec.spec} · {rec.date}</p>
                    </div>
                    <Badge status={rec.status} />
                  </div>
                ))}

                {/* Cat Ratings */}
                <div className="bg-white rounded-xl px-4 py-5 mt-2 flex-shrink-0">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-[18px] font-bold text-td">고양이의 평가</h2>
                    <button onClick={() => router.push("/records")} className="text-[13px] text-p hover:underline">전체 보기</button>
                  </div>
                  {CAT_RATINGS.map((r, i, arr) => (
                    <div
                      key={r.catName}
                      onClick={() => router.push("/records")}
                      className={`flex items-center justify-between py-4 cursor-pointer hover:bg-bg rounded-xl px-2 transition-all ${i < arr.length - 1 ? "border-b border-bg" : ""}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-av flex-shrink-0" />
                        <div>
                          <p className="text-[15px] font-bold text-td">{r.catName}</p>
                          <p className="text-[13px] text-tm">{r.spec} · {r.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {[1,2,3,4,5].map(s => (
                          <span key={s} className={`text-[18px] ${s <= Math.floor(r.avg) ? "text-p" : "text-bw"}`}>★</span>
                        ))}
                        <span className="text-[14px] font-bold text-p ml-1">{r.avg}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-bw w-px flex-shrink-0" />

              {/* Right: Favorites */}
              <div className="flex-1 flex flex-col gap-[14px] p-6 overflow-y-auto">
                <h2 className="text-[18px] font-bold text-td flex-shrink-0">찜한 냥이</h2>
                <div className="flex flex-wrap gap-[14px]">
                  {CATS.slice(0, 5).map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => router.push(`/cats/${cat.id}`)}
                      className="bg-white flex flex-col items-center gap-2 p-[14px] rounded-[14px] cursor-pointer hover:brightness-97 transition-all"
                    >
                      <div className="w-16 h-16 rounded-full bg-av" />
                      <p className="text-[14px] font-medium text-td">{cat.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* D10: 고용 내역 */}
        {activeIdx === 1 && (
          <>
            <div className="bg-white flex h-[68px] items-center px-10 flex-shrink-0 border-b border-bw">
              <h1 className="text-[22px] font-bold text-td">고용 내역 및 찜한 냥이</h1>
            </div>

            <div className="flex flex-1 min-h-0">
              {/* Left: Hire history */}
              <div className="flex-1 flex flex-col gap-3 pl-10 pr-6 py-6 overflow-y-auto">
                <h2 className="text-[18px] font-bold text-td flex-shrink-0">고용 내역</h2>
                {HIRE_RECORDS.map((rec) => (
                  <div
                    key={rec.id}
                    onClick={() => router.push(`/records/${rec.id}`)}
                    className="bg-white h-[60px] rounded-xl flex items-center pl-[14px] pr-5 gap-3 cursor-pointer hover:brightness-97 transition-all flex-shrink-0"
                  >
                    <div className="w-11 h-11 rounded-full bg-av flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[16px] font-bold text-td">{rec.catName}</p>
                      <p className="text-[13px] text-tl">{rec.spec} · {rec.date}</p>
                    </div>
                    <Badge status={rec.status} />
                  </div>
                ))}
              </div>

              <div className="bg-bw w-px flex-shrink-0" />

              {/* Right: Favorites with hire buttons */}
              <div className="flex-1 flex flex-col gap-[14px] pl-6 pr-7 py-6 overflow-y-auto">
                <h2 className="text-[18px] font-bold text-td flex-shrink-0">찜한 냥이</h2>
                <div className="flex flex-wrap gap-4">
                  {CATS.slice(0, 6).map((cat) => (
                    <div key={cat.id} className="bg-white flex flex-col items-center gap-[10px] p-[14px] rounded-[14px]">
                      <div className="w-[68px] h-[68px] rounded-full bg-av" />
                      <p className="text-[14px] font-medium text-td">{cat.name}</p>
                      <button
                        onClick={() => router.push(`/cats/${cat.id}`)}
                        className="bg-p text-white text-[12px] font-medium px-3 h-7 rounded-[14px] hover:brightness-105 transition-all"
                      >
                        고용
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Other tabs: placeholder */}
        {activeIdx > 1 && (
          <div className="flex-1 flex flex-col p-8 gap-4 overflow-y-auto">
            <h1 className="text-[26px] font-bold text-td">{ITEMS[activeIdx].label}</h1>
            <div className="bg-white rounded-2xl p-12 flex items-center justify-center">
              <p className="text-tl text-[15px]">해당 기능은 준비 중입니다.</p>
            </div>
          </div>
        )}

        <div className="px-8 py-4 flex-shrink-0">
          <button onClick={handleLogout} className="text-[14px] text-red hover:underline">
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}
