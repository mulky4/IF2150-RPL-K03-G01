<h1>
IF2150 REKAYASA PERANGKAT LUNAK
<br>
TUGAS 9
<br>
IMPLEMENTASI PERANGKAT LUNAK
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

> **Petunjuk pengerjaan:** *[Silahkan hapus bagian ini setelah selesai mengerjakan]*
>
> Dokumen ini adalah **spesifikasi sekaligus template laporan singkat** Tugas 9. Bagian **Ketentuan Implementasi** (Bagian A) adalah aturan yang harus kalian ikuti, boleh dihapus dari laporan akhir. Bagian **Laporan Implementasi** (Bagian B) adalah yang **wajib kalian isi**. Gunakan nama, ID, kebutuhan, use case, dan kelas yang konsisten dengan SKPL, APL, dan DPPL.

---

**Deadline:** Rabu, 11 November 2026, 21.50 WIB
**Asistensi akbar:** *[Hari, DD Bulan YYYY, HH.MM WIB, lokasi/link]*

---

# BAGIAN A: Ketentuan Implementasi

## A.1 Deskripsi Tugas

Pada tugas ini, kalian mengimplementasikan perangkat lunak yang telah dirancang pada tugas-tugas sebelumnya (SKPL, APL, DPPL) menjadi aplikasi yang **dapat dijalankan**. Platform bebas (web, desktop, atau mobile) selama aplikasi dapat dijalankan ulang oleh asisten mengikuti petunjuk kalian.

Ketentuan umum:
- Setiap anggota bertanggung jawab atas **minimal satu fitur atau modul** dan harus terlihat jelas di riwayat commit/PR.
- Implementasi harus **mengacu pada DPPL**. Jika ada yang berubah (kelas, layar, basis data, dsb.), catat di Bagian B.1. Perubahan itu wajar, tetapi harus tercatat dan beralasan.
- Implementasi **tidak harus berupa kelas** (misalnya fungsi, komponen, *route/handler*, *stored procedure*, atau skrip). Namun, setiap kelas perancangan pada DPPL **wajib dapat ditelusuri** ke implementasinya, dan penelusuran ini dicatat di Bagian B.5.
- Seluruh use case pada SKPL **diprioritaskan** untuk diimplementasikan. Status tiap use case akan dilaporkan pada HIUPL (Tugas 10).
- Seluruh mahasiswa **wajib** mengikuti asistensi akbar.

## A.2 Platform, Bahasa, dan Teknologi

Kalian **bebas** memilih bahasa, framework, library, dan basis data, dengan syarat:

1. **Dapat dijalankan ulang** oleh asisten pada mesin biasa dengan mengikuti README. Versi bahasa/runtime dan seluruh dependensi harus tertulis jelas.
2. **Dependensi dikelola lewat file standar**, misalnya `package.json` + lockfile, `requirements.txt`/`pyproject.toml`, `pom.xml`/`build.gradle`, `composer.json`, `pubspec.yaml`, dan sejenisnya. Jangan meng-commit folder hasil instalasi (`node_modules/`, `venv/`, `build/`, dll.).
3. **Jika memakai layanan eksternal** (basis data cloud, API pihak ketiga, auth, dll.), sediakan cara menjalankan tanpa akun pribadi kalian, atau sediakan data/akun uji pada README. Basis data **sangat disarankan** dapat dijalankan lokal (SQLite, atau Docker Compose untuk PostgreSQL/MySQL/MongoDB).
4. **Arsitektur sesuai DPPL.** Pola arsitektur yang kalian pilih di APL/DPPL (MVC, layered, client-server, dll.) harus terlihat pada struktur kode.

Ketentuan tambahan per platform:

| Platform | Ketentuan |
| :--- | :--- |
| **Web** | Berjalan lokal lewat satu-dua perintah yang terdokumentasi. Boleh juga di-*deploy*; jika ya, cantumkan URL, tetapi **tetap wajib bisa dijalankan lokal** (URL deploy bisa mati). |
| **Desktop** | Berjalan dari source lewat perintah yang terdokumentasi. Build/installer opsional. |
| **Mobile** | Berjalan di emulator/simulator atau perangkat. Sertakan langkah menjalankan, dan **sangat disarankan** melampirkan APK/build di Release. |

