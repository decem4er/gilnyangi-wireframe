"use client";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { CATS } from "@/lib/mock";
import { useState } from "react";

const STEPS = ["고양이 확인", "일정 & 서비스", "결제"];

export default function HirePage() {
  const router = useRouter();
  const { selectedCat, hireStep, setHireStep } = useStore();
  const cat = selectedCat ?? CATS[0];

  const [date, setDate] = useState("2026-04-20");
  const [time, setTime] = useState("22:00");
  const [service, setService] = useState(cat.services[0]);
  const [address, setAddress] = useState("서울 마포구 합정동 123-45");
  const [note, setNote] = useState("");

  const next = () => {
    if (hireStep < 2) setHireStep(hireStep + 1);
    else router.push("/hire/payment");
  };
  const prev = () => {
    if (hireStep > 0) setHireStep(hireStep - 1);
    else router.back();
  };

  return (
    <div className="max-w-[700px] mx-auto px-8 py-8 flex flex-col gap-8">
      {/* Step indicator */}
      <div className="flex items-center gap-0">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-[14px] font-bold transition-all ${
                  i <= hireStep ? "bg-p text-white" : "bg-bw text-tl"
                }`}
              >
                {i < hireStep ? "✓" : i + 1}
              </div>
              <span className={`text-[12px] ${i <= hireStep ? "text-p font-medium" : "text-tl"}`}>{s}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 mb-5 ${i < hireStep ? "bg-p" : "bg-bw"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 0: 고양이 확인 */}
      {hireStep === 0 && (
        <div className="bg-white rounded-2xl p-8 flex flex-col gap-6">
          <h2 className="text-[22px] font-bold text-td">선택한 고양이 확인</h2>
          <div className="flex gap-6 items-start">
            <div className="w-24 h-24 rounded-full bg-av flex-shrink-0" />
            <div className="flex flex-col gap-2">
              <h3 className="text-[20px] font-bold text-td">{cat.name}</h3>
              <p className="text-[15px] text-tm">{cat.spec}</p>
              <p className="text-[14px] text-tl">📍 {cat.area}</p>
              <p className="text-[14px] text-p font-medium">★{cat.rating} ({cat.reviews}건)</p>
            </div>
          </div>
          <div className="bg-pl rounded-xl p-4">
            <p className="text-[14px] text-td">"{cat.appeal}"</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[14px] font-medium text-td">제공 서비스</p>
            <div className="flex flex-wrap gap-2">
              {cat.services.map((s) => (
                <span key={s} className="bg-bg border border-bw text-td text-[13px] px-3 h-8 rounded-full flex items-center">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 1: 일정 & 서비스 */}
      {hireStep === 1 && (
        <div className="bg-white rounded-2xl p-8 flex flex-col gap-5">
          <h2 className="text-[22px] font-bold text-td">일정 & 서비스 선택</h2>

          <div className="flex gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-[13px] font-medium text-tm">날짜</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-11 px-4 rounded-xl border border-bw text-td text-[14px] focus:outline-none focus:border-p"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-[13px] font-medium text-tm">시간</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="h-11 px-4 rounded-xl border border-bw text-td text-[14px] focus:outline-none focus:border-p"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[13px] font-medium text-tm">서비스 선택</label>
            <div className="flex flex-col gap-2">
              {cat.services.map((s) => (
                <button
                  key={s}
                  onClick={() => setService(s)}
                  className={`h-12 px-4 rounded-xl border text-[14px] text-left transition-all ${
                    service === s ? "border-p bg-pl text-p font-medium" : "border-bw text-td hover:border-p"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-medium text-tm">주소</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="h-11 px-4 rounded-xl border border-bw text-td text-[14px] focus:outline-none focus:border-p"
              placeholder="서비스 받을 주소를 입력하세요"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-medium text-tm">요청사항 (선택)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              className="px-4 py-3 rounded-xl border border-bw text-td text-[14px] focus:outline-none focus:border-p resize-none"
              placeholder="특별히 요청할 사항이 있으면 입력해 주세요"
            />
          </div>
        </div>
      )}

      {/* Step 2: 결제 정보 확인 */}
      {hireStep === 2 && (
        <div className="bg-white rounded-2xl p-8 flex flex-col gap-5">
          <h2 className="text-[22px] font-bold text-td">결제 정보 확인</h2>
          <div className="flex flex-col gap-3">
            {[
              { label: "고양이", value: cat.name },
              { label: "서비스", value: service },
              { label: "날짜", value: `${date} ${time}` },
              { label: "주소", value: address },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between py-3 border-b border-bg last:border-0">
                <span className="text-[14px] text-tl">{r.label}</span>
                <span className="text-[14px] font-medium text-td">{r.value}</span>
              </div>
            ))}
          </div>
          <div className="bg-pl rounded-xl p-4 flex items-center justify-between">
            <span className="text-[16px] font-bold text-td">결제 금액</span>
            <span className="text-[22px] font-bold text-p">80,000원</span>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[13px] font-medium text-td">결제 수단</p>
            {["신용카드", "카카오페이", "네이버페이"].map((m) => (
              <label key={m} className="flex items-center gap-3 h-12 px-4 bg-bg rounded-xl cursor-pointer">
                <input type="radio" name="payment" defaultChecked={m === "신용카드"} className="accent-p" />
                <span className="text-[14px] text-td">{m}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3">
        <button
          onClick={prev}
          className="flex-1 h-13 py-3 border border-bw rounded-xl text-[15px] font-medium text-tm hover:bg-white transition-all"
        >
          {hireStep === 0 ? "취소" : "이전"}
        </button>
        <button
          onClick={next}
          className="flex-1 h-13 py-3 bg-p text-white rounded-xl text-[15px] font-bold hover:brightness-105 transition-all"
        >
          {hireStep === 2 ? "결제하기" : "다음"}
        </button>
      </div>
    </div>
  );
}
