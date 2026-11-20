import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "node",
    include: ["tests/unit/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: ["server/**/*.ts", "lib/**/*.ts"],
      reporter: ["text", "html", "json-summary"],
      reportsDirectory: "coverage",
      // Kelas bertingkat Mendalam wajib ≥ 70% (HIUPL 4.2). Tambahkan file kelas
      // Mendalam modul lain di sini supaya `pnpm test:coverage` gagal kalau di bawahnya.
      thresholds: {
        "server/controllers/AuthController.ts": { lines: 70, branches: 70 },
        "server/models/Notifikasi.ts": { lines: 70, branches: 70 },
        "server/adapters/BetterAuth.ts": { lines: 70, branches: 70 },
        "server/adapters/CloudStorageAdapter.ts": { lines: 70, branches: 70 },
        "server/models/RiwayatKontribusi.ts": { lines: 70, branches: 70 },
        "server/controllers/PresensiController.ts": { lines: 70, branches: 70 },
      },
    },
  },
});
