import React from 'react';
import { useTranslation } from 'react-i18next';

const Ims = () => {
	const { t } = useTranslation();
	return <div>{t('ims')} 페이지입니다.</div>;
};

export default Ims;
