
# Tugas Besar IF2150 Rekayasa Perangkat Lunak

---

## 1. Overview

Setiap milestone, asisten akan merilis materi/spesifikasi baru ke **repository original** yang ada di organisasi GitHub mata kuliah ini. Kelompok bekerja di **hasil fork** dari repository tersebut, dan setiap ada milestone baru, kelompok melakukan **sync** untuk pull update tersebut ke repo hasil fork.

--- 
## 2. Repository Structure

Repository original disusun per milestone:

```
.
├── .github
│   ├── ISSUE_TEMPLATE
│   │   ├── bug.md
│   │   └── fitur.md
│   └── pull_request_template.md
├── .gitignore
├── README.md
├── docker-compose.yml
├── docs
│   ├── K03_G01_AI-Usage.md
│   ├── K03_G01_Logbook.md
│   ├── M1
│   │   ├── K03_G01_Form-Asistensi.md
│   │   ├── K03_G01_Template1_TB.md
│   │   └── assets
│   │       ├── diagram
│   │       │   ├── Activity Diagram Alur Eksekusi & Pelaporan Kegiatan.png
│   │       │   ├── Activity Diagram Alur Eksplorasi & Rekrutmen Relawan.png
│   │       │   ├── Activity Diagram Alur Manajemen & Publikasi Program.png
│   │       │   ├── Activity Diagram Alur Pendaftaran & Verifikasi Inisiator.png
│   │       │   └── diagram-act-1.avif
│   │       ├── foto-asistensi-akhir.jpg
│   │       ├── foto-asistensi-awal.jpg
│   │       └── foto-asistensi.jpg
│   ├── M2
│   │   ├── K03_G01_Form-Asistensi.md
│   │   ├── K03_G01_RG.md
│   │   └── assets
│   │       ├── diagram
│   │       │   └── .gitkeep
│   │       └── dokumentasi-asistensi.jpg
│   ├── M3
│   │   ├── K03_G01_Form-Asistensi.md
│   │   ├── K03_G01_UC.md
│   │   └── assets
│   │       ├── ActivityDiagram.png
│   │       ├── diagram
│   │       │   └── contoh-uc-diagram.webp
│   │       └── dokumentasi-asistensi.jpg
│   ├── M4
│   │   ├── K03_G01_CD.md
│   │   ├── KXX_GYY_Form-Asistensi.md
│   │   └── assets
│   │       └── diagram
│   │           ├── ActivityDiagram.png
│   │           ├── CD_UC01 (2).png
│   │           ├── CD_UC02.png
│   │           ├── CD_UC03.jpg
│   │           ├── CD_UC04.jpg
│   │           ├── CD_UC05.jpg
│   │           ├── CD_UC06.jpg
│   │           ├── CD_UC07.jpg
│   │           ├── CD_UC08.jpg
│   │           ├── CD_UC09.jpg
│   │           ├── Diagram 4.3.png
│   │           ├── contoh-class-diagram.webp
│   │           └── contoh-uc-diagram.webp
│   ├── M5
│   │   ├── K03_G01_Form-Asistensi.md
│   │   ├── K03_G01_SKPL.md
│   │   └── assets
│   │       ├── diagram
│   │       │   ├── 4.3 (1).png
│   │       │   ├── Activity Diagram Alur Eksekusi & Pelaporan Kegiatan.png
│   │       │   ├── Activity Diagram Alur Eksplorasi & Rekrutmen Relawan.png
│   │       │   ├── Activity Diagram Alur Manajemen & Publikasi Program.png
│   │       │   ├── Activity Diagram Alur Pendaftaran & Verifikasi Inisiator.png
│   │       │   ├── ActivityDiagram.png
│   │       │   ├── CD_UC01 (2).png
│   │       │   ├── CD_UC02.png
│   │       │   ├── CD_UC03.jpg
│   │       │   ├── CD_UC04.jpg
│   │       │   ├── CD_UC05.jpg
│   │       │   ├── CD_UC06.jpg
│   │       │   ├── CD_UC07.jpg
│   │       │   ├── CD_UC08.jpg
│   │       │   ├── CD_UC09.jpg
│   │       │   ├── Diagram 4.3.png
│   │       │   ├── UC Diagram.png
│   │       │   ├── contoh-class-diagram.webp
│   │       │   ├── contoh-uc-diagram.webp
│   │       │   └── diagram-act-1.avif
│   │       └── foto-asistensi.jpg
│   ├── M6
│   │   ├── K03_G01_APL.md
│   │   ├── KXX_GYY_Form-Asistensi.md
│   │   └── assets
│   │       ├── diagram
│   │       │   ├── CLIENTSERVER.png
│   │       │   ├── MVC.png
│   │       │   ├── contoh-arsitektur-mvc.webp
│   │       │   ├── contoh-logical-view.webp
│   │       │   ├── logical-view.png
│   │       │   └── physical-view.png
│   │       ├── dokum asistensi akbar m6.png
│   │       └── foto-asistensi.jpg
│   ├── M7
│   │   ├── K03_G01_DPPL.md
│   │   ├── K03_G01_Form-Asistensi.md
│   │   └── assets
│   │       ├── asistensi akbar m7.png
│   │       ├── diagram
│   │       │   ├── CD_UC01.png
│   │       │   ├── CD_UC02.png
│   │       │   ├── CD_UC03.png
│   │       │   ├── CD_UC04.png
│   │       │   ├── CD_UC05.png
│   │       │   ├── CD_UC06.png
│   │       │   ├── CD_UC09_perancangan.png
│   │       │   ├── CLIENTSERVER.png
│   │       │   ├── MVC.png
│   │       │   ├── SD_UC01_alt1.png
│   │       │   ├── SD_UC01_normal.png
│   │       │   ├── SD_UC02_alt1.png
│   │       │   ├── SD_UC02_alt2.png
│   │       │   ├── SD_UC02_normal.png
│   │       │   ├── SD_UC03_alt.png
│   │       │   ├── SD_UC03_normal.png
│   │       │   ├── SD_UC04_alt.png
│   │       │   ├── SD_UC04_normal.png
│   │       │   ├── SD_UC05_alt1.png
│   │       │   ├── SD_UC05_normal.png
│   │       │   ├── SD_UC06_alt1.png
│   │       │   ├── SD_UC06_normal.png
│   │       │   ├── SD_UC09_alt1.png
│   │       │   ├── SD_UC09_normal.png
│   │       │   ├── cd_uc07.jpg
│   │       │   ├── cd_uc08.jpg
│   │       │   ├── contoh-arsitektur-mvc.webp
│   │       │   ├── contoh-class_diargam.png
│   │       │   ├── contoh-design.png
│   │       │   ├── contoh-erd.png
│   │       │   ├── contoh-logical-view.webp
│   │       │   ├── contoh-sequence_diagram.png
│   │       │   ├── contoh_class-diagram2.jpg
│   │       │   ├── diagram-kelas-keseluruhan.png
│   │       │   ├── logical-view.png
│   │       │   ├── physical-view.png
│   │       │   ├── sd(alt)_uc07.png
│   │       │   ├── sd(alt)_uc08.png
│   │       │   ├── sd(normal)_uc07.png
│   │       │   └── sd(normal)_uc08.png
│   │       ├── foto-asistensi.jpg
│   │       └── logo_RekanBumi.png
│   ├── M8
│   │   ├── K03_G01_DPPL2.md
│   │   ├── K03_G01_Form-Asistensi.md
│   │   └── assets
│   │       ├── I-01_Registrasi-Akun.png
│   │       ├── I-02_Login.png
│   │       ├── I-03_Notifikasi.png
│   │       ├── I-04_Eksplorasi-Program.png
│   │       ├── I-05_Detail-Program.png
│   │       ├── I-06_Formulir-Pendaftaran-Program.png
│   │       ├── I-07_Program-Saya.png
│   │       ├── antarmuka
│   │       │   ├── I-01_Registrasi-Akun.png
│   │       │   ├── I-02_Login.png
│   │       │   ├── I-03_Notifikasi.png
│   │       │   ├── I-04_Eksplorasi-Program.png
│   │       │   ├── I-05_Detail-Program.png
│   │       │   ├── I-06_Formulir-Pendaftaran-Program.png
│   │       │   ├── I-07_Program-Saya.png
│   │       │   ├── I-08_Formulir-Daftar-Program.png
│   │       │   ├── I-09_Unggah-Laporan-Akhir.png
│   │       │   ├── I-10_Tinjau-Laporan-Akhir.png
│   │       │   ├── I-11_Kelola-Pendaftar-Seleksi.png
│   │       │   ├── I-12_Area-Kegiatan-Check-in.png
│   │       │   └── I-13_Portofolio-Relawan.png
│   │       ├── diagram
│   │       │   ├── CD_UC01 (3).png
│   │       │   ├── CD_UC02.png
│   │       │   ├── CD_UC03.png
│   │       │   ├── CD_UC04.png
│   │       │   ├── CD_UC05 (1).png
│   │       │   ├── CD_UC06 (1).png
│   │       │   ├── CD_UC09_perancangan.png
│   │       │   ├── CLIENTSERVER.png
│   │       │   ├── MVC.png
│   │       │   ├── SD_UC01_alt1.png
│   │       │   ├── SD_UC01_normal.png
│   │       │   ├── SD_UC02_alt1.png
│   │       │   ├── SD_UC02_alt2.png
│   │       │   ├── SD_UC02_normal.png
│   │       │   ├── SD_UC03_alt.png
│   │       │   ├── SD_UC03_normal.png
│   │       │   ├── SD_UC04_alt.png
│   │       │   ├── SD_UC04_normal.png
│   │       │   ├── SD_UC05_alt1 (1).png
│   │       │   ├── SD_UC05_normal (1).png
│   │       │   ├── SD_UC06_alt1 (1).png
│   │       │   ├── SD_UC06_normal (1).png
│   │       │   ├── SD_UC09_alt1.png
│   │       │   ├── SD_UC09_normal.png
│   │       │   ├── cd_uc07.jpg
│   │       │   ├── cd_uc08.jpg
│   │       │   ├── contoh-arsitektur-mvc.webp
│   │       │   ├── contoh-class_diargam.png
│   │       │   ├── contoh-design.png
│   │       │   ├── contoh-erd.png
│   │       │   ├── contoh-logical-view.webp
│   │       │   ├── contoh-sequence_diagram.png
│   │       │   ├── contoh_class-diagram2.jpg
│   │       │   ├── diagram-kelas-keseluruhan.png
│   │       │   ├── logical-view.png
│   │       │   ├── physical-view.png
│   │       │   ├── sd(alt)_uc07.png
│   │       │   ├── sd(alt)_uc08.png
│   │       │   ├── sd(normal)_uc07.png
│   │       │   └── sd(normal)_uc08.png
│   │       ├── foto-asistensi.jpg
│   │       ├── foto-asistensi.png
│   │       └── logo_RekanBumi.png
│   ├── M9
│   │   ├── K03_G01_Form-Asistensi.md
│   │   ├── K03_G01_Implementasi.md
│   │   └── assets
│   │       └── foto-asistensi.jpg
│   └── assets
│       ├── .gitkeep
│       ├── ttd avicenna.jpeg
│       ├── ttd gie.jpeg
│       ├── ttd kairenzo.jpeg
│       ├── ttd mulky.jpeg
│       └── ttd ribka.jpeg
├── project_board.json
└── src
    ├── .env
    ├── .env.example
    ├── .gitignore
    ├── .nvmrc
    ├── .prettierignore
    ├── .prettierrc.json
    ├── README.md
    ├── app
    │   ├── api
    │   │   ├── auth
    │   │   │   └── [...all]
    │   │   │       └── route.ts
    │   │   └── trpc
    │   │       └── [trpc]
    │   │           └── route.ts
    │   ├── design-system
    │   │   └── page.tsx
    │   ├── favicon.ico
    │   ├── globals.css
    │   ├── inisiator
    │   │   └── program
    │   │       ├── [id]
    │   │       │   └── pendaftar
    │   │       │       └── page.tsx
    │   │       ├── baru
    │   │       │   └── page.tsx
    │   │       └── page.tsx
    │   ├── kegiatan
    │   │   └── page.tsx
    │   ├── laporan
    │   │   └── page.tsx
    │   ├── layout.tsx
    │   ├── login
    │   │   └── page.tsx
    │   ├── notifikasi
    │   │   └── page.tsx
    │   ├── page.tsx
    │   ├── portofolio
    │   │   └── page.tsx
    │   ├── program
    │   │   ├── [id]
    │   │   │   ├── daftar
    │   │   │   │   └── page.tsx
    │   │   │   └── page.tsx
    │   │   └── page.tsx
    │   ├── registrasi
    │   │   └── page.tsx
    │   └── verifikator
    │       ├── laporan
    │       │   ├── [id]
    │       │   │   └── page.tsx
    │       │   └── page.tsx
    │       └── page.tsx
    ├── docker-compose.yml
    ├── eslint.config.mjs
    ├── lib
    │   ├── auth-client.ts
    │   ├── belumDiimplementasi.ts
    │   ├── cn.ts
    │   ├── galat.ts
    │   ├── pencarianProgram.ts
    │   ├── programSaya.ts
    │   ├── urlKembali.ts
    │   └── waktu.ts
    ├── next-env.d.ts
    ├── next.config.ts
    ├── package.json
    ├── pnpm-lock.yaml
    ├── postcss.config.mjs
    ├── prisma
    │   ├── migrations
    │   │   ├── 20261107113719_tabel_better_auth
    │   │   │   └── migration.sql
    │   │   ├── 20261110130800_tabel_domain
    │   │   │   └── migration.sql
    │   │   ├── 20261111190000_lengkapi_domain
    │   │   │   └── migration.sql
    │   │   ├── 20261113000000_laporan_satu_ke_banyak
    │   │   │   └── migration.sql
    │   │   ├── 20261113120000_seleksi_pendaftar
    │   │   │   └── migration.sql
    │   │   └── migration_lock.toml
    │   ├── schema.prisma
    │   └── seed.ts
    ├── public
    │   ├── icons
    │   │   ├── alert-error.svg
    │   │   ├── alert-info.svg
    │   │   ├── alert-peringatan.svg
    │   │   ├── award.svg
    │   │   ├── back.svg
    │   │   ├── bell.svg
    │   │   ├── calendar.svg
    │   │   ├── check-sukses.svg
    │   │   ├── chevron-down.svg
    │   │   ├── clipboard.svg
    │   │   ├── clock.svg
    │   │   ├── compass.svg
    │   │   ├── eye.svg
    │   │   ├── file.svg
    │   │   ├── image.svg
    │   │   ├── leaf.svg
    │   │   ├── next.svg
    │   │   ├── pin.svg
    │   │   ├── plus.svg
    │   │   ├── search.svg
    │   │   ├── shield.svg
    │   │   ├── target.svg
    │   │   ├── titik-belum-dibaca.svg
    │   │   ├── upload.svg
    │   │   ├── user.svg
    │   │   └── users.svg
    │   └── logo
    │       ├── logo-ikon-hijau.svg
    │       ├── logo-ikon-putih.svg
    │       ├── logo-lengkap-hijau.svg
    │       └── logo-lengkap-putih.svg
    ├── server
    │   ├── adapters
    │   │   ├── BetterAuth.ts
    │   │   └── CloudStorageAdapter.ts
    │   ├── api
    │   │   ├── root.ts
    │   │   ├── routers
    │   │   │   ├── auth.ts
    │   │   │   ├── laporan.ts
    │   │   │   ├── presensi.ts
    │   │   │   ├── program.ts
    │   │   │   └── seleksi.ts
    │   │   └── trpc.ts
    │   ├── auth.ts
    │   ├── controllers
    │   │   ├── AuthController.ts
    │   │   ├── PresensiController.ts
    │   │   ├── ProgramController.ts
    │   │   └── SeleksiController.ts
    │   ├── db.ts
    │   └── models
    │       ├── DokumenVerifikasi.ts
    │       ├── InisiatorProgram.ts
    │       ├── Kehadiran.ts
    │       ├── LaporanProgram.ts
    │       ├── Notifikasi.ts
    │       ├── Pendaftaran.ts
    │       ├── Pengguna.ts
    │       ├── Program.ts
    │       ├── Relawan.ts
    │       ├── RiwayatKontribusi.ts
    │       ├── Verifikator.ts
    │       └── enums.ts
    ├── tests
    │   ├── beban
    │   │   ├── konstanta.ts
    │   │   ├── siapkanDataBeban.ts
    │   │   └── ujiBebanCheckIn.ts
    │   └── unit
    │       ├── AuthController.login.test.ts
    │       ├── AuthController.registrasi.test.ts
    │       ├── AuthController.sinkronStatus.test.ts
    │       ├── BetterAuth.test.ts
    │       ├── CloudStorageAdapter.test.ts
    │       ├── LaporanProgram.test.ts
    │       ├── Notifikasi.test.ts
    │       ├── PresensiController.portofolio.test.ts
    │       ├── PresensiController.test.ts
    │       ├── Program.test.ts
    │       ├── ProgramController.ajukanLaporan.test.ts
    │       ├── ProgramController.daftarRelawan.test.ts
    │       ├── ProgramController.eksplorasi.test.ts
    │       ├── ProgramController.menungguVerifikasi.test.ts
    │       ├── ProgramController.peninjauan.test.ts
    │       ├── ProgramController.programSaya.test.ts
    │       ├── ProgramController.verifikasi.test.ts
    │       ├── RiwayatKontribusi.test.ts
    │       ├── SeleksiController.test.ts
    │       ├── programSaya.test.ts
    │       ├── urlKembali.test.ts
    │       └── waktu.test.ts
    ├── trpc
    │   ├── query-client.ts
    │   └── react.tsx
    ├── tsconfig.json
    ├── tsconfig.tsbuildinfo
    ├── views
    │   ├── AreaKegiatanPage
    │   │   ├── .gitkeep
    │   │   ├── AreaKegiatan.tsx
    │   │   ├── Portofolio.tsx
    │   │   └── useAreaKegiatanPage.ts
    │   ├── EksplorasiProgramPage
    │   │   ├── .gitkeep
    │   │   ├── DetailProgram.tsx
    │   │   ├── Eksplorasi.tsx
    │   │   └── useEksplorasiProgramPage.ts
    │   ├── KelolaAkunPage
    │   │   ├── .gitkeep
    │   │   ├── Login.tsx
    │   │   ├── Notifikasi.tsx
    │   │   ├── Registrasi.tsx
    │   │   ├── daftarDomisili.ts
    │   │   └── useKelolaAkunPage.ts
    │   ├── KelolaPendaftarPage
    │   │   ├── .gitkeep
    │   │   ├── KelolaPendaftarView.tsx
    │   │   └── useKelolaPendaftarPage.ts
    │   ├── KelolaProgramPage
    │   │   ├── .gitkeep
    │   │   ├── DashboardVerifikator.tsx
    │   │   ├── ProgramDaftarView.tsx
    │   │   ├── ProgramFormView.tsx
    │   │   ├── ProgramSayaView.tsx
    │   │   ├── useDashboardVerifikator.ts
    │   │   ├── useProgramDaftar.ts
    │   │   └── useProgramSaya.ts
    │   ├── components
    │   │   ├── .gitkeep
    │   │   ├── AppShell.tsx
    │   │   ├── Badge.tsx
    │   │   ├── BadgeJumlah.tsx
    │   │   ├── Banner.tsx
    │   │   ├── BottomNav.tsx
    │   │   ├── Button.tsx
    │   │   ├── Chip.tsx
    │   │   ├── EmptyState.tsx
    │   │   ├── Field.tsx
    │   │   ├── FileDropzone.tsx
    │   │   ├── Footer.tsx
    │   │   ├── FotoProgram.tsx
    │   │   ├── Ikon.tsx
    │   │   ├── Input.tsx
    │   │   ├── KatalogKomponen.tsx
    │   │   ├── Logo.tsx
    │   │   ├── Modal.tsx
    │   │   ├── Navbar.tsx
    │   │   ├── NotifikasiItem.tsx
    │   │   ├── PasswordInput.tsx
    │   │   ├── ProgramCard.tsx
    │   │   ├── Select.tsx
    │   │   ├── TextArea.tsx
    │   │   ├── TopBar.tsx
    │   │   └── navigasi.ts
    │   └── laporan
    │       ├── LaporanDetailView.tsx
    │       ├── LaporanFormView.tsx
    │       ├── LaporanMasukView.tsx
    │       └── LaporanVerifikasiView.tsx
    └── vitest.config.ts
```

