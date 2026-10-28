<h1>
IF2150 REKAYASA PERANGKAT LUNAK
<br>
TUGAS 8
<br>
DESKRIPSI PERANCANGAN PERANGKAT LUNAK (DPPL)
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

## Daftar Perubahan

| Revisi | Deskripsi |
| :--- | :--- |
| *A* | *Deskripsikan perubahan yang dilakukan dari dokumen sebelumnya pada dokumen ini. Jika tidak terdapat perubahan, harap kosongkan tabel.* |
| *B* |  |
| *C* |  |
| ... |  |

---

<br>

> **Petunjuk pengerjaan:** *[Silahkan hapus bagian ini setelah selesai mengerjakan]*
>
> Dokumen ini melanjutkan **Deskripsi Perancangan Perangkat Lunak**. Gunakan nama, ID, kebutuhan, dan use case yang konsisten dengan kedua dokumen tersebut. Contoh pola ID baru di bawah dapat disesuaikan dengan kesepakatan kelompok, ID yang sudah ada tetap dipertahankan.

<br>

---


# BAB 1: Pendahuluan

## 1.1 Tujuan Penulisan Dokumen
Dokumen Deskripsi Perancangan Perangkat Lunak (DPPL) ini disusun untuk menjabarkan rancangan perangkat lunak RekanBumi sebagai kelanjutan dari dokumen Spesifikasi Kebutuhan Perangkat Lunak (SKPL) dan Arsitektur Perangkat Lunak (APL). Dokumen ini menerjemahkan kebutuhan, *use case*, dan kelas analisis yang telah didefinisikan pada SKPL, serta arsitektur yang telah ditetapkan pada APL, menjadi rancangan yang siap diimplementasikan, meliputi rancangan lingkungan implementasi, rancangan arsitektur, realisasi setiap *use case* dalam bentuk *sequence diagram* dan diagram kelas, diagram kelas perancangan keseluruhan, serta matriks kerunutan antara kelas perancangan dan *use case*.

Dokumen ini ditujukan untuk beberapa pihak, yaitu:

1. Tim pengembang (*developer*) RekanBumi, sebagai acuan utama dalam tahap implementasi kode program agar struktur kelas, interaksi antarkomponen, dan alur proses yang dibangun sesuai dengan rancangan yang telah disepakati.
2. Asisten dan dosen mata kuliah IF2150 Rekayasa Perangkat Lunak, sebagai bahan evaluasi terhadap kesesuaian dan konsistensi rancangan perangkat lunak dengan dokumen SKPL dan APL yang telah disusun sebelumnya.
3. Pihak yang melakukan pengujian dan pemeliharaan perangkat lunak, sebagai rujukan untuk menelusuri keterkaitan antara kelas perancangan dan *use case* yang direalisasikan.

## 1.2 Lingkup Masalah
RekanBumi adalah suatu web terintegrasi yang berperan sebagai perantara atau penghubung antara masyarakat umum yang berperan sebagai relawan dengan program-program ramah lingkungan yang disediakan oleh lembaga-lembaga yang tersebar di seluruh Indonesia. Web ini dikembangkan atas dasar *awareness* dalam mewujudkan aksi nyata dalam menjaga iklim dan ekosistem darat yang tercantum pada SDG 13 dan SDG 15. RekanBumi diharapkan dapat mempersempit kesenjangan antara besarnya potensi partisipasi masyarakat dengan minimnya sarana yang menghubungkan mereka dengan lembaga-lembaga lingkungan yang membutuhkan dukungan.

## 1.3 Definisi, Istilah, dan Singkatan

Tabel 1.3. Definisi Istilah dan Singkatan

| Singkatan, Akronim, atau Istilah | Penjelasan |
| :--- | :--- |
| P/L | Singkatan dari Perangkat Lunak, yaitu aplikasi yang memberikan perintah kepada komputer untuk menjalankan tugas tertentu. |
| DPPL | Singkatan dari Deskripsi Perancangan Perangkat Lunak, yaitu dokumen yang menjabarkan rancangan arsitektur, realisasi *use case*, dan rancangan kelas perangkat lunak sebagai acuan implementasi. |
| SKPL | Singkatan dari Spesifikasi Kebutuhan Perangkat Lunak, yaitu dokumen yang merangkum kriteria-kriteria yang diperlukan untuk membangun aplikasi menjalankan tugasnya. |
| APL | Singkatan dari Arsitektur Perangkat Lunak, yaitu dokumen yang mendefinisikan *style/pattern* arsitektur, komponen penyusun, dan model arsitektur perangkat lunak. |
| KF | Singkatan dari Kebutuhan Fungsional. |
| KNF | Singkatan dari Kebutuhan Non-Fungsional. |
| UC | Singkatan dari *Use Case*. |
| SDG | Singkatan dari *Sustainable Development Goals* atau Tujuan Pembangunan Berkelanjutan berupa 17 tujuan yang disepakati PBB untuk mencapai perdamaian dan kemakmuran manusia dan bumi tahun 2030. |
| MVC | Singkatan dari *Model-View-Controller*, yaitu pola arsitektur yang memisahkan tanggung jawab antara representasi data (*Model*), antarmuka pengguna (*View*), dan pengendalian alur proses (*Controller*). |
| *Client-Server* | Gaya arsitektur yang membagi perangkat lunak menjadi *client* yang berinteraksi langsung dengan pengguna dan *server* yang menjalankan proses bisnis serta mengelola data. |
| *Boundary Class* | Kelas yang menyediakan antarmuka interaksi antara pengguna dan sistem; dipetakan ke komponen *View* pada MVC. |
| *Controller Class* | Kelas yang mengendalikan alur proses dan validasi; dipetakan ke komponen *Controller* pada MVC. |
| *Entity Class* | Kelas yang merepresentasikan dan menyimpan data domain sistem; dipetakan ke komponen *Model* pada MVC. |
| *Logical View* | *Architectural view* yang menggambarkan abstraksi utama perangkat lunak beserta hubungan antarkomponennya. |
| *Physical View* | *Architectural view* yang menggambarkan distribusi komponen perangkat lunak pada *node* fisik/komputasi beserta komunikasi antar-*node*. |
| *Sequence Diagram* | Diagram UML yang menggambarkan urutan interaksi (pemanggilan operasi) antarobjek dalam menjalankan suatu skenario *use case*. |
| Visibilitas | Tingkat akses atribut atau operasi pada diagram kelas: `+` *public*, `-` *private*, dan `#` *protected*. |
| Multiplisitas | Jumlah objek yang dapat terlibat pada satu sisi relasi antarkelas, misalnya `1`, `0..1`, atau `0..*`. |
| Enumerasi | Tipe data dengan himpunan nilai yang tetap, misalnya status program atau kategori program. |
| DBMS | Singkatan dari *Database Management System*, yaitu perangkat lunak pengelola basis data. |
| ORM | Singkatan dari *Object-Relational Mapping*, yaitu teknik/pustaka yang menjembatani objek pada aplikasi dengan tabel pada basis data relasional (pada RekanBumi menggunakan Prisma). |
| API | Singkatan dari *Application Programming Interface*, yaitu antarmuka yang digunakan antarkomponen perangkat lunak untuk saling berkomunikasi. |
| tRPC | Pustaka yang digunakan sebagai mekanisme komunikasi antara *client* dan *server* untuk mengakses fungsi aplikasi. |
| Inisiator Program | Lembaga atau komunitas lingkungan yang mendaftarkan diri dan programnya pada web RekanBumi, lalu mengelola program, seleksi relawan, dan laporan kegiatan. |
| Relawan | Masyarakat umum yang memiliki akun pribadi di RekanBumi dan mendaftar, mengikuti, atau berkontribusi pada setidaknya satu program. |
| Verifikator | Admin platform RekanBumi yang memverifikasi identitas dan legalitas Inisiator Program serta meninjau kelayakan program dan laporan akhir sebelum dipublikasikan. |
| Program | Kegiatan ramah lingkungan yang diinisiasi oleh Inisiator Program dan terdaftar pada web RekanBumi, merupakan setidaknya salah satu dari dua kategori 'Jaga Alam' dan 'Jaga Iklim'. |
| Jaga Alam | Kategori program yang tersedia pada web RekanBumi yang meliputi program-program penjagaan kebersihan lingkungan dan kesejahteraan hewan liar. |
| Jaga Iklim | Kategori program yang tersedia pada web RekanBumi yang meliputi program-program penanaman pohon. |

## 1.4 Aturan Penomoran
Penomoran identifikasi (ID) pada dokumen DPPL ini menggunakan pola yang sama dengan dokumen SKPL dan APL untuk menjaga konsistensi dan kemudahan penelusuran (*traceability*). Kelas baru yang muncul pada tahap perancangan melanjutkan nomor kelas terakhir pada SKPL. Nomor gambar dan tabel mengikuti nomor bab (misalnya Gambar 2.1 dan Tabel 4.1).

Tabel 1.4. Aturan Penomoran

| Hal/Bagian | Penomoran | Keterangan |
| :--- | :--- | :--- |
| Kebutuhan Fungsional | KFXX | Identifikasi unik untuk setiap fungsi dan respons utama perangkat lunak (KF01–KF16). |
| Kebutuhan Non-Fungsional | KNFXX | Identifikasi unik untuk batasan kualitas, performa, dan keandalan sistem (KNF01–KNF08). |
| Aktor | AXX | Identifikasi entitas pengguna atau peran yang berinteraksi dengan sistem (A01–A03). |
| Use Case | UCXX | Identifikasi unit interaksi fungsional antara aktor dan perangkat lunak (UC01–UC09). |
| Kelas | CXX | Identifikasi kelas pada pemodelan berorientasi objek (C01–C20 dari SKPL; C21–C22 ditambahkan pada tahap perancangan). |

## 1.5 Referensi
## 1.5 Referensi
1. Kelompok G01 K03. (2026). *Spesifikasi Kebutuhan Perangkat Lunak (SKPL) RekanBumi*, revisi D. IF2150 Rekayasa Perangkat Lunak, Institut Teknologi Bandung.
2. Kelompok G01 K03. (2026). *Arsitektur Perangkat Lunak (APL) RekanBumi*, revisi A. IF2150 Rekayasa Perangkat Lunak, Institut Teknologi Bandung.
3. Sommerville, I. (2016). *Software Engineering* (10th ed.). Pearson. Chapter 6: *Architectural Design*. https://software-engineering-book.com/slides/
4. Next.js Documentation. https://nextjs.org/docs
5. Tailwind CSS Documentation. https://tailwindcss.com/docs
6. Prisma Documentation. https://www.prisma.io/docs
7. tRPC Documentation. https://trpc.io/docs
8. Better Auth Documentation. https://www.better-auth.com/docs
9. Neon Documentation. https://neon.tech/docs
10. Diagram UML: https://www.drawio.com/, https://staruml.io/, https://plantuml.com/


## 1.6 Deskripsi Umum Dokumen (Ikhtisar)
Tuliskan sistematika pembahasan dokumen ini secara ringkas dan runut, dengan maksimal 1 paragraf.

<br>

---

# BAB 2: Perancangan Arsitektur

## 2.1 Rancangan Lingkungan Implementasi

Lingkungan implementasi perangkat lunak RekanBumi mengacu pada lingkungan operasi yang telah ditetapkan pada SKPL (Bab 2.5) dan APL (Bab 1.3), sebagaimana disajikan pada Tabel 2.1.

Tabel 2.1. Rancangan Lingkungan Implementasi

| Komponen | Spesifikasi |
| :--- | :--- |
| *Operating System* | Cross-platform melalui web browser pada perangkat desktop dan mobile |
| *Client* | Web browser modern pada perangkat desktop dan mobile (Google Chrome, Microsoft Edge, Mozilla Firefox, dan Apple Safari) |
| *Server* | Node.js 20+ |
| DBMS | Neon PostgreSQL |
| *Frontend* | Next.js 15 dan Tailwind CSS |
| *Authentication* | Better Auth |
| ORM | Prisma |
| API | tRPC |
| *Filing System* | Layanan penyimpanan berkas berbasis *cloud* (*Cloud File Storage*) yang diakses melalui *CloudStorageAdapter* untuk menyimpan dokumen legalitas lembaga dan foto dokumentasi akhir kegiatan. **[nama layanan cloud storage yang dipakai (belum)]** |
| Bahasa Pemrograman | TypeScript, JavaScript, SQL |
| *Development Tools* | Visual Studio Code, Git, GitHub, pnpm, draw.io |

Teknologi yang digunakan mendukung penerapan *Client-Server Architecture* dan MVC. Next.js 15 dan Tailwind CSS digunakan pada sisi *frontend* sebagai bagian yang menyediakan antarmuka kepada *client*. Node.js 20+ menjadi lingkungan *server* untuk menjalankan aplikasi. tRPC digunakan sebagai mekanisme komunikasi antara *client* dan *server* untuk mengakses fungsi aplikasi.

Pada sisi pengelolaan data, Prisma berperan sebagai ORM yang menjembatani aplikasi dengan Neon PostgreSQL sebagai DBMS. Dengan demikian, data yang dikelola oleh *Model* dapat disimpan secara terpusat pada *server*. Better Auth digunakan untuk mendukung kebutuhan autentikasi pengguna pada aplikasi.

## 2.2 Style/Pattern Arsitektur Acuan

Arsitektur perangkat lunak RekanBumi menggunakan *Client-Server Architecture* sebagai gaya arsitektur dan *Model-View-Controller* (MVC) sebagai pola arsitektur pada *interface*. Kombinasi ini digunakan untuk memisahkan interaksi pengguna dengan proses pengolahan data yang dilakukan oleh *server*.

### 2.2.1 Client-Server Architecture

Pada *Client-Server*, perangkat lunak dibagi menjadi dua bagian utama, yaitu *client* dan *server*. *Client* merupakan bagian yang berinteraksi langsung dengan pengguna dan mengirimkan permintaan kepada *server*. *Server* bertanggung jawab menerima permintaan, menjalankan proses bisnis, mengelola data, serta mengirimkan hasil pengolahan kepada *client*.

Jika diimplementasikan pada RekanBumi:
1. *Client* merupakan antarmuka web yang digunakan oleh Relawan, Inisiator Program, dan Verifikator untuk mengakses fungsi-fungsi RekanBumi.
2. *Server* menangani proses aplikasi, autentikasi, pengolahan data, validasi, serta komunikasi dengan basis data.
3. *Database* menyimpan data sistem secara terpusat sehingga data program, pengguna, pendaftaran, kehadiran, laporan, notifikasi, dan riwayat kontribusi dapat digunakan oleh berbagai *client*.

Pemisahan tersebut memungkinkan beberapa jenis pengguna mengakses layanan dan data yang sama melalui *client* masing-masing.

<p align="center">
<img alt="Arsitektur Client-Server RekanBumi" src="./assets/diagram/CLIENTSERVER.png" width="70%">
</p>
<p align="center">
<i>Gambar 2.1. Arsitektur Client-Server RekanBumi</i>
</p>

### 2.2.2 Model-View-Controller (MVC)

Di dalam RekanBumi, pola MVC digunakan untuk memisahkan tanggung jawab antara antarmuka pengguna, pengendalian alur proses, dan representasi data.

1. ***Model*** bertanggung jawab merepresentasikan dan mengelola data serta keadaan (*state*) yang digunakan oleh sistem. Pada RekanBumi, bagian *Model* direpresentasikan oleh kelas-kelas *Entity Class*, yaitu Program, Pendaftaran, Relawan, Pengguna, InisiatorProgram, Verifikator, DokumenVerifikasi, Kehadiran, LaporanProgram, Notifikasi, dan RiwayatKontribusi. Misalnya, Program menyimpan informasi program, Pendaftaran menyimpan data pendaftaran relawan, Kehadiran menyimpan catatan *check-in*, dan RiwayatKontribusi menyimpan riwayat jam aksi relawan.
2. ***View*** bertanggung jawab menyediakan antarmuka yang digunakan pengguna untuk melihat informasi dan memberikan masukan kepada sistem. Pada RekanBumi, bagian *View* direpresentasikan oleh kelas-kelas *Boundary Class*, yaitu KelolaAkunPage, KelolaProgramPage, EksplorasiProgramPage, KelolaPendaftarPage, dan AreaKegiatanPage. Contohnya, EksplorasiProgramPage digunakan oleh Relawan untuk mencari, menyaring, dan melihat detail program, sedangkan AreaKegiatanPage menyediakan antarmuka untuk melakukan *check-in* dan melihat portofolio kontribusi.
3. ***Controller*** bertanggung jawab menerima masukan dari *View*, menjalankan proses dan validasi yang diperlukan, serta menghubungkan *View* dengan *Model*. Pada RekanBumi, bagian *Controller* terdiri atas AuthController, ProgramController, SeleksiController, dan PresensiController. AuthController menangani autentikasi, sesi, dan notifikasi akun pengguna, ProgramController menangani pembuatan, pencarian, detail, perubahan status program, serta peninjauan laporan akhir, SeleksiController menangani pengajuan pendaftaran, seleksi relawan, dan pengecekan kuota, sedangkan PresensiController menangani validasi dan pencatatan kehadiran serta pembaruan riwayat jam aksi.

Dengan demikian, alur dasar MVC pada RekanBumi adalah:

**Pengguna → View → Controller → Model → Controller → View → Pengguna**

Sedangkan dalam konteks *Client-Server*:

**Client → Request → Server (MVC) → Database → Server → Response → Client**

<p align="center">
<img alt="Arsitektur MVC RekanBumi" src="./assets/diagram/MVC.png" width="70%">
</p>
<p align="center">
<i>Gambar 2.2. Arsitektur MVC RekanBumi</i>
</p>

### 2.2.3 Alasan Pemilihan

Pemilihan *Client-Server Architecture* didasarkan pada karakteristik RekanBumi sebagai perangkat lunak berbasis web yang digunakan oleh para aktor, yaitu Inisiator Program, Relawan, dan Verifikator. Ketiga aktor tersebut membutuhkan akses terhadap layanan dan data yang sama, seperti data program, pendaftaran relawan, status program, kehadiran, laporan, dan riwayat kontribusi. Oleh karena itu, pengelolaan data secara terpusat pada *server* sesuai dengan kebutuhan RekanBumi.

*Client-Server* juga sesuai dengan alur proses bisnis RekanBumi yang melibatkan banyak interaksi antara pengguna dan sistem. Relawan dapat mencari program, mendaftarkan diri, menerima notifikasi, dan melakukan *check-in*. Inisiator dapat membuat program, menyeleksi relawan, serta mengirimkan laporan kegiatan. Sementara itu, Verifikator melakukan verifikasi dan meninjau laporan program. Proses-proses tersebut membutuhkan *server* sebagai pusat pengolahan dan penyimpanan data.

Pemilihan MVC didasarkan pada banyaknya fungsi dan antarmuka yang dimiliki RekanBumi. Pemisahan antara *View*, *Controller*, dan *Model* memungkinkan setiap bagian memiliki tanggung jawab yang lebih terfokus. MVC juga sesuai dengan pembagian kelas yang telah dibuat pada pemodelan kelas SKPL, yaitu *Boundary Class*, *Controller Class*, dan *Entity Class* yang dapat dipetakan secara langsung ke *View*, *Controller*, dan *Model*.

Selain itu, pola ini mendukung kebutuhan fungsional RekanBumi yang melibatkan proses seperti pencarian dan penyaringan program (KF03 dan KF04), validasi pendaftaran (KF05 dan KF10), autentikasi (KF06), seleksi relawan (KF07 dan KF09), notifikasi (KF08), *check-in* (KF11 dan KF12), serta pembaruan status program, ringkasan capaian, dan riwayat kontribusi (KF13–KF16).

Dari kebutuhan non-fungsional pada SKPL, dua atribut mutu paling menentukan bentuk arsitektur ini. Pertama, keamanan (KNF02 dan KNF06): *hashing* kata sandi, verifikasi kredensial, dan pemblokiran alamat IP dipusatkan di *server* (AuthController dan Better Auth) sehingga tidak dapat dilewati dari sisi *client*. Kedua, kemampuan pemeliharaan: pemisahan *View*, *Controller*, dan *Model*, ditambah penempatan Better Auth dan CloudStorageAdapter di balik antarmukanya sendiri, membuat perubahan tampilan, aturan domain, atau layanan pihak ketiga cukup dilakukan pada satu bagian. Atribut mutu lain pada SKPL, misalnya waktu respons pencarian (KNF01) dan kompatibilitas tampilan (KNF05), tetap menjadi target, tetapi tidak menentukan bentuk arsitektur.

Pilihan ini juga memiliki harga yang diterima secara sadar. *Server* aplikasi dan DBMS menjadi titik kegagalan tunggal, sehingga ketersediaan sistem tidak melebihi ketersediaan keduanya; risiko ini dapat diterima karena beban RekanBumi tergolong sedang. Setiap permintaan melewati jaringan dan beberapa lapisan, sehingga latensi sedikit bertambah. MVC juga menambah jumlah kelas dibandingkan rancangan tanpa pemisahan lapisan, tetapi kerumitan ini sepadan dengan banyaknya halaman dan alur pada RekanBumi.

## 2.3 Identifikasi Komponen / Modul / Subsistem

Komponen penyusun RekanBumi dikelompokkan berdasarkan perpaduan *Client-Server Architecture* dan pola MVC yang telah ditetapkan pada subbab 2.2. Setiap komponen *View*, *Controller*, dan *Model* dipetakan secara langsung dengan kelas perancangan pada BAB 4, sehingga tanggung jawab yang dituliskan di bawah ini konsisten dengan operasi pada Tabel 4.1.

Tabel 2.3. Identifikasi Komponen/Modul/Subsistem

| Nama Komponen/Modul/Subsistem | Jenis | Penjelasan |
| :--- | :--- | :--- |
| ***Lapisan View (Client)*** | | |
| KelolaAkunPage | *View* | Menampilkan formulir pendaftaran dan masuk akun pada peramban klien, menampilkan menu notifikasi akun bagi seluruh pengguna, serta meneruskan interaksi ke AuthController. |
| KelolaProgramPage | *View* | Menampilkan antarmuka bagi Inisiator untuk mendaftarkan program baru dan mengunggah laporan akhir, serta antarmuka bagi Verifikator untuk meninjau, menyetujui, atau menolak laporan akhir. |
| EksplorasiProgramPage | *View* | Menampilkan katalog, fitur pencarian, filter kategori "Jaga Alam" dan "Jaga Iklim", detail informasi program aksi, serta formulir pendaftaran program kepada Relawan. |
| KelolaPendaftarPage | *View* | Menampilkan daftar calon relawan pendaftar dan menyediakan antarmuka bagi Inisiator untuk memasukkan dan mengonfirmasi keputusan hasil seleksi. |
| AreaKegiatanPage | *View* | Menampilkan antarmuka eksekusi *check-in* kehadiran di lokasi dan halaman peninjauan riwayat portofolio jam aksi relawan. |
| ***Lapisan Controller (Server)*** | | |
| AuthController | *Controller* | Menerima permintaan dari klien, memvalidasi kredensial keamanan termasuk pemblokiran sementara alamat IP, memproses pembuatan akun beserta dokumen verifikasi, mengelola sesi, dan menyediakan data notifikasi akun. |
| ProgramController | *Controller* | Mengeksekusi logika bisnis terkait pendaftaran program beserta dokumen legalitas lembaga, pencarian program, detail program, pengajuan serta peninjauan laporan akhir, pembaruan status program, dan memicu pembaruan jam aksi relawan. |
| SeleksiController | *Controller* | Menerima pengajuan pendaftaran relawan, memvalidasi kelengkapan data dan ketersediaan kuota program, menetapkan hasil seleksi relawan, dan memicu notifikasi. |
| PresensiController | *Controller* | Memvalidasi kesesuaian status relawan dan rentang waktu *check-in* kegiatan, mencatat kehadiran, serta mengoordinasikan pembaruan portofolio relawan; pemeriksaan kehadiran dan perhitungan jam aksi diserahkan kepada Relawan dan RiwayatKontribusi. |
| ***Lapisan Model (Server)*** | | |
| Pengguna | *Model* | Kelas abstrak yang merepresentasikan identitas akun platform (email); kredensial kata sandi dalam bentuk *hash* disimpan dan diverifikasi oleh Better Auth. Diturunkan menjadi Relawan, InisiatorProgram, dan Verifikator. |
| Relawan | *Model* | Merepresentasikan data profil dan status verifikasi individu masyarakat umum. |
| InisiatorProgram | *Model* | Merepresentasikan data profil dan tautan situs resmi dari lembaga atau komunitas lingkungan. |
| Verifikator | *Model* | Merepresentasikan data akun pengelola sistem yang bertugas meninjau laporan. |
| Program | *Model* | Merepresentasikan data detail kegiatan, jadwal, kategori, kuota, dan status keberlangsungan; menyediakan pencarian program serta daftar pendaftar dan relawan yang diterima. |
| Pendaftaran | *Model* | Merepresentasikan data keterampilan, ketersediaan waktu, dan status seleksi calon relawan. |
| DokumenVerifikasi | *Model* | Merepresentasikan data dan status validasi dari dokumen yang diunggah pengguna saat registrasi. |
| Kehadiran | *Model* | Merepresentasikan catatan waktu (*timestamp*) konfirmasi kehadiran relawan di lokasi program. |
| LaporanProgram | *Model* | Merepresentasikan data dokumentasi akhir, ringkasan capaian dampak lingkungan, status peninjauan, dan catatan revisi kegiatan. |
| Notifikasi | *Model* | Merepresentasikan entitas pemberitahuan otomatis beserta status keterbacaannya. |
| RiwayatKontribusi | *Model* | Merepresentasikan data akumulasi jam aksi dan daftar program yang telah diselesaikan relawan. |
| ***Pendukung, Penyimpanan, dan Integrasi*** | | |
| Better Auth | Pendukung (*Server*) | Komponen pendukung autentikasi yang menyimpan kredensial dalam bentuk *hash* (KNF02), memverifikasi kredensial, dan mengelola sesi; digunakan oleh AuthController dan dimodelkan sebagai kelas BetterAuth (C22) pada BAB 4. |
| DBMS : NeonPostgreSQL | Penyimpanan Data | DBMS relasional berbasis komputasi awan yang menyimpan seluruh skema data sistem secara persisten. |
| CloudStorageAdapter | Integrasi Eksternal | Komponen pengelola API eksternal untuk memvalidasi, menyimpan, dan mengambil berkas dokumen legalitas serta foto laporan; dimodelkan sebagai kelas C21 pada BAB 4. |

## 2.4 Model Arsitektur Perangkat Lunak

Model arsitektur RekanBumi disajikan dalam dua *view* yang saling melengkapi, yaitu *Logical View* yang menunjukkan pembagian tanggung jawab antarkomponen secara struktural mengikuti pola MVC, dan *Physical View* yang menunjukkan di mana komponen-komponen tersebut dijalankan serta bagaimana *node* saling berkomunikasi. Seluruh komponen pada kedua *view* konsisten dengan Tabel 2.3.

### 2.4.1 Logical View

*Logical View* menggambarkan abstraksi utama perangkat lunak RekanBumi beserta hubungan antarkomponennya dalam mendukung kebutuhan fungsional. *View* ini disajikan menggunakan *class diagram* dengan pengelompokan komponen berdasarkan *Client-Server Architecture* sebagai struktur sistem secara keseluruhan. Pada sisi aplikasi, tanggung jawab komponen diorganisasi lebih lanjut menggunakan pola MVC, dengan stereotipe «boundary» untuk *View*, «control» untuk *Controller*, dan «entity» untuk *Model*.

*Logical View* dipilih karena RekanBumi memiliki sejumlah fungsi yang saling berkaitan dan menggunakan data bersama, seperti Program, Pendaftaran, Kehadiran, dan LaporanProgram. Melalui *view* ini, hubungan antara antarmuka, logika aplikasi, dan entitas domain dapat ditelusuri untuk menunjukkan bagaimana kebutuhan fungsional pada SKPL direalisasikan oleh komponen perangkat lunak. RekanBumi juga digunakan oleh tiga aktor, yaitu Relawan, Inisiator Program, dan Verifikator, yang memakai layanan berbeda tetapi berinteraksi dengan model data yang saling berkaitan. Selain itu, stereotipe *Boundary*, *Control*, dan *Entity* pada pemodelan kelas SKPL selaras dengan pembagian tanggung jawab *View*, *Controller*, dan *Model*, sehingga rancangan tetap konsisten dengan *baseline* SKPL.

<p align="center">
<img alt="Logical View RekanBumi" src="./assets/diagram/logical-view.png" width="100%">
</p>
<p align="center">
<i>Gambar 2.3. Logical View RekanBumi</i>
</p>

Gambar 2.3 menunjukkan *package* Client yang memuat komponen *View* serta *package* Server yang memuat *Controller*, *Model*, Better Auth sebagai pendukung autentikasi, dan CloudStorageAdapter sebagai perantara ke Layanan *Cloud Storage*. Relasi "Memanggil" dan "cek sesi" menunjukkan permintaan dari *View* ke *Controller* melalui tRPC, sedangkan relasi "mengarahkan ke login" menunjukkan EksplorasiProgramPage mengarahkan Relawan yang belum masuk ke KelolaAkunPage. Setelah berhasil masuk, KelolaAkunPage mengembalikan Relawan ke halaman asal melalui `urlKembali` tanpa kebergantungan balik, sehingga tidak terbentuk lingkaran kebergantungan. ProgramController memicu PresensiController untuk memperbarui jam aksi relawan setelah laporan akhir disetujui Verifikator. Relasi dari *Controller* ke *Model* digambarkan sebagai dependensi dengan label sesuai tanggung jawabnya, dan data persisten diakses melalui Prisma ORM serta disimpan pada DBMS : NeonPostgreSQL. Seluruh kebergantungan mengarah ke lapisan yang sama atau ke lapisan di bawahnya; Better Auth dan CloudStorageAdapter tidak bergantung pada kelas *Model*.

