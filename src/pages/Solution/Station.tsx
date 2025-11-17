import React from 'react';
import { useTranslation } from 'react-i18next';

const Station = () => {
	const { t } = useTranslation();
	return <div>{t('station')} 페이지입니다.</div>;
};

export default Station;
