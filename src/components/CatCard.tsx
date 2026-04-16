"use client";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { Cat } from "@/lib/mock";

export default function CatCard({ cat, compact }: { cat: Cat; compact?: boolean }) {
  const router = useRouter();
  const { selectCat } = useStore();

  const handle = () => { selectCat(cat); router.push(`/cats/${cat.id}`); };
  const hire = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectCat(cat);
    router.push("/hire");
  };

  if (compact) {
    return (
      <div
        onClick={handle}
        className="bg-pl rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:brightness-95 transition-all flex-shrink-0"
      >
        <div className="w-16 h-16 rounded-full bg-av flex-shrink-0" />
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <span className="text-[16px] font-bold text-td">{cat.name}</span>
          <span className="text-[14px] text-tm">{cat.spec}</span>
          <span className="text-[13px] text-tl">★{cat.rating} · {cat.reviews}건</span>
        </div>
        <button
          onClick={hire}
          className="bg-p text-white text-[13px] font-medium px-3 h-9 rounded-lg flex-shrink-0 hover:brightness-110 transition-all"
        >
          고용
        </button>
      </div>
    );
  }

  return (
    <div
      onClick={handle}
      className="bg-white rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer hover:brightness-97 transition-all"
    >
      <div className="w-20 h-20 rounded-full bg-av" />
      <span className="text-[16px] font-bold text-td">{cat.name}</span>
      <span className="text-[14px] text-tm">{cat.spec}</span>
      <span className="text-[13px] text-tl">★{cat.rating}</span>
      <button
        onClick={hire}
        className="bg-p text-white text-[13px] font-medium px-4 h-9 rounded-lg mt-1 hover:brightness-110 transition-all w-full"
      >
        고용
      </button>
    </div>
  );
}
