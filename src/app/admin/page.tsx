"use client";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { CATS, HIRE_RECORDS, ACTIVITY_LOG } from "@/lib/mock";
import Badge from "@/components/Badge";
import { useState } from "react";

const ITEMS = [
  { label: "대시보드" },
  { label: "고양이 관리" },
  { label: "고용 관리" },
  { label: "회원 관리" },
  { label: "정산 관리" },
  { label: "신고 관리" },
];

export default function AdminPage() {
  const router = useRouter();
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="h-screen flex">
      <Sidebar
        name="관리자"
        role="슈퍼 어드민"
        items={ITEMS}
        activeIdx={activeIdx}
        onSelect={setActiveIdx}
        orange
      />

      <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6 bg-bg">
        {/* Dashboard */}
        {activeIdx === 0 && (
          <>
            <div className="flex items-center justify-between">
              <h1 className="text-[26px] font-bold text-td">관리자 대시보드</h1>
              <button
                onClick={() => router.push("/")}
                className="text-[14px] text-tl hover:text-p transition-colors"
              >
                ← 사용자 화면으로
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "등록 고양이", value: CATS.length + "마리", icon: "🐱", color: "text-p" },
                { label: "전체 고용", value: "142건", icon: "📋", color: "text-td" },
                { label: "이번 달 수익", value: "2,840,000원", icon: "💰", color: "text-green-600" },
                { label: "활성 유저", value: "38명", icon: "👤", color: "text-blue-500" },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-2xl p-5 flex flex-col gap-2">
                  <span className="text-2xl">{s.icon}</span>
                  <p className={`text-[26px] font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-[13px] text-tm">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-6">
              {/* Recent hires */}
              <div className="flex-1 bg-white rounded-2xl p-6 flex flex-col gap-4">
                <h2 className="text-[18px] font-bold text-td">최근 고용 현황</h2>
                <div className="flex flex-col gap-2">
                  {HIRE_RECORDS.map((rec) => (
                    <div key={rec.id} className="flex items-center gap-4 py-2 border-b border-bg last:border-0">
                      <div className="w-9 h-9 rounded-full bg-av flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-[14px] font-medium text-td">{rec.catName}</p>
                        <p className="text-[12px] text-tl">{rec.spec} · {rec.date}</p>
                      </div>
                      <Badge status={rec.status} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity */}
              <div className="w-[280px] flex-shrink-0 bg-white rounded-2xl p-6 flex flex-col gap-4">
                <h2 className="text-[18px] font-bold text-td">시스템 활동</h2>
                <div className="flex flex-col gap-3">
                  {ACTIVITY_LOG.map((log, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-p rounded-full flex-shrink-0 mt-1.5" />
                      <div>
                        <p className="text-[13px] text-td">{log.action}</p>
                        <p className="text-[11px] text-tl">{log.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Cat management */}
        {activeIdx === 1 && (
          <>
            <div className="flex items-center justify-between">
              <h1 className="text-[26px] font-bold text-td">고양이 관리</h1>
              <button className="bg-p text-white text-[14px] font-medium px-5 h-10 rounded-xl hover:brightness-105 transition-all">
                + 고양이 등록
              </button>
            </div>

            {/* Search & filter */}
            <div className="flex gap-3">
              <input
                placeholder="고양이 검색..."
                className="h-10 px-4 rounded-xl border border-bw bg-white text-[14px] text-td focus:outline-none focus:border-p w-72"
              />
              <select className="h-10 px-4 rounded-xl border border-bw bg-white text-[14px] text-td focus:outline-none focus:border-p">
                <option>전체 상태</option>
                <option>활성</option>
                <option>대기</option>
                <option>정지</option>
              </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-bg">
                    {["이름", "전문 분야", "활동 지역", "평점", "고용 수", "상태", "관리"].map((h) => (
                      <th key={h} className="text-left px-5 py-4 text-[13px] font-medium text-tl">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CATS.map((cat) => (
                    <tr key={cat.id} className="border-b border-bg last:border-0 hover:bg-bg transition-all">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-av flex-shrink-0" />
                          <span className="text-[14px] font-medium text-td">{cat.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-[14px] text-tm">{cat.spec}</td>
                      <td className="px-5 py-4 text-[14px] text-tm">{cat.area.split(",")[0]}</td>
                      <td className="px-5 py-4 text-[14px] text-p font-medium">★{cat.rating}</td>
                      <td className="px-5 py-4 text-[14px] text-td">{cat.hires}회</td>
                      <td className="px-5 py-4">
                        <span className="bg-green-100 text-green-700 text-[12px] font-medium px-3 h-6 rounded-full flex items-center w-fit">
                          활성
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <button className="text-[13px] text-p hover:underline">수정</button>
                          <button className="text-[13px] text-red hover:underline">정지</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Other tabs - placeholder */}
        {activeIdx > 1 && (
          <div className="flex flex-col gap-4">
            <h1 className="text-[26px] font-bold text-td">{ITEMS[activeIdx].label}</h1>
            <div className="bg-white rounded-2xl p-16 flex items-center justify-center">
              <p className="text-tl text-[15px]">해당 기능은 준비 중입니다.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
