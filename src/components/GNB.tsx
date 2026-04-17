"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

const NAV = [
  { label: "홈", href: "/home" },
  { label: "탐색", href: "/cats" },
  { label: "고용내역", href: "/records" },
  { label: "메시지", href: "/messages" },
];

export default function GNB() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useStore();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header className="w-full bg-white border-b border-bw flex items-center justify-between flex-shrink-0 h-14 px-5 md:h-20 md:px-12">
        {/* Logo */}
        <Link href="/home" className="flex items-center gap-2 md:gap-3">
          <div className="w-7 h-7 md:w-9 md:h-9 bg-p rounded-lg" />
          <span className="text-[18px] md:text-[22px] font-bold text-p">길냥이</span>
        </Link>

        {/* 데스크탑 Nav */}
        <nav className="hidden md:flex h-full">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-7 flex items-center text-[16px] transition-colors border-b-2 ${
                isActive(item.href)
                  ? "text-p font-medium border-p"
                  : "text-tm hover:text-p border-transparent"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* 검색 — 데스크탑: 바형, 모바일: 아이콘 */}
          <Link
            href="/search"
            className="hidden md:flex items-center gap-3 bg-pl rounded-full h-10 px-4 w-72"
          >
            <div className="w-[18px] h-[18px] bg-tl rounded-full flex-shrink-0" />
            <span className="text-[14px] text-tl">검색</span>
          </Link>
          <Link
            href="/search"
            className="md:hidden w-9 h-9 bg-pl rounded-full flex items-center justify-center flex-shrink-0"
          >
            <div className="w-4 h-4 bg-tl rounded-full" />
          </Link>

          <div className="w-9 h-9 md:w-10 md:h-10 bg-pl rounded-full flex-shrink-0" />
          <button
            onClick={() => { logout(); router.push("/"); }}
            className="w-9 h-9 md:w-10 md:h-10 bg-av rounded-full hover:opacity-80 transition-opacity flex-shrink-0"
            title="로그아웃"
          />
        </div>
      </header>

      {/* 모바일 하단 탭바 */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-bw flex z-50">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-1 text-[10px] font-medium transition-colors ${
              isActive(item.href) ? "text-p" : "text-tl"
            }`}
          >
            <div className={`w-5 h-5 rounded-md ${isActive(item.href) ? "bg-p" : "bg-bw"}`} />
            {item.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
