import { WebItem } from '../types';

/**
 * =======================================================================
 * 📌 TEMPAT GIVZZ MEMASUKKAN / MENAMBAH DAFTAR WEBSITE
 * =======================================================================
 * Lu bisa tambahin web baru sesuka hati di array di bawah ini!
 * Cukup copy salah satu objek lalu ganti:
 *  - id: id unik (misal: 'web-7')
 *  - title: nama website lo
 *  - description: penjelasan singkat web
 *  - url: link website lo (bisa https://... atau link lokal)
 *  - category: 'AI & Tools' | 'Game & Fun' | 'E-Commerce' | 'Portfolio' | 'Utilities'
 *  - image: link gambar preview / screenshot web
 *  - badge: teks badge kecil (contoh: 'Hot 🔥', 'New ✨', 'Official')
 * =======================================================================
 */
export const INITIAL_WEBSITES: WebItem[] = [
  {
    id: 'web-1',
    title: 'Givzz AI Studio Suite',
    description: 'Platform AI all-in-one untuk generate teks, coding assist, editing gambar, dan asisten riset cerdas buatan Givzz.',
    url: 'https://gemini.google.com',
    category: 'AI & Tools',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    badge: 'Popular 🔥',
    featured: true,
    clicks: 1420,
    addedDate: '2026-01-10',
  },
  {
    id: 'web-2',
    title: 'Gstore Marketplace',
    description: 'Pusat top-up game murah, voucher streaming, lisensi software resmi dan item digital instan dengan pembayaran Gpay.',
    url: 'https://store.steampowered.com',
    category: 'E-Commerce',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    badge: 'Official Store 💎',
    featured: true,
    clicks: 2890,
    addedDate: '2026-02-01',
  },
  {
    id: 'web-3',
    title: 'Givzz Cyber Arena Games',
    description: 'Portal browser games interaktif 2D/3D buatan Givzz, mainkan game arcade seru langsung tanpa perlu install aplikasi.',
    url: 'https://poki.com',
    category: 'Game & Fun',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&auto=format&fit=crop&q=80',
    badge: 'Seru Banget 🎮',
    featured: true,
    clicks: 980,
    addedDate: '2026-02-15',
  },
  {
    id: 'web-4',
    title: 'Givzz Dev Portfolio & Labs',
    description: 'Showcase portofolio karya kreatif, showcase animasi UI/UX interaktif, dan dokumentasi proyek open-source Givzz.',
    url: 'https://github.com',
    category: 'Portfolio',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
    badge: 'Karya Givzz 🚀',
    featured: true,
    clicks: 3410,
    addedDate: '2026-01-05',
  },
  {
    id: 'web-5',
    title: 'Givzz Cloud Utilities & Converter',
    description: 'Kumpulan alat praktis: PDF merger, image compressor, format converter, QR code generator, dan enkripsi data aman.',
    url: 'https://unsplash.com',
    category: 'Utilities',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    badge: 'Utility Kit ⚡',
    featured: false,
    clicks: 760,
    addedDate: '2026-03-01',
  },
  {
    id: 'web-6',
    title: 'Givzz Beat Stream & Radio',
    description: 'Pemutar musik lo-fi hip hop, synthwave, dan live ambient beats untuk teman fokus coding dan santai setiap hari.',
    url: 'https://soundcloud.com',
    category: 'Game & Fun',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
    badge: 'Audio Chill 🎧',
    featured: false,
    clicks: 1120,
    addedDate: '2026-03-12',
  },
];
