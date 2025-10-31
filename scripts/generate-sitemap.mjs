// scripts/generate-sitemap.mjs
import { writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// 환경변수로 베이스 도메인 주입 (없으면 기본값)
const BASE = process.env.SITE_BASE_URL || 'https://your-domain.com';

const routes = [
	'/',
	'/company/about',
	'/community/news',
	'/community/video',
	// TODO: 필요 라우트 추가
];

const urls = routes.map(p => `<url><loc>${BASE}${p}</loc></url>`).join('');
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

mkdirSync(`${__dirname}/../public`, { recursive: true });
writeFileSync(`${__dirname}/../public/sitemap.xml`, xml);
console.log('✓ sitemap.xml generated -> public/sitemap.xml');