## A.3 Keamanan Repository

Repo fork kelompok bersifat **public**, sehingga:

- **Dilarang** meng-commit password, API key, token, `.env` asli, sertifikat/private key, atau data pribadi. Hal ini dapat mengurangi nilai.
- Sediakan `.env.example` berisi nama variabel tanpa nilai rahasia, dan masukkan `.env` ke `.gitignore`.
- Jika sudah terlanjur ter-commit, **cabut/ganti** kredensial tersebut. Menghapus commit saja tidak cukup.
- Data uji/seed harus berupa data fiktif.

## A.4 Struktur Folder

Seluruh kode ditempatkan di `src/` pada repo fork. Jangan mengubah folder milestone lama.

```
src/                              # SELURUH kode implementasi
	README.md                     # dokumentasi utama aplikasi (lihat A.5)
	.env.example                  # jika memakai environment variable
	<struktur kode kalian>        # bebas, mengikuti pola arsitektur DPPL
	tests/                        # test case (jika ada)
docs/
	M9/
		KXX_GYY_Implementasi.md   # laporan ini (Bagian B)
		KXX_GYY_Form-Asistensi.md
```

Catatan:
- `README.md` aplikasi diletakkan di **`src/README.md`**, bukan di root repo.
- Jika kerangka kerja kalian mewajibkan struktur tertentu (misalnya Maven `src/main/java`, Flutter `lib/`, monorepo `frontend/` dan `backend/`), letakkan semuanya **di dalam `src/`**.
- Nama file dan folder pada `docs/M9/` mengikuti aturan penamaan milestone sebelumnya (`KXX_GYY_...`).

## A.5 Isi Minimal `src/README.md`

README harus cukup bagi orang yang belum pernah melihat proyek kalian untuk menjalankan aplikasi dari nol. Minimal berisi:

1. **Deskripsi singkat** aplikasi.
2. **Teknologi yang digunakan** beserta versi (bahasa, framework, basis data).
3. **Prasyarat dan instalasi** (software yang harus ada, perintah instalasi dependensi).
4. **Konfigurasi** (environment variable, setup basis data, migrasi/seed) dan langkah demi langkah menjalankannya.
5. **Cara menjalankan aplikasi** (dan cara menjalankan test, jika ada).
6. **Akun/data uji** untuk mencoba tiap peran pengguna (jika ada login).
7. **Daftar modul/fitur yang diimplementasi** beserta pembagian anggota.
8. **Daftar tabel/koleksi basis data** beserta atributnya (atau tautan ke skema/ERD).

## A.6 Best Practices

Kalian dianjurkan menerapkan praktik berikut. Bukti penerapannya dirangkum pada Bagian B.2.

### 1. Branching
Sesuai aturan umum di README repository, `main` fork kelompok dijaga agar tetap bisa menerima sync dari asisten. Pada tugas ini **sangat disarankan** memakai branch per fitur dengan format `<tipe>/<nama-fitur>` (contoh: `feat/login-page`, `fix/null-cart`), lalu digabungkan ke `main` melalui Pull Request. Skema Gitflow penuh (dengan `develop`) boleh dipakai, tetapi tidak diwajibkan.

### 2. Semantic Commit
Gunakan format `<tipe>(<scope>): <deskripsi>`, misalnya `feat(auth): tambah validasi email`.

| Tipe | Kegunaan |
| :--- | :--- |
| `feat` | Menambahkan fitur baru |
| `fix` | Memperbaiki bug |
| `docs` | Mengubah dokumentasi |
| `style` | Perubahan format/spasi, tanpa mengubah logika |
| `refactor` | Perubahan kode yang tidak menambah fitur atau memperbaiki bug |
| `test` | Menambah/memperbaiki pengujian |
| `chore` | Tugas rutin (build, dependensi, konfigurasi) |

