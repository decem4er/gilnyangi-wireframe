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
    <header className="w-full h-20 bg-white border-b border-bw flex items-center justify-between px-12 flex-shrink-0">
      {/* Logo */}
      <Link href="/home" className="flex items-center gap-3">
        <div className="w-9 h-9 bg-p rounded-lg" />
        <span className="text-[22px] font-bold text-p">길냥이</span>
      </Link>

      {/* Nav */}
      <nav className="flex h-full">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-7 flex items-center text-[16px] transition-colors ${
              isActive(item.href)
                ? "text-p font-medium"
                : "text-tm hover:text-p"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Right */}
      <div className="flex items-center gap-4">
        <Link
          href="/search"
          className="flex items-center gap-3 bg-pl rounded-full h-10 px-4 w-72"
        >
          <div className="w-[18px] h-[18px] bg-tl rounded-full flex-shrink-0" />
          <span className="text-[14px] text-tl">검색</span>
        </Link>
        <div className="w-10 h-10 bg-pl rounded-full" />
        <button
          onClick={() => { logout(); router.push("/"); }}
          className="w-10 h-10 bg-av rounded-full hover:opacity-80 transition-opacity"
          title="로그아웃"
        />
      </div>
    </header>
  );
}
