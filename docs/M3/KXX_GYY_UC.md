<h1>
IF2150 REKAYASA PERANGKAT LUNAK
<br>
TUGAS 3
<br>
USE CASE & SCENARIO USE CASE
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

## Daftar Perubahan

| Revisi | Deskripsi |
| :--- | :--- |
| *A* | *Deskripsikan perubahan yang dilakukan dari dokumen sebelumnya pada dokumen ini. Jika tidak terdapat perubahan, harap kosongkan tabel.* |
| *B* |  |
| *C* |  |
| ... |  |

<br>
<br>

# BAB 1: Deskripsi Perangkat Lunak
Bagian ini boleh disalin dari 1.1 Deskripsi Umum Sistem pada dokumen *Requirement Gathering*. Pastikan isinya memang membahas deskripsi perangkat lunak kalian, seperti fitur, fungsi utama, dan cakupan sistem.

RekanBumi adalah platform web yang mempertemukan masyarakat umum dengan lembaga lingkungan terverifikasi untuk memfasilitasi aksi nyata lewat program "Jaga Alam" dan "Jaga Iklim". Dari sudut pandang pengguna, relawan mengekspektasikan kemudahan mencari kegiatan terstruktur yang sesuai preferensi lokasi dan waktu, sementara lembaga membutuhkan sarana untuk meningkatkan visibilitas program serta mengelola perekrutan relawan secara transparan. Alur kerja sistem berjalan mulai dari verifikasi legalitas lembaga dan kurasi program oleh Admin, dilanjutkan dengan pencarian serta pendaftaran kegiatan oleh relawan, hingga pelaksanaan lapangan dan pencatatan riwayat aksi secara otomatis. Solusi ini diharapkan dapat menjembatani tingginya kepedulian masyarakat dengan sarana kontribusi yang jelas guna mempercepat pencapaian SDG 13 dan SDG 15 di Indonesia.


---

# BAB 2: Kebutuhan Fungsional (KF)
Salin ulang **seluruh Kebutuhan Fungsional (KF)** yang telah didefinisikan pada dokumen *Requirement Gathering*. Tabel ini menjadi acuan *traceability*, dimana setiap Use Case pada BAB 3 wajib ditelusuri ke satu atau lebih ID KF di tabel ini, dan sebaliknya setiap KF idealnya tercakup oleh minimal satu Use Case. Pastikan juga sudah menggunakan **format EARS** dalam penulisan KF.