### 3. Track Tasks
Gunakan **GitHub Issues** (dan opsional GitHub Projects) untuk membagi tugas dan melacak progres.
- Pecah fitur besar menjadi issue yang lebih kecil dan tetapkan penanggung jawabnya.
- Hubungkan PR dengan issue (`Closes #12`) dan tutup issue ketika selesai.

### 4. Pull Request dan Code Review
- Setiap PR berisi penjelasan deskriptif tentang apa yang dikerjakan, beserta bukti (tangkapan layar/rekaman/hasil test).
- Setiap PR di-*review* minimal **1 anggota lain**, dengan komentar konstruktif atau approval.

### 5. Pengujian dan Optimasi Performa
- Tulis pengujian untuk logika inti (unit test dan/atau pengujian alur utama). Cakupan penuh tidak diwajibkan, tetapi pengujian pada logika utama dinilai.
- Lakukan **profiling** pada setidaknya satu fitur yang berat (query besar, proses pengolahan data, render list panjang, dsb.), lalu catat temuan dan perbaikannya. Contoh alat:

| Platform | Contoh alat |
| :--- | :--- |
| Web (frontend) | Chrome DevTools (Performance/Network), Lighthouse |
| Web (backend) | Profiler bawaan bahasa, `EXPLAIN` pada query basis data, logging waktu respons |
| Python | `cProfile`, `PyInstrument` |
| Java | VisualVM, JProfiler |
| Mobile | Android Studio Profiler, Flutter DevTools, Xcode Instruments |

### 6. Penggunaan AI
Penggunaan AI **tetap harus dicatat** pada `docs/KXX_GYY_AI-Usage.md` sesuai ketentuan yang sudah berlaku.

## A.7 Pengumpulan

Pengumpulan dinilai dari **tag release**, bukan commit terakhir.

1. Pastikan seluruh pekerjaan sudah di-*commit* dan di-*push* ke `main` fork kelompok.
2. Buat release dengan tag **`v9.0`** (revisi berikutnya `v9.1`, `v9.2`, dst.) dengan target branch `main`.
3. Yang dinilai adalah **tag terakhir yang dibuat sebelum deadline**.

## A.8 Aturan Tanya Jawab

Agar semua kelompok mendapat jawaban yang sama, pertanyaan dibagi menjadi dua jalur:

| Jenis Pertanyaan | Jalur |
| :--- | :--- |
| **Ketentuan tugas**, misalnya teknologi yang diperbolehkan, struktur folder, format pengumpulan, dan penilaian | **Sheets QnA:** *[tautan sheets QnA]* |
| **Kendala teknis kelompok sendiri**, misalnya error, setup, dan penggunaan git | Grup kelompok bersama asisten masing-masing |

Ketentuan:
1. Pertanyaan tentang ketentuan tugas **wajib** diajukan melalui Sheets QnA. Periksa terlebih dahulu apakah pertanyaan serupa sudah dijawab.
2. Jika pertanyaan tentang ketentuan tugas tetap diajukan langsung kepada asisten kelompok, asisten **berhak menolak menjawab** dan meminta kelompok memasukkan pertanyaannya ke Sheets QnA.
3. Jika pertanyaan di Sheets QnA **belum dijawab dalam 24 jam**, kelompok boleh menghubungi asisten kelompok masing-masing. Cantumkan pertanyaan yang sudah diajukan di sheets tersebut.
4. Jawaban pada Sheets QnA berlaku untuk **seluruh kelompok** dan menjadi acuan jika terjadi perbedaan pemahaman.

---

# BAGIAN B: Laporan Implementasi

## B.1 Perubahan dari DPPL

Catat semua perbedaan antara perancangan (DPPL) dan implementasi akhir. Jika tidak ada perubahan, tuliskan "Tidak ada perubahan".

Tabel B.1. Perubahan dari DPPL

