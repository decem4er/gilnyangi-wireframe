import { STATUS_COLORS } from "@/lib/mock";

export default function Badge({ status }: { status: string }) {
  const cls = STATUS_COLORS[status] ?? "bg-bw text-td";
  return (
    <span className={`${cls} text-[11px] font-medium px-2 h-6 rounded-full inline-flex items-center flex-shrink-0`}>
      {status}
    </span>
  );
}