Seluruh relasi antarentitas *Model* (asosiasi, agregasi, komposisi, dan generalisasi) serta seluruh pemanggilan *View* ke *Controller* pada Gambar 2.3 sama dengan Tabel 4.2. Untuk dependensi *Controller* ke *Model*, gambar hanya memuat dependensi utama setiap *controller* agar tetap mudah dibaca; daftar lengkap seluruh dependensi terdapat pada Tabel 4.2 dan Gambar 4.1.

### 2.4.2 Physical View

*Physical View* menggambarkan bagaimana komponen perangkat lunak RekanBumi didistribusikan dan dijalankan pada *node-node* fisik/komputasi dalam lingkungan operasionalnya, mengikuti *Client-Server Architecture* yang ditetapkan pada subbab 2.2. *View* ini disajikan dalam bentuk *deployment diagram*, dengan setiap *node* merepresentasikan unit komputasi tempat sekumpulan komponen dijalankan.

*Physical View* dipilih sebagai pelengkap *Logical View* (2.4.1). Jika *Logical View* menunjukkan pembagian tanggung jawab antarkomponen secara struktural mengikuti pola MVC, *Physical View* menunjukkan di mana komponen-komponen tersebut secara fisik dijalankan serta bagaimana *node-node* tersebut saling berkomunikasi melalui jaringan. Pemilihan *view* ini selaras dengan Tabel 2.1 Rancangan Lingkungan Implementasi yang menetapkan spesifikasi *node Client*, *Server*, dan DBMS yang digunakan RekanBumi.

<p align="center">
<img alt="Physical View RekanBumi" src="./assets/diagram/physical-view.png" width="100%">
</p>
<p align="center">
<i>Gambar 2.4. Physical View RekanBumi</i>
</p>

Gambar 2.4 menunjukkan empat *node* pada arsitektur RekanBumi. *Node Client Device* merepresentasikan peramban web milik pengguna (Relawan, Inisiator Program, dan Verifikator) yang menjalankan seluruh komponen *View*: KelolaAkunPage, KelolaProgramPage, EksplorasiProgramPage, KelolaPendaftarPage, dan AreaKegiatanPage. *Node Application Server* menjalankan seluruh komponen *Controller* (AuthController, ProgramController, SeleksiController, PresensiController), seluruh komponen *Model* (Pengguna, Relawan, InisiatorProgram, Verifikator, Program, Pendaftaran, DokumenVerifikasi, Kehadiran, LaporanProgram, Notifikasi, RiwayatKontribusi), komponen pendukung Better Auth, serta CloudStorageAdapter sebagai komponen integrasi eksternal. *Node Database Server* menjalankan DBMS : NeonPostgreSQL sebagai basis data terpusat.

Komunikasi antara *Client Device* dan *Application Server* dilakukan melalui tRPC di atas protokol HTTPS, diberi label "memanggil API". Komunikasi antara *Application Server* dan *Database Server* dilakukan melalui Prisma ORM, diberi label "akses data". Sistem di luar P/L, yaitu layanan *Cloud Storage* eksternal yang diakses CloudStorageAdapter untuk menyimpan dan mengambil dokumen legalitas serta foto laporan, digambarkan dengan garis putus-putus dan *node* bertanda «external».

<br>

---

# BAB 3: Realisasi Use Case

## 3.1 Use Case Daftar program

**ID Use Case:** UC01  
**Nama Use Case:** Daftar program  
**Kebutuhan fungsional terkait:** KF01, KF10

### 3.1.1 Identifikasi Kelas

Tabel 3.1 memuat kelas perancangan yang terlibat dalam UC01 beserta kelas analisis terkait pada SKPL.

Tabel 3.1. Identifikasi Kelas Use Case UC01

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
|:--- | :--- | :--- |
| 1 | C01 Program | Program |
| 2 | C02 Pendaftaran | Pendaftaran |
| 3 | C03 Relawan | Relawan |
| 4 | C04 Pengguna | Pengguna |
| 5 | C05 InisiatorProgram | InisiatorProgram |
| 6 | C07 DokumenVerifikasi | DokumenVerifikasi |
| 7 | C12 KelolaAkunPage | KelolaAkunPage |
| 8 | C13 AuthController | AuthController |
| 9 | C14 KelolaProgramPage | KelolaProgramPage |
| 10 | C15 ProgramController | ProgramController |
| 11 | C16 EksplorasiProgramPage | EksplorasiProgramPage |
| 12 | C18 SeleksiController | SeleksiController |
| 13 | C21 CloudStorageAdapter | - (kelas baru tahap perancangan) |
| 14 | C22 BetterAuth | - (kelas baru tahap perancangan) |

### 3.1.2 Sequence Diagram

- **Skenario Normal**

Gambar 3.1 menunjukkan *sequence diagram* UC01 untuk Skenario Normal. Diagram memakai fragmen alt untuk membedakan pendaftaran oleh Relawan dan oleh Inisiator Program. Pada operand [Relawan], KelolaAkunPage meneruskan data diri dan berkas ke AuthController melalui buatAkunBaru(). AuthController memeriksa kelengkapan dan status verifikasi data, mendaftarkan kredensial ke BetterAuth (kata sandi di-*hash* di dalam BetterAuth), mengunggah berkas melalui CloudStorageAdapter, lalu membuat objek Relawan dan DokumenVerifikasi. Setelah akun terbentuk, Relawan memilih program; EksplorasiProgramPage memastikan sesi aktif melalui cekSesi(), lalu permohonan pendaftaran diproses oleh SeleksiController yang meminta Relawan memeriksa kelengkapan data dan kelayakannya sebelum membuat objek Pendaftaran. Pada operand [Inisiator Program], Inisiator Program terlebih dahulu membuat akun melalui KelolaAkunPage dengan alur buatAkunBaru() yang sama dengan Relawan: AuthController memeriksa kelengkapan dan status verifikasi data, mendaftarkan kredensial ke BetterAuth, lalu membuat objek InisiatorProgram. Pada registrasi ini parameter berkas dikirim kosong karena dokumen legalitas lembaga diunggah kemudian melalui formulir program. Setelah itu, Inisiator Program mengisi formulir program pada KelolaProgramPage, dan ProgramController memvalidasi data program, memeriksa status verifikasi InisiatorProgram, mengunggah berkas, serta membuat objek DokumenVerifikasi dan Program.

<p align="center">
<img alt="Sequence Diagram UC01 Skenario Normal" src="./assets/diagram/SD_UC01_normal.png" width="50%">
</p>
<p align="center">
<i>Gambar 3.1. Sequence Diagram UC01 - Skenario Normal</i>
</p>

- **Skenario Alternatif 1: Data Diri Relawan Tidak Lengkap**

Gambar 3.2 menunjukkan *sequence diagram* UC01 untuk Skenario Alternatif 1: Data Diri Relawan Tidak Lengkap. Diagram memuat tiga alur yang masing-masing gagal pada pemeriksaan kelengkapan: registrasi akun Relawan gagal pada validasiKelengkapanData() di AuthController, permohonan pendaftaran program gagal pada cekKelengkapanData() di Relawan, dan pendaftaran program oleh Inisiator gagal pada validasiDataProgram() di ProgramController. Pada setiap alur, tidak ada objek yang dibuat dan halaman terkait menampilkan pesan error yang ditandai dengan *guard* [data tidak lengkap].

<p align="center">
<img alt="Sequence Diagram UC01 Skenario Alternatif 1: Data Diri Relawan Tidak Lengkap" src="./assets/diagram/SD_UC01_alt1.png" width="50%">
</p>
<p align="center">
<i>Gambar 3.2. Sequence Diagram UC01 - Skenario Alternatif 1: Data Diri Relawan Tidak Lengkap</i>
</p>

### 3.1.3 Diagram Kelas

Gambar 3.3 menunjukkan diagram kelas UC01 yang terdiri atas kelas-kelas pada Tabel 3.1. Setiap kelas ditampilkan lengkap dengan atribut dan operasinya sesuai Tabel 4.1, dan relasi antarkelas mengikuti Tabel 4.2. Diagram disusun berlapis dari *View*, *Controller*, kelas pendukung dan integrasi eksternal (BetterAuth dan CloudStorageAdapter), hingga *Model*, dengan superkelas Pengguna di atas Relawan dan InisiatorProgram. Seluruh operasi yang dipanggil pada *sequence diagram* 3.1.2 terdapat pada kelas yang bersangkutan.

<p align="center">
<img alt="Diagram Kelas UC01" src="./assets/diagram/CD_UC01 (3).png" width="35%">
</p>
<p align="center">
<i>Gambar 3.3. Diagram Kelas Use Case UC01 - Daftar program</i>
</p>

<br>

## 3.2 Use Case Login akun

**ID Use Case:** UC02  
**Nama Use Case:** Login akun  
**Kebutuhan fungsional terkait:** KF06

### 3.2.1 Identifikasi Kelas

Tabel 3.2 memuat kelas perancangan yang terlibat dalam UC02 beserta kelas analisis terkait pada SKPL.

Tabel 3.2. Identifikasi Kelas Use Case UC02

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
|:--- | :--- | :--- |
| 1 | C12 KelolaAkunPage | KelolaAkunPage |
| 2 | C13 AuthController | AuthController |
| 3 | C16 EksplorasiProgramPage | EksplorasiProgramPage |
| 4 | C22 BetterAuth | - (kelas baru tahap perancangan) |

### 3.2.2 Sequence Diagram

- **Skenario Normal**

Gambar 3.4 menunjukkan *sequence diagram* UC02 untuk Skenario Normal. Ketika Relawan menekan tombol daftar pada halaman program, EksplorasiProgramPage memeriksa sesi melalui cekSesi() dan, karena Relawan belum masuk, mengarahkannya ke halaman login dengan arahkanKeLogin(). Kredensial yang dimasukkan divalidasi oleh AuthController: status blokir IP diperiksa, kredensial diverifikasi oleh BetterAuth (yang mencocokkan *hash* kata sandi dan mengembalikan idPengguna), percobaan gagal direset, lalu sesi dimulai dan dibuat melalui buatSesiMasuk(). KelolaAkunPage menampilkan status keberhasilan dan mengarahkan Relawan kembali ke halaman program asal dengan arahkanKembali().

<p align="center">
<img alt="Sequence Diagram UC02 Skenario Normal" src="./assets/diagram/SD_UC02_normal.png" width="50%">
</p>
<p align="center">
<i>Gambar 3.4. Sequence Diagram UC02 - Skenario Normal</i>
</p>

- **Skenario Alternatif 1: Kredensial Salah**

Gambar 3.5 menunjukkan *sequence diagram* UC02 untuk Skenario Alternatif 1: Kredensial Salah. Seperti pada skenario normal, Relawan yang belum masuk menekan tombol daftar sehingga EksplorasiProgramPage memeriksa sesi melalui cekSesi() dan mengarahkannya ke halaman login dengan arahkanKeLogin(). Setelah kredensial dimasukkan, cocokkanHash() pada BetterAuth bernilai false sehingga verifikasiKredensial() tidak mengembalikan idPengguna. AuthController mencatat percobaan gagal dari IP tersebut, dan KelolaAkunPage menampilkan pesan gagal masuk yang ditandai dengan *guard* [kredensial salah].

<p align="center">
<img alt="Sequence Diagram UC02 Skenario Alternatif 1: Kredensial Salah" src="./assets/diagram/SD_UC02_alt1.png" width="50%">
</p>
<p align="center">
<i>Gambar 3.5. Sequence Diagram UC02 - Skenario Alternatif 1: Kredensial Salah</i>
</p>

- **Skenario Alternatif 2: Akun Terkunci Sementara**

Gambar 3.6 menunjukkan *sequence diagram* UC02 untuk Skenario Alternatif 2: Akun Terkunci Sementara. Fragmen loop menggambarkan lima percobaan masuk yang gagal secara berturut-turut. Pada setiap percobaan, AuthController memeriksa status blokir IP, BetterAuth gagal memverifikasi kredensial karena cocokkanHash() bernilai false, lalu catatPercobaanGagal() menambah jumlah percobaan gagal dari IP tersebut. Ketika jumlahnya mencapai BATAS_PERCOBAAN (5), AuthController memblokir IP melalui blokirIP() di dalam fragmen opt. Pada percobaan masuk berikutnya, cekStatusBlokir() bernilai true sehingga permintaan masuk ditolak, dan KelolaAkunPage menampilkan peringatan bahwa IP diblokir sementara selama 5 menit, yang ditandai dengan *guard* [IP diblokir].

<p align="center">
<img alt="Sequence Diagram UC02 Skenario Alternatif 2: Akun Terkunci Sementara" src="./assets/diagram/SD_UC02_alt2.png" width="50%">
</p>
<p align="center">
<i>Gambar 3.6. Sequence Diagram UC02 - Skenario Alternatif 2: Akun Terkunci Sementara</i>
</p>

### 3.2.3 Diagram Kelas

Gambar 3.7 menunjukkan diagram kelas UC02 yang terdiri atas kelas-kelas pada Tabel 3.2. Setiap kelas ditampilkan lengkap dengan atribut dan operasinya sesuai Tabel 4.1, dan relasi antarkelas mengikuti Tabel 4.2. BetterAuth hanya dipanggil oleh AuthController dan mengembalikan idPengguna tanpa bergantung pada kelas Pengguna, sedangkan kembali ke halaman asal dilakukan melalui *self-call* arahkanKembali() sehingga tidak ada lingkaran kebergantungan antarhalaman. Seluruh operasi yang dipanggil pada *sequence diagram* 3.2.2 terdapat pada kelas yang bersangkutan.

<p align="center">
<img alt="Diagram Kelas UC02" src="./assets/diagram/CD_UC02.png" width="35%">
</p>
<p align="center">
<i>Gambar 3.7. Diagram Kelas Use Case UC02 - Login akun</i>
</p>

<br>

## 3.3 Use Case Mencari program

**ID Use Case:** UC03  
**Nama Use Case:** Mencari program
**Kebutuhan fungsional terkait:** KF03, KF04

### 3.3.1 Identifikasi Kelas

Tabel 3.3 memuat kelas perancangan yang terlibat dalam UC03 beserta kelas analisis terkait pada SKPL.

Tabel 3.3. Identifikasi Kelas Use Case UC03

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
|:--- | :--- | :--- |
| 1 | C01 Program | Program |
| 2 | C15 ProgramController | ProgramController |
| 3 | C16 EksplorasiProgramPage | EksplorasiProgramPage |

### 3.3.2 Sequence Diagram

- **Skenario Normal**

Gambar 3.8 menunjukkan sequence diagram UC03 untuk Skenario Normal. Relawan membuka halaman eksplorasi melalui bukaHalamanEksplorasi(), kemudian memasukkan kata kunci dan memilih kategori melalui terimaInputPencarian(kataKunci, kategori) pada EksplorasiProgramPage. EksplorasiProgramPage meneruskan permintaan ke ProgramController melalui cariProgram(kataKunci, kategori), yang kemudian memanggil operasi statis Program.cari(kataKunci, kategori) sebagai pemilik data pencarian. Daftar program yang ditemukan dikembalikan berturut-turut ke ProgramController lalu ke EksplorasiProgramPage, yang menampilkannya melalui tampilkanDaftarProgram(daftar).

<p align="center">
<img alt="Sequence Diagram UC03 Skenario Normal" src="./assets/diagram/SD_UC03_normal.png" width="50%">
</p>
<p align="center">
<i>Gambar 3.8. Sequence Diagram UC03 - Skenario Normal</i>
</p>

- **Skenario Alternatif 1: Program Tidak Ditemukan**

Gambar 3.9 menunjukkan sequence diagram UC03 untuk Skenario Alternatif 1: Program Tidak Ditemukan. Alur berjalan sama seperti skenario normal hingga Program.cari(kataKunci, kategori) dipanggil, tetapi pencarian tidak menghasilkan program yang sesuai sehingga daftar kosong dikembalikan. EksplorasiProgramPage kemudian memanggil tampilkanPesanTidakDitemukan(), bukan tampilkanDaftarProgram(), untuk memberi tahu Relawan bahwa tidak ada program yang cocok.

<p align="center">
<img alt="Sequence Diagram UC03 Skenario Alternatif 1: Program Tidak Ditemukan" src="./assets/diagram/SD_UC03_alt.png" width="50%">
</p>
<p align="center">
<i>Gambar 3.9. Sequence Diagram UC03 - Skenario Alternatif 1: Program Tidak Ditemukan</i>
</p>


### 3.3.3 Diagram Kelas

Gambar 3.10 menunjukkan diagram kelas UC03 yang terdiri atas kelas-kelas pada Tabel 3.3. Setiap kelas ditampilkan lengkap dengan atribut dan operasinya sesuai Tabel 4.1, dan relasi antarkelas mengikuti Tabel 4.2 (EksplorasiProgramPage bergantung pada ProgramController, dan ProgramController bergantung pada Program). Seluruh operasi yang dipanggil pada sequence diagram 3.3.2 — cariProgram(), Program.cari() (statis), tampilkanDaftarProgram(), dan tampilkanPesanTidakDitemukan() — terdapat pada kelas yang bersangkutan.

<p align="center">
<img alt="Diagram Kelas UC03" src="./assets/diagram/CD_UC03.png" width="35%">
</p>
<p align="center">
<i>Gambar 3.10. Diagram Kelas Use Case UC03 - Mencari program</i>
</p>

<br>

## 3.4 Use Case Mengunjungi situs program

**ID Use Case:** UC04  
**Nama Use Case:** Mengunjungi situs program
**Kebutuhan fungsional terkait:** KF02

### 3.4.1 Identifikasi Kelas

Tabel 3.4 memuat kelas perancangan yang terlibat dalam UC04 beserta kelas analisis terkait pada SKPL.

Tabel 3.4. Identifikasi Kelas Use Case UC04

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
|:--- | :--- | :--- |
| 1 | C01 Program | Program |
| 2 | C05 InisiatorProgram | InisiatorProgram |
| 3 | C15 ProgramController | ProgramController |
| 4 | C16 EksplorasiProgramPage | EksplorasiProgramPage |

### 3.4.2 Sequence Diagram

- **Skenario Normal**

Gambar 3.11 menunjukkan sequence diagram UC04 untuk Skenario Normal. Relawan memilih program dari daftar melalui pilihProgram(idProgram) pada EksplorasiProgramPage, yang meneruskan permintaan ke ProgramController melalui ambilDetailProgram(idProgram). Untuk memperoleh tautan situs resmi program, ProgramController memanggil Program.getTautan(); Program menelusuri pengelolanya melalui ambilPengelola() (self-call) lalu memanggil InisiatorProgram.getTautan(), yang mengembalikan tautanSitusResmi miliknya. Program meneruskan tautan tersebut ke ProgramController, yang memvalidasinya melalui validasiTautanSitus(url). Detail program beserta status tautan dikembalikan ke EksplorasiProgramPage, yang menampilkannya melalui tampilkanDetailProgram(idProgram). Ketika Relawan mengklik tautan situs resmi (klikTautanSitusResmi()), EksplorasiProgramPage mengarahkan Relawan ke situs tersebut pada tab baru melalui arahkanKeSitusResmi(url).

<p align="center">
<img alt="Sequence Diagram UC04 Skenario Normal" src="./assets/diagram/SD_UC04_normal.png" width="50%">
</p>
<p align="center">
<i>Gambar 3.11. Sequence Diagram UC04 - Skenario Normal</i>
</p>

- **Skenario Alternatif 1: Tautan Tidak Disediakan**

Gambar 3.12 menunjukkan sequence diagram UC04 untuk Skenario Alternatif 1: Tautan Tidak Disediakan. Alur berjalan sama seperti skenario normal hingga InisiatorProgram.getTautan() dipanggil, tetapi lembaga pengelola belum mencantumkan tautan situs resmi sehingga nilai yang dikembalikan kosong. Akibatnya, validasiTautanSitus(url) pada ProgramController bernilai tidak valid, dan EksplorasiProgramPage memanggil nonaktifkanTautan() sebelum menampilkan detail program, sehingga tombol/tautan situs resmi tidak dapat diklik oleh Relawan.

<p align="center">
<img alt="Sequence Diagram UC04 Skenario Alternatif 1: Tautan Tidak Disediakan" src="./assets/diagram/SD_UC04_alt.png" width="50%">
</p>
<p align="center">
<i>Gambar 3.12. Sequence Diagram UC04 - Skenario Alternatif 1: Tautan Tidak Disediakan</i>
</p>


### 3.4.3 Diagram Kelas

Gambar 3.13 menunjukkan diagram kelas UC04 yang terdiri atas kelas-kelas pada Tabel 3.4. Setiap kelas ditampilkan lengkap dengan atribut dan operasinya sesuai Tabel 4.1, dan relasi antarkelas mengikuti Tabel 4.2: EksplorasiProgramPage bergantung pada ProgramController, ProgramController bergantung pada Program, dan Program berasosiasi dengan InisiatorProgram (multiplisitas 0..* : 1) yang dinavigasi melalui ambilPengelola(). Seluruh operasi yang dipanggil pada sequence diagram 3.4.2 — ambilDetailProgram(), getTautan() (pada Program maupun InisiatorProgram), ambilPengelola(), validasiTautanSitus(), tampilkanDetailProgram(), klikTautanSitusResmi(), arahkanKeSitusResmi(), dan nonaktifkanTautan() — terdapat pada kelas yang bersangkutan.

<p align="center">
<img alt="Diagram Kelas UC04" src="./assets/diagram/CD_UC04.png" width="35%">
</p>
<p align="center">
<i>Gambar 3.13. Diagram Kelas Use Case UC04 - Mengunjungi situs program</i>
</p>

<br>

## 3.5 Use Case Menyeleksi calon relawan pendaftar

**ID Use Case:** UC05  
**Nama Use Case:** Menyeleksi calon relawan pendaftar

### 3.5.1 Identifikasi Kelas

Identifikasi kelas yang terkait dengan use case tersebut. Kelas di tahap perancangan dapat berbeda dengan dengan kelas di tahap analisis. Dapat menggunakan tabel di bawah:

Tabel 3.5.1 Identifikasi Kelas Use Case [UC05]

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
|:--- | :--- | :--- |
| 1 | C01 Program| Program |
| 2 | C02 Pendaftaran | Pendaftaran |
| 3 | C17 KelolaPendaftarPage | KelolaPendaftarPage |
| 4 | C18 SeleksiController | SeleksiController |

### 3.5.2 Sequence Diagram

- **Skenario Normal**

Gambar 3.14 menunjukkan sequence diagram UC05 untuk Skenario Normal. Inisiator Program membuka halaman pendaftar melalui bukaKelolaPendaftar(idProgram) pada KelolaPendaftarPage, yang meminta daftar pendaftar ke SeleksiController melalui lihatDaftarRelawan(idProgram). SeleksiController memperoleh daftar tersebut dari Program.daftarPendaftar(), lalu mengembalikannya sebagai List<Pendaftaran> sehingga KelolaPendaftarPage dapat menampilkannya melalui tampilkanDaftarPendaftar(daftar) dan tampilkanFormSeleksi(). Inisiator Program menentukan keputusan untuk setiap pendaftar melalui pilihStatusSeleksi(idPendaftaran, status), kemudian mengirimkannya melalui kirimHasilSeleksi(), yang diteruskan ke SeleksiController melalui simpanHasilSeleksi(idProgram, keputusan). Untuk setiap keputusan seleksi (fragmen loop), keputusan DITERIMA divalidasi terhadap kuota melalui validasiKuota(idProgram, jumlahDiterimaBaru), yang memanggil Program.cekKuotaTersedia(jumlahTambahan) (Program menghitung jumlah relawan diterima melalui hitungJumlahDiterima()) dan dilanjutkan dengan Pendaftaran.terima(), sedangkan keputusan DITOLAK langsung memanggil Pendaftaran.tolak(). Hasil penyimpanan dikembalikan sebagai Boolean dan KelolaPendaftarPage menampilkan tampilkanNotifikasiBerhasil().

<p align="center">
<img alt="Sequence Diagram UC05 Skenario Normal" src="./assets/diagram/SD_UC05_normal (1).png" width="100%">
</p>
<p align="center">
<i>Gambar 3.14. Sequence Diagram UC05 - Skenario Normal</i>
</p>

- **Skenario Alternatif 1: Kuota Relawan Telah Terpenuhi**

Gambar 3.15 menunjukkan sequence diagram UC05 untuk Skenario Alternatif 1: Kuota Relawan Telah Terpenuhi. Alur dimulai ketika Inisiator Program mengirim hasil seleksi melalui kirimHasilSeleksi(), yang diteruskan ke SeleksiController melalui simpanHasilSeleksi(idProgram, keputusan). 
Pada validasiKuota(idProgram, jumlahDiterimaBaru), Program.cekKuotaTersedia(jumlahTambahan) mengembalikan false karena jumlah relawan diterima akan melampaui kuota. SeleksiController mengembalikan nilai tersebut ke KelolaPendaftarPage, yang menampilkan tampilkanPesanError(pesan). Inisiator Program kemudian mengubah pilihannya menjadi DITOLAK melalui pilihStatusSeleksi(idPendaftaran, status), dan alur kembali ke simpanHasilSeleksi() pada skenario normal.

<p align="center">
<img alt="Sequence Diagram UC05 Skenario Alternatif 1: Kuota Relawan Telah Terpenuhi" src="./assets/diagram/SD_UC05_alt1 (1).png" width="100%">
</p>
<p align="center">
<i>Gambar 3.15. Sequence Diagram UC05 - Skenario Alternatif 1: Kuota Relawan Telah Terpenuhi</i>
</p>

### 3.5.3 Diagram Kelas

Gambar 3.16 menunjukkan diagram kelas UC05 yang terdiri atas kelas-kelas pada Tabel 3.5. Setiap kelas ditampilkan lengkap dengan atribut dan operasinya sesuai Tabel 4.1, dan relasi antarkelas mengikuti Tabel 4.2: KelolaPendaftarPage bergantung pada SeleksiController (memanggil), SeleksiController bergantung pada Pendaftaran (membuat pendaftaran & menetapkan hasil seleksi) dan pada Program (memeriksa kuota & mengambil pendaftar), serta Program berasosiasi dengan Pendaftaran (multiplisitas 1 : 0..*, label "untuk"). Seluruh operasi yang dipanggil pada sequence diagram 3.5.2 — lihatDaftarRelawan(), simpanHasilSeleksi(), validasiKuota(), daftarPendaftar(), cekKuotaTersedia(), hitungJumlahDiterima(), terima(), tolak(), bukaKelolaPendaftar(), tampilkanDaftarPendaftar(), tampilkanFormSeleksi(), pilihStatusSeleksi(), kirimHasilSeleksi(), tampilkanNotifikasiBerhasil(), dan tampilkanPesanError() — terdapat pada kelas yang bersangkutan.

<p align="center">
<img alt="Diagram Kelas UC05" src="./assets/diagram/CD_UC05 (1).png" width="100%">
</p>
<p align="center">
<i>Gambar 3.16. Diagram Kelas Use Case UC05 - Menyeleksi calon relawan pendaftar</i>
</p>

<br>
## 3.6 Konfirmasi Status Pendaftaran

**ID Use Case:** UC06 
**Nama Use Case:** Konfirmasi Status Pendaftaran

### 3.6.1 Identifikasi Kelas

Identifikasi kelas yang terkait dengan use case tersebut. Kelas di tahap perancangan dapat berbeda dengan dengan kelas di tahap analisis. Dapat menggunakan tabel di bawah:

Tabel 3.6.1 Identifikasi Kelas Use Case [UC05]

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
|:--- | :--- | :--- |
| 1 | C01 Program| Program |
| 2 | C02 Pendaftaran | Pendaftaran |
| 3 | C03 Relawan | Relawan |
| 4 | C04 Pengguna | Pengguna |
| 5 | C10 Notifikasi |  |
| 6 | C12 KelolaAkunPage | KelolaAkunPage |
| 7 | C13 AuthController | AuthController |
| 8 | C17 KelolaPendaftarPage | KelolaPendaftarPage |
| 9 | C18 SeleksiController | SeleksiController |

### 3.6.2 Sequence Diagram

- **Skenario Normal**

Gambar 3.17 menunjukkan sequence diagram UC06 untuk Skenario Normal. Inisiator Program mengonfirmasi hasil seleksi melalui kirimKonfirmasiHasil() pada KelolaPendaftarPage, yang meneruskannya ke SeleksiController melalui konfirmasiHasilSeleksi(idProgram). SeleksiController memperoleh daftar pendaftar dari Program.daftarPendaftar(), lalu pada fragmen loop memastikan setiap pendaftaran telah diputuskan melalui Pendaftaran.sudahDiputuskan(). Setelah seluruh pendaftaran terbukti sudah diputuskan, fragmen loop berikutnya membuat notifikasi untuk setiap pendaftaran melalui triggerNotifikasi(pendaftaran), yang membuat objek Notifikasi (<<create>>) dan mengirimkannya melalui kirim(). 

