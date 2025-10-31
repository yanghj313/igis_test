import React from 'react';
import { useTranslation } from 'react-i18next';

const Certificate = () => {
	const { t } = useTranslation();
	return <div>{t('certificate')} 페이지입니다.</div>;
};

export default Certificate;
