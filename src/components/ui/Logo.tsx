import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  compact?: boolean;
};

export function Logo({ className, compact = false }: LogoProps) {
  const size = compact ? 28 : 32;
  return (
    <Link
      href="/#top"
      aria-label="SDViGApp — на главную"
      className={cn(
        "group inline-flex items-center gap-2 text-[var(--color-ink)]",
        className
      )}
    >
      <span
        className={cn(
          "relative block overflow-hidden rounded-[10px]",
          compact ? "h-7 w-7" : "h-8 w-8"
        )}
      >
        <Image
          src="/logo.svg"
          alt=""
          width={size}
          height={size}
          priority
          className="h-full w-full object-cover"
        />
      </span>
      <span className="flex items-baseline gap-[2px]">
        <span
          className={cn(
            "font-semibold tracking-tight",
            compact ? "text-[15px]" : "text-[17px]"
          )}
        >
          SDViGApp
        </span>
        <span
          aria-hidden="true"
          className="translate-y-[1px] text-teal-500"
          style={{ color: "var(--color-teal-500)" }}
        >
          .
        </span>
      </span>
    </Link>
  );
}