Hasil dikembalikan sebagai Boolean dan KelolaPendaftarPage menampilkan tampilkanKonfirmasiHasil(). Selanjutnya, Relawan membuka menu notifikasi melalui bukaMenuNotifikasi() pada KelolaAkunPage, yang meminta ambilNotifikasi(idPengguna) ke AuthController; AuthController memperoleh daftar notifikasi dari Relawan.lihatNotifikasi() (diwarisi dari Pengguna), kemudian KelolaAkunPage menampilkannya melalui tampilkanDaftarNotifikasi(daftar). Ketika Relawan memilih notifikasi melalui pilihNotifikasi(idNotifikasi), KelolaAkunPage memanggil bacaNotifikasi(idNotifikasi) pada AuthController, yang menandai notifikasi terbaca melalui Notifikasi.baca() dan mengambil isinya melalui Notifikasi.showDetail(), lalu menampilkannya melalui tampilkanDetailNotifikasi(detail).

<p align="center">
<img alt="Sequence Diagram UC06 Skenario Normal" src="./assets/diagram/SD_UC06_normal (1).png" width="100%">
</p>
<p align="center">
<i>Gambar 3.17. Sequence Diagram UC06 - Skenario Normal</i>
</p>

- **Skenario Alternatif 1: Masih Ada Pendaftar yang Belum Diseleksi**

Gambar 3.18 menunjukkan sequence diagram UC06 untuk Skenario Alternatif 1: Masih Ada Pendaftar yang Belum Diseleksi. Alur berjalan sama seperti skenario normal hingga SeleksiController memanggil Program.daftarPendaftar() dan memeriksa setiap pendaftaran melalui Pendaftaran.sudahDiputuskan(). 
Karena minimal satu pendaftaran bernilai false, konfirmasiHasilSeleksi(idProgram) mengembalikan false dan tidak ada notifikasi yang dibuat maupun dikirim. KelolaPendaftarPage kemudian menampilkan tampilkanPesanError(pesan) sehingga Inisiator Program dapat menyelesaikan seleksi terlebih dahulu.

<p align="center">
<img alt="Sequence Diagram UC06 Skenario Alternatif 1: Masih Ada Pendaftar yang Belum Diseleksi" src="./assets/diagram/SD_UC06_alt1 (1).png" width="100%">
</p>
<p align="center">
<i>Gambar 3.18. Sequence Diagram UC06 - Skenario Alternatif 1: Masih Ada Pendaftar yang Belum Diseleksi</i>
</p>

### 3.6.3 Diagram Kelas

Gambar 3.19 menunjukkan diagram kelas UC06 yang terdiri atas kelas-kelas pada Tabel 3.6. Setiap kelas ditampilkan lengkap dengan atribut dan operasinya sesuai Tabel 4.1, dan relasi antarkelas mengikuti Tabel 4.2: 
Relawan merupakan generalisasi dari Pengguna; Pengguna berasosiasi dengan Notifikasi (1 : 0..*, "menerima"); Relawan dan Program masing-masing berasosiasi dengan Pendaftaran (1 : 0..*, "mengajukan" dan "untuk"); KelolaAkunPage bergantung pada AuthController dan KelolaPendaftarPage bergantung pada SeleksiController (memanggil); AuthController bergantung pada Relawan (membuat akun relawan) dan Notifikasi (mengambil notifikasi); serta SeleksiController bergantung pada Pendaftaran, Program, Relawan, dan Notifikasi. Seluruh operasi yang dipanggil pada sequence diagram 3.6.2 — konfirmasiHasilSeleksi(), daftarPendaftar(), sudahDiputuskan(), triggerNotifikasi(), kirim(), ambilNotifikasi(), lihatNotifikasi(), bacaNotifikasi(), baca(), showDetail(), kirimKonfirmasiHasil(), tampilkanKonfirmasiHasil(), tampilkanPesanError(), bukaMenuNotifikasi(), pilihNotifikasi(), tampilkanDaftarNotifikasi(), dan tampilkanDetailNotifikasi() — terdapat pada kelas yang bersangkutan.

<p align="center">
<img alt="Diagram Kelas UC06" src="./assets/diagram/CD_UC06 (!).png" width="100%">
</p>
<p align="center">
<i>Gambar 3.19. Diagram Kelas Use Case UC06 - Konfirmasi status pendaftaran</i>
</p>

<br>

## 3.7 Use Case 07 : Memperbarui status program
**ID Use Case:** UC07
**Nama Use Case:** Memperbarui Status Program

### 3.7.1 Identifikasi Kelas

Tabel 3.7 memuat kelas perancangan yang terlibat dalam UC07 beserta kelas analisis terkait pada SKPL.

Tabel 3.7. Identifikasi Kelas Use Case [UC07]

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
|:--- | :--- | :--- |
| 1 | C01 Program | Program |
| 2 | C06 Verifikator | Verifikator |
| 3 | C09 LaporanProgram | LaporanProgram |
| 4 | C10 Notifikasi | Notifikasi |
| 5 | C14 KelolaProgramPage | KelolaProgramPage |
| 6 | C15 ProgramController | ProgramController |
| 7 | C20 PresensiController	| PresensiController |
| 8 | C21 CloudStorageAdapter | CloudStorageAdapter |

### 3.7.2 Sequence Diagram

- **Skenario Normal**

Gambar 3.20 menunjukkan sequence diagram UC08 untuk Skenario Normal. Relawan membuka halaman kegiatan melalui AreaKegiatanPage, kemudian PresensiController memvalidasi status penerimaan relawan dan waktu pelaksanaan program melalui validasiStatusRelawan() dan validasiWaktuPelaksanaan(). Apabila kedua validasi berhasil, sistem mengaktifkan tombol check-in dan menampilkan keterangan waktu kegiatan. Ketika relawan melakukan check-in, PresensiController memproses pencatatan kehadiran melalui prosesCheckIn(). Setelah kehadiran berhasil dicatat, sistem memperbarui portofolio relawan dan menampilkan status check-in. Relawan juga dapat membuka portofolio untuk melihat total jam aksi melalui ambilTotalJamAksi() dan riwayat program melalui ambilRiwayatProgram(), yang kemudian ditampilkan oleh AreaKegiatanPage.

<p align="center">
<img alt="" src="./assets/diagram/sd(normal)_uc07.png" width="50%">
</p>
<p align="center">
<i>Gambar 3.20 Sequence Diagram UC07 : Memperbarui Status Program </i>
</p>

- **Skenario Alternatif 1 : Verifikator Menolak Laporan Akhir**

Gambar 3.21 menunjukkan sequence diagram UC07 untuk skenario alternatif: Laporan Akhir Program Ditolak. Verifikator menolak laporan akhir program dan memberikan catatan revisi sehingga tolakLaporan() dipanggil. Akibatnya, status laporan diperbarui menjadi “Perlu Revisi” melalui updateStatus(), dan sistem mengirimkan notifikasi kepada Inisiator melalui buatNotifikasi() agar laporan dapat diperbaiki.

<p align="center">
<img alt="" src="./assets/diagram/sd(alt)_uc07.png" width="50%">
</p>
<p align="center">
<i>Gambar 3.21 Sequence Diagram UC07 : Memperbarui Status Program - Verifikator Menolak Laporan Akhir</i>
</p>

### 3.7.3 Diagram Kelas

Gambar 3.22 menunjukkan diagram kelas UC07 yang terdiri atas kelas-kelas pada Tabel 3.7. Setiap kelas ditampilkan lengkap dengan atribut dan operasinya sesuai Tabel 4.1, dan relasi antarkelas mengikuti Tabel 4.2. Seluruh operasi yang dipanggil pada *sequence diagram* 3.7.2 terdapat pada kelas yang bersangkutan

<p align="center">
<img alt="" src="./assets/diagram/cd_uc07.jpg" width="35%">
</p>
<p align="center">
<i>Gambar 3.22 Diagram Kelas UC07 : Memperbarui Status Program</i>
</p>

<br>

## 3.8 Use Case 08 : Konfirmasi kehadiran program
**ID Use Case:** UC08
**Nama Use Case:** Konfirmasi Kehadiran Program

### 3.8.1 Identifikasi Kelas

Tabel 3.8 memuat kelas perancangan yang terlibat dalam UC08 beserta kelas analisis terkait pada SKPL.

Tabel 3.8. Identifikasi Kelas Use Case [UC08]

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
|:---|:---|:---|
| 1 | C01 Program | Program |
| 2 | C02 Pendaftaran | Pendaftaran |
| 3 | C08 Kehadiran | Kehadiran |
| 4 | C19 AreaKegiatanPage | AreaKegiatanPage |
| 5 | C20 PresensiController | PresensiController |

### 3.8.2 Sequence Diagram

- **Skenario Normal**

Gambar 3.23 menunjukkan sequence diagram UC08 untuk Skenario Normal. Relawan membuka halaman kegiatan melalui AreaKegiatanPage, kemudian PresensiController memvalidasi status penerimaan relawan dan waktu pelaksanaan program melalui validasiStatusRelawan() dan validasiWaktuPelaksanaan(). Apabila kedua validasi berhasil, sistem mengaktifkan tombol check-in dan menampilkan keterangan waktu kegiatan. Ketika relawan melakukan check-in, PresensiController memproses pencatatan kehadiran melalui prosesCheckIn(). Setelah kehadiran berhasil dicatat, sistem memperbarui portofolio relawan dan menampilkan status check-in. Relawan juga dapat membuka portofolio untuk melihat total jam aksi melalui ambilTotalJamAksi() dan riwayat program melalui ambilRiwayatProgram(), yang kemudian ditampilkan oleh AreaKegiatanPage.

<p align="center">
<img alt="" src="./assets/diagram/sd(normal)_uc08.png" width="50%">
</p>
<p align="center">
<i>Gambar 3.23 Sequence Diagram UC08 : Konfirmasi Kehadiran Program </i>
</p>

- **Skenario Alternatif 1** : Check-in di Luar Waktu Pelaksanaan 

Gambar 3.24 menunjukkan sequence diagram UC08 untuk skenario alternatif: Relawan Membuka Halaman di Luar Jadwal Kegiatan. Sistem memvalidasi status relawan dan waktu pelaksanaan kegiatan melalui validasiStatusRelawan() dan validasiWaktuPelaksanaan(). Karena waktu akses berada di luar jadwal kegiatan, tombol check-in dinonaktifkan dan rentang waktu pelaksanaan ditampilkan kepada relawan. Akibatnya, catatKehadiran() tidak dipanggil sehingga catatan kehadiran tidak dibuat.

<p align="center">
<img alt="" src="./assets/diagram/sd(alt)_uc08.png" width="50%">
</p>
<p align="center">
<i>Gambar 3.24 Sequence Diagram UC08 : Konfirmasi Kehadiran program - Check-in di Luar Waktu Pelaksanaan </i>
</p>

### 3.8.3 Diagram Kelas

Gambar 3.25 menunjukkan diagram kelas UC08 yang terdiri atas kelas-kelas pada Tabel 3.8. Setiap kelas ditampilkan lengkap dengan atribut dan operasinya sesuai Tabel 4.1, dan relasi antarkelas mengikuti Tabel 4.2. Seluruh operasi yang dipanggil pada *sequence diagram* 3.8.2 terdapat pada kelas yang bersangkutan

<p align="center">
<img alt="" src="./assets/diagram/cd_uc08.jpg" width="35%">
</p>
<p align="center">
<i>Gambar 3.25 Diagram Kelas UC08 : Konfirmasi Kehadiran Program </i>
</p>

## 3.9 Use Case Memperbarui status akun relawan

**ID Use Case:** UC09  
**Nama Use Case:** Memperbarui status akun relawan  
**Kebutuhan fungsional terkait:** KF15

### 3.9.1 Identifikasi Kelas

Tabel 3.9 memuat kelas perancangan yang terlibat dalam UC09 beserta kelas analisis terkait pada SKPL.

Tabel 3.9. Identifikasi Kelas Use Case UC09

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
|:--- | :--- | :--- |
| 1 | C01 Program | Program |
| 2 | C02 Pendaftaran | Pendaftaran |
| 3 | C03 Relawan | Relawan |
| 4 | C08 Kehadiran | Kehadiran |
| 5 | C11 RiwayatKontribusi | RiwayatKontribusi |
| 6 | C14 KelolaProgramPage | KelolaProgramPage |
| 7 | C15 ProgramController | ProgramController |
| 8 | C19 AreaKegiatanPage | AreaKegiatanPage |
| 9 | C20 PresensiController | PresensiController |

### 3.9.2 Sequence Diagram

- **Skenario Normal**

Gambar 3.26 menunjukkan *sequence diagram* UC09 untuk Skenario Normal. Persetujuan laporan akhir oleh Verifikator dirujuk ke UC07 melalui fragmen `ref`. Setelah itu, PresensiController meminta Program menyusun daftar relawan yang pendaftarannya diterima. Untuk setiap relawan, PresensiController meminta Relawan mencatat kontribusinya. Relawan memeriksa kehadirannya sendiri dengan menelusuri setiap catatan Kehadiran miliknya, dan apabila hadir, RiwayatKontribusi menambahkan program itu sekaligus menghitung jam aksinya dari durasi program. Setiap keputusan diambil oleh objek pemilik informasinya (gaya kendali didelegasikan). Ketika Relawan membuka portofolio, AreaKegiatanPage meminta total jam aksi (`ambilTotalJamAksi()`) dan daftar program selesai (`ambilRiwayatProgram()`) kepada PresensiController, lalu menampilkan keduanya; setiap nilai yang ditampilkan berasal dari panah balik pada diagram.

<p align="center">
<img alt="Sequence Diagram UC09 Skenario Normal" src="./assets/diagram/SD_UC09_normal.png" width="100%">
</p>
<p align="center">
<i>Gambar 3.26. Sequence Diagram UC09 - Skenario Normal</i>
</p>

- **Skenario Alternatif 1: Relawan Tidak Melakukan Check-in Saat Kegiatan**

Gambar 3.27 menunjukkan *sequence diagram* UC09 untuk Skenario Alternatif 1: Relawan Tidak Melakukan Check-in Saat Kegiatan. Relawan tidak memiliki catatan Kehadiran untuk program tersebut sehingga `hadirPada()` bernilai false. Akibatnya, `tambahRiwayatProgram()` tidak dipanggil, `catatKontribusi()` mengembalikan false, dan total jam aksi yang ditampilkan pada portofolio tidak bertambah untuk program tersebut.

<p align="center">
<img alt="Sequence Diagram UC09 Skenario Alternatif 1: Relawan Tidak Melakukan Check-in Saat Kegiatan" src="./assets/diagram/SD_UC09_alt1.png" width="100%">
</p>
<p align="center">
<i>Gambar 3.27. Sequence Diagram UC09 - Skenario Alternatif 1: Relawan Tidak Melakukan Check-in Saat Kegiatan</i>
</p>

### 3.9.3 Diagram Kelas

Gambar 3.28 menunjukkan diagram kelas UC09 yang terdiri atas kelas-kelas pada Tabel 3.9. Setiap kelas ditampilkan lengkap dengan atribut dan operasinya sesuai Tabel 4.1, dan relasi antarkelas mengikuti Tabel 4.2. Seluruh operasi yang dipanggil pada *sequence diagram* 3.9.2 terdapat pada kelas yang bersangkutan.

<p align="center">
<img alt="Diagram Kelas UC09" src="./assets/diagram/CD_UC09_perancangan.png" width="100%">
</p>
<p align="center">
<i>Gambar 3.28. Diagram Kelas Use Case UC09 - Memperbarui status akun relawan</i>
</p>

<br>


---

# BAB 4: Diagram Kelas Keseluruhan

# BAB 4: Diagram Kelas Keseluruhan

## 4.1 Diagram Kelas

Diagram kelas perancangan keseluruhan RekanBumi menggabungkan seluruh kelas yang terlibat pada realisasi *use case* UC01–UC09, yaitu lima *Boundary Class* (*View*), empat *Controller Class* (*Controller*), sebelas *Entity Class* (*Model*), satu kelas integrasi eksternal (CloudStorageAdapter), dan satu kelas pendukung (BetterAuth). Kelas-kelas tersebut dikelompokkan sesuai lapisan MVC pada BAB 2. Tipe enumerasi yang dipakai sebagai tipe atribut disajikan pada subbab 4.3.

Beberapa ketentuan yang berlaku pada rancangan ini:
1. Visibilitas ditulis dengan simbol `+` (*public*), `-` (*private*), dan `#` (*protected*). Atribut *entity* bersifat *private* dan diakses melalui operasi kelas tersebut. Operasi statis ditulis dengan garis bawah (pada Tabel 4.1 ditandai `{static}`).
2. Penyimpanan data persisten dilakukan oleh Prisma ORM dan tidak dimodelkan sebagai kelas, sehingga operasi CRUD generik (misalnya *find* atau *save*) dan konstruktor tidak dituliskan. Pada *sequence diagram*, pembuatan objek digambarkan dengan pesan `<<create>>`, sedangkan pengambilan sekumpulan objek dilakukan melalui operasi pemilik datanya, yaitu `Program.cari()` dan navigasi asosiasi seperti `Program.daftarPendaftar()`. Dengan demikian, setiap panah penuh pada *sequence diagram* merupakan operasi pada kelas penerimanya.
3. Kredensial akun dikelola sepenuhnya oleh BetterAuth, yaitu *hashing* kata sandi (KNF02), penyimpanan dan verifikasi kredensial, serta pengelolaan sesi. BetterAuth hanya mengembalikan `idPengguna`, sehingga lapisan pendukung tidak bergantung pada kelas *Model*.
4. Tipe `FormData` merepresentasikan kumpulan data isian formulir dari peramban, `File` merepresentasikan berkas unggahan, dan `String[]` merupakan daftar pesan kesalahan hasil validasi (kosong apabila data valid).
5. Status verifikasi Relawan diperoleh dari verifikasi email akun oleh Better Auth. Status verifikasi InisiatorProgram dan DokumenVerifikasi diperbarui oleh Verifikator di luar cakupan UC01–UC09, sehingga tidak dimodelkan sebagai operasi.
6. Gaya kendali yang dipakai adalah didelegasikan. *Controller* mengoordinasikan alur, sedangkan keputusan diambil oleh objek pemilik informasinya, misalnya `Program.cekKuotaTersedia()`, `Program.selesaikan()`, `Verifikator.konfirmasiLaporan()`, `Pendaftaran.terima()`, `Relawan.catatKontribusi()`, dan `RiwayatKontribusi.tambahRiwayatProgram()`. Perubahan status tidak dilakukan dengan *setter*, melainkan melalui operasi yang menyatakan maksudnya.
7. Kebergantungan hanya mengarah ke lapisan yang sama atau ke lapisan di bawahnya (*View* → *Controller* → *Model*) dan tidak membentuk lingkaran. BetterAuth dan CloudStorageAdapter adalah penghubung ke pustaka autentikasi dan layanan *cloud storage*; pada pandangan tiga lapisan MVC keduanya berada di lapisan terbawah bersama *Model* dan hanya dipanggil oleh *Controller*. Kelas *entity* sengaja tidak memanggil keduanya agar kelas domain tidak bergantung pada pustaka atau layanan eksternal (*dependency inversion*), sehingga penggantian pustaka autentikasi atau penyedia penyimpanan tidak mengubah kelas *Model*.
8. Bentuk relasi tidak dibuat lebih kuat dari maksudnya. Komposisi hanya dipakai apabila bagian tidak bermakna tanpa keseluruhannya, agregasi dipakai untuk pengelompokan yang bagiannya tetap ada sendiri, dan multiplisitas menyatakan aturan pada SKPL (misalnya batas kuota KF05 dijaga oleh `Program.cekKuotaTersedia()`).

<p align="center">
<img alt="Diagram Kelas Perancangan Keseluruhan RekanBumi" src="./assets/diagram/diagram-kelas-keseluruhan.png" width="100%">
</p>
<p align="center">
<i>Gambar 4.1. Diagram Kelas Perancangan Keseluruhan RekanBumi</i>
</p>

Gambar 4.1 disusun berlapis dari atas ke bawah, yaitu *View*, *Controller*, kelas pendukung dan integrasi eksternal, lalu *Model*, dengan garis mendatar dan tegak serta superkelas Pengguna di atas subkelasnya. Tipe enumerasi tidak digambar sebagai kotak tersendiri agar diagram tetap terbaca; daftarnya disajikan pada Tabel 4.3.

Tabel 4.1. Daftar Kelas Perancangan Keseluruhan

| ID Kelas | Nama Kelas | Atribut | Metode/Operasi |
| :--- | :--- | :--- | :--- |
| C01 | Program «entity» | `- idProgram: String`<br>`- namaProgram: String`<br>`- deskripsi: String`<br>`- kategori: KategoriProgram`<br>`- tempatPelaksanaan: String`<br>`- waktuMulai: DateTime`<br>`- waktuSelesai: DateTime`<br>`- kuota: Integer`<br>`- syaratKetentuan: String`<br>`- status: StatusProgram` | `+ cekKuotaTersedia(jumlahTambahan: Integer): Boolean`<br>`- hitungJumlahDiterima(): Integer`<br>`+ ajukanKonfirmasi(): StatusProgram`<br>`+ selesaikan(): StatusProgram`<br>`+ mintaRevisi(): StatusProgram`<br>`+ cekDalamWaktuPelaksanaan(waktu: DateTime): Boolean`<br>`+ keteranganWaktu(): String`<br>`+ hitungDurasiJam(): Float`<br>`+ getTautan(): String`<br>`+ ambilPengelola(): InisiatorProgram`<br>`+ daftarPendaftar(): List<Pendaftaran>`<br>`+ daftarRelawanDiterima(): List<Relawan>`<br>`+ cari(kataKunci: String, kategori: KategoriProgram): List<Program> {static}` |
| C02 | Pendaftaran «entity» | `- idPendaftaran: String`<br>`- keterampilan: String`<br>`- ketersediaanWaktu: String`<br>`- status: StatusPendaftaran`<br>`- waktuDaftar: DateTime` | `+ terima(): void`<br>`+ tolak(): void`<br>`+ isDiterima(): Boolean`<br>`+ sudahDiputuskan(): Boolean` |
| C03 | Relawan «entity»<br>*turunan Pengguna* | `- idRelawan: String`<br>`- nama: String`<br>`- noTelepon: String`<br>`- domisili: String`<br>`- statusVerifikasi: StatusVerifikasi` | `+ cekKelengkapanData(): Boolean`<br>`+ cekStatusKelayakan(): Boolean`<br>`+ lihatPortofolio(): RiwayatKontribusi`<br>`+ catatKontribusi(program: Program): Boolean`<br>`- hadirPada(program: Program): Boolean` |
| C04 | Pengguna «entity» *(abstract)* | `# idPengguna: String`<br>`# email: String` | `+ lihatNotifikasi(): List<Notifikasi>` |
| C05 | InisiatorProgram «entity»<br>*turunan Pengguna* | `- idInisiator: String`<br>`- namaLembaga: String`<br>`- tautanSitusResmi: String [0..1]`<br>`- statusVerifikasi: StatusVerifikasi` | `+ cekStatusVerifikasi(): Boolean`<br>`+ getTautan(): String` |
| C06 | Verifikator «entity»<br>*turunan Pengguna* | `- idVerifikator: String`<br>`- nama: String` | `+ konfirmasiLaporan(laporan: LaporanProgram): void`<br>`+ tolakLaporan(laporan: LaporanProgram, catatanRevisi: String): void` |
| C07 | DokumenVerifikasi «entity» | `- idDokumen: String`<br>`- jenisDokumen: String`<br>`- urlFile: String`<br>`- statusVerifikasi: StatusVerifikasi` | - |
| C08 | Kehadiran «entity» | `- idKehadiran: String`<br>`- waktuKehadiran: DateTime` | `+ untukProgram(program: Program): Boolean` |
| C09 | LaporanProgram «entity» | `- idLaporan: String`<br>`- dokumentasiAkhir: List<String>`<br>`- ringkasanCapaian: String`<br>`- catatanRevisi: String [0..1]`<br>`- statusPeninjauan: StatusPeninjauan`<br>`- waktuPengajuan: DateTime` | `+ uploadDokumentasi(urlFile: String): void`<br>`+ setujui(verifikator: Verifikator): void`<br>`+ tolak(verifikator: Verifikator, catatanRevisi: String): void`<br>`+ showSummary(): String`<br>`+ showDokumentasi(): List<String>` |
| C10 | Notifikasi «entity» | `- idNotifikasi: String`<br>`- pesan: String`<br>`- waktuKirim: DateTime`<br>`- statusDibaca: Boolean` | `+ kirim(): void`<br>`+ baca(): void`<br>`+ showDetail(): String` |
| C11 | RiwayatKontribusi «entity» | `- idRiwayat: String`<br>`- totalJamAksi: Float` | `+ tambahRiwayatProgram(program: Program): void`<br>`- perbaruiJamAksi(jamAksi: Float): void`<br>`+ getTotalJamAksi(): Float`<br>`+ getDaftarProgramSelesai(): List<Program>` |
| C12 | KelolaAkunPage «boundary» | `- dataDiri: FormData`<br>`- berkas: File`<br>`- formLogin: FormData`<br>`- urlKembali: String` | `+ bukaHalamanRegistrasi(): void`<br>`+ tampilkanFormRegistrasi(): void`<br>`+ isiFormRegistrasi(dataDiri: FormData): void`<br>`+ unggahDokumen(berkas: File): void`<br>`+ kirimPendaftaran(): void`<br>`+ tampilkanNotifikasiBerhasil(): void`<br>`+ tampilkanPesanError(pesan: String): void`<br>`+ arahkanKeLogin(urlKembali: String): void`<br>`+ arahkanKembali(): void`<br>`+ tampilkanFormLogin(): void`<br>`+ terimaInputKredensial(email: String, kataSandi: String): void`<br>`+ tampilkanPesanStatus(pesan: String): void`<br>`+ bukaMenuNotifikasi(): void`<br>`+ pilihNotifikasi(idNotifikasi: String): void`<br>`+ tampilkanDaftarNotifikasi(daftar: List<Notifikasi>): void`<br>`+ tampilkanDetailNotifikasi(detail: String): void` |
| C13 | AuthController «control» | `- percobaanGagal: Map<String, Integer>`<br>`- waktuBlokir: Map<String, DateTime>`<br>`- BATAS_PERCOBAAN: Integer = 5`<br>`- DURASI_BLOKIR_MENIT: Integer = 5` | `+ buatAkunBaru(dataDiri: FormData, berkas: File): Pengguna`<br>`- validasiKelengkapanData(dataDiri: FormData, berkas: File): String[]`<br>`- cekStatusVerifikasi(dataDiri: FormData): StatusVerifikasi`<br>`+ cekSesi(): Boolean`<br>`+ validasiKredensial(email: String, kataSandi: String, ip: String): Boolean`<br>`- cekStatusBlokir(ip: String): Boolean`<br>`- catatPercobaanGagal(ip: String): Integer`<br>`- blokirIP(ip: String): void`<br>`- resetPercobaanGagal(ip: String): void`<br>`- mulaiSesi(idPengguna: String): String`<br>`+ ambilNotifikasi(idPengguna: String): List<Notifikasi>`<br>`+ bacaNotifikasi(idNotifikasi: String): Notifikasi` |
| C14 | KelolaProgramPage «boundary» | `- dataProgram: FormData`<br>`- berkas: File` | `+ bukaHalamanDaftarProgram(): void`<br>`+ tampilkanFormProgram(): void`<br>`+ isiFormProgram(dataProgram: FormData): void`<br>`+ unggahDokumen(berkas: File): void`<br>`+ kirimPendaftaran(): void`<br>`+ tampilkanFormLaporan(idProgram: String): void`<br>`+ unggahLaporanAkhir(idProgram: String, dokumentasi: List<File>, ringkasanCapaian: String): void`<br>`+ pilihLaporan(idLaporan: String): void`<br>`+ tampilkanLaporanUntukDitinjau(laporan: LaporanProgram): void`<br>`+ kirimPersetujuanLaporan(idLaporan: String): void`<br>`+ kirimPenolakanLaporan(idLaporan: String, catatanRevisi: String): void`<br>`+ tampilkanStatusProgram(status: StatusProgram): void`<br>`+ tampilkanNotifikasiBerhasil(): void`<br>`+ tampilkanPesanError(pesan: String): void` |
| C15 | ProgramController «control» | - | `+ simpanProgramBaru(idInisiator: String, dataProgram: FormData, berkas: File): Program`<br>`- validasiDataProgram(dataProgram: FormData, berkas: File): String[]`<br>`+ cariProgram(kataKunci: String, kategori: KategoriProgram): List<Program>`<br>`+ ambilDetailProgram(idProgram: String): Program`<br>`- validasiTautanSitus(url: String): Boolean`<br>`+ ajukanLaporanAkhir(idProgram: String, dokumentasi: List<File>, ringkasanCapaian: String): StatusProgram`<br>`- validasiLaporan(dokumentasi: List<File>, ringkasanCapaian: String): String[]`<br>`+ tinjauLaporan(idLaporan: String): LaporanProgram`<br>`+ konfirmasiLaporan(idLaporan: String, idVerifikator: String): StatusProgram`<br>`+ tolakLaporan(idLaporan: String, idVerifikator: String, catatanRevisi: String): StatusProgram`<br>`- buatNotifikasi(penerima: Pengguna, pesan: String): Notifikasi` |
| C16 | EksplorasiProgramPage «boundary» | `- kataKunciPencarian: String`<br>`- filterKategori: KategoriProgram`<br>`- idProgramTerpilih: String` | `+ bukaHalamanEksplorasi(): void`<br>`+ terimaInputPencarian(kataKunci: String, kategori: KategoriProgram): void`<br>`+ tampilkanDaftarProgram(daftar: List<Program>): void`<br>`+ tampilkanPesanTidakDitemukan(): void`<br>`+ pilihProgram(idProgram: String): void`<br>`+ tampilkanDetailProgram(idProgram: String): void`<br>`+ klikTautanSitusResmi(): void`<br>`+ arahkanKeSitusResmi(url: String): void`<br>`+ nonaktifkanTautan(): void`<br>`+ pilihDaftarProgram(idProgram: String): void`<br>`+ tampilkanFormPendaftaran(): void`<br>`+ kirimPermohonanPendaftaran(keterampilan: String, ketersediaanWaktu: String): void`<br>`+ tampilkanNotifikasiBerhasil(): void`<br>`+ tampilkanPesanError(pesan: String): void` |
| C17 | KelolaPendaftarPage «boundary» | - | `+ bukaKelolaPendaftar(idProgram: String): void`<br>`+ tampilkanDaftarPendaftar(daftar: List<Pendaftaran>): void`<br>`+ tampilkanFormSeleksi(): void`<br>`+ pilihStatusSeleksi(idPendaftaran: String, status: StatusPendaftaran): void`<br>`+ kirimHasilSeleksi(): void`<br>`+ kirimKonfirmasiHasil(): void`<br>`+ tampilkanKonfirmasiHasil(): void`<br>`+ tampilkanNotifikasiBerhasil(): void`<br>`+ tampilkanPesanError(pesan: String): void` |
| C18 | SeleksiController «control» | - | `+ ajukanPendaftaran(idProgram: String, idRelawan: String, keterampilan: String, ketersediaanWaktu: String): Pendaftaran`<br>`+ lihatDaftarRelawan(idProgram: String): List<Pendaftaran>`<br>`- validasiKuota(idProgram: String, jumlahDiterimaBaru: Integer): Boolean`<br>`+ simpanHasilSeleksi(idProgram: String, keputusan: Map<String, StatusPendaftaran>): Boolean`<br>`+ konfirmasiHasilSeleksi(idProgram: String): Boolean`<br>`- triggerNotifikasi(pendaftaran: Pendaftaran): Notifikasi` |
| C19 | AreaKegiatanPage «boundary» | - | `+ bukaHalamanKegiatan(idProgram: String): void`<br>`+ tampilkanTombolCheckIn(aktif: Boolean): void`<br>`+ tampilkanKeteranganWaktu(keterangan: String): void`<br>`+ klikCheckIn(): void`<br>`+ tampilkanStatusCheckIn(berhasil: Boolean): void`<br>`+ bukaPortofolio(): void`<br>`+ tampilkanPortofolio(totalJamAksi: Float): void`<br>`+ tampilkanRiwayatProgram(daftar: List<Program>): void` |
| C20 | PresensiController «control» | - | `+ validasiStatusRelawan(idProgram: String, idRelawan: String): Boolean`<br>`+ validasiWaktuPelaksanaan(idProgram: String, waktu: DateTime): Boolean`<br>`+ prosesCheckIn(idProgram: String, idRelawan: String): Kehadiran`<br>`+ perbaruiPortofolioRelawan(idProgram: String): void`<br>`+ ambilKeteranganWaktu(idProgram: String): String`<br>`+ ambilTotalJamAksi(idRelawan: String): Float`<br>`+ ambilRiwayatProgram(idRelawan: String): List<Program>` |
| C21 | CloudStorageAdapter «adapter» | - | `+ validasiBerkas(berkas: File): Boolean`<br>`+ unggahBerkas(berkas: File): String`<br>`+ ambilBerkas(url: String): File` |
| C22 | BetterAuth «library» | - | `+ daftarkanKredensial(email: String, kataSandi: String): String`<br>`- hashKataSandi(kataSandi: String): String`<br>`+ verifikasiKredensial(email: String, kataSandi: String): String`<br>`- cocokkanHash(kataSandi: String, hashKataSandi: String): Boolean`<br>`+ buatSesiMasuk(idPengguna: String): String`<br>`+ ambilSesi(): String` |

