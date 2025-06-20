# Gemini AI Chatbot

Ini adalah aplikasi web chatbot sederhana yang menggunakan Node.js untuk backend dan Vanilla JavaScript untuk frontend. Chatbot ini terintegrasi dengan Google Gemini AI untuk menghasilkan respons.

## Fitur

-   Antarmuka chat sederhana.
-   Backend Node.js dengan Express.js.
-   Integrasi dengan Gemini AI untuk respons cerdas.
-   Frontend Vanilla JavaScript.
-   Indikator "Gemini is thinking..." saat menunggu respons.
-   Tampilan pesan pengguna di kanan dan balasan AI di kiri.
-   Tema gelap.

## Prasyarat

-   [Node.js](https://nodejs.org/) (versi 18.0.0 atau lebih tinggi direkomendasikan, sesuai dengan SDK `@google/generative-ai`)
-   NPM (biasanya terinstal bersama Node.js)
-   Kunci API Google Gemini AI. Anda bisa mendapatkannya dari Google AI Studio.

## Instalasi

1.  **Clone repository (jika ini adalah proyek Git):**
    ```bash
    git clone <url-repository-anda>
    cd gemini-chatbot-api
    ```
    Jika Anda tidak menggunakan Git, cukup salin file proyek ke direktori lokal.

2.  **Instal dependensi:**
    Buka terminal di direktori root proyek (`c:\Users\Abay\Documents\gemini-chatbot-api`) dan jalankan:
    ```bash
    npm install
    ```

3.  **Konfigurasi Kunci API:**
    Buat file `.env` di direktori root proyek dan tambahkan kunci API Gemini Anda:
    ```env
    GEMINI_API_KEY=MASUKKAN_KUNCI_API_ANDA_DI_SINI
    ```
    Ganti `MASUKKAN_KUNCI_API_ANDA_DI_SINI` dengan kunci API Anda yang sebenarnya.

## Menjalankan Aplikasi

1.  **Mulai server backend:**
    Di terminal, dari direktori root proyek, jalankan:
    ```bash
    node index.js
    ```
    Server akan berjalan di `http://localhost:3000`.

2.  **Buka frontend:**
    Buka browser web Anda dan navigasikan ke `http://localhost:3000`. Anda akan melihat antarmuka chatbot.

## Struktur Proyek

-   `index.js`: File utama server backend.
-   `controllers/chatController.js`: Mengontrol logika permintaan chat.
-   `routes/chatRoutes.js`: Mendefinisikan rute API untuk chat.
-   `services/geminiService.js`: Berinteraksi dengan Gemini AI.
-   `public/`: Berisi file frontend (HTML, CSS, JavaScript).
-   `.env`: Menyimpan variabel lingkungan (kunci API).