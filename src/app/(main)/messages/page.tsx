"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { MESSAGES, CHAT_MESSAGES } from "@/lib/mock";

export default function MessagesPage() {
  const { chatInput, setChatInput } = useStore();
  const [activeId, setActiveId] = useState(MESSAGES[0].id);
  const [msgs, setMsgs] = useState(CHAT_MESSAGES);

  const active = MESSAGES.find((m) => m.id === activeId)!;

  const send = () => {
    if (!chatInput.trim()) return;
    setMsgs((prev) => [
      ...prev,
      { id: String(Date.now()), text: chatInput.trim(), fromSelf: true, time: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }) },
    ]);
    setChatInput("");
  };

  return (
    <div className="h-full flex">
      {/* Thread list */}
      <div className="w-[320px] flex-shrink-0 flex flex-col border-r border-bw">
        <div className="p-4 border-b border-bw">
          <input
            placeholder="메시지 검색..."
            className="w-full h-10 px-4 rounded-xl bg-bg border border-bw text-[14px] text-td focus:outline-none focus:border-p"
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          {MESSAGES.map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveId(m.id)}
              className={`w-full flex items-center gap-3 p-4 border-b border-bg text-left transition-all ${
                activeId === m.id ? "bg-pl" : "hover:bg-bg"
              }`}
            >
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-av" />
                {m.active && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className="text-[14px] font-bold text-td">{m.name}</span>
                  <span className="text-[11px] text-tl">{m.time}</span>
                </div>
                <p className="text-[13px] text-tm truncate mt-0.5">{m.preview}</p>
              </div>
              {m.unread > 0 && (
                <div className="w-5 h-5 bg-p rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
                  {m.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div className="h-16 px-6 border-b border-bw flex items-center gap-3 bg-white">
          <div className="w-10 h-10 rounded-full bg-av" />
          <div>
            <p className="text-[15px] font-bold text-td">{active.name}</p>
            <p className="text-[12px] text-tl">
              {active.active ? "🟢 온라인" : "마지막 활동 " + active.time}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          {msgs.map((msg) => (
            <div key={msg.id} className={`flex ${msg.fromSelf ? "justify-end" : "justify-start"} gap-2`}>
              {!msg.fromSelf && <div className="w-8 h-8 rounded-full bg-av flex-shrink-0 mt-1" />}
              <div className={`max-w-[65%] flex flex-col gap-1 ${msg.fromSelf ? "items-end" : "items-start"}`}>
                <div
                  className={`px-4 py-2.5 rounded-2xl text-[14px] leading-relaxed ${
                    msg.fromSelf ? "bg-p text-white rounded-br-sm" : "bg-white text-td rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[11px] text-tl">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="px-6 py-4 border-t border-bw bg-white flex gap-3 items-end">
          <textarea
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            rows={1}
            placeholder="메시지를 입력하세요..."
            className="flex-1 min-h-[44px] max-h-32 px-4 py-3 rounded-xl border border-bw text-[14px] text-td focus:outline-none focus:border-p resize-none"
          />
          <button
            onClick={send}
            className="w-11 h-11 bg-p text-white rounded-xl flex items-center justify-center hover:brightness-105 transition-all flex-shrink-0 text-lg"
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}
