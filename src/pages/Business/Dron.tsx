import React from 'react';
import { useTranslation } from 'react-i18next';

const Dron = () => {
	const { t } = useTranslation();
	return <div>{t('dron')} 페이지입니다.</div>;
};

export default Dron;
