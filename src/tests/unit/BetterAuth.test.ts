import { describe, expect, it } from "vitest";

import { BetterAuth } from "~/server/adapters/BetterAuth";

describe("BetterAuth (C22) – hashing bcrypt, KNF02", () => {
  it("hashKataSandi menghasilkan hash berformat bcrypt", async () => {
    const hash = await BetterAuth.hashKataSandi("Password123!");
    expect(hash).toMatch(/^\$2[ab]\$10\$/);
    expect(hash).not.toContain("Password123!");
  });

  it("cocokkanHash true untuk kata sandi yang benar, false untuk yang salah", async () => {
    const hash = await BetterAuth.hashKataSandi("Password123!");
    expect(await BetterAuth.cocokkanHash("Password123!", hash)).toBe(true);
    expect(await BetterAuth.cocokkanHash("salah", hash)).toBe(false);
  });
});
