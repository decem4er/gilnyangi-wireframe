"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { HIRE_RECORDS, CATS, ACTIVITY_LOG } from "@/lib/mock";
import Badge from "@/components/Badge";
import { useState } from "react";

const TABS = ["상세정보", "모니터링", "내 리뷰", "고양이의 평가"];

export default function RecordDetailPage() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const rec = HIRE_RECORDS.find((r) => r.id === id) ?? HIRE_RECORDS[0];
  const cat = CATS.find((c) => c.id === rec.catId) ?? CATS[0];

  const initTab = searchParams.get("tab") === "review" ? "내 리뷰" : "상세정보";
  const [tab, setTab] = useState(initTab);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-[900px] mx-auto px-8 py-8 flex flex-col gap-6">
      {/* Back */}
      <button onClick={() => router.back()} className="text-[14px] text-p hover:underline self-start">
        ← 고용내역으로
      </button>

      {/* Header */}
      <div className="bg-white rounded-2xl p-6 flex items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-av flex-shrink-0" />
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-[22px] font-bold text-td">{rec.catName}</h2>
            <Badge status={rec.status} />
          </div>
          <p className="text-[14px] text-tm">{rec.spec} · {rec.date}</p>
          <p className="text-[13px] text-tl mt-1">📍 {cat.area}</p>
        </div>
        <button
          onClick={() => router.push("/messages")}
          className="bg-pl text-p text-[14px] font-medium px-4 h-10 rounded-xl hover:brightness-97 transition-all"
        >
          메시지 보내기
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-bw">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 h-11 text-[14px] font-medium border-b-2 transition-all ${
              tab === t ? "border-p text-p" : "border-transparent text-tl hover:text-td"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* 상세정보 */}
      {tab === "상세정보" && (
        <div className="bg-white rounded-2xl p-6 flex flex-col gap-4">
          <h3 className="text-[18px] font-bold text-td">고용 상세</h3>
          {[
            { label: "고용번호", value: `GN-202604${rec.id.padStart(5, "0")}` },
            { label: "고양이", value: rec.catName },
            { label: "서비스", value: rec.spec },
            { label: "일정", value: `${rec.date} 22:00` },
            { label: "장소", value: "서울 마포구 합정동 123-45" },
            { label: "결제금액", value: "80,000원" },
            { label: "상태", value: rec.status },
          ].map((r) => (
            <div key={r.label} className="flex justify-between items-center py-3 border-b border-bg last:border-0">
              <span className="text-[14px] text-tl">{r.label}</span>
              <span className="text-[14px] font-medium text-td">{r.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* 모니터링 */}
      {tab === "모니터링" && (
        <div className="flex flex-col gap-4">
          {/* Status banner */}
          <div className="bg-p rounded-2xl p-5 text-white flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">🐱</div>
            <div>
              <p className="text-[13px] text-orange-100">현재 상태</p>
              <p className="text-[18px] font-bold">쥐 처리 중 · 주방 구역</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
              <span className="text-[13px] text-orange-100">실시간</span>
            </div>
          </div>

          {/* Activity log */}
          <div className="bg-white rounded-2xl p-6">
            <h3 className="text-[18px] font-bold text-td mb-4">활동 기록</h3>
            <div className="flex flex-col gap-0">
              {ACTIVITY_LOG.map((log, i) => (
                <div key={i} className="flex gap-4 pb-4 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-p rounded-full flex-shrink-0 mt-1" />
                    {i < ACTIVITY_LOG.length - 1 && <div className="w-0.5 flex-1 bg-bw mt-1" />}
                  </div>
                  <div className="pb-2">
                    <p className="text-[13px] text-tl">{log.time}</p>
                    <p className="text-[14px] text-td">{log.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 내 리뷰 */}
      {tab === "내 리뷰" && (
        <div className="bg-white rounded-2xl p-6 flex flex-col gap-5">
          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="text-5xl">🎉</div>
              <h3 className="text-[20px] font-bold text-td">리뷰가 등록되었습니다!</h3>
              <p className="text-[14px] text-tm text-center">소중한 리뷰 감사합니다. 더 좋은 서비스를 위해 활용하겠습니다.</p>
              <button onClick={() => router.push("/records")} className="bg-p text-white rounded-xl px-8 py-2.5 font-medium hover:brightness-105 transition-all">
                고용내역으로
              </button>
            </div>
          ) : (
            <>
              <h3 className="text-[18px] font-bold text-td">리뷰 작성</h3>
              <div className="flex flex-col gap-2">
                <p className="text-[14px] text-tm">별점</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      onClick={() => setRating(s)}
                      className={`text-3xl transition-all ${s <= rating ? "text-p" : "text-bw"}`}
                    >
                      ★
                    </button>
                  ))}
                  <span className="text-[14px] text-tm self-center ml-2">{rating}점</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[14px] text-tm">리뷰 내용</label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows={5}
                  className="px-4 py-3 rounded-xl border border-bw text-td text-[14px] focus:outline-none focus:border-p resize-none"
                  placeholder={`${rec.catName}와(과)의 경험을 공유해 주세요`}
                />
              </div>
              <button
                onClick={() => setSubmitted(true)}
                className="h-12 bg-p text-white rounded-xl font-bold text-[15px] hover:brightness-105 transition-all"
              >
                리뷰 등록
              </button>
            </>
          )}
        </div>
      )}
      {/* 고양이의 평가 */}
      {tab === "고양이의 평가" && (
        <div className="bg-white rounded-2xl p-6 flex flex-col gap-5">
          <h3 className="text-[18px] font-bold text-td">고양이가 남긴 평가</h3>
          <div className="flex items-center gap-4 p-4 bg-bg rounded-xl">
            <div className="w-12 h-12 rounded-full bg-av flex-shrink-0" />
            <div>
              <p className="text-[15px] font-bold text-td">{rec.catName}</p>
              <p className="text-[13px] text-tm">{rec.date} 업무 완료 후 평가</p>
            </div>
            <div className="ml-auto text-[22px] font-bold text-p">★ 4.5</div>
          </div>
          {[
            { label: "작업 환경", score: 5 },
            { label: "소통",      score: 4 },
            { label: "보상 지급", score: 5 },
            { label: "재고용 의사", score: 4 },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between py-3 border-b border-bg last:border-0">
              <span className="text-[14px] font-medium text-td">{item.label}</span>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(s => (
                  <span key={s} className={`text-[20px] ${s <= item.score ? "text-p" : "text-bw"}`}>★</span>
                ))}
              </div>
            </div>
          ))}
          <div className="bg-pl rounded-xl p-4">
            <p className="text-[14px] text-td leading-relaxed">
              "작업 환경이 청결하고 소통이 원활했습니다. 보상도 약속대로 지급해 주셨고, 다음에도 함께 일하고 싶습니다."
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
