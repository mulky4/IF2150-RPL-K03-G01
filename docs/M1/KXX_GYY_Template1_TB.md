<h1>
IF2150 REKAYASA PERANGKAT LUNAK
<br>
TUGAS 1
<br>
TOPIC BRAINSTORMING
</h1>
<br>

## RekanBumi

### Untuk: Stefani Angeline Oroh

Dipersiapkan oleh:
| Informasi | Keterangan |
| --- | --- |
| Kelas | K03 |
| Kelompok | G01  |

| NIM | Nama |
|---|---|
| 13525018 | Avicenna Ananda Musthafa |
| 13525045 | Ribka Kaylena Sanjaya |
| 13525063 | Kairenzo Vemil |
| 13525069 | Mulky Siraj Firizqi |
| 13525144 | Three Gie Gendhis Sekar Ayoe Jatmiko |
---

<br>
<br>

# BAB 1: Analisis Permasalahan

## 1.1 Latar Belakang Masalah
Tuliskan deskripsi permasalahan yang kalian pilih secara naratif dan spesifik. Tambahkan keterkaitan permasalahan tersebut dengan Tujuan Pembangunan Berkelanjutan (SDGs) yang telah disepakati. Dukung argumen kalian dengan data yang kredibel, serta jelaskan urgensi mengapa masalah ini perlu dan layak untuk segera diselesaikan.

## 1.2 Analisis Kondisi Saat Ini
Lakukan analisis terhadap proses yang berjalan saat ini di dunia nyata, baik itu sistem lama ataupun solusi yang sudah ada. Soroti kesenjangan atau celah dari kondisi tersebut yang nantinya akan diselesaikan oleh perangkat lunak kalian.

---

# BAB 2: Analisis Solusi

## 2.1 Deskripsi Perangkat Lunak
Abstraksikan solusi perangkat lunak yang diusulkan dari sudut pandang pengguna. Jelaskan target platform yang akan digunakan (misalnya: desktop application) beserta alasan pemilihannya. Deskripsikan juga nilai unik (inovasi inti) dari perangkat lunak kalian dan apa yang membedakannya dari solusi yang sudah ada.

## 2.2 Asumsi dan Batasan
Definisikan secara tegas asumsi (baik teknis maupun dari sisi pengguna) yang menjadi dasar pengembangan. Tuliskan batasan seperti regulasi/hukum, keterbatasan sumber daya, dan ruang lingkup solusi.

---

# BAB 3: Spesifikasi Kebutuhan dan Proses Bisnis

### 3.1 Identifikasi Aktor

| Aktor | Deskripsi |
| :--- | :--- |
| **Inisiator Program (Lembaga/Komunitas)** | Organisasi atau komunitas lingkungan yang membuat program aksi, menentukan kebutuhan kuota relawan, melakukan seleksi pendaftar, dan mencatat laporan kegiatan pasca program. |
| **Relawan (Masyarakat Umum)** | Individu yang mencari kegiatan kerelawanan, mendaftarkan diri, menghadiri kegiatan di lokasi, dan menerima catatan riwayat aksi yang telah diselesaikan. |
| **Admin/Verifikator Platform** | Pengelola sistem RekanBumi yang bertugas memverifikasi identitas dan legalitas inisiator program serta meninjau kelayakan program sebelum diterbitkan ke publik. |

### 3.2 Kebutuhan Pengguna Awal

| ID | Aktor | Kebutuhan / Aktivitas | Tujuan / Nilai |
| :--- | :--- | :--- | :--- |
| **US-01** | Inisiator Program | Mendaftarkan profil lembaga/komunitas beserta dokumen legalitas dan identitas penanggung jawab. | Memperoleh akses terverifikasi untuk mempublikasikan kegiatan di platform. |
| **US-02** | Admin Platform | Memeriksa dan memvalidasi pengajuan program aksi lingkungan dari inisiator. | Memastikan kegiatan aman, layak, dan bebas dari indikasi penyalahgunaan sebelum tampil di publik. |
| **US-03** | Inisiator Program | Membuat kegiatan baru dengan menetapkan kategori (Jaga Alam atau Jaga Iklim), deskripsi tugas, lokasi, tanggal, dan kuota relawan. | Membuka pendaftaran relawan lapangan dengan rincian kegiatan yang terstruktur. |
| **US-04** | Relawan | Mencari dan memfilter kegiatan berdasarkan aksi (alam atau iklim), lokasi kota, dan jadwal ketersediaan. | Menemukan program kesukarelawanan yang sesuai dengan minat, domisili, dan jadwal. |
| **US-05** | Relawan | Mengajukan pendaftaran sebagai relawan pada program yang dipilih dengan menyertakan catatan komitmen/keterampilan. | Mendapatkan slot relawan pada program aksi yang diminati. |
| **US-06** | Inisiator Program | Meninjau daftar pemohon relawan dan mengubah status pendaftaran (diterima/ditolak). | Memastikan kapasitas kuota terpenuhi oleh relawan yang siap berkontribusi. |
| **US-07** | Relawan | Melakukan konfirmasi kehadiran saat pelaksanaan kegiatan di lapangan. | Memverifikasi kehadiran untuk pencatatan riwayat kerelawanan. |
| **US-08** | Inisiator Program | Mengunggah log dokumentasi akhir kegiatan (foto bukti aksi, ringkasan pohon ditanam/satwa ditangani/sampah terkumpul). | Menutup status program dan memperbarui laporan dampak publik secara transparan. |

