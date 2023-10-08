"use client";

import { useProbabilityStore } from "@/store/probability-store";
import { InputPage } from "./input_page";
import { DataPage } from "./data_page";

export type DataState = "idle" | "loading" | "error" | "success";

export default function Home() {
  const status = useProbabilityStore((state) => state.status);

  return (
    <main>
      {status === "idle" || status === "loading" ? (
        <InputPage disabled={status === "loading"} className="m-[0_auto]" />
      ) : null}
      {status === "success" ? <DataPage className="m-[0_auto]" /> : null}
    </main>
  );
}
