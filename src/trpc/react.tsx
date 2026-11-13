"use client";

import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import {
  httpBatchLink,
  httpBatchStreamLink,
  httpLink,
  isNonJsonSerializable,
  loggerLink,
  splitLink,
} from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { useState } from "react";
import superjson from "superjson";

import type { AppRouter } from "~/server/api/root";
import { createQueryClient } from "~/trpc/query-client";

let clientQueryClientSingleton: QueryClient | undefined = undefined;
const getQueryClient = () => {
  if (typeof window === "undefined") return createQueryClient();
  clientQueryClientSingleton ??= createQueryClient();
  return clientQueryClientSingleton;
};

/** Dipakai di views/: api.<router>.<prosedur>.useQuery() / useMutation(). */
export const api = createTRPCReact<AppRouter>();

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        splitLink({
          // FormData (unggah berkas, mis. registrasi) tidak bisa digabung dalam batch.
          condition: (op) => isNonJsonSerializable(op.input),
          true: httpLink({
            // Isi FormData dikirim apa adanya; transformer hanya untuk tipe router.
            transformer: superjson,
            url: getBaseUrl() + "/api/trpc",
            headers: () => new Headers({ "x-trpc-source": "nextjs-react" }),
          }),
          // Mutation tanpa streaming supaya Set-Cookie (mis. sesi login) ikut di header respons.
          false: splitLink({
            condition: (op) => op.type === "mutation",
            true: httpBatchLink({
              transformer: superjson,
              url: getBaseUrl() + "/api/trpc",
              headers: () => new Headers({ "x-trpc-source": "nextjs-react" }),
            }),
            false: httpBatchStreamLink({
              transformer: superjson,
              url: getBaseUrl() + "/api/trpc",
              headers: () => new Headers({ "x-trpc-source": "nextjs-react" }),
            }),
          }),
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  );
}