| ID KF | Kebutuhan | Penjelasan |
| :--- | :--- | :--- |
| *KF01* | *Menyediakan area upload drag-and-drop* | *Perangkat lunak dapat menyediakan area pengunggahan file yang mendukung metode drag-and-drop* |
| *KF02* | *Menerima dokumen melalui upload dan drag-and-drop* | *Perangkat lunak dapat menerima dokumen yang diunggah melalui fitur upload dan drag-and-drop* |
| *KF03* | *Menampilkan notifikasi hasil unggah file* | *Perangkat lunak dapat menampilkan pemberitahuan mengenai keberhasilan atau kegagalan proses pengunggahan file* |
| *KF04* | *Menyediakan kolom tautan situs web lembaga* | *Perangkat lunak dapat menyediakan kolom untuk memasukkan tautan situs web resmi lembaga pada deskripsi program* |
| *KF05* | *Menampilkan tautan situs web lembaga* | *Perangkat lunak dapat menampilkan tautan situs web resmi lembaga pada halaman informasi program* |
| *KF06* | *Menyimpan tautan situs web lembaga* | *Perangkat lunak dapat menyimpan tautan situs web resmi yang diberikan oleh lembaga sebagai bagian dari informasi program* |
| *KF07* | *Menyediakan kolom pencarian keyword* | *Perangkat lunak dapat menyediakan kolom pencarian untuk menerima keyword dari pengguna* |
| *KF08* | *Menampilkan program sesuai keyword pencarian* | *Perangkat lunak dapat menampilkan program yang sesuai dengan keyword pencarian pengguna* |
| *KF09* | *Menyediakan filter kategori Jaga Alam dan Jaga Iklim* | *Perangkat lunak dapat menyediakan pilihan kategori "Jaga Alam" dan "Jaga Iklim" untuk memfilter program* |
| *KF10* | *Menampilkan program berdasarkan kategori terpilih* | *Perangkat lunak dapat menampilkan program berdasarkan kategori yang dipilih pengguna* |
| *KF11* | *Mendeteksi kuota relawan program terpenuhi* | *Perangkat lunak dapat mendeteksi ketika kuota relawan suatu program telah terpenuhi* |
| *KF12* | *Menolak pendaftaran relawan saat kuota penuh* | *Perangkat lunak dapat menolak permohonan pendaftaran relawan apabila kuota program telah terpenuhi* |
| *KF13* | *Mewajibkan login sebelum pendaftaran program* | *Perangkat lunak dapat mengharuskan calon relawan untuk melakukan login sebelum mendaftarkan diri pada suatu program* |
| *KF14* | *Menyediakan kolom keterampilan dan ketersediaan waktu* | *Perangkat lunak dapat menyediakan kolom untuk memasukkan catatan keterampilan atau ketersediaan waktu calon relawan* |
| *KF15* | *Menyimpan catatan keterampilan dan ketersediaan waktu* | *Perangkat lunak dapat menyimpan catatan keterampilan atau ketersediaan waktu yang diberikan calon relawan pada permohonan pendaftaran* |
| *KF16* | *Menampilkan daftar calon pendaftar ke inisiator* | *Perangkat lunak dapat menampilkan daftar calon pendaftar beserta data dasar yang diperlukan kepada inisiator program* |
| *KF17* | *Mengirim notifikasi status pendaftaran relawan* | *Perangkat lunak dapat mengirimkan notifikasi kepada relawan mengenai status pendaftarannya* |
| *KF18* | *Menyediakan pilihan status Diterima dan Ditolak* | *Perangkat lunak dapat menyediakan pilihan status "Diterima" dan "Ditolak" bagi inisiator dalam menentukan hasil seleksi calon relawan* |
| *KF19* | *Menyimpan status seleksi calon relawan* | *Perangkat lunak dapat menyimpan status seleksi calon relawan yang ditetapkan oleh inisiator* |
| *KF20* | *Memeriksa kelengkapan data diri calon relawan* | *Perangkat lunak dapat memeriksa kelengkapan data diri calon relawan sebelum permohonan pendaftaran dikirimkan* |
| *KF21* | *Memeriksa status verifikasi akun calon relawan* | *Perangkat lunak dapat memeriksa status verifikasi akun calon relawan sebelum permohonan pendaftaran dikirimkan* |
| *KF22* | *Menyediakan fitur check-in relawan* | *Perangkat lunak dapat menyediakan fitur check-in bagi relawan yang telah diterima pada suatu program* |
| *KF23* | *Mencatat waktu check-in relawan* | *Perangkat lunak dapat mencatat waktu check-in relawan ketika melakukan konfirmasi kehadiran* |
| *KF24* | *Membatasi check-in hanya untuk relawan diterima* | *Perangkat lunak dapat membatasi fitur check-in hanya kepada relawan yang telah diterima pada program terkait* |
| *KF25* | *Membatasi akses check-in berdasarkan rentang waktu* | *Perangkat lunak dapat membatasi akses fitur check-in berdasarkan rentang waktu pelaksanaan kegiatan* |
| *KF26* | *Menolak check-in di luar rentang waktu kegiatan* | *Perangkat lunak dapat menolak proses check-in yang dilakukan di luar rentang waktu pelaksanaan kegiatan* |
| *KF27* | *Menyediakan fitur unggah dokumentasi akhir kegiatan* | *Perangkat lunak dapat menyediakan fitur untuk mengunggah dokumentasi akhir kegiatan* |
| *KF28* | *Menyediakan tombol ubah status kegiatan menjadi Selesai* | *Perangkat lunak dapat menyediakan tombol untuk mengubah status kegiatan menjadi "Selesai"* |
| *KF29* | *Menambahkan program selesai ke riwayat portofolio* | *Perangkat lunak dapat secara otomatis menambahkan program yang telah selesai ke dalam riwayat portofolio relawan* |
| *KF30* | *Mencatat dan memperbarui akumulasi jam aksi relawan* | *Perangkat lunak dapat secara otomatis mencatat dan memperbarui akumulasi jam aksi relawan setelah kegiatan berstatus selesai* |
| *KF31* | *Menyimpan ringkasan capaian dampak lingkungan* | *Perangkat lunak dapat menyimpan ringkasan capaian dampak lingkungan dari setiap program* |
| *KF32* | *Menampilkan ringkasan capaian dampak lingkungan* | *Perangkat lunak dapat menampilkan ringkasan capaian dampak lingkungan pada halaman publik program* |

