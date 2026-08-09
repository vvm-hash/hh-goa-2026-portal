// components/creator/brand-mark.tsx

import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Official HH Goa 2026 brand mark.
 * Uses the logo stored in /public/hhgoalogo.jpg
 */
export function BrandMark({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Image
        src="/hhgoalogo.jpg"
        alt="HH Goa Logo"
        width={44}
        height={44}
        priority
        className="rounded-lg object-cover shadow-md"
      />

      {showWordmark && (
        <div className="leading-tight">
          <span className="block text-sm font-semibold tracking-tight text-[#F0F6FC]">
            HH Goa 2026
          </span>

          <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-[#6E7681]">
            Builder Portal
          </span>
        </div>
      )}
    </div>
  );
}