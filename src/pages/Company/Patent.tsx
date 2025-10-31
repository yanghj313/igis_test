import React from 'react';
import { useTranslation } from 'react-i18next';

const Patent = () => {
	const { t } = useTranslation();
	return <div>{t('patent')} 페이지입니다.</div>;
};

export default Patent;
