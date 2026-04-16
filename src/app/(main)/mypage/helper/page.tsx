"use client";
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
  { employer: "최수민 의뢰", spec: "해충박멸(바퀴)", date: "03.02", status: "보상완료" },
  { employer: "한지원 의뢰", spec: "청소", date: "02.20", status: "보상완료" },
  { employer: "오세준 의뢰", spec: "야간순찰", date: "02.08", status: "보상완료" },
];

const REVIEWS = [
  { employer: "박지수", stars: 5, comment: "쥐 퇴치 완벽합니다!" },
  { employer: "김민준", stars: 4, comment: "신속하고 깔끔해요" },
  { employer: "이서영", stars: 5, comment: "또 부탁드려요" },
];

const DAILY_REVENUE = [
  { date: "04.07", label: "박지수 의뢰 · 해충박멸", amount: 35000 },
  { date: "04.03", label: "김민준 의뢰 · 청소", amount: 20000 },
  { date: "03.28", label: "이서영 의뢰 · 바퀴벌레", amount: 28000 },
  { date: "03.15", label: "정다운 의뢰 · 야간순찰", amount: 25000 },
  { date: "03.02", label: "최수민 의뢰 · 해충박멸", amount: 32000 },
  { date: "02.20", label: "한지원 의뢰 · 청소", amount: 18000 },
  { date: "02.08", label: "오세준 의뢰 · 야간순찰", amount: 25000 },
];

const MONTHLY_REVENUE = [
  { month: "2026.04", amount: 55000, jobs: 2 },
  { month: "2026.03", amount: 85000, jobs: 3 },
  { month: "2026.02", amount: 43000, jobs: 2 },
  { month: "2026.01", amount: 72000, jobs: 3 },
  { month: "2025.12", amount: 61000, jobs: 2 },
  { month: "2025.11", amount: 48000, jobs: 2 },
];

const SPECIALTIES = ["해충박멸", "청소", "야간순찰", "쥐 퇴치", "바퀴벌레"];

type FilterType = "daily" | "monthly" | "custom";
type JobFilter = "전체" | "업무중" | "업무완료" | "보상완료";

