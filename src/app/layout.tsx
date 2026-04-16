import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "길냥이 — 고양이 가사도우미 플랫폼",
  description: "믿을 수 있는 고양이 가사도우미를 고용하세요",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="h-full">
      <body className="h-full">{children}</body>
    </html>
  );
}
