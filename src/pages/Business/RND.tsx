import React from 'react';
import { useTranslation } from 'react-i18next';

const RND = () => {
	const { t } = useTranslation();
	return <div>{t('rnd')} 페이지입니다.</div>;
};

export default RND;