## 4.2 Relasi Antarkelas

Tabel 4.2 merinci seluruh relasi pada Gambar 4.1. Generalisasi, asosiasi, agregasi, dan komposisi menggambarkan hubungan struktural antar-*entity* beserta multiplisitasnya, sedangkan dependensi menggambarkan pemanggilan dari *View* ke *Controller* dan dari *Controller* ke kelas lain. Bentuk relasi dipilih tidak lebih kuat dari maksudnya: komposisi dipakai apabila bagian tidak bermakna tanpa keseluruhannya (DokumenVerifikasi pada Pengguna, LaporanProgram pada Program, dan RiwayatKontribusi pada Relawan), agregasi dipakai apabila keseluruhan hanya mengelompokkan bagian yang tetap ada sendiri (RiwayatKontribusi mengelompokkan Program yang telah selesai diikuti), dan asosiasi biasa dipakai untuk hubungan lainnya, termasuk Pendaftaran dan Kehadiran yang menghubungkan dua objek sekaligus. Alasan setiap pilihan dicantumkan pada kolom Keterangan.

Tabel 4.2. Relasi Antarkelas

| No | Kelas Asal | Jenis Relasi | Kelas Tujuan | Multiplisitas | Keterangan |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Relawan | Generalisasi | Pengguna | - | Relawan merupakan turunan dari Pengguna. |
| 2 | InisiatorProgram | Generalisasi | Pengguna | - | InisiatorProgram merupakan turunan dari Pengguna. |
| 3 | Verifikator | Generalisasi | Pengguna | - | Verifikator merupakan turunan dari Pengguna. |
| 4 | Pengguna | Komposisi | DokumenVerifikasi | 1 : 0..* | Pengguna mengunggah DokumenVerifikasi. Komposisi karena dokumen verifikasi tidak bermakna tanpa pengguna pemiliknya dan ikut terhapus bersama akunnya. |
| 5 | Pengguna | Asosiasi | Notifikasi | 1 : 0..* | Pengguna menerima Notifikasi. |
| 6 | InisiatorProgram | Asosiasi | Program | 1 : 0..* | InisiatorProgram mengelola Program. |
| 7 | Relawan | Asosiasi | Pendaftaran | 1 : 0..* | Relawan mengajukan Pendaftaran. Asosiasi biasa karena Pendaftaran menghubungkan dua objek (Relawan dan Program) sehingga tidak dimiliki oleh satu keseluruhan. |
| 8 | Program | Asosiasi | Pendaftaran | 1 : 0..* | Program untuk Pendaftaran. Multiplisitas 0..* dibatasi oleh aturan kuota (KF05) yang dijaga Program.cekKuotaTersedia(). |
| 9 | Relawan | Asosiasi | Kehadiran | 1 : 0..* | Relawan mencatat Kehadiran. Asosiasi biasa karena Kehadiran menghubungkan Relawan dan Program. |
| 10 | Program | Asosiasi | Kehadiran | 1 : 0..* | Program pada Kehadiran. |
| 11 | Relawan | Komposisi | RiwayatKontribusi | 1 : 1 | Relawan memiliki RiwayatKontribusi. Komposisi karena riwayat kontribusi hanya bermakna untuk relawan pemiliknya dan ikut terhapus bersama akunnya. |
| 12 | RiwayatKontribusi | Agregasi | Program | 0..* : 0..* | RiwayatKontribusi mengelompokkan Program. Agregasi karena riwayat kontribusi mengelompokkan program yang telah selesai diikuti, sedangkan Program tetap ada tanpa riwayat tersebut. |
| 13 | Program | Komposisi | LaporanProgram | 1 : 0..1 | Program memiliki LaporanProgram. Komposisi karena laporan akhir hanya bermakna untuk program yang dilaporkan dan ikut terhapus bersama programnya. |
| 14 | Verifikator | Asosiasi | LaporanProgram | 0..1 : 0..* | Verifikator meninjau LaporanProgram. |
| 15 | KelolaAkunPage | Dependensi | AuthController | - | Memanggil. |
| 16 | KelolaProgramPage | Dependensi | ProgramController | - | Memanggil. |
| 17 | EksplorasiProgramPage | Dependensi | ProgramController | - | Memanggil. |
| 18 | EksplorasiProgramPage | Dependensi | SeleksiController | - | Memanggil. |
| 19 | EksplorasiProgramPage | Dependensi | AuthController | - | Cek sesi. |
| 20 | KelolaPendaftarPage | Dependensi | SeleksiController | - | Memanggil. |
| 21 | AreaKegiatanPage | Dependensi | PresensiController | - | Memanggil. |
| 22 | EksplorasiProgramPage | Dependensi | KelolaAkunPage | - | Mengarahkan ke login. |
| 23 | AuthController | Dependensi | BetterAuth | - | Kelola kredensial & sesi. |
| 24 | AuthController | Dependensi | Relawan | - | Membuat akun relawan. |
| 25 | AuthController | Dependensi | InisiatorProgram | - | Membuat akun inisiator. |
| 26 | AuthController | Dependensi | DokumenVerifikasi | - | Membuat dokumen. |
| 27 | AuthController | Dependensi | Notifikasi | - | Mengambil notifikasi. |
| 28 | AuthController | Dependensi | CloudStorageAdapter | - | Unggah berkas. |
| 29 | ProgramController | Dependensi | Program | - | Membuat, mencari & mengubah status program. |
| 30 | ProgramController | Dependensi | DokumenVerifikasi | - | Membuat dokumen. |
| 31 | ProgramController | Dependensi | InisiatorProgram | - | Memeriksa status verifikasi. |
| 32 | ProgramController | Dependensi | LaporanProgram | - | Mengelola laporan. |
| 33 | ProgramController | Dependensi | Verifikator | - | Memproses peninjauan. |
| 34 | ProgramController | Dependensi | Notifikasi | - | Membuat notifikasi. |
| 35 | ProgramController | Dependensi | CloudStorageAdapter | - | Unggah/ambil berkas. |
| 36 | ProgramController | Dependensi | PresensiController | - | Memicu pembaruan jam aksi. |
| 37 | SeleksiController | Dependensi | Pendaftaran | - | Membuat pendaftaran & menetapkan hasil seleksi. |
| 38 | SeleksiController | Dependensi | Program | - | Memeriksa kuota & mengambil pendaftar. |
| 39 | SeleksiController | Dependensi | Relawan | - | Memeriksa kelengkapan data. |
| 40 | SeleksiController | Dependensi | Notifikasi | - | Membuat notifikasi. |
| 41 | PresensiController | Dependensi | Kehadiran | - | Mencatat kehadiran. |
| 42 | PresensiController | Dependensi | Pendaftaran | - | Memeriksa status diterima. |
| 43 | PresensiController | Dependensi | Program | - | Memeriksa waktu & mengambil relawan diterima. |
| 44 | PresensiController | Dependensi | RiwayatKontribusi | - | Mengambil ringkasan portofolio. |
| 45 | PresensiController | Dependensi | Relawan | - | Mencatat kontribusi & mengambil portofolio. |

## 4.3 Tipe Enumerasi

Tabel 4.3. Tipe Enumerasi

| Nama Enumerasi | Nilai | Keterangan |
| :--- | :--- | :--- |
| KategoriProgram | `JAGA_ALAM`, `JAGA_IKLIM` | Kategori program aksi (KF04). |
| StatusProgram | `MENUNGGU_VERIFIKASI`, `AKTIF`, `MENUNGGU_KONFIRMASI`, `PERLU_REVISI`, `SELESAI` | Status keberlangsungan program; MENUNGGU_KONFIRMASI dan SELESAI sesuai KF13–KF14, PERLU_REVISI sesuai skenario alternatif UC07. |
| StatusPendaftaran | `MENUNGGU`, `DITERIMA`, `DITOLAK` | Status seleksi pendaftaran relawan; DITERIMA/DITOLAK sesuai KF09. |
| StatusVerifikasi | `MENUNGGU`, `TERVERIFIKASI`, `DITOLAK` | Status verifikasi data Relawan, InisiatorProgram, dan DokumenVerifikasi. |
| StatusPeninjauan | `MENUNGGU`, `DISETUJUI`, `DITOLAK` | Status peninjauan LaporanProgram oleh Verifikator. |

## 4.4 Penyesuaian dari Kelas Analisis

Kelas perancangan merupakan penyempurnaan dari kelas analisis pada SKPL (subbab 5.2 dan 5.3 SKPL). Penyempurnaan mengikuti tiga aturan:
1. Nama dan ID kelas analisis dipertahankan (C01–C20).
2. **Nama operasi pada SKPL dipertahankan apabila ada padanannya**, termasuk ketika operasi tersebut dipindahkan ke kelas lain yang lebih tepat. Pengecualiannya adalah operasi *setter* status (`updateStatus()`, `perbaruiStatus()`, `updateStatusProgram()`), operasi yang membaca data objek lain untuk diputuskan di tempat lain (`getKataSandi()`, `cekKehadiran()`, `hitungJamAksi()` pada *controller*), serta operasi yang tidak dipakai *use case* mana pun. Operasi tersebut diganti atau dipindahkan ke objek pemilik informasinya sesuai gaya kendali didelegasikan.
3. Operasi baru hanya ditambahkan untuk langkah skenario *use case* yang belum memiliki operasi pada SKPL, sehingga setiap pesan pada *sequence diagram* memiliki operasi pada kelas tujuannya.

Dengan aturan tersebut, 67 dari 146 operasi pada BAB 4 memakai nama operasi SKPL. Penyesuaian per kelas dirangkum pada Tabel 4.4, sedangkan daftar operasi baru disajikan pada Tabel 4.5.

Tabel 4.4. Penyesuaian Kelas Analisis menjadi Kelas Perancangan

| ID Kelas | Nama Kelas | Penyesuaian | Alasan |
| :--- | :--- | :--- | :--- |
| C01 | Program | `waktuPelaksanaan`/`jadwal` diganti menjadi `waktuMulai` dan `waktuSelesai`; `lokasi` digabung ke `tempatPelaksanaan`; atribut `keterampilan`, `ketersediaanWaktu`, dan `tautanSitusResmi` dihapus; operasi *setter* `updateStatus()` dan `perbaruiStatus()` diganti operasi bermakna `ajukanKonfirmasi()`, `selesaikan()`, dan `mintaRevisi()`; `cekKuota()` digabung ke `cekKuotaTersedia()`; `showSummary()` dan `showDokumentasi()` dipindah ke LaporanProgram; operasi tampilan `getDetail()`, `getRingkasanProgram()`, `tampilkanDetail()`, dan `tampilkanRingkasan()` dihapus karena penampilan data dilakukan EksplorasiProgramPage; ditambah `cekDalamWaktuPelaksanaan()`, `hitungDurasiJam()`, `hitungJumlahDiterima()`, `keteranganWaktu()`, `ambilPengelola()`, `daftarPendaftar()`, `daftarRelawanDiterima()`, serta operasi statis `cari()` yang menggantikan `filterProgram()`. Operasi perubahan status mengembalikan status barunya agar dapat ditampilkan halaman. | Rentang waktu dibutuhkan untuk akses *check-in* (KF12) dan perhitungan jam aksi (KF15). Keterampilan dan ketersediaan waktu adalah data Pendaftaran; tautan situs resmi adalah data lembaga dan diakses melalui `getTautan()`. Program menjaga statusnya sendiri (gaya kendali didelegasikan) dan menjadi pemilik daftar pendaftarnya. |
| C02 | Pendaftaran | Ditambah `idPendaftaran` dan `waktuDaftar`; `daftar()` direalisasikan oleh `SeleksiController.ajukanPendaftaran()`; `triggerNotifikasi()` dipindah ke SeleksiController; `updateStatus()` diganti `terima()` dan `tolak()`; ditambah `isDiterima()` dan `sudahDiputuskan()`. | Pembuatan pendaftaran dan pengiriman notifikasi adalah alur proses yang menjadi tanggung jawab *Controller*, sedangkan status pendaftaran dijaga Pendaftaran sendiri. |
| C03 | Relawan | `totalJamAksi` dipindah ke RiwayatKontribusi; `lihatNotifikasi()` dipindah ke Pengguna; `cekStatusKelayakan()` dan `lihatPortofolio()` dipertahankan; ditambah `cekKelengkapanData()`, `catatKontribusi()`, dan `hadirPada()`; operasi profil yang tidak dipakai *use case* mana pun dihapus. | Menghindari penyimpanan jam aksi di dua tempat; pemeriksaan kelengkapan dan kelayakan dibutuhkan KF10; Relawan memeriksa kehadirannya sendiri saat jam aksi dicatat (KF15). |
| C04 | Pengguna | Atribut `kataSandi` dan operasi `getKataSandi()` dihapus karena kredensial disimpan dan diverifikasi oleh BetterAuth; ditambah `idPengguna`; `lihatNotifikasi()` dipindah dari Relawan; `tampilkanProfil()` dan `getEmail()` dihapus. | Menghilangkan kebergantungan BetterAuth ke Pengguna agar lapisan pendukung tidak bergantung ke atas (KNF02 tetap dipenuhi BetterAuth); seluruh jenis pengguna dapat menerima notifikasi. |
| C05 | InisiatorProgram | `simpanHasilSeleksi()` dan `konfirmasiHasilSeleksi()` dipindah ke SeleksiController; `uploadDokumentasi()` dipindah ke LaporanProgram; `lihatDaftarRelawan()` dipindah ke SeleksiController; `ubahStatusProgram()` dan `simpanStatus()` direalisasikan oleh `ProgramController.ajukanLaporanAkhir()`; `tampilkanProfilLembaga()` dihapus; ditambah `cekStatusVerifikasi()` dan `getTautan()`. | Aksi aktor direalisasikan melalui *Boundary* dan *Controller*; status verifikasi lembaga diperiksa saat mendaftarkan program. |
| C06 | Verifikator | Menjadi turunan Pengguna; ditambah `idVerifikator` dan `nama`; `konfirmasiLaporan()` dan `tolakLaporan()` dipertahankan dan meneruskan keputusan ke LaporanProgram yang ditinjaunya; `tinjauLaporan()` dipindah ke ProgramController; `konfirmasiPenyelesaianProgram()` digabung ke `konfirmasiLaporan()`. | Verifikator perlu masuk ke akun; keputusan persetujuan diambil Verifikator (gaya kendali didelegasikan), sedangkan ProgramController mengoordinasikan alurnya. |
| C07 | DokumenVerifikasi | Dimiliki oleh Pengguna (komposisi), bukan hanya Relawan; dibuat oleh AuthController (dokumen Relawan) dan ProgramController (dokumen legalitas lembaga); `perbaruiStatusVerifikasi()` tidak dimodelkan karena verifikasi dokumen oleh Verifikator berada di luar UC01–UC09. | KF01 menyatakan Inisiator juga mengunggah dokumen verifikasi. |
| C08 | Kehadiran | `cekKehadiran()` diganti `untukProgram()` yang dipanggil Relawan; `catatKehadiran()` direalisasikan oleh `PresensiController.prosesCheckIn()`; ditambah asosiasi ke Program. | Kehadiran selalu tercatat untuk satu relawan pada satu program. |
| C09 | LaporanProgram | `catatanCapaian` dan `ringkasanDampak` digabung menjadi `ringkasanCapaian`; ditambah `idLaporan`, `statusPeninjauan`, dan `waktuPengajuan`; menerima `uploadDokumentasi()`, `showSummary()`, dan `showDokumentasi()`; `setujui()` dan `tolak()` menerima Verifikator peninjau; `simpan()` tidak dimodelkan. | Satu atribut menyimpan ringkasan capaian dampak lingkungan dari Inisiator (KF16) yang dipublikasikan setelah disetujui. |
| C10 | Notifikasi | Ditambah `idNotifikasi`; `kirim()`, `baca()`, dan `showDetail()` dipertahankan; `buatNotifikasi()` dipindah ke ProgramController; penerima menjadi Pengguna. | Relawan, Inisiator, dan Verifikator sama-sama menerima notifikasi (UC06 dan UC07). |
| C11 | RiwayatKontribusi | `daftarProgramSelesai` menjadi agregasi ke Program; RiwayatKontribusi dimiliki Relawan melalui komposisi; `tambahRiwayatProgram()` dipertahankan dan menghitung jam aksi sendiri dari `Program.hitungDurasiJam()`, sedangkan `perbaruiJamAksi()` menjadi operasi privat; ditambah *getter* untuk tampilan portofolio. | Mendukung KF15 dan tampilan portofolio pada UC09. |
| C12 | KelolaAkunPage | Seluruh operasi SKPL dipertahankan; registrasi dipecah per langkah formulir; ditambah `urlKembali`, `arahkanKeLogin()`, `arahkanKembali()`, dan menu notifikasi akun. | Sesuai langkah skenario UC01, UC02 (kembali ke halaman program setelah *login*), dan UC06. |
| C13 | AuthController | `buatAkunBaru()`, `validasiKredensial()`, dan `mulaiSesi()` dipertahankan; `akhiriSesi()` dihapus karena tidak dipakai *use case* mana pun; `verifikasiKredensial()` dan `buatSesiMasuk()` dipindah ke BetterAuth; ditambah atribut dan operasi pemblokiran IP serta notifikasi akun. | Mendukung KNF06 (blokir IP 5 menit setelah 5 kali gagal) dan KF06 (wajib *login*). |
| C14 | KelolaProgramPage | Seluruh operasi SKPL dipertahankan; formulir program dipecah per langkah; ditambah antarmuka peninjauan laporan bagi Verifikator. | Inisiator melampirkan dokumen legalitas saat mendaftarkan program (KF01); UC07 dan UC09 dijalankan Verifikator melalui halaman kelola program. |
| C15 | ProgramController | `filterProgram()` digabung ke `Program.cari()` dan `updateStatusProgram()` diganti operasi status pada Program; `tinjauLaporan()` dan `konfirmasiLaporan()` dipindah dari Verifikator, `buatNotifikasi()` dari Notifikasi; ditambah `ajukanLaporanAkhir()`. | Mendukung KF13, KF14, dan KF16; `konfirmasiLaporan()` memicu `PresensiController.perbaruiPortofolioRelawan()` (KF15). |
| C16 | EksplorasiProgramPage | Seluruh operasi SKPL dipertahankan; ditambah pemilihan program, formulir permohonan pendaftaran, dan aksi klik tautan. | Relawan mendaftar program dari halaman detail program (UC01 dan UC02). |
| C17 | KelolaPendaftarPage | Seluruh operasi SKPL dipertahankan; ditambah aksi pemilihan status dan konfirmasi hasil. | Mendukung langkah skenario UC05 dan UC06. |
| C18 | SeleksiController | Seluruh operasi SKPL dipertahankan; `konfirmasiHasilSeleksi()` dan `lihatDaftarRelawan()` dipindah dari InisiatorProgram; ditambah `ajukanPendaftaran()`; `konfirmasiHasilSeleksi()` mengembalikan Boolean untuk skenario alternatif UC06. | Penerimaan permohonan pendaftaran (KF07, KF10) satu alur dengan proses seleksi. |
| C19 | AreaKegiatanPage | Seluruh operasi SKPL dipertahankan; ditambah aksi pengguna dan `tampilkanKeteranganWaktu()`. | Mendukung skenario alternatif UC08. |
| C20 | PresensiController | `cekKehadiran()` dan `hitungJamAksi()` diserahkan kepada Relawan dan RiwayatKontribusi; ditambah `ambilKeteranganWaktu()`, `ambilTotalJamAksi()`, dan `ambilRiwayatProgram()` yang hasilnya ditampilkan AreaKegiatanPage. | Gaya kendali didelegasikan: controller hanya mengoordinasikan pencatatan jam aksi (UC09). |
| C21 | CloudStorageAdapter | Kelas baru pada tahap perancangan. | Komponen integrasi eksternal pada APL yang dipanggil saat unggah dokumen (KF01, KNF03) dan dokumentasi laporan (KF13). |
| C22 | BetterAuth | Kelas baru pada tahap perancangan; menerima `verifikasiKredensial()` dan `buatSesiMasuk()` dari AuthController; ditambah `daftarkanKredensial()`; menyimpan dan memverifikasi kredensial tanpa membaca kelas Pengguna. | Komponen pendukung pada APL yang menjalankan *hashing* kata sandi (KNF02), verifikasi kredensial, dan sesi (KF06). |

Tabel 4.5. Operasi Baru pada Tahap Perancangan

| ID Kelas | Nama Kelas | Operasi Baru (tidak ada padanannya di SKPL) |
| :--- | :--- | :--- |
| C01 | Program | `hitungJumlahDiterima()`, `ajukanKonfirmasi()`, `selesaikan()`, `mintaRevisi()`, `cekDalamWaktuPelaksanaan()`, `keteranganWaktu()`, `hitungDurasiJam()`, `ambilPengelola()`, `daftarPendaftar()`, `daftarRelawanDiterima()`, `cari()` |
| C02 | Pendaftaran | `terima()`, `isDiterima()`, `sudahDiputuskan()` |
| C03 | Relawan | `cekKelengkapanData()`, `catatKontribusi()`, `hadirPada()` |
| C05 | InisiatorProgram | `cekStatusVerifikasi()` |
| C08 | Kehadiran | `untukProgram()` |
| C11 | RiwayatKontribusi | `getTotalJamAksi()`, `getDaftarProgramSelesai()` |
| C12 | KelolaAkunPage | `bukaHalamanRegistrasi()`, `isiFormRegistrasi()`, `unggahDokumen()`, `kirimPendaftaran()`, `tampilkanNotifikasiBerhasil()`, `arahkanKeLogin()`, `arahkanKembali()`, `bukaMenuNotifikasi()`, `pilihNotifikasi()`, `tampilkanDaftarNotifikasi()`, `tampilkanDetailNotifikasi()` |
| C13 | AuthController | `validasiKelengkapanData()`, `cekStatusVerifikasi()`, `cekSesi()`, `cekStatusBlokir()`, `catatPercobaanGagal()`, `blokirIP()`, `resetPercobaanGagal()`, `ambilNotifikasi()`, `bacaNotifikasi()` |
| C14 | KelolaProgramPage | `bukaHalamanDaftarProgram()`, `isiFormProgram()`, `unggahDokumen()`, `kirimPendaftaran()`, `pilihLaporan()`, `tampilkanLaporanUntukDitinjau()`, `kirimPersetujuanLaporan()`, `kirimPenolakanLaporan()`, `tampilkanNotifikasiBerhasil()` |
| C15 | ProgramController | `ajukanLaporanAkhir()` |
| C16 | EksplorasiProgramPage | `bukaHalamanEksplorasi()`, `tampilkanPesanTidakDitemukan()`, `pilihProgram()`, `klikTautanSitusResmi()`, `pilihDaftarProgram()`, `tampilkanFormPendaftaran()`, `kirimPermohonanPendaftaran()`, `tampilkanNotifikasiBerhasil()` |
| C17 | KelolaPendaftarPage | `bukaKelolaPendaftar()`, `pilihStatusSeleksi()`, `kirimHasilSeleksi()`, `kirimKonfirmasiHasil()`, `tampilkanNotifikasiBerhasil()` |
| C18 | SeleksiController | `ajukanPendaftaran()` |
| C19 | AreaKegiatanPage | `bukaHalamanKegiatan()`, `tampilkanKeteranganWaktu()`, `klikCheckIn()`, `bukaPortofolio()` |
| C20 | PresensiController | `ambilKeteranganWaktu()`, `ambilTotalJamAksi()`, `ambilRiwayatProgram()` |
| C21 | CloudStorageAdapter | `validasiBerkas()`, `unggahBerkas()`, `ambilBerkas()` |
| C22 | BetterAuth | `daftarkanKredensial()`, `hashKataSandi()`, `cocokkanHash()`, `ambilSesi()` |

<br>

---
# BAB 5: Perancangan Rinci Kelas

Bagian ini diisi dengan daftar seluruh kelas dalam tabel berikut:

Tabel 5.1. Daftar Kelas Perancangan dan Kelas Analisis Terkait

| No | Nama Kelas Perancangan | Nama Kelas Analisis Terkait |
| :--- | :--- | :--- |
| 1 | Program | Program |
| 2 | Pendaftaran | Pendaftaran |
| 3 | Relawan | Relawan |
| 4 | Pengguna | Pengguna |
| 5 | InisiatorProgram | InisiatorProgram |
| 6 | Verifikator | Verifikator |
| 7 | DokumenVerifikasi | DokumenVerifikasi |
| 8 | Kehadiran | Kehadiran |
| 9 | LaporanProgram | LaporanProgram |
| 10 | Notifikasi | Notifikasi |
| 11 | RiwayatKontribusi | RiwayatKontribusi |
| 12 | KelolaAkunPage | KelolaAkunPage |
| 13 | AuthController | AuthController |
| 14 | KelolaProgramPage | KelolaProgramPage |
| 15 | ProgramController | ProgramController |
| 16 | EksplorasiProgramPage | EksplorasiProgramPage |
| 17 | KelolaPendaftarPage | KelolaPendaftarPage |
| 18 | SeleksiController | SeleksiController |
| 19 | AreaKegiatanPage | AreaKegiatanPage |
| 20 | PresensiController | PresensiController |
| 21 | CloudStorageAdapter | [Baru] |
| 22 | BetterAuth | [Baru] |