| No | Bagian DPPL | Rancangan Awal | Implementasi Akhir | Alasan |
| :--- | :--- | :--- | :--- | :--- |
| 1 | C18 SeleksiController dan I-11 Kelola Pendaftar | Keputusan pendaftaran disimpan dan dikonfirmasi; validasi kuota direncanakan melalui `Program.cekKuotaTersedia()`. | Seleksi menggunakan prosedur tRPC khusus Inisiator, menyimpan keputusan dalam transaksi serializable, lalu mengirim notifikasi ketika hasil dikonfirmasi. Halaman I-11 tersedia di `/inisiator/program/[id]/pendaftar`. | Kuota dihitung dari data database aktual di dalam transaksi untuk mencegah keputusan bersamaan melampaui kuota; identitas pemilik diverifikasi dari sesi. |
| 2 | C02 Pendaftaran dan C18 SeleksiController | Pendaftaran menyimpan keputusan seleksi; controller mengirim notifikasi hasil. | Ditambahkan `notifikasiTerkirimAt` pada Pendaftaran serta batas unik `(programId, relawanId)`. Konfirmasi mengirim notifikasi hanya untuk pendaftaran yang belum pernah diberi hasil. | Penanda per pendaftaran mencegah duplikasi sekaligus memungkinkan program aktif menerima pendaftar baru setelah pengumuman sebelumnya. |
| 3 | C15 ProgramController dan C16 EksplorasiProgramPage | Pencarian program lewat `Program.cari()` atas daftar program di memori. | Pencarian dijalankan di database lewat satu query di `ProgramController.cariProgram` (24 program per muat, maksimum 120, dengan penanda "masih ada lagi"); detail program mengirim `tahapWaktu` dan `bisaDaftar` dari server. | Tidak perlu memuat semua program ke memori, dan status tombol daftar ditentukan di satu tempat. |
| 4 | C10 Notifikasi | Notifikasi dibuat dan disimpan lewat operasi kirim pada kelas Notifikasi. | Ditambah `keDataUntukPenyimpanan()` yang mengubah objek Notifikasi menjadi baris tabel, supaya `SeleksiController` bisa menyimpannya di dalam transaksi yang sama dengan keputusan seleksi. | Notifikasi hasil dan penanda `notifikasiTerkirimAt` harus tersimpan bersama; kalau salah satu gagal, keduanya dibatalkan. |

## B.2 Bukti Penerapan Best Practices

Tabel B.2. Bukti Best Practices

| Praktik | Bukti | Keterangan |
| :--- | :--- | :--- |
| Branching | *[Tautan ke daftar branch / graph commit]* | *[Skema yang dipakai]* |
| Semantic commit | *[Tautan ke riwayat commit]* | *[Ringkasan]* |
| Track tasks | *[Tautan ke Issues/Projects]* | *[Jumlah issue, pembagian]* |
| Pull request dan review | *[Tautan ke 2-3 PR representatif]* | *[Siapa me-review siapa]* |
| Pengujian | [`src/tests/unit/`](../../src/tests/unit) dan [`src/tests/beban/`](../../src/tests/beban) | Unit test (Vitest) untuk controller dan model tiap modul, termasuk 12 test seleksi (otorisasi pemilik program, validasi kuota, penyimpanan keputusan, konfirmasi, notifikasi hasil); uji beban check-in 50 request bersamaan. Jalankan `pnpm test` dari folder `src`. |

### B.2.1 Profiling dan Optimasi

Pilih minimal satu fitur yang diprofil.

| Informasi | Keterangan |
| :--- | :--- |
| Fitur / proses yang diprofil | *[Nama fitur]* |
| Alat | *[mis. Chrome DevTools, cProfile, EXPLAIN]* |
| Temuan (sebelum) | *[Bottleneck yang ditemukan, sertakan angka/tangkapan layar]* |
| Perbaikan | *[Yang diubah]* |
| Hasil (sesudah) | *[Perbandingan dengan sebelumnya]* |

Jika tidak ada perbaikan yang perlu dilakukan, jelaskan hasil profiling dan alasan kenapa fitur tersebut sudah memadai.

## B.3 Kendala dan Catatan Penting

