// components/ads/AdUnit.tsx
"use client";

import { useEffect, useRef } from "react";

interface AdUnitProps {
  adSlot: string;
  adFormat?: "auto" | "rectangle" | "horizontal" | "vertical" | "fluid";
  className?: string;
  fullWidth?: boolean;
}

export default function AdUnit({
  adSlot,
  adFormat = "auto",
  className = "",
  fullWidth = true,
}: AdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    // Only initialize once
    if (initialized.current) return;

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      try {
        // Push the ad
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
          {},
        );
        initialized.current = true;
      } catch (error) {
        console.error("AdSense error:", error);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [adSlot]);

  return (
    <div
      ref={adRef}
      className={`ad-container ${className}`}
      style={{
        minHeight: adFormat === "horizontal" ? "90px" : "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f8f9fa",
        borderRadius: "0.5rem",
        overflow: "hidden",
        margin: "1rem 0",
      }}
    >
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: fullWidth ? "100%" : "auto",
        }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidth ? "true" : "false"}
      />
    </div>
  );
}