Untuk **setiap kelas**, identifikasi operasi berdasarkan tanggung jawab kelas beserta *visibility*-nya, serta atribut beserta *visibility* dan tipenya. Buat subbab tersendiri untuk setiap kelas.

## 5.1 Kelas Program

**Nama Kelas:** Program 
**ID Kelas:** C01

Tabel 5.1.1. Operasi Kelas Program

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| ajukanKonfirmasi() | public | Mengubah status program menjadi menunggu konfirmasi setelah Inisiator mengajukan laporan akhir; mengembalikan status baru. |
| selesaikan() | public | Menandai program selesai setelah laporan disetujui Verifikator; mengembalikan status baru. |
| mintaRevisi() | public | Mengembalikan program ke dalam status 'perlu revisi' ketika laporan ditolak; mengembalikan status baru. |
| cekKuotaTersedia() | public | Memeriksa apakah kuota relawan masih tersedia. |
| cekDalamWaktuPelaksanaan(waktu) | public | Memeriksa apakah suatu waktu berada di antara waktuMulai dan waktuSelesai (dipakai untuk check-in, KF12). |
| hitungDurasiJam() | public | Menghitung durasi program dalam jam (dipakai untuk durasi jam aksi, KF15). |
| hitungJumlahDiterima() | public | Menghitung jumlah pendaftar dengan status diterima. |
| keteranganWaktu() | public | Mengembalikan keterangan waktu: belum dimulai, sedang berlangsung, atau sudah selesai. |
| ambilPengelola() | public | Mengambil InisiatorProgram pemilik program |
| daftarPendaftar() | public | Mengambil semua Pendaftaran untuk program terkait |
| daftarRelawanDiterima() | public | Mengambil daftar Relawan yang pendaftarannya diterima. |
| cari(kata, kategori) | public (static) | Mencari program yang dibuka berdasarkan kata kunci dan kategori; menggantikan filterProgram() | 
| *...* | *...* | *...* |

Tabel 5.1.2. Atribut Kelas Program

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| idProgram | private | string |
| namaProgram | private | string |
| deskripsi | private | string |
| kategori | private | enum |
| kuota | private | int |
| status | private | enum |
| waktuMulai | private | DateTime |
| waktuSelesai | private | DateTime |
| tempatPelaksanaan | private | string |
|idInisiator | private | string |

### 5.1.1 Algoritma/Query

**Nama Kelas:** Program
**Nama Operasi:** ajukanKonfirmasi() 
**ID Algoritma:** (Algo-C01-01)

```text
Function ajukanKonfirmasi()
    if this.status ≠ "Berjalan" then
        → error "Program tidak dapat diajukan konfirmasi"
    this.status ← "MenungguKonfirmasi"
    DB_SERVICE.updateStatusProgram(this.idProgram, this.status)
    → this.status
```

### 5.1.2 Algoritma/Query

**Nama Kelas:** Program
**Nama Operasi:** selesaikan() 
**ID Algoritma:** (Algo-C01-02)

```text
Function selesaikan()
    if this.status ≠ "MenungguKonfirmasi" then
        → error "Program belum diajukan konfirmasi"
    this.status ← "Selesai"
    DB_SERVICE.updateStatusProgram(this.idProgram, this.status)
    → this.status
```

### 5.1.3 Algoritma/Query

**Nama Kelas:** Program
**Nama Operasi:** mintaRevisi() 
**ID Algoritma:** (Algo-C01-03)

```text
Function mintaRevisi()
    if this.status ≠ "MenungguKonfirmasi" then
        → error "Program belum diajukan konfirmasi"
    this.status ← "PerluRevisi"
    DB_SERVICE.updateStatusProgram(this.idProgram, this.status)
    → this.status
```

### 5.1.4 Algoritma/Query

**Nama Kelas:** Program
**Nama Operasi:** cekKuotaTersedia() 
**ID Algoritma:** (Algo-C01-04)

```text
Function cekKuotaTersedia() → boolean
    diterima ← this.hitungJumlahDiterima()
    if (diterima < this.kuota) then
        → true
    else
        → false
```

### 5.1.5 Algoritma/Query

**Nama Kelas:** Program
**Nama Operasi:** cekDalamWaktuPelaksanaan(waktu) 
**ID Algoritma:** (Algo-C01-05)

```text
Function cekDalamWaktuPelaksanaan(waktu) → boolean
    → (waktu ≥ this.waktuMulai) and (waktu ≤ this.waktuSelesai)
```

### 5.1.6 Algoritma/Query

**Nama Kelas:** Program
**Nama Operasi:** hitungDurasiJam()
**ID Algoritma:** (Algo-C01-06)

```text
Function hitungDurasiJam() → real
    selisih ← this.waktuSelesai − this.waktuMulai
    → selisih dalam satuan jam
```

### 5.1.7 Algoritma/Query

**Nama Kelas:** Program
**Nama Operasi:** hitungJumlahDiterima()
**ID Algoritma:** (Algo-C01-07)

```text
Function hitungJumlahDiterima() → int
    → DB_SERVICE.countPendaftarDiterima(this.idProgram)
```

### 5.1.8 Algoritma/Query

**Nama Kelas:** Program
**Nama Operasi:** keteranganWaktu()
**ID Algoritma:** (Algo-C01-08)

```text
Function keteranganWaktu() → string
    sekarang ← now()
    if (sekarang < this.waktuMulai) then
        → "Belum dimulai"
    else if (sekarang ≤ this.waktuSelesai) then
        → "Sedang berlangsung"
    else
        → "Sudah selesai"
```

### 5.1.9 Algoritma/Query

**Nama Kelas:** Program
**Nama Operasi:** ambilPengelola()
**ID Algoritma:** (Algo-C01-09)

```text
Function ambilPengelola() → InisiatorProgram
    data ← DB_SERVICE.findInisiatorByID(this.idInisiator)
    if data is null then
        → error "Pengelola program tidak ditemukan"
    → new InisiatorProgram(data)
```

### 5.1.10 Algoritma/Query

**Nama Kelas:** Program
**Nama Operasi:** daftarPendaftar()
**ID Algoritma:** (Algo-C01-10)

```text
Function daftarPendaftar() → List<Pendaftaran>
    dataList ← DB_SERVICE.findPendaftarByProgram(this.idProgram)
    hasil ← new List<Pendaftaran>
    For each data in dataList
        hasil.add(new Pendaftaran(data))
    → hasil
```

### 5.1.11 Algoritma/Query

**Nama Kelas:** Program
**Nama Operasi:** daftarRelawanDiterima()
**ID Algoritma:** (Algo-C01-11)

```text
Function daftarRelawanDiterima() → List<Relawan>
    dataList ← DB_SERVICE.findRelawanDiterimaByProgram(this.idProgram)
    hasil ← new List<Relawan>
    For each data in dataList
        hasil.add(new Relawan(data))
    → hasil
```

### 5.1.12 Algoritma/Query

**Nama Kelas:** Program
**Nama Operasi:** cari(kata, kategori)
**ID Algoritma:** (Algo-C01-12)

```text
Function cari(kata, kategori) → List<Program>
    dataList ← DB_SERVICE.searchProgram(kata, kategori)
    hasil ← new List<Program>
    For each data in dataList
        hasil.add(new Program(data))
    → hasil
```

Tabel 5.1.3. Query Kelas Program
| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| Q-C01-01 | UPDATE program SET status = @status WHERE idProgram = @idProgram	 | Memperbarui status program (dipakai oleh Algo-C01-01, -02, dan -03). |
| Q-C01-07 | SELECT COUNT(*) FROM pendaftaran WHERE idProgram = @idProgram AND status = 'Diterima' | Menghitung pendaftar yang diterima. |
| Q-C01-09 | SELECT * FROM inisiator_program WHERE idInisiator = @idInisiator | Mengambil data pengelola program. |
| Q-C01-10 | SELECT * FROM pendaftaran WHERE idProgram = @idProgram | Mengambil semua pendaftar program. |
| Q-C01-11 | SELECT r.* FROM relawan r JOIN pendaftaran p ON p.idRelawan = r.idRelawan WHERE p.idProgram = @idProgram AND p.status = 'Diterima' | Mengambil relawan yang diterima. |
| Q-C01-12 | SELECT * FROM program WHERE status = 'Dibuka' AND namaProgram LIKE @kata AND (@kategori IS NULL OR kategori = @kategori) | Pencaria program dengan filter. | 


## 5.2 Kelas Pendaftaran

**Nama Kelas:** Pendaftaran  
**ID Kelas:** C02

Tabel 5.2.1. Operasi Kelas Pendaftaran

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| terima() | public | Menandai pendaftaran sebagai diterima berdasarkan keputusan seleksi Inisiator; mengembalikan status baru. |
| tolak() | public | Menandai pendaftaran sebagai ditolak berdasarkan keputusan seleksi Inisiator; mengembalikan status baru. |
| isDiterima() | public | Memeriksa apakah status pendaftaran adalah diterima. |
| sudahDiputuskan() | public | Memeriksa apakah pendaftaran sudah diputuskan (diterima atau ditolak). |

Tabel 5.2.2. Atribut Kelas Pendaftaran

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| idPendaftaran | private | string |
| idProgram | private | string |
| idRelawan | private | string |
| keterampilan | private | string |
| ketersediaanWaktu | private | string |
| status | private | enum |
| waktuDaftar | private | DateTime |

### 5.2.1 Algoritma/Query

**Nama Kelas:** Pendaftaran  
**Nama Operasi:** terima()  
**ID Algoritma:** (Algo-C02-01)

```text
Function terima()
    if this.sudahDiputuskan() then
        → error "Pendaftaran sudah diputuskan"
    this.status ← "Diterima"
    DB_SERVICE.updateStatusPendaftaran(this.idPendaftaran, this.status)
    → this.status
```

### 5.2.2 Algoritma/Query

**Nama Kelas:** Pendaftaran  
**Nama Operasi:** tolak()  
**ID Algoritma:** (Algo-C02-02)

```text
Function tolak()
    if this.sudahDiputuskan() then
        → error "Pendaftaran sudah diputuskan"
    this.status ← "Ditolak"
    DB_SERVICE.updateStatusPendaftaran(this.idPendaftaran, this.status)
    → this.status
```

### 5.2.3 Algoritma/Query

**Nama Kelas:** Pendaftaran  
**Nama Operasi:** isDiterima()  
**ID Algoritma:** (Algo-C02-03)

```text
Function isDiterima() → boolean
    → (this.status = "Diterima")
```

### 5.2.4 Algoritma/Query

**Nama Kelas:** Pendaftaran  
**Nama Operasi:** sudahDiputuskan()  
**ID Algoritma:** (Algo-C02-04)

```text
Function sudahDiputuskan() → boolean
    → (this.status = "Diterima") or (this.status = "Ditolak")
```

Tabel 5.2.3. Query Kelas Pendaftaran

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| Q-C02-01 | `UPDATE pendaftaran SET status = @status WHERE idPendaftaran = @idPendaftaran` | Memperbarui status pendaftaran (dipakai oleh Algo-C02-01 dan -02). |

---

## 5.3 Kelas Relawan

**Nama Kelas:** Relawan  
**ID Kelas:** C03

Tabel 5.3.1. Operasi Kelas Relawan

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| cekStatusKelayakan() | public | Memeriksa apakah relawan layak mendaftar program, yaitu data profil lengkap dan dokumen verifikasi sudah diunggah (KF10). |
| cekKelengkapanData() | public | Memeriksa apakah data profil relawan sudah lengkap. |
| lihatPortofolio() | public | Mengambil RiwayatKontribusi (portofolio) milik relawan. |
| catatKontribusi(program) | public | Mencatat program yang diselesaikan ke riwayat kontribusi relawan (KF15). |
| hadirPada(program) | public | Memeriksa apakah relawan tercatat hadir pada program tertentu. |

Tabel 5.3.2. Atribut Kelas Relawan

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| idRelawan | private | string |
| nama | private | string |
| nomorTelepon | private | string |
| domisili | private | string |

### 5.3.1 Algoritma/Query

**Nama Kelas:** Relawan  
**Nama Operasi:** cekStatusKelayakan()  
**ID Algoritma:** (Algo-C03-01)

```text
Function cekStatusKelayakan() → boolean
    if not this.cekKelengkapanData() then
        → false
    jumlahDokumen ← DB_SERVICE.countDokumenByPengguna(this.idPengguna)
    → (jumlahDokumen > 0)
```

### 5.3.2 Algoritma/Query

**Nama Kelas:** Relawan  
**Nama Operasi:** cekKelengkapanData()  
**ID Algoritma:** (Algo-C03-02)

```text
Function cekKelengkapanData() → boolean
    if (this.nama is empty) or (this.nomorTelepon is empty) or (this.domisili is empty) then
        → false
    → true
```

### 5.3.3 Algoritma/Query

**Nama Kelas:** Relawan  
**Nama Operasi:** lihatPortofolio()  
**ID Algoritma:** (Algo-C03-03)

```text
Function lihatPortofolio() → RiwayatKontribusi
    data ← DB_SERVICE.findRiwayatByRelawan(this.idRelawan)
    if data is null then
        → new RiwayatKontribusi(this.idRelawan)
    → new RiwayatKontribusi(data)
```

### 5.3.4 Algoritma/Query

**Nama Kelas:** Relawan  
**Nama Operasi:** catatKontribusi(program)  
**ID Algoritma:** (Algo-C03-04)

```text
Function catatKontribusi(program)
    if program is null then
        → error "Program tidak ditemukan"
    riwayat ← this.lihatPortofolio()
    riwayat.tambahRiwayatProgram(program)
```

### 5.3.5 Algoritma/Query

**Nama Kelas:** Relawan  
**Nama Operasi:** hadirPada(program)  
**ID Algoritma:** (Algo-C03-05)

```text
Function hadirPada(program) → boolean
    kehadiran ← Kehadiran.untukProgram(this.idRelawan, program.idProgram)
    → (kehadiran ≠ null)
```

Tabel 5.3.3. Query Kelas Relawan

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| Q-C03-01 | `SELECT COUNT(*) FROM dokumen_verifikasi WHERE idPengguna = @idPengguna` | Menghitung dokumen verifikasi yang sudah diunggah pengguna. |
| Q-C03-03 | `SELECT * FROM riwayat_kontribusi WHERE idRelawan = @idRelawan` | Mengambil riwayat kontribusi relawan. |

---

## 5.4 Kelas Pengguna

**Nama Kelas:** Pengguna  
**ID Kelas:** C04

Tabel 5.4.1. Operasi Kelas Pengguna

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| getIdPengguna() | public | Mengembalikan ID pengguna. |
| lihatNotifikasi() | public | Mengambil daftar Notifikasi milik pengguna (berlaku untuk Relawan, Inisiator, dan Verifikator). |

Tabel 5.4.2. Atribut Kelas Pengguna

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| idPengguna | private | string |
| email | private | string |

### 5.4.1 Algoritma/Query

**Nama Kelas:** Pengguna  
**Nama Operasi:** getIdPengguna()  
**ID Algoritma:** (Algo-C04-01)

```text
Function getIdPengguna() → string
    → this.idPengguna
```

### 5.4.2 Algoritma/Query

**Nama Kelas:** Pengguna  
**Nama Operasi:** lihatNotifikasi()  
**ID Algoritma:** (Algo-C04-02)

```text
Function lihatNotifikasi() → List<Notifikasi>
    dataList ← DB_SERVICE.findNotifikasiByPengguna(this.idPengguna)
    hasil ← new List<Notifikasi>
    For each data in dataList
        hasil.add(new Notifikasi(data))
    → hasil
```

Tabel 5.4.3. Query Kelas Pengguna

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| Q-C04-02 | `SELECT * FROM notifikasi WHERE idPenerima = @idPengguna ORDER BY waktuKirim DESC` | Mengambil notifikasi milik pengguna, terbaru lebih dulu. |

---

## 5.5 Kelas InisiatorProgram

**Nama Kelas:** InisiatorProgram  
**ID Kelas:** C05

Tabel 5.5.1. Operasi Kelas InisiatorProgram

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| cekStatusVerifikasi() | public | Memeriksa apakah lembaga Inisiator sudah terverifikasi; dipakai saat mendaftarkan program. |
| getTautan() | public | Mengembalikan tautan situs resmi lembaga. |

Tabel 5.5.2. Atribut Kelas InisiatorProgram

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| idInisiator | private | string |
| namaLembaga | private | string |
| tautanSitusResmi | private | string |
| statusVerifikasi | private | enum |

### 5.5.1 Algoritma/Query

**Nama Kelas:** InisiatorProgram  
**Nama Operasi:** cekStatusVerifikasi()  
**ID Algoritma:** (Algo-C05-01)

```text
Function cekStatusVerifikasi() → boolean
    → (this.statusVerifikasi = "Terverifikasi")
```

### 5.5.2 Algoritma/Query

**Nama Kelas:** InisiatorProgram  
**Nama Operasi:** getTautan()  
**ID Algoritma:** (Algo-C05-02)

```text
Function getTautan() → string
    → this.tautanSitusResmi
```

Tabel 5.5.3. Query Kelas InisiatorProgram

Tidak ada query pada kelas ini.

---

## 5.6 Kelas Verifikator

**Nama Kelas:** Verifikator  
**ID Kelas:** C06

Tabel 5.6.1. Operasi Kelas Verifikator

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| konfirmasiLaporan(laporan) | public | Menyetujui laporan program dengan meneruskan keputusan ke LaporanProgram yang ditinjau. |
| tolakLaporan(laporan) | public | Menolak laporan program dengan meneruskan keputusan ke LaporanProgram yang ditinjau. |

Tabel 5.6.2. Atribut Kelas Verifikator

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| idVerifikator | private | string |
| nama | private | string |

### 5.6.1 Algoritma/Query

**Nama Kelas:** Verifikator  
**Nama Operasi:** konfirmasiLaporan(laporan)  
**ID Algoritma:** (Algo-C06-01)

```text
Function konfirmasiLaporan(laporan)
    if laporan is null then
        → error "Laporan tidak ditemukan"
    → laporan.setujui(this)
```

### 5.6.2 Algoritma/Query

**Nama Kelas:** Verifikator  
**Nama Operasi:** tolakLaporan(laporan)  
**ID Algoritma:** (Algo-C06-02)

```text
Function tolakLaporan(laporan)
    if laporan is null then
        → error "Laporan tidak ditemukan"
    → laporan.tolak(this)
```

Tabel 5.6.3. Query Kelas Verifikator

Tidak ada query pada kelas ini.

---

## 5.7 Kelas DokumenVerifikasi

**Nama Kelas:** DokumenVerifikasi  
**ID Kelas:** C07

Tabel 5.7.1. Operasi Kelas DokumenVerifikasi

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| simpan() | public | Menyimpan data dokumen verifikasi ke basis data setelah berkas terunggah ke penyimpanan awan. |
| getUrlBerkas() | public | Mengembalikan URL berkas dokumen. |
| getJenisDokumen() | public | Mengembalikan jenis dokumen (dokumen Relawan atau dokumen legalitas lembaga). |

Tabel 5.7.2. Atribut Kelas DokumenVerifikasi

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| idDokumen | private | string |
| idPengguna | private | string |
| jenisDokumen | private | enum |
| urlBerkas | private | string |
| waktuUnggah | private | DateTime |

### 5.7.1 Algoritma/Query

**Nama Kelas:** DokumenVerifikasi  
**Nama Operasi:** simpan()  
**ID Algoritma:** (Algo-C07-01)

```text
Function simpan() → string
    if this.urlBerkas is empty then
        → error "Berkas belum diunggah"
    DB_SERVICE.saveDokumen(this)
    → this.idDokumen
```

### 5.7.2 Algoritma/Query

**Nama Kelas:** DokumenVerifikasi  
**Nama Operasi:** getUrlBerkas()  
**ID Algoritma:** (Algo-C07-02)

```text
Function getUrlBerkas() → string
    → this.urlBerkas
```

### 5.7.3 Algoritma/Query

**Nama Kelas:** DokumenVerifikasi  
**Nama Operasi:** getJenisDokumen()  
**ID Algoritma:** (Algo-C07-03)

```text
Function getJenisDokumen() → enum
    → this.jenisDokumen
```

Tabel 5.7.3. Query Kelas DokumenVerifikasi

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| Q-C07-01 | `INSERT INTO dokumen_verifikasi (idDokumen, idPengguna, jenisDokumen, urlBerkas, waktuUnggah) VALUES (@idDokumen, @idPengguna, @jenisDokumen, @urlBerkas, @waktuUnggah)` | Menyimpan dokumen verifikasi baru. |

---

## 5.8 Kelas Kehadiran

**Nama Kelas:** Kehadiran  
**ID Kelas:** C08

Tabel 5.8.1. Operasi Kelas Kehadiran

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| untukProgram(idRelawan, idProgram) | public (static) | Mengambil data kehadiran seorang relawan pada satu program; mengembalikan null jika belum tercatat. Dipanggil oleh Relawan. |
| getWaktuCheckIn() | public | Mengembalikan waktu check-in relawan. |

Tabel 5.8.2. Atribut Kelas Kehadiran

| Nama Atribut | Visibility (private, public) | Tipe |
| :--- | :--- | :--- |
| idKehadiran | private | string |
| idRelawan | private | string |
| idProgram | private | string |
| waktuCheckIn | private | DateTime |

### 5.8.1 Algoritma/Query

**Nama Kelas:** Kehadiran  
**Nama Operasi:** untukProgram(idRelawan, idProgram)  
**ID Algoritma:** (Algo-C08-01)

```text
Function untukProgram(idRelawan, idProgram) → Kehadiran
    data ← DB_SERVICE.findKehadiran(idRelawan, idProgram)
    if data is null then
        → null
    → new Kehadiran(data)
```

### 5.8.2 Algoritma/Query

**Nama Kelas:** Kehadiran  
**Nama Operasi:** getWaktuCheckIn()  
**ID Algoritma:** (Algo-C08-02)

```text
Function getWaktuCheckIn() → DateTime
    → this.waktuCheckIn
```

Tabel 5.8.3. Query Kelas Kehadiran

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| Q-C08-01 | `SELECT * FROM kehadiran WHERE idRelawan = @idRelawan AND idProgram = @idProgram` | Mengambil kehadiran relawan pada program tertentu. |


## 5.9 Kelas LaporanProgram

**Nama Kelas:** LaporanProgram  
**ID Kelas:** C09 (*entity*)

Tabel 5.9.1. Operasi Kelas LaporanProgram

| Nama Operasi | Visibility | Keterangan |
| :--- | :--- | :--- |
| uploadDokumentasi(urlFile: String): void | public | Menambahkan tautan berkas dokumentasi akhir ke laporan. |
| setujui(verifikator: Verifikator): void | public | Menandai laporan disetujui oleh Verifikator peninjau. |
| tolak(verifikator: Verifikator, catatanRevisi: String): void | public | Menandai laporan ditolak beserta catatan revisi dari Verifikator peninjau. |
| showSummary(): String | public | Mengambil ringkasan capaian dampak lingkungan. |
| showDokumentasi(): List<String> | public | Mengambil daftar dokumentasi akhir kegiatan. |

Tabel 5.9.2. Atribut Kelas LaporanProgram

| Nama Atribut | Visibility | Tipe |
| :--- | :--- | :--- |
| idLaporan | private | String |
| dokumentasiAkhir | private | List<String> |
| ringkasanCapaian | private | String |
| catatanRevisi | private | String [0..1] |
| statusPeninjauan | private | StatusPeninjauan |
| waktuPengajuan | private | DateTime |

### 5.9.1 Algoritma/Query

**Nama Kelas :** LaporanProgram  
**Nama Operasi :** uploadDokumentasi(urlFile)  
**ID Algoritma :** (Algo-C09-01)

```text
Procedure uploadDokumentasi(urlFile)
    if isEmpty(urlFile) then
        → error "Tautan berkas tidak valid"
    this.dokumentasiAkhir.add(urlFile)
```

### 5.9.2 Algoritma/Query

**Nama Kelas :** LaporanProgram  
**Nama Operasi :** setujui(verifikator)  
**ID Algoritma :** (Algo-C09-02)

```text
Procedure setujui(verifikator)
    if this.statusPeninjauan ≠ MENUNGGU then
        → error "Laporan sudah ditinjau"
    this.statusPeninjauan ← DISETUJUI
    this.catatanRevisi ← null
    this.verifikator ← verifikator
```

### 5.9.3 Algoritma/Query

**Nama Kelas :** LaporanProgram  
**Nama Operasi :** tolak(verifikator, catatanRevisi)  
**ID Algoritma :** (Algo-C09-03)

```text
Procedure tolak(verifikator, catatanRevisi)
    if this.statusPeninjauan ≠ MENUNGGU then
        → error "Laporan sudah ditinjau"
    if isEmpty(catatanRevisi) then
        → error "Catatan revisi wajib diisi"
    this.statusPeninjauan ← DITOLAK
    this.catatanRevisi ← catatanRevisi
    this.verifikator ← verifikator
```

### 5.9.4 Algoritma/Query

**Nama Kelas :** LaporanProgram  
**Nama Operasi :** showSummary()  
**ID Algoritma :** (Algo-C09-04)

```text
Function showSummary()
    → this.ringkasanCapaian
```

### 5.9.5 Algoritma/Query

**Nama Kelas :** LaporanProgram  
**Nama Operasi :** showDokumentasi()  
**ID Algoritma :** (Algo-C09-05)

```text
Function showDokumentasi()
    → this.dokumentasiAkhir
```

Query :

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| Q-C09-01 | uploadDokumentasi:<br>UPDATE tbl_laporan_program SET dokumentasiAkhir = @dokumentasiAkhir WHERE idLaporan = @idLaporan | Menyimpan daftar tautan dokumentasi akhir pada laporan. |
| Q-C09-02 | setujui:<br>UPDATE tbl_laporan_program SET statusPeninjauan = 'DISETUJUI', catatanRevisi = NULL, idVerifikator = @idVerifikator WHERE idLaporan = @idLaporan | Menyimpan hasil persetujuan laporan oleh Verifikator. |
| Q-C09-03 | tolak:<br>UPDATE tbl_laporan_program SET statusPeninjauan = 'DITOLAK', catatanRevisi = @catatanRevisi, idVerifikator = @idVerifikator WHERE idLaporan = @idLaporan | Menyimpan hasil penolakan laporan beserta catatan revisi. |
| Q-C09-04 | showSummary:<br>SELECT ringkasanCapaian FROM tbl_laporan_program WHERE idLaporan = @idLaporan | Mengambil ringkasan capaian dampak lingkungan dari laporan. |
| Q-C09-05 | showDokumentasi:<br>SELECT dokumentasiAkhir FROM tbl_laporan_program WHERE idLaporan = @idLaporan | Mengambil daftar dokumentasi akhir kegiatan dari laporan. |


## 5.10 Kelas Notifikasi

**Nama Kelas:** Notifikasi  
**ID Kelas:** C10 (*entity*)

Tabel 5.10.1. Operasi Kelas Notifikasi

| Nama Operasi | Visibility | Keterangan |
| :--- | :--- | :--- |
| kirim(): void | public | Mengirim notifikasi kepada penerima dan menyimpannya. |
| baca(): void | public | Menandai notifikasi sebagai sudah dibaca. |
| showDetail(): String | public | Mengambil isi pesan notifikasi. |

Tabel 5.10.2. Atribut Kelas Notifikasi

| Nama Atribut | Visibility | Tipe |
| :--- | :--- | :--- |
| idNotifikasi | private | String |
| pesan | private | String |
| waktuKirim | private | DateTime |
| statusDibaca | private | Boolean |

### 5.10.1 Algoritma/Query

**Nama Kelas :** Notifikasi  
**Nama Operasi :** kirim()  
**ID Algoritma :** (Algo-C10-01)

```text
Procedure kirim()
    this.waktuKirim ← sekarang
    this.statusDibaca ← false
    DB_SERVICE.saveNotifikasi(this)
```

### 5.10.2 Algoritma/Query

**Nama Kelas :** Notifikasi  
**Nama Operasi :** baca()  
**ID Algoritma :** (Algo-C10-02)

```text
Procedure baca()
    if not this.statusDibaca then
        this.statusDibaca ← true
        DB_SERVICE.updateStatusDibaca(this.idNotifikasi, true)
```

### 5.10.3 Algoritma/Query

**Nama Kelas :** Notifikasi  
**Nama Operasi :** showDetail()  
**ID Algoritma :** (Algo-C10-03)

```text
Function showDetail()
    → this.pesan
```

Query :

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| Q-C10-01 | kirim:<br>INSERT INTO tbl_notifikasi (idNotifikasi, idPenerima, pesan, waktuKirim, statusDibaca) VALUES (@idNotifikasi, @idPenerima, @pesan, CURRENT_TIMESTAMP, FALSE) | Menyimpan notifikasi baru untuk penerima. |
| Q-C10-02 | baca:<br>UPDATE tbl_notifikasi SET statusDibaca = TRUE WHERE idNotifikasi = @idNotifikasi | Menandai notifikasi sebagai sudah dibaca. |
| Q-C10-03 | showDetail:<br>SELECT pesan FROM tbl_notifikasi WHERE idNotifikasi = @idNotifikasi | Mengambil isi pesan notifikasi yang dipilih. |


