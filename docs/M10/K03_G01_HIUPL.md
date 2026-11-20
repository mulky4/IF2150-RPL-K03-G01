<h1>
IF2150 REKAYASA PERANGKAT LUNAK
<br>
TUGAS 10
<br>
HASIL IMPLEMENTASI DAN UJI PERANGKAT LUNAK (HIUPL)
</h1>
<br>

## *Nama Perangkat Lunak*
### *[Logo Perangkat Lunak]*

### Untuk: *[Nama Asisten]*

Dipersiapkan oleh:
| Informasi | Keterangan |
| --- | --- |
| Kelas | *\[Kelas\]* |
| Kelompok | *\[Nomor Kelompok\]*  |

| NIM | Nama |
|---|---|
| *[NIM 1]* | *[Nama Anggota 1]* |
| *[NIM 2]* | *[Nama Anggota 2]* |
| *[NIM 3]* | *[Nama Anggota 3]* |
| *[NIM 4]* | *[Nama Anggota 4]* |
| *[NIM 5]* | *[Nama Anggota 5]* |

---

## Daftar Isi

- [BAB 1: Pendahuluan](#bab-1-pendahuluan)
  - [1.1 Tujuan Penulisan Dokumen](#11-tujuan-penulisan-dokumen)
  - [1.2 Lingkup Masalah](#12-lingkup-masalah)
  - [1.3 Definisi, Istilah, dan Singkatan](#13-definisi-istilah-dan-singkatan)
  - [1.4 Aturan Penomoran](#14-aturan-penomoran)
  - [1.5 Referensi](#15-referensi)
  - [1.6 Deskripsi Umum Dokumen (Ikhtisar)](#16-deskripsi-umum-dokumen-ikhtisar)
- [BAB 2: Deskripsi Umum Perangkat Lunak](#bab-2-deskripsi-umum-perangkat-lunak)
- [BAB 3: Implementasi](#bab-3-implementasi)
  - [3.1 Lingkungan Implementasi](#31-lingkungan-implementasi)
  - [3.2 Implementasi Modul](#32-implementasi-modul)
  - [3.3 Implementasi Antarmuka](#33-implementasi-antarmuka)
  - [3.4 File Lain](#34-file-lain)
- [BAB 4: Hasil Pengujian](#bab-4-hasil-pengujian)
  - [4.1 Strategi dan Kedalaman Pengujian Kelas](#41-strategi-dan-kedalaman-pengujian-kelas)
  - [4.2 Pengujian Unit Kelas](#42-pengujian-unit-kelas)
  - [4.3 Pengujian Integrasi](#43-pengujian-integrasi)
  - [4.4 Pengujian Use Case](#44-pengujian-use-case)
  - [4.5 Pengujian Kebutuhan Non-Fungsional (KNF)](#45-pengujian-kebutuhan-non-fungsional-knf)
  - [4.6 Tangkapan Layar dan Bukti Hasil Pengujian](#46-tangkapan-layar-dan-bukti-hasil-pengujian)
- [BAB 5: Traceability](#bab-5-traceability)

---

## Daftar Perubahan

| Revisi | Deskripsi |
| :--- | :--- |
| *A* | *Deskripsikan perubahan yang dilakukan dari dokumen sebelumnya pada dokumen ini. Jika tidak terdapat perubahan, harap kosongkan tabel.* |
| *B* |  |
| *C* |  |
| ... |  |

---

# BAB 1: Pendahuluan

## 1.1 Tujuan Penulisan Dokumen
Tuliskan uraian ringkas mengenai isi dokumen, tujuan pembuatan dokumen HIUPL ini, dan siapa saja target pembacanya.

## 1.2 Lingkup Masalah
Tuliskan lingkup masalah, yaitu membangun perangkat lunak *[nama perangkat lunak]*. Jelaskan dengan singkat dan jelas deskripsi aplikasi serta keterkaitannya dengan perangkat lunak atau sistem lain (jika ada). Bagian ini maksimal berisi satu paragraf, dapat diambil dari SKPL/DPPL.

## 1.3 Definisi, Istilah, dan Singkatan
Semua definisi dan singkatan yang digunakan dalam dokumen ini beserta penjelasannya.

Tabel 1.3. Definisi Istilah dan Singkatan

| Singkatan, Akronim, atau Istilah | Penjelasan |
| :--- | :--- |
| *P/L* | *Singkatan dari Perangkat Lunak, yaitu aplikasi yang memberikan perintah kepada komputer untuk menjalankan tugas tertentu.* |
| *SKPL* | *Singkatan dari Spesifikasi Kebutuhan Perangkat Lunak, yaitu dokumen yang merangkum kriteria-kriteria yang diperlukan untuk membangun aplikasi menjalankan tugasnya.* |
| *DPPL* | *Singkatan dari Deskripsi Perancangan Perangkat Lunak, yaitu dokumen yang menjelaskan rancangan arsitektur, kelas, dan antarmuka P/L.* |
| *HIUPL* | *Singkatan dari Hasil Implementasi dan Uji Perangkat Lunak, yaitu dokumen yang melaporkan hasil implementasi dan pengujian P/L.* |
| *KF* | *Singkatan dari Kebutuhan Fungsional.* |
| *KNF* | *Singkatan dari Kebutuhan Non-Fungsional.* |
| *UC* | *Singkatan dari Use Case.* |
| *TC* | *Singkatan dari Test Case, yaitu satu kasus uji untuk skenario tertentu.* |
| *UT* | *Singkatan dari Unit Test, yaitu test case tingkat kelas/operasi.* |
| *INT* | *Singkatan dari Integration Test, yaitu test case yang menguji interaksi antarkomponen.* |
| *Boundary* | *Kasus uji pada nilai batas masukan, misalnya nilai minimum, maksimum, atau tepat di ambang aturan.* |
| *Coverage* | *Persentase baris/cabang kode yang dieksekusi oleh pengujian.* |
| *...* | *...* |

## 1.4 Aturan Penomoran
Tuliskan aturan penomoran (ID) yang digunakan dalam dokumen ini. Gunakan pola ID yang **sama** dengan yang sudah dipakai pada dokumen-dokumen sebelumnya (SKPL, APL, DPPL), kecuali untuk ID pengujian yang baru diperkenalkan pada dokumen ini.

Tabel 1.4. Aturan Penomoran

| Hal/Bagian | Penomoran | Keterangan |
| :--- | :--- | :--- |
| *Kebutuhan Fungsional* | *KFXX* | *Sesuai SKPL* |
| *Kebutuhan Non-Fungsional* | *KNFXX* | *Sesuai SKPL* |
| *Use Case* | *UCXX* | *Sesuai SKPL* |
| *Kelas* | *CXX* | *Sesuai DPPL* |
| *Antarmuka* | *I-XX* | *Sesuai DPPL* |
| *Test Case Unit* | *CXX-UTYY* | *XX adalah nomor kelas, YY adalah nomor urut test case unit pada kelas tersebut* |
| *Test Case Integrasi* | *INT-TCYY* | *YY adalah nomor urut test case integrasi* |
| *Test Case Use Case* | *UCXX-TCYY* | *XX adalah nomor use case, YY adalah nomor urut test case pada use case tersebut* |
| *Test Case KNF* | *KNFXX-TCYY* | *XX adalah nomor KNF, YY adalah nomor urut test case pada KNF tersebut* |
| *...* | *...* | *...* |

## 1.5 Referensi
Cantumkan daftar buku, panduan, atau dokumentasi lain yang dirujuk dalam pembuatan dokumen dan pengembangan P/L, **minimal dokumen SKPL, APL, DPPL, dan Implementasi (Tugas 9)**. Tambahkan dokumentasi *framework*/*library*/*testing tool* atau referensi lain apabila digunakan.

## 1.6 Deskripsi Umum Dokumen (Ikhtisar)
Tuliskan sistematika pembahasan dokumen ini secara ringkas dan runut bab demi bab, dengan maksimal 1 paragraf.

<br>

---

# BAB 2: Deskripsi Umum Perangkat Lunak

Bagian ini diisi dengan *System Overview*, dalam bentuk gambar dan narasi yang memberikan gambaran tentang aplikasi dan konteksnya. **Batasan dan keterkaitan** antara sistem yang dibangun dengan sistem lain di luarnya harus jelas. Deskripsi umum sistem perlu dilengkapi dengan pemodelan kasus yang dihadapi, seperti *use case diagram*. Berikan narasi yang jelas untuk setiap gambar yang ditampilkan.

Bagian ini dapat menyalin atau meringkas dari dokumen SKPL atau DPPL.

<p align="center">
<img alt="System Overview / Use Case Diagram" src="./assets/contoh-uc-diagram.webp" width="90%">
</p>
<p align="center">
<i>Gambar 2.1. Use Case Diagram [Nama P/L]</i>
</p>

<br>

---

# BAB 3: Implementasi

Bagian ini diisi dengan informasi tentang elemen P/L yang dikembangkan (*executable files*, *configuration files*, *data files*, dan sebagainya) serta perubahannya terhadap rancangan pada DPPL (jika ada).

RekanBumi adalah aplikasi web Next.js. Tidak ada berkas *executable* terpisah per kelas: seluruh kode di `src/` dibangun menjadi satu aplikasi oleh `pnpm build` (hasil di `src/.next/`) dan dijalankan dengan `pnpm start`. Karena itu kolom "Nama File Executable" pada Tabel 3.2 dan 3.3 diisi `-`.

## 3.1 Lingkungan Implementasi

Lingkungan implementasi mengikuti Subbab 2.1 DPPL. Versi pada Tabel 3.1 diambil dari `src/package.json` dan `src/pnpm-lock.yaml` pada tag `v9.0`.

Tabel 3.1. Lingkungan Implementasi

| Aspek | Keterangan |
| :--- | :--- |
| *Hardware* | Laptop pribadi tiap anggota tim untuk pengembangan dan pengujian lokal. *[Lengkapi spesifikasi prosesor dan RAM laptop anggota.]* |
| *Operating System* | Aplikasi lintas platform karena berjalan di atas Node.js. Pengguna mengakses lewat peramban modern di desktop dan ponsel (SKPL 2.5). Pengujian pada dokumen ini dijalankan di Linux (kontainer) dengan Node.js 22.23.5. |
| *Bahasa Pemrograman* | TypeScript 5.9.3, SQL (PostgreSQL, berkas migrasi Prisma), CSS (Tailwind) |
| *Framework/Library* | Next.js 15.5.29 (App Router), React 19.1.0, tRPC 11.25.0, TanStack React Query 5.107.1, superjson, Prisma ORM 6.19.3, Better Auth 1.3.34, bcryptjs 3.0.3, Zod 3.25.76, Tailwind CSS 4.3.5 |
| *DBMS* | PostgreSQL 16 lewat Docker Compose (`src/docker-compose.yml`) untuk pengembangan lokal. Neon PostgreSQL pada DPPL tetap bisa dipakai dengan mengganti `DATABASE_URL`. |
| *Development Tools* | Visual Studio Code, Git dan GitHub (alur Gitflow-lite dengan *pull request* dan *review*), pnpm 10.28.0, Node.js 20–22 (`src/.nvmrc` = 20), Docker, Prisma CLI dan Prisma Studio, ESLint 9.39.5, Prettier 3.9.10, draw.io |
| *Testing Tools* | Vitest 3.2.7 (unit test dan integration test otomatis), @vitest/coverage-v8 3.2.7 (laporan *coverage* % baris dan % cabang), tsx 4.23.15 (skrip uji KNF dan uji beban di `src/tests/knf/` dan `src/tests/beban/`), `psql` (inspeksi basis data untuk KNF *security*), peramban Google Chrome/Chromium (pengujian use case manual), Chrome DevTools dan Lighthouse (KNF waktu respons dan aksesibilitas) |

Perubahan terhadap Subbab 2.1 DPPL:

1. **DBMS.** DPPL menulis Neon PostgreSQL. Pengembangan dan pengujian memakai PostgreSQL 16 lokal lewat Docker supaya setiap anggota punya basis data sendiri. Skema dan migrasi Prisma sama untuk keduanya.
2. ***Filing system*.** Layanan *cloud storage* belum dipilih (DPPL 2.1 masih bertanda "belum"). `CloudStorageAdapter` (C21) menyimpan berkas di folder lokal `src/uploads/`. Kelas lain hanya memanggil C21, jadi pindah ke layanan *cloud* cukup mengganti isi `unggahBerkas()` dan `ambilBerkas()`.
3. **Node.js.** DPPL menulis Node.js 20+. `package.json` membatasi `>=20 <23` karena versi itu yang diuji tim.
4. ***Testing tools*.** Vitest, coverage v8, dan tsx belum tercantum di DPPL dan ditambahkan untuk Tugas 10.

## 3.2 Implementasi Modul

Daftar modul/kelas yang **TELAH** diimplementasikan, konsisten dengan Tabel B.5 dokumen Implementasi (Tugas 9). Seluruh path relatif terhadap akar repositori.

Tabel 3.2. Implementasi Modul

| No | ID Kelas | Nama Modul/Kelas | Nama File Fisik | Nama File Executable |
| :--- | :--- | :--- | :--- | :--- |
| 1 | C01 | Program | *[path/ke/file]* | - |
| 2 | C02 | Pendaftaran | *[path/ke/file]* | - |
| 3 | C03 | Relawan | `src/server/models/Relawan.ts`<br>`src/prisma/schema.prisma` (model `Relawan`, tabel `tbl_relawan`) | - |
| 4 | C04 | Pengguna | `src/server/models/Pengguna.ts`<br>`src/prisma/schema.prisma` (model `User`, tabel `user`) | - |
| 5 | C05 | InisiatorProgram | *[path/ke/file]* | - |
| 6 | C06 | Verifikator | `src/server/models/Verifikator.ts` | - |
| 7 | C07 | DokumenVerifikasi | *[path/ke/file]* | - |
| 8 | C08 | Kehadiran | `src/server/models/Kehadiran.ts`<br>`src/prisma/schema.prisma` (model `Kehadiran`, tabel `tbl_kehadiran`) | - |
| 9 | C09 | LaporanProgram | `src/server/models/LaporanProgram.ts`<br>`src/prisma/schema.prisma` (model `LaporanProgram`, tabel `tbl_laporan_program`) | - |
| 10 | C10 | Notifikasi | `src/server/models/Notifikasi.ts`<br>`src/prisma/schema.prisma` (model `Notifikasi`, tabel `tbl_notifikasi`) | - |
| 11 | C11 | RiwayatKontribusi | `src/server/models/RiwayatKontribusi.ts`<br>`src/prisma/schema.prisma` (model `RiwayatKontribusi`, tabel `tbl_riwayat_kontribusi`; model `RiwayatProgram`, tabel `tbl_riwayat_program`) | - |
| 12 | C12 | KelolaAkunPage | `src/views/KelolaAkunPage/Registrasi.tsx`<br>`src/views/KelolaAkunPage/Login.tsx`<br>`src/views/KelolaAkunPage/Notifikasi.tsx`<br>`src/views/KelolaAkunPage/useKelolaAkunPage.ts`<br>`src/views/KelolaAkunPage/daftarDomisili.ts`<br>`src/lib/urlKembali.ts` | - |
| 13 | C13 | AuthController | `src/server/controllers/AuthController.ts`<br>`src/server/api/routers/auth.ts` (router tRPC `auth`) | - |
| 14 | C14 | KelolaProgramPage | `src/views/KelolaProgramPage/ProgramFormView.tsx`<br>`src/views/KelolaProgramPage/ProgramSayaView.tsx`<br>`src/views/KelolaProgramPage/ProgramDaftarView.tsx`<br>`src/views/KelolaProgramPage/DashboardVerifikator.tsx`<br>`src/views/KelolaProgramPage/useProgramDaftar.ts`<br>`src/views/KelolaProgramPage/useProgramSaya.ts`<br>`src/views/KelolaProgramPage/useDashboardVerifikator.ts`<br>`src/views/laporan/LaporanFormView.tsx`<br>`src/views/laporan/LaporanVerifikasiView.tsx`<br>`src/views/laporan/LaporanDetailView.tsx`<br>`src/views/laporan/LaporanMasukView.tsx`<br>`src/lib/programSaya.ts` | - |
| 15 | C15 | ProgramController | `src/server/controllers/ProgramController.ts`<br>`src/server/api/routers/program.ts` (router tRPC `program`)<br>`src/server/api/routers/laporan.ts` (router tRPC `laporan`) | - |
| 16 | C16 | EksplorasiProgramPage | *[path/ke/file]* | - |
| 17 | C17 | KelolaPendaftarPage | *[path/ke/file]* | - |
| 18 | C18 | SeleksiController | *[path/ke/file]* | - |
| 19 | C19 | AreaKegiatanPage | `src/views/AreaKegiatanPage/AreaKegiatan.tsx`<br>`src/views/AreaKegiatanPage/Portofolio.tsx`<br>`src/views/AreaKegiatanPage/useAreaKegiatanPage.ts` | - |
| 20 | C20 | PresensiController | `src/server/controllers/PresensiController.ts`<br>`src/server/api/routers/presensi.ts` (router tRPC `presensi`) | - |
| 21 | C21 | CloudStorageAdapter | `src/server/adapters/CloudStorageAdapter.ts` | - |
| 22 | C22 | BetterAuth | `src/server/adapters/BetterAuth.ts`<br>`src/server/auth.ts` (konfigurasi Better Auth)<br>`src/lib/auth-client.ts`<br>`src/app/api/auth/[...all]/route.ts` | - |

## 3.3 Implementasi Antarmuka

Daftar antarmuka yang telah diimplementasikan, dengan ID dan nama layar sesuai BAB 6 DPPL.

Tabel 3.3. Implementasi Antarmuka

| No | ID Antarmuka | Nama Antarmuka | Nama File Fisik | Nama File Executable |
| :--- | :--- | :--- | :--- | :--- |
| 1 | I-01 | Registrasi Akun | `src/app/registrasi/page.tsx`<br>`src/views/KelolaAkunPage/Registrasi.tsx` | - |
| 2 | I-02 | Login | `src/app/login/page.tsx`<br>`src/views/KelolaAkunPage/Login.tsx` | - |
| 3 | I-03 | Notifikasi | `src/app/notifikasi/page.tsx`<br>`src/views/KelolaAkunPage/Notifikasi.tsx`<br>`src/views/components/NotifikasiItem.tsx`<br>ikon lonceng dan angka belum dibaca di `src/views/components/Navbar.tsx` | - |
| 4 | I-04 | Eksplorasi Program | *[path/ke/file]* | - |
| 5 | I-05 | Detail Program | *[path/ke/file]* | - |
| 6 | I-06 | Formulir Pendaftaran Program | *[path/ke/file]* | - |
| 7 | I-07 | Program Saya | `src/app/inisiator/program/page.tsx`<br>`src/views/KelolaProgramPage/ProgramSayaView.tsx`<br>`src/views/KelolaProgramPage/useProgramSaya.ts` | - |
| 8 | I-08 | Formulir Daftar Program | *[path/ke/file]* | - |
| 9 | I-09 | Unggah Laporan Akhir | `src/app/laporan/page.tsx`<br>`src/views/laporan/LaporanFormView.tsx` | - |
| 10 | I-10 | Tinjau Laporan Akhir | `src/app/verifikator/laporan/page.tsx`<br>`src/app/verifikator/laporan/[id]/page.tsx`<br>`src/views/laporan/LaporanVerifikasiView.tsx`<br>`src/views/laporan/LaporanDetailView.tsx` | - |
| 11 | I-11 | Kelola Pendaftar & Seleksi | *[path/ke/file]* | - |
| 12 | I-12 | Area Kegiatan & Check-in | `src/app/kegiatan/page.tsx`<br>`src/views/AreaKegiatanPage/AreaKegiatan.tsx`<br>`src/views/AreaKegiatanPage/useAreaKegiatanPage.ts` (`useAreaKegiatanPage()`)<br>menu "Kegiatan Saya" untuk Relawan di `src/views/components/navigasi.ts` | - |
| 13 | I-13 | Portofolio Relawan | `src/app/portofolio/page.tsx`<br>`src/views/AreaKegiatanPage/Portofolio.tsx`<br>`src/views/AreaKegiatanPage/useAreaKegiatanPage.ts` (`usePortofolio()`)<br>menu "Portofolio" untuk Relawan di `src/views/components/navigasi.ts` | - |
| 14 | - | Dashboard Verifikator *(tambahan di luar DPPL)* | `src/app/verifikator/page.tsx`<br>`src/views/KelolaProgramPage/DashboardVerifikator.tsx`<br>`src/views/KelolaProgramPage/useDashboardVerifikator.ts` | - |

## 3.4 File Lain

Daftar file selain file kelas dan antarmuka pada Tabel 3.2 dan 3.3. Path relatif terhadap folder `src/`.

Tabel 3.4. File Lain

| No | Nama File | Keterangan |
| :--- | :--- | :--- |
| 1 | `package.json`, `pnpm-lock.yaml` | Daftar dependensi beserta versinya yang terkunci, serta perintah proyek (`dev`, `build`, `lint`, `test`, `test:coverage`, `test:integrasi`, `db:migrate`, `db:seed`). |
| 2 | `.nvmrc` | Versi Node.js yang dipakai tim (20). |
| 3 | `.env.example` | Contoh variabel lingkungan: `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_APP_URL`. Berkas `.env` asli tidak di-*commit*. |
| 4 | `docker-compose.yml` | Menjalankan PostgreSQL 16 lokal (basis data `rekanbumi`). |
| 5 | `next.config.ts` | Konfigurasi Next.js. |
| 6 | `tsconfig.json` | Konfigurasi TypeScript, termasuk alias impor `~/` ke `src/`. |
| 7 | `eslint.config.mjs`, `.prettierrc.json`, `.prettierignore` | Aturan *linting* dan format kode (ESLint dan Prettier dengan plugin Tailwind). |
| 8 | `postcss.config.mjs`, `app/globals.css` | Konfigurasi Tailwind CSS 4 dan token warna, tipografi, serta jarak *design system*. |
| 9 | `prisma/schema.prisma` | Skema basis data: model domain (C01–C11, `@@map("tbl_...")`), tabel Better Auth (`user`, `session`, `account`, `verification`), dan enum status. |
| 10 | `prisma/migrations/*/migration.sql` | Lima migrasi berurutan, dari tabel Better Auth (`20261107113719_tabel_better_auth`) sampai tabel seleksi pendaftar (`20261113120000_seleksi_pendaftar`). |
| 11 | `prisma/seed.ts` | Data contoh: 7 program, 2 inisiator, 3 relawan, 1 verifikator, 6 pendaftaran, dan 2 laporan. Kata sandi akun contoh: `DemoRekanBumi2026!`. |
| 12 | `server/db.ts` | Satu objek Prisma Client untuk seluruh aplikasi (disebut `DB_SERVICE` pada algoritma DPPL). |
| 13 | `server/api/trpc.ts`, `server/api/root.ts` | Konteks tRPC (membaca sesi Better Auth), prosedur per peran (`publicProcedure`, `protectedProcedure`, dan prosedur khusus peran), serta gabungan seluruh router. |
| 14 | `app/api/trpc/[trpc]/route.ts` | Titik akhir HTTP tRPC (`/api/trpc/*`). |
| 15 | `trpc/react.tsx`, `trpc/query-client.ts` | Klien tRPC dan React Query untuk komponen di `views/`. |
| 16 | `server/models/enums.ts` | Enum `Peran`, `StatusVerifikasi`, dan status lain yang dipakai bersama. |
| 17 | `lib/galat.ts` | Kelas `GalatValidasi` yang membawa seluruh pesan galat isian sekaligus ke layar. |
| 18 | `lib/waktu.ts`, `lib/programSaya.ts`, `lib/pencarianProgram.ts`, `lib/cn.ts`, `lib/belumDiimplementasi.ts` | Fungsi utilitas: format waktu WIB, filter Program Saya, batas pencarian, penggabung `className`, dan penanda operasi kerangka kelas. |
| 19 | `app/layout.tsx`, `views/components/` | Layout global dan komponen *design system* (Button, Input, Banner, Modal, Navbar, BottomNav, dan lainnya). |
| 20 | `public/` | Logo dan ikon aplikasi. |
| 21 | `uploads/` | Folder penyimpanan berkas unggahan CloudStorageAdapter. Isinya diabaikan git, kecuali `.gitkeep`. |
| 22 | `vitest.config.ts` | Konfigurasi unit test (`tests/unit/`) dan *coverage* v8, termasuk ambang 70% untuk kelas Mendalam. |
| 23 | `vitest.integrasi.config.ts` | Konfigurasi integration test (`tests/integrasi/`): basis data asli, tanpa *mock*, dijalankan berurutan. |
| 24 | `tests/unit/*.test.ts` | Unit test per kelas (Subbab 4.2). |
| 25 | `tests/integrasi/*.test.ts` | Integration test dengan komponen nyata (Subbab 4.3). |
| 26 | `tests/knf/*.ts`, `tests/beban/*.ts` | Skrip uji KNF dan uji beban (Subbab 4.5). |

<br>

---

# BAB 4: Hasil Pengujian

Bab ini melaporkan hasil pengujian P/L pada level unit, integrasi, dan sistem. Pengujian dilakukan pada tag release terakhir Tugas 9 (`v9.0`). Hasil aktual diisi berdasarkan pengamatan saat pengujian. Kesimpulan diisi `Pass` atau `Fail`, dan untuk `Fail` dilengkapi penyebab serta usulan perbaikan.

## 4.1 Strategi dan Kedalaman Pengujian Kelas

Setiap kelas perancangan pada Tabel 4.1 DPPL diklasifikasikan ke dalam tiga tingkat kedalaman pengujian. Tingkat **Mendalam** diberikan pada kelas yang memuat logika bisnis, perhitungan, validasi, aturan status, algoritma, integrasi eksternal, atau keamanan. Tingkat **Sedang** diberikan pada kelas yang hanya mengoordinasikan atau mendelegasikan proses. Tingkat **Tidak perlu** diberikan pada kelas tanpa logika, seperti *entity/DTO* dan kelas konfigurasi, yang teruji secara tidak langsung melalui test case use case. Seluruh kelas wajib dicantumkan beserta alasan penentuan tingkatnya.

Tabel 4.1.1. Identifikasi Tingkat Pengujian Kelas

| ID Kelas | Nama Kelas | Tingkat | Alasan | Test Case Terkait |
| :--- | :--- | :--- | :--- | :--- |
| C01 | Program | *[Mendalam/Sedang/Tidak perlu]* | *[Alasan penentuan tingkat pengujian]* | *[ID test case atau -]* |
| C02 | Pendaftaran | Mendalam | Memuat aturan transisi status seleksi: `terima()` dan `tolak()` hanya boleh dari status MENUNGGU, serta pemeriksaan status (Algo-C02-01 s.d. Algo-C02-04) | C02-UT01 s.d. C02-UT06, INT-TC24 |
| C03 | Relawan | Sedang | Sebagian besar operasinya mendelegasikan: `hadirPada()` meneruskan pengecekan ke Kehadiran (C08), `catatKontribusi()` hanya memeriksa kehadiran lalu meneruskan pencatatan jam ke RiwayatKontribusi (C11), dan `lihatPortofolio()` menyiapkan riwayat kosong untuk relawan baru. Aturan jam aksi dan check-in ganda ada di C11 dan C20. | C03-UT01 s.d. C03-UT07, C20-UT11, C20-UT19 |
| C04 | Pengguna | Sedang | Hanya mencari akun dan mengambil notifikasi milik akun dari basis data. Tidak ada aturan sendiri, tetapi dipakai alur notifikasi UC06. | C04-UT01 s.d. C04-UT03, INT-TC07 |
| C05 | InisiatorProgram | *[Mendalam/Sedang/Tidak perlu]* | *[Alasan penentuan tingkat pengujian]* | *[ID test case atau -]* |
| C06 | Verifikator | Sedang | Kelas model yang mendelegasikan keputusan peninjauan ke LaporanProgram (C09): `konfirmasiLaporan()` memanggil `setujui()` dan `tolakLaporan()` memanggil `tolak()`, dengan penjaga laporan tidak ada dan catatan revisi kosong. Pada implementasi, alur peninjauan laporan dijalankan oleh ProgramController (C15) lewat router `laporan`, sehingga kelas ini tidak dipanggil dari kode aplikasi. Belum ada unit test (coverage 0%) dan belum memenuhi minimum 2 test case per operasi. | - |
| C07 | DokumenVerifikasi | *[Mendalam/Sedang/Tidak perlu]* | *[Alasan penentuan tingkat pengujian]* | *[ID test case atau -]* |
| C08 | Kehadiran | Tidak perlu | *Entity* yang hanya menyimpan waktu check-in dan id program. Satu-satunya operasi, `untukProgram()`, hanya membandingkan id program. Kelas ini teruji tidak langsung lewat `Relawan.hadirPada()` pada test case C03 dan C20 serta test case use case konfirmasi kehadiran. | - |
| C09 | LaporanProgram | Mendalam | Memuat aturan status peninjauan (laporan hanya bisa ditinjau sekali, dari MENUNGGU menjadi DISETUJUI atau DITOLAK), validasi tautan dokumentasi tidak boleh kosong, dan catatan revisi wajib saat menolak. Belum memenuhi minimum 3 test case per operasi public (4 tes untuk 5 operasi). | `LaporanProgram.test.ts` (4 tes, coverage 100% baris dan 100% cabang) |
| C10 | Notifikasi | Mendalam | Memuat validasi pesan (tidak boleh kosong), aturan status dibaca (`baca()` hanya menulis sekali), dan pemeriksaan kepemilikan `milik()` yang menjaga notifikasi pengguna lain. | C10-UT01 s.d. C10-UT11, INT-TC07, INT-TC08 |
| C11 | RiwayatKontribusi | Mendalam | Memuat perhitungan total jam aksi dari durasi program, aturan satu program hanya boleh tercatat sekali pada riwayat, dan validasi jam aksi tidak boleh negatif. Kelas ini satu-satunya sumber total jam aksi pada portofolio. | C11-UT01 s.d. C11-UT08, C20-UT25 s.d. C20-UT35 |
| C12 | KelolaAkunPage | Sedang | Kelas *boundary*: sebagian besar operasinya menampilkan formulir dan meneruskan isian ke C13. Satu-satunya logika adalah penyaringan `urlKembali` agar tidak bisa dipakai untuk *open redirect*. Alur layarnya diuji pada test case use case. | C12-UT01 s.d. C12-UT04, INT-TC05, INT-TC06, UC01-TC01 s.d. UC01-TC02, UC02-TC01 s.d. UC02-TC04, UC06-TC01 |
| C13 | AuthController | Mendalam | Memuat validasi kelengkapan registrasi, pembatalan akun bila penyimpanan gagal, pemblokiran IP setelah 5 kali gagal selama 5 menit (KNF06), sinkronisasi status verifikasi, dan pemeriksaan kepemilikan notifikasi. | C13-UT01 s.d. C13-UT41, INT-TC01 s.d. INT-TC09, KNF06-TC01, KNF06-TC02 |
| C14 | KelolaProgramPage | Sedang | Kelas *boundary*: sebagian besar menampilkan formulir dan daftar lalu meneruskannya ke C15. Logika yang bisa diuji unit ada di `src/lib/programSaya.ts`: pemetaan status ke label dan badge, aksi tombol per status (unggah laporan, unggah ulang), statistik, penyaringan, dan persen kuota. Alur layar I-07, I-09, dan I-10 diuji lewat test case use case. | `programSaya.test.ts` (9 tes, coverage 97,26% baris dan 100% cabang) |
| C15 | ProgramController | Mendalam | Memuat transaksi basis data, aturan status program dan laporan, pembaruan portofolio saat laporan DISETUJUI, notifikasi ke verifikator dan inisiator, serta pemeriksaan kepemilikan program. Untuk bagian laporan dan verifikasi: `ProgramController.ajukanLaporan.test.ts` (3 tes), `.peninjauan.test.ts` (4), `.verifikasi.test.ts` (4), `.menungguVerifikasi.test.ts` (3), `.programSaya.test.ts` (2). Coverage seluruh kelas: 78,28% baris, 86,53% cabang, 77,27% fungsi. | `ProgramController.*.test.ts` (16 tes untuk bagian laporan dan verifikasi) |
| C16 | EksplorasiProgramPage | *[Mendalam/Sedang/Tidak perlu]* | *[Alasan penentuan tingkat pengujian]* | *[ID test case atau -]* |
| C17 | KelolaPendaftarPage | Tidak perlu | Kelas view yang hanya menampilkan daftar pendaftar dan meneruskan keputusan ke SeleksiController, tanpa logika bisnis | - (teruji tidak langsung lewat UC05-TC01, UC05-TC02, INT-TC28) |
| C18 | SeleksiController | Mendalam | Memuat validasi kelayakan relawan (KF10), pemeriksaan kuota (KF05), dan aturan konfirmasi hasil seleksi sebelum notifikasi dikirim (KF08, KF09) (Algo-C18-01 s.d. Algo-C18-06) | C18-UT01 s.d. C18-UT12, INT-TC20 s.d. INT-TC27, INT-TC29 |
| C19 | AreaKegiatanPage | Tidak perlu | Kelas *boundary* yang hanya menampilkan daftar kegiatan, tombol check-in, dan portofolio dari data C20. Aktif tidaknya tombol check-in mengikuti hasil `validasiStatusRelawan()` dan `validasiWaktuPelaksanaan()` milik C20, sehingga tidak ada aturan sendiri. Alur layar I-12 dan I-13 diuji lewat test case use case. | - |
| C20 | PresensiController | Mendalam | Memuat validasi check-in (pendaftaran harus diterima, program harus aktif, dan waktu harus di dalam rentang pelaksanaan), penolakan check-in ganda termasuk saat terjadi bersamaan di basis data, serta pembaruan jam aksi portofolio dalam satu transaksi saat program selesai. | C20-UT01 s.d. C20-UT47, KNF04-TC01 |
| C21 | CloudStorageAdapter | Mendalam | Integrasi ke penyimpanan berkas. Memvalidasi ukuran (maksimal 2 MB) dan tipe berkas dari byte awalnya, membuat nama berkas sendiri, dan menolak path yang keluar dari folder unggahan. | C21-UT01 s.d. C21-UT13, INT-TC01, INT-TC02 |
| C22 | BetterAuth | Mendalam | Kelas keamanan: *hashing* bcrypt (KNF02), verifikasi kredensial, dan pembuatan sesi. | C22-UT01 s.d. C22-UT15, INT-TC04, INT-TC05, KNF02-TC01 |

## 4.2 Pengujian Unit Kelas

Pengujian unit dilakukan pada kelas bertingkat Mendalam dan Sedang. Kelas Mendalam diuji pada seluruh operasi public dengan kasus normal, batas, dan negatif, serta mencapai *coverage* minimal 70%. Kelas Sedang diuji minimal dengan satu kasus normal dan satu kasus gagal pada operasi public utama.

Cara menjalankan unit test (dari folder `src/`, setelah `pnpm install`):

```bash
pnpm test                 # seluruh unit test
pnpm test:coverage        # unit test + laporan coverage (teks di terminal, HTML di src/coverage/index.html)
pnpm test -- -t "C13-UT"  # hanya test case dengan ID tertentu
```

Unit test bersifat otomatis dan *white-box*. Untuk kelas Mendalam, setiap operasi public pada DPPL diuji minimal dengan tiga kasus (normal, batas, dan negatif). Untuk kelas Sedang, operasi public utama diuji minimal dengan kasus normal dan negatif. *Coverage* dilaporkan per kelas Mendalam sebagai % baris (*statement*) dan % cabang (*branch*).

Unit test tidak membutuhkan server maupun basis data. Basis data, pustaka Better Auth, dan header request diganti tiruan (`vi.mock`) supaya yang diuji hanya logika kelas. Interaksi dengan komponen asli diuji terpisah pada Subbab 4.3. Judul setiap test diawali ID pengujian (misalnya `C13-UT24 ...`) sehingga keluaran *test runner* bisa dicocokkan langsung dengan tabel di bawah. `pnpm test:coverage` gagal bila *coverage* baris atau cabang kelas Mendalam yang terdaftar di `vitest.config.ts` di bawah 70%.

Lokasi file test: `src/tests/unit/` (satu file per kelas atau per kelompok operasi, misalnya `AuthController.login.test.ts`).

Lingkungan uji: Node.js 22.23.5, Vitest 3.2.7, @vitest/coverage-v8 3.2.7, pada kode tag `v9.0` ditambah file test. Seluruh 247 unit test lulus (24 berkas), dan 87 di antaranya milik kelas C04, C10, C12, C13, C21, dan C22.

<!-- Nomor subbab dan tabel mengikuti urutan bagian dalam dokumen. -->

### 4.2.1 Kelas Pendaftaran

**ID Kelas:** C02<br>
**Nama Kelas:** Pendaftaran<br>
**Tingkat:** Mendalam

Subbab ini menguji seluruh operasi public C02, yaitu `terima()`, `tolak()`, `isDiterima()`, dan `sudahDiputuskan()`. Aturan utama yang diuji adalah transisi status seleksi: pendaftaran baru berstatus MENUNGGU, dan keputusan DITERIMA atau DITOLAK hanya dapat diberikan satu kali. Data uji: objek Pendaftaran dengan keterampilan "Menanam pohon" dan ketersediaan waktu "Akhir pekan", dibentuk langsung dengan status MENUNGGU, DITERIMA, atau DITOLAK tanpa basis data. File test: `src/tests/unit/Pendaftaran.test.ts`.

Tabel 4.2.1a. Informasi Pengujian Kelas C02

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | `terima()`, `tolak()`, `isDiterima()`, `sudahDiputuskan()` |
| Operasi yang diuji | `terima()`, `tolak()`, `isDiterima()`, `sudahDiputuskan()` (4 dari 4 operasi public) |
| ID Algoritma yang tercakup | Algo-C02-01, Algo-C02-02, Algo-C02-03, Algo-C02-04 |
| Coverage (wajib ≥ 70%) | 100% baris / 100% cabang (`src/server/models/Pendaftaran.ts`, @vitest/coverage-v8, bukti pada 4.6) |

Tabel 4.2.1b. Hasil Pengujian Unit Kelas C02

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C02-UT01 | `sudahDiputuskan()`, `isDiterima()` | Batas | Pendaftaran baru berstatus MENUNGGU | `sudahDiputuskan()` = `false`, `isDiterima()` = `false` | `false`, `false` | Pass |
| C02-UT02 | `terima()` | Normal | Pendaftaran MENUNGGU, lalu `terima()` | `isDiterima()` = `true`, `sudahDiputuskan()` = `true` | `true`, `true` | Pass |
| C02-UT03 | `tolak()` | Normal | Pendaftaran MENUNGGU, lalu `tolak()` | `isDiterima()` = `false`, `sudahDiputuskan()` = `true` | `false`, `true` | Pass |
| C02-UT04 | `terima()`, `tolak()` | Negatif | Pendaftaran berstatus DITERIMA, lalu `terima()` dan `tolak()` | Keduanya galat "Pendaftaran sudah diputuskan"; `isDiterima()` tetap `true` | Kedua pemanggilan melempar galat; status tetap diterima | Pass |
| C02-UT05 | `terima()`, `tolak()` | Negatif | Pendaftaran berstatus DITOLAK, lalu `terima()` dan `tolak()` | Keduanya galat "Pendaftaran sudah diputuskan"; `isDiterima()` tetap `false` | Kedua pemanggilan melempar galat; status tetap ditolak | Pass |
| C02-UT06 | `tolak()` lalu `terima()` | Negatif | Pendaftaran MENUNGGU, `tolak()`, lalu `terima()` | `terima()` galat "Pendaftaran sudah diputuskan"; `isDiterima()` tetap `false` | Galat dilempar; status tetap ditolak | Pass |

### 4.2.2 Kelas Relawan

**ID Kelas:** C03  
**Nama Kelas:** Relawan  
**Tingkat:** Sedang

Subbab ini menguji operasi C03 yang dipakai alur presensi dan portofolio. Data uji: program Pantai berdurasi 4 jam (7 Nov 2026, 08.00–12.00 WIB) dan program Hutan berdurasi 2,5 jam (8 Nov 2026, 08.00–10.30 WIB). Catatan kehadiran relawan dibentuk langsung sebagai objek Kehadiran (C08), tanpa basis data. File test: `src/tests/unit/RiwayatKontribusi.test.ts`.

Tabel 4.2.2. Hasil Pengujian Unit Kelas C03

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C03-UT01 | `catatKontribusi(program): Boolean` | Normal | Relawan yang tercatat hadir di program Pantai, lalu `catatKontribusi(Pantai)` | `true`, total jam aksi relawan 4 | `true`, total 4 | Pass |
| C03-UT02 | `catatKontribusi(program): Boolean` | Negatif | Relawan hanya hadir di program Hutan, lalu `catatKontribusi(Pantai)` | `false`, total jam aksi tetap 0, riwayat program selesai kosong | `false`, total 0, riwayat `[]` | Pass |
| C03-UT03 | `lihatPortofolio(): RiwayatKontribusi` | Batas | Relawan baru tanpa riwayat di basis data | Riwayat kosong yang belum tersimpan (`idRiwayat` = `null`) dengan total 0 jam | `idRiwayat` = `null`, total 0 | Pass |
| C03-UT04 | `hadirPada(program): Boolean` | Normal | Relawan hadir di program Hutan dan Pantai, diperiksa untuk keduanya | `true` dan `true` | `true` dan `true` | Pass |
| C03-UT05 | `hadirPada(program): Boolean` | Negatif | Relawan yang hanya hadir di program Hutan, dan relawan tanpa catatan kehadiran, diperiksa untuk program Pantai | `false` dan `false` | `false` dan `false` | Pass |
| C03-UT06 | `lihatPortofolio(): RiwayatKontribusi` | Normal | Relawan yang sudah punya riwayat `r1` dengan total 12 jam | Mengembalikan objek riwayat yang sama, total 12 jam | Objek yang sama, total 12 | Pass |
| C03-UT07 | `lihatPortofolio(): RiwayatKontribusi` | Batas | Relawan baru: `lihatPortofolio()`, lalu `catatKontribusi(Pantai)`, lalu `lihatPortofolio()` lagi | Riwayat kosong yang dibuat pertama kali dipakai ulang, sehingga jam yang dicatat tidak hilang (total 4) | Objek yang sama, total 4 | Pass |

### 4.2.3 Kelas Pengguna

**ID Kelas:** C04  
**Nama Kelas:** Pengguna  
**Tingkat:** Sedang

Tabel 4.2.3. Hasil Pengujian Unit Kelas C04

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C04-UT01 | `cari(idPengguna)`, `lihatNotifikasi(): List<Notifikasi>` | Normal | Akun `id-ayu` punya notifikasi "Lama" (08.00) dan "Baru" (10.00). Ada juga notifikasi milik `id-bima`. Panggil `Pengguna.cari("id-ayu")` lalu `lihatNotifikasi()`. | Objek Pengguna ditemukan. Daftar berisi `["Baru", "Lama"]`, terbaru di atas, tanpa notifikasi milik Bima. | Daftar `["Baru", "Lama"]` sesuai yang diharapkan. | Pass |
| C04-UT02 | `cari(idPengguna)` | Negatif | `Pengguna.cari("id-tidak-ada")` | Mengembalikan `null` | Mengembalikan `null` | Pass |
| C04-UT03 | `lihatNotifikasi()` | Negatif | Akun baru `id-baru` tanpa notifikasi | Daftar kosong, tanpa galat | `[]` | Pass |

### 4.2.4 Kelas Notifikasi

**ID Kelas:** C10  
**Nama Kelas:** Notifikasi  
**Tingkat:** Mendalam

Tabel 4.2.4. Hasil Pengujian Unit Kelas C10

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C10-UT01 | `kirim(): void` | Normal | `Notifikasi.baru("id-ayu", "Kamu diterima di Penanaman Pohon").kirim()` | Satu baris tersimpan dengan `userId` id-ayu, pesan yang sama, dan `statusDibaca = false` | Satu baris tersimpan sesuai yang diharapkan | Pass |
| C10-UT02 | `kirim(): void` | Batas | Pesan hanya berisi spasi (`"   "`) | Galat "Pesan notifikasi tidak boleh kosong", tidak ada baris tersimpan | Galat tersebut dilempar, tabel tetap kosong | Pass |
| C10-UT03 | `kirim(): void` | Negatif | Pesan string kosong (`""`) | Galat "Pesan notifikasi tidak boleh kosong", tidak ada baris tersimpan | Galat tersebut dilempar, tabel tetap kosong | Pass |
| C10-UT04 | `baca(): void` | Batas | Kirim notifikasi, lalu panggil `baca()` dua kali | Basis data hanya di-*update* sekali, `statusDibaca = true` | `update` terpanggil 1 kali, `statusDibaca = true` | Pass |
| C10-UT05 | `showDetail(): String` | Normal | `Notifikasi.baru(id, "Isi lengkap").showDetail()` | `"Isi lengkap"` | `"Isi lengkap"` | Pass |
| C10-UT06 | `milik(idPengguna): Boolean` (tambahan, B.1 no. 24) | Normal dan negatif | Notifikasi untuk id-ayu diperiksa dengan id-ayu, id-bima, dan string kosong | `true`, `false`, `false` | `true`, `false`, `false` | Pass |
| C10-UT07 | `dariBaris()`, `keData()`, `keDataUntukPenyimpanan()` (tambahan) | Normal | Baris `{id: "n-1", userId: id-ayu, pesan: "Hasil seleksi: Diterima", statusDibaca: true}` | `keData()` berisi id, pesan, waktu, dan status yang sama. `keDataUntukPenyimpanan()` sama persis dengan baris asal. | Kedua bentuk data sama dengan baris asal | Pass |
| C10-UT08 | `baca(): void` | Normal | Kirim notifikasi (belum dibaca), lalu `baca()` | `update` dengan `statusDibaca: true` untuk id notifikasi itu, baris di tabel menjadi `true` | Sesuai yang diharapkan | Pass |
| C10-UT09 | `baca(): void` | Negatif | `baca()` pada notifikasi yang belum pernah dikirim (tidak ada di basis data) | Galat basis data diteruskan ("Record to update not found") | Galat tersebut dilempar | Pass |
| C10-UT10 | `showDetail(): String` | Batas | Pesan satu karakter (`"!"`) dan pesan panjang ("Selamat!" diulang 100 kali) | Kedua pesan dikembalikan utuh | Sesuai yang diharapkan | Pass |
| C10-UT11 | `showDetail(): String` | Negatif | Notifikasi dari baris lama yang pesannya kosong | String kosong, tanpa galat | `""` | Pass |

Tabel 4.2.4b. Ringkasan Cakupan Kelas C10

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | `kirim()`, `baca()`, `showDetail()` |
| Operasi yang diuji | `kirim()`, `baca()`, `showDetail()` (3 dari 3 operasi public, masing-masing dengan kasus normal, batas, dan negatif), serta operasi tambahan `baru()`, `dariBaris()`, `milik()`, `keData()`, `keDataUntukPenyimpanan()` |
| ID Algoritma yang tercakup | Algo-C10-01, Algo-C10-02, Algo-C10-03 |
| Coverage (wajib ≥ 70%) | 100% baris / 100% cabang (`src/server/models/Notifikasi.ts`, @vitest/coverage-v8, bukti pada 4.6) |

### 4.2.5 Kelas RiwayatKontribusi

**ID Kelas:** C11  
**Nama Kelas:** RiwayatKontribusi  
**Tingkat:** Mendalam

Data uji sama dengan subbab C03: program Pantai 4 jam dan program Hutan 2,5 jam. `perbaruiJamAksi()` bersifat *private* pada implementasi, sehingga diuji lewat `tambahRiwayatProgram()`. File test: `src/tests/unit/RiwayatKontribusi.test.ts`.

Tabel 4.2.5. Hasil Pengujian Unit Kelas C11

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C11-UT01 | `tambahRiwayatProgram(program)`, `perbaruiJamAksi(jamAksi)`, `getTotalJamAksi()`, `getDaftarProgramSelesai()` | Normal | Riwayat dengan total 0 jam, tambahkan program Pantai lalu program Hutan | Total 4 jam setelah Pantai dan 6,5 jam setelah Hutan. Daftar program selesai `["pantai", "hutan"]`. | Total 4 lalu 6,5, daftar `["pantai", "hutan"]` | Pass |
| C11-UT02 | `tambahRiwayatProgram(program)` | Normal | Riwayat dengan total awal 10 jam, tambahkan program Pantai | Total menjadi 14 jam | 14 | Pass |
| C11-UT03 | `tambahRiwayatProgram(program)` | Negatif | Tambahkan program Pantai dua kali | Penambahan kedua ditolak dengan galat "Program sudah tercatat pada riwayat", total tetap 4 jam | Galat tersebut dilempar, total 4 | Pass |
| C11-UT04 | `tambahRiwayatProgram(program)`, `perbaruiJamAksi(jamAksi)` | Negatif | Program dengan waktu selesai lebih awal dari waktu mulai (durasi −4 jam) | Galat "Jam aksi tidak valid", total tetap 0 jam | Galat tersebut dilempar, total 0 | Pass |
| C11-UT05 | `tambahRiwayatProgram(program)`, `perbaruiJamAksi(jamAksi)` | Batas | Riwayat dengan total 4 jam, tambahkan program yang waktu mulai dan selesainya sama (durasi 0 jam) | Program tercatat pada riwayat, total tetap 4 jam | Tercatat, total 4 | Pass |
| C11-UT06 | `getTotalJamAksi()`, `getDaftarProgramSelesai()` | Batas | Riwayat kosong dari `RiwayatKontribusi.kosong()` | Total 0, daftar program selesai `[]`, `idRiwayat` = `null` | 0, `[]`, `null` | Pass |
| C11-UT07 | `getDaftarProgramSelesai()` | Negatif | Ambil daftar program selesai, lalu ubah daftar yang dikembalikan (tambah dan kosongkan isinya) | Isi riwayat tidak ikut berubah: daftar tetap `["pantai"]`, total tetap 4 jam | `["pantai"]`, total 4 | Pass |
| C11-UT08 | `mencatat(program): Boolean` (tambahan) | Normal dan negatif | Periksa program Pantai sebelum dan sesudah ditambahkan, serta program Hutan yang tidak ditambahkan | `false` sebelum ditambahkan, `true` sesudahnya, dan `false` untuk program Hutan | `false`, `true`, `false` | Pass |

Tabel 4.2.5b. Ringkasan Cakupan Kelas C11

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | `tambahRiwayatProgram()`, `perbaruiJamAksi()`, `getTotalJamAksi()`, `getDaftarProgramSelesai()` |
| Operasi yang diuji | Seluruh operasi di atas (4 dari 4, masing-masing dengan kasus normal, batas, dan negatif). `perbaruiJamAksi()` diuji lewat `tambahRiwayatProgram()` karena bersifat *private* pada implementasi. Operasi tambahan `kosong()` dan `mencatat()` juga diuji. |
| ID Algoritma yang tercakup | Algo-C11-01 s.d. Algo-C11-04 |
| Coverage (wajib ≥ 70%) | 100% baris / 100% cabang (`src/server/models/RiwayatKontribusi.ts`, @vitest/coverage-v8, bukti pada 4.6) |

### 4.2.6 Kelas KelolaAkunPage

**ID Kelas:** C12  
**Nama Kelas:** KelolaAkunPage  
**Tingkat:** Sedang

Logika C12 yang bisa diuji secara unit adalah penyaringan `urlKembali` (Algo-C12-09 `arahkanKembali()`) di `src/lib/urlKembali.ts`. Operasi tampilan lainnya diuji lewat UC01, UC02, dan UC06 (Subbab 4.4).

Tabel 4.2.6. Hasil Pengujian Unit Kelas C12

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C12-UT01 | `arahkanKembali()` lewat `urlKembaliAman(url)` | Normal | `/program/abc` dan `/program?kategori=JAGA_ALAM#atas` | Path dikembalikan utuh beserta query dan *hash* | Kedua path dikembalikan utuh | Pass |
| C12-UT02 | `urlKembaliAman(url)` | Negatif | `null`, `undefined`, `""`, `program`, `https://evil.example` | Semua menghasilkan `null` (kembali ke beranda) | Semua `null` | Pass |
| C12-UT03 | `urlKembaliAman(url)` | Negatif | `//evil.example`, `/\evil.example`, `/\/evil.example` | Semua `null` (bukan path internal) | Semua `null` | Pass |
| C12-UT04 | `urlKembaliAman(url)` | Batas | Path yang disisipi tab, *newline*, atau CR (`/\t/evil.example`, `/\n/evil.example`, `/a\r\nb`) | Semua `null` | Semua `null` | Pass |

### 4.2.7 Kelas AuthController

**ID Kelas:** C13  
**Nama Kelas:** AuthController  
**Tingkat:** Mendalam

Data uji Relawan: email `"  Ayu@RekanBumi.Test "`, kata sandi `Rahasia123`, nama `" Ayu Lestari "`, telepon `081234567890`, domisili `Bandung`, jenis dokumen `KTP`, berkas PDF 64 byte. Data uji Inisiator: `komunitas@rekanbumi.test`, lembaga `Komunitas Hijau`, tautan `https://hijau.example.org`. Operasi *private* diuji langsung karena memuat aturan validasi dan blokir.

Tabel 4.2.7. Hasil Pengujian Unit Kelas C13

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C13-UT01 | `validasiKelengkapanData(dataDiri, berkas): String[]` | Normal | Data Relawan lengkap dan berkas PDF | Daftar galat kosong | `[]` | Pass |
| C13-UT02 | `validasiKelengkapanData()` | Negatif | Email `bukan-email`, kata sandi kosong | `["Email tidak valid", "Kata sandi wajib diisi"]` | Sesuai yang diharapkan | Pass |
| C13-UT03 | `validasiKelengkapanData()` | Batas | Kata sandi 7 karakter (`pendek1`) | `["Kata sandi minimal 8 karakter"]` | Sesuai yang diharapkan | Pass |
| C13-UT04 | `validasiKelengkapanData()` | Negatif | Relawan dengan nama berisi spasi, telepon kosong, tanpa berkas | `["Data diri tidak lengkap", "Dokumen verifikasi wajib diunggah"]` | Sesuai yang diharapkan | Pass |
| C13-UT05 | `validasiKelengkapanData()` | Negatif dan normal | Inisiator tanpa nama lembaga, lalu Inisiator lengkap tanpa berkas | `["Nama lembaga wajib diisi"]`, lalu `[]` (berkas tidak wajib bagi Inisiator) | Sesuai yang diharapkan | Pass |
| C13-UT06 | `validasiKelengkapanData()` | Batas | Tautan situs resmi: kosong, `bukan url`, `ftp://situs.org`, `javascript:alert(1)` | Kosong diterima, tiga lainnya `["Tautan situs resmi tidak valid"]` | Sesuai yang diharapkan | Pass |
| C13-UT07 | `validasiKelengkapanData()` | Negatif | Peran `VERIFIKATOR` | `["Peran tidak valid"]` | Sesuai yang diharapkan | Pass |
| C13-UT08 | `cekStatusVerifikasi(dataDiri): StatusVerifikasi` | Normal dan batas | `emailTerverifikasi` tidak diisi, `false`, dan `true` | `MENUNGGU`, `MENUNGGU`, `TERVERIFIKASI` | Sesuai yang diharapkan | Pass |
| C13-UT09 | `buatAkunBaru(dataDiri, berkas)` | Normal | Data Relawan lengkap dan berkas PDF | Kredensial didaftarkan dengan email huruf kecil dan nama tanpa spasi tepi. Baris Relawan berstatus `MENUNGGU`, satu dokumen `KTP`, dan satu berkas tersimpan di `uploads/<uuid>.pdf`. | Seluruh hasil sesuai yang diharapkan | Pass |
| C13-UT10 | `buatAkunBaru()` | Batas | Relawan tanpa `jenisDokumen` | Dokumen tersimpan dengan jenis "Dokumen verifikasi diri" | Sesuai yang diharapkan | Pass |
| C13-UT11 | `buatAkunBaru()` | Normal | Inisiator lengkap tanpa berkas | Profil lembaga tersimpan, `dokumenTerunggah = false`, tidak ada baris dokumen maupun Relawan | Sesuai yang diharapkan | Pass |
| C13-UT12 | `buatAkunBaru()` | Batas | Tautan situs berisi spasi saja | `tautanSitusResmi` disimpan `null` | `null` | Pass |
| C13-UT13 | `buatAkunBaru()` | Negatif | Email `salah`, nama kosong, kata sandi kosong (UC01 alt. 1) | `GalatValidasi` berisi tiga pesan sekaligus. Kredensial tidak didaftarkan dan tidak ada berkas tersimpan. | Sesuai yang diharapkan | Pass |
| C13-UT14 | `buatAkunBaru()` | Negatif | Relawan lengkap tanpa berkas | `["Dokumen verifikasi wajib diunggah"]`, akun tidak dibuat | Sesuai yang diharapkan | Pass |
| C13-UT15 | `buatAkunBaru()` | Negatif | Berkas `catatan.txt` bertipe `text/plain` | `["Berkas tidak valid"]`, akun tidak dibuat, folder unggahan kosong | Sesuai yang diharapkan | Pass |
| C13-UT16 | `buatAkunBaru()` | Negatif | Email `ayu@rekanbumi.test` sudah ada, lalu didaftarkan lagi dengan huruf besar | `["Email sudah terdaftar"]`, berkas tidak tersimpan | Sesuai yang diharapkan | Pass |
| C13-UT17 | `buatAkunBaru()` | Negatif | Better Auth menolak dengan `UNPROCESSABLE_ENTITY` (registrasi bersamaan) | `["Email sudah terdaftar"]`, berkas yang sudah terunggah dihapus | Sesuai yang diharapkan | Pass |
| C13-UT18 | `buatAkunBaru()` | Negatif | Better Auth melempar galat lain | Galat diteruskan, berkas dihapus | Sesuai yang diharapkan | Pass |
| C13-UT19 | `buatAkunBaru()` | Negatif | Penyimpanan profil Relawan gagal ("DB mati") setelah akun terbentuk | Akun dihapus kembali (1 kali `user.delete`) dan folder unggahan kosong | Sesuai yang diharapkan | Pass |
| C13-UT20 | `sinkronStatusVerifikasi(idPengguna): Boolean` (tambahan, issue #8) | Normal | Relawan `u-menunggu` berstatus `MENUNGGU` | `true`, status menjadi `TERVERIFIKASI` | Sesuai yang diharapkan | Pass |
| C13-UT21 | `sinkronStatusVerifikasi()` | Normal | Sinkronkan `u-menunggu` | Relawan lain (`u-lain`) tetap `MENUNGGU` | Sesuai yang diharapkan | Pass |
| C13-UT22 | `sinkronStatusVerifikasi()` | Negatif | Relawan `u-ditolak` berstatus `DITOLAK` | `false`, status tetap `DITOLAK` | Sesuai yang diharapkan | Pass |
| C13-UT23 | `sinkronStatusVerifikasi()` | Batas | Dipanggil kedua kali untuk `u-menunggu`, dan untuk akun Inisiator | Keduanya `false` (tidak ada yang berubah) | Sesuai yang diharapkan | Pass |
| C13-UT24 | `validasiKredensial(email, kataSandi, ip): Boolean` dan `mulaiSesi()` | Normal | Kredensial benar dari IP baru | `true`, sesi dibuat lewat `BetterAuth.buatSesiMasuk()` | Sesuai yang diharapkan | Pass |
| C13-UT25 | `validasiKredensial()` | Negatif | Kata sandi salah (UC02 alt. 1) | `false`, sesi tidak dibuat | Sesuai yang diharapkan | Pass |
| C13-UT26 | `validasiKredensial()`, `catatPercobaanGagal()`, `blokirIP()`, `cekStatusBlokir()` | Negatif | 5 kali salah, lima kali `false`, lalu percobaan ke-6 dengan kata sandi benar (UC02 alt. 2) | Percobaan ke-6 melempar `GalatIPDiblokir`, sesi tidak dibuat | Sesuai yang diharapkan | Pass |
| C13-UT27 | `validasiKredensial()` | Normal | IP A diblokir, lalu login benar dari IP B | IP B tetap bisa masuk (`true`) | Sesuai yang diharapkan | Pass |
| C13-UT28 | `cekStatusBlokir()`, `resetPercobaanGagal()` | Batas | Blokir, maju 4 menit (masih diblokir), lalu maju 1 menit + 1 ms. Setelah itu 4 kali gagal dan login benar. | Masih diblokir di menit ke-4. Setelah 5 menit blokir selesai, hitungan mulai dari nol, sehingga login benar berhasil. | Sesuai yang diharapkan | Pass |
| C13-UT29 | `resetPercobaanGagal()` | Normal | 4 kali gagal, login benar, lalu 4 kali gagal lagi dan login benar | Login terakhir berhasil (hitungan direset oleh login sukses) | Sesuai yang diharapkan | Pass |
| C13-UT30 | `ambilNotifikasi(idPengguna): List<Notifikasi>` | Normal | Ayu punya notifikasi pukul 08.00 dan 10.00, Bima punya satu | `["Pesan baru", "Pesan lama"]`, milik Ayu saja | Sesuai yang diharapkan | Pass |
| C13-UT31 | `ambilNotifikasi()` | Batas | Ayu belum punya notifikasi | Daftar kosong | `[]` | Pass |
| C13-UT32 | `ambilNotifikasi()` | Negatif | `idPengguna` tidak terdaftar | `GalatTidakDitemukan` | Sesuai yang diharapkan | Pass |
| C13-UT33 | `bacaNotifikasi(idNotifikasi, idPengguna): Notifikasi` | Normal | Ayu membuka notifikasinya sendiri | Isi "Selamat bergabung" dikembalikan, `statusDibaca = true` di objek dan tabel | Sesuai yang diharapkan | Pass |
| C13-UT34 | `bacaNotifikasi()` | Negatif | Ayu membuka notifikasi milik Bima | `GalatTidakDitemukan`, status notifikasi Bima tetap `false` | Sesuai yang diharapkan | Pass |
| C13-UT35 | `bacaNotifikasi()` | Negatif | `idNotifikasi` tidak ada | `GalatTidakDitemukan` | Sesuai yang diharapkan | Pass |
| C13-UT36 | `cekSesi(): Boolean` | Normal | `BetterAuth.ambilSesi()` mengembalikan token | `true` | `true` | Pass |
| C13-UT37 | `cekSesi()` | Batas | Belum login: `BetterAuth.ambilSesi()` mengembalikan `null` | `false` | `false` | Pass |
| C13-UT38 | `validasiKredensial()` | Batas | 4 kali salah, lalu percobaan ke-5 salah, lalu percobaan ke-6 benar | Percobaan ke-5 masih diperiksa (`false`, verifikasi terpanggil 5 kali). Blokir baru berlaku setelah gagal ke-5. | Sesuai yang diharapkan | Pass |
| C13-UT39 | `validasiKelengkapanData()` | Batas | Kata sandi tepat 8 karakter (`pendek12`) | Daftar galat kosong | `[]` | Pass |
| C13-UT40 | `cekSesi()` | Negatif | `BetterAuth.ambilSesi()` melempar galat "Sesi rusak" | Galat diteruskan | Galat "Sesi rusak" dilempar | Pass |
| C13-UT41 | `bacaNotifikasi()` | Batas | Ayu membuka notifikasinya yang sudah dibaca untuk kedua kali | Tetap `statusDibaca = true`, basis data hanya di-*update* sekali | Sesuai yang diharapkan | Pass |

Tabel 4.2.7b. Ringkasan Cakupan Kelas C13

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | `buatAkunBaru()`, `cekSesi()`, `validasiKredensial()`, `ambilNotifikasi()`, `bacaNotifikasi()` |
| Operasi yang diuji | Seluruh operasi public di atas (5 dari 5, masing-masing dengan kasus normal, batas, dan negatif), operasi *private* `validasiKelengkapanData()`, `cekStatusVerifikasi()`, `cekStatusBlokir()`, `catatPercobaanGagal()`, `blokirIP()`, `resetPercobaanGagal()`, `mulaiSesi()`, serta operasi tambahan `sinkronStatusVerifikasi()` |
| ID Algoritma yang tercakup | Algo-C13-01 s.d. Algo-C13-12 |
| Coverage (wajib ≥ 70%) | 100% baris / 97,67% cabang (`src/server/controllers/AuthController.ts`, @vitest/coverage-v8, bukti pada 4.6) |

### 4.2.8 Kelas PresensiController

**ID Kelas:** C20  
**Nama Kelas:** PresensiController  
**Tingkat:** Mendalam

Basis data diganti tiruan di memori (`vi.mock("~/server/db")`), dan waktu sekarang diatur dengan `vi.setSystemTime()`. File test: `src/tests/unit/PresensiController.test.ts` (alur check-in, C20-UT01 s.d. C20-UT24 dan C20-UT36 s.d. C20-UT41) dan `src/tests/unit/PresensiController.portofolio.test.ts` (alur portofolio, C20-UT25 s.d. C20-UT35 dan C20-UT42 s.d. C20-UT47).

Data uji alur check-in: program "Tanam Mangrove" berstatus AKTIF pada 5 Des 2026, 15.00–19.00 WIB, dan relawan `relawan-1` yang pendaftarannya DITERIMA. "Saat kegiatan" berarti pukul 16.30 WIB. Data uji alur portofolio: program Pantai berstatus SELESAI dengan durasi 4 jam, serta tiga relawan diterima: HADIR (sudah punya riwayat 3 jam), ABSEN (riwayat 0 jam), dan BARU (belum punya riwayat).

Tabel 4.2.8. Hasil Pengujian Unit Kelas C20

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C20-UT01 | `validasiStatusRelawan(idProgram, idRelawan): Boolean` | Normal | Pendaftaran relawan berstatus DITERIMA | `true` | `true` | Pass |
| C20-UT02 | `validasiStatusRelawan()` | Negatif | Pendaftaran berstatus MENUNGGU, lalu DITOLAK | `false` dan `false` | `false` dan `false` | Pass |
| C20-UT03 | `validasiStatusRelawan()` | Negatif | Relawan tidak mendaftar di program itu | `false` | `false` | Pass |
| C20-UT04 | `validasiWaktuPelaksanaan(idProgram, waktu): Boolean` | Batas | Tepat pukul 15.00 WIB (mulai) dan 19.00 WIB (selesai) | `true` dan `true` | `true` dan `true` | Pass |
| C20-UT05 | `validasiWaktuPelaksanaan()` | Batas | Satu detik sebelum mulai dan satu detik sesudah selesai | `false` dan `false` | `false` dan `false` | Pass |
| C20-UT06 | `validasiWaktuPelaksanaan()` | Negatif | Program tidak ada | `false` | `false` | Pass |
| C20-UT07 | `ambilKeteranganWaktu(idProgram): String` | Normal | Satu menit sebelum mulai, lalu satu menit sesudah selesai | "Belum dimulai", lalu "Sudah selesai" | Sesuai yang diharapkan | Pass |
| C20-UT08 | `prosesCheckIn(idProgram, idRelawan): Kehadiran` | Normal | Pendaftaran DITERIMA, check-in saat kegiatan | Satu baris kehadiran tersimpan untuk relawan dan program itu, objek Kehadiran dikembalikan | Satu baris tersimpan, id kehadiran `hadir-1` | Pass |
| C20-UT09 | `prosesCheckIn()` | Negatif | Pendaftaran MENUNGGU, check-in saat kegiatan | `GalatValidasi` "Relawan tidak terdaftar atau belum diterima pada program ini", tidak ada baris kehadiran | Sesuai yang diharapkan | Pass |
| C20-UT10 | `prosesCheckIn()` | Negatif | Check-in satu menit sesudah kegiatan selesai | `GalatValidasi` "Check-in hanya dapat dilakukan selama waktu pelaksanaan program", tidak ada baris kehadiran | Sesuai yang diharapkan | Pass |
| C20-UT11 | `prosesCheckIn()` | Negatif | Check-in kedua kali di program yang sama | `GalatValidasi` "Kehadiran sudah tercatat sebelumnya", tetap satu baris kehadiran | Sesuai yang diharapkan | Pass |
| C20-UT12 | `prosesCheckIn()` | Negatif | Pendaftaran DITOLAK | `GalatValidasi` "Relawan tidak terdaftar atau belum diterima pada program ini" | Sesuai yang diharapkan | Pass |
| C20-UT13 | `prosesCheckIn()` | Negatif | Relawan tidak mendaftar di program itu | `GalatValidasi` "Relawan tidak terdaftar atau belum diterima pada program ini" | Sesuai yang diharapkan | Pass |
| C20-UT14 | `prosesCheckIn()` | Negatif | Program tidak ada | `GalatValidasi` "Relawan tidak terdaftar atau belum diterima pada program ini" | Sesuai yang diharapkan | Pass |
| C20-UT15 | `prosesCheckIn()` | Negatif | Status program MENUNGGU_VERIFIKASI, MENUNGGU_KONFIRMASI, PERLU_REVISI, dan SELESAI | Keempatnya `GalatValidasi` "Check-in hanya dapat dilakukan pada program yang sedang aktif", tidak ada baris kehadiran | Sesuai yang diharapkan | Pass |
| C20-UT16 | `prosesCheckIn()` | Negatif | Check-in satu menit sebelum kegiatan dimulai | `GalatValidasi` "Check-in hanya dapat dilakukan selama waktu pelaksanaan program" | Sesuai yang diharapkan | Pass |
| C20-UT17 | `prosesCheckIn()` | Batas | Check-in tepat pukul 15.00 WIB, lalu (setelah kehadiran dihapus) tepat pukul 19.00 WIB | Keduanya berhasil, masing-masing satu baris kehadiran | Sesuai yang diharapkan | Pass |
| C20-UT18 | `prosesCheckIn()` | Negatif | Pendaftaran MENUNGGU dan waktu sudah lewat | Pesan status pendaftaran yang muncul, karena status diperiksa lebih dulu daripada waktu | `GalatValidasi` "Relawan tidak terdaftar atau belum diterima pada program ini" | Pass |
| C20-UT19 | `prosesCheckIn()` | Normal | Relawan sudah tercatat hadir di program lain, lalu check-in di program ini | Check-in berhasil, satu baris kehadiran untuk program ini | Sesuai yang diharapkan | Pass |
| C20-UT20 | `prosesCheckIn()` | Negatif | Dua check-in bersamaan: basis data menolak baris kedua karena aturan unik (kode P2002) | `GalatValidasi` "Kehadiran sudah tercatat sebelumnya", bukan galat server | Sesuai yang diharapkan | Pass |
| C20-UT21 | `cariIdRelawan(idPengguna)` (tambahan) | Normal | Akun `user-1` yang punya data relawan | `relawan-1` | `relawan-1` | Pass |
| C20-UT22 | `cariIdRelawan(idPengguna)` (tambahan) | Negatif | Akun inisiator yang tidak punya data relawan | `null` | `null` | Pass |
| C20-UT23 | `ambilDaftarKegiatan(idRelawan)` (tambahan) | Normal | Relawan terdaftar di tiga program (5 Des, 20 Des, dan 1 Okt yang sudah lewat), waktu sekarang 12 Nov 2026. Ada juga pendaftaran relawan lain. | Urutan `[program 5 Des, program 20 Des, program 1 Okt]`, status pendaftaran ikut tampil, pendaftaran relawan lain tidak ikut | Sesuai yang diharapkan | Pass |
| C20-UT24 | `ambilDaftarKegiatan(idRelawan)` (tambahan) | Normal | Relawan check-in di program 5 Des, lalu daftar diambil | Waktu kehadiran terisi pada program 5 Des dan `null` pada program yang belum di-check-in | Sesuai yang diharapkan | Pass |
| C20-UT25 | `perbaruiPortofolioRelawan(idProgram)` | Normal | Relawan HADIR tercatat hadir di program Pantai (4 jam) | Total jam aksi HADIR menjadi 3 + 4 = 7 jam, satu baris riwayat program tersimpan | Total 7, satu baris | Pass |
| C20-UT26 | `perbaruiPortofolioRelawan()` | Negatif | Relawan ABSEN diterima tetapi tidak hadir | Total jam aksi ABSEN tetap 0, riwayat program kosong | 0 dan `[]` | Pass |
| C20-UT27 | `perbaruiPortofolioRelawan()` | Batas | Relawan BARU hadir tetapi belum punya baris riwayat | Baris riwayat baru dibuat dengan total 4 jam | Total 4 | Pass |
| C20-UT28 | `perbaruiPortofolioRelawan()` | Batas | Dipanggil dua kali untuk program yang sama | Jam aksi tidak bertambah dua kali (tetap 7), tetap satu baris riwayat program | Total 7, satu baris | Pass |
| C20-UT29 | `perbaruiPortofolioRelawan()` | Negatif | Pendaftaran HADIR berstatus DITOLAK walaupun tercatat hadir | Total jam aksi tetap 3 | 3 | Pass |
| C20-UT30 | `perbaruiPortofolioRelawan()` | Negatif | Program berstatus MENUNGGU_KONFIRMASI | `GalatValidasi` "Portofolio hanya diperbarui untuk program yang sudah selesai", tidak ada riwayat program tersimpan | Sesuai yang diharapkan | Pass |
| C20-UT31 | `perbaruiPortofolioRelawan()` | Negatif | Program tidak ada | Galat "Program tidak ditemukan" | Sesuai yang diharapkan | Pass |
| C20-UT32 | `perbaruiPortofolioRelawan(idProgram, tx)` | Normal | Dipanggil dengan transaksi milik pemanggil | Tidak membuka transaksi baru, jam aksi tetap tercatat (7 jam) | `$transaction` tidak dipanggil, total 7 | Pass |
| C20-UT33 | `perbaruiPortofolioRelawan(idProgram)` | Normal | Dipanggil tanpa transaksi | Membuka transaksi sendiri satu kali | `$transaction` dipanggil 1 kali | Pass |
| C20-UT34 | `ambilRiwayatProgram(idRelawan): List<Program>` | Normal | HADIR hadir di program Pantai (4 jam) dan Hutan (2,5 jam), keduanya diperbarui | Urutan `[Hutan, Pantai]` (terbaru di atas), nama lembaga pengelola terbaca, total jam aksi 9,5 | Sesuai yang diharapkan | Pass |
| C20-UT35 | `ambilRiwayatProgram()`, `ambilTotalJamAksi()` | Batas | Relawan BARU tanpa riwayat | Daftar `[]` dan total 0 jam | `[]` dan 0 | Pass |
| C20-UT36 | `validasiStatusRelawan()` | Batas | Relawan diterima di program lain, dan relawan lain diterima di program ini | `false` | `false` | Pass |
| C20-UT37 | `validasiWaktuPelaksanaan()` | Normal | Pukul 16.30 WIB (di tengah kegiatan) | `true` | `true` | Pass |
| C20-UT38 | `ambilKeteranganWaktu()` | Normal | Waktu sekarang 16.30 WIB | "Sedang berlangsung" | "Sedang berlangsung" | Pass |
| C20-UT39 | `ambilKeteranganWaktu()` | Batas | Waktu sekarang tepat 15.00 WIB, lalu tepat 19.00 WIB | "Sedang berlangsung" dan "Sedang berlangsung" | Sesuai yang diharapkan | Pass |
| C20-UT40 | `ambilKeteranganWaktu()` | Negatif | Program tidak ada | "Program tidak ditemukan" | "Program tidak ditemukan" | Pass |
| C20-UT41 | `ambilDaftarKegiatan()` (tambahan) | Batas | Relawan yang belum mendaftar di program mana pun | `[]` | `[]` | Pass |
| C20-UT42 | `ambilRiwayatProgram()` | Negatif | Relawan tidak ada | Galat "Relawan tidak ditemukan" | Sesuai yang diharapkan | Pass |
| C20-UT43 | `ambilTotalJamAksi(idRelawan)` | Normal | Relawan HADIR dengan riwayat 3 jam | 3 | 3 | Pass |
| C20-UT44 | `ambilTotalJamAksi()` | Negatif | Relawan tidak ada | `GalatValidasi` "Relawan tidak ditemukan" | Sesuai yang diharapkan | Pass |
| C20-UT45 | `ambilProfilRelawan(idRelawan)` (tambahan) | Normal | Relawan HADIR | Nama, domisili "Bandung", `terverifikasi` = `true`, dan waktu bergabung 1 Mar 2026 | Sesuai yang diharapkan | Pass |
| C20-UT46 | `ambilProfilRelawan()` (tambahan) | Batas | Relawan yang statusnya belum terverifikasi dan domisilinya kosong | `terverifikasi` = `false`, domisili `null` | Sesuai yang diharapkan | Pass |
| C20-UT47 | `ambilProfilRelawan()` (tambahan) | Negatif | Relawan tidak ada | Galat "Relawan tidak ditemukan" | Sesuai yang diharapkan | Pass |

Tabel 4.2.8b. Ringkasan Cakupan Kelas C20

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | `validasiStatusRelawan()`, `validasiWaktuPelaksanaan()`, `prosesCheckIn()`, `perbaruiPortofolioRelawan()`, `ambilKeteranganWaktu()`, `ambilTotalJamAksi()`, `ambilRiwayatProgram()` |
| Operasi yang diuji | Seluruh operasi public di atas (7 dari 7, masing-masing dengan kasus normal, batas, dan negatif), serta operasi tambahan `ambilDaftarKegiatan()`, `cariIdRelawan()`, dan `ambilProfilRelawan()` |
| ID Algoritma yang tercakup | Algo-C20-01 s.d. Algo-C20-07 |
| Coverage (wajib ≥ 70%) | 98,29% baris / 95,52% cabang (`src/server/controllers/PresensiController.ts`, @vitest/coverage-v8, bukti pada 4.6) |

### 4.2.9 Kelas CloudStorageAdapter

**ID Kelas:** C21  
**Nama Kelas:** CloudStorageAdapter  
**Tingkat:** Mendalam

Setiap test memakai folder unggahan sementara (`UPLOAD_DIR` di folder *temp*) yang dihapus setelah test selesai.

Tabel 4.2.9. Hasil Pengujian Unit Kelas C21

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C21-UT01 | `validasiBerkas(berkas): Boolean` | Normal | PDF, PNG, dan JPG dengan byte awal dan tipe yang sesuai | Ketiganya `true` | `true` | Pass |
| C21-UT02 | `validasiBerkas()` | Negatif | `null` dan berkas 0 byte | Keduanya `false` | `false` | Pass |
| C21-UT03 | `validasiBerkas()` | Batas | PDF tepat 2 MB (2.097.152 byte) dan 2 MB + 1 byte | `true` untuk 2 MB, `false` untuk 2 MB + 1 byte | Sesuai yang diharapkan | Pass |
| C21-UT04 | `validasiBerkas()` | Negatif | `catatan.txt` (`text/plain`) | `false` | `false` | Pass |
| C21-UT05 | `validasiBerkas()` | Negatif | Berkas berisi byte awal EXE (`MZ`) dengan nama `virus.pdf` dan tipe `application/pdf` | `false` | `false` | Pass |
| C21-UT06 | `validasiBerkas()` | Negatif | Isi PNG tetapi tipe yang diklaim `application/pdf` | `false` | `false` | Pass |
| C21-UT07 | `unggahBerkas(berkas): String`, `ambilBerkas(url): File` | Normal | PDF 100 byte diunggah lalu diambil lagi | URL `uploads/<uuid>.pdf`, satu berkas di folder, isi dan tipe hasil ambil sama dengan berkas asli | Sesuai yang diharapkan | Pass |
| C21-UT08 | `unggahBerkas()` | Negatif | Nama kiriman `../../etc/passwd.png` | Nama tersimpan dibuat sendiri (UUID), tidak memuat `passwd`, berkas tetap di folder unggahan | Sesuai yang diharapkan | Pass |
| C21-UT09 | `unggahBerkas()` | Negatif | Berkas teks tidak valid | Galat "Berkas tidak valid", folder tetap kosong | Sesuai yang diharapkan | Pass |
| C21-UT10 | `ambilBerkas()` | Negatif | `uploads/tidak-ada.pdf`, UUID yang tidak ada, `../../etc/passwd`, `uploads/../../rahasia.pdf` | Semua galat "Berkas tidak ditemukan" | Sesuai yang diharapkan | Pass |
| C21-UT11 | `hapusBerkas(url)` (tambahan) | Batas | Unggah JPG lalu hapus dua kali | Berkas terhapus, panggilan kedua tidak galat | Sesuai yang diharapkan | Pass |
| C21-UT12 | `unggahBerkas()` | Batas | PDF tepat 2 MB diunggah lalu diambil lagi | Berkas tersimpan utuh (2.097.152 byte) | Sesuai yang diharapkan | Pass |
| C21-UT13 | `ambilBerkas()` | Batas | URL berupa nama berkas saja, tanpa awalan `uploads/` | Berkas tetap ditemukan dengan tipe `image/png` | Sesuai yang diharapkan | Pass |

Tabel 4.2.9b. Ringkasan Cakupan Kelas C21

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | `validasiBerkas()`, `unggahBerkas()`, `ambilBerkas()` |
| Operasi yang diuji | `validasiBerkas()`, `unggahBerkas()`, `ambilBerkas()` (3 dari 3 operasi public, masing-masing dengan kasus normal, batas, dan negatif), serta operasi tambahan `hapusBerkas()` |
| ID Algoritma yang tercakup | Algo-C21-01, Algo-C21-02, Algo-C21-03 |
| Coverage (wajib ≥ 70%) | 100% baris / 92% cabang (`src/server/adapters/CloudStorageAdapter.ts`, @vitest/coverage-v8, bukti pada 4.6) |

### 4.2.10 Kelas BetterAuth

**ID Kelas:** C22  
**Nama Kelas:** BetterAuth  
**Tingkat:** Mendalam

`hashKataSandi()` dan `cocokkanHash()` diuji dengan bcrypt asli. Untuk operasi lainnya, API pustaka Better Auth, `next/headers`, dan basis data diganti tiruan. Uji dengan Better Auth dan basis data asli ada di INT-TC04, INT-TC05, dan KNF02-TC01.

Tabel 4.2.10. Hasil Pengujian Unit Kelas C22

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C22-UT01 | `hashKataSandi(kataSandi): String` | Normal | `Password123!` | Hash berformat bcrypt `$2a$10$`/`$2b$10$` dan tidak memuat teks asli | Sesuai yang diharapkan | Pass |
| C22-UT02 | `cocokkanHash(kataSandi, hash): Boolean` | Normal dan negatif | Hash dari `Password123!` dicocokkan dengan `Password123!` dan `salah` | `true`, lalu `false` | `true`, `false` | Pass |
| C22-UT03 | `daftarkanKredensial(email, kataSandi, opsi): String` | Normal | `ayu@rekanbumi.test`, `Rahasia123`, nama `Ayu`, peran `INISIATOR` | `signUpEmail` dipanggil dengan email, kata sandi, nama, dan peran. Mengembalikan id akun `u-baru`. | Sesuai yang diharapkan | Pass |
| C22-UT04 | `daftarkanKredensial()` | Batas | Tanpa opsi nama dan peran | Nama diisi email, peran tidak dikirim | Sesuai yang diharapkan | Pass |
| C22-UT05 | `verifikasiKredensial(email, kataSandi): String` | Normal | Akun dengan hash bcrypt dari `Rahasia123`, dicocokkan dengan `Rahasia123` | idPengguna `u-ayu` | `u-ayu` | Pass |
| C22-UT06 | `verifikasiKredensial()` | Negatif | Kata sandi `Salah12345` | `null` | `null` | Pass |
| C22-UT07 | `verifikasiKredensial()` | Negatif | Email tidak terdaftar | `null` | `null` | Pass |
| C22-UT08 | `verifikasiKredensial()` | Batas | Akun ada tetapi tidak punya kredensial kata sandi | `null` | `null` | Pass |
| C22-UT09 | `buatSesiMasuk(email, kataSandi): String` | Normal | `signInEmail` mengembalikan token `token-baru` | Token dikembalikan. Isi permintaan dan header request (`x-forwarded-for`) diteruskan ke Better Auth. | Sesuai yang diharapkan | Pass |
| C22-UT10 | `ambilSesi(): String` | Normal | `getSession` mengembalikan sesi bertoken `token-aktif` | `token-aktif` | `token-aktif` | Pass |
| C22-UT11 | `ambilSesi()` | Batas | Tidak ada sesi: `getSession` mengembalikan `null` | `null` | `null` | Pass |
| C22-UT12 | `daftarkanKredensial()` | Negatif | `signUpEmail` menolak ("User already exists") | Galat diteruskan ke pemanggil (C13) | Sesuai yang diharapkan | Pass |
| C22-UT13 | `buatSesiMasuk()` | Negatif | `signInEmail` menolak ("Invalid email or password") | Galat diteruskan, tidak ada token | Sesuai yang diharapkan | Pass |
| C22-UT14 | `buatSesiMasuk()` | Batas | Request tanpa *header* IP | Sesi tetap dibuat (token `token-tanpa-ip`), *header* kosong diteruskan apa adanya | Sesuai yang diharapkan | Pass |
| C22-UT15 | `ambilSesi()` | Negatif | `getSession` melempar galat "Sesi rusak" | Galat diteruskan | Sesuai yang diharapkan | Pass |

Tabel 4.2.10b. Ringkasan Cakupan Kelas C22

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | `daftarkanKredensial()`, `verifikasiKredensial()`, `buatSesiMasuk()`, `ambilSesi()` (`hashKataSandi()` dan `cocokkanHash()` *private* di DPPL, dibuat *static public* agar bisa dipasang ke opsi `password` Better Auth) |
| Operasi yang diuji | `daftarkanKredensial()`, `verifikasiKredensial()`, `buatSesiMasuk()`, `ambilSesi()` (4 dari 4 operasi public, masing-masing dengan kasus normal, batas, dan negatif), serta `hashKataSandi()` dan `cocokkanHash()` |
| ID Algoritma yang tercakup | Algo-C22-01 s.d. Algo-C22-06 |
| Coverage (wajib ≥ 70%) | 100% baris / 100% cabang (`src/server/adapters/BetterAuth.ts`, @vitest/coverage-v8, bukti pada 4.6) |

### 4.2.11 Kelas Verifikator


**ID Kelas:** C06  
**Nama Kelas:** Verifikator  
**Tingkat:** Tidak perlu (lihat Tabel 4.1.1)


Kelas `Verifikator` (`src/server/models/Verifikator.ts`) hanya meneruskan `konfirmasiLaporan()` dan `tolakLaporan()` ke `LaporanProgram` dengan `this.idPengguna`. Pada implementasi akhir, kelas ini tidak dipanggil dari kode aplikasi. Peninjauan laporan berjalan lewat `ProgramController.konfirmasiLaporan()` dan `tolakLaporan()` (C15), yang memakai `LaporanProgram` (C09) langsung dengan `idVerifikator` dari sesi (B.1 no. 6 dan 9). Karena itu kelas ini tidak punya unit test khusus, dan coverage terukurnya 0% (`Verifikator.ts`, @vitest/coverage-v8, bukti pada 4.6). Logika yang ia teruskan teruji lewat C09 (4.2.12) dan C15 (4.2.14), serta lewat UC07-TC01 dan UC07-TC02.




### 4.2.12 Kelas LaporanProgram


**ID Kelas:** C09  
**Nama Kelas:** LaporanProgram  
**Tingkat:** Mendalam


Tabel 4.2.12. Hasil Pengujian Unit Kelas C09 (berkas `src/tests/unit/LaporanProgram.test.ts`)


| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C09-UT01 | `uploadDokumentasi()`, `showSummary()`, `showDokumentasi()` | Normal | Simpan satu tautan dokumentasi dan ringkasan capaian, lalu baca kembali | Tautan tersimpan dan dapat dibaca kembali, ringkasan capaian dikembalikan | Sesuai yang diharapkan | Pass |
| C09-UT02 | `uploadDokumentasi()` | Negatif | Tautan dokumentasi kosong | Galat "Tautan berkas tidak valid" (Algo-C09-01) | Galat tersebut dilempar | Pass |
| C09-UT03 | `setujui()` | Normal dan negatif | Setujui laporan, lalu setujui laporan yang sama sekali lagi | Persetujuan pertama berhasil, persetujuan kedua ditolak dengan "Laporan sudah ditinjau" (Algo-C09-02) | Sesuai yang diharapkan | Pass |
| C09-UT04 | `tolak()` | Normal dan negatif | Tolak laporan tanpa catatan revisi, lalu dengan catatan revisi | Tanpa catatan ditolak dengan "Catatan revisi wajib diisi", dengan catatan berstatus DITOLAK (Algo-C09-03) | Sesuai yang diharapkan | Pass |


Tabel 4.2.12b. Ringkasan Cakupan Kelas C09


| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | `uploadDokumentasi()`, `setujui()`, `tolak()`, `showSummary()`, `showDokumentasi()` |
| Operasi yang diuji | 5 dari 5 operasi public (4 tes). Kasus batas belum dibuat terpisah. |
| ID Algoritma yang tercakup | Algo-C09-01, Algo-C09-02, Algo-C09-03, Algo-C09-04, Algo-C09-05 |
| Coverage (wajib ≥ 70%) | 100% baris / 100% cabang (`src/server/models/LaporanProgram.ts`, @vitest/coverage-v8, bukti pada 4.6) |




### 4.2.13 Kelas KelolaProgramPage


**ID Kelas:** C14  
**Nama Kelas:** KelolaProgramPage  
**Tingkat:** Sedang


Kelas ini adalah kelas *boundary* yang pada implementasi dipecah menjadi satu komponen per layar (B.1 no. 11). Logika yang dapat diuji dipisahkan ke fungsi murni di `src/lib/programSaya.ts` (misalnya `labelStatus()` untuk Algo-C14-12 `tampilkanStatusProgram`, `aksiProgram()`, `hitungStatistik()`, `saringProgram()`, `persenKuota()`). Komponen tampilannya teruji lewat pengujian use case (UC01-TC03, UC01-TC04, UC07-TC01, UC07-TC02).


Tabel 4.2.13. Hasil Pengujian Unit Fungsi Logika C14 (berkas `src/tests/unit/programSaya.test.ts`, 9 tes)


| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C14-UT01 | `labelStatus()`, `nadaStatus()` | Normal | Pemetaan status program (I-07) ke label dan badge | Label dan nada sesuai status | Sesuai yang diharapkan | Pass |
| C14-UT02 | `aksiProgram()` | Negatif | Status MENUNGGU_VERIFIKASI | Kelola pendaftar nonaktif, tanpa tombol laporan | Sesuai yang diharapkan | Pass |
| C14-UT03 | `aksiProgram()` | Normal | Status AKTIF | Tombol Unggah Laporan aktif | Sesuai yang diharapkan | Pass |
| C14-UT04 | `aksiProgram()` | Normal | Status MENUNGGU_KONFIRMASI | Laporan Dikirim, tombol nonaktif | Sesuai yang diharapkan | Pass |
| C14-UT05 | `aksiProgram()` | Normal | Status PERLU_REVISI | Tombol Unggah Ulang aktif | Sesuai yang diharapkan | Pass |
| C14-UT06 | `aksiProgram()` | Batas | Status SELESAI | Tanpa tombol laporan | Sesuai yang diharapkan | Pass |
| C14-UT07 | `hitungStatistik()` | Normal | Daftar program contoh dengan beberapa status dan pendaftar | Program aktif 2, pendaftar menunggu 5, perlu revisi 1 | Sesuai yang diharapkan | Pass |
| C14-UT08 | `saringProgram()` | Normal | Filter SEMUA, AKTIF, dan SELESAI pada daftar yang sama | Jumlah hasil 4, 2, dan 1 | Sesuai yang diharapkan | Pass |
| C14-UT09 | `persenKuota()` | Batas dan negatif | Diterima di bawah kuota, melebihi kuota, dan kuota 0 | 60, 100 (dibatasi), dan 0 | Sesuai yang diharapkan | Pass |


Tabel 4.2.13b. Ringkasan Cakupan Kelas C14


| Informasi | Keterangan |
| :--- | :--- |
| Operasi yang diuji | `tampilkanStatusProgram()` (Algo-C14-12) beserta fungsi bantu I-07. Operasi lain (Algo-C14-01 s.d. C14-11, C14-13, C14-14) berupa render dan handler, teruji lewat UC01 dan UC07 (Subbab 4.4). |
| Coverage | 97,26% baris / 100% cabang (`src/lib/programSaya.ts`, @vitest/coverage-v8, bukti pada 4.6) |




### 4.2.14 Kelas ProgramController


**ID Kelas:** C15  
**Nama Kelas:** ProgramController  
**Tingkat:** Mendalam


Tabel 4.2.14. Hasil Pengujian Unit Kelas C15, operasi laporan, verifikasi, dan program saya


| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C15-UT01 | `konfirmasiLaporan()` (Algo-C15-09) | Normal | Setujui laporan (berkas `ProgramController.peninjauan.test.ts`) | Portofolio relawan diperbarui dalam `tx` yang sama | Sesuai yang diharapkan | Pass |
| C15-UT02 | `tolakLaporan()` (Algo-C15-10) | Normal | Tolak laporan (berkas yang sama) | Status ditolak dan portofolio tidak diperbarui | Sesuai yang diharapkan | Pass |
| C15-UT03 | `konfirmasiLaporan()` | Negatif | Pembaruan portofolio melempar galat | Galat dibungkus menjadi `CONFLICT` | Sesuai yang diharapkan | Pass |
| C15-UT04 | `konfirmasiLaporan()` | Negatif | Galat tak terduga dilempar saat peninjauan | Galat dilempar ulang tanpa diubah | Sesuai yang diharapkan | Pass |
| C15-UT05 | `ajukanLaporanAkhir()` (Algo-C15-06) | Normal | Ajukan laporan dengan beberapa verifikator (`ProgramController.ajukanLaporan.test.ts`) | Satu notifikasi per verifikator | Sesuai yang diharapkan | Pass |
| C15-UT06 | `ajukanLaporanAkhir()` | Batas | Ajukan laporan tanpa verifikator terdaftar | Tidak ada notifikasi dikirim | Sesuai yang diharapkan | Pass |
| C15-UT07 | `ajukanLaporanAkhir()` | Negatif | Program milik akun lain | Ditolak tanpa memulai transaksi | Sesuai yang diharapkan | Pass |
| C15-UT08 | `setujuiProgram()` | Normal | Setujui program MENUNGGU_VERIFIKASI (`ProgramController.verifikasi.test.ts`) | Program menjadi AKTIF dan inisiator menerima notifikasi | Sesuai yang diharapkan | Pass |
| C15-UT09 | `setujuiProgram()` | Negatif | Program tidak ditemukan | Galat `NOT_FOUND` | Sesuai yang diharapkan | Pass |
| C15-UT10 | `setujuiProgram()` | Negatif | Program sudah AKTIF | Galat `CONFLICT` | Sesuai yang diharapkan | Pass |
| C15-UT11 | `setujuiProgram()` | Negatif | Program keburu diproses verifikator lain | Galat `CONFLICT` | Sesuai yang diharapkan | Pass |
| C15-UT12 | `ambilProgramMenungguVerifikasi()` | Normal | Daftar program dengan status campuran (`ProgramController.menungguVerifikasi.test.ts`) | Hanya status MENUNGGU_VERIFIKASI yang dikembalikan | Sesuai yang diharapkan | Pass |
| C15-UT13 | `ambilProgramMenungguVerifikasi()` | Batas | Tidak ada program yang menunggu | Daftar kosong | Sesuai yang diharapkan | Pass |
| C15-UT14 | `ambilProgramMenungguVerifikasi()` | Normal | Program dengan lembaga dan dokumen legalitas | Nama lembaga dan dokumen legalitas terbaru ikut dikembalikan | Sesuai yang diharapkan | Pass |
| C15-UT15 | `ambilProgramSaya()` | Negatif | Akun yang bukan inisiator (`ProgramController.programSaya.test.ts`) | Galat `NOT_FOUND` | Sesuai yang diharapkan | Pass |
| C15-UT16 | `ambilProgramSaya()` | Normal | Inisiator dengan program miliknya dan program akun lain | Hanya program miliknya, dengan hitungan diterima dan menunggu | Sesuai yang diharapkan | Pass |


Tabel 4.2.14b. Ringkasan Cakupan Kelas C15


| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | `simpanProgramBaru()`, `validasiDataProgram()`, `cariProgram()`, `ambilDetailProgram()`, `validasiTautanSitus()`, `ajukanLaporanAkhir()`, `validasiLaporan()`, `tinjauLaporan()`, `konfirmasiLaporan()`, `tolakLaporan()`, `buatNotifikasi()` |
| Operasi yang diuji unit (bagian laporan dan verifikasi) | 16 tes pada 5 berkas di atas. `simpanProgramBaru()`, `validasiDataProgram()`, `tinjauLaporan()`, dan `validasiLaporan()` belum punya unit test khusus (`simpanProgramBaru()` teruji lewat INT-TC30 dan INT-TC31). Bagian eksplorasi (`ProgramController.eksplorasi.test.ts`) dan pendaftaran relawan (`ProgramController.daftarRelawan.test.ts`) dilaporkan oleh penulis masing-masing. |
| ID Algoritma yang tercakup | Algo-C15-06, Algo-C15-09, Algo-C15-10, Algo-C15-11 (notifikasi dalam transaksi) |
| Coverage (wajib ≥ 70%) | 78,28% baris / 86,53% cabang untuk seluruh `ProgramController.ts` (semua berkas tes `ProgramController.*`, @vitest/coverage-v8, bukti pada 4.6) |

### 4.2.15 Kelas SeleksiController

**ID Kelas:** C18<br>
**Nama Kelas:** SeleksiController<br>
**Tingkat:** Mendalam

Subbab ini menguji operasi public C18 yang direalisasikan pada alur seleksi: `lihatDaftarRelawan()`, `simpanHasilSeleksi()`, dan `konfirmasiHasilSeleksi()`. Operasi private `validasiKuota()` dan `triggerNotifikasi()` teruji tidak langsung lewat operasi public yang memanggilnya. Operasi `ajukanPendaftaran()` pada DPPL direalisasikan sebagai `ProgramController.daftarRelawan()` (C15) sehingga pengujiannya dicatat pada subbab C15. Aturan yang diuji: hanya pemilik program yang dapat melihat dan mengubah hasil seleksi (KF07), jumlah penerimaan tidak boleh melampaui kuota (KF05), hasil seleksi diumumkan satu kali setelah seluruh pendaftar diputuskan, dan notifikasi dikirim ke tiap pendaftar (KF08, KF09). Data uji: program "Penanaman Pohon" berstatus AKTIF dengan kuota 2 milik pengguna `inisiator-1`, dengan pendaftar berstatus MENUNGGU, DITERIMA, atau DITOLAK. Basis data Prisma digantikan objek tiruan (*mock*) sehingga pengujian berjalan tanpa basis data. File test: `src/tests/unit/SeleksiController.test.ts`.

Tabel 4.2.15a. Informasi Pengujian Kelas C18

| Informasi | Keterangan |
| :--- | :--- |
| Daftar operasi public pada DPPL | `ajukanPendaftaran()`, `lihatDaftarRelawan()`, `simpanHasilSeleksi()`, `konfirmasiHasilSeleksi()` |
| Operasi yang diuji | `lihatDaftarRelawan()`, `simpanHasilSeleksi()`, `konfirmasiHasilSeleksi()` (3 dari 4 operasi public); `ajukanPendaftaran()` direalisasikan di `ProgramController.daftarRelawan()` (C15-UT17 s.d. C15-UT24) |
| ID Algoritma yang tercakup | Algo-C18-02 s.d. Algo-C18-06 (Algo-C18-01 dicakup oleh C15-UT17 s.d. C15-UT24) |
| Coverage (wajib ≥ 70%) | 83,5% baris / 76,92% cabang (`src/server/controllers/SeleksiController.ts`, @vitest/coverage-v8, bukti pada 4.6) |

Tabel 4.2.15b. Hasil Pengujian Unit Kelas C18

| ID Pengujian | Operasi yang Diuji | Jenis Kasus | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| C18-UT01 | `lihatDaftarRelawan(idProgram)` | Normal | `inisiator-1` (pemilik program) memanggil `lihatDaftarRelawan("inisiator-1", "program-1")` dengan satu pendaftar MENUNGGU | Mengembalikan program "Penanaman Pohon" dan pendaftar `pendaftaran-1` berstatus MENUNGGU; data pendaftar diambil satu kali | Program dan pendaftar dikembalikan; data pendaftar diambil satu kali | Pass |
| C18-UT02 | `lihatDaftarRelawan(idProgram)` | Negatif | Program dimiliki `pemilik-lain`, lalu `inisiator-1` memanggil `lihatDaftarRelawan("inisiator-1", "program-1")` | Ditolak dengan kode galat `FORBIDDEN`; data pendaftar tidak diambil | Galat `FORBIDDEN`; data pendaftar tidak diambil | Pass |
| C18-UT03 | `simpanHasilSeleksi(idProgram, keputusan)` | Negatif | Kuota 2, sudah 1 diterima, dua pendaftar MENUNGGU keduanya diputuskan DITERIMA | Ditolak dengan kode galat `CONFLICT`; tidak ada status pendaftar yang diubah | Galat `CONFLICT`; status pendaftar tidak diubah | Pass |
| C18-UT04 | `simpanHasilSeleksi(idProgram, keputusan)` | Batas | Kuota 2, sudah 1 diterima, satu pendaftar MENUNGGU diputuskan DITERIMA (tepat sampai batas kuota) | Mengembalikan `true`; pembaruan status pendaftar dipanggil satu kali | `true`; pembaruan status dipanggil satu kali | Pass |
| C18-UT05 | `simpanHasilSeleksi(idProgram, keputusan)` | Negatif | Program dimiliki `pemilik-lain`, lalu `inisiator-1` memanggil `simpanHasilSeleksi("inisiator-1", "program-1", ...)` dengan keputusan DITOLAK untuk `pendaftaran-1` | Ditolak dengan kode galat `FORBIDDEN`; pembaruan status pendaftar tidak dipanggil | Galat `FORBIDDEN`; pembaruan status tidak dipanggil | Pass |
| C18-UT06 | `simpanHasilSeleksi(idProgram, keputusan)` | Normal | `inisiator-1` (pemilik) memutuskan DITERIMA untuk satu pendaftar berstatus MENUNGGU (kuota 2, belum ada yang diterima) | Mengembalikan `true`; pembaruan status dipanggil dengan kondisi `id = pendaftaran-1` dan `status = MENUNGGU`, data status `DITERIMA` | `true`; pembaruan status sesuai kondisi dan data yang diharapkan | Pass |
| C18-UT07 | `konfirmasiHasilSeleksi(idProgram)` | Normal | Dua pendaftar sudah diputuskan: `relawan-1` DITERIMA dan `relawan-2` DITOLAK, lalu `konfirmasiHasilSeleksi("inisiator-1", "program-1")` | Mengembalikan `true`; pembaruan status dipanggil 2 kali; 2 notifikasi dibuat: untuk `relawan-1` berisi kata "diterima" dan untuk `relawan-2` berisi "belum dapat diterima" | `true`; dua status diperbarui dan dua notifikasi sesuai hasil seleksi dikirim | Pass |
| C18-UT08 | `konfirmasiHasilSeleksi(idProgram)` | Negatif | Satu pendaftar masih berstatus MENUNGGU, lalu `konfirmasiHasilSeleksi("inisiator-1", "program-1")` | Ditolak dengan kode galat `CONFLICT`; tidak ada pembaruan status dan tidak ada notifikasi | Galat `CONFLICT`; tidak ada pembaruan status atau notifikasi | Pass |
| C18-UT09 | `konfirmasiHasilSeleksi(idProgram)` | Negatif | Satu-satunya pendaftar (DITERIMA) sudah pernah dinotifikasi (`notifikasiTerkirimAt` terisi), lalu `konfirmasiHasilSeleksi(...)` | Ditolak dengan kode galat `CONFLICT`; tidak ada pembaruan status dan tidak ada notifikasi ulang | Galat `CONFLICT`; tidak ada pembaruan status atau notifikasi ulang | Pass |
| C18-UT10 | `konfirmasiHasilSeleksi(idProgram)` | Batas | Dua pendaftar sudah diputuskan: `relawan-lama` DITERIMA sudah pernah dinotifikasi, `relawan-baru` DITOLAK belum, lalu `konfirmasiHasilSeleksi(...)` | Mengembalikan `true`; pembaruan status dan notifikasi masing-masing dipanggil 1 kali, hanya untuk `pendaftaran-2` / `relawan-baru` | `true`; hanya `pendaftaran-2` diperbarui dan notifikasi dikirim ke `relawan-baru` | Pass |
| C18-UT11 | `simpanHasilSeleksi(idProgram, keputusan)` | Negatif | Keputusan DITOLAK untuk `pendaftar-asing` yang bukan pendaftar program ini | Ditolak dengan kode galat `BAD_REQUEST`; pembaruan status tidak dipanggil | Galat `BAD_REQUEST`; pembaruan status tidak dipanggil | Pass |
| C18-UT12 | `simpanHasilSeleksi(idProgram, keputusan)` | Negatif | Satu permintaan memuat `pendaftaran-1` dua kali (DITERIMA dan DITOLAK) | Ditolak dengan galat bertipe `GalatSeleksi` | Galat `GalatSeleksi` dilempar | Pass |

### 4.2.16 Kelas [Nama Kelas lain]

*[Ulangi pola 4.2.1 untuk setiap kelas bertingkat Mendalam atau Sedang milik modul lain, urut menurut ID kelas.]*

<br>

## 4.3 Pengujian Integrasi

Pengujian integrasi memeriksa interaksi antarkomponen yang melewati batas, yaitu *Controller* ke *Model*, aplikasi ke basis data, dan aplikasi ke sistem eksternal. Daftar antarmuka mengacu pada dokumen DPPL, dengan minimal satu test case untuk setiap antarmuka. Pengujian memakai komponen nyata, bukan *mock*. Apabila ada antarmuka tambahan yang belum didaftarkan pada dokumen DPPL, cantumkan juga.

DPPL RekanBumi tidak memiliki tabel antarmuka antarkomponen yang bernomor, dan kode `I-XX` dipakai untuk layar (BAB 6 DPPL). Karena itu antarmuka pada Tabel 4.3.1 diambil dari relasi pada *view* arsitektur DPPL, yaitu Gambar 2.3 *Logical View* ("memanggil", "cek sesi", "mengarahkan ke login", dan dependensi *Controller* ke *Model*) serta Gambar 2.4 *Physical View* ("memanggil API" lewat tRPC/HTTPS dan "akses data" lewat Prisma). Kolom ID Antarmuka diisi pasangan kelas asal dan tujuan sesuai Tabel 4.1 DPPL (misalnya `C13 → C22`).

Setiap test case memeriksa tiga hal: aliran data antarkomponen (INT-TC01, INT-TC07, INT-TC09), kecocokan format dan parameter antarmuka (INT-TC04, INT-TC05), serta aturan pertukaran data dan penanganan galat (INT-TC02, INT-TC03, INT-TC06, INT-TC08).

Cara menjalankan integration test (dari folder `src/`):

```bash
docker compose up -d     # PostgreSQL lokal
pnpm db:migrate          # sekali, bila basis data masih kosong
pnpm dev                 # terminal lain: dibutuhkan file *.http.test.ts
pnpm test:integrasi
```

Lokasi file test: `src/tests/integrasi/`. Test memakai PostgreSQL, Better Auth, bcrypt, dan folder unggahan sungguhan. Setiap test membuat akun dengan email acak `...@rekanbumi.test` lalu menghapusnya kembali setelah selesai, sehingga data *seed* tidak berubah.

Tabel 4.3.1. Daftar Antarmuka Antarkomponen

| ID Antarmuka | Komponen Asal | Komponen Tujuan | Jenis Batas | Test Case |
| :--- | :--- | :--- | :--- | :--- |
| C12 → C13 | KelolaAkunPage (I-02, lewat router tRPC `auth.masuk` dan `auth.sesiSaya`) | AuthController | *View* - *Controller* (HTTP/tRPC) | INT-TC05, INT-TC06 |
| C13 → C22 | AuthController | BetterAuth (pustaka Better Auth, tabel `user` dan `account`) | *Controller* - Pustaka autentikasi - Basis data | INT-TC01, INT-TC02, INT-TC04 |
| C13 → C21 | AuthController | CloudStorageAdapter (folder unggahan lokal, pengganti layanan *Cloud Storage* eksternal pada Physical View) | Aplikasi - Sistem penyimpanan berkas | INT-TC01, INT-TC02 |
| C13 → DB | AuthController | PostgreSQL (`tbl_relawan`, `tbl_inisiator_program`, `tbl_dokumen_verifikasi`) | Aplikasi - Basis data | INT-TC01, INT-TC03 |
| C13 → C04 → C10 | AuthController | Pengguna dan Notifikasi (`tbl_notifikasi`) | *Controller* - *Model* - Basis data | INT-TC07, INT-TC08 |
| C22 → C13 | Better Auth (endpoint `/api/auth/verify-email`) | `AuthController.sinkronStatusVerifikasi()` | Pustaka - *Controller* - Basis data (antarmuka tambahan, issue #8) | INT-TC09 |
| C16 → C12 | EksplorasiProgramPage (formulir pendaftaran program) | KelolaAkunPage (I-02 Login, relasi "mengarahkan ke login") | *View* - *View* di peramban | UC02-TC01 (relasi ini berjalan di sisi klien sehingga diuji lewat use case) |
| C15 → DB | ProgramController | PostgreSQL (`tbl_program`, `tbl_dokumen_verifikasi`) | Aplikasi - Basis data | INT-TC30, INT-TC31 |
| C15 → C01 → DB | ProgramController | Program (operasi `aktifkan()`, tabel `tbl_program`) | *Controller* - *Model* - Basis data | INT-TC32, INT-TC33 |
| C15 → C09 → DB | ProgramController | LaporanProgram (`tbl_laporan_program`) | *Controller* - *Model* - Basis data | INT-TC34, INT-TC35, INT-TC36, INT-TC37, INT-TC38, INT-TC39 |
| C15 → C10 | ProgramController | Notifikasi (`tbl_notifikasi`) | *Controller* - *Model* - Basis data | INT-TC32, INT-TC34, INT-TC37, INT-TC38 |
| C15 → C20 | ProgramController | PresensiController (pembaruan portofolio relawan saat laporan disetujui) | *Controller* - *Controller* - Basis data | INT-TC37 |
| *[CXX → CYY]* | *[Komponen asal]* | *[Komponen tujuan]* | *[Jenis batas]* | *[ID test case]* |

Tabel 4.3.2. Hasil Pengujian Integrasi

| ID Pengujian | ID Antarmuka | Skenario | Prosedur/Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| INT-TC01 | C13 → C22, C13 → C21, C13 → DB | Normal: registrasi Relawan | Panggil `AuthController.buatAkunBaru()` dengan data Relawan lengkap (jenis dokumen `KTP`) dan PDF 6 byte, lalu baca ulang dari basis data dan folder unggahan | Baris `user` berperan `RELAWAN`. Baris `account` ber-*provider* `credential` dengan kata sandi berformat bcrypt. `tbl_relawan` berstatus `MENUNGGU`. Ada satu `tbl_dokumen_verifikasi` berjenis `KTP` dan berkasnya ada di folder unggahan. | Seluruh baris dan berkas ada sesuai yang diharapkan, hash diawali `$2b$10$`, ukuran berkas 6 byte | Pass |
| INT-TC02 | C13 → C22, C13 → C21 | Gagal: email sudah terdaftar | Registrasi email X, lalu registrasi lagi dengan email X huruf besar | `GalatValidasi ["Email sudah terdaftar"]`. Jumlah baris `user` dan jumlah berkas di folder tidak bertambah. | Galat sesuai, jumlah baris dan berkas tidak berubah | Pass |
| INT-TC03 | C13 → DB | Gagal: data diri tidak lengkap (UC01 alt. 1) | Registrasi Relawan dengan nama dan domisili kosong, tanpa berkas | `GalatValidasi ["Data diri tidak lengkap", "Dokumen verifikasi wajib diunggah"]` dan tidak ada baris `user` untuk email itu | Sesuai yang diharapkan | Pass |
| INT-TC04 | C13 → C22 | Normal dan gagal: verifikasi kredensial | Buat akun Inisiator dengan kata sandi `RahasiaUji2026`, lalu `BetterAuth.verifikasiKredensial()` dengan kata sandi benar dan `SalahSandi99` | Kata sandi benar mengembalikan idPengguna akun itu, kata sandi salah mengembalikan `null` | Sesuai yang diharapkan | Pass |
| INT-TC05 | C12 → C13 | Normal: login lewat HTTP | Buat akun, lalu `POST /api/trpc/auth.masuk` ke server yang berjalan. Pakai *cookie* dari respons untuk `GET /api/trpc/auth.sesiSaya`. | HTTP 200 dengan *cookie* `better-auth.session_token`. `sesiSaya` mengembalikan email akun dan peran `RELAWAN`. | HTTP 200, *cookie* terpasang, sesi sesuai | Pass |
| INT-TC06 | C12 → C13 | Gagal: kata sandi salah lewat HTTP | `POST /api/trpc/auth.masuk` dengan `SalahSandi99` | HTTP 401, pesan "Email atau kata sandi salah", tanpa *cookie* sesi | HTTP 401, pesan sesuai, tidak ada *header* `set-cookie` | Pass |
| INT-TC07 | C13 → C04 → C10 | Normal: kirim, ambil, dan baca notifikasi | Kirim dua notifikasi ke akun baru, panggil `ambilNotifikasi()`, lalu `bacaNotifikasi()` pada notifikasi teratas | Urutan terbaru di atas. Kolom `statusDibaca` notifikasi yang dibaca menjadi `true` di `tbl_notifikasi`. | Urutan `["Pendaftaran kedua: Ditolak", "Pendaftaran pertama: Diterima"]`, `statusDibaca = true` | Pass |
| INT-TC08 | C13 → C04 → C10 | Gagal: membaca notifikasi milik orang lain | Akun A memanggil `bacaNotifikasi()` untuk notifikasi milik akun B | `GalatTidakDitemukan`, dan `statusDibaca` notifikasi B tetap `false` di basis data | Sesuai yang diharapkan | Pass |
| INT-TC09 | C22 → C13 | Normal: verifikasi email menyinkronkan status Relawan | Registrasi Relawan, buat token verifikasi dengan `BETTER_AUTH_SECRET`, lalu buka `GET /api/auth/verify-email?token=...` | HTTP 302. `user.emailVerified = true` dan `tbl_relawan.statusVerifikasi = TERVERIFIKASI`. | HTTP 302, kedua kolom berubah sesuai yang diharapkan | Pass |
| INT-TC30 | C15 → DB | Normal: simpan program baru oleh Inisiator terverifikasi | Buat akun Inisiator berstatus TERVERIFIKASI, panggil `ProgramController.simpanProgramBaru()` dengan data program lengkap dan tautan dokumen legalitas, lalu baca ulang dari basis data | Program tersimpan berstatus `MENUNGGU_VERIFIKASI` dengan nama sesuai, dan ada satu baris `tbl_dokumen_verifikasi` berisi tautan legalitas | Sesuai yang diharapkan | Pass |
| INT-TC31 | C15 → DB | Gagal: lembaga belum terverifikasi | Buat akun Inisiator berstatus MENUNGGU, lalu panggil `simpanProgramBaru()` | Galat `FORBIDDEN`. Tidak ada program dan tidak ada dokumen verifikasi yang tersimpan | Galat sesuai, jumlah program dan dokumen 0 | Pass |
| INT-TC32 | C15 → C01 → DB, C15 → C10 | Normal: verifikator menyetujui program | Buat program berstatus `MENUNGGU_VERIFIKASI`, lalu panggil `setujuiProgram()` | Mengembalikan `AKTIF`, status di basis data `AKTIF`, dan Inisiator menerima notifikasi | Sesuai yang diharapkan | Pass |
| INT-TC33 | C15 → C01 → DB | Gagal: menyetujui program yang sudah AKTIF | Buat program berstatus `AKTIF`, lalu panggil `setujuiProgram()` | Galat `CONFLICT` dan status program tetap `AKTIF` | Galat sesuai, status tetap `AKTIF` | Pass |
| INT-TC34 | C15 → C09 → DB, C15 → C10 | Normal: Inisiator mengajukan laporan akhir | Buat program `AKTIF` dan satu akun Verifikator, lalu panggil `ajukanLaporanAkhir()` dengan satu tautan dokumentasi dan ringkasan capaian | Mengembalikan `MENUNGGU_KONFIRMASI`. Tersimpan satu laporan berstatus `MENUNGGU` beserta dokumentasinya, status program `MENUNGGU_KONFIRMASI`, dan Verifikator menerima satu notifikasi | Sesuai yang diharapkan | Pass |
| INT-TC35 | C15 → C09 → DB | Gagal: mengajukan laporan untuk program milik akun lain | Inisiator lain memanggil `ajukanLaporanAkhir()` untuk program milik Inisiator pertama | Galat `FORBIDDEN`, tidak ada laporan tersimpan, status program tetap `AKTIF` | Galat sesuai, jumlah laporan 0, status tetap `AKTIF` | Pass |
| INT-TC36 | C15 → C09 → DB | Gagal: dokumentasi kosong | Panggil `ajukanLaporanAkhir()` dengan daftar dokumentasi kosong | Galat `BAD_REQUEST`, tidak ada laporan tersimpan, status program tetap `AKTIF` | Galat sesuai, jumlah laporan 0, status tetap `AKTIF` | Pass |
| INT-TC37 | C15 → C09 → DB, C15 → C10, C15 → C20 | Normal: Verifikator menyetujui laporan akhir | Ajukan laporan, lalu panggil `konfirmasiLaporan()` oleh Verifikator | Mengembalikan `SELESAI`. Laporan `DISETUJUI` dengan `verifikatorId` tercatat, status program `SELESAI`, dan Inisiator menerima satu notifikasi "Laporan akhir disetujui." | Sesuai yang diharapkan | Pass |
| INT-TC38 | C15 → C09 → DB, C15 → C10 | Alternatif: Verifikator menolak laporan akhir | Ajukan laporan, lalu panggil `tolakLaporan()` dengan catatan "Lengkapi foto kegiatan" | Mengembalikan `PERLU_REVISI`. Laporan `DITOLAK` dengan catatan revisi dan `verifikatorId` tercatat, status program `PERLU_REVISI`, dan notifikasi Inisiator memuat catatan | Sesuai yang diharapkan | Pass |
| INT-TC39 | C15 → C09 → DB | Gagal: meninjau laporan yang sudah ditinjau | Ajukan laporan, tolak, lalu panggil `konfirmasiLaporan()` pada laporan yang sama | Galat `CONFLICT`, laporan tetap `DITOLAK`, status program tetap `PERLU_REVISI` | Galat sesuai, status laporan dan program tidak berubah | Pass |
| *INT-TC10 dst.* | *[CXX → CYY]* | *[Skenario]* | *[Prosedur/masukan]* | *[Hasil yang diharapkan]* | *[Hasil aktual]* | *Pass/Fail* |

<br>

## 4.4 Pengujian Use Case

Pengujian use case dilakukan pada seluruh skenario normal dan alternatif sesuai Subbab 4.4 SKPL, dengan minimal satu test case untuk setiap skenario. Kolom ID KF menunjukkan KF yang diverifikasi oleh test case tersebut.

Pengujian use case bersifat *black-box*: setiap langkah pada kolom Prosedur dijalankan di peramban Chromium terhadap aplikasi tag `v9.0` (`pnpm dev`) dengan data `pnpm db:seed`, lalu hasil di layar dicocokkan dengan reaksi sistem pada SKPL. Tangkapan layarnya ada di Subbab 4.6. Akun *seed* yang dipakai: `relawan1@rekanbumi.example` (Ayu Contoh) dan `inisiator@rekanbumi.example`, keduanya dengan kata sandi `DemoRekanBumi2026!`.

### 4.4.1 Use Case Daftar program

**ID Use Case:** UC01  
**Nama Use Case:** Daftar program

UC01-TC01 dan UC01-TC02 menguji bagian registrasi akun Relawan beserta dokumennya (I-01). Bagian Inisiator mendaftarkan program (I-08) dilanjutkan mulai UC01-TC03.

Tabel 4.4.1. Hasil Pengujian Use Case UC01

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| UC01-TC01 | KF01, KF10 | Normal | 1. Buka halaman Registrasi (`/registrasi`) dan pilih jenis akun "Relawan".<br>2. Isi formulir data diri.<br>3. Unggah dokumen lewat area unggah.<br>4. Centang persetujuan, lalu klik "Daftar". | Nama: Siti Rahma<br>Email: `siti.uc01.<waktu>@rekanbumi.test`<br>Kata sandi: `SitiRahma2026`<br>Telepon: 081234567890<br>Domisili: Jakarta<br>Berkas: `ktp-uji.pdf` | Sistem menerima dokumen, memeriksa kelengkapan dan status verifikasi data, menyimpan data, dan menampilkan notifikasi keberhasilan. | Banner "Akun berhasil dibuat." tampil bersama informasi tautan verifikasi email dan tombol "Lanjut ke halaman masuk". Di basis data, akun berperan `RELAWAN` dengan status verifikasi `MENUNGGU`, dan dokumen tersimpan di `uploads/<uuid>.pdf`. | Pass |
| UC01-TC02 | KF10 | Alternatif 1: Data Diri Relawan Tidak Lengkap | 1. Buka `/registrasi` dan pilih "Relawan".<br>2. Isi hanya email dan kata sandi, lalu centang persetujuan.<br>3. Klik "Daftar". | Email: `tidaklengkap.<waktu>@rekanbumi.test`<br>Kata sandi: `SandiLengkap2026`<br>Nama, telepon, domisili kosong, tanpa berkas | Sistem mendeteksi data tidak lengkap, membatalkan pengiriman, dan menampilkan pesan peringatan untuk melengkapi data. | Banner merah berisi "Data diri tidak lengkap" dan "Dokumen verifikasi wajib diunggah", formulir tetap terbuka dengan isian yang sudah diketik. Tidak ada akun tersimpan untuk email tersebut. | Pass |
| UC01-TC03 | KF01 | Normal | 1. Masuk sebagai Inisiator (`inisiator@rekanbumi.example`) dan buka `/inisiator/program/baru`.<br>2. Isi formulir "Daftarkan Program Baru" beserta tautan dokumen legalitas.<br>3. Klik "Simpan Program". | Judul Program: UC-M10 Tanam Mangrove<br>Kategori: Jaga Alam<br>Lokasi: Bandung<br>Waktu Mulai: 01/11/2026 00.00<br>Waktu Selesai: 02/11/2026 12.00<br>Kuota Relawan: 30<br>Deskripsi: Program uji UC Modul 4.<br>Syarat dan Ketentuan: Tidak ada syarat khusus.<br>Tautan Dokumen Legalitas: `https://contoh.id/legalitas.pdf` | Sistem menyimpan program dengan status menunggu verifikasi dan menampilkan notifikasi keberhasilan. | Tombol berubah menjadi "Menyimpan...", lalu muncul dialog browser "Program berhasil dibuat!" dan halaman berpindah ke Program Saya (`/inisiator/program`). Program baru tampil di daftar berstatus "Menunggu Verifikasi". | Pass |
| UC01-TC04 | KF01 | Alternatif 1: Lembaga Belum Terverifikasi | 1. Masuk sebagai Inisiator yang lembaganya belum terverifikasi (`inisiator2@rekanbumi.example`) dan buka `/inisiator/program/baru`.<br>2. Isi formulir program beserta tautan dokumen legalitas.<br>3. Klik "Simpan Program". | Judul Program: UC-M10 Ditolak<br>Kategori: Jaga Iklim<br>Lokasi: p<br>Waktu Mulai: 08/12/2006 12.00<br>Waktu Selesai: 09/12/2006 12.00<br>Kuota Relawan: 30<br>Deskripsi: p<br>Syarat dan Ketentuan: p<br>Tautan Dokumen Legalitas: `https://example.com/legalitas` | Sistem menolak penyimpanan program dan menampilkan pesan bahwa lembaga belum terverifikasi. | Banner merah "Lembaga belum terverifikasi." tampil di atas formulir, formulir tetap terbuka dengan isian yang sudah diketik. | Pass |


### 4.4.2 Use Case Login akun

**ID Use Case:** UC02  
**Nama Use Case:** Login akun

Skenario normal UC02 punya dua langkah dengan reaksi sistem yang berbeda. Masing-masing diuji dengan test case sendiri (UC02-TC01 dan UC02-TC02).

Tabel 4.4.2. Hasil Pengujian Use Case UC02

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| UC02-TC01 | KF06 | Normal (langkah 1) | 1. Tanpa login, buka detail program "Susur Pantai Bersih" (`/program/seed-program-dibuka`).<br>2. Klik "Daftar Program".<br>3. Isi formulir pendaftaran, lalu klik "Kirim Pendaftaran". | Keterampilan: Bisa P3K<br>Ketersediaan: Bisa hadir penuh<br>Persetujuan dicentang | Sistem mengharuskan calon relawan untuk login dan mengarahkan ke halaman login akun. | Permohonan ditolak dengan pesan "Silakan masuk dulu.", tetapi pengguna tetap di `/program/seed-program-dibuka/daftar` dan **tidak diarahkan** ke halaman login. | **Fail.** Penyebab: `src/views/KelolaProgramPage/useProgramDaftar.ts` (I-06) hanya menampilkan pesan galat `UNAUTHORIZED` dan tidak menjalankan relasi "mengarahkan ke login" pada Logical View DPPL (`arahkanKeLogin()`, Algo-C12-08). Usulan perbaikan: pada `onError`, galat berkode `UNAUTHORIZED` diarahkan ke `/login?urlKembali=/program/<id>`. Perubahan ini sudah dicoba di lingkungan uji: langkah yang sama diarahkan ke `/login?urlKembali=%2Fprogram%2Fseed-program-dibuka` dan kembali ke detail program setelah login. |
| UC02-TC02 | KF06 | Normal (langkah 2) | 1. Buka halaman login dengan tujuan kembali ke program (`/login?urlKembali=%2Fprogram%2Fseed-program-dibuka`).<br>2. Masukkan kredensial dan klik "Masuk". | Email: `relawan1@rekanbumi.example`<br>Kata sandi: `DemoRekanBumi2026!` | Sistem memverifikasi kredensial, memberikan akses masuk, dan mengarahkan relawan kembali ke halaman program. | Pengguna diarahkan ke `/program/seed-program-dibuka`. Navbar menampilkan menu Relawan, ikon notifikasi, dan nama "Ayu Contoh". | Pass |
| UC02-TC03 | KF06 | Alternatif 1: Kredensial Salah | 1. Buka `/login`.<br>2. Masukkan email terdaftar dengan kata sandi salah, lalu klik "Masuk". | Email: `relawan1@rekanbumi.example`<br>Kata sandi: `SandiSalah123` | Sistem menolak kredensial tersebut dan menampilkan pesan gagal masuk akun. | Pesan "Email atau kata sandi salah" tampil, pengguna tetap di halaman login tanpa sesi. | Pass |
| UC02-TC04 | KF06 | Alternatif 2: Akun Terkunci Sementara | 1. Buka `/login`.<br>2. Masukkan kata sandi salah 5 kali berturut-turut.<br>3. Masukkan kata sandi benar dan klik "Masuk" untuk keenam kalinya. | Email: `relawan1@rekanbumi.example`<br>Kata sandi salah: `SandiSalah123` (5 kali)<br>Kata sandi benar: `DemoRekanBumi2026!` | Sistem menolak permintaan masuk dan menampilkan pesan peringatan bahwa IP diblokir sementara selama 5 menit. | Percobaan 1–5 menampilkan "Email atau kata sandi salah". Percobaan ke-6, walaupun kata sandinya benar, menampilkan "IP kamu diblokir sementara selama 5 menit karena terlalu banyak percobaan masuk. Coba lagi nanti." | Pass |

### 4.4.3 Use Case Mencari program

*[Diisi PIC: pola tabel sama dengan 4.4.1.]*

### 4.4.4 Use Case Mengunjungi situs program

*[Diisi PIC: pola tabel sama dengan 4.4.1.]*

### 4.4.5 Use Case Menyeleksi calon relawan pendaftar

*[Diisi PIC: pola tabel sama dengan 4.4.1.]*

### 4.4.6 Use Case Konfirmasi status pendaftaran

**ID Use Case:** UC06  
**Nama Use Case:** Konfirmasi status pendaftaran

Tabel 4.4.6. Hasil Pengujian Use Case UC06

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| UC06-TC01 | KF08, KF09 | Normal | 1. Inisiator login, buka Kelola Pendaftar program "Aksi Bersih Sungai" (`/inisiator/program/seed-program-berlangsung/pendaftar`).<br>2. Ubah keputusan pendaftar Ayu Contoh menjadi "Diterima", klik "Simpan Hasil Seleksi".<br>3. Klik "Konfirmasi & Kirim Notifikasi" dan konfirmasi di dialog.<br>4. Relawan login, perhatikan ikon lonceng, lalu buka menu Notifikasi.<br>5. Pilih notifikasi teratas. | Inisiator: `inisiator@rekanbumi.example`<br>Relawan: `relawan1@rekanbumi.example`<br>Kata sandi keduanya: `DemoRekanBumi2026!`<br>Keputusan: Diterima | Sistem memproses konfirmasi dan otomatis mengirim notifikasi status pendaftaran kepada relawan. Relawan melihat detail pemberitahuan berisi status hasil seleksi ("Diterima" atau "Ditolak"). | Inisiator melihat "Keputusan seleksi berhasil disimpan." dan "Notifikasi hasil seleksi dikirim kepada pendaftar yang belum pernah menerimanya." Lonceng relawan menampilkan angka 1, dan halaman Notifikasi menulis "1 notifikasi belum dibaca". Setelah dipilih, detail menampilkan "Selamat, pendaftaranmu pada program Aksi Bersih Sungai diterima." dan status berubah menjadi "Semua notifikasi sudah dibaca". | Pass |

### 4.4.7 Use Case Memperbarui status program

**ID Use Case:** UC07  
**Nama Use Case:** Memperbarui status program

Tabel 4.4.7. Hasil Pengujian Use Case UC07

| ID Pengujian | ID KF | Skenario | Prosedur Pengujian | Masukan | Hasil yang Diharapkan | Hasil Pengujian | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| UC07-TC01 | KF13, KF15 | Normal | 1. Masuk sebagai Verifikator (`verifikator@rekanbumi.example`), buka `/verifikator`, lalu klik tombol setujui pada program "UC-M10 Tanam Mangrove" dan klik "Ya, setujui" di dialog.<br>2. Masuk sebagai Inisiator (`inisiator@rekanbumi.example`), buka `/laporan`, pilih program tersebut, isi tautan dokumentasi dan ringkasan capaian, lalu klik "Kirim untuk Ditinjau".<br>3. Buka Program Saya (`/inisiator/program`).<br>4. Masuk kembali sebagai Verifikator, buka `/verifikator/laporan`, lalu tinjau dan setujui laporan program tersebut. | Program: UC-M10 Tanam Mangrove<br>Tautan dokumentasi akhir: `https://contoh.id/foto-mangrove-1.jpg`<br>Ringkasan capaian: Seribu bibit mangrove ditanam di pesisir. | Program menjadi aktif setelah disetujui. Setelah laporan dikirim, status program menjadi "Menunggu Konfirmasi" dan Verifikator menerima notifikasi. Setelah laporan ditinjau dan disetujui, status laporan menjadi disetujui. | Dialog "Setujui program ini?" menyebut program akan menjadi aktif dan inisiator diberi notifikasi. Setelah "Ya, setujui", banner "Program "UC-M10 Tanam Mangrove" disetujui dan kini aktif." tampil dan program hilang dari daftar menunggu verifikasi. Di `/laporan`, program tampil berstatus Aktif. Setelah laporan dikirim, Program Saya menampilkan status "Menunggu Konfirmasi" dengan aksi "Laporan Dikirim". Di `/verifikator/laporan`, ikon lonceng verifikator menunjukkan angka 1 dan laporan program tersebut tampil berlabel DISETUJUI. | Pass |

### 4.4.8 Use Case Konfirmasi kehadiran program

*[Diisi PIC: pola tabel sama dengan 4.4.1.]*

### 4.4.9 Use Case Memperbarui status akun relawan

*[Diisi PIC: pola tabel sama dengan 4.4.1.]*

<br>

## 4.5 Pengujian Kebutuhan Non-Fungsional (KNF)

Setiap KNF pada Tabel 3.2 SKPL diuji secara terukur berdasarkan parameter yang telah didefinisikan. Setiap pengujian memuat target terukur, metode dan alat yang sesuai dengan parameter (misalnya Chrome DevTools untuk *response time* dan inspeksi basis data untuk *security*), serta hasil aktual berupa angka atau data. KNF yang belum dipenuhi atau tidak diimplementasikan dicantumkan beserta alasan dan rencana perbaikan.

Skrip uji KNF02 dan KNF06 ada di `src/tests/knf/`. Keduanya dijalankan dari folder `src/` ketika server sudah berjalan:

```bash
npx tsx --tsconfig tsconfig.json tests/knf/ujiKnf02HashKataSandi.ts
npx tsx --tsconfig tsconfig.json tests/knf/ujiKnf06BlokirIP.ts --tunggu   # --tunggu: ikut menunggu 5 menit untuk KNF06-TC02
```

Tabel 4.5. Hasil Pengujian KNF

| ID Pengujian | ID KNF | Parameter | Target Terukur | Metode dan Alat | Hasil Aktual | Kesimpulan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| KNF01-TC01 | KNF01 | Performance efficiency | Dengan 50 pengguna mencari program secara bersamaan, setiap pencarian menampilkan hasil dalam waktu ≤ 2 detik dan tidak ada request yang gagal. | Skrip HTTP `tests/beban/ujiBebanPencarian.ts` (tsx) ke endpoint pencarian halaman Eksplorasi I-04 (`program.cari`) pada aplikasi mode produksi (`next build` + `next start`). Setiap putaran mengirim 50 request bersamaan dengan 8 variasi pencarian (tanpa kata kunci, dengan kata kunci, dengan filter kategori, dan tanpa hasil). Diulang 5 putaran (250 request) setelah satu request pemanasan per variasi. Data uji: data *seed* (7 program, 3 di antaranya AKTIF). | 250 dari 250 request berhasil. Waktu respons rata-rata 169 ms, terlama 240 ms. Per putaran: rata-rata 127–211 ms, p95 143–233 ms. Tidak ada request yang lebih dari 2.000 ms. | Pass |
| KNF02-TC01 | KNF02 | Security | Kata sandi akun baru tersimpan sebagai hash bcrypt, bukan teks asli. Seluruh akun kredensial di basis data berformat bcrypt. | Inspeksi basis data dengan skrip `ujiKnf02HashKataSandi.ts` dan `psql`. Satu akun baru didaftarkan lewat endpoint registrasi I-01 (`auth.daftar`), lalu kolom `account.password` diperiksa: format `$2b$<cost>$`, ada tidaknya teks asli, dan `bcrypt.compare()`. Seluruh akun kredensial di basis data juga diperiksa (1 kali jalan). | Nilai kolom `$2b$10$IKWIHc1UXhb4Cb74DLqOhuCkfe.cI4MC3egOD4mSqB1BAPGt4rGx6` (bcrypt, *cost factor* 10). Teks asli tidak tersimpan, `bcrypt.compare` = `true`. Ada 7 akun kredensial di basis data dan 0 yang bukan bcrypt. | Pass |
| KNF03-TC01 | KNF03 | Performance efficiency | Berkas legalitas maksimal 2 MB tersimpan dalam waktu <= 5 detik. | Skrip `ujiKnf03UnggahBerkas.ts` memanggil `CloudStorageAdapter.unggahBerkas()` (C21) dengan PDF 2 MB (2.097.152 byte, batas atas), 5 kali percobaan, waktu diukur dengan `performance.now()`. Pengukuran pada sisi server dan tidak termasuk waktu jaringan dari peramban. | Semua 5 berkas tersimpan. Waktu rata-rata 2,9 ms, maksimum 5,9 ms (batas 5.000 ms). | Pass |
| KNF04-TC01 | KNF04 | Reliability | Dari 50 permintaan konfirmasi kehadiran (check-in) yang dikirim bersamaan, kegagalan respons paling banyak 5% dari total permintaan. Jumlah kehadiran yang tercatat di basis data sama dengan jumlah permintaan yang berhasil. | Skrip HTTP `tests/beban/ujiBebanCheckIn.ts` (tsx) ke endpoint check-in I-12 (`presensi.prosesCheckIn`) pada aplikasi mode produksi (`next build` + `next start`). Data disiapkan dengan `tests/beban/siapkanDataBeban.ts`: satu program AKTIF yang sedang berlangsung dan 50 akun relawan yang sudah DITERIMA, masing-masing dengan sesi login sendiri. Setiap putaran mengirim 50 check-in bersamaan (satu per relawan), lalu jumlah baris `tbl_kehadiran` dicocokkan dengan request yang berhasil. Kehadiran dihapus di awal setiap putaran. Diulang 5 putaran (250 request) setelah satu request pemanasan. | 250 dari 250 request berhasil, gagal 0 (0,0%). Kehadiran tercatat di basis data 50 per putaran, selalu sama dengan request yang berhasil. Waktu respons rata-rata 254 ms, terlama 328 ms. Per putaran: rata-rata 218–302 ms, p95 230–322 ms. | Pass |
| KNF05-TC01 | KNF05 | Compatibility | Halaman I-01 Registrasi (tamu) tampil utuh tanpa elemen terpotong pada lebar 1024 px dan 360 px. | Chrome DevTools *device mode* pada aplikasi mode produksi. Viewport 1024×768 dan lebar 360 dengan tinggi sama dengan tinggi halaman (`document.documentElement.scrollHeight`), lalu *Capture full size screenshot* (1 kali per lebar). KNF05 diuji pada satu halaman perwakilan untuk setiap peran pengguna, dipilih halaman dengan tata letak paling kompleks. | 1024 px: panel ilustrasi dan formulir tampil berdampingan, seluruh isian, area unggah, tombol "Daftar", dan *footer* utuh. 360 px: panel ilustrasi disembunyikan, formulir menjadi satu kolom, label tab "Inisiator Program" turun ke dua baris tanpa terpotong, tanpa gulir horizontal. | Pass |
| KNF05-TC02 | KNF05 | Compatibility | Halaman I-04 Eksplorasi Program tampil utuh tanpa elemen terpotong pada lebar 1024 px dan 360 px. | Sama dengan KNF05-TC01. Diambil sebagai tamu (1024 px) dan sebagai verifikator (360 px). Isi halaman sama untuk semua peran. | 1024 px: kolom pencarian, filter kategori, dan tiga kartu program tampil dalam satu baris. 360 px: kartu program tersusun satu kolom, seluruh informasi kartu dan tombol "Lihat Detail" utuh, tanpa gulir horizontal. | Pass |
| KNF05-TC03 | KNF05 | Compatibility | Halaman I-12 Kegiatan Saya (relawan) tampil utuh tanpa elemen terpotong pada lebar 1024 px dan 360 px. | Sama dengan KNF05-TC01, login sebagai relawan (`relawan1@rekanbumi.example`). | 1024 px: daftar empat kegiatan di kiri dan panel Check-in di kanan tampil utuh. 360 px: tampilan berubah menjadi satu kolom berisi kegiatan terdekat dan panel Check-in, seluruh teks, tombol, dan tautan "Lihat Portofolio Saya" utuh, tanpa gulir horizontal. | Pass |
| KNF05-TC04 | KNF05 | Compatibility | Halaman I-11 Kelola Pendaftar (inisiator) tampil utuh tanpa elemen terpotong pada lebar 1024 px dan 360 px. | Sama dengan KNF05-TC01, login sebagai inisiator. Pada 360 px diambil satu tangkapan tambahan setelah tabel pendaftar digeser ke kanan. | 1024 px: kartu kuota, filter, tabel pendaftar dengan enam kolom (sampai kolom Keputusan), dan tombol "Simpan Hasil Seleksi" utuh. 360 px: halaman tidak melebar ke samping, tetapi tabel pendaftar lebih lebar dari layar dan ditampilkan dengan gulir horizontal di dalam kartunya. Kolom Keterampilan, Ketersediaan, dan Keputusan baru terlihat setelah tabel digeser, dan setelah digeser dropdown Keputusan dapat dijangkau dan dipakai. | Pass (dengan catatan: tabel memakai gulir horizontal pada 360 px) |
| KNF05-TC05 | KNF05 | Compatibility | Halaman I-10 Tinjau Laporan Akhir (verifikator) tampil utuh tanpa elemen terpotong pada lebar 1024 px dan 360 px. | Sama dengan KNF05-TC01, login sebagai verifikator, membuka laporan berstatus MENUNGGU. | 1024 px dan 360 px: judul, status, ringkasan capaian, tautan dokumentasi, kolom catatan revisi, serta tombol "Tolak dan minta revisi" dan "Setujui laporan" utuh. Pada 360 px tautan dokumentasi yang panjang dipindah ke baris berikutnya tanpa melebar ke samping. | Pass |
| KNF06-TC01 | KNF06 | Security | Setelah 5 kali gagal berturut-turut dari satu IP, permintaan masuk berikutnya dari IP itu ditolak. IP lain tidak terpengaruh. | Skrip HTTP `ujiKnf06BlokirIP.ts` ke `auth.masuk` dengan *header* `x-forwarded-for` tetap: 5 kali kata sandi salah, percobaan ke-6 dengan kata sandi benar, lalu login benar dari IP lain (1 rangkaian, 7 permintaan). | Percobaan 1–5: HTTP 401 "Email atau kata sandi salah". Percobaan ke-6 (kata sandi benar): HTTP 429 "IP diblokir sementara selama 5 menit". IP lain: HTTP 200. | Pass |
| KNF06-TC02 | KNF06 | Security | Blokir berlangsung 5 menit, lalu IP yang sama bisa masuk lagi | Skrip yang sama dengan opsi `--tunggu`: login benar segera setelah blokir, tunggu 5 menit 5 detik, lalu login benar lagi (1 kali) | 21.56.53: HTTP 429 (masih diblokir). 22.01.58: HTTP 200, berhasil masuk. | Pass |
| KNF07-TC01 | KNF07 | Interaction capability | Skor *Accessibility* Google Lighthouse halaman I-01 Registrasi (tamu) minimal 90 dari 100. | Lighthouse pada Chrome DevTools di jendela Incognito, aplikasi mode produksi. Mode *Navigation*, *Device* Desktop, kategori *Accessibility* saja, *Clear storage* dimatikan agar sesi login tetap terbaca, *Simulated throttling* bawaan (1 kali ukur per halaman). KNF07 diuji pada lima halaman yang sama dengan KNF05. | Skor 100. Tidak ada audit yang gagal. | Pass |
| KNF07-TC02 | KNF07 | Interaction capability | Skor *Accessibility* halaman I-04 Eksplorasi Program minimal 90. | Sama dengan KNF07-TC01, login sebagai relawan. | Skor 98. Satu audit gagal: *Heading elements are not in a sequentially-descending order* (tingkat judul pada halaman tidak berurutan). | Pass |
| KNF07-TC03 | KNF07 | Interaction capability | Skor *Accessibility* halaman I-12 Kegiatan Saya (relawan) minimal 90. | Sama dengan KNF07-TC01, login sebagai relawan. | Skor 100. Tidak ada audit yang gagal. | Pass |
| KNF07-TC04 | KNF07 | Interaction capability | Skor *Accessibility* halaman I-11 Kelola Pendaftar (inisiator) minimal 90. | Sama dengan KNF07-TC01, login sebagai inisiator. | Skor 100. Tidak ada audit yang gagal. | Pass |
| KNF07-TC05 | KNF07 | Interaction capability | Skor *Accessibility* halaman I-10 Tinjau Laporan Akhir (verifikator) minimal 90. | Sama dengan KNF07-TC01, login sebagai verifikator, membuka laporan berstatus MENUNGGU. | Skor 96. Satu audit gagal: *Background and foreground colors do not have a sufficient contrast ratio* (ada teks dengan kontras warna yang kurang). | Pass |
| KNF08-TC01 | KNF08 | Flexibility | Halaman I-01 Registrasi dapat memuat seluruh fungsi interaktifnya tanpa pesan galat (teks merah) di *console* pada Google Chrome, Mozilla Firefox, dan Apple Safari. | *Console developer tools* bawaan tiap peramban pada aplikasi mode produksi. Chrome dibuka di jendela Incognito dan Firefox di jendela privat agar log ekstensi tidak ikut terekam. Per halaman: *console* dibersihkan, halaman dimuat ulang, lalu fitur interaktifnya dicoba (1 kali per peramban). Pada halaman ini: berpindah tab Relawan/Inisiator, mengisi beberapa isian, membuka *dropdown* Domisili, dan menekan tombol tampilkan kata sandi. KNF08 diuji pada lima halaman yang sama dengan KNF05. | Chrome: tidak ada galat ("No issues"), diambil saat login sebagai verifikator. Firefox: *[belum diisi]*. Safari: *[belum diisi]*. | *[menunggu Firefox dan Safari]* |
| KNF08-TC02 | KNF08 | Flexibility | Halaman I-04 Eksplorasi Program tanpa pesan galat di *console* pada ketiga peramban. | Sama dengan KNF08-TC01. Fitur yang dicoba: pencarian kata kunci "pohon" dan filter kategori Jaga Alam, Jaga Iklim, dan Semua. | Chrome: tidak ada galat, pencarian "pohon" dengan filter Jaga Alam menampilkan 1 program. Firefox: *[belum diisi]*. Safari: *[belum diisi]*. | *[menunggu Firefox dan Safari]* |
| KNF08-TC03 | KNF08 | Flexibility | Halaman I-12 Kegiatan Saya (relawan) tanpa pesan galat di *console* pada ketiga peramban. | Sama dengan KNF08-TC01, login sebagai relawan. Fitur yang dicoba: memilih kegiatan lain pada daftar sehingga panel Check-in berganti. Tombol Check-in tidak ditekan. | Chrome: tidak ada galat. Firefox: *[belum diisi]*. Safari: *[belum diisi]*. | *[menunggu Firefox dan Safari]* |
| KNF08-TC04 | KNF08 | Flexibility | Halaman I-11 Kelola Pendaftar (inisiator) tanpa pesan galat di *console* pada ketiga peramban. | Sama dengan KNF08-TC01, login sebagai inisiator. Fitur yang dicoba: filter status Menunggu, Diterima, Ditolak, dan Semua, serta membuka *dropdown* Keputusan. Tombol Simpan Hasil Seleksi tidak ditekan. | Chrome: tidak ada galat, filter Diterima menampilkan 1 pendaftar. Firefox: *[belum diisi]*. Safari: *[belum diisi]*. | *[menunggu Firefox dan Safari]* |
| KNF08-TC05 | KNF08 | Flexibility | Halaman I-10 Tinjau Laporan Akhir (verifikator) tanpa pesan galat di *console* pada ketiga peramban. | Sama dengan KNF08-TC01, login sebagai verifikator, membuka laporan berstatus MENUNGGU. Fitur yang dicoba: mengisi kolom catatan revisi. Tombol Tolak dan Setujui tidak ditekan. | Chrome: tidak ada galat. Firefox: *[belum diisi]*. Safari: *[belum diisi]*. | *[menunggu Firefox dan Safari]* |
| *KNFXX-TC01* | *KNFXX* | *[Parameter]* | *[...]* | *[...]* | *[...]* | *Pass/Fail* |

<br>

## 4.6 Tangkapan Layar dan Bukti Hasil Pengujian

Bukti pengujian dilampirkan sesuai ID Pengujian pada Subbab 4.2 sampai 4.5, berupa tangkapan layar aplikasi, keluaran *test runner*, laporan *coverage* untuk setiap kelas Mendalam, atau hasil alat ukur. Gambar disimpan di `docs/M10/assets/` dengan nama sesuai ID pengujian.

Tabel 4.6. Bukti Hasil Pengujian

| ID Pengujian | Bukti Hasil Pengujian |
| :--- | :--- |
| C02-UT01 – C02-UT06 | <img src="./assets/C02-UT.png" alt="Keluaran unit test C02" width="600"> |
| C03-UT01 – C03-UT07 | <img src="./assets/C03-UT.png" alt="Keluaran unit test C03" width="600"> |
| C04-UT01 – C04-UT03 | <img src="./assets/C04-UT.png" alt="Keluaran unit test C04" width="600"> |
| C10-UT01 – C10-UT11 | <img src="./assets/C10-UT.png" alt="Keluaran unit test C10" width="600"> |
| C11-UT01 – C11-UT08 | <img src="./assets/C11-UT.png" alt="Keluaran unit test C11" width="600"> |
| C12-UT01 – C12-UT04 | <img src="./assets/C12-UT.png" alt="Keluaran unit test C12" width="600"> |
| C13-UT01 – C13-UT41 | <img src="./assets/C13-UT.png" alt="Keluaran unit test C13" width="600"> |
| C18-UT01 – C18-UT12 | <img src="./assets/C18-UT.png" alt="Keluaran unit test C18" width="600"> |
| C20-UT01 – C20-UT47 | <img src="./assets/C20-UT-1.png" alt="Keluaran unit test C20 bagian 1" width="600"><br><img src="./assets/C20-UT-2.png" alt="Keluaran unit test C20 bagian 2" width="600"> |
| C21-UT01 – C21-UT13 | <img src="./assets/C21-UT.png" alt="Keluaran unit test C21" width="600"> |
| C22-UT01 – C22-UT15 | <img src="./assets/C22-UT.png" alt="Keluaran unit test C22" width="600"> |
| C02, C18 (coverage) | Pendaftaran 100% baris / 100% cabang; SeleksiController 83,5% baris / 76,92% cabang (`pnpm test:coverage`, @vitest/coverage-v8) |
| C10, C13, C21, C22 (coverage) | <img src="./assets/coverage-modul1.png" alt="Laporan coverage kelas Modul 1" width="600"><br>Notifikasi 100% baris / 100% cabang, AuthController 100% / 97,67%, CloudStorageAdapter 100% / 92%, BetterAuth 100% / 100% |
| C11, C20 (coverage) | <img src="./assets/coverage-modul5.png" alt="Laporan coverage kelas Modul 5" width="600"><br>RiwayatKontribusi 100% baris / 100% cabang, PresensiController 98,29% / 95,52% |
| INT-TC01 – INT-TC09 | <img src="./assets/INT-TC01-TC09.png" alt="Keluaran integration test Modul 1" width="600"> |
| INT-TC30 – INT-TC39 | <img src="./assets/INT-TC30-TC39.png" alt="Keluaran integration test Modul 4" width="600"> |
| UC01-TC01 | <img src="./assets/UC01-TC01-a.png" alt="UC01-TC01 formulir terisi" width="400"> <img src="./assets/UC01-TC01-b.png" alt="UC01-TC01 akun berhasil dibuat" width="400"> |
| UC01-TC02 | <img src="./assets/UC01-TC02.png" alt="UC01-TC02 data diri tidak lengkap" width="400"> |
| UC01-TC03 | <img src="./assets/UC01-TC03-a.png" alt="UC01-TC03 formulir program terisi" width="400"> <img src="./assets/UC01-TC03-b.png" alt="UC01-TC03 program berhasil dibuat" width="400"> <img src="./assets/UC01-TC03-c.png" alt="UC01-TC03 program tampil di Program Saya" width="400"> |
| UC01-TC04 | <img src="./assets/UC01-TC04.png" alt="UC01-TC04 lembaga belum terverifikasi" width="400"> |
| UC02-TC01 | <img src="./assets/UC02-TC01-a.png" alt="UC02-TC01 detail program sebelum login" width="400"> <img src="./assets/UC02-TC01-b.png" alt="UC02-TC01 tidak diarahkan ke login" width="400"> |
| UC02-TC02 | <img src="./assets/UC02-TC02-a.png" alt="UC02-TC02 login dengan urlKembali" width="400"> <img src="./assets/UC02-TC02-b.png" alt="UC02-TC02 kembali ke halaman program" width="400"> |
| UC02-TC03 | <img src="./assets/UC02-TC03.png" alt="UC02-TC03 kredensial salah" width="400"> |
| UC02-TC04 | <img src="./assets/UC02-TC04.png" alt="UC02-TC04 IP diblokir" width="400"> |
| UC06-TC01 | <img src="./assets/UC06-TC01-a.png" alt="UC06-TC01 konfirmasi hasil seleksi" width="400"> <img src="./assets/UC06-TC01-b.png" alt="UC06-TC01 notifikasi terkirim" width="400"><br><img src="./assets/UC06-TC01-c.png" alt="UC06-TC01 angka di ikon lonceng" width="400"> <img src="./assets/UC06-TC01-d.png" alt="UC06-TC01 daftar notifikasi" width="400"><br><img src="./assets/UC06-TC01-e.png" alt="UC06-TC01 detail notifikasi" width="400"> |
| UC07-TC01 | <img src="./assets/UC07-TC01-a1.png" alt="UC07-TC01 persetujuan program" width="400"> <img src="./assets/UC07-TC01-a2.png" alt="UC07-TC01 program disetujui" width="400"><br><img src="./assets/UC07-TC01-b.png" alt="UC07-TC01 unggah laporan akhir" width="400"> <img src="./assets/UC07-TC01-c.png" alt="UC07-TC01 status laporan dikirim" width="400"><br><img src="./assets/UC07-TC01-d.png" alt="UC07-TC01 daftar laporan di verifikator" width="400"> <img src="./assets/UC07-TC01-e.png" alt="UC07-TC01 hasil peninjauan laporan" width="400"> |
| KNF01-TC01 | <img src="./assets/KNF01-TC01.png" alt="KNF01-TC01 uji beban 50 pencarian bersamaan, 5 putaran" width="600"> |
| KNF02-TC01 | <img src="./assets/KNF02-TC01.png" alt="KNF02-TC01 inspeksi hash di basis data" width="600"> |
| KNF03-TC01 | <img src="./assets/KNF03-TC01.png" alt="KNF03-TC01 waktu simpan berkas 2 MB" width="600"> |
| KNF04-TC01 | <img src="./assets/KNF04-TC01.png" alt="KNF04-TC01 uji beban 50 check-in bersamaan, 5 putaran" width="600"> |
| KNF05-TC01 | <img src="./assets/KNF05-TC01-1024.png" alt="KNF05-TC01 Registrasi 1024 px" width="420"> <img src="./assets/KNF05-TC01-360.png" alt="KNF05-TC01 Registrasi 360 px" width="160"> |
| KNF05-TC02 | <img src="./assets/KNF05-TC02-1024.png" alt="KNF05-TC02 Eksplorasi 1024 px" width="420"> <img src="./assets/KNF05-TC02-360.png" alt="KNF05-TC02 Eksplorasi 360 px" width="160"> |
| KNF05-TC03 | <img src="./assets/KNF05-TC03-1024.png" alt="KNF05-TC03 Kegiatan Saya 1024 px" width="420"> <img src="./assets/KNF05-TC03-360.png" alt="KNF05-TC03 Kegiatan Saya 360 px" width="160"> |
| KNF05-TC04 | <img src="./assets/KNF05-TC04-1024.png" alt="KNF05-TC04 Kelola Pendaftar 1024 px" width="420"> <img src="./assets/KNF05-TC04-360.png" alt="KNF05-TC04 Kelola Pendaftar 360 px" width="160"> <img src="./assets/KNF05-TC04-360-geser.png" alt="KNF05-TC04 Kelola Pendaftar 360 px setelah tabel digeser" width="160"> |
| KNF05-TC05 | <img src="./assets/KNF05-TC05-1024.png" alt="KNF05-TC05 Tinjau Laporan 1024 px" width="420"> <img src="./assets/KNF05-TC05-360.png" alt="KNF05-TC05 Tinjau Laporan 360 px" width="160"> |
| KNF06-TC01, KNF06-TC02 | <img src="./assets/KNF06-TC01-TC02.png" alt="KNF06 blokir IP dan pemulihan setelah 5 menit" width="600"> |
| KNF07-TC01 | <img src="./assets/KNF07-TC01.png" alt="KNF07-TC01 Lighthouse Registrasi skor 100" width="600"> |
| KNF07-TC02 | <img src="./assets/KNF07-TC02.png" alt="KNF07-TC02 Lighthouse Eksplorasi skor 98" width="600"> |
| KNF07-TC03 | <img src="./assets/KNF07-TC03.png" alt="KNF07-TC03 Lighthouse Kegiatan Saya skor 100" width="600"> |
| KNF07-TC04 | <img src="./assets/KNF07-TC04.png" alt="KNF07-TC04 Lighthouse Kelola Pendaftar skor 100" width="600"> |
| KNF07-TC05 | <img src="./assets/KNF07-TC05.png" alt="KNF07-TC05 Lighthouse Tinjau Laporan skor 96" width="600"> |
| KNF08-TC01 | <img src="./assets/KNF08-TC01-chrome.png" alt="KNF08-TC01 console Chrome Registrasi" width="300"> *[Firefox]* *[Safari]* |
| KNF08-TC02 | <img src="./assets/KNF08-TC02-chrome.png" alt="KNF08-TC02 console Chrome Eksplorasi" width="300"> *[Firefox]* *[Safari]* |
| KNF08-TC03 | <img src="./assets/KNF08-TC03-chrome.png" alt="KNF08-TC03 console Chrome Kegiatan Saya" width="300"> *[Firefox]* *[Safari]* |
| KNF08-TC04 | <img src="./assets/KNF08-TC04-chrome.png" alt="KNF08-TC04 console Chrome Kelola Pendaftar" width="300"> *[Firefox]* *[Safari]* |
| KNF08-TC05 | <img src="./assets/KNF08-TC05-chrome.png" alt="KNF08-TC05 console Chrome Tinjau Laporan" width="300"> *[Firefox]* *[Safari]* |
| *[ID pengujian lain]* | *[Sisipkan bukti]* |

<br>

---

# BAB 5: Traceability

Petakan setiap KF ke KNF, use case, kelas perancangan, file implementasi, dan test case. Tabel traceability berikut akan menjadi sarana verifikasi KF. Setiap KF memiliki minimal satu test case dan dinyatakan terpenuhi apabila **seluruh** test case terkaitnya berkesimpulan `Pass`. KF yang tidak diimplementasikan tetap dicantumkan beserta alasannya.

Tabel 5.1. Matriks Kerunutan KF terhadap Implementasi dan Pengujian

| KF ID | KNF Terkait | Use Case ID | Kelas Terkait | Implementasi File Terkait | Test Case (UC) | Test Case (Unit/Integrasi/KNF) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| KF01 | KNF03 | UC01 | C12 - KelolaAkunPage<br>C13 - AuthController<br>C21 - CloudStorageAdapter<br>*[kelas I-08]* | `src/views/KelolaAkunPage/Registrasi.tsx`<br>`src/views/components/FileDropzone.tsx`<br>`src/server/controllers/AuthController.ts`<br>`src/server/adapters/CloudStorageAdapter.ts`<br>*[file I-08]* | UC01-TC01<br>*[UC01-TC03 dst.]* | C13-UT09, C13-UT10, C13-UT14, C13-UT15, C21-UT01 s.d. C21-UT13, INT-TC01, INT-TC02<br>*[test case I-08, KNF03-TC..]* |
| KF02 | *[KNFXX atau -]* | *[UCXX]* | *[CXX - Nama kelas]* | *[path/ke/file]* | *[UCXX-TCYY]* | *[CXX-UTYY, INT-TCYY, KNFXX-TCYY atau -]* |
| KF03 | *[KNFXX atau -]* | *[UCXX]* | *[CXX - Nama kelas]* | *[path/ke/file]* | *[UCXX-TCYY]* | *[CXX-UTYY, INT-TCYY, KNFXX-TCYY atau -]* |
| KF04 | *[KNFXX atau -]* | *[UCXX]* | *[CXX - Nama kelas]* | *[path/ke/file]* | *[UCXX-TCYY]* | *[CXX-UTYY, INT-TCYY, KNFXX-TCYY atau -]* |
| KF05 | *[KNFXX atau -]* | *[UCXX]* | *[CXX - Nama kelas]* | *[path/ke/file]* | *[UCXX-TCYY]* | *[CXX-UTYY, INT-TCYY, KNFXX-TCYY atau -]* |
| KF06 | KNF02, KNF06 | UC02 | C12 - KelolaAkunPage<br>C13 - AuthController<br>C22 - BetterAuth | `src/views/KelolaAkunPage/Login.tsx`<br>`src/views/KelolaAkunPage/useKelolaAkunPage.ts`<br>`src/lib/urlKembali.ts`<br>`src/server/controllers/AuthController.ts`<br>`src/server/api/routers/auth.ts`<br>`src/server/api/trpc.ts` (`protectedProcedure`)<br>`src/server/adapters/BetterAuth.ts`<br>`src/server/auth.ts`<br>`src/views/KelolaProgramPage/useProgramDaftar.ts` | UC02-TC01, UC02-TC02, UC02-TC03, UC02-TC04 | C12-UT01 s.d. C12-UT04, C13-UT24 s.d. C13-UT29, C13-UT36 s.d. C13-UT38, C13-UT40, C22-UT01 s.d. C22-UT15, INT-TC04, INT-TC05, INT-TC06, KNF02-TC01, KNF06-TC01, KNF06-TC02 |
| KF07 | *[KNFXX atau -]* | *[UCXX]* | *[CXX - Nama kelas]* | *[path/ke/file]* | *[UCXX-TCYY]* | *[CXX-UTYY, INT-TCYY, KNFXX-TCYY atau -]* |
| KF08 | - | UC06 | C04 - Pengguna<br>C10 - Notifikasi<br>C12 - KelolaAkunPage<br>C13 - AuthController<br>*[C18 - SeleksiController]* | `src/server/models/Pengguna.ts`<br>`src/server/models/Notifikasi.ts`<br>`src/server/controllers/AuthController.ts`<br>`src/server/api/routers/auth.ts`<br>`src/views/KelolaAkunPage/Notifikasi.tsx`<br>`src/views/components/Navbar.tsx`<br>*[file C18]* | UC06-TC01 | C04-UT01 s.d. C04-UT03, C10-UT01 s.d. C10-UT11, C13-UT30 s.d. C13-UT35, C13-UT41, INT-TC07, INT-TC08<br>*[test case C18]* |
| KF09 | *[KNFXX atau -]* | *[UCXX]* | *[CXX - Nama kelas]* | *[path/ke/file]* | *[UCXX-TCYY]* | *[CXX-UTYY, INT-TCYY, KNFXX-TCYY atau -]* |
| KF10 | - | UC01 | C13 - AuthController<br>*[C03 - Relawan, C18 - SeleksiController]* | `src/server/controllers/AuthController.ts`<br>`src/server/auth.ts` (`afterEmailVerification`)<br>*[file C03, C18]* | UC01-TC01, UC01-TC02 | C13-UT01 s.d. C13-UT08, C13-UT13, C13-UT20 s.d. C13-UT23, C13-UT39, INT-TC01, INT-TC03, INT-TC09<br>*[test case C03, C18]* |
| KF11 | *[KNFXX atau -]* | *[UCXX]* | *[CXX - Nama kelas]* | *[path/ke/file]* | *[UCXX-TCYY]* | *[CXX-UTYY, INT-TCYY, KNFXX-TCYY atau -]* |
| KF12 | *[KNFXX atau -]* | *[UCXX]* | *[CXX - Nama kelas]* | *[path/ke/file]* | *[UCXX-TCYY]* | *[CXX-UTYY, INT-TCYY, KNFXX-TCYY atau -]* |
| KF13 | *[KNFXX atau -]* | *[UCXX]* | *[CXX - Nama kelas]* | *[path/ke/file]* | *[UCXX-TCYY]* | *[CXX-UTYY, INT-TCYY, KNFXX-TCYY atau -]* |
| KF14 | *[KNFXX atau -]* | *[UCXX]* | *[CXX - Nama kelas]* | *[path/ke/file]* | *[UCXX-TCYY]* | *[CXX-UTYY, INT-TCYY, KNFXX-TCYY atau -]* |
| KF15 | *[KNFXX atau -]* | *[UCXX]* | *[CXX - Nama kelas]* | *[path/ke/file]* | *[UCXX-TCYY]* | *[CXX-UTYY, INT-TCYY, KNFXX-TCYY atau -]* |
| KF16 | *[KNFXX atau -]* | *[UCXX]* | *[CXX - Nama kelas]* | *[path/ke/file]* | *[UCXX-TCYY]* | *[CXX-UTYY, INT-TCYY, KNFXX-TCYY atau -]* |

Status KF Modul 1 pada tag `v9.0`: KF08 terpenuhi (seluruh test case `Pass`). KF06 **belum terpenuhi** karena UC02-TC01 `Fail` (pengunjung tidak diarahkan ke login saat mengirim pendaftaran program). Penyebab dan usulan perbaikannya ada pada Tabel 4.4.2. KF01 dan KF10 menunggu test case modul lain pada baris yang sama.

Tabel 5.2. Matriks Kerunutan KNF terhadap Pengujian

| ID KNF | Parameter | KF/UC Terkait | Test Case |
| :--- | :--- | :--- | :--- |
| *KNF01* | *Reliability* | *KF05 / UC03* | *KNF01-TC01* |
| *KNFXX* | *[Parameter]* | *[KFXX / UCXX atau -]* | *[KNFXX-TCYY]* |
| *...* | *...* | *...* | *...* |
