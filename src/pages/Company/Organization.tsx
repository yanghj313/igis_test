import React from 'react';
import { useTranslation } from 'react-i18next';

const Organization = () => {
	const { t } = useTranslation();
	return <div>{t('organization')} 페이지입니다.</div>;
};

export default Organization;
