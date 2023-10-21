"use client";

import dynamic from "next/dynamic";
import { useProbabilityStore } from "@/store/mr-probability-store";
const InputPage = dynamic(() => import("./input_page"), { ssr: false });
const DataPage = dynamic(() => import("./data_page"), { ssr: false });

export type DataState = "idle" | "loading" | "error" | "success";

export default function Home() {
  const status = useProbabilityStore((state) => state.status);

  return (
    <main>
      {status === "idle" || status === "loading" || status === "error" ? (
        <InputPage disabled={status === "loading"} className="m-[0_auto]" />
      ) : null}
      {status === "success" ? <DataPage className="m-[0_auto]" /> : null}
    </main>
  );
}
