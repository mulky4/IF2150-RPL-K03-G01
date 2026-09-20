<h1>
IF2150 REKAYASA PERANGKAT LUNAK
<br>
TUGAS 4
<br>
CLASS DIAGRAM
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

RekanBumi adalah platform web yang mempertemukan masyarakat umum dengan lembaga lingkungan terverifikasi untuk memfasilitasi aksi nyata lewat program "Jaga Alam" dan "Jaga Iklim". Dari sudut pandang pengguna, relawan mengekspektasikan kemudahan mencari kegiatan terstruktur yang sesuai preferensi lokasi dan waktu, sementara lembaga membutuhkan sarana untuk meningkatkan visibilitas program serta mengelola perekrutan relawan secara transparan. Alur kerja sistem berjalan mulai dari verifikasi legalitas lembaga dan kurasi program oleh Admin, dilanjutkan dengan pencarian serta pendaftaran kegiatan oleh relawan, hingga pelaksanaan lapangan dan pencatatan riwayat aksi secara otomatis. Solusi ini diharapkan dapat menjembatani tingginya kepedulian masyarakat dengan sarana kontribusi yang jelas guna mempercepat pencapaian SDG 13 dan SDG 15 di Indonesia.

> *Sistem adalah kesatuan utuh antara perangkat lunak, pengguna, perangkat keras, dan proses bisnis (urutan langkah logis yang dilakukan di dunia nyata untuk menyelesaikan suatu pekerjaan atau mencapai tujuan tertentu).*

# BAB 2: Kebutuhan Fungsional

## 2.1 Kebutuhan Fungsional

| ID KF | ID Kebutuhan | Penjelasan |
| :--- | :--- | :--- |
| KF01 | R02 | Perangkat lunak dapat menerima dokumen yang diunggah melalui fitur *upload* dan *drag-and-drop* |
| KF02 | R05 | Perangkat lunak dapat menyimpan tautan situs web resmi yang diberikan oleh lembaga sebagai bagian dari informasi program |
| KF03 | R06 | Perangkat lunak dapat menyediakan kolom pencarian untuk menerima keyword dari pengguna |
| KF04 | R07 | Perangkat lunak dapat menyediakan pilihan kategori “Jaga Alam” dan “Jaga Iklim” untuk memfilter program |
| KF05 | R08 | Perangkat lunak dapat menolak permohonan pendaftaran relawan apabila kuota program telah terpenuhi |
| KF06 | R09 | Perangkat lunak dapat mengharuskan calon relawan untuk melakukan login sebelum mendaftarkan diri pada suatu program |
| KF07 | R10 | Perangkat lunak dapat menyimpan catatan keterampilan atau ketersediaan waktu yang diberikan calon relawan pada permohonan pendaftaran |
| KF08 | R13 | Perangkat lunak dapat mengirimkan notifikasi kepada relawan mengenai status pendaftarannya |
| KF09 | R14 | Perangkat lunak dapat menyediakan pilihan dan menyimpan status “Diterima” dan “Ditolak” untuk setiap calon relawan |
| KF10 | R15 | Perangkat lunak dapat memeriksa kelengkapan dan status verifikasi data diri calon relawan sebelum permohonan pendaftaran dikirimkan |
| KF11 | R17 | Perangkat lunak dapat menyediakan fitur check-in dan mencatat waktu kehadiran relawan pada suatu program |
| KF12 | R18 | Perangkat lunak dapat membatasi akses fitur check-in berdasarkan status relawan dan waktu pelaksanaan kegiatan |
| KF13 | R20 | Perangkat lunak dapat menyediakan fitur untuk mengunggah dokumentasi akhir kegiatan dan mengubah status kegiatan menjadi selesai |
| KF14 | R24 | Perangkat lunak dapat secara otomatis mencatat dan memperbarui akumulasi jam aksi relawan setelah kegiatan berstatus selesai |
| KF15 | R25 | Perangkat lunak dapat menyimpan ringkasan capaian dampak lingkungan dari setiap program |

Tabel 2.1. Daftar Kebutuhan Fungsional


---

# BAB 3: Model Use Case

