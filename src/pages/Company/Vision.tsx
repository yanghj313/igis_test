import React from 'react';
import { useTranslation } from 'react-i18next';

const Vision = () => {
	const { t } = useTranslation();
	return <div>{t('vision')} 페이지입니다.</div>;
};

export default Vision;