## 5.11 Kelas RiwayatKontribusi

**Nama Kelas:** RiwayatKontribusi  
**ID Kelas:** C11 (*entity*)

Tabel 5.11.1. Operasi Kelas RiwayatKontribusi

| Nama Operasi | Visibility | Keterangan |
| :--- | :--- | :--- |
| tambahRiwayatProgram(program: Program): void | public | Menambahkan program yang telah selesai diikuti ke riwayat dan menambah jam aksi sesuai durasi program. |
| perbaruiJamAksi(jamAksi: Float): void | private | Menambah akumulasi total jam aksi relawan. |
| getTotalJamAksi(): Float | public | Mengambil total jam aksi relawan. |
| getDaftarProgramSelesai(): List<Program> | public | Mengambil daftar program yang telah diselesaikan relawan. |

Tabel 5.11.2. Atribut Kelas RiwayatKontribusi

| Nama Atribut | Visibility | Tipe |
| :--- | :--- | :--- |
| idRiwayat | private | String |
| totalJamAksi | private | Float |

### 5.11.1 Algoritma/Query

**Nama Kelas :** RiwayatKontribusi  
**Nama Operasi :** tambahRiwayatProgram(program)  
**ID Algoritma :** (Algo-C11-01)

```text
Procedure tambahRiwayatProgram(program)
    daftarSelesai ← getDaftarProgramSelesai()
    if program.idProgram in daftarSelesai then
        → error "Program sudah tercatat pada riwayat"
    DB_SERVICE.saveRiwayatProgram(this.idRiwayat, program.idProgram)
    jamAksi ← program.hitungDurasiJam()
    perbaruiJamAksi(jamAksi)
```

### 5.11.2 Algoritma/Query

**Nama Kelas :** RiwayatKontribusi  
**Nama Operasi :** perbaruiJamAksi(jamAksi)  
**ID Algoritma :** (Algo-C11-02)

```text
Procedure perbaruiJamAksi(jamAksi)
    if jamAksi < 0 then
        → error "Jam aksi tidak valid"
    this.totalJamAksi ← this.totalJamAksi + jamAksi
    DB_SERVICE.tambahTotalJamAksi(this.idRiwayat, jamAksi)
```

### 5.11.3 Algoritma/Query

**Nama Kelas :** RiwayatKontribusi  
**Nama Operasi :** getTotalJamAksi()  
**ID Algoritma :** (Algo-C11-03)

```text
Function getTotalJamAksi()
    → this.totalJamAksi
```

### 5.11.4 Algoritma/Query

**Nama Kelas :** RiwayatKontribusi  
**Nama Operasi :** getDaftarProgramSelesai()  
**ID Algoritma :** (Algo-C11-04)

```text
Function getDaftarProgramSelesai()
    dataProgram ← DB_SERVICE.findProgramSelesaiByRiwayat(this.idRiwayat)
    daftar ← new List<Program>
    For each data in dataProgram
        daftar.add(new Program(data.idProgram, data.namaProgram, ...))
    → daftar
```

Query :

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| Q-C11-01 | tambahRiwayatProgram (cek duplikat):<br>SELECT COUNT(*) FROM tbl_riwayat_program WHERE idRiwayat = @idRiwayat AND idProgram = @idProgram | Memastikan program belum tercatat pada riwayat relawan. |
| Q-C11-02 | tambahRiwayatProgram (simpan):<br>INSERT INTO tbl_riwayat_program (idRiwayat, idProgram) VALUES (@idRiwayat, @idProgram) | Menambahkan program selesai ke riwayat kontribusi relawan. |
| Q-C11-03 | perbaruiJamAksi:<br>UPDATE tbl_riwayat_kontribusi SET totalJamAksi = totalJamAksi + @jamAksi WHERE idRiwayat = @idRiwayat | Menambah akumulasi total jam aksi relawan. |
| Q-C11-04 | getTotalJamAksi:<br>SELECT totalJamAksi FROM tbl_riwayat_kontribusi WHERE idRiwayat = @idRiwayat | Mengambil total jam aksi relawan untuk ditampilkan pada portofolio. |
| Q-C11-05 | getDaftarProgramSelesai:<br>SELECT p.* FROM tbl_program p JOIN tbl_riwayat_program rp ON p.idProgram = rp.idProgram WHERE rp.idRiwayat = @idRiwayat | Mengambil semua program yang telah diselesaikan relawan. |


## 5.12 Kelas KelolaAkunPage

**Nama Kelas:** KelolaAkunPage
**ID Kelas:** C12

Tabel 5.12.1. Operasi Kelas KelolaAkunPage 

| Nama Operasi | Visibility (private, public) | Keterangan |
| :--- | :--- | :--- |
| Nama Operasi | Visibility | Keterangan |
| :--- | :--- | :--- |
| bukaHalamanRegistrasi(): void | public | Membuka halaman registrasi akun dan memanggil tampilkanFormRegistrasi(). |
| tampilkanFormRegistrasi(): void | public | Menampilkan formulir registrasi (data diri dan kolom unggah dokumen). |
| isiFormRegistrasi(dataDiri: FormData): void | public | Menerima isian formulir dan menyimpannya pada atribut dataDiri. |
| unggahDokumen(berkas: File): void | public | Menerima berkas dokumen verifikasi dan menyimpannya pada atribut berkas. |
| kirimPendaftaran(): void | public | Mengirim dataDiri dan berkas ke AuthController.buatAkunBaru(), lalu menampilkan hasilnya (berhasil atau pesan galat). |
| tampilkanNotifikasiBerhasil(): void | public | Menampilkan pemberitahuan bahwa akun berhasil dibuat. |
| tampilkanPesanError(pesan: String): void | public | Menampilkan pesan kesalahan validasi (mis. data tidak lengkap). |
| arahkanKeLogin(urlKembali: String): void | public | Menyimpan urlKembali lalu menampilkan halaman login; dipanggil EksplorasiProgramPage saat pengguna belum punya sesi. |
| arahkanKembali(): void | public | Setelah login berhasil, mengarahkan pengguna ke urlKembali (halaman program asal). |
| tampilkanFormLogin(): void | public | Menampilkan formulir login (email dan kata sandi). |
| terimaInputKredensial(email: String, kataSandi: String): void | public | Menerima kredensial dan meneruskannya ke AuthController.validasiKredensial(); menampilkan status sesuai hasilnya. |
| tampilkanPesanStatus(pesan: String): void | public | Menampilkan status login: berhasil, kredensial salah, atau IP diblokir sementara. |
| bukaMenuNotifikasi(): void | public | Meminta daftar notifikasi pengguna ke AuthController.ambilNotifikasi(). |
| pilihNotifikasi(idNotifikasi: String): void | public | Meminta isi notifikasi terpilih ke AuthController.bacaNotifikasi(). |
| tampilkanDaftarNotifikasi(daftar: List<Notifikasi>): void | public | Menampilkan daftar notifikasi beserta status keterbacaannya. |
| tampilkanDetailNotifikasi(detail: String): void | public | Menampilkan isi lengkap notifikasi yang dipilih. |

Tabel 5.12.2. Atribut Kelas KelolaAkunPage

| Nama Atribut | Visibility | Tipe |
| :--- | :--- | :--- |
| dataDiri | private | FormData |
| berkas | private | File |
| formLogin | private | FormData |
| urlKembali | private | String |

### 5.12.1 Algoritma/Query

**Nama Kelas :** KelolaAkunPage  
**Nama Operasi :** bukaHalamanRegistrasi()  
**Algoritma :** (Algo-C12-01)

```text
Procedure bukaHalamanRegistrasi()
    tampilkanFormRegistrasi()
```

### 5.12.2 Algoritma/Query

**Nama Kelas :** KelolaAkunPage  
**Nama Operasi :** tampilkanFormRegistrasi()  
**ID Algoritma :** (Algo-C12-02)

```text
Procedure tampilkanFormRegistrasi()
    render formulir registrasi (kolom data diri, kolom unggah dokumen, tombol kirim)
```

### 5.12.3 Algoritma/Query

**Nama Kelas :** KelolaAkunPage  
**Nama Operasi :** isiFormRegistrasi(dataDiri)  
**ID Algoritma :** (Algo-C12-03)

```text
Procedure isiFormRegistrasi(dataDiri)
    this.dataDiri ← dataDiri
```

### 5.12.4 Algoritma/Query

**Nama Kelas :** KelolaAkunPage  
**Nama Operasi :** unggahDokumen(berkas)  
**ID Algoritma :** (Algo-C12-04)

```text
Procedure unggahDokumen(berkas)
    this.berkas ← berkas
```

### 5.12.5 Algoritma/Query

**Nama Kelas :** KelolaAkunPage  
**Nama Operasi :** kirimPendaftaran()  
**ID Algoritma :** (Algo-C12-05)

```text
Procedure kirimPendaftaran()
    hasil ← AuthController.buatAkunBaru(this.dataDiri, this.berkas)
    if hasil = error(daftarPesan) then
        tampilkanPesanError(daftarPesan)
    else
        tampilkanNotifikasiBerhasil()
```

### 5.12.6 Algoritma/Query

**Nama Kelas :** KelolaAkunPage  
**Nama Operasi :** tampilkanNotifikasiBerhasil()  
**ID Algoritma :** (Algo-C12-06)

```text
Procedure tampilkanNotifikasiBerhasil()
    render pesan "Akun berhasil dibuat"
```

### 5.12.7 Algoritma/Query

**Nama Kelas :** KelolaAkunPage  
**Nama Operasi :** tampilkanPesanError(pesan)  
**ID Algoritma :** (Algo-C12-07)

```text
Procedure tampilkanPesanError(pesan)
    render pesan kesalahan pada halaman
```

### 5.12.8 Algoritma/Query

**Nama Kelas :** KelolaAkunPage  
**Nama Operasi :** arahkanKeLogin(urlKembali)  
**ID Algoritma :** (Algo-C12-08)

```text
Procedure arahkanKeLogin(urlKembali)
    this.urlKembali ← urlKembali
    tampilkanFormLogin()
```

### 5.12.9 Algoritma/Query

**Nama Kelas :** KelolaAkunPage  
**Nama Operasi :** arahkanKembali()  
**ID Algoritma :** (Algo-C12-09)

```text
Procedure arahkanKembali()
    if this.urlKembali tidak kosong and this.urlKembali adalah alamat internal RekanBumi then
        navigasi ke this.urlKembali
    else
        navigasi ke halaman beranda
```

### 5.12.10 Algoritma/Query

**Nama Kelas :** KelolaAkunPage  
**Nama Operasi :** tampilkanFormLogin()  
**ID Algoritma :** (Algo-C12-10)

```text
Procedure tampilkanFormLogin()
    render formulir login (kolom email, kolom kata sandi, tombol masuk)
```

### 5.12.11 Algoritma/Query

**Nama Kelas :** KelolaAkunPage  
**Nama Operasi :** terimaInputKredensial(email, kataSandi)  
**ID Algoritma :** (Algo-C12-11)

```text
Procedure terimaInputKredensial(email, kataSandi)
    hasil ← AuthController.validasiKredensial(email, kataSandi, ip)
    // ip diambil server dari request, bukan diisi pengguna
    if hasil = error "IP diblokir" then
        tampilkanPesanStatus("IP diblokir sementara selama 5 menit")
    else if hasil = true then
        tampilkanPesanStatus("Berhasil masuk")
        arahkanKembali()
    else
        tampilkanPesanStatus("Email atau kata sandi salah")
```

### 5.12.12 Algoritma/Query

**Nama Kelas :** KelolaAkunPage  
**Nama Operasi :** tampilkanPesanStatus(pesan)  
**ID Algoritma :** (Algo-C12-12)

```text
Procedure tampilkanPesanStatus(pesan)
    render pesan status login pada halaman
```

### 5.12.13 Algoritma/Query

**Nama Kelas :** KelolaAkunPage  
**Nama Operasi :** bukaMenuNotifikasi()  
**ID Algoritma :** (Algo-C12-13)

```text
Procedure bukaMenuNotifikasi()
    daftar ← AuthController.ambilNotifikasi(idPengguna)
    // idPengguna diambil dari sesi aktif
    tampilkanDaftarNotifikasi(daftar)
```

### 5.12.14 Algoritma/Query

**Nama Kelas :** KelolaAkunPage  
**Nama Operasi :** pilihNotifikasi(idNotifikasi)  
**ID Algoritma :** (Algo-C12-14)

```text
Procedure pilihNotifikasi(idNotifikasi)
    notifikasi ← AuthController.bacaNotifikasi(idNotifikasi)
    tampilkanDetailNotifikasi(notifikasi.showDetail())
```

### 5.12.15 Algoritma/Query

**Nama Kelas :** KelolaAkunPage  
**Nama Operasi :** tampilkanDaftarNotifikasi(daftar)  
**ID Algoritma :** (Algo-C12-15)

```text
Procedure tampilkanDaftarNotifikasi(daftar)
    For each notifikasi in daftar
        render baris notifikasi (ringkasan pesan, waktu kirim, status dibaca)
```

### 5.12.16 Algoritma/Query

**Nama Kelas :** KelolaAkunPage  
**Nama Operasi :** tampilkanDetailNotifikasi(detail)  
**ID Algoritma :** (Algo-C12-16)

```text
Procedure tampilkanDetailNotifikasi(detail)
    render isi lengkap notifikasi
```

Kelas KelolaAkunPage adalah kelas *boundary* sehingga tidak mengakses basis data secara langsung dan tidak memiliki query.


## 5.13 Kelas AuthController
**Nama Kelas:** AuthController  
**ID Kelas:** C13 (*control*)

Tabel 5.13.1. Operasi Kelas AuthController

| Nama Operasi | Visibility | Keterangan |
| :--- | :--- | :--- |
| buatAkunBaru(dataDiri: FormData, berkas: File): Pengguna | public | Memvalidasi data, mendaftarkan kredensial ke BetterAuth, mengunggah berkas (bila ada), lalu membuat objek Relawan atau InisiatorProgram dan DokumenVerifikasi. |
| validasiKelengkapanData(dataDiri: FormData, berkas: File): String[] | private | Memeriksa kelengkapan dan format isian; mengembalikan daftar pesan galat (kosong jika valid). |
| cekStatusVerifikasi(dataDiri: FormData): StatusVerifikasi | private | Menentukan status verifikasi awal akun (berdasarkan verifikasi email oleh Better Auth). |
| cekSesi(): Boolean | public | Memeriksa apakah pengguna memiliki sesi aktif; dipanggil EksplorasiProgramPage. |
| validasiKredensial(email: String, kataSandi: String, ip: String): Boolean | public | Alur login: cek blokir IP, verifikasi kredensial ke BetterAuth, catat/reset percobaan gagal, dan mulai sesi. |
| cekStatusBlokir(ip: String): Boolean | private | Mengembalikan true bila IP masih dalam masa blokir. |
| catatPercobaanGagal(ip: String): Integer | private | Menambah hitungan percobaan gagal IP dan mengembalikan jumlah terbarunya. |
| blokirIP(ip: String): void | private | Menetapkan waktu blokir IP selama DURASI_BLOKIR_MENIT (KNF06). |
| resetPercobaanGagal(ip: String): void | private | Menghapus hitungan percobaan gagal IP setelah login berhasil. |
| mulaiSesi(idPengguna: String): String | private | Memanggil `BetterAuth.buatSesiMasuk() dan mengembalikan token sesi. |
| ambilNotifikasi(idPengguna: String): List<Notifikasi> | public | Mengambil daftar notifikasi milik pengguna melalui `Pengguna.lihatNotifikasi(). |
| bacaNotifikasi(idNotifikasi: String): Notifikasi | public | Menandai notifikasi terbaca (Notifikasi.baca()) dan mengambil isinya (showDetail()). |

Tabel 5.13.2. Atribut Kelas AuthController

| Nama Atribut | Visibility | Tipe |
| :--- | :--- | :--- |
| percobaanGagal | private | Map<String, Integer> |
| waktuBlokir | private | Map<String, DateTime> |
| BATAS_PERCOBAAN | private | Integer (= 5) |
| DURASI_BLOKIR_MENIT | private | Integer (= 5) |

### 5.13.1 Algoritma/Query

**Nama Kelas :** AuthController  
**Nama Operasi :** buatAkunBaru(dataDiri, berkas)  
**ID Algoritma :** (Algo-C13-01)

```text
Function buatAkunBaru(dataDiri, berkas)
    daftarGalat ← validasiKelengkapanData(dataDiri, berkas)
    if not isEmpty(daftarGalat) then
        → error daftarGalat
    status ← cekStatusVerifikasi(dataDiri)
    idPengguna ← BetterAuth.daftarkanKredensial(dataDiri.email, dataDiri.kataSandi)
    if dataDiri.peran = RELAWAN then
        pengguna ← new Relawan(idPengguna, dataDiri, status)
    else
        pengguna ← new InisiatorProgram(idPengguna, dataDiri, status)
    DB_SERVICE.savePengguna(pengguna)
    if berkas ≠ null then
        if not CloudStorageAdapter.validasiBerkas(berkas) then
            → error "Berkas tidak valid"
        url ← CloudStorageAdapter.unggahBerkas(berkas)
        dokumen ← new DokumenVerifikasi(pengguna.idPengguna, dataDiri.jenisDokumen, url, MENUNGGU)
        DB_SERVICE.saveDokumenVerifikasi(dokumen)
    → pengguna
```

### 5.13.2 Algoritma/Query

**Nama Kelas :** AuthController  
**Nama Operasi :** validasiKelengkapanData(dataDiri, berkas)  
**ID Algoritma :** (Algo-C13-02)

```text
Function validasiKelengkapanData(dataDiri, berkas)
    galat ← new List<string>
    if isEmpty(dataDiri.email) or formatEmailTidakValid(dataDiri.email) then
        galat.add("Email tidak valid")
    if isEmpty(dataDiri.kataSandi) then
        galat.add("Kata sandi wajib diisi")
    if dataDiri.peran = RELAWAN then
        if isEmpty(dataDiri.nama) or isEmpty(dataDiri.noTelepon) or isEmpty(dataDiri.domisili) then
            galat.add("Data diri tidak lengkap")
        if berkas = null then
            galat.add("Dokumen verifikasi wajib diunggah")
    else
        if isEmpty(dataDiri.namaLembaga) then
            galat.add("Nama lembaga wajib diisi")
    → galat
```

### 5.13.3 Algoritma/Query

**Nama Kelas :** AuthController  
**Nama Operasi :** cekStatusVerifikasi(dataDiri)  
**ID Algoritma :** (Algo-C13-03)

```text
Function cekStatusVerifikasi(dataDiri)
    if dataDiri.emailTerverifikasi = true then
        → TERVERIFIKASI
    → MENUNGGU
```

### 5.13.4 Algoritma/Query

**Nama Kelas :** AuthController  
**Nama Operasi :** cekSesi()  
**ID Algoritma :** (Algo-C13-04)

```text
Function cekSesi()
    sesi ← BetterAuth.ambilSesi()
    → (sesi ≠ null)
```

### 5.13.5 Algoritma/Query

**Nama Kelas :** AuthController  
**Nama Operasi :** validasiKredensial(email, kataSandi, ip)  
**ID Algoritma :** (Algo-C13-05)

```text
Function validasiKredensial(email, kataSandi, ip)
    if cekStatusBlokir(ip) then
        → error "IP diblokir"
    idPengguna ← BetterAuth.verifikasiKredensial(email, kataSandi)
    if idPengguna = null then
        jumlah ← catatPercobaanGagal(ip)
        if jumlah ≥ this.BATAS_PERCOBAAN then
            blokirIP(ip)
        → false
    resetPercobaanGagal(ip)
    mulaiSesi(idPengguna)
    → true
```

### 5.13.6 Algoritma/Query

**Nama Kelas :** AuthController  
**Nama Operasi :** cekStatusBlokir(ip)  
**ID Algoritma :** (Algo-C13-06)

```text
Function cekStatusBlokir(ip)
    if this.waktuBlokir mengandung ip then
        if sekarang < this.waktuBlokir[ip] then
            → true
        hapus this.waktuBlokir[ip]
        resetPercobaanGagal(ip)
    → false
```

### 5.13.7 Algoritma/Query

**Nama Kelas :** AuthController  
**Nama Operasi :** catatPercobaanGagal(ip)  
**ID Algoritma :** (Algo-C13-07)

```text
Function catatPercobaanGagal(ip)
    if this.percobaanGagal tidak mengandung ip then
        this.percobaanGagal[ip] ← 0
    this.percobaanGagal[ip] ← this.percobaanGagal[ip] + 1
    → this.percobaanGagal[ip]
```

### 5.13.8 Algoritma/Query

**Nama Kelas :** AuthController  
**Nama Operasi :** blokirIP(ip)  
**ID Algoritma :** (Algo-C13-08)

```text
Procedure blokirIP(ip)
    this.waktuBlokir[ip] ← sekarang + this.DURASI_BLOKIR_MENIT menit
```

### 5.13.9 Algoritma/Query

**Nama Kelas :** AuthController  
**Nama Operasi :** resetPercobaanGagal(ip)  
**ID Algoritma :** (Algo-C13-09)

```text
Procedure resetPercobaanGagal(ip)
    hapus this.percobaanGagal[ip]
```

### 5.13.10 Algoritma/Query

**Nama Kelas :** AuthController  
**Nama Operasi :** mulaiSesi(idPengguna)  
**ID Algoritma :** (Algo-C13-10)

```text
Function mulaiSesi(idPengguna)
    tokenSesi ← BetterAuth.buatSesiMasuk(idPengguna)
    → tokenSesi
```

### 5.13.11 Algoritma/Query

**Nama Kelas :** AuthController  
**Nama Operasi :** ambilNotifikasi(idPengguna)  
**ID Algoritma :** (Algo-C13-11)

```text
Function ambilNotifikasi(idPengguna)
    pengguna ← DB_SERVICE.findPenggunaByID(idPengguna)
    if pengguna = null then
        → error "Pengguna tidak ditemukan"
    → pengguna.lihatNotifikasi()
```

### 5.13.12 Algoritma/Query

**Nama Kelas :** AuthController  
**Nama Operasi :** bacaNotifikasi(idNotifikasi)  
**ID Algoritma :** (Algo-C13-12)

```text
Function bacaNotifikasi(idNotifikasi)
    notifikasi ← DB_SERVICE.findNotifikasiByID(idNotifikasi)
    if notifikasi = null then
        → error "Notifikasi tidak ditemukan"
    notifikasi.baca()
    → notifikasi
```

Query :

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| Q-C13-01 | buatAkunBaru (Relawan):<br>INSERT INTO tbl_relawan (idPengguna, email, nama, noTelepon, domisili, statusVerifikasi) VALUES (@idPengguna, @email, @nama, @noTelepon, @domisili, @status) | Menyimpan akun Relawan baru ke dalam sistem. |
| Q-C13-02 | buatAkunBaru (Inisiator):<br>INSERT INTO tbl_inisiator_program (idPengguna, email, namaLembaga, tautanSitusResmi, statusVerifikasi) VALUES (@idPengguna, @email, @namaLembaga, @tautan, @status) | Menyimpan akun Inisiator Program baru ke dalam sistem. |
| Q-C13-03 | buatAkunBaru (dokumen):<br>INSERT INTO tbl_dokumen_verifikasi (idDokumen, idPengguna, jenisDokumen, urlFile, statusVerifikasi) VALUES (@idDokumen, @idPengguna, @jenisDokumen, @urlFile, 'MENUNGGU') | Menyimpan dokumen verifikasi yang diunggah pengguna saat registrasi. |
| Q-C13-04 | ambilNotifikasi:<br>SELECT * FROM tbl_notifikasi WHERE idPenerima = @idPengguna ORDER BY waktuKirim DESC | Mengambil semua notifikasi milik pengguna, terbaru di atas. |
| Q-C13-05 | bacaNotifikasi (ambil):<br>SELECT * FROM tbl_notifikasi WHERE idNotifikasi = @idNotifikasi | Mengambil satu notifikasi yang dipilih pengguna. |
| Q-C13-06 | bacaNotifikasi (tandai):<br>UPDATE tbl_notifikasi SET statusDibaca = TRUE WHERE idNotifikasi = @idNotifikasi | Menandai notifikasi sebagai sudah dibaca. |


## 5.14 Kelas KelolaProgramPage

**Nama Kelas:** KelolaProgramPage  
**ID Kelas:** C14 (*boundary*)

Tabel 5.14.1. Operasi Kelas KelolaProgramPage

| Nama Operasi | Visibility | Keterangan |
| :--- | :--- | :--- |
| bukaHalamanDaftarProgram(): void | public | Membuka halaman pendaftaran program oleh Inisiator Program. |
| tampilkanFormProgram(): void | public | Menampilkan formulir data program dan kolom unggah dokumen legalitas. |
| isiFormProgram(dataProgram: FormData): void` | public | Menyimpan isian formulir pada atribut dataProgram. |
| unggahDokumen(berkas: File): void | public | Menyimpan dokumen legalitas lembaga pada atribut berkas. |
| kirimPendaftaran(): void | public | Mengirim dataProgram dan berkas ke ProgramController.simpanProgramBaru(); menampilkan hasil. |
| tampilkanFormLaporan(idProgram: String): void` | public | Menampilkan formulir laporan akhir untuk program tertentu. |
| unggahLaporanAkhir(idProgram: String, dokumentasi: List<File>, ringkasanCapaian: String): void | public | Mengirim laporan akhir ke ProgramController.ajukanLaporanAkhir(); menampilkan status program hasilnya. |
| pilihLaporan(idLaporan: String): void | public | (Verifikator) Memilih laporan, lalu meminta ProgramController.tinjauLaporan(). |
| tampilkanLaporanUntukDitinjau(laporan: LaporanProgram): void | public | (Verifikator) Menampilkan ringkasan capaian dan dokumentasi laporan. |
| kirimPersetujuanLaporan(idLaporan: String): void | public | (Verifikator) Memanggil ProgramController.konfirmasiLaporan(). |
| kirimPenolakanLaporan(idLaporan: String, catatanRevisi: String): void | public | (Verifikator) Memanggil ProgramController.tolakLaporan() beserta catatan revisi. |
| tampilkanStatusProgram(status: StatusProgram): void | public | Menampilkan status program terbaru setelah pengajuan, persetujuan, atau penolakan. |
| tampilkanNotifikasiBerhasil(): void | public | Menampilkan pemberitahuan aksi berhasil. |
| tampilkanPesanError(pesan: String): void | public | Menampilkan pesan kesalahan validasi. |

Tabel 5.14.2. Atribut Kelas KelolaProgramPage

| Nama Atribut | Visibility | Tipe |
| :--- | :--- | :--- |
| dataProgram | private | FormData |
| berkas | private | File |

### 5.14.1 Algoritma/Query

**Nama Kelas :** KelolaProgramPage  
**Nama Operasi :** bukaHalamanDaftarProgram()  
**ID Algoritma :** (Algo-C14-01)

```text
Procedure bukaHalamanDaftarProgram()
    tampilkanFormProgram()
```

### 5.14.2 Algoritma/Query

**Nama Kelas :** KelolaProgramPage  
**Nama Operasi :** tampilkanFormProgram()  
**ID Algoritma :** (Algo-C14-02)

```text
Procedure tampilkanFormProgram()
    render formulir program (nama, deskripsi, kategori, tempat, waktu mulai, waktu selesai, kuota, syarat dan ketentuan, unggah dokumen legalitas)
```

### 5.14.3 Algoritma/Query

**Nama Kelas :** KelolaProgramPage  
**Nama Operasi :** isiFormProgram(dataProgram)  
**ID Algoritma :** (Algo-C14-03)

```text
Procedure isiFormProgram(dataProgram)
    this.dataProgram ← dataProgram
```

### 5.14.4 Algoritma/Query

**Nama Kelas :** KelolaProgramPage  
**Nama Operasi :** unggahDokumen(berkas)  
**ID Algoritma :** (Algo-C14-04)

```text
Procedure unggahDokumen(berkas)
    this.berkas ← berkas
```

### 5.14.5 Algoritma/Query

**Nama Kelas :** KelolaProgramPage  
**Nama Operasi :** kirimPendaftaran()  
**ID Algoritma :** (Algo-C14-05)

```text
Procedure kirimPendaftaran()
    hasil ← ProgramController.simpanProgramBaru(idInisiator, this.dataProgram, this.berkas)
    // idInisiator diambil dari sesi aktif
    if hasil = error(daftarPesan) then
        tampilkanPesanError(daftarPesan)
    else
        tampilkanNotifikasiBerhasil()
```

### 5.14.6 Algoritma/Query

**Nama Kelas :** KelolaProgramPage  
**Nama Operasi :** tampilkanFormLaporan(idProgram)  
**ID Algoritma :** (Algo-C14-06)

```text
Procedure tampilkanFormLaporan(idProgram)
    render formulir laporan akhir (unggah dokumentasi, ringkasan capaian) untuk idProgram
```

### 5.14.7 Algoritma/Query

**Nama Kelas :** KelolaProgramPage  
**Nama Operasi :** unggahLaporanAkhir(idProgram, dokumentasi, ringkasanCapaian)  
**ID Algoritma :** (Algo-C14-07)

