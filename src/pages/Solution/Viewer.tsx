import React from 'react';
import { useTranslation } from 'react-i18next';

const Viewer = () => {
	const { t } = useTranslation();
	return <div>{t('viewer')} 페이지입니다.</div>;
};

export default Viewer;
