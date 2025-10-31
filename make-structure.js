// make-structure.js
import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

const structure = {
	'src/components/SubNav.tsx': `
import React from 'react';
import { NavLink } from 'react-router-dom';
import './SubNav.css';

const SubNav = ({ items }) => (
  <nav className="sub-nav">
    {items.map((item, i) => (
      <NavLink key={i} to={item.link} className={({ isActive }) => (isActive ? 'active' : '')}>
        {item.label}
      </NavLink>
    ))}
  </nav>
);

export default SubNav;
`,

	'src/i18n/index.ts': `
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import kor from './locales/kor.json';

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, kor: { translation: kor } },
  lng: 'kor',
  fallbackLng: 'kor',
  interpolation: { escapeValue: false },
});

export default i18n;
`,

	'src/i18n/locales/kor.json': `{
    "lang_kor": "KOR",
    "lang_eng": "ENG",
    "submenu_company": ["기업소개", "인증 및 수상"],
    "submenu_business": ["드론", "GIS 시스템", "FMS", "R&D 및 융역"],
    "submenu_solution": ["드론 솔루션", "GIS 솔루션"],
    "submenu_community": ["문의", "채용", "뉴스", "홍보영상"]
  }`,

	'src/i18n/locales/en.json': `{
    "lang_kor": "KOR",
    "lang_eng": "ENG",
    "submenu_company": ["About Us", "Awards & Certificates"],
    "submenu_business": ["Drone", "GIS System", "FMS", "R&D and Operation"],
    "submenu_solution": ["Drone Solution", "GIS Solution"],
    "submenu_community": ["Contact", "Recruit", "News", "Media"]
  }`,
};

// === zip 파일 생성 ===
const output = fs.createWriteStream('src_structure_for_merge.zip');
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => console.log(`✅ 생성 완료: src_structure_for_merge.zip (${archive.pointer()} bytes)`));
archive.pipe(output);

// 폴더 및 파일 추가
Object.entries(structure).forEach(([filePath, content]) => {
	const dir = path.dirname(filePath);
	fs.mkdirSync(dir, { recursive: true });
	fs.writeFileSync(filePath, content.trim());
	archive.file(filePath, { name: filePath });
});

archive.finalize();