```text
Procedure unggahLaporanAkhir(idProgram, dokumentasi, ringkasanCapaian)
    hasil ← ProgramController.ajukanLaporanAkhir(idProgram, dokumentasi, ringkasanCapaian)
    if hasil = error(daftarPesan) then
        tampilkanPesanError(daftarPesan)
    else
        tampilkanStatusProgram(hasil)
        tampilkanNotifikasiBerhasil()
```

### 5.14.8 Algoritma/Query

**Nama Kelas :** KelolaProgramPage  
**Nama Operasi :** pilihLaporan(idLaporan)  
**ID Algoritma :** (Algo-C14-08)

```text
Procedure pilihLaporan(idLaporan)
    laporan ← ProgramController.tinjauLaporan(idLaporan)
    tampilkanLaporanUntukDitinjau(laporan)
```

### 5.14.9 Algoritma/Query

**Nama Kelas :** KelolaProgramPage  
**Nama Operasi :** tampilkanLaporanUntukDitinjau(laporan)  
**ID Algoritma :** (Algo-C14-09)

```text
Procedure tampilkanLaporanUntukDitinjau(laporan)
    render laporan.showSummary() dan laporan.showDokumentasi()
    render tombol setujui dan tombol tolak (dengan kolom catatan revisi)
```

### 5.14.10 Algoritma/Query

**Nama Kelas :** KelolaProgramPage  
**Nama Operasi :** kirimPersetujuanLaporan(idLaporan)  
**ID Algoritma :** (Algo-C14-10)

```text
Procedure kirimPersetujuanLaporan(idLaporan)
    status ← ProgramController.konfirmasiLaporan(idLaporan, idVerifikator)
    // idVerifikator diambil dari sesi aktif
    tampilkanStatusProgram(status)
    tampilkanNotifikasiBerhasil()
```

### 5.14.11 Algoritma/Query

**Nama Kelas :** KelolaProgramPage  
**Nama Operasi :** kirimPenolakanLaporan(idLaporan, catatanRevisi)  
**ID Algoritma :** (Algo-C14-11)

```text
Procedure kirimPenolakanLaporan(idLaporan, catatanRevisi)
    if isEmpty(catatanRevisi) then
        tampilkanPesanError("Catatan revisi wajib diisi")
    else
        status ← ProgramController.tolakLaporan(idLaporan, idVerifikator, catatanRevisi)
        tampilkanStatusProgram(status)
```

### 5.14.12 Algoritma/Query

**Nama Kelas :** KelolaProgramPage  
**Nama Operasi :** tampilkanStatusProgram(status)  
**ID Algoritma :** (Algo-C14-12)

```text
Procedure tampilkanStatusProgram(status)
    render label status program (MENUNGGU_VERIFIKASI, AKTIF, MENUNGGU_KONFIRMASI, PERLU_REVISI, atau SELESAI)
```

### 5.14.13 Algoritma/Query

**Nama Kelas :** KelolaProgramPage  
**Nama Operasi :** tampilkanNotifikasiBerhasil()  
**ID Algoritma :** (Algo-C14-13)

```text
Procedure tampilkanNotifikasiBerhasil()
    render pesan keberhasilan aksi
```

### 5.14.14 Algoritma/Query

**Nama Kelas :** KelolaProgramPage  
**Nama Operasi :** tampilkanPesanError(pesan)  
**ID Algoritma :** (Algo-C14-14)

```text
Procedure tampilkanPesanError(pesan)
    render pesan kesalahan pada halaman
```

Kelas KelolaProgramPage adalah kelas *boundary* sehingga tidak mengakses basis data secara langsung dan tidak memiliki query.


## 5.15 Kelas ProgramController

**Nama Kelas:** ProgramController  
**ID Kelas:** C15 (*control*)

Tabel 5.15.1. Operasi Kelas ProgramController

| Nama Atribut | Visibility | Tipe |
| :--- | :--- | :--- |
| - | - | - |

Kelas ProgramController tidak memiliki atribut.

### 5.15.1 Algoritma/Query

**Nama Kelas :** ProgramController  
**Nama Operasi :** simpanProgramBaru(idInisiator, dataProgram, berkas)  
**ID Algoritma :** (Algo-C15-01)

```text
Function simpanProgramBaru(idInisiator, dataProgram, berkas)
    daftarGalat ← validasiDataProgram(dataProgram, berkas)
    if not isEmpty(daftarGalat) then
        → error daftarGalat
    inisiator ← DB_SERVICE.findInisiatorByID(idInisiator)
    if not inisiator.cekStatusVerifikasi() then
        → error "Lembaga belum terverifikasi"
    if not CloudStorageAdapter.validasiBerkas(berkas) then
        → error "Berkas tidak valid"
    url ← CloudStorageAdapter.unggahBerkas(berkas)
    dokumen ← new DokumenVerifikasi(idInisiator, "Legalitas lembaga", url, MENUNGGU)
    DB_SERVICE.saveDokumenVerifikasi(dokumen)
    program ← new Program(idInisiator, dataProgram, MENUNGGU_VERIFIKASI)
    DB_SERVICE.saveProgram(program)
    → program
```

### 5.15.2 Algoritma/Query

**Nama Kelas :** ProgramController  
**Nama Operasi :** validasiDataProgram(dataProgram, berkas)  
**Algoritma :** (Algo-C15-02)

```text
Function validasiDataProgram(dataProgram, berkas)
    galat ← new List<string>
    if isEmpty(dataProgram.namaProgram) or isEmpty(dataProgram.deskripsi)
       or isEmpty(dataProgram.tempatPelaksanaan) or isEmpty(dataProgram.syaratKetentuan) then
        galat.add("Data program tidak lengkap")
    if dataProgram.kategori not in {JAGA_ALAM, JAGA_IKLIM} then
        galat.add("Kategori tidak valid")
    if dataProgram.waktuSelesai ≤ dataProgram.waktuMulai then
        galat.add("Rentang waktu tidak valid")
    if dataProgram.kuota ≤ 0 then
        galat.add("Kuota harus lebih dari 0")
    if berkas = null then
        galat.add("Dokumen legalitas wajib diunggah")
    → galat
```

### 5.15.3 Algoritma/Query

**Nama Kelas :** ProgramController  
**Nama Operasi :** cariProgram(kataKunci, kategori)  
**ID Algoritma :** (Algo-C15-03)

```text
Function cariProgram(kataKunci, kategori)
    daftar ← Program.cari(kataKunci, kategori)
    → daftar
```

### 5.15.4 Algoritma/Query

**Nama Kelas :** ProgramController  
**Nama Operasi :** ambilDetailProgram(idProgram)  
**ID Algoritma :** (Algo-C15-04)

```text
Function ambilDetailProgram(idProgram)
    program ← DB_SERVICE.findProgramByID(idProgram)
    if program = null then
        → error "Program tidak ditemukan"
    url ← program.getTautan()
    program.tautanValid ← validasiTautanSitus(url)
    → program
```

### 5.15.5 Algoritma/Query

**Nama Kelas :** ProgramController  
**Nama Operasi :** validasiTautanSitus(url)  
**ID Algoritma :** (Algo-C15-05)

```text
Function validasiTautanSitus(url)
    if isEmpty(url) then
        → false
    → (url berformat URL dengan skema http atau https)
```

### 5.15.6 Algoritma/Query

**Nama Kelas :** ProgramController  
**Nama Operasi :** ajukanLaporanAkhir(idProgram, dokumentasi, ringkasanCapaian)  
**ID Algoritma :** (Algo-C15-06)

```text
Function ajukanLaporanAkhir(idProgram, dokumentasi, ringkasanCapaian)
    daftarGalat ← validasiLaporan(dokumentasi, ringkasanCapaian)
    if not isEmpty(daftarGalat) then
        → error daftarGalat
    program ← DB_SERVICE.findProgramByID(idProgram)
    laporan ← new LaporanProgram(idProgram, ringkasanCapaian, MENUNGGU)
    For each berkas in dokumentasi
        url ← CloudStorageAdapter.unggahBerkas(berkas)
        laporan.uploadDokumentasi(url)
    DB_SERVICE.saveLaporan(laporan)
    status ← program.ajukanKonfirmasi()
    DB_SERVICE.updateStatusProgram(idProgram, status)
    → status
```

### 5.15.7 Algoritma/Query

**Nama Kelas :** ProgramController  
**Nama Operasi :** validasiLaporan(dokumentasi, ringkasanCapaian)  
**ID Algoritma :** (Algo-C15-07)

```text
Function validasiLaporan(dokumentasi, ringkasanCapaian)
    galat ← new List<string>
    if isEmpty(dokumentasi) then
        galat.add("Dokumentasi akhir wajib diunggah")
    For each berkas in dokumentasi
        if not CloudStorageAdapter.validasiBerkas(berkas) then
            galat.add("Berkas tidak valid")
    if isEmpty(ringkasanCapaian) then
        galat.add("Ringkasan capaian wajib diisi")
    → galat
```

### 5.15.8 Algoritma/Query

**Nama Kelas :** ProgramController  
**Nama Operasi :** tinjauLaporan(idLaporan)  
**ID Algoritma :** (Algo-C15-08)

```text
Function tinjauLaporan(idLaporan)
    laporan ← DB_SERVICE.findLaporanByID(idLaporan)
    if laporan = null then
        → error "Laporan tidak ditemukan"
    → laporan
```

### 5.15.9 Algoritma/Query

**Nama Kelas :** ProgramController  
**Nama Operasi :** konfirmasiLaporan(idLaporan, idVerifikator)  
**ID Algoritma :** (Algo-C15-09)

```text
Function konfirmasiLaporan(idLaporan, idVerifikator)
    laporan ← DB_SERVICE.findLaporanByID(idLaporan)
    verifikator ← DB_SERVICE.findVerifikatorByID(idVerifikator)
    program ← DB_SERVICE.findProgramByLaporan(idLaporan)
    verifikator.konfirmasiLaporan(laporan)
    DB_SERVICE.updateStatusLaporan(laporan)
    status ← program.selesaikan()
    DB_SERVICE.updateStatusProgram(program.idProgram, status)
    PresensiController.perbaruiPortofolioRelawan(program.idProgram)
    buatNotifikasi(program.ambilPengelola(), "Laporan akhir disetujui")
    → status
```

### 5.15.10 Algoritma/Query

**Nama Kelas :** ProgramController  
**Nama Operasi :** tolakLaporan(idLaporan, idVerifikator, catatanRevisi)  
**ID Algoritma :** (Algo-C15-10)

```text
Function tolakLaporan(idLaporan, idVerifikator, catatanRevisi)
    laporan ← DB_SERVICE.findLaporanByID(idLaporan)
    verifikator ← DB_SERVICE.findVerifikatorByID(idVerifikator)
    program ← DB_SERVICE.findProgramByLaporan(idLaporan)
    verifikator.tolakLaporan(laporan, catatanRevisi)
    DB_SERVICE.updateStatusLaporan(laporan)
    status ← program.mintaRevisi()
    DB_SERVICE.updateStatusProgram(program.idProgram, status)
    buatNotifikasi(program.ambilPengelola(), "Laporan perlu revisi: " + catatanRevisi)
    → status
```

### 5.15.11 Algoritma/Query

**Nama Kelas :** ProgramController  
**Nama Operasi :** buatNotifikasi(penerima, pesan)  
**ID Algoritma :** (Algo-C15-11)

```text
Function buatNotifikasi(penerima, pesan)
    notifikasi ← new Notifikasi(penerima.idPengguna, pesan, false)
    notifikasi.kirim()
    DB_SERVICE.saveNotifikasi(notifikasi)
    → notifikasi
```

Query :

| No Query | Query | Keterangan |
| :--- | :--- | :--- |
| Q-C15-01 | simpanProgramBaru (dokumen):<br>INSERT INTO tbl_dokumen_verifikasi (idDokumen, idPengguna, jenisDokumen, urlFile, statusVerifikasi) VALUES (@idDokumen, @idInisiator, 'Legalitas lembaga', @urlFile, 'MENUNGGU') | Menyimpan dokumen legalitas lembaga yang diunggah saat mendaftarkan program. |
| Q-C15-02 | simpanProgramBaru (program):<br>INSERT INTO tbl_program (idProgram, idInisiator, namaProgram, deskripsi, kategori, tempatPelaksanaan, waktuMulai, waktuSelesai, kuota, syaratKetentuan, status) VALUES (@idProgram, @idInisiator, @namaProgram, @deskripsi, @kategori, @tempat, @waktuMulai, @waktuSelesai, @kuota, @syarat, 'MENUNGGU_VERIFIKASI') | Mendaftarkan program baru ke dalam sistem. |
| Q-C15-03 | cariProgram:<br>SELECT * FROM tbl_program WHERE status = 'AKTIF' AND (namaProgram LIKE @kataKunci OR deskripsi LIKE @kataKunci) AND (@kategori IS NULL OR kategori = @kategori) | Mencari program aktif berdasarkan kata kunci dan filter kategori (dijalankan oleh Program.cari()). |
| Q-C15-04 | ambilDetailProgram:<br>SELECT p.*, i.tautanSitusResmi FROM tbl_program p JOIN tbl_inisiator_program i ON p.idInisiator = i.idInisiator WHERE p.idProgram = @idProgram | Mengambil detail program beserta tautan situs resmi lembaga pengelola. |
| Q-C15-05 | ajukanLaporanAkhir (laporan):<br>INSERT INTO tbl_laporan_program (idLaporan, idProgram, dokumentasiAkhir, ringkasanCapaian, statusPeninjauan, waktuPengajuan) VALUES (@idLaporan, @idProgram, @dokumentasiAkhir, @ringkasanCapaian, 'MENUNGGU', CURRENT_TIMESTAMP) | Menyimpan laporan akhir yang diajukan Inisiator. |
| Q-C15-06 | updateStatusProgram:<br>UPDATE tbl_program SET status = @status WHERE idProgram = @idProgram | Memperbarui status program (MENUNGGU_KONFIRMASI, SELESAI, atau PERLU_REVISI). |
| Q-C15-07 | tinjauLaporan:<br>SELECT * FROM tbl_laporan_program WHERE idLaporan = @idLaporan | Mengambil laporan akhir untuk ditinjau Verifikator. |
| Q-C15-08 | updateStatusLaporan:<br>UPDATE tbl_laporan_program SET statusPeninjauan = @statusPeninjauan, catatanRevisi = @catatanRevisi, idVerifikator = @idVerifikator WHERE idLaporan = @idLaporan | Menyimpan hasil peninjauan laporan (disetujui atau ditolak). |
| Q-C15-09 | buatNotifikasi:<br>INSERT INTO tbl_notifikasi (idNotifikasi, idPenerima, pesan, waktuKirim, statusDibaca) VALUES (@idNotifikasi, @idPenerima, @pesan, CURRENT_TIMESTAMP, FALSE) | Menyimpan notifikasi untuk Inisiator Program. |


<br>


## 5.16 Kelas EksplorasiProgramPage
**Nama Kelas:** EksplorasiProgramPage
**ID Kelas:** C16 (*boundary*)

Tabel 5.16.1. Operasi Kelas EksplorasiProgramPage

| Nama Operasi | Visibility | Keterangan |
|:---|:---|:---|
| bukaHalamanEksplorasi(): void | public | Membuka halaman eksplorasi dan menampilkan seluruh program aktif tanpa filter. |
| terimaInputPencarian(kataKunci: String, kategori: KategoriProgram): void | public | Menerima kata kunci dan kategori, menyimpannya pada atribut, lalu meminta hasil pencarian ke ProgramController. |
| tampilkanDaftarProgram(daftar: List<Program>): void | public | Menampilkan daftar ringkasan program hasil pencarian. |
| tampilkanPesanTidakDitemukan(): void | public | Menampilkan pesan bahwa tidak ada program yang sesuai pencarian. |
| pilihProgram(idProgram: String): void | public | Menyimpan program yang dipilih Relawan dan menampilkan detailnya. |
| tampilkanDetailProgram(idProgram: String): void | public | Mengambil dan menampilkan detail program beserta status ketersediaan tautan situs resmi. |
| klikTautanSitusResmi(): void | public | Menangani klik pada tautan situs resmi program terpilih. |
| arahkanKeSitusResmi(url: String): void | public | Membuka tautan situs resmi pada tab peramban baru. |
| nonaktifkanTautan(): void | public | Menonaktifkan elemen tautan situs resmi ketika tidak tersedia/tidak valid. |
| pilihDaftarProgram(idProgram: String): void | public | Menangani klik tombol daftar; memeriksa sesi sebelum menampilkan formulir pendaftaran. |
| tampilkanFormPendaftaran(): void | public | Menampilkan formulir permohonan pendaftaran (keterampilan, ketersediaan waktu). |
| kirimPermohonanPendaftaran(keterampilan: String, ketersediaanWaktu: String): void | public | Mengirim permohonan pendaftaran ke SeleksiController. |
| tampilkanNotifikasiBerhasil(): void | public | Menampilkan pemberitahuan keberhasilan suatu aksi. |
| tampilkanPesanError(pesan: String): void | public | Menampilkan pesan kesalahan pada halaman. |

Tabel 5.16.2. Atribut Kelas EksplorasiProgramPage

| Nama Atribut | Visibility | Tipe |
|:---|:---|:---|
| kataKunciPencarian | private | String |
| filterKategori | private | KategoriProgram |
| idProgramTerpilih | private | String |

### 5.16.1 Algoritma/Query

**Nama Kelas :** EksplorasiProgramPage
**Nama Operasi :** bukaHalamanEksplorasi()
**ID Algoritma :** (Algo-C16-01)

```text
Procedure bukaHalamanEksplorasi()
    daftar ← ProgramController.cariProgram("", null)
    // string kosong dan kategori null mengambil seluruh program yang aktif
    if isEmpty(daftar) then
        tampilkanPesanTidakDitemukan()
    else
        tampilkanDaftarProgram(daftar)
```

### 5.16.2 Algoritma/Query

**Nama Kelas :** EksplorasiProgramPage
**Nama Operasi :** terimaInputPencarian(kataKunci, kategori)
**ID Algoritma :** (Algo-C16-02)

```text
Procedure terimaInputPencarian(kataKunci, kategori)
    this.kataKunciPencarian ← kataKunci
    this.filterKategori ← kategori
    daftar ← ProgramController.cariProgram(kataKunci, kategori)
    if isEmpty(daftar) then
        tampilkanPesanTidakDitemukan()
    else
        tampilkanDaftarProgram(daftar)
```

### 5.16.3 Algoritma/Query

**Nama Kelas :** EksplorasiProgramPage
**Nama Operasi :** tampilkanDaftarProgram(daftar)
**ID Algoritma :** (Algo-C16-03)

```text
Procedure tampilkanDaftarProgram(daftar)
    For each program in daftar
        render kartu ringkasan program (namaProgram, kategori, status)
```

### 5.16.4 Algoritma/Query

**Nama Kelas :** EksplorasiProgramPage
**Nama Operasi :** tampilkanPesanTidakDitemukan()
**ID Algoritma :** (Algo-C16-04)

```text
Procedure tampilkanPesanTidakDitemukan()
    render pesan "Program tidak ditemukan"
```

### 5.16.5 Algoritma/Query

**Nama Kelas :** EksplorasiProgramPage
**Nama Operasi :** pilihProgram(idProgram)
**ID Algoritma :** (Algo-C16-05)

```text
Procedure pilihProgram(idProgram)
    this.idProgramTerpilih ← idProgram
    tampilkanDetailProgram(idProgram)
```

### 5.16.6 Algoritma/Query

**Nama Kelas :** EksplorasiProgramPage
**Nama Operasi :** tampilkanDetailProgram(idProgram)
**ID Algoritma :** (Algo-C16-06)

```text
Procedure tampilkanDetailProgram(idProgram)
    program ← ProgramController.ambilDetailProgram(idProgram)
    render detail program (deskripsi, waktuMulai, waktuSelesai, tempatPelaksanaan, kuota, syaratKetentuan)
    if program.tautanValid then
        render tombol tautan situs resmi (aktif)
    else
        nonaktifkanTautan()
```

### 5.16.7 Algoritma/Query

**Nama Kelas :** EksplorasiProgramPage
**Nama Operasi :** klikTautanSitusResmi()
**ID Algoritma :** (Algo-C16-07)

```text
Procedure klikTautanSitusResmi()
    program ← ProgramController.ambilDetailProgram(this.idProgramTerpilih)
    if program.tautanValid then
        arahkanKeSitusResmi(program.getTautan())
```

### 5.16.8 Algoritma/Query

**Nama Kelas :** EksplorasiProgramPage
**Nama Operasi :** arahkanKeSitusResmi(url)
**ID Algoritma :** (Algo-C16-08)

```text
Procedure arahkanKeSitusResmi(url)
    buka url pada tab peramban baru
```

### 5.16.9 Algoritma/Query

**Nama Kelas :** EksplorasiProgramPage
**Nama Operasi :** nonaktifkanTautan()
**ID Algoritma :** (Algo-C16-09)

```text
Procedure nonaktifkanTautan()
    render tombol tautan situs resmi (nonaktif) beserta keterangan "Situs resmi tidak tersedia"
```

### 5.16.10 Algoritma/Query

**Nama Kelas :** EksplorasiProgramPage
**Nama Operasi :** pilihDaftarProgram(idProgram)
**ID Algoritma :** (Algo-C16-10)

```text
Procedure pilihDaftarProgram(idProgram)
    this.idProgramTerpilih ← idProgram
    if not AuthController.cekSesi() then
        KelolaAkunPage.arahkanKeLogin(urlHalamanIni())
    else
        tampilkanFormPendaftaran()
```

### 5.16.11 Algoritma/Query

**Nama Kelas :** EksplorasiProgramPage
**Nama Operasi :** tampilkanFormPendaftaran()
**ID Algoritma :** (Algo-C16-11)

```text
Procedure tampilkanFormPendaftaran()
    render formulir permohonan pendaftaran (kolom keterampilan, kolom ketersediaan waktu)
```

### 5.16.12 Algoritma/Query

**Nama Kelas :** EksplorasiProgramPage
**Nama Operasi :** kirimPermohonanPendaftaran(keterampilan, ketersediaanWaktu)
**ID Algoritma :** (Algo-C16-12)

```text
Procedure kirimPermohonanPendaftaran(keterampilan, ketersediaanWaktu)
    // idRelawan diambil dari sesi aktif
    hasil ← SeleksiController.ajukanPendaftaran(this.idProgramTerpilih, idRelawan, keterampilan, ketersediaanWaktu)
    if hasil = error(pesan) then
        tampilkanPesanError(pesan)
    else
        tampilkanNotifikasiBerhasil()
```

### 5.16.13 Algoritma/Query

**Nama Kelas :** EksplorasiProgramPage
**Nama Operasi :** tampilkanNotifikasiBerhasil()
**ID Algoritma :** (Algo-C16-13)

```text
Procedure tampilkanNotifikasiBerhasil()
    render pesan "Permohonan pendaftaran berhasil dikirim"
```

### 5.16.14 Algoritma/Query

**Nama Kelas :** EksplorasiProgramPage
**Nama Operasi :** tampilkanPesanError(pesan)
**ID Algoritma :** (Algo-C16-14)

```text
Procedure tampilkanPesanError(pesan)
    render pesan kesalahan pada halaman
```

Kelas EksplorasiProgramPage adalah kelas boundary sehingga tidak mengakses basis data secara langsung dan tidak memiliki query.


## 5.17 Kelas KelolaPendaftarPage
**Nama Kelas:** KelolaPendaftarPage
**ID Kelas:** C17 (*boundary*)

Tabel 5.17.1. Operasi Kelas KelolaPendaftarPage

| Nama Operasi | Visibility | Keterangan |
|:---|:---|:---|
| bukaKelolaPendaftar(idProgram: String): void | public | Membuka halaman kelola pendaftar dan menampilkan daftar calon relawan beserta formulir seleksi. |
| tampilkanDaftarPendaftar(daftar: List<Pendaftaran>): void | public | Menampilkan daftar calon relawan pendaftar. |
| tampilkanFormSeleksi(): void | public | Menampilkan formulir pemilihan status seleksi untuk setiap pendaftar. |
| pilihStatusSeleksi(idPendaftaran: String, status: StatusPendaftaran): void | public | Menyimpan keputusan status (Diterima/Ditolak) sementara pada state formulir. |
| kirimHasilSeleksi(): void | public | Mengirim seluruh keputusan seleksi ke SeleksiController. |
| kirimKonfirmasiHasil(): void | public | Mengirim konfirmasi pengiriman hasil seleksi ke SeleksiController. |
| tampilkanKonfirmasiHasil(): void | public | Menampilkan pemberitahuan bahwa hasil seleksi telah dikonfirmasi. |
| tampilkanNotifikasiBerhasil(): void | public | Menampilkan pemberitahuan keberhasilan suatu aksi. |
| tampilkanPesanError(pesan: String): void | public | Menampilkan pesan kesalahan pada halaman. |

Tabel 5.17.2. Atribut Kelas KelolaPendaftarPage

Kelas KelolaPendaftarPage tidak memiliki atribut (-).

### 5.17.1 Algoritma/Query

**Nama Kelas :** KelolaPendaftarPage
**Nama Operasi :** bukaKelolaPendaftar(idProgram)
**ID Algoritma :** (Algo-C17-01)

```text
Procedure bukaKelolaPendaftar(idProgram)
    daftar ← SeleksiController.lihatDaftarRelawan(idProgram)
    tampilkanDaftarPendaftar(daftar)
    tampilkanFormSeleksi()
```

### 5.17.2 Algoritma/Query

**Nama Kelas :** KelolaPendaftarPage
**Nama Operasi :** tampilkanDaftarPendaftar(daftar)
**ID Algoritma :** (Algo-C17-02)

```text
Procedure tampilkanDaftarPendaftar(daftar)
    For each pendaftaran in daftar
        render baris pendaftar (nama relawan, keterampilan, ketersediaanWaktu, status)
```

### 5.17.3 Algoritma/Query

**Nama Kelas :** KelolaPendaftarPage
**Nama Operasi :** tampilkanFormSeleksi()
**ID Algoritma :** (Algo-C17-03)

```text
Procedure tampilkanFormSeleksi()
    render formulir pilihan status (Diterima/Ditolak) untuk setiap pendaftar
```

### 5.17.4 Algoritma/Query

**Nama Kelas :** KelolaPendaftarPage
**Nama Operasi :** pilihStatusSeleksi(idPendaftaran, status)
**ID Algoritma :** (Algo-C17-04)

```text
Procedure pilihStatusSeleksi(idPendaftaran, status)
    simpan status terpilih untuk idPendaftaran pada state formulir seleksi (keputusan)
```

### 5.17.5 Algoritma/Query

**Nama Kelas :** KelolaPendaftarPage
**Nama Operasi :** kirimHasilSeleksi()
**ID Algoritma :** (Algo-C17-05)

```text
Procedure kirimHasilSeleksi()
    // idProgram diambil dari konteks halaman (route); keputusan dari state formulir seleksi
    berhasil ← SeleksiController.simpanHasilSeleksi(idProgram, keputusan)
    if berhasil then
        tampilkanNotifikasiBerhasil()
    else
        tampilkanPesanError("Kuota relawan program telah terpenuhi")
```

### 5.17.6 Algoritma/Query

**Nama Kelas :** KelolaPendaftarPage
**Nama Operasi :** kirimKonfirmasiHasil()
**ID Algoritma :** (Algo-C17-06)

```text
Procedure kirimKonfirmasiHasil()
    berhasil ← SeleksiController.konfirmasiHasilSeleksi(idProgram)
    if berhasil then
        tampilkanKonfirmasiHasil()
    else
        tampilkanPesanError("Masih terdapat pendaftar yang belum diseleksi")
```

### 5.17.7 Algoritma/Query

**Nama Kelas :** KelolaPendaftarPage
**Nama Operasi :** tampilkanKonfirmasiHasil()
**ID Algoritma :** (Algo-C17-07)

```text
Procedure tampilkanKonfirmasiHasil()
    render pesan "Hasil seleksi telah dikonfirmasi dan notifikasi terkirim ke seluruh pendaftar"
```

### 5.17.8 Algoritma/Query

**Nama Kelas :** KelolaPendaftarPage
**Nama Operasi :** tampilkanNotifikasiBerhasil()
**ID Algoritma :** (Algo-C17-08)

```text
Procedure tampilkanNotifikasiBerhasil()
    render pesan "Hasil seleksi berhasil disimpan"
```

### 5.17.9 Algoritma/Query

**Nama Kelas :** KelolaPendaftarPage
**Nama Operasi :** tampilkanPesanError(pesan)
**ID Algoritma :** (Algo-C17-09)

```text
Procedure tampilkanPesanError(pesan)
    render pesan kesalahan pada halaman
```

Kelas KelolaPendaftarPage adalah kelas boundary sehingga tidak mengakses basis data secara langsung dan tidak memiliki query.


## 5.18 Kelas SeleksiController
**Nama Kelas:** SeleksiController
**ID Kelas:** C18 (*control*)

Tabel 5.18.1. Operasi Kelas SeleksiController

