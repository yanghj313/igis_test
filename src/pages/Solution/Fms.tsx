import React from 'react';
import { useTranslation } from 'react-i18next';

const Fms = () => {
	const { t } = useTranslation();
	return <div>{t('fms')} 페이지입니다.</div>;
};

export default Fms;
