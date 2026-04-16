"use client";

type SidebarItem = { label: string; href?: string };

type Props = {
  name: string;
  role: string;
  items: SidebarItem[];
  activeIdx: number;
  onSelect: (i: number) => void;
  orange?: boolean;
};

export default function Sidebar({ name, role, items, activeIdx, onSelect, orange }: Props) {
  return (
    <aside className={`w-[300px] flex-shrink-0 flex flex-col h-full ${orange ? "bg-p" : "bg-pl"}`}>
      <div className={`flex flex-col items-center gap-[10px] px-5 py-7 flex-shrink-0 ${orange ? "bg-[#D96E0D]" : "bg-p"}`}>
        <div className="w-20 h-20 rounded-full bg-av" />
        <span className="text-[20px] font-bold text-white">{name}</span>
        <span className="text-[14px] text-orange-100">{role}</span>
      </div>
      <nav
        className="flex-1"
        style={{ display: "grid", gridTemplateRows: `repeat(${items.length}, 1fr)` }}
      >
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={`px-7 flex items-center text-[15px] text-left transition-colors ${
              i === activeIdx
                ? `${orange ? "bg-[#D96E0D]" : "bg-p"} text-white font-medium`
                : `${orange ? "text-[#ffe5bd] hover:bg-white/10" : "text-tm hover:bg-p/10"}`
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