<sub> ***Catatan***: *Jika ada KF dari ML2 yang berubah/bertambah/dihapus setelah asistensi, pastikan tabel ini konsisten dengan versi KF terbaru sebelum dikumpulkan.*
<sub>

---

# BAB 3: Model Use Case

## 3.1 Identifikasi Aktor
Daftarkan seluruh aktor yang terlibat dalam use case yang akan dimodelkan. Aktor berupa pengguna manusia yang berinteraksi dengan solusi. Perlu diperhatikan bahwa Admin/Developer/ Pihak Eksternal lain yang bisa diotomisasi, tidak perlu dijadikan aktor.

| Aktor | Deskripsi |
| :--- | :--- |
| *Inisiator Program (Lembaga/Komunitas)* | *Organisasi atau komunitas lingkungan yang membuat program aksi, menentukan kebutuhan kuota relawan, melakukan seleksi pendaftar, dan mencatat laporan kegiatan pasca program* |
| *Relawan (Masyarakat Umum)* | *Individu yang mencari kegiatan kerelawanan, mendaftarkan diri, menghadiri kegiatan di lokasi, dan menerima catatan riwayat aksi yang telah diselesaikan* |
| *Admin/Verifikator Platform* | *Pengelola sistem RekanBumi yang bertugas memverifikasi identitas dan legalitas inisiator program serta meninjau kelayakan program sebelum diterbitkan ke publik* |



## 3.2 Identifikasi Use Case
Identifikasi seluruh use case yang mencakup Kebutuhan Fungsional pada BAB 2. Satu use case boleh mencakup lebih dari satu KF, dan sebaliknya satu KF boleh muncul di lebih dari satu use case bila memang relevan.

| ID UC | Nama Use Case | Deskripsi Singkat | Aktor Terlibat | ID KF Terkait |
| :--- | :--- | :--- | :--- | :--- |
| *UC01* | *Melakukan Pembayaran Digital* | *Pelanggan memilih metode pembayaran dan menyelesaikan transaksi.* | *Pelanggan* | *KF01, KF02* |
| *UC02* | *Memverifikasi Status Pembayaran* | *Kasir mengecek status transaksi pelanggan sebelum menyerahkan barang.* | *Kasir* | *KF03* |
| *...* | *...* | *...* | *...* | *...* |

