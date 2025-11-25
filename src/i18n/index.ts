import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 실제 JSON 위치: src/locales/en/...
import enCommon from '../locales/en/common.json';
import enHeader from '../locales/en/header.json';
import enFooter from '../locales/en/footer.json';

// 실제 JSON 위치: src/locales/kor/...
import korCommon from '../locales/kor/common.json';
import korHeader from '../locales/kor/header.json';
import korFooter from '../locales/kor/footer.json';

const resources = {
	en: {
		common: enCommon,
		header: enHeader,
		footer: enFooter,
	},
	kor: {
		common: korCommon,
		header: korHeader,
		footer: korFooter,
	},
} as const;

i18n.use(initReactI18next).init({
	resources,
	lng: 'kor', // 기본 언어
	fallbackLng: 'kor',
	ns: ['common', 'header', 'footer'],
	defaultNS: 'common', // 기본 네임스페이스 = common
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
