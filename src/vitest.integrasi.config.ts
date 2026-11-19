import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

// Uji integrasi (HIUPL 4.3): komponen nyata, tanpa mock.
// Butuh PostgreSQL yang sudah dimigrasi (DATABASE_URL di .env).
// File *.http.test.ts juga butuh server berjalan (`pnpm dev`) di NEXT_PUBLIC_APP_URL.
// Isi .env (DATABASE_URL, BETTER_AUTH_SECRET, NEXT_PUBLIC_APP_URL) dimuat ke process.env.
process.loadEnvFile(".env");

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "node",
    include: ["tests/integrasi/**/*.test.ts"],
    // Semua file memakai database yang sama, jadi dijalankan berurutan.
    fileParallelism: false,
    testTimeout: 30_000,
    // Link verifikasi email yang dicetak Better Auth tidak perlu tampil di keluaran uji.
    onConsoleLog: (log) => !log.includes("Link verifikasi email"),
  },
});
