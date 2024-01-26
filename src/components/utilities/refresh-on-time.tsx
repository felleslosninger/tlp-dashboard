"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function RefreshOnTime({ time }: { time: number }) {
  const { refresh } = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      refresh();
    }, time);

    return () => clearInterval(interval);
  }, [refresh, time]);

  return null;
}