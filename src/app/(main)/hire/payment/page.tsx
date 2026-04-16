"use client";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { CATS } from "@/lib/mock";
import { useEffect } from "react";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const { selectedCat, setHireStep } = useStore();
  const cat = selectedCat ?? CATS[0];

  useEffect(() => {
    // Reset hire step for next use
    setHireStep(0);
  }, [setHireStep]);

  return (
    <div className="max-w-[600px] mx-auto px-8 py-16 flex flex-col items-center gap-8">
      {/* Success icon */}
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
        <span className="text-5xl">✅</span>
      </div>

      <div className="text-center flex flex-col gap-3">
        <h1 className="text-[28px] font-bold text-td">고용 완료!</h1>
        <p className="text-[16px] text-tm">
          <strong className="text-td">{cat.name}</strong> 고양이 고용이 확정되었습니다.
        </p>
        <p className="text-[14px] text-tl">예약 번호: GN-2026041300001</p>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-2xl p-6 w-full flex flex-col gap-3">
        <h2 className="text-[16px] font-bold text-td mb-1">예약 정보</h2>
        {[
          { label: "고양이", value: cat.name },
          { label: "서비스", value: cat.services[0] },
          { label: "일정", value: "2026년 4월 20일 22:00" },
          { label: "장소", value: "서울 마포구 합정동 123-45" },
          { label: "결제 금액", value: "80,000원" },
          { label: "결제 방법", value: "신용카드" },
        ].map((r) => (
          <div key={r.label} className="flex justify-between items-center py-2 border-b border-bg last:border-0">
            <span className="text-[14px] text-tl">{r.label}</span>
            <span className="text-[14px] font-medium text-td">{r.value}</span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 w-full">
        <button
          onClick={() => router.push("/records")}
          className="h-13 py-3 bg-p text-white rounded-xl font-bold text-[16px] hover:brightness-105 transition-all"
        >
          고용내역 보기
        </button>
        <button
          onClick={() => router.push("/messages")}
          className="h-13 py-3 bg-pl text-p rounded-xl font-medium text-[15px] hover:brightness-97 transition-all"
        >
          {cat.name}에게 메시지 보내기
        </button>
        <button
          onClick={() => router.push("/home")}
          className="h-11 text-tl text-[14px] hover:text-tm transition-all"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}
