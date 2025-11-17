import React from 'react';
import { useTranslation } from 'react-i18next';

const Stream = () => {
	const { t } = useTranslation();
	return <div>{t('stream')} 페이지입니다.</div>;
};

export default Stream;
