#TikTok Airdrop Referral Bot - SOUIY

Bot otomatis untuk mengklaim airdrop referral TikTok dengan fitur proxy support dan manajemen multi-akun.

---

## 📌 Fitur Utama
	✅ Multi-akun support (round-robin)

	✅ Proxy support (HTTP/HTTPS/SOCKS5)

	✅ Auto claim daily check-in

	✅ Auto verifikasi semua task

	✅ Sistem retry otomatis

	✅ Logging detail

	✅ Countdown timer untuk siklus berikutnya

	✅ Tampilan user-friendly dengan animasi

---

## 🛠️ Prasyarat
Node.js v18 atau lebih baru

NPM/Yarn

File .env berisi private keys

File proxy.txt (opsional)

---

## 📥 Instalasi

> 1. Clone repository ini:
```
git clone https://github.com/Souiy/ShiftAutoBot-SOUIY
cd ShiftAutoBot-SOUIY

```
> 2. Install dependencies:
```
npm install
# atau
yarn install
```
> 3. Buat file .env dan masukkan private key wallet Anda (satu key per baris):
```
nano .env
```
PRIVATE_KEY_1=0x...
PRIVATE_KEY_2=0x...

> 4. (Opsional) Buat file proxy.txt dan masukkan proxy Anda (satu proxy per baris):
```
nano text.txt
```
http://user:pass@ip:port
socks5://user:pass@ip:port

---

## 🚀 Cara Menjalankan
```
node index.js
```
## ⚙️ Konfigurasi
Bot akan menanyakan apakah ingin menggunakan proxy saat pertama kali dijalankan. Anda bisa memilih:

Y untuk menggunakan proxy (akan mengambil dari proxy.txt)

N untuk menjalankan tanpa proxy

---

## 🔄 Siklus Kerja
Bot akan:

	Login ke semua akun secara bergantian

	Melakukan daily check-in

	Memverifikasi semua task yang belum diklaim

	Menampilkan statistik akun

	Menunggu 24 jam sebelum memulai siklus berikutnya

---

## 📊 Output Contoh

```

                    ███████╗  ██████╗  ██╗   ██╗ ██╗ ██╗   ██╗
                    ██╔════╝ ██╔═══██╗ ██║   ██║ ██║ ╚██╗ ██╔╝
                    ███████╗ ██║   ██║ ██║   ██║ ██║  ╚████╔╝
                    ╚════██║ ██║   ██║ ██║   ██║ ██║   ╚██╔╝
                    ███████║ ╚██████╔╝ ╚██████╔╝ ██║    ██║
                    ╚══════╝  ╚═════╝   ╚═════╝  ╚═╝    ╚═╝

=== TIKTOK 🚀 : AirdropRefferal (@souiy1) ===
=== Satukan Solidaritas Bantu Palestina... ===

Memproses akun: 0x1a3b5...7c9d

===========================================================================
                         USER INFORMATION - 0x12345...78910
============================================================================
Name          : User123
Address       : 0x12345...78910
XP            : 1500
Daily Checkin : Check-in Berhasil
Proxy         : http://user:pass@123.123.123.123:8080
============================================================================

----------------------------- Claimed Tasks ----------------------------

[VERIFIED] Task: Follow Twitter => Sudah Claimed
[VERIFIED] Task: Join Telegram => Sudah Claimed

---------------------------- Unclaimed Tasks ---------------------------

[VERIFIED] Task: Tweet About Us => Claimed
[UNVERIFIED] Task: Join Discord (Error: Already completed)

================================================================================

```
## ❓ Troubleshooting
	Error "Gagal membaca file .env":

	Pastikan file .env ada di direktori yang sama

	Pastikan format private key benar (0x...)

	Error login:

	Pastikan private key valid

	Pastikan koneksi internet stabil

	Jika menggunakan proxy, pastikan proxy berfungsi

	Error 429 (Too Many Requests):

	Bot akan otomatis retry setelah delay

	Pertimbangkan untuk mengurangi jumlah akun atau menambah delay

---

## 📝 Catatan
Bot ini dibuat untuk tujuan edukasi

Gunakan dengan risiko sendiri

Sesuaikan delay sesuai kebutuhan untuk menghindari rate limiting

## ✨ Donasi
> Jika bot ini membantu, pertimbangkan untuk berdonasi ke:

link :  https://digital.dompetdhuafa.org/donasi/
jagapalestina?gad_source=1&gad_campaignid=19753975814&gbraid=0AAAAADAhM1vRaR8mSk
tNHoNTW0ZytKlxb&gclid=Cj0KCQjwucDBBhDxARIsANqFdr2JxZgjGKTdpImD7icmr6UG3c6XnjjAKe
83JIZeCR3MtFc64nHIscwaAg0UEALw_wcB

Atau melalui link donasi Palestina yang tertera di banner

---

📜 License