"use client";

import dynamic from "next/dynamic";

const MouseGlow = dynamic(
    () => import("@/components/effects/MouseGlow").then((mod) => mod.MouseGlow),
    { ssr: false }
);

export function ClientEffects() {
    return <MouseGlow />;
}
