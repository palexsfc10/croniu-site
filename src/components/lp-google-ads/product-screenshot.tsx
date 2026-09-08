import Image from "next/image";
import { cn } from "@/lib/cn";

type ProductScreenshotProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  frame?: "browser" | "phone" | "none";
  priority?: boolean;
  /**
   * Required, no fallback default: must reflect the real rendered CSS width
   * of this image's container at each breakpoint (not a guess). A `sizes`
   * value smaller than the true display width makes Next.js request an
   * undersized source, which shows up as soft/blurry text once the browser
   * stretches it back up to the real container width — measure the actual
   * `clientWidth` before writing this string. Ignored for `frame="phone"`,
   * which always renders at a fixed 280px regardless of viewport.
   */
  sizes: string;
  /** 90-100 for screenshots with UI text — the default 75 visibly softens small text. */
  quality?: number;
  className?: string;
};

/**
 * Frames a real Croniu product screenshot (never a recreated/invented UI)
 * with a lightweight browser or phone chrome. Only crop/frame/shadow are
 * applied here — the screenshot pixels themselves are never altered.
 */
export function ProductScreenshot({
  src,
  alt,
  width,
  height,
  frame = "browser",
  priority = false,
  sizes,
  quality = 92,
  className,
}: ProductScreenshotProps) {
  const image = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      quality={quality}
      sizes={frame === "phone" ? "280px" : sizes}
      className="h-auto w-full"
    />
  );

  if (frame === "phone") {
    return (
      <div
        className={cn(
          "mx-auto w-full max-w-[280px] overflow-hidden rounded-[2rem] border-4 border-ink/10 bg-white shadow-xl",
          className,
        )}
      >
        {image}
      </div>
    );
  }

  if (frame === "none") {
    return <div className={cn("overflow-hidden rounded-2xl", className)}>{image}</div>;
  }

  return (
    <div className={cn("overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-xl", className)}>
      <div className="flex items-center gap-1.5 border-b border-ink/10 bg-ink/[0.03] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
      </div>
      {image}
    </div>
  );
}
