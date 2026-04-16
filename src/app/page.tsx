"use client";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useStore();

  const handleLogin = () => {
    login();
    router.push("/home");
  };

  return (
    <div className="h-full flex items-center justify-center bg-bg">
      <div className="flex flex-col items-center gap-8 w-full max-w-sm px-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-full bg-p flex items-center justify-center">
            <span className="text-4xl">🐱</span>
          </div>
          <h1 className="text-[32px] font-bold text-td">길냥이</h1>
          <p className="text-[15px] text-tm text-center">고양이 가사도우미 플랫폼</p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-medium text-tm">이메일</label>
            <input
              type="email"
              defaultValue="user@gilnyangi.kr"
              className="h-12 px-4 rounded-xl border border-bw bg-white text-td text-[15px] focus:outline-none focus:border-p"
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[13px] font-medium text-tm">비밀번호</label>
            <input
              type="password"
              defaultValue="••••••••"
              className="h-12 px-4 rounded-xl border border-bw bg-white text-td text-[15px] focus:outline-none focus:border-p"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <button
            onClick={handleLogin}
            className="h-13 bg-p text-white rounded-xl font-bold text-[16px] hover:brightness-105 transition-all mt-2 py-3"
          >
            로그인
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 w-full">
          <div className="flex-1 h-px bg-bw" />
          <span className="text-[13px] text-tl">또는</span>
          <div className="flex-1 h-px bg-bw" />
        </div>

        {/* Social login */}
        <div className="flex flex-col gap-3 w-full">
          <button className="h-12 bg-[#FEE500] text-[#3C1E1E] rounded-xl font-medium text-[15px] flex items-center justify-center gap-2 hover:brightness-95 transition-all">
            <span>💬</span> 카카오로 로그인
          </button>
          <button className="h-12 bg-[#03C75A] text-white rounded-xl font-medium text-[15px] flex items-center justify-center gap-2 hover:brightness-95 transition-all">
            <span>N</span> 네이버로 로그인
          </button>
        </div>

        <p className="text-[13px] text-tl">
          계정이 없으신가요?{" "}
          <button className="text-p font-medium hover:underline">회원가입</button>
        </p>

        {/* Admin shortcut */}
        <button
          onClick={() => router.push("/admin")}
          className="text-[12px] text-tl hover:text-tm transition-colors"
        >
          관리자 페이지 →
        </button>
      </div>
    </div>
  );
}
