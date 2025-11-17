import React from 'react';
import { useTranslation } from 'react-i18next';

const Forest = () => {
	const { t } = useTranslation();
	return <div>{t('forest')} 페이지입니다.</div>;
};

export default Forest;