| Nama Operasi | Visibility | Keterangan |
|:---|:---|:---|
| ajukanPendaftaran(idProgram: String, idRelawan: String, keterampilan: String, ketersediaanWaktu: String): Pendaftaran | public | Memeriksa kelengkapan dan kelayakan Relawan serta ketersediaan kuota, lalu membuat objek Pendaftaran. |
| lihatDaftarRelawan(idProgram: String): List<Pendaftaran> | public | Mengambil daftar pendaftar suatu program. |
| validasiKuota(idProgram: String, jumlahDiterimaBaru: Integer): Boolean | private | Memeriksa apakah kuota program masih mencukupi untuk sejumlah penerimaan baru. |
| simpanHasilSeleksi(idProgram: String, keputusan: Map<String, StatusPendaftaran>): Boolean | public | Memvalidasi kuota lalu menyimpan keputusan Diterima/Ditolak untuk setiap pendaftar. |
| konfirmasiHasilSeleksi(idProgram: String): Boolean | public | Memastikan seluruh pendaftar sudah diputuskan, lalu memicu pengiriman notifikasi hasil seleksi. |
| triggerNotifikasi(pendaftaran: Pendaftaran): Notifikasi | private | Membuat dan mengirim notifikasi hasil seleksi untuk satu pendaftaran. |

Tabel 5.18.2. Atribut Kelas SeleksiController

Kelas SeleksiController tidak memiliki atribut (-).

### 5.18.1 Algoritma/Query

**Nama Kelas :** SeleksiController
**Nama Operasi :** ajukanPendaftaran(idProgram, idRelawan, keterampilan, ketersediaanWaktu)
**ID Algoritma :** (Algo-C18-01)

```text
Function ajukanPendaftaran(idProgram, idRelawan, keterampilan, ketersediaanWaktu)
    relawan ← DB_SERVICE.findRelawanByID(idRelawan)
    if not relawan.cekKelengkapanData() then
        → error "Data diri belum lengkap"
    if not relawan.cekStatusKelayakan() then
        → error "Relawan belum memenuhi syarat kelayakan (KF10)"
    program ← DB_SERVICE.findProgramByID(idProgram)
    if not program.cekKuotaTersedia(1) then
        → error "Kuota program sudah penuh"
    pendaftaran ← new Pendaftaran(idProgram, idRelawan, keterampilan, ketersediaanWaktu, MENUNGGU)
    DB_SERVICE.savePendaftaran(pendaftaran)
    → pendaftaran
```

### 5.18.2 Algoritma/Query

**Nama Kelas :** SeleksiController
**Nama Operasi :** lihatDaftarRelawan(idProgram)
**ID Algoritma :** (Algo-C18-02)

```text
Function lihatDaftarRelawan(idProgram)
    program ← DB_SERVICE.findProgramByID(idProgram)
    → program.daftarPendaftar()
```

### 5.18.3 Algoritma/Query

**Nama Kelas :** SeleksiController
**Nama Operasi :** validasiKuota(idProgram, jumlahDiterimaBaru)
**ID Algoritma :** (Algo-C18-03)

```text
Function validasiKuota(idProgram, jumlahDiterimaBaru)
    program ← DB_SERVICE.findProgramByID(idProgram)
    → program.cekKuotaTersedia(jumlahDiterimaBaru)
```

### 5.18.4 Algoritma/Query

**Nama Kelas :** SeleksiController
**Nama Operasi :** simpanHasilSeleksi(idProgram, keputusan)
**ID Algoritma :** (Algo-C18-04)

```text
Function simpanHasilSeleksi(idProgram, keputusan)
    jumlahDiterimaBaru ← jumlah entri pada keputusan bernilai DITERIMA
    if not validasiKuota(idProgram, jumlahDiterimaBaru) then
        → false
    For each (idPendaftaran, status) in keputusan
        pendaftaran ← DB_SERVICE.findPendaftaranByID(idPendaftaran)
        if status = DITERIMA then
            pendaftaran.terima()
        else
            pendaftaran.tolak()
    → true
```

### 5.18.5 Algoritma/Query

**Nama Kelas :** SeleksiController
**Nama Operasi :** konfirmasiHasilSeleksi(idProgram)
**ID Algoritma :** (Algo-C18-05)

```text
Function konfirmasiHasilSeleksi(idProgram)
    program ← DB_SERVICE.findProgramByID(idProgram)
    daftarPendaftar ← program.daftarPendaftar()
    For each pendaftaran in daftarPendaftar
        if not pendaftaran.sudahDiputuskan() then
            → false
    For each pendaftaran in daftarPendaftar
        triggerNotifikasi(pendaftaran)
    → true
```

### 5.18.6 Algoritma/Query

**Nama Kelas :** SeleksiController
**Nama Operasi :** triggerNotifikasi(pendaftaran)
**ID Algoritma :** (Algo-C18-06)

```text
Function triggerNotifikasi(pendaftaran)
    if pendaftaran.isDiterima() then
        pesan ← "Pendaftaran Anda diterima"
    else
        pesan ← "Pendaftaran Anda ditolak"
    notifikasi ← new Notifikasi(pendaftaran.idRelawan, pesan, false)
    notifikasi.kirim()
    DB_SERVICE.saveNotifikasi(notifikasi)
    → notifikasi
```

Tabel 5.18.3. Query Kelas SeleksiController

| No Query | Query | Keterangan |
|:---|:---|:---|
| Q-C18-01 | INSERT INTO tbl_pendaftaran (idPendaftaran, idProgram, idRelawan, keterampilan, ketersediaanWaktu, status, waktuDaftar) VALUES (@idPendaftaran, @idProgram, @idRelawan, @keterampilan, @ketersediaanWaktu, 'MENUNGGU', CURRENT_TIMESTAMP) | Menyimpan permohonan pendaftaran baru dari Relawan. |
| Q-C18-02 | INSERT INTO tbl_notifikasi (idNotifikasi, idPenerima, pesan, waktuKirim, statusDibaca) VALUES (@idNotifikasi, @idRelawan, @pesan, CURRENT_TIMESTAMP, FALSE) | Menyimpan notifikasi hasil seleksi untuk Relawan. |


## 5.19 Kelas AreaKegiatanPage
**Nama Kelas:** AreaKegiatanPage
**ID Kelas:** C19 (*boundary*)

Tabel 5.19.1. Operasi Kelas AreaKegiatanPage

| Nama Operasi | Visibility | Keterangan |
|:---|:---|:---|
| bukaHalamanKegiatan(idProgram: String): void | public | Membuka halaman kegiatan dan memeriksa status relawan serta waktu pelaksanaan untuk menentukan ketersediaan tombol check-in. |
| tampilkanTombolCheckIn(aktif: Boolean): void | public | Menampilkan tombol check-in sesuai status aktif/nonaktifnya. |
| tampilkanKeteranganWaktu(keterangan: String): void | public | Menampilkan keterangan waktu pelaksanaan kegiatan. |
| klikCheckIn(): void | public | Menangani aksi check-in yang dilakukan Relawan. |
| tampilkanStatusCheckIn(berhasil: Boolean): void | public | Menampilkan status keberhasilan check-in. |
| bukaPortofolio(): void | public | Membuka halaman portofolio dan meminta total jam aksi serta riwayat program Relawan. |
| tampilkanPortofolio(totalJamAksi: Float): void | public | Menampilkan total jam aksi Relawan. |
| tampilkanRiwayatProgram(daftar: List<Program>): void | public | Menampilkan daftar program yang telah diselesaikan Relawan. |

Tabel 5.19.2. Atribut Kelas AreaKegiatanPage

Kelas AreaKegiatanPage tidak memiliki atribut (-).

### 5.19.1 Algoritma/Query

**Nama Kelas :** AreaKegiatanPage
**Nama Operasi :** bukaHalamanKegiatan(idProgram)
**ID Algoritma :** (Algo-C19-01)

```text
Procedure bukaHalamanKegiatan(idProgram)
    // idRelawan diambil dari sesi aktif
    statusRelawan ← PresensiController.validasiStatusRelawan(idProgram, idRelawan)
    waktuValid ← PresensiController.validasiWaktuPelaksanaan(idProgram, now())
    tampilkanTombolCheckIn(statusRelawan and waktuValid)
    if not waktuValid then
        keterangan ← PresensiController.ambilKeteranganWaktu(idProgram)
        tampilkanKeteranganWaktu(keterangan)
```

### 5.19.2 Algoritma/Query

**Nama Kelas :** AreaKegiatanPage
**Nama Operasi :** tampilkanTombolCheckIn(aktif)
**ID Algoritma :** (Algo-C19-02)

```text
Procedure tampilkanTombolCheckIn(aktif)
    render tombol check-in (aktif apabila parameter bernilai true, nonaktif jika sebaliknya)
```

### 5.19.3 Algoritma/Query

**Nama Kelas :** AreaKegiatanPage
**Nama Operasi :** tampilkanKeteranganWaktu(keterangan)
**ID Algoritma :** (Algo-C19-03)

```text
Procedure tampilkanKeteranganWaktu(keterangan)
    render keterangan waktu pelaksanaan kegiatan pada halaman
```

### 5.19.4 Algoritma/Query

**Nama Kelas :** AreaKegiatanPage
**Nama Operasi :** klikCheckIn()
**ID Algoritma :** (Algo-C19-04)

```text
Procedure klikCheckIn()
    // idProgram dari konteks halaman, idRelawan dari sesi aktif
    hasil ← PresensiController.prosesCheckIn(idProgram, idRelawan)
    tampilkanStatusCheckIn(hasil ≠ error)
```

### 5.19.5 Algoritma/Query

**Nama Kelas :** AreaKegiatanPage
**Nama Operasi :** tampilkanStatusCheckIn(berhasil)
**ID Algoritma :** (Algo-C19-05)

```text
Procedure tampilkanStatusCheckIn(berhasil)
    if berhasil then
        render pesan "Kehadiran berhasil dikonfirmasi"
    else
        render pesan "Check-in gagal"
```

### 5.19.6 Algoritma/Query

**Nama Kelas :** AreaKegiatanPage
**Nama Operasi :** bukaPortofolio()
**ID Algoritma :** (Algo-C19-06)

```text
Procedure bukaPortofolio()
    // idRelawan diambil dari sesi aktif
    total ← PresensiController.ambilTotalJamAksi(idRelawan)
    daftar ← PresensiController.ambilRiwayatProgram(idRelawan)
    tampilkanPortofolio(total)
    tampilkanRiwayatProgram(daftar)
```

### 5.19.7 Algoritma/Query

**Nama Kelas :** AreaKegiatanPage
**Nama Operasi :** tampilkanPortofolio(totalJamAksi)
**ID Algoritma :** (Algo-C19-07)

```text
Procedure tampilkanPortofolio(totalJamAksi)
    render total jam aksi Relawan
```

### 5.19.8 Algoritma/Query

**Nama Kelas :** AreaKegiatanPage
**Nama Operasi :** tampilkanRiwayatProgram(daftar)
**ID Algoritma :** (Algo-C19-08)

```text
Procedure tampilkanRiwayatProgram(daftar)
    For each program in daftar
        render baris riwayat program (namaProgram, waktuMulai, waktuSelesai)
```

Kelas AreaKegiatanPage adalah kelas boundary sehingga tidak mengakses basis data secara langsung dan tidak memiliki query.


## 5.20 Kelas PresensiController
**Nama Kelas:** PresensiController
**ID Kelas:** C20 (*control*)

Tabel 5.20.1. Operasi Kelas PresensiController

| Nama Operasi | Visibility | Keterangan |
|:---|:---|:---|
| validasiStatusRelawan(idProgram: String, idRelawan: String): Boolean | public | Memeriksa apakah Relawan terdaftar dan diterima pada program. |
| validasiWaktuPelaksanaan(idProgram: String, waktu: DateTime): Boolean | public | Memeriksa apakah suatu waktu berada dalam rentang pelaksanaan program. |
| prosesCheckIn(idProgram: String, idRelawan: String): Kehadiran | public | Memvalidasi status dan waktu, lalu mencatat kehadiran Relawan. |
| perbaruiPortofolioRelawan(idProgram: String): void | public | Mencatat kontribusi setiap relawan yang hadir pada program yang telah selesai, dipicu ProgramController setelah laporan disetujui. |
| ambilKeteranganWaktu(idProgram: String): String | public | Mengambil keterangan waktu pelaksanaan program. |
| ambilTotalJamAksi(idRelawan: String): Float | public | Mengambil total jam aksi seorang Relawan. |
| ambilRiwayatProgram(idRelawan: String): List<Program> | public | Mengambil daftar program yang telah diselesaikan seorang Relawan. |

Tabel 5.20.2. Atribut Kelas PresensiController

Kelas PresensiController tidak memiliki atribut (-).

### 5.20.1 Algoritma/Query

**Nama Kelas :** PresensiController
**Nama Operasi :** validasiStatusRelawan(idProgram, idRelawan)
**ID Algoritma :** (Algo-C20-01)

```text
Function validasiStatusRelawan(idProgram, idRelawan)
    pendaftaran ← DB_SERVICE.findPendaftaranByProgramDanRelawan(idProgram, idRelawan)
    if pendaftaran = null then
        → false
    → pendaftaran.isDiterima()
```

### 5.20.2 Algoritma/Query

**Nama Kelas :** PresensiController
**Nama Operasi :** validasiWaktuPelaksanaan(idProgram, waktu)
**ID Algoritma :** (Algo-C20-02)

```text
Function validasiWaktuPelaksanaan(idProgram, waktu)
    program ← DB_SERVICE.findProgramByID(idProgram)
    if program = null then
        → false
    → program.cekDalamWaktuPelaksanaan(waktu)
```

### 5.20.3 Algoritma/Query

**Nama Kelas :** PresensiController
**Nama Operasi :** prosesCheckIn(idProgram, idRelawan)
**ID Algoritma :** (Algo-C20-03)

```text
Function prosesCheckIn(idProgram, idRelawan)
    if not validasiStatusRelawan(idProgram, idRelawan) then
        → error "Relawan tidak terdaftar atau belum diterima pada program ini"
    if not validasiWaktuPelaksanaan(idProgram, now()) then
        → error "Check-in hanya dapat dilakukan selama waktu pelaksanaan program"
    sudahHadir ← Kehadiran.untukProgram(idRelawan, idProgram)
    if sudahHadir ≠ null then
        → error "Kehadiran sudah tercatat sebelumnya"
    kehadiran ← new Kehadiran(idRelawan, idProgram, now())
    DB_SERVICE.saveKehadiran(kehadiran)
    → kehadiran
```

### 5.20.4 Algoritma/Query

**Nama Kelas :** PresensiController
**Nama Operasi :** perbaruiPortofolioRelawan(idProgram)
**ID Algoritma :** (Algo-C20-04)

```text
Procedure perbaruiPortofolioRelawan(idProgram)
    program ← DB_SERVICE.findProgramByID(idProgram)
    daftarRelawan ← program.daftarRelawanDiterima()
    For each relawan in daftarRelawan
        if relawan.hadirPada(program) then
            relawan.catatKontribusi(program)
```

### 5.20.5 Algoritma/Query

**Nama Kelas :** PresensiController
**Nama Operasi :** ambilKeteranganWaktu(idProgram)
**ID Algoritma :** (Algo-C20-05)

```text
Function ambilKeteranganWaktu(idProgram)
    program ← DB_SERVICE.findProgramByID(idProgram)
    → program.keteranganWaktu()
```

### 5.20.6 Algoritma/Query

**Nama Kelas :** PresensiController
**Nama Operasi :** ambilTotalJamAksi(idRelawan)
**ID Algoritma :** (Algo-C20-06)

```text
Function ambilTotalJamAksi(idRelawan)
    relawan ← DB_SERVICE.findRelawanByID(idRelawan)
    riwayat ← relawan.lihatPortofolio()
    → riwayat.getTotalJamAksi()
```

### 5.20.7 Algoritma/Query

**Nama Kelas :** PresensiController
**Nama Operasi :** ambilRiwayatProgram(idRelawan)
**ID Algoritma :** (Algo-C20-07)

```text
Function ambilRiwayatProgram(idRelawan)
    relawan ← DB_SERVICE.findRelawanByID(idRelawan)
    riwayat ← relawan.lihatPortofolio()
    → riwayat.getDaftarProgramSelesai()
```

Tabel 5.20.3. Query Kelas PresensiController

| No Query | Query | Keterangan |
|:---|:---|:---|
| Q-C20-01 | INSERT INTO tbl_kehadiran (idKehadiran, idRelawan, idProgram, waktuCheckIn) VALUES (@idKehadiran, @idRelawan, @idProgram, CURRENT_TIMESTAMP) | Mencatat kehadiran Relawan pada program saat check-in berhasil. |

Catatan: operasi lain pada kelas ini (validasiStatusRelawan, validasiWaktuPelaksanaan, perbaruiPortofolioRelawan, ambilKeteranganWaktu, ambilTotalJamAksi, ambilRiwayatProgram) hanya membaca entitas melalui ID atau mendelegasikan logikanya ke operasi Program/Relawan/RiwayatKontribusi yang telah memiliki query sendiri (Tabel 5.1.3, 5.3.3, 5.11), sehingga tidak menambahkan query baru.


## 5.21 Kelas CloudStorageAdapter
**Nama Kelas:** CloudStorageAdapter
**ID Kelas:** C21 (*adapter*)

Tabel 5.21.1. Operasi Kelas CloudStorageAdapter

| Nama Operasi | Visibility | Keterangan |
|:---|:---|:---|
| validasiBerkas(berkas: File): Boolean | public | Memeriksa ukuran (maksimal 2 MB, KNF03) dan tipe berkas sebelum diunggah. |
| unggahBerkas(berkas: File): String | public | Mengunggah berkas ke layanan Cloud Storage eksternal dan mengembalikan URL-nya. |
| ambilBerkas(url: String): File | public | Mengambil berkas dari layanan Cloud Storage eksternal berdasarkan URL. |

Tabel 5.21.2. Atribut Kelas CloudStorageAdapter

Kelas CloudStorageAdapter tidak memiliki atribut (-).

### 5.21.1 Algoritma/Query

**Nama Kelas :** CloudStorageAdapter
**Nama Operasi :** validasiBerkas(berkas)
**ID Algoritma :** (Algo-C21-01)

```text
Function validasiBerkas(berkas)
    if berkas = null then
        → false
    if berkas.ukuran > 2_MB then
        → false
    if berkas.tipe not in {PDF, JPG, PNG} then
        → false
    → true
```

### 5.21.2 Algoritma/Query

**Nama Kelas :** CloudStorageAdapter
**Nama Operasi :** unggahBerkas(berkas)
**ID Algoritma :** (Algo-C21-02)

```text
Function unggahBerkas(berkas)
    if not validasiBerkas(berkas) then
        → error "Berkas tidak valid"
    url ← CLOUD_STORAGE_API.put(berkas)
    → url
```

### 5.21.3 Algoritma/Query

**Nama Kelas :** CloudStorageAdapter
**Nama Operasi :** ambilBerkas(url)
**ID Algoritma :** (Algo-C21-03)

```text
Function ambilBerkas(url)
    berkas ← CLOUD_STORAGE_API.get(url)
    if berkas = null then
        → error "Berkas tidak ditemukan"
    → berkas
```

Kelas CloudStorageAdapter merupakan kelas integrasi eksternal (adapter) yang memanggil layanan Cloud Storage pihak ketiga melalui CLOUD_STORAGE_API, bukan basis data RekanBumi, sehingga tidak memiliki query SQL.


## 5.22 Kelas BetterAuth
**Nama Kelas:** BetterAuth
**ID Kelas:** C22 (*library*)

Tabel 5.22.1. Operasi Kelas BetterAuth

| Nama Operasi | Visibility | Keterangan |
|:---|:---|:---|
| daftarkanKredensial(email: String, kataSandi: String): String | public | Mendaftarkan kredensial baru (hashing kata sandi) dan mengembalikan idPengguna. |
| hashKataSandi(kataSandi: String): String | private | Melakukan hashing kata sandi menggunakan algoritma bcrypt (KNF02). |
| verifikasiKredensial(email: String, kataSandi: String): String | public | Memverifikasi kredensial saat login dan mengembalikan idPengguna bila cocok. |
| cocokkanHash(kataSandi: String, hashKataSandi: String): Boolean | private | Mencocokkan kata sandi masukan dengan hash yang tersimpan. |
| buatSesiMasuk(idPengguna: String): String | public | Membuat token sesi baru untuk pengguna yang berhasil masuk. |
| ambilSesi(): String | public | Mengambil idPengguna dari sesi aktif saat ini (berdasarkan token pada permintaan). |

Tabel 5.22.2. Atribut Kelas BetterAuth

Kelas BetterAuth tidak memiliki atribut (-).

### 5.22.1 Algoritma/Query

**Nama Kelas :** BetterAuth
**Nama Operasi :** daftarkanKredensial(email, kataSandi)
**ID Algoritma :** (Algo-C22-01)

```text
Function daftarkanKredensial(email, kataSandi)
    hash ← hashKataSandi(kataSandi)
    idPengguna ← generateID()
    DB_SERVICE.saveKredensial(idPengguna, email, hash)
    → idPengguna
```

### 5.22.2 Algoritma/Query

**Nama Kelas :** BetterAuth
**Nama Operasi :** hashKataSandi(kataSandi)
**ID Algoritma :** (Algo-C22-02)

```text
Function hashKataSandi(kataSandi)
    → bcrypt.hash(kataSandi)
```

### 5.22.3 Algoritma/Query

**Nama Kelas :** BetterAuth
**Nama Operasi :** verifikasiKredensial(email, kataSandi)
**ID Algoritma :** (Algo-C22-03)

```text
Function verifikasiKredensial(email, kataSandi)
    kredensial ← DB_SERVICE.findKredensialByEmail(email)
    if kredensial = null then
        → null
    if not cocokkanHash(kataSandi, kredensial.hashKataSandi) then
        → null
    → kredensial.idPengguna
```

### 5.22.4 Algoritma/Query

**Nama Kelas :** BetterAuth
**Nama Operasi :** cocokkanHash(kataSandi, hashKataSandi)
**ID Algoritma :** (Algo-C22-04)

```text
Function cocokkanHash(kataSandi, hashKataSandi)
    → bcrypt.compare(kataSandi, hashKataSandi)
```

### 5.22.5 Algoritma/Query

**Nama Kelas :** BetterAuth
**Nama Operasi :** buatSesiMasuk(idPengguna)
**ID Algoritma :** (Algo-C22-05)

```text
Function buatSesiMasuk(idPengguna)
    token ← generateToken()
    DB_SERVICE.saveSesi(token, idPengguna, CURRENT_TIMESTAMP)
    → token
```

### 5.22.6 Algoritma/Query

**Nama Kelas :** BetterAuth
**Nama Operasi :** ambilSesi()
**ID Algoritma :** (Algo-C22-06)

```text
Function ambilSesi()
    token ← ambil token dari cookie permintaan saat ini
    sesi ← DB_SERVICE.findSesiByToken(token)
    if sesi = null or sesi kedaluwarsa then
        → null
    → sesi.idPengguna
```

Tabel 5.22.3. Query Kelas BetterAuth

| No Query | Query | Keterangan |
|:---|:---|:---|
| Q-C22-01 | INSERT INTO tbl_kredensial (idPengguna, email, hashKataSandi) VALUES (@idPengguna, @email, @hash) | Menyimpan kredensial akun baru (kata sandi dalam bentuk hash, KNF02). |
| Q-C22-02 | SELECT * FROM tbl_kredensial WHERE email = @email | Mengambil kredensial tersimpan untuk diverifikasi saat login. |
| Q-C22-03 | INSERT INTO tbl_sesi (token, idPengguna, waktuMulai) VALUES (@token, @idPengguna, CURRENT_TIMESTAMP) | Menyimpan sesi baru setelah pengguna berhasil masuk. |
| Q-C22-04 | SELECT * FROM tbl_sesi WHERE token = @token | Mengambil sesi aktif berdasarkan token pada permintaan. |


---

# BAB 6: Perancangan Antarmuka

## 6.1 Rancangan Antarmuka [ID Layar 1]

Masukkan versi awal prototipe antarmuka, dimana untuk setiap antarmuka/layar, tuliskan spesifikasi rinci objek yang ditampilkan dan reaksi sistem terhadap interaksi pengguna.

**Antarmuka:** *[ID layar]*  
**Nama Layar:** *[Nama layar]*

<p align="center">
<img alt="Contoh Logical View pada P/L E-Commerce" src="./assets/diagram/contoh-design.png" width="50%">
</p>
<p align="center">
<i>Gambar 6.1. Rancangan Antarmuka [ID Layar] - [Nama Layar]</i>
</p>

Tabel 6.1. Spesifikasi Objek Antarmuka [ID Layar]

| Id_Objek | Jenis | Konten | Keterangan |
| :--- | :--- | :--- | :--- |
| *[ID objek]* | *[Jenis objek, misalnya Button, RTF Box, dll]* | *[String yang tampil pada layar]* | *[Reaksi sistem, layar tujuan, tautan, atau ID algoritma yang dijalankan]* |
| *[ID objek]* | *[Jenis objek]* | *[Konten yang ditampilkan]* | *[Reaksi sistem atau nama file terkait beserta deskripsi ringkasnya]* |
| *...* | *...* | *...* | *...* |


## 6.X Rancangan Antarmuka [ID Layar X]

*[Ulangi pola 6.1 untuk layar berikutnya sampai semua layar teridentifikasi]*

## 6.Y Rancangan Antarmuka Keseluruhan

Tuliskan daftar gambar seluruh antarmuka. Berikan ID unik untuk setiap tampilan dan gunakan ID yang sama pada subbab perancangan antarmuka masing-masing.

Tabel 6.Y. Rancangan Antarmuka Keseluruhan

| No | Tampilan Antarmuka |
| :--- | :--- |
| *[I-01]* | <img src="./assets/diagram/contoh-design.png" alt="Contoh Desain" width="400"> |
| *[I-02]* | *[Sisipkan gambar antarmuka I-02]* |
| *[I-XX]* | *[Sisipkan gambar antarmuka berikutnya]* |

<br>

---

# BAB 7: Matriks Kerunutan

Matriks kerunutan berikut memetakan setiap kelas perancangan pada BAB 4 terhadap *use case* yang direalisasikannya. Suatu kelas dinyatakan terkait dengan suatu *use case* apabila objek kelas tersebut terlibat pada *sequence diagram* skenario normal atau alternatif *use case* tersebut. Pemetaan ini merupakan pembaruan dari BAB 6 *Traceability* pada SKPL (revisi D) yang disesuaikan dengan realisasi *use case* pada tahap perancangan.

Tabel 5.1. Matriks Kerunutan Kelas terhadap Use Case

| Kelas | Use Case Terkait |
| :--- | :--- |
| C01 - Program | UC01 - Daftar program; UC03 - Mencari program; UC04 - Mengunjungi situs program; UC05 - Menyeleksi calon relawan pendaftar; UC06 - Konfirmasi status pendaftaran; UC07 - Memperbarui status program; UC08 - Konfirmasi kehadiran program; UC09 - Memperbarui status akun relawan |
| C02 - Pendaftaran | UC01 - Daftar program; UC05 - Menyeleksi calon relawan pendaftar; UC06 - Konfirmasi status pendaftaran; UC08 - Konfirmasi kehadiran program; UC09 - Memperbarui status akun relawan |
| C03 - Relawan | UC01 - Daftar program; UC06 - Konfirmasi status pendaftaran; UC09 - Memperbarui status akun relawan |
| C04 - Pengguna | UC01 - Daftar program; UC06 - Konfirmasi status pendaftaran |
| C05 - InisiatorProgram | UC01 - Daftar program; UC04 - Mengunjungi situs program |
| C06 - Verifikator | UC07 - Memperbarui status program |
| C07 - DokumenVerifikasi | UC01 - Daftar program |
| C08 - Kehadiran | UC08 - Konfirmasi kehadiran program; UC09 - Memperbarui status akun relawan |
| C09 - LaporanProgram | UC07 - Memperbarui status program |
| C10 - Notifikasi | UC06 - Konfirmasi status pendaftaran; UC07 - Memperbarui status program |
| C11 - RiwayatKontribusi | UC09 - Memperbarui status akun relawan |
| C12 - KelolaAkunPage | UC01 - Daftar program; UC02 - Login akun; UC06 - Konfirmasi status pendaftaran |
| C13 - AuthController | UC01 - Daftar program; UC02 - Login akun; UC06 - Konfirmasi status pendaftaran |
| C14 - KelolaProgramPage | UC01 - Daftar program; UC07 - Memperbarui status program; UC09 - Memperbarui status akun relawan |
| C15 - ProgramController | UC01 - Daftar program; UC03 - Mencari program; UC04 - Mengunjungi situs program; UC07 - Memperbarui status program; UC09 - Memperbarui status akun relawan |
| C16 - EksplorasiProgramPage | UC01 - Daftar program; UC02 - Login akun; UC03 - Mencari program; UC04 - Mengunjungi situs program |
| C17 - KelolaPendaftarPage | UC05 - Menyeleksi calon relawan pendaftar; UC06 - Konfirmasi status pendaftaran |
| C18 - SeleksiController | UC01 - Daftar program; UC05 - Menyeleksi calon relawan pendaftar; UC06 - Konfirmasi status pendaftaran |
| C19 - AreaKegiatanPage | UC08 - Konfirmasi kehadiran program; UC09 - Memperbarui status akun relawan |
| C20 - PresensiController | UC07 - Memperbarui status program; UC08 - Konfirmasi kehadiran program; UC09 - Memperbarui status akun relawan |
| C21 - CloudStorageAdapter | UC01 - Daftar program; UC07 - Memperbarui status program |
| C22 - BetterAuth | UC01 - Daftar program; UC02 - Login akun |
