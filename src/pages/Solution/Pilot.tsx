import React from 'react';
import { useTranslation } from 'react-i18next';

const Pilot = () => {
	const { t } = useTranslation();
	return <div>{t('pilot')} 페이지입니다.</div>;
};

export default Pilot;
