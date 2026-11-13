<h1>
IF2150 REKAYASA PERANGKAT LUNAK
<br>
TUGAS 9
<br>
IMPLEMENTASI PERANGKAT LUNAK
</h1>
<br>

## RekanBumi
<img src="assets/logo_RekanBumi.png" alt="Logo RekanBumi" width="250">

### Untuk: Stefani Angeline Oroh

Dipersiapkan oleh:
| Informasi | Keterangan |
| --- | --- |
| Kelas | K03 |
| Kelompok | G01 |

| NIM | Nama |
|---|---|
| 13525018 | Avicenna Ananda Musthafa |
| 13525045 | Ribka Kaylena Sanjaya |
| 13525063 | Kairenzo Vemil |
| 13525069 | Mulky Siraj Firizqi |
| 13525144 | Three Gie Gendhis Sekar Ayoe Jatmiko |
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
| 1 | C18 SeleksiController dan I-11 Kelola Pendaftar | Keputusan pendaftaran disimpan dan dikonfirmasi; validasi kuota direncanakan melalui Program.cekKuotaTersedia(). | Seleksi menggunakan prosedur tRPC khusus Inisiator, menyimpan keputusan dalam transaksi serializable, lalu mengirim notifikasi ketika hasil dikonfirmasi. Halaman I-11 tersedia di /inisiator/program/[id]/pendaftar. | Kuota dihitung dari data database aktual di dalam transaksi untuk mencegah keputusan bersamaan melampaui kuota; identitas pemilik diverifikasi dari sesi. |
| 2 | C02 Pendaftaran dan C18 SeleksiController | Pendaftaran menyimpan keputusan seleksi; controller mengirim notifikasi hasil. | Ditambahkan notifikasiTerkirimAt pada Pendaftaran serta batas unik (programId, relawanId). Konfirmasi mengirim notifikasi hanya untuk pendaftaran yang belum pernah diberi hasil. | Penanda per pendaftaran mencegah duplikasi sekaligus memungkinkan program aktif menerima pendaftar baru setelah pengumuman sebelumnya. |
| 3 | C15 ProgramController dan C16 EksplorasiProgramPage | Pencarian program lewat Program.cari() atas daftar program di memori. | Pencarian dijalankan di database lewat satu query di ProgramController.cariProgram (24 program per muat, maksimum 120, dengan penanda "masih ada lagi"); detail program mengirim tahapWaktu dan bisaDaftar dari server. | Tidak perlu memuat semua program ke memori, dan status tombol daftar ditentukan di satu tempat. |
| 4 | C10 Notifikasi | Notifikasi dibuat dan disimpan lewat operasi kirim pada kelas Notifikasi. | Ditambah keDataUntukPenyimpanan() yang mengubah objek Notifikasi menjadi baris tabel, supaya SeleksiController bisa menyimpannya di dalam transaksi yang sama dengan keputusan seleksi. | Notifikasi hasil dan penanda notifikasiTerkirimAt harus tersimpan bersama; kalau salah satu gagal, keduanya dibatalkan. |
| 5 | C09 LaporanProgram, relasi ke Program (tbl_laporan_program) | Satu laporan akhir per program. | Satu program dapat memiliki banyak laporan (Program.laporanAkhir). Migrasi 20261113000000_laporan_satu_ke_banyak mengganti unique index programId dengan indeks biasa dan menambah indeks (statusPeninjauan, waktuPengajuan). | Setelah laporan ditolak (status PERLU_REVISI), Inisiator mengirim laporan baru, dan laporan lama tetap tersimpan sebagai riwayat peninjauan. |
| 6 | C09 setujui() dan tolak(), C06 konfirmasiLaporan() dan tolakLaporan() | setujui(verifikator: Verifikator) dan tolak(verifikator: Verifikator, catatanRevisi); konstruktor memuat idLaporan dan waktuPengajuan. | setujui(verifikatorId: string) dan tolak(verifikatorId: string, catatanRevisi: string). Verifikator disimpan sebagai kolom verifikatorId (FK ke tabel user), Verifikator meneruskan this.idPengguna, dan ditambah getter getStatusPeninjauan(), getCatatanRevisi(), getVerifikatorId(). idLaporan dan waktuPengajuan hanya ada di baris database. | Entitas dipakai di dalam transaksi controller yang hanya membawa id, sehingga menyimpan objek Verifikator penuh tidak diperlukan dan menyulitkan pemetaan ke Prisma. |
| 7 | C09 dokumentasiAkhir, C15 ajukanLaporanAkhir() dan validasiLaporan() (I-09) | dokumentasi: List&lt;File&gt; berisi berkas yang diunggah. | dokumentasi: string[] berisi tautan HTTP/HTTPS, divalidasi validasiLaporan() (minimal satu tautan, semuanya http/https). Form I-09 tetap memvalidasi berkas di sisi klien (KNF03: maks 2 MB, JPG/PNG/WEBP/PDF), tetapi berkas belum dikirim ke server (lihat B.3). | Penyimpanan berkas bersama belum disambungkan ke alur laporan, sehingga form meminta tautan dokumentasi. |
| 8 | C15 buatNotifikasi() dan C10 Notifikasi.kirim() | buatNotifikasi() membuat objek Notifikasi, lalu kirim(). | Notifikasi laporan dibuat lewat tx.notifikasi.create atau createMany di dalam transaksi Prisma pada ProgramController, dengan Notifikasi.baru() untuk bentuk datanya. Ada dua arah: ke semua Verifikator saat laporan diajukan (SPEC §7 no. 13), dan ke Inisiator saat laporan disetujui atau ditolak. Pengajuan ulang setelah PERLU_REVISI mengirim notifikasi lagi. | Notifikasi.kirim() memakai koneksi db global sehingga tidak dapat ikut transaksi. Dengan tx, notifikasi ikut dibatalkan bila pembuatan laporan atau perubahan status gagal. |
| 9 | C15 tinjauLaporan(), konfirmasiLaporan(), tolakLaporan() (UC07) | tinjauLaporan() mengembalikan LaporanProgram; keputusan didelegasikan ke Verifikator. | tinjauLaporan() mengembalikan baris laporan beserta program, nama lembaga, dan nama verifikator. konfirmasiLaporan() dan tolakLaporan() memanggil selesaikanPeninjauan() dalam satu transaksi: updateMany dengan syarat status masih MENUNGGU (peninjauan ganda ditolak dengan CONFLICT), ubah status program (SELESAI atau PERLU_REVISI), lalu buat notifikasi. Saat disetujui, PresensiController.perbaruiPortofolioRelawan() ikut dipanggil dalam transaksi yang sama (KF15). Alur HTTP memakai idVerifikator dari sesi lewat ProgramController. | Laporan, status program, notifikasi, dan jam aksi berubah bersama atau tidak sama sekali, dan dua Verifikator tidak dapat memutuskan laporan yang sama. |
| 10 | C15 galat validasi (String[]) | Operasi validasi mengembalikan daftar pesan galat. | Galat memakai kelas GalatProgram dengan kode BAD_REQUEST, FORBIDDEN, NOT_FOUND, dan CONFLICT; router tRPC mengubahnya menjadi TRPCError. | View membutuhkan kode galat untuk menampilkan pesan dan status HTTP yang sesuai. |
| 11 | C14 KelolaProgramPage (boundary) | Satu kelas boundary dengan operasi seperti tampilkanFormLaporan(), unggahLaporanAkhir(), pilihLaporan(), kirimPersetujuanLaporan(), dan tampilkanStatusProgram(). | Dipecah menjadi satu komponen per layar (LaporanFormView, LaporanVerifikasiView, LaporanDetailView, ProgramFormView, ProgramSayaView). Operasi boundary menjadi state, handler, dan pemanggilan tRPC di komponen. tampilkanStatusProgram() menjadi fungsi murni di src/lib/programSaya.ts. | Mengikuti pola Next.js App Router (satu halaman per layar), dan fungsi murni lebih mudah diuji. |
| 12 | I-07 Program Saya (C14 tampilkanStatusProgram(), C01 hitungJumlahDiterima(), C05 cekStatusVerifikasi()) | hitungJumlahDiterima() dipanggil per program; layar memanggil operasi model satu per satu. | Satu query ProgramController.ambilProgramSaya(idPengguna) mengembalikan lembaga, statistik, dan daftar program dengan jumlah diterima dan menunggu dari relasi pendaftaran. Label status, warna badge, tombol aksi (aksiProgram()), filter, dan persen kuota ada di src/lib/programSaya.ts. Rute /inisiator/program. | Satu query menghindari pemanggilan berulang per baris, dan rute mengikuti menu di views/components/navigasi.ts. |
| 13 | Rute I-09 dan I-10 | Tidak ditentukan di DPPL. | I-09 di /laporan. I-10 di /verifikator/laporan dan /verifikator/laporan/[id] (sebelumnya /laporan/verifikasi, dipindah lewat PR #48). Beranda / tidak punya tampilan sendiri dan mengarahkan pengguna ke menu pertama perannya (pengunjung dan Relawan ke /program, Inisiator ke /inisiator/program, Verifikator ke /verifikator/laporan, PR #69). | Rute disamakan dengan menu navbar per peran. |
| 14 | Dashboard Verifikator dan persetujuan program (di luar UC01 sampai UC09) | Tidak dimodelkan; verifikasi program di luar use case. | Ditambah halaman verifikasi program untuk Verifikator, ProgramController.ambilProgramMenungguVerifikasi(), ProgramController.setujuiProgram(), dan Program.aktifkan() yang mengubah status MENUNGGU_VERIFIKASI menjadi AKTIF, disertai notifikasi ke Inisiator (PR #50). Navigasi Verifikator ditambah menu "Verifikasi Program" di samping "Laporan Masuk". | Tanpa persetujuan program, program baru tidak pernah menjadi AKTIF, padahal status itu syarat pendaftaran relawan dan pengajuan laporan. |
| 15 | C18 SeleksiController.ajukanPendaftaran() (I-06, pendaftaran relawan) | Pendaftaran relawan dilakukan oleh SeleksiController.ajukanPendaftaran(). | ProgramController.daftarRelawan(idPengguna, data) dan router program.daftarRelawan (relawanProcedure), pada rute /program/[id]/daftar. Profil relawan dicari lewat userId lalu memakai Relawan.id, relawan harus TERVERIFIKASI dan datanya lengkap (Relawan.cekKelengkapanData()), program harus AKTIF, pendaftaran ganda ditolak (CONFLICT), dan pendaftaran ditolak bila jumlah pendaftar DITERIMA sudah mencapai kuota (PR #68). | Atas arahan review PR #32, logika ditempatkan di controller yang sudah ada. |
| 16 | Tabel 2.1 DBMS dan diagram *deployment* | Neon PostgreSQL (layanan *cloud*). | PostgreSQL 16 lokal lewat Docker Compose (src/docker-compose.yml). Neon tetap bisa dipakai dengan mengganti DATABASE_URL. | Aplikasi dapat dijalankan asisten tanpa akun layanan *cloud* milik anggota. |
| 17 | Tabel 2.1 *Filing System*, C21 CloudStorageAdapter | Berkas disimpan di layanan *Cloud Storage* eksternal lewat CLOUD_STORAGE_API. | Berkas disimpan di folder lokal uploads/ (bisa diganti lewat UPLOAD_DIR); unggahBerkas() mengembalikan URL uploads/&lt;uuid&gt;.&lt;ekstensi&gt;. validasiBerkas() menjadi *async* dan memeriksa byte awal berkas (PDF/PNG/JPG), bukan hanya tipe yang diklaim. Ditambah hapusBerkas() untuk membatalkan unggahan saat registrasi gagal. | Layanan *cloud storage* belum dipilih di DPPL. Kelas lain hanya memakai adapter ini, jadi pindah ke layanan *cloud* cukup mengganti isi adapter. Pemeriksaan isi berkas menolak berkas yang hanya diganti namanya. |
| 18 | C22 BetterAuth, C13 mulaiSesi(), tabel kredensial dan sesi | Tabel tbl_kredensial dan tbl_sesi; hashKataSandi() dan cocokkanHash() *private*; buatSesiMasuk(idPengguna) dan mulaiSesi(idPengguna). | Tabel bawaan Better Auth (user, session, account, verification) ditambah kolom peran pada user. hashKataSandi() dan cocokkanHash() menjadi *static public* (dipasang ke konfigurasi Better Auth, *hash* bcrypt). buatSesiMasuk() dan mulaiSesi() menerima email dan kataSandi. | Kredensial dan sesi dikelola pustaka Better Auth, dan pustaka itu hanya membuat sesi beserta *cookie* bertanda tangan lewat API *sign-in* dengan email dan kata sandi. |
| 19 | C04 Pengguna dan turunannya (C03 Relawan, C05 InisiatorProgram, C06 Verifikator) | Pewarisan dari kelas abstrak Pengguna. | Tabel user (Better Auth) menyimpan data akun dan peran; tbl_relawan dan tbl_inisiator_program berelasi ke user lewat userId. Verifikator tidak punya tabel sendiri (akun user dengan peran VERIFIKATOR) dan akunnya dibuat dari *seed*. Di kode, Relawan, InisiatorProgram, dan Verifikator tetap kelas turunan Pengguna. | Basis data relasional tidak mendukung pewarisan, dan tidak ada *use case* registrasi Verifikator. |
| 20 | Query BAB 5 | Nama tabel bercampur (program dan tbl_program, pendaftaran dan tbl_pendaftaran). | Semua tabel domain memakai awalan tbl_ (@@map di schema.prisma); tabel Better Auth memakai nama bawaannya. | Konsistensi penamaan. |
| 21 | C05 InisiatorProgram, verifikasi lembaga | Verifikasi lembaga di luar cakupan *use case*. | Lembaga hasil registrasi berstatus MENUNGGU. Lembaga terverifikasi untuk pengujian disiapkan lewat *seed*; belum ada halaman bagi Verifikator untuk menyetujui lembaga. | simpanProgramBaru() mensyaratkan lembaga terverifikasi, sedangkan verifikasi lembaga tidak dimodelkan di DPPL. |
| 22 | C13 buatAkunBaru() dan validasiKelengkapanData() (UC01, I-01) | buatAkunBaru() mengembalikan Pengguna; berkas diunggah dan diperiksa setelah akun dibuat. | buatAkunBaru() mengembalikan HasilRegistrasi (id, email, peran, status). Berkas dan email diperiksa sebelum akun dibuat; bila penyimpanan gagal setelah akun terbentuk, akun dan berkas dihapus lagi. validasiKelengkapanData() menambah aturan kata sandi minimal 8 karakter, peran hanya Relawan atau Inisiator, tautan situs resmi harus http/https, dan email belum terdaftar. Nomor telepon hanya diminta dan disimpan untuk Relawan. | Registrasi yang gagal tidak meninggalkan akun setengah jadi, dan aturan tambahan mengikuti batasan Better Auth serta kebutuhan KF02. |
| 23 | C13 AuthController, Algo-C13-03 (status verifikasi relawan) | Status verifikasi relawan ditentukan sekali saat registrasi. | Ditambah AuthController.sinkronStatusVerifikasi() yang dipanggil setelah email terverifikasi, mengubah status relawan MENUNGGU menjadi TERVERIFIKASI (status DITOLAK tidak ditimpa). | Verifikasi email terjadi setelah akun dibuat, sehingga saat registrasi status selalu MENUNGGU. |
| 24 | C10 Notifikasi, C13 ambilNotifikasi() dan bacaNotifikasi() (I-03) | Notifikasi tanpa atribut penerima; bacaNotifikasi(idNotifikasi). | Ditambah atribut idPenerima beserta pembantu baru(), dariBaris(), milik(), dan keData(). bacaNotifikasi(idNotifikasi, idPengguna) menolak notifikasi milik pengguna lain dengan pesan "Notifikasi tidak ditemukan". Ditambah prosedur auth.jumlahBelumDibaca untuk angka di ikon lonceng. | Query Q-C10-01 sudah memakai idPenerima tetapi atributnya belum ada di Tabel 4.1, dan pengguna hanya boleh membaca notifikasinya sendiri. |
| 25 | C12 KelolaAkunPage, C16 EksplorasiProgramPage, C17 KelolaPendaftarPage, C19 AreaKegiatanPage (*boundary*) | Operasi tampilan sebagai *method* kelas, misalnya tampilkanFormLogin(), tampilkanPesanTidakDitemukan(), pilihStatusSeleksi(), tampilkanTombolCheckIn(), bukaPortofolio(). | Setiap layar menjadi *route* dan komponen React beserta *hook*-nya (misalnya Login.tsx, Eksplorasi.tsx, KelolaPendaftarView.tsx, AreaKegiatan.tsx, Portofolio.tsx). Operasi tampilan menjadi *render* bersyarat, *state*, dan *handler*; pesan berhasil dan galat memakai komponen Banner. Rincian per kelas ada di Tabel B.5. | Pola Next.js App Router: satu halaman per layar, dan logika tampilan berada di komponen, bukan kelas. |
| 26 | C14 unggahDokumen(), C15 simpanProgramBaru() (I-08) | Dokumen legalitas diunggah lewat CloudStorageAdapter dengan *drag-and-drop*. | Dokumen legalitas diisi sebagai tautan HTTP/HTTPS dan disimpan di DokumenVerifikasi.urlFile; berkas tidak diunggah ke server. | Sama dengan alasan no. 7: unggahan berkas belum disambungkan ke alur program dan laporan. |
| 27 | I-04 dan I-05, foto program | Kartu dan detail program menampilkan foto, tetapi C01 Program tidak punya atribut foto. | Foto diganti gambar *placeholder* per kategori (Jaga Alam dan Jaga Iklim) lewat komponen FotoProgram. | Tidak perlu menambah atribut ke kelas Program. |
| 28 | I-05 Detail Program, UC07 langkah 3 | Capaian program tidak ditampilkan di halaman publik. | Detail program berstatus SELESAI menampilkan ringkasan capaian dan dokumentasi dari laporan akhir yang disetujui (LaporanProgram.showSummary() dan showDokumentasi()), dan dapat dibuka dari riwayat portofolio (I-13). | Memenuhi SKPL UC07 langkah 3 (capaian dapat dilihat publik). |
| 29 | C20 PresensiController (I-12, I-13) | Daftar "Kegiatan Saya" ada di layar I-12, tetapi tidak ada operasinya; operasi menerima idRelawan. | Ditambah ambilDaftarKegiatan(idRelawan), cariIdRelawan(idPengguna), dan ambilProfilRelawan(idRelawan). perbaruiPortofolioRelawan(idProgram, tx?) menerima transaksi opsional dari pemanggil. | Sesi hanya membawa id tabel user, jadi profil relawan dicari dulu; jam aksi dicatat dalam transaksi yang sama dengan persetujuan laporan (no. 9). |
| 30 | C20 prosesCheckIn() (Algo-C20-03), C03 hadirPada(), C08 Kehadiran | Check-in ganda dicek dengan Kehadiran.untukProgram(idRelawan, idProgram), padahal Tabel 4.1 mendefinisikan untukProgram(program): Boolean; hadirPada() *private*; waktu dicek lewat validasiWaktuPelaksanaan(). | prosesCheckIn() memakai relawan.hadirPada(program) (diubah menjadi *public*); check-in bersamaan ditahan *constraint* unik (relawanId, programId). Ditambah syarat program berstatus AKTIF, dan waktu dicek langsung lewat program.cekDalamWaktuPelaksanaan() pada program yang sudah dibaca. | Menyelesaikan inkonsistensi internal DPPL tanpa mengubah *signature* kelas (Algo-C20-04 juga memanggil hadirPada() dari *controller*), menolak check-in di program yang belum atau sudah tidak aktif, dan menghindari membaca program dua kali. |
| 31 | C03 Relawan dan C11 RiwayatKontribusi, jam aksi | totalJamAksi dipindah ke RiwayatKontribusi. | Relawan.getTotalJamAksi() membaca dari RiwayatKontribusi. Kolom tbl_relawan.totalJamAksi masih ada di skema tetapi tidak dibaca maupun ditulis. | Jam aksi hanya punya satu sumber, sesuai rancangan. Kolom lama dibiarkan agar tidak perlu migrasi penghapusan menjelang rilis. |


## B.2 Bukti Penerapan Best Practices

Tabel B.2. Bukti Best Practices

| Praktik | Bukti | Keterangan |
| :--- | :--- | :--- |
| Branching | [Daftar branch](https://github.com/mulky4/IF2150-RPL-K03-G01/branches/all), [graph commit](https://github.com/mulky4/IF2150-RPL-K03-G01/network) | Skema Gitflow sederhana: main hanya untuk rilis dan sync dari repo asisten, develop sebagai branch integrasi, dan setiap pekerjaan di branch &lt;tipe&gt;/&lt;nama&gt; dari develop (contoh feat/presensi-checkin, fix/env-example, test/presensi-uji-beban, refactor/rute-verifikator). Ada 31 branch kerja yang masih tersimpan: 20 feat/, 5 fix/, 3 test/, 1 refactor/, 1 chore/, 1 docs/. Semua digabung ke develop lewat Pull Request, lalu develop digabung ke main saat rilis. |
| Semantic commit | [Riwayat commit develop](https://github.com/mulky4/IF2150-RPL-K03-G01/commits/develop) | Format &lt;tipe&gt;(&lt;scope&gt;): &lt;deskripsi&gt;. Dari 76 commit kode pada M9, 75 mengikuti format (42 feat, 18 fix, 5 test, 5 chore, 4 refactor, 2 style); satu commit memakai spasi sebelum titik dua. *Scope* mengikuti modul atau lapisan, misalnya auth, program, seleksi, presensi, laporan, ui, db. |
| Track tasks | [GitHub Issues](https://github.com/mulky4/IF2150-RPL-K03-G01/issues?q=is%3Aissue), [label per modul](https://github.com/mulky4/IF2150-RPL-K03-G01/labels) | 36 issue (23 ditutup, 13 terbuka saat laporan ditulis), dibuat dari template [FEAT]/[BUG]/[TEST] dengan *acceptance criteria*. Issue diberi label modul (modul-1-auth 8, modul-3-seleksi 5, modul-5-presensi 7, modul-2-program 2), label prioritas, dan label *sprint*, serta ditugaskan ke penanggung jawabnya. Status issue dan PR dipantau di GitHub Projects "RekanBumi M9". PR menautkan issue dengan Issue: #n, dan issue ditutup setelah PR-nya digabung. |
| Pull request dan review | [Daftar PR](https://github.com/mulky4/IF2150-RPL-K03-G01/pulls?q=is%3Apr), contoh: [#51](https://github.com/mulky4/IF2150-RPL-K03-G01/pull/51), [#57](https://github.com/mulky4/IF2150-RPL-K03-G01/pull/57), [#68](https://github.com/mulky4/IF2150-RPL-K03-G01/pull/68) | 31 PR digabung ke develop dengan template PR (ringkasan, referensi DPPL, perubahan dari DPPL, bukti, *checklist*). 30 di antaranya disetujui (approve) minimal satu anggota lain sebelum digabung; #10 (kerangka kelas awal) hanya mendapat komentar review. Pembagian review: Mulky me-review PR Ribka dan Gie; Gie me-review PR Avicenna, Mulky, dan Ribka; Avicenna me-review PR Mulky, Ribka, Gie, dan Kairenzo; Ribka dan Kairenzo me-review PR Mulky. Contoh review yang mengubah hasil: #51 (migrasi digabung, format, notifikasi diuji ulang), #57 (komentar dan deskripsi dirapikan, saran UI diterapkan), #68 (urutan validasi ditukar dan *assertion* filter status ditambah). |
| Pengujian | [src/tests/unit/](../../src/tests/unit) dan [src/tests/beban/](../../src/tests/beban) | Unit test (Vitest) untuk controller dan model tiap modul, termasuk 12 test seleksi (otorisasi pemilik program, validasi kuota, penyimpanan keputusan, konfirmasi, notifikasi hasil); uji beban check-in 50 request bersamaan. Jalankan pnpm test dari folder src. |

### B.2.1 Profiling dan Optimasi

Pilih minimal satu fitur yang diprofil.

| Informasi | Keterangan |
| :--- | :--- |
| Fitur / proses yang diprofil | Check-in kehadiran relawan (PresensiController.prosesCheckIn, I-12), endpoint yang paling mungkin diserbu banyak relawan bersamaan di awal kegiatan (KNF04). |
| Alat | Log statement PostgreSQL (log_statement = 'all') untuk menghitung query per check-in, dan skrip uji beban [src/tests/beban/ujiBebanCheckIn.ts](../../src/tests/beban/ujiBebanCheckIn.ts) (50 check-in bersamaan × 5 putaran, waktu respons rata-rata dan p95). Dijalankan pada build produksi (next build + next start) dengan PostgreSQL lokal. |
| Temuan (sebelum) | Kode sebelum [PR #52](https://github.com/mulky4/IF2150-RPL-K03-G01/pull/52): satu check-in menjalankan **11 query berurutan**. Program dibaca dua kali (validasiWaktuPelaksanaan() lalu cariProgram()), data relawan dan user masing-masing dibaca dua kali, dan Relawan.cari() ikut memuat riwayat kontribusi yang tidak dipakai saat check-in. Uji beban: 250 request, 0 gagal, rata-rata 154–205 ms dan p95 162–215 ms per putaran (setelah pemanasan). |
| Perbaikan | prosesCheckIn() membaca pendaftaran dan program sekali saja secara bersamaan (Promise.all), memakai program yang sudah dibaca untuk cek status AKTIF dan waktu pelaksanaan, dan memakai query relawan ringan (cariRelawanUntukCheckIn()) yang hanya memuat kehadiran di program itu. |
| Hasil (sesudah) | Query per check-in turun dari **11 menjadi 9**: query program kedua dan query riwayat kontribusi hilang, dan pembacaan pendaftaran serta program berjalan paralel. Uji beban: 250 request, 0 gagal, jumlah kehadiran di database selalu sama dengan request yang berhasil; rata-rata 179–243 ms dan p95 188–256 ms per putaran. Pada database lokal waktu respons tidak berubah berarti karena tiap query hanya butuh beberapa milidetik dan selisihnya masih di dalam variasi antar-putaran; keuntungan utamanya adalah beban database per check-in berkurang sekitar 18%, yang lebih terasa bila database berada di server terpisah (misalnya Neon). Kedua versi sudah memenuhi target KNF04 (kegagalan ≤ 5%). |

Jika tidak ada perbaikan yang perlu dilakukan, jelaskan hasil profiling dan alasan kenapa fitur tersebut sudah memadai.

## B.3 Kendala dan Catatan Penting

**Menjalankan dan menilai aplikasi**
- Urutan dari folder src/: pnpm install → salin .env.example ke .env (isi BETTER_AUTH_SECRET) → docker compose up -d → pnpm prisma migrate deploy → pnpm db:seed → pnpm dev. Rincian ada di src/README.md.
- Akun uji (kata sandi DemoRekanBumi2026!): inisiator@, inisiator2@ (lembaga belum terverifikasi), relawan1@, relawan2@, relawan3@ (data profil belum lengkap), dan verifikator@rekanbumi.example. Akun Verifikator hanya dari *seed*, tidak bisa didaftarkan lewat aplikasi.
- Program *seed* "Aksi Bersih Sungai" dibuat **relatif terhadap waktu seed** (mulai 1 jam sebelum, selesai 3 jam sesudah). Check-in (I-12) hanya bisa dalam rentang itu, jadi jalankan ulang pnpm db:seed sebelum menguji presensi.
- Program *seed* "Penanaman Pohon Bersama" berkuota 1 dan sudah penuh, untuk menguji penolakan kuota di pendaftaran (I-06) dan seleksi (I-11). Program "Susur Pantai Bersih" masih membuka pendaftaran dan relawan1 belum terdaftar di sana.
- Uji beban check-in (KNF04) memerlukan server yang sedang berjalan. Dari src/: npx tsx --tsconfig tsconfig.json tests/beban/siapkanDataBeban.ts 50, lalu npx tsx --tsconfig tsconfig.json tests/beban/ujiBebanCheckIn.ts.
- Proyek memakai Node 20 (.nvmrc).

**Keterbatasan yang diketahui**
- Link verifikasi email tidak dikirim lewat email, tetapi dicetak di terminal pnpm dev. Relawan baru harus membuka link itu agar berstatus terverifikasi sebelum bisa mendaftar program. Akun *seed* sudah terverifikasi.
- Blokir IP (KNF06) disimpan di memori proses, sehingga hilang ketika server di-restart.
- Form unggah laporan (I-09) memvalidasi berkas di sisi klien (maks 2 MB, JPG/PNG/WEBP/PDF), tetapi yang dikirim ke server hanya tautan dokumentasi (B.1 no. 7). Dokumen legalitas di I-08 juga berupa tautan (B.1 no. 26).
- Penyimpanan berkas memakai folder lokal uploads/ (diabaikan git); layanan *cloud* belum dipilih (B.1 no. 17).
- Belum ada halaman bagi Verifikator untuk memverifikasi lembaga baru; lembaga terverifikasi disiapkan lewat *seed* (B.1 no. 21).
- Halaman Notifikasi (I-03) belum menampilkan badge Diterima/Ditolak dan tombol "Lihat Kegiatan" karena notifikasi belum menyimpan referensi pendaftaran atau program.

**Catatan migrasi**
- Sebelum menjalankan migrasi constraint unik (programId, relawanId), periksa kemungkinan pendaftaran ganda dengan query SELECT "programId", "relawanId", COUNT(*) FROM "tbl_pendaftaran" GROUP BY "programId", "relawanId" HAVING COUNT(*) &gt; 1;. Jika ada hasil, tinjau dan bersihkan duplikat sebelum migrasi; migrasi tidak menghapus data otomatis.

## B.4 Kontribusi Anggota

Tabel B.4. Kontribusi Anggota

| NIM | Nama | Modul / Fitur yang Dikerjakan | Persentase Kontribusi |
| :--- | :--- | :--- | :--- |
| 13525018 | Avicenna Ananda Musthafa | Presensi & Portofolio :** I-12 check-in dan halaman Kegiatan Saya, I-13 Portofolio relawan, model Kehadiran dan RiwayatKontribusi, perbaruiPortofolioRelawan() untuk pembaruan jam aksi, skenario alternatif UC08 dan unit test presensi, uji beban check-in 50 request bersamaan (KNF04). **Di luar Modul 5:** Fondasi C (tema Tailwind, layout global, komponen UI design system). | 20% |
| 13525045 | Ribka Kaylena Sanjaya | (Pendaftaran & Seleksi) I-11 Kelola Pendaftar dan seleksi relawan, data seed untuk skenario uji, unit test transisi status Pendaftaran, perbaikan kredensial DB .env.example agar sama dengan docker-compose. | 20% |
| 13525063 | Kairenzo Vemil | (Program & Eksplorasi) I-04 halaman eksplorasi program, I-05 detail program, dan pencarian program. | 20% |
| 13525069 | Mulky Siraj Firizqi | **Modul 1 (Auth & Notifikasi):** I-01 registrasi Relawan/Inisiator, I-02 login dan redirect urlKembali, I-03 notifikasi dan badge di Navbar, blokir IP setelah 5 kali gagal (KNF06), sinkron status verifikasi relawan. **Di luar Modul 1:** Fondasi A (scaffold Next.js, tRPC, Prisma, tooling, Better Auth + bcrypt, procedure per peran, kerangka kelas C04, C10, C12, C13). | 20% |
| 13525144 | Three Gie Gendhis Sekar Ayoe Jatmiko | (Laporan dan Verifikator) I-09 unggah laporan akhir, I-10 peninjauan dan persetujuan laporan (LaporanProgram, Verifikator, ProgramController bagian laporan), I-07 Program Saya, Dashboard Verifikator dan persetujuan program, notifikasi ke Verifikator saat laporan diajukan, integrasi persetujuan laporan ke portofolio relawan. **Di luar Modul 4:** I-08 formulir daftar program (PR #31), I-06 pendaftaran relawan (PR #32), dan review PR modul lain. | 20% |

## B.5 Traceability Kelas Perancangan ke Implementasi

Pemetaan dari **setiap kelas perancangan** pada DPPL (Tabel 4.1) ke wujud implementasinya. Bentuk implementasi bebas (kelas, fungsi, komponen, *route/handler*, *stored procedure*, skrip, dsb.), tetapi tiap kelas perancangan harus muncul pada tabel ini. Jika implementasi berupa kelas dengan nama yang sama, tetap dicantumkan.

Tabel B.5. Traceability Kelas Perancangan ke Implementasi

| ID Kelas | Nama Kelas Perancangan | Bentuk Implementasi | Lokasi (File dan Nama) | Keterangan |
| :--- | :--- | :--- | :--- | :--- |
| C01 | Program | Kelas + tabel Prisma | src/server/models/Program.ts - Program; src/prisma/schema.prisma - Program | Aturan domain dan atribut program; daftar relasi disimpan lewat Prisma. |
| C02 | Pendaftaran | Kelas + tabel Prisma | src/server/models/Pendaftaran.ts - Pendaftaran; src/prisma/schema.prisma - Pendaftaran | Transisi terima/tolak dan status keputusan; unik per pasangan program-relawan. |
| C03 | Relawan | Kelas + tabel Prisma | src/server/models/Relawan.ts - Relawan; src/prisma/schema.prisma - Relawan | Profil, verifikasi, kehadiran, dan akses portofolio. |
| C04 | Pengguna | Kelas abstrak + tabel Better Auth | src/server/models/Pengguna.ts - Pengguna; src/prisma/schema.prisma - User | Identitas dan notifikasi; akun dipersistenkan pada tabel user. |
| C05 | InisiatorProgram | Kelas + tabel Prisma | src/server/models/InisiatorProgram.ts - InisiatorProgram; src/prisma/schema.prisma - InisiatorProgram | Status verifikasi, tautan, dan data lembaga. |
| C06 | Verifikator | Kelas | src/server/models/Verifikator.ts - Verifikator | Operasi domain menyetujui atau menolak laporan. |
| C07 | DokumenVerifikasi | Kelas + tabel Prisma | src/server/models/DokumenVerifikasi.ts - DokumenVerifikasi; src/prisma/schema.prisma - DokumenVerifikasi | Metadata dokumen dan status verifikasi. |
| C08 | Kehadiran | Kelas + tabel Prisma | src/server/models/Kehadiran.ts - Kehadiran; src/prisma/schema.prisma - Kehadiran | Catatan waktu check-in unik per relawan-program. |
| C09 | LaporanProgram | Kelas + tabel Prisma | src/server/models/LaporanProgram.ts - LaporanProgram; src/prisma/schema.prisma - LaporanProgram | Dokumentasi, ringkasan, revisi, dan status peninjauan. |
| C10 | Notifikasi | Kelas + tabel Prisma | src/server/models/Notifikasi.ts - Notifikasi; src/prisma/schema.prisma - Notifikasi | Kirim, baca, dan detail; controller seleksi membuat notifikasi di transaksi. |
| C11 | RiwayatKontribusi | Kelas + tabel Prisma | src/server/models/RiwayatKontribusi.ts - RiwayatKontribusi; src/prisma/schema.prisma - RiwayatKontribusi, RiwayatProgram | Total jam dan relasi ke program selesai. |
| C12 | KelolaAkunPage | View, hook, dan route | src/views/KelolaAkunPage/; src/app/login/, src/app/registrasi/, src/app/notifikasi/ | Form dan operasi akun/notifikasi diwujudkan sebagai state, handler, dan komponen. |
| C13 | AuthController | Controller + router tRPC | src/server/controllers/AuthController.ts; src/server/api/routers/auth.ts | Sesi, kredensial, proteksi login, dan notifikasi pengguna. |
| C14 | KelolaProgramPage | View, hook, dan route | src/views/KelolaProgramPage/; src/app/inisiator/program/ | Pembuatan program, daftar program, dan pengajuan laporan. |
| C15 | ProgramController | Controller + router tRPC | src/server/controllers/ProgramController.ts; src/server/api/routers/program.ts | Operasi program baru, pencarian dan detail program, pendaftaran relawan, persetujuan program, serta pengajuan dan peninjauan laporan akhir. |
| C16 | EksplorasiProgramPage | View, hook, dan route | src/views/EksplorasiProgramPage/Eksplorasi.tsx, DetailProgram.tsx, useEksplorasiProgramPage.ts; src/app/program/page.tsx, src/app/program/[id]/page.tsx | Pencarian dengan jeda ketik, filter kategori, dan muat bertahap menjadi *state* hook; detail program menampilkan kuota, tautan situs resmi, dan capaian program selesai. |
| C17 | KelolaPendaftarPage | View, hook, dan route | src/views/KelolaPendaftarPage/KelolaPendaftarView.tsx; src/views/KelolaPendaftarPage/useKelolaPendaftarPage.ts; src/app/inisiator/program/[id]/pendaftar/page.tsx | Memilih keputusan, menyimpan hasil, dan meminta konfirmasi pengumuman. |
| C18 | SeleksiController | Controller + router tRPC | src/server/controllers/SeleksiController.ts; src/server/api/routers/seleksi.ts | Daftar pendaftar, validasi kuota, keputusan transaksional, dan notifikasi hasil. |
| C19 | AreaKegiatanPage | View, hook, dan route | src/views/AreaKegiatanPage/AreaKegiatan.tsx, Portofolio.tsx, useAreaKegiatanPage.ts; src/app/kegiatan/, src/app/portofolio/ | Daftar kegiatan dan tombol check-in; portofolio menampilkan total jam aksi dan riwayat program selesai. |
| C20 | PresensiController | Controller + router tRPC | src/server/controllers/PresensiController.ts; src/server/api/routers/presensi.ts | ambilDaftarKegiatan, prosesCheckIn (validasi status relawan dan waktu pelaksanaan), serta perbaruiPortofolioRelawan yang menambah jam aksi saat laporan akhir disetujui. |
| C21 | CloudStorageAdapter | Adapter | src/server/adapters/CloudStorageAdapter.ts - CloudStorageAdapter | Validasi dan penyimpanan berkas lokal sebagai adapter; layanan cloud belum dipilih. |
| C22 | BetterAuth | Adapter pustaka | src/server/adapters/BetterAuth.ts - BetterAuth; src/server/auth.ts | Kredensial, hash kata sandi, verifikasi, dan sesi melalui Better Auth. |
| C01 | Program (lanjutan: bagian verifikasi) | Method pada kelas | src/server/models/Program.ts - Program.aktifkan() | Method tambahan yang mengubah status MENUNGGU_VERIFIKASI menjadi AKTIF; status lain ditolak dengan galat (B.1 no. 14). |
| C06 | Verifikator (lanjutan) | Kelas | src/server/models/Verifikator.ts - Verifikator | konfirmasiLaporan() dan tolakLaporan() meneruskan ke LaporanProgram dengan this.idPengguna. Alur HTTP memakai ProgramController langsung (B.1 no. 6 dan 9). |
| C09 | LaporanProgram (lanjutan) | Kelas dan tabel | src/server/models/LaporanProgram.ts - LaporanProgram; src/prisma/schema.prisma - model LaporanProgram (tbl_laporan_program) | uploadDokumentasi(), setujui(), tolak(), showSummary(), dan showDokumentasi() ada sebagai method. Atribut idLaporan dan waktuPengajuan hanya ada di tabel. Relasi satu-ke-banyak dengan Program (B.1 no. 5). |
| C14 | KelolaProgramPage (lanjutan: bagian I-07, I-08, I-09, I-10) | Komponen React, rute, dan fungsi murni | src/views/laporan/LaporanFormView.tsx (I-09); src/views/laporan/LaporanVerifikasiView.tsx dan src/views/laporan/LaporanDetailView.tsx (I-10); src/views/KelolaProgramPage/ProgramFormView.tsx (I-08); src/views/KelolaProgramPage/ProgramSayaView.tsx (I-07); src/lib/programSaya.ts (tampilkanStatusProgram); rute src/app/laporan/page.tsx, src/app/verifikator/laporan/page.tsx, src/app/verifikator/laporan/[id]/page.tsx, src/app/inisiator/program/page.tsx, dan src/app/inisiator/program/baru/page.tsx | Atribut boundary menjadi state komponen, dan operasi menjadi handler atau pemanggilan tRPC (B.1 no. 11 dan 12). Rute I-09 dan I-10 dijelaskan di B.1 no. 13. |
| C15 | ProgramController (lanjutan: operasi Modul 4) | Kelas controller dan router tRPC | src/server/controllers/ProgramController.ts - simpanProgramBaru, validasiDataProgram, ajukanLaporanAkhir, validasiLaporan, tinjauLaporan, konfirmasiLaporan, tolakLaporan, ambilProgramSaya, ambilProgramMenungguVerifikasi, setujuiProgram, daftarRelawan; router src/server/api/routers/laporan.ts dan src/server/api/routers/program.ts | buatNotifikasi diwujudkan di dalam transaksi ajukanLaporanAkhir, selesaikanPeninjauan, dan setujuiProgram (B.1 no. 8). Galat memakai GalatProgram (B.1 no. 10). cariProgram, ambilDetailProgram, dan validasiTautanSitus bagian Modul 2. |
| C10 | Notifikasi (lanjutan: alur laporan dan verifikasi program) | Pembuatan baris notifikasi di transaksi | src/server/controllers/ProgramController.ts (tx.notifikasi.create dan createMany); src/server/models/Notifikasi.ts - Notifikasi.baru() | Notifikasi.kirim() tidak dipakai di alur laporan (B.1 no. 8). Kelas Notifikasi dikerjakan Modul 1. |

Catatan:
- Satu kelas perancangan boleh diwujudkan oleh beberapa file/unit, dan satu file/unit boleh mewujudkan beberapa kelas perancangan. Tuliskan semuanya.
- Kelas perancangan yang **tidak diimplementasikan** atau **digabung/dipecah** tetap dicantumkan, dan alasannya dicatat di Bagian B.1.
