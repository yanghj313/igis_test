import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 🇰🇷 한국어 리소스
import commonKor from './locales/kor/common.json';
import headerKor from './locales/kor/header.json';
import footerKor from './locales/kor/footer.json';
import translationKor from './locales/kor/translation.json';

// 🇺🇸 영어 리소스
import commonEn from './locales/en/common.json';
import headerEn from './locales/en/header.json';
import footerEn from './locales/en/footer.json';
import translationEn from './locales/en/translation.json';

i18n.use(initReactI18next).init({
	resources: {
		kor: {
			translation: {
				...translationKor,
				...commonKor,
				...headerKor,
				...footerKor,
			},
		},
		en: {
			translation: {
				...translationEn,
				...commonEn,
				...headerEn,
				...footerEn,
			},
		},
	},
	lng: 'kor', // 기본 언어
	fallbackLng: 'kor',
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