## 3.3 Deskripsi Aktivitas
Buatlah daftar seluruh aktivitas yang terdapat dalam sistem solusi, lengkap dengan ID dan penjelasan. Telusuri hubungan aktivitas tersebut dengan *user story* yang sudah dituliskan sebelumnya. Bisa dibuat dalam bentuk tabel.

| ID | Aktivitas | Penjelasan | ID User Story |
| :--- | :--- | :--- | :--- |
| A01 | Registrasi & Pengajuan Profil Inisiator | Inisiator mengisi formulir profil komunitas dan mengunggah dokumen identitas/legalitas penanggung jawab untuk diverifikasi. | US-01 |
| A02 | Verifikasi Akun Inisiator | Admin platform meninjau keabsahan berkas identitas inisiator dan menyetujui status akun mitra. | US-01, US-02 |
| A03 | Pembuatan & Pengajuan Draf Program | Inisiator menyusun rincian kegiatan baru (pilar Jaga Alam/Iklim, jadwal, lokasi, deskripsi tugas, dan kuota relawan) lalu mengajukannya ke sistem. | US-03 |
| A04 | Kurasi & Publikasi Program | Admin platform memeriksa kelayakan isi program aksi dan menerbitkannya ke katalog program publik. | US-02 |
| A05 | Pencarian & Eksplorasi Program | Relawan menjelajahi katalog kegiatan menggunakan filter pilar aksi (alam/iklim), lokasi kota, dan jadwal ketersediaan. | US-04 |
| A06 | Pendaftaran Slot Relawan | Relawan memilih program, melampirkan catatan keterampilan atau komitmen waktu, dan mengirimkan permohonan ke inisiator. | US-05 |
| A07 | Seleksi & Konfirmasi Pendaftar | Inisiator meninjau daftar calon relawan dan menetapkan status pendaftaran (Diterima / Ditolak) sesuai kapasitas kuota. | US-06 |
| A08 | Presensi Lapangan (Check-in) | Relawan melakukan konfirmasi kehadiran fisik saat hari pelaksanaan kegiatan di lokasi melalui sistem. | US-07 |
| A09 | Pengunggahan Dokumentasi Akhir | Inisiator mengunggah laporan hasil aksi (foto dokumentasi lapangan, catatan capaian bibit/satwa/sampah) dan menutup status kegiatan. | US-08 |
| A10 | Pembaruan Portofolio Dampak | Sistem secara otomatis mencatat riwayat jam aksi ke profil relawan dan mengarsipkan capaian lingkungan ke halaman publik. | US-07, US-08 |

## 3.4 Model Proses Bisnis
Buatlah *Activity Diagram* atau *Swimlane Diagram* yang menunjukkan alur kerja proses bisnis dari sistem solusi. Diagram ini harus memvisualisasikan bagaimana alur operasional di dunia nyata berjalan lebih efisien dengan adanya interaksi antara aktor (yang didefinisikan pada poin 3.1) dan sistem perangkat lunak. Perhatikan notasi yang digunakan dalam pembuatannya.

<br>

<p align="center">
<img alt="Activity Diagram Alur Pendaftaran & Verifikasi Inisiator" src="./assets/diagram/Activity Diagram Alur Pendaftaran & Verifikasi Inisiator.png" width="70%">
</p>
<p align="center">
<i>Gambar 1. Activity Diagram Alur Pendaftaran & Verifikasi Inisiator</i>
</p>

<br>

<p align="center">
<img alt="Activity Diagram Alur Manajemen & Publikasi Program" src="./assets/diagram/Activity Diagram Alur Manajemen & Publikasi Program.png" width="70%">
</p>
<p align="center">
<i>Gambar 2. Activity Diagram Alur Manajemen & Publikasi Program</i>
</p>

<br>

<p align="center">
<img alt="Activity Diagram Alur Eksplorasi & Rekrutmen Relawan" src="./assets/diagram/Activity Diagram Alur Eksplorasi & Rekrutmen Relawan.png" width="70%">
</p>
<p align="center">
<i>Gambar 3. Activity Diagram Alur Eksplorasi & Rekrutmen Relawan</i>
</p>

<br>

<p align="center">
<img alt="Activity Diagram Alur Eksekusi & Pelaporan Kegiatan" src="./assets/diagram/Activity Diagram Alur Eksekusi & Pelaporan Kegiatan.png" width="70%">
</p>
<p align="center">
<i>Gambar 4. Activity Diagram Alur Eksekusi & Pelaporan Kegiatan</i>
</p>

<br>

# Referensi
- Diagram UML: https://www.drawio.com/, https://staruml.io/
