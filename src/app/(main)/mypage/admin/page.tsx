"use client";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

const ITEMS = [
  { label: "대시보드" },
  { label: "회원 관리" },
  { label: "신고 제재" },
  { label: "시스템 설정" },
  { label: "로그" },
];

const MEMBER_ROWS = [
  { label: "고용인 목록", sub: "32명 등록", urgent: false },
  { label: "가사도우미 목록", sub: "28명 등록", urgent: false },
  { label: "신규 가입 검토", sub: "5명 대기", urgent: true },
  { label: "정지 회원", sub: "2명", urgent: false },
];

const REPORT_ROWS = [
  { label: "신규 신고 접수", sub: "3건 미처리", urgent: true },
  { label: "제재 내역", sub: "12건 완료", urgent: false },
  { label: "이의신청", sub: "1건 검토중", urgent: true },
  { label: "시스템 점검", sub: "정상 운영", urgent: false },
];

export default function AdminMyPage() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="h-full flex">
      <Sidebar
        name="Admin"
        role="관리자"
        items={ITEMS}
        activeIdx={activeIdx}
        onSelect={setActiveIdx}
        orange
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {activeIdx === 0 && (
          <>
            <div className="bg-white flex h-[72px] items-center px-10 flex-shrink-0 border-b border-bw">
              <h1 className="text-[22px] font-bold text-td">관리자 대시보드</h1>
            </div>

            {/* Orange stats bar */}
            <div className="bg-p flex h-[100px] items-center flex-shrink-0">
              {[
                { label: "총 가입자", value: "248" },
                { label: "오늘 고용", value: "18" },
                { label: "신고 접수", value: "3" },
                { label: "이달 매출", value: "₩2.4M" },
              ].map((s, i, arr) => (
                <div key={s.label} className={`flex-1 flex flex-col items-center gap-2 py-4 ${i < arr.length - 1 ? "border-r border-[#ffbf66]" : ""}`}>
                  <p className="text-[30px] font-bold text-white">{s.value}</p>
                  <p className="text-[13px] text-[#ffe5bd]">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="bg-bw h-px flex-shrink-0" />

            <div className="flex flex-1 min-h-0">
              {/* Left: 회원 관리 */}
              <div className="flex-1 flex flex-col gap-3 pl-10 pr-6 py-6 overflow-y-auto">
                <h2 className="text-[18px] font-bold text-td flex-shrink-0">회원 관리</h2>
                {MEMBER_ROWS.map((row) => (
                  <div key={row.label} className="bg-white h-16 rounded-xl flex items-center justify-between px-6 flex-shrink-0">
                    <div>
                      <p className="text-[16px] font-medium text-td">{row.label}</p>
                      <p className="text-[14px] text-tl">{row.sub}</p>
                    </div>
                    {row.urgent ? (
                      <div className="bg-p w-7 h-7 rounded-full flex items-center justify-center">
                        <span className="text-[13px] font-bold text-white">!</span>
                      </div>
                    ) : (
                      <span className="text-[15px] text-tl">›</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-bw w-px flex-shrink-0" />

              {/* Right: 신고 및 제재 */}
              <div className="flex-1 flex flex-col gap-3 p-6 overflow-y-auto">
                <h2 className="text-[18px] font-bold text-td flex-shrink-0">신고 및 제재</h2>
                {REPORT_ROWS.map((row) => (
                  <div key={row.label} className="bg-white h-16 rounded-xl flex items-center justify-between px-6 flex-shrink-0">
                    <div>
                      <p className="text-[16px] font-medium text-td">{row.label}</p>
                      <p className="text-[14px] text-tl">{row.sub}</p>
                    </div>
                    {row.urgent ? (
                      <div className="bg-[#e04214] w-7 h-7 rounded-full flex items-center justify-center">
                        <span className="text-[13px] font-bold text-white">!</span>
                      </div>
                    ) : (
                      <span className="text-[15px] text-tl">›</span>
                    )}
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