- Sebelum menjalankan migrasi constraint unik `(programId, relawanId)`, periksa kemungkinan pendaftaran ganda dengan query `SELECT "programId", "relawanId", COUNT(*) FROM "tbl_pendaftaran" GROUP BY "programId", "relawanId" HAVING COUNT(*) > 1;`. Jika ada hasil, tinjau dan bersihkan duplikat sebelum migrasi; migrasi tidak menghapus data otomatis.

## B.4 Kontribusi Anggota

Tabel B.4. Kontribusi Anggota

| NIM | Nama | Modul / Fitur yang Dikerjakan | Persentase Kontribusi |
| :--- | :--- | :--- | :--- |
| *[NIM 1]* | *[Nama]* | *[Modul/fitur]* | *[%]* |
| *...* | *...* | *...* | *...* |

## B.5 Traceability Kelas Perancangan ke Implementasi

Pemetaan dari **setiap kelas perancangan** pada DPPL (Tabel 4.1) ke wujud implementasinya. Bentuk implementasi bebas (kelas, fungsi, komponen, *route/handler*, *stored procedure*, skrip, dsb.), tetapi tiap kelas perancangan harus muncul pada tabel ini. Jika implementasi berupa kelas dengan nama yang sama, tetap dicantumkan.

Tabel B.5. Traceability Kelas Perancangan ke Implementasi

