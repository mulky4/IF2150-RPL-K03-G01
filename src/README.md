# RekanBumi

Platform web yang menghubungkan relawan dengan program aksi lingkungan (Jaga Alam & Jaga Iklim) dari lembaga terverifikasi. Tugas Besar IF2150 Rekayasa Perangkat Lunak, K03 – G01.

> Draft README (Modul 1). Bagian bertanda _(menyusul)_ dilengkapi seiring implementasi.

## Teknologi

| Komponen                     | Versi                                                                  |
| ---------------------------- | ---------------------------------------------------------------------- |
| Node.js                      | 20 LTS (`.nvmrc`)                                                      |
| pnpm                         | 10 (`packageManager` di `package.json`, aktif lewat `corepack enable`) |
| Next.js (App Router) + React | 15.5 + 19.1                                                            |
| TypeScript                   | 5                                                                      |
| tRPC + TanStack Query        | 11 + 5                                                                 |
| Prisma ORM                   | 6.19                                                                   |
| Better Auth (+ bcrypt)       | 1.3.34                                                                 |
| Tailwind CSS                 | 4                                                                      |
| PostgreSQL                   | 16 (Docker Compose)                                                    |
| Vitest                       | 3                                                                      |

## Prasyarat

- Node.js 20 (`nvm use`)
- pnpm (`corepack enable`)
- Docker Desktop (untuk PostgreSQL lokal), atau akun Neon sebagai alternatif

## Instalasi & Konfigurasi

```bash
cd src
nvm use
corepack enable
pnpm install
cp .env.example .env          # isi BETTER_AUTH_SECRET (openssl rand -base64 32)
docker compose up -d          # PostgreSQL lokal (menyusul, Modul 3)
pnpm prisma migrate dev
pnpm db:seed                  # (menyusul, Modul 3)
```

| Variabel              | Keterangan                                    |
| --------------------- | --------------------------------------------- |
| `DATABASE_URL`        | Connection string PostgreSQL                  |
| `BETTER_AUTH_SECRET`  | Rahasia acak minimal 32 karakter              |
| `BETTER_AUTH_URL`     | URL aplikasi, default `http://localhost:3000` |
| `NEXT_PUBLIC_APP_URL` | URL aplikasi untuk klien                      |

## Menjalankan

```bash
pnpm dev            # http://localhost:3000
pnpm test           # unit test (Vitest)
pnpm lint           # ESLint
pnpm build          # build produksi
```

Link verifikasi email tidak dikirim lewat email, tetapi dicetak di terminal `pnpm dev`.

## Akun Uji _(menyusul, dari seed)_

## Modul & Pembagian _(menyusul)_

## Struktur Folder

```
app/          routing Next.js (tipis, render View)
views/        View = Boundary Class (C12, C14, C16, C17, C19) + komponen UI
server/
  api/        tRPC: context, procedure per peran, router
  controllers/ Control Class (C13, C15, C18, C20)
  models/     Entity Class (C01–C11)
  adapters/   CloudStorageAdapter (C21), BetterAuth (C22)
prisma/       skema, migrasi, seed
tests/unit/   unit test
```

## Tabel Basis Data _(menyusul, Modul 3)_