export default function HelperMyPage() {
  const [activeIdx, setActiveIdx] = useState(0);

  // 업무 현황 state
  const [jobFilter, setJobFilter] = useState<JobFilter>("전체");

  // 수익 내역 state
  const [revenueFilter, setRevenueFilter] = useState<FilterType>("monthly");
  const [customFrom, setCustomFrom] = useState("2026-03-01");
  const [customTo, setCustomTo] = useState("2026-04-15");

  // 프로필 관리 state
  const [appeal, setAppeal] = useState("쥐 잡기 5년 경력! 야간 출동 환영합니다");
  const [appealEditing, setAppealEditing] = useState(false);
  const [appealDraft, setAppealDraft] = useState(appeal);

  // 설정 state
  const [available, setAvailable] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [reviewNotif, setReviewNotif] = useState(true);
  const [messageNotif, setMessageNotif] = useState(true);
  const [profilePublic, setProfilePublic] = useState(true);
  const [region, setRegion] = useState("서울 마포구");

  const filteredJobs = jobFilter === "전체" ? JOBS : JOBS.filter(j => j.status === jobFilter);

  const totalRevenue = DAILY_REVENUE.reduce((s, d) => s + d.amount, 0);

  const filteredDaily = revenueFilter === "custom"
    ? DAILY_REVENUE.filter(d => {
        const [m, day] = d.date.split(".").map(Number);
        const from = new Date(customFrom);
        const to = new Date(customTo);
        const date = new Date(2026, m - 1, day);
        return date >= from && date <= to;
      })
    : DAILY_REVENUE;

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

        {/* ── 대시보드 ── */}
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
              <div className="flex-1 flex flex-col gap-4 pl-10 pr-6 py-6 overflow-y-auto">
                <h2 className="text-[18px] font-bold text-td flex-shrink-0">나의 한줄 어필</h2>
                <div className="bg-white h-[60px] rounded-xl flex items-center justify-between px-6 flex-shrink-0">
                  <p className="text-[15px] text-td">"{appeal}"</p>
                  <button onClick={() => { setAppealDraft(appeal); setAppealEditing(true); setActiveIdx(3); }} className="text-[14px] font-medium text-p hover:underline">수정</button>
                </div>
                <h2 className="text-[18px] font-bold text-td flex-shrink-0 mt-2">업무 현황</h2>
                {JOBS.slice(0, 4).map((job, i) => (
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
              <div className="flex-1 flex flex-col gap-4 p-6 overflow-y-auto bg-bg">
                <h2 className="text-[18px] font-bold text-td flex-shrink-0">이번 달 수익</h2>
                <p className="text-[40px] font-bold text-p leading-none flex-shrink-0">₩78,000</p>
                <p className="text-[14px] text-tl flex-shrink-0">전월 대비 +12%</p>
                <div className="bg-bw h-px flex-shrink-0" />
                <h2 className="text-[18px] font-bold text-td flex-shrink-0">최근 수신 평가</h2>
                {REVIEWS.map((r, i) => (
                  <div key={i} className="bg-white rounded-xl px-5 py-3 flex flex-col gap-2 flex-shrink-0">
                    <p className="text-[14px] text-tl">{r.employer} · {"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}</p>
                    <p className="text-[15px] text-td">{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── 업무 현황 ── */}
        {activeIdx === 1 && (
          <>
            <div className="bg-white flex h-[72px] items-center px-10 flex-shrink-0 border-b border-bw">
              <h1 className="text-[22px] font-bold text-td">업무 현황</h1>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto px-10 py-6 gap-4">
              {/* 필터 탭 */}
              <div className="flex gap-2 flex-shrink-0">
                {(["전체", "업무중", "업무완료", "보상완료"] as JobFilter[]).map(f => (
                  <button
                    key={f}
                    onClick={() => setJobFilter(f)}
                    className={`px-4 h-9 rounded-full text-[13px] font-medium transition-all ${jobFilter === f ? "bg-p text-white" : "bg-white text-tm border border-bw hover:border-p hover:text-p"}`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* 요약 */}
              <div className="flex gap-3 flex-shrink-0">
                {[
                  { label: "전체", value: JOBS.length, color: "text-td" },
                  { label: "업무중", value: JOBS.filter(j => j.status === "업무중").length, color: "text-p" },
                  { label: "완료", value: JOBS.filter(j => j.status !== "업무중").length, color: "text-tl" },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-xl px-5 py-3 flex-1 flex items-center justify-between">
                    <span className="text-[14px] text-tl">{s.label}</span>
                    <span className={`text-[22px] font-bold ${s.color}`}>{s.value}</span>
                  </div>
                ))}
              </div>

              {/* 목록 */}
              <div className="flex flex-col gap-3">
                {filteredJobs.length === 0 && (
                  <div className="bg-white rounded-xl p-10 flex items-center justify-center">
                    <p className="text-tl text-[14px]">해당 업무가 없습니다.</p>
                  </div>
                )}
                {filteredJobs.map((job, i) => (
                  <div key={i} className="bg-white h-[68px] rounded-xl flex items-center pl-[14px] pr-5 gap-3">
                    <div className="w-11 h-11 rounded-full bg-av flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[16px] font-bold text-td">{job.employer}</p>
                      <p className="text-[13px] text-tl">{job.spec} · {job.date}</p>
                    </div>
                    <Badge status={job.status as any} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── 수익 내역 ── */}
        {activeIdx === 2 && (
          <>
            <div className="bg-white flex h-[72px] items-center px-10 flex-shrink-0 border-b border-bw">
              <h1 className="text-[22px] font-bold text-td">수익 내역</h1>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto px-10 py-6 gap-5">
              {/* 필터 */}
              <div className="flex gap-2 flex-shrink-0">
                {([
                  { key: "monthly", label: "월별" },
                  { key: "daily", label: "일별" },
                  { key: "custom", label: "기간 설정" },
                ] as { key: FilterType; label: string }[]).map(f => (
                  <button
                    key={f.key}
                    onClick={() => setRevenueFilter(f.key)}
                    className={`px-4 h-9 rounded-full text-[13px] font-medium transition-all ${revenueFilter === f.key ? "bg-p text-white" : "bg-white text-tm border border-bw hover:border-p hover:text-p"}`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* 기간 설정 날짜 입력 */}
              {revenueFilter === "custom" && (
                <div className="bg-white rounded-xl px-5 py-4 flex items-center gap-3 flex-shrink-0">
                  <input
                    type="date"
                    value={customFrom}
                    onChange={e => setCustomFrom(e.target.value)}
                    className="border border-bw rounded-lg px-3 py-2 text-[14px] text-td focus:outline-none focus:border-p"
                  />
                  <span className="text-tm text-[14px]">~</span>
                  <input
                    type="date"
                    value={customTo}
                    onChange={e => setCustomTo(e.target.value)}
                    className="border border-bw rounded-lg px-3 py-2 text-[14px] text-td focus:outline-none focus:border-p"
                  />
                </div>
              )}

              {/* 월별 뷰 */}
              {revenueFilter === "monthly" && (
                <>
                  <div className="bg-pl rounded-xl px-6 py-5 flex items-center justify-between flex-shrink-0">
                    <div>
                      <p className="text-[13px] text-tl mb-1">누적 총 수익</p>
                      <p className="text-[36px] font-bold text-p leading-none">₩{totalRevenue.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[13px] text-tl mb-1">총 업무</p>
                      <p className="text-[28px] font-bold text-td">{JOBS.length}건</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    {MONTHLY_REVENUE.map((m, i) => (
                      <div key={i} className="bg-white rounded-xl px-6 py-4 flex items-center justify-between">
                        <div>
                          <p className="text-[15px] font-bold text-td">{m.month}</p>
                          <p className="text-[13px] text-tl mt-0.5">업무 {m.jobs}건</p>
                        </div>
                        <p className="text-[20px] font-bold text-p">₩{m.amount.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* 일별/기간별 뷰 */}
              {(revenueFilter === "daily" || revenueFilter === "custom") && (
                <>
                  <div className="bg-pl rounded-xl px-6 py-5 flex items-center justify-between flex-shrink-0">
                    <div>
                      <p className="text-[13px] text-tl mb-1">{revenueFilter === "custom" ? "기간 수익" : "전체 수익"}</p>
                      <p className="text-[36px] font-bold text-p leading-none">
                        ₩{filteredDaily.reduce((s, d) => s + d.amount, 0).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[13px] text-tl mb-1">업무</p>
                      <p className="text-[28px] font-bold text-td">{filteredDaily.length}건</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    {filteredDaily.length === 0 && (
                      <div className="bg-white rounded-xl p-10 flex items-center justify-center">
                        <p className="text-tl text-[14px]">해당 기간에 수익이 없습니다.</p>
                      </div>
                    )}
                    {filteredDaily.map((d, i) => (
                      <div key={i} className="bg-white rounded-xl px-6 py-4 flex items-center justify-between">
                        <div>
                          <p className="text-[15px] font-bold text-td">{d.label}</p>
                          <p className="text-[13px] text-tl mt-0.5">{d.date}</p>
                        </div>
                        <p className="text-[18px] font-bold text-p">₩{d.amount.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </>
        )}

        {/* ── 프로필 관리 ── */}
        {activeIdx === 3 && (
          <>
            <div className="bg-white flex h-[72px] items-center px-10 flex-shrink-0 border-b border-bw">
              <h1 className="text-[22px] font-bold text-td">프로필 관리</h1>
            </div>
            <div className="flex-1 overflow-y-auto px-10 py-6 flex flex-col gap-5">
              {/* 프로필 사진 */}
              <div className="bg-white rounded-xl px-6 py-5 flex items-center gap-5">
                <div className="w-20 h-20 rounded-full bg-av flex-shrink-0" />
                <div>
                  <p className="text-[16px] font-bold text-td">박지수</p>
                  <p className="text-[13px] text-tl mt-1">가사도우미</p>
                  <button className="mt-2 text-[13px] font-medium text-p hover:underline">사진 변경</button>
                </div>
              </div>

              {/* 한줄 어필 */}
              <div className="bg-white rounded-xl px-6 py-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-[16px] font-bold text-td">나의 한줄 어필</h2>
                  {!appealEditing && (
                    <button onClick={() => { setAppealDraft(appeal); setAppealEditing(true); }} className="text-[13px] font-medium text-p hover:underline">수정</button>
                  )}
                </div>
                {appealEditing ? (
                  <>
                    <input
                      value={appealDraft}
                      onChange={e => setAppealDraft(e.target.value)}
                      maxLength={50}
                      className="border border-bw rounded-lg px-4 py-2.5 text-[14px] text-td focus:outline-none focus:border-p"
                    />
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => setAppealEditing(false)} className="px-4 h-9 rounded-lg border border-bw text-[13px] text-tm hover:border-p hover:text-p transition-all">취소</button>
                      <button onClick={() => { setAppeal(appealDraft); setAppealEditing(false); }} className="px-4 h-9 rounded-lg bg-p text-white text-[13px] font-medium hover:brightness-105 transition-all">저장</button>
                    </div>
                  </>
                ) : (
                  <p className="text-[15px] text-td">"{appeal}"</p>
                )}
              </div>

              {/* 전문 분야 */}
              <div className="bg-white rounded-xl px-6 py-5 flex flex-col gap-3">
                <h2 className="text-[16px] font-bold text-td">전문 분야</h2>
                <div className="flex flex-wrap gap-2">
                  {SPECIALTIES.map(s => (
                    <span key={s} className="bg-pl text-p text-[13px] font-medium px-3 h-8 rounded-full flex items-center">{s}</span>
                  ))}
                  <button className="bg-bg text-tl text-[13px] px-3 h-8 rounded-full border border-bw hover:border-p hover:text-p transition-all">+ 추가</button>
                </div>
              </div>

              {/* 활동 지역 */}
              <div className="bg-white rounded-xl px-6 py-5 flex items-center justify-between">
                <div>
                  <h2 className="text-[16px] font-bold text-td">활동 지역</h2>
                  <p className="text-[13px] text-tl mt-1">{region}</p>
                </div>
                <button className="text-[13px] font-medium text-p hover:underline">변경</button>
              </div>

              {/* 저장 버튼 */}
              <button className="h-12 bg-p text-white rounded-xl font-bold text-[15px] hover:brightness-105 transition-all">
                프로필 저장
              </button>
            </div>
          </>
        )}

        {/* ── 설정 ── */}
        {activeIdx === 4 && (
          <>
            <div className="bg-white flex h-[72px] items-center px-10 flex-shrink-0 border-b border-bw">
              <h1 className="text-[22px] font-bold text-td">설정</h1>
            </div>
            <div className="flex-1 overflow-y-auto px-10 py-6 flex flex-col gap-5">

              {/* 업무 가능 여부 */}
              <div className="bg-white rounded-xl px-6 py-5 flex flex-col gap-4">
                <h2 className="text-[16px] font-bold text-td">업무 상태</h2>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[15px] font-medium text-td">업무 가능</p>
                    <p className="text-[13px] text-tl mt-0.5">고용인에게 프로필이 노출됩니다</p>
                  </div>
                  <button
                    onClick={() => setAvailable(v => !v)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${available ? "bg-p" : "bg-bw"}`}
                  >
                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${available ? "left-7" : "left-1"}`} />
                  </button>
                </div>
                <div className={`rounded-lg px-4 py-3 text-[13px] font-medium ${available ? "bg-pl text-p" : "bg-bg text-tl"}`}>
                  현재 상태: {available ? "🟢 업무 가능" : "⚫ 업무 불가"}
                </div>
              </div>

              {/* 알림 설정 */}
              <div className="bg-white rounded-xl px-6 py-5 flex flex-col gap-4">
                <h2 className="text-[16px] font-bold text-td">알림 설정</h2>
                {[
                  { label: "푸시 알림", desc: "새 의뢰 및 업무 알림", value: pushNotif, set: setPushNotif },
                  { label: "평가 알림", desc: "새로운 평가 수신 시 알림", value: reviewNotif, set: setReviewNotif },
                  { label: "메시지 알림", desc: "새 메시지 수신 시 알림", value: messageNotif, set: setMessageNotif },
                ].map(({ label, desc, value, set }) => (
                  <div key={label} className="flex items-center justify-between py-1">
                    <div>
                      <p className="text-[15px] font-medium text-td">{label}</p>
                      <p className="text-[13px] text-tl mt-0.5">{desc}</p>
                    </div>
                    <button
                      onClick={() => set(v => !v)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${value ? "bg-p" : "bg-bw"}`}
                    >
                      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${value ? "left-7" : "left-1"}`} />
                    </button>
                  </div>
                ))}
              </div>

              {/* 공개 설정 */}
              <div className="bg-white rounded-xl px-6 py-5 flex flex-col gap-4">
                <h2 className="text-[16px] font-bold text-td">공개 설정</h2>
                <div className="flex items-center justify-between py-1">
                  <div>
                    <p className="text-[15px] font-medium text-td">프로필 공개</p>
                    <p className="text-[13px] text-tl mt-0.5">탐색 화면에 프로필 노출</p>
                  </div>
                  <button
                    onClick={() => setProfilePublic(v => !v)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${profilePublic ? "bg-p" : "bg-bw"}`}
                  >
                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${profilePublic ? "left-7" : "left-1"}`} />
                  </button>
                </div>
              </div>

              {/* 계정 관리 */}
              <div className="bg-white rounded-xl px-6 py-5 flex flex-col gap-1">
                <h2 className="text-[16px] font-bold text-td mb-3">계정 관리</h2>
                {[
                  { label: "비밀번호 변경", color: "text-td" },
                  { label: "연동 계정 관리", color: "text-td" },
                  { label: "서비스 탈퇴", color: "text-red" },
                ].map(item => (
                  <button key={item.label} className={`flex items-center justify-between py-3 border-b border-bg last:border-0 ${item.color} text-[15px] hover:opacity-70 transition-opacity`}>
                    {item.label}
                    <span className="text-tl">›</span>
                  </button>
                ))}
              </div>

            </div>
          </>
        )}

      </div>
    </div>
  );
}
