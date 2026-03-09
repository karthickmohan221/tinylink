// components/ads/InFeedAd.tsx
"use client";

import { useEffect, useRef } from "react";

interface InFeedAdProps {
  adSlot: string;
  className?: string;
  layout?: string;
}

export default function InFeedAd({
  adSlot,
  className = "",
  layout = "in-article",
}: InFeedAdProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    const timer = setTimeout(() => {
      try {
        if (typeof window !== "undefined" && (window as any).adsbygoogle) {
          (window as any).adsbygoogle.push({});
        }
        initialized.current = true;
      } catch (error) {
        console.error("AdSense error:", error);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={adRef} className={`my-4 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-client="ca-pub-4061298441820286"
        data-ad-slot={adSlot}
        data-ad-format="fluid"
        data-ad-layout={layout}
        data-full-width-responsive="true"
      />
    </div>
  );
}