## 3.1 Identifikasi Aktor
Daftarkan seluruh aktor yang terlibat dalam use case yang akan dimodelkan. Aktor berupa pengguna manusia yang berinteraksi dengan solusi. Perlu diperhatikan bahwa Admin/Developer/ Pihak Eksternal lain yang bisa diotomisasi, tidak perlu dijadikan aktor.

| Aktor | Deskripsi |
| :--- | :--- |
| Inisiator Program (Lembaga/Komunitas) | Pengguna ini bertindak sebagai lembaga atau komunitas lingkungan yang bertanggung jawab untuk membuat program aksi, menentukan kebutuhan kuota relawan, melakukan seleksi pendaftar, dan mencatat laporan kegiatan pasca program. |
| Relawan (Masyarakat Umum) | Pengguna ini bertindak sebagai individu dari masyarakat umum yang mencari kegiatan kerelawanan, mendaftarkan diri, menghadiri kegiatan di lokasi, dan menerima catatan riwayat aksi yang telah diselesaikan. |
| Verifikator (Admin Platftom) | Pengguna ini bertindak sebagai pengelola sistem RekanBumi yang bertugas untuk memverifikasi identitas dan legalitas inisiator program serta meninjau kelayakan program sebelum diterbitkan ke publik. |

## 3.2 Identifikasi Use Case

Use case berfungsi untuk mendeskripsikan interaksi aktor-aktor yang terlibat dengan sistem.
| ID UC | Nama Use Case | Deskripsi Singkat | Aktor Terlibat | ID KF Terkait |
| :--- | :--- | :--- | :--- | :--- |
| UC01 | Daftar program | Inisiator program mendaftarkan programnya ke web dan melampirkan dokumen yang diperlukan, dan relawan melampirkan dokumen yang diperlukan untuk daftar program sekaligus akun.| Inisiator Program, Relawan| KF01, KF10 |
| UC02 | *Login* akun | Relawan masuk ke akun yang telah didaftarkan sebelumnya | Relawan | KF06 |
| UC03 | Mencari program | Relawan mencari program melalui kolom pencarian atau fitur filter. | Relawan | KF03, KF04 |
| UC04 | Mengunjungi situs program | Relawan mengunjungi situs web program yang terlampir pada tiap deskripsi untuk melihat detail program. | Relawan | KF02 |
| UC05 | Menyeleksi calon relawan pendaftar | Inisiator program menyeleksi relawan yang mendaftar program.| Inisiator program | KF05, KF07 |
| UC06 | Konfirmasi status pendaftaran | Inisiator program, Relawan | Inisiator program, Relawan | KF08, KF09 |
| UC07 | Memperbarui status program | Inisiator program menyatakan status keberlangsungan program, dan verifikator mengonfirmasinya. | Inisiator program, Verifikator | KF13, KF15 |
| UC08 | Konfirmasi kehadiran program | Relawan melampirkan bukti kehadiran program yang didaftarkannya.|  Relawan | KF11, KF12 |
| UC09 | Memperbarui status akun relawan | Verifikator memperbarui status kontribusi relawan pada akunnya. | Verifikator, Relawan | KF14 |



## 3.3 Use Case Diagram
Buatlah diagram use case keseluruhan berdasarkan identifikasi use case beserta aktor yang melakukan use case tersebut. Perhatikan garis `<<extend>>` dan `<<include>>`.

Pada bagian ini, Anda diperbolehkan untuk menyalin dari dokumen sebelumnya.

<br>
<p align="center">
<img alt="Use Case Diagram" src="../M4/assets/diagram/contoh-uc-diagram.webp" width="80%">
</p>
<p align="center">
<i>Gambar 1. Use Case Diagram</i>
</p>
<br>

## 3.4 Skenario Use Case
Salin ulang skenario **setiap** use case (skenario normal dan alternatif) dari dokumen *Use Case & Scenario Use Case*. Skenario ini menjadi dasar penentuan atribut dan metode/operasi kelas pada BAB 4.

Pada bagian ini, Anda diperbolehkan untuk menyalin dari dokumen sebelumnya.

### 3.4.1 Skenario UC01

**Nama Use Case:** Daftar program

