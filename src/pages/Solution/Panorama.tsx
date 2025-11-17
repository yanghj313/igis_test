import React from 'react';
import { useTranslation } from 'react-i18next';

const Panorama = () => {
	const { t } = useTranslation();
	return <div>{t('panorama')} 페이지입니다.</div>;
};

export default Panorama;
