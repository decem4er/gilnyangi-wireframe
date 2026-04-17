import GNB from "@/components/GNB";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full flex flex-col">
      <GNB />
      <main className="flex-1 overflow-auto pb-[56px] md:pb-0">{children}</main>
    </div>
  );
}