**Skenario Normal**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | Aktor (Inisiator Program atau Relawan) mengakses halaman pendaftaran dan mengisi formulir data | Sistem menampilkan formulir pendaftaran beserta area unggah dokumen |
| 2 | Aktor memasukkan dokumen yang diperlukan ke dalam area unggah | Sistem menerima dokumen yang diunggah melalui fitur upload dan drag-and-drop |
| 3 | Aktor menekan tombol kirim pendaftaran | Sistem memeriksa kelengkapan dan status verifikasi data, memproses pendaftaran, menyimpan data, dan menampilkan notifikasi keberhasilan |

<br>

**Skenario Alternatif 1: Data Diri Relawan Tidak Lengkap**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | Aktor (Inisiator Program atau Relawan) mengakses halaman pendaftaran dan mengisi formulir data | Sistem menampilkan formulir pendaftaran beserta area unggah dokumen |
| 2 | Aktor memasukkan dokumen yang diperlukan ke dalam area unggah | Sistem menerima dokumen yang diunggah melalui fitur upload dan drag-and-drop |
| 3 | Aktor menekan tombol kirim pendaftaran | Sistem memeriksa kelengkapan data, mendeteksi data tidak lengkap, membatalkan pengiriman, dan menampilkan pesan peringatan untuk melengkapi data |

### 3.4.3 Skenario UC03

**Nama Use Case:** Mencari program

**Skenario Normal**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | Relawan membuka halaman eksplorasi program | Sistem menampilkan daftar program, kolom pencarian, dan pilihan kategori Jaga Alam dan Jaga Iklim |
| 2 | Relawan mengetikkan kata kunci pada kolom pencarian dan memilih salah satu kategori program | Sistem memproses masukan, memfilter, dan menampilkan daftar program yang cocok dengan pencarian |

<br>

**Skenario Alternatif 1: Program Tidak Ditemukan**

| No | Aksi Aktor | Reaksi Perangkat Lunak |
| :--- | :--- | :--- |
| 1 | Relawan membuka halaman eksplorasi program | Sistem menampilkan daftar program, kolom pencarian, dan pilihan kategori Jaga Alam dan Jaga Iklim |
| 2 | Relawan mengetikkan kata kunci acak pada kolom pencarian dan memilih salah satu kategori program | Sistem memproses masukan, tidak menemukan program yang sesuai, dan menampilkan pesan bahwa program tidak ditemukan |
---

# BAB 4: Diagram Kelas
Bagian ini berisi identifikasi kelas dan pemodelan struktur kelas yang diperlukan untuk merealisasikan use case pada BAB 3. Gunakan skenario use case (3.4) sebagai dasar untuk menentukan kelas, atribut, metode, dan hubungan antarkelas.

## 4.1 Identifikasi Kelas
Identifikasi seluruh kelas yang diperlukan berdasarkan use case dan skenarionya. Satu kelas boleh terkait dengan lebih dari satu use case.

| ID Kelas | Nama Kelas | Deskripsi Kelas | ID Use Case |
| :--- | :--- | :--- | :--- |
| *C01* | *Pelanggan* | *Menyimpan data akun pelanggan yang membuat pesanan.* | *UC01, UC05* |
| *C02* | *Pesanan* | *Menyimpan data pesanan beserta status pembayarannya.* | *UC01, UC03, UC05* |
| *C03* | *Keranjang* | *Menyimpan sementara item yang dipilih sebelum checkout.* | *UC01, UC02* |
| *C04* | *MetodePembayaran* | *Kelas abstrak yang merepresentasikan metode pembayaran yang dipilih pelanggan.* | *UC03, UC04* |
| *C05* | *Kartu* | *Merealisasikan pembayaran melalui kartu kredit/debit dengan mengirimkan permintaan ke payment gateway (dummy).* | *UC03, UC04* |
| *C06* | *EWallet* | *Merealisasikan pembayaran melalui e-wallet, termasuk pengecekan saldo, dengan mengirimkan permintaan ke payment gateway (dummy).* | *UC03, UC04* |
| *C07* | *RiwayatTransaksi* | *Menyimpan catatan transaksi beserta status yang dikembalikan payment gateway (dummy).* | *UC03, UC05* |
| *...* | *...* | *...* | *...* |

Pastikan setiap kelas memiliki tanggung jawab yang jelas dan memang diperlukan untuk merealisasikan fungsi yang dimodelkan. Hindari kelas yang tidak memiliki keterkaitan dengan KF atau use case manapun.

