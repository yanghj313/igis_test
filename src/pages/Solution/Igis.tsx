import React from 'react';
import { useTranslation } from 'react-i18next';

const Igis = () => {
	const { t } = useTranslation();
	return <div>{t('igis')} 페이지입니다.</div>;
};

export default Igis;
