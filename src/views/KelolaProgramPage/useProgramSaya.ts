"use client";

import { useMemo, useState } from "react";

import { saringProgram, type FilterProgram } from "~/lib/programSaya";
import { api } from "~/trpc/react";

/** State dan data untuk I-07 Program Saya. */
export function useProgramSaya() {
  const query = api.program.programSaya.useQuery();
  const [filter, setFilter] = useState<FilterProgram>("SEMUA");

  const daftar = useMemo(
    () => saringProgram(query.data?.program ?? [], filter),
    [query.data, filter],
  );

  return {
    data: query.data,
    daftar,
    filter,
    setFilter,
    sedangMemuat: query.isLoading,
    galat: query.error?.message ?? null,
  };
}
