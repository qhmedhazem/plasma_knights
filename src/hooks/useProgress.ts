import { useEffect, useState } from "react";

export default function useProgress(
  func: (...args: any[]) => any,
  durationBetween: number = 25000
) {
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState<number>(0); // 0 -> 1

  useEffect(() => {
    let isUnMounted = false;
    let lastRequest = Date.now();
    (async () => {
      await func();
      while (true) {
        const now = Date.now();
        if (now - lastRequest > durationBetween) {
          lastRequest = now;
          setStatus("loading");
          await func();
          setStatus("idle");
          lastRequest = Date.now();
        }
        if (isUnMounted) {
          break;
        }

        setProgress((Date.now() - lastRequest) / durationBetween);
        await new Promise((resolve) => setTimeout(resolve, 20));
      }
    })();
    return () => {
      isUnMounted = true;
    };
  }, [func]);

  return { status, progress };
}
