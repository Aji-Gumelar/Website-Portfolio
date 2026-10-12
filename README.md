# Personal Portfolio

Website portofolio personal dengan HTML, CSS, dan JavaScript murni. Desain dark creative memakai aksen biru-ungu, animasi scroll reveal, menu mobile, indikator progress, active navigation, dan modal pratinjau sertifikat.

## Menjalankan website

1. Ekstrak ZIP ini.
2. Buka folder `portfolio` di VS Code.
3. Jalankan `index.html` menggunakan ekstensi **Live Server**. Alternatifnya, buka `index.html` langsung di browser.
4. Koneksi internet diperlukan untuk Google Fonts dan Font Awesome CDN. Layout dasar tetap tersedia jika CDN tidak dapat diakses.

## Personalisasi sebelum dipublikasikan

Cari dan ganti placeholder berikut di `index.html`:

- `Nama Kamu` dan monogram `N`
- `YOUR_USERNAME` dengan username Instagram
- `YOUR_PHONE_NUMBER` dengan nomor WhatsApp internasional tanpa `+`, spasi, atau tanda baca. Contoh format: `6281234567890`
- `YOUR_EMAIL@example.com` dengan email aktif
- Deskripsi About Me, daftar kemampuan, nama sertifikat, penyelenggara, dan tahun

### Foto profil

Saat ini bagian visual profil dibuat dengan CSS dan monogram supaya tampil baik tanpa aset tambahan. Untuk menggunakan foto sendiri, tambahkan foto ke `assets/images/`, lalu ganti elemen `.avatar-placeholder` di `index.html` dengan elemen `<img>` dan atur `object-fit: cover` di `css/style.css`.

### Sertifikat

Dua kartu sertifikat saat ini adalah visual contoh, bukan kredensial asli. Ganti tombol `.certificate-preview` di `index.html` dengan gambar sertifikat milikmu. Untuk preview gambar asli, kamu bisa mengubah isi modal di akhir `index.html` dan logika terkait di `js/script.js`.

### Warna dan tipografi

Variabel warna berada di bagian `:root` pada `css/style.css`. Font utama menggunakan DM Sans dan Space Grotesk dari Google Fonts.

## Fitur yang tersedia

- Responsive layout untuk desktop, tablet, dan ponsel
- Sticky navigation dengan efek blur saat scroll
- Mobile menu dengan state aksesibel
- Scroll progress bar dan active navigation
- Reveal animation berbasis IntersectionObserver
- Kartu sertifikat dengan modal preview
- Custom cursor berbentuk lingkaran dengan efek flashlight yang menyorot grid pada background (desktop dengan mouse)
- Tahun copyright otomatis
- Dukungan `prefers-reduced-motion`

## Efek cursor
Pada perangkat desktop dengan mouse, kursor berubah menjadi lingkaran yang mengikuti pointer. Cahaya biru-ungu menampilkan pola grid kotak-kotak di area sekitar pointer. Efek otomatis dinonaktifkan pada perangkat layar sentuh dan saat `prefers-reduced-motion` aktif.

## Catatan

Tautan Instagram, WhatsApp, dan email memakai placeholder dan perlu diganti. Form kontak belum dibuat karena tautan langsung adalah opsi paling sederhana untuk starter portfolio ini. Jangan menambahkan klaim sertifikat atau pencapaian yang tidak benar.
