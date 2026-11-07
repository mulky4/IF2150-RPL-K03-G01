import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "uploads/**",
      "next-env.d.ts",
    ],
  },
  {
    // Aturan lapisan MVC (SPEC §4): views/ tidak boleh import server/ atau Prisma.
    files: ["views/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["~/server/*", "@prisma/client"],
              allowTypeImports: true,
              message:
                "views/ cuma boleh manggil tRPC (api.xxx). Jangan import server/ atau Prisma.",
            },
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
