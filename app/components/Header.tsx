import Image from "next/image";

export default function Header() {
  return (
    <div className="flex justify-center mb-12">
      <div className="flex items-center gap-2 z-20">
        <Image src="/Logo.svg" alt="Rocket" width={265} height={48} priority />
      </div>

      {/* Header Overlay */}
      <div className="bg-[#0D0D0D] fixed top-0 left-0 right-0 h-[180px] z-10" />
    </div>
  );
}