## 3.3 Use Case Diagram
Buatlah **satu** use case diagram yang mencakup seluruh aktor dan use case. Sertakan relasi *include*/*extend* apabila ada use case yang saling bergantung.
<br>
<p align="center">
<img alt="Contoh Activity Diagram" src="./assets/diagram/contoh-uc-diagram.webp" width="70%">
</p>
<p align="center">
<i>Gambar 1. Contoh Use Case Diagram</i>
</p>
<br>

Hal-hal yang perlu diperhatikan dalam pembuatan use case diagram:
- Pastikan notasi UML use case (aktor, oval use case, garis asosiasi, *include/extend*) digambar dengan benar.
- Seluruh aktor dan use case yang telah didefinisikan harus muncul di diagram, tidak ada yang terlewat maupun berlebih.
- Hindari garis yang saling bersilangan tanpa alasan jelas, susun diagram agar mudah dibaca.
- Hindari istilah solusi teknis (misalnya nama tabel database, nama endpoint API) muncul di dalam diagram use case karena use case menjelaskan *interaksi fungsional*, bukan detail implementasi.

## 3.4 Skenario Use Case
Buat skenario untuk **setiap** use case yang telah diidentifikasi pada 3.2. Setiap skenario dapat terdiri dari dua jenis alur:
- **Skenario Normal**: alur utama (*happy path*) di mana interaksi aktor-sistem berjalan lancar tanpa kendala hingga tujuan use case tercapai.
- **Skenario Alternatif**: alur percabangan dari skenario normal, misalnya kondisi gagal, input tidak valid, atau pilihan lain yang tersedia bagi aktor. Boleh ada lebih dari satu skenario alternatif per use case jika ada beberapa titik percabangan berbeda.

Format tabel skenario: kolom **Aksi Aktor** berisi apa yang dilakukan/diinput aktor, kolom **Reaksi Perangkat Lunak** berisi respons sistem terhadap aksi tersebut secara **berurutan** (nomor langkah harus berpasangan/selaras antar dua kolom).


### 3.4.1 Skenario UC01

**Nama Use Case:** *Melakukan Pembayaran Digital*

**Skenario Normal**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Pelanggan memilih menu checkout* | *Sistem menampilkan ringkasan pesanan dan pilihan metode pembayaran* |
| 2 | *Pelanggan memilih metode pembayaran (misal: e-wallet)* | *Sistem mengarahkan pelanggan ke halaman konfirmasi e-wallet* |
| 3 | *Pelanggan mengonfirmasi pembayaran* | *Sistem menerima respons pembayaran berhasil, memperbarui status pesanan menjadi "Lunas", dan menampilkan notifikasi pembayaran berhasil* |


<br>

**Skenario Alternatif 1: Otorisasi Pembayaran Gagal**


| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Pelanggan memilih menu checkout* | *Sistem menampilkan ringkasan pesanan dan pilihan metode pembayaran* |
| 2 | *Pelanggan memilih metode pembayaran (misal: e-wallet)* | *Sistem mengarahkan pelanggan ke halaman konfirmasi e-wallet* |
| 3 | *Pelanggan mengonfirmasi pembayaran* | *Sistem menerima respons pembayaran gagal (misal: saldo tidak cukup). Sistem menampilkan pesan error dan meminta pelanggan memilih metode pembayaran lain* |
| 4 | *Pelanggan memilih metode pembayaran lain* | *Sistem kembali ke langkah 2 skenario normal* |

### 3.4.2 Skenario UC02

**Nama Use Case:** *Memverifikasi Status Pembayaran*

**Skenario Normal**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Kasir memasukkan ID Pesanan pelanggan* | *Sistem menampilkan status pembayaran ("Lunas") beserta detail transaksi* |

<br>

**Skenario Alternatif 1: ID Pesanan Tidak Ditemukan**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | *Kasir memasukkan ID Pesanan yang salah/tidak ada* | *Sistem menampilkan pesan "ID Pesanan tidak ditemukan" dan meminta kasir memasukkan ulang* |


<sub>*Lanjutkanlah pola 3.4.x ini untuk setiap ID UC yang telah diidentifikasi pada 3.2, sampai seluruh use case memiliki skenario normal dan skenario alternatif (tidak usah dibuat jika use case tersebut memang tidak memiliki skenario alternatif).*<sub>