| ID Kelas | Nama Kelas Perancangan | Bentuk Implementasi | Lokasi (File dan Nama) | Keterangan |
| :--- | :--- | :--- | :--- | :--- |
| C01 | Program | Kelas + tabel Prisma | `src/server/models/Program.ts` - `Program`; `src/prisma/schema.prisma` - `Program` | Aturan domain dan atribut program; daftar relasi disimpan lewat Prisma. |
| C02 | Pendaftaran | Kelas + tabel Prisma | `src/server/models/Pendaftaran.ts` - `Pendaftaran`; `src/prisma/schema.prisma` - `Pendaftaran` | Transisi terima/tolak dan status keputusan; unik per pasangan program-relawan. |
| C03 | Relawan | Kelas + tabel Prisma | `src/server/models/Relawan.ts` - `Relawan`; `src/prisma/schema.prisma` - `Relawan` | Profil, verifikasi, kehadiran, dan akses portofolio. |
| C04 | Pengguna | Kelas abstrak + tabel Better Auth | `src/server/models/Pengguna.ts` - `Pengguna`; `src/prisma/schema.prisma` - `User` | Identitas dan notifikasi; akun dipersistenkan pada tabel `user`. |
| C05 | InisiatorProgram | Kelas + tabel Prisma | `src/server/models/InisiatorProgram.ts` - `InisiatorProgram`; `src/prisma/schema.prisma` - `InisiatorProgram` | Status verifikasi, tautan, dan data lembaga. |
| C06 | Verifikator | Kelas | `src/server/models/Verifikator.ts` - `Verifikator` | Operasi domain menyetujui atau menolak laporan. |
| C07 | DokumenVerifikasi | Kelas + tabel Prisma | `src/server/models/DokumenVerifikasi.ts` - `DokumenVerifikasi`; `src/prisma/schema.prisma` - `DokumenVerifikasi` | Metadata dokumen dan status verifikasi. |
| C08 | Kehadiran | Kelas + tabel Prisma | `src/server/models/Kehadiran.ts` - `Kehadiran`; `src/prisma/schema.prisma` - `Kehadiran` | Catatan waktu check-in unik per relawan-program. |
| C09 | LaporanProgram | Kelas + tabel Prisma | `src/server/models/LaporanProgram.ts` - `LaporanProgram`; `src/prisma/schema.prisma` - `LaporanProgram` | Dokumentasi, ringkasan, revisi, dan status peninjauan. |
| C10 | Notifikasi | Kelas + tabel Prisma | `src/server/models/Notifikasi.ts` - `Notifikasi`; `src/prisma/schema.prisma` - `Notifikasi` | Kirim, baca, dan detail; controller seleksi membuat notifikasi di transaksi. |
| C11 | RiwayatKontribusi | Kelas + tabel Prisma | `src/server/models/RiwayatKontribusi.ts` - `RiwayatKontribusi`; `src/prisma/schema.prisma` - `RiwayatKontribusi`, `RiwayatProgram` | Total jam dan relasi ke program selesai. |
| C12 | KelolaAkunPage | View, hook, dan route | `src/views/KelolaAkunPage/`; `src/app/login/`, `src/app/registrasi/`, `src/app/notifikasi/` | Form dan operasi akun/notifikasi diwujudkan sebagai state, handler, dan komponen. |
| C13 | AuthController | Controller + router tRPC | `src/server/controllers/AuthController.ts`; `src/server/api/routers/auth.ts` | Sesi, kredensial, proteksi login, dan notifikasi pengguna. |
| C14 | KelolaProgramPage | View, hook, dan route | `src/views/KelolaProgramPage/`; `src/app/inisiator/program/` | Pembuatan program, daftar program, dan pengajuan laporan. |
| C15 | ProgramController | Controller + router tRPC | `src/server/controllers/ProgramController.ts`; `src/server/api/routers/program.ts` | Operasi program baru, pencarian dan detail program, pendaftaran relawan, persetujuan program, serta pengajuan dan peninjauan laporan akhir. |
| C16 | EksplorasiProgramPage | View, hook, dan route | `src/views/EksplorasiProgramPage/Eksplorasi.tsx`, `DetailProgram.tsx`, `useEksplorasiProgramPage.ts`; `src/app/program/page.tsx`, `src/app/program/[id]/page.tsx` | Pencarian dengan jeda ketik, filter kategori, dan muat bertahap menjadi *state* hook; detail program menampilkan kuota, tautan situs resmi, dan capaian program selesai. |
| C17 | KelolaPendaftarPage | View, hook, dan route | `src/views/KelolaPendaftarPage/KelolaPendaftarView.tsx`; `src/views/KelolaPendaftarPage/useKelolaPendaftarPage.ts`; `src/app/inisiator/program/[id]/pendaftar/page.tsx` | Memilih keputusan, menyimpan hasil, dan meminta konfirmasi pengumuman. |
| C18 | SeleksiController | Controller + router tRPC | `src/server/controllers/SeleksiController.ts`; `src/server/api/routers/seleksi.ts` | Daftar pendaftar, validasi kuota, keputusan transaksional, dan notifikasi hasil. |
| C19 | AreaKegiatanPage | View, hook, dan route | `src/views/AreaKegiatanPage/AreaKegiatan.tsx`, `Portofolio.tsx`, `useAreaKegiatanPage.ts`; `src/app/kegiatan/`, `src/app/portofolio/` | Daftar kegiatan dan tombol check-in; portofolio menampilkan total jam aksi dan riwayat program selesai. |
| C20 | PresensiController | Controller + router tRPC | `src/server/controllers/PresensiController.ts`; `src/server/api/routers/presensi.ts` | `ambilDaftarKegiatan`, `prosesCheckIn` (validasi status relawan dan waktu pelaksanaan), serta `perbaruiPortofolioRelawan` yang menambah jam aksi saat laporan akhir disetujui. |
| C21 | CloudStorageAdapter | Adapter | `src/server/adapters/CloudStorageAdapter.ts` - `CloudStorageAdapter` | Validasi dan penyimpanan berkas lokal sebagai adapter; layanan cloud belum dipilih. |
| C22 | BetterAuth | Adapter pustaka | `src/server/adapters/BetterAuth.ts` - `BetterAuth`; `src/server/auth.ts` | Kredensial, hash kata sandi, verifikasi, dan sesi melalui Better Auth. |

Catatan:
- Satu kelas perancangan boleh diwujudkan oleh beberapa file/unit, dan satu file/unit boleh mewujudkan beberapa kelas perancangan. Tuliskan semuanya.
- Kelas perancangan yang **tidak diimplementasikan** atau **digabung/dipecah** tetap dicantumkan, dan alasannya dicatat di Bagian B.1.
