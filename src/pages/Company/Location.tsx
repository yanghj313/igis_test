import React from 'react';
import { useTranslation } from 'react-i18next';

const Location = () => {
	const { t } = useTranslation();
	return <div>{t('location')} 페이지입니다.</div>;
};

export default Location;