## 4.2 Diagram Kelas per Use Case
Buat diagram kelas untuk setiap use case pada 3.2.

### 4.2.1 Use Case UC01

**Nama Use Case:** *Memesan Produk*

#### Identifikasi Kelas

| ID Kelas | Nama Kelas | Deskripsi Kelas |
| :--- | :--- | :--- |
| *C01* | *Pelanggan* | *Menyimpan data akun pelanggan yang membuat pesanan.* |
| *C02* | *Pesanan* | *Menyimpan data pesanan yang dibuat dari isi keranjang.* |
| *C03* | *Keranjang* | *Menyimpan sementara item yang dipilih sebelum checkout.* |
| *...* | *...* | *...* |

#### Diagram Kelas

<p align="center">
<img alt="Class Diagram UC01" src="./assets/diagram/contoh-class-diagram.webp" width="70%">
</p>
<p align="center">
<i>Gambar 2. Diagram Kelas Use Case UC01</i>
</p>
<br>

Pada diagram kelas, cukup tampilkan nama kelas saja. Atribut dan metode/operasi milik setiap kelas dapat dituliskan pada tabel di bawah ini. Pastikan hubungan antarkelas menggunakan jenis relasi yang sesuai (asosiasi, agregasi, komposisi, generalisasi, atau dependensi).

| ID Kelas | Nama Kelas | Atribut | Metode/Operasi |
| :--- | :--- | :--- | :--- |
| *C02* | *Pesanan* | *idPesanan, total, status* | *buatPesanan(), hitungTotal()* |
| *C03* | *Keranjang* | *daftarItem* | *tambahItem(), checkout()* |
| *...* | *...* | *...* | *...* |

> Lanjutkan pola **4.2.x** untuk setiap use case pada 3.2.

## 4.3 Diagram Kelas Keseluruhan

Gabungkan seluruh kelas dan hubungan antarkelas dari diagram kelas setiap use case menjadi satu diagram kelas keseluruhan. Pastikan tidak ada kelas yang terduplikasi.

<p align="center">
<img alt="Class Diagram Keseluruhan" src="./assets/diagram/contoh-class-diagram.webp" width="70%">
</p>
<p align="center">
<i>Gambar X. Diagram Kelas Keseluruhan</i>
</p>
<br>

| ID Kelas | Nama Kelas | Atribut | Metode/Operasi |
| :--- | :--- | :--- | :--- |
| *C01* | *Pelanggan* | *idPelanggan, nama, email* | *lihatRiwayatPesanan()* |
| *C02* | *Pesanan* | *idPesanan, total, status* | *hitungTotal(), perbaruiStatus()* |
| *C03* | *Keranjang* | *daftarItem* | *tambahItem(), checkout()* |
| *C04* | *MetodePembayaran* | *-* | *kirimKePaymentGatewayDummy()* |
| *C05* | *Kartu* | *nomorKartu, masaBerlaku* | *kirimKePaymentGatewayDummy()* |
| *C06* | *EWallet* | *saldo, idAkun* | *cekSaldo(), kirimKePaymentGatewayDummy()* |
| *C07* | *RiwayatTransaksi* | *idTransaksi, waktu, status* | *catatTransaksi(), tampilkanNotifikasi()* |
| *...* | *...* | *...* | *...* |

---

# BAB 5: Traceability
Cocokkan setiap kebutuhan fungsional, use case, dengan diagram kelas yang mendukung atau mengimplementasikan kebutuhan tersebut.

| ID Kelas | ID Use Case | ID KF |
| :--- | :--- | :--- |
| *C01* | *UC01, UC05* | *KF01, KF06* |
| *C02* | *UC01, UC03, UC05* | *KF01, KF02, KF05, KF06* |
| *C03* | *UC01, UC02* | *KF01, KF02* |
| *C04* | *UC03, UC04* | *KF03* |
| *C05* | *UC03, UC04* | *KF03* |
| *C06* | *UC03, UC04* | *KF03, KF04* |
| *C07* | *UC03, UC05* | *KF04, KF05* |
| *...* | *...* | *...* |

---

# Referensi

- Diagram UML: [https://www.drawio.com/](https://www.drawio.com/), [https://staruml.io/](https://staruml.io/)