**Penting:** setiap rilis milestone baru hanya akan **menambah** folder/file baru. Asisten tidak akan mengubah isi folder milestone yang sudah rilis sebelumnya. Ini artinya kelompok bebas mengedit apapun yang sudah dikerjakan di folder-folder lama tanpa takut tertimpa saat sync.

---

## 3. Initial Setup

Lakukan ini **sekali saja** di awal.

1. **Fork repository.** Satu orang perwakilan kelompok membuka repository original [IF2150-RPL](https://github.com/RPL-24/IF2150-RPL), klik tombol **Fork**, lalu pilih tujuan fork ke **akun pribadi** perwakilan tersebut.
2. **Ganti nama repository hasil fork.** Repository original bernama `IF2150-RPL`. Saat melakukan fork, ganti nama repository menjadi format `IF2150-RPL-KXX-GYY`, dengan `XX` adalah nomor kelas (contoh: `01`) dan `YY` adalah nomor kelompok (contoh: `10`). Misalnya, kelas 01 kelompok 10 akan menamai repo fork-nya `IF2150-RPL-K01-G10`.
3. **Set repo menjadi public, lalu invite anggota kelompok.** Perwakilan yang fork tadi otomatis jadi owner dari repo fork tersebut. Repo hasil fork **wajib public**: buka **Settings → General → Danger Zone → Change visibility**, lalu ubah ke **Public**. Selain itu, tetap invite semua anggota kelompok sebagai collaborator supaya bisa push/commit langsung: masuk ke **Settings → Collaborators and teams → Add people**, lalu invite satu per satu. Setiap anggota hanya akan punya akses commit ke repo fork kelompok sendiri, bukan ke repo kelompok lain atau ke organisasi.
4. **Aktifkan notifikasi rilis.** Buka repository original (bukan fork kalian), klik tombol **Watch → Custom**, lalu centang **Releases**. Dengan ini kalian akan otomatis dapat notifikasi setiap kali asisten merilis tubes baru, tanpa perlu bolak-balik cek manual.

---

## 4. Working Rules

- **Secara default, kerjakan progres langsung di branch `main`** pada repo fork kelompok, ini bukan keharusan teknis, hanya disederhanakan supaya tidak ada risiko salah push ke branch yang salah. Kelompok yang sudah nyaman dengan git boleh memakai branch working tambahan, asal branch `main` tetap dijaga untuk menerima update sync dari asisten, dan progres di branch tambahan rutin digabungkan (merge) dari `main` setiap kali selesai sync.
- **Jangan mengubah atau menghapus** folder milestone yang sudah pernah dirilis sebelumnya, supaya proses sync ke depannya tetap lancar.
- Commit sesering mungkin dengan message yang jelas. Riwayat commit yang rapi memudahkan asisten memahami progres kelompok saat menilai. Kelompok bisa mengikuti standar [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) untuk format commit messages yang lebih terstruktur.

---

## 5. Receiving New Milestone Updates (Sync)

Saat asisten merilis milestone baru, perhatikan yang perlu kelompok lakukan.

1. Buka `main` branch repository **fork** kelompok. Akan muncul keterangan _"This branch is X commits behind"_. 
2. Klik tombol **Sync fork**, lalu **Update branch**. Materi milestone baru akan otomatis masuk ke branch `main` fork kelompok, tergabung dengan progres yang sudah kelompok kerjakan.
3. Jika proses sync berhasil tanpa keterangan konflik, kelompok bisa langsung lanjut kerja seperti biasa.
4. Jika GitHub meminta kelompok membuat **pull request** untuk resolve konflik, artinya ada bentrokan file, segera hubungi asisten sebelum mencoba resolve sendiri, terutama jika belum familiar dengan proses merge conflict.

---

## 6. Submission Mechanism per Milestone

Pengumpulan milestone **tidak dilihat dari commit terakhir**, melainkan dari **tag** yang kelompok buat sebelum deadline.

Cara membuat tag submission:

1. Pastikan semua perubahan untuk milestone ini sudah di-commit ke branch `main` fork kelompok.
2. Buka tab **Releases** di repo fork kelompok → **Draft a new release**.
3. Di bagian tag, ketik tag baru dengan format `vX.Y`, dengan `X` adalah nomor milestone pengerjaan tugas dan `Y` adalah nomor revisi pada milestone tersebut.
4. Pastikan target rilis mengarah ke branch `main` (commit terakhir kelompok saat itu).

Contoh penggunaan format tag:

| Tag | Keterangan |
| :--- | :--- |
| `v1.0` | Release milestone pertama |
| `v1.1` | Revisi pertama pada milestone pertama |
| `v2.0` | Release milestone kedua |

Khusus pengumpulan final, kelompok **WAJIB** membuat release dengan format tag di atas.

Tag inilah yang jadi bukti resmi apa yang kelompok kumpulkan untuk milestone tersebut. Ulangi langkah ini di setiap deadline milestone.

---

<br>
<p align="center">
	<text>Selamat mengerjakan!</text>
	<br>
	<text>Tim Asisten RPL 2024</text>
</p>