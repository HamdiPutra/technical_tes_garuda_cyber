Project ini menggunakan:
- Backend: Laravel
- Frontend: Next.js

Cara Menginstal dan Menjalankan:
1. Clone Repository project => git clone https://github.com/HamdiPutra/technical_tes_garuda_cyber.git
2. Buka terminal dan masuk ke folder laravel => cd laravel
   - Install dependency laravel => composer install
   - Setup environment laravel => cp .env.example .env
   - Generate application key => php artisan key:generate
   - Buat database baru di MySQL
   - Atur konfigurasi database di file .env
   - Jalankan Migrasi => php artisan migrate
   - Jalankan Laravel Server => php artisan serve
3. Buka terminal baru dan masuk ke folder nextjs : cd nextjs
   - Install dependency => npm install
   - Jalankan server nextjs : npm run dev
   - Buka website di : http://localhost:3000

