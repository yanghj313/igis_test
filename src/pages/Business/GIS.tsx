import React from 'react';
import { useTranslation } from 'react-i18next';

const GIS = () => {
	const { t } = useTranslation();
	return <div>{t('gis')} 페이지입니다.</div>;
};

export default GIS;
