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
docker compose up -d          # PostgreSQL lokal
pnpm prisma migrate dev
pnpm db:seed
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

## Akun Uji

Semua akun uji menggunakan kata sandi `DemoRekanBumi2026!`.

| Peran       | Email                           | Keterangan                                             |
| ----------- | ------------------------------- | ------------------------------------------------------ |
| Inisiator   | `inisiator@rekanbumi.example`   | Lembaga terverifikasi, pemilik semua program seed      |
| Inisiator   | `inisiator2@rekanbumi.example`  | Lembaga masih menunggu verifikasi                      |
| Relawan     | `relawan1@rekanbumi.example`    | Data lengkap; belum mendaftar di "Susur Pantai Bersih" |
| Relawan     | `relawan2@rekanbumi.example`    | Data lengkap; punya pendaftaran diterima dan ditolak   |
| Relawan     | `relawan3@rekanbumi.example`    | Data belum lengkap (tanpa nomor telepon dan domisili)  |
| Verifikator | `verifikator@rekanbumi.example` | Meninjau program dan laporan akhir                     |

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

## Skema Basis Data

Skema, migrasi, dan seed Prisma berada di `prisma/`. PostgreSQL lokal dapat
dijalankan melalui Docker Compose dengan `docker compose up -d`. Atribut di bawah
merujuk pada nama field Prisma; relasi dan batas unik selengkapnya ada di
[`prisma/schema.prisma`](prisma/schema.prisma).

| Tabel                        | Atribut                                                                                                                                                                             |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tbl_program`                | `id`, `namaProgram`, `deskripsi`, `kategori`, `tempatPelaksanaan`, `waktuMulai`, `waktuSelesai`, `kuota`, `syaratKetentuan`, `status`, `inisiatorProgramId`                         |
| `tbl_pendaftaran`            | `id`, `keterampilan`, `ketersediaanWaktu`, `status`, `waktuDaftar`, `notifikasiTerkirimAt`, `relawanId`, `programId`                                                                |
| `tbl_relawan`                | `id`, `nama`, `noTelepon`, `domisili`, `statusVerifikasi`, `totalJamAksi`, `userId`                                                                                                 |
| `tbl_inisiator_program`      | `id`, `namaLembaga`, `tautanSitusResmi`, `statusVerifikasi`, `userId`                                                                                                               |
| `tbl_dokumen_verifikasi`     | `id`, `jenisDokumen`, `urlFile`, `statusVerifikasi`, `userId`                                                                                                                       |
| `tbl_notifikasi`             | `id`, `pesan`, `waktuKirim`, `statusDibaca`, `userId`                                                                                                                               |
| `tbl_kehadiran`              | `id`, `waktuKehadiran`, `relawanId`, `programId`                                                                                                                                    |
| `tbl_riwayat_kontribusi`     | `id`, `totalJamAksi`, `relawanId`                                                                                                                                                   |
| `tbl_riwayat_program`        | `riwayatId`, `programId`                                                                                                                                                            |
| `tbl_laporan_program`        | `id`, `dokumentasiAkhir`, `ringkasanCapaian`, `catatanRevisi`, `statusPeninjauan`, `waktuPengajuan`, `programId`, `verifikatorId`                                                   |
| `user` (Better Auth)         | `id`, `name`, `email`, `emailVerified`, `image`, `peran`, `createdAt`, `updatedAt`                                                                                                  |
| `session` (Better Auth)      | `id`, `expiresAt`, `token`, `createdAt`, `updatedAt`, `ipAddress`, `userAgent`, `userId`                                                                                            |
| `account` (Better Auth)      | `id`, `accountId`, `providerId`, `userId`, `accessToken`, `refreshToken`, `idToken`, `accessTokenExpiresAt`, `refreshTokenExpiresAt`, `scope`, `password`, `createdAt`, `updatedAt` |
| `verification` (Better Auth) | `id`, `identifier`, `value`, `expiresAt`, `createdAt`, `updatedAt`                                                                                                                  |

Seed menyediakan program kuota penuh untuk seleksi, program aktif yang sedang
berlangsung, program selesai dengan kehadiran/riwayat kontribusi, program yang
menunggu verifikasi, serta dua skenario laporan akhir.
