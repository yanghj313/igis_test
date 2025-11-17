import React from 'react';
import { useTranslation } from 'react-i18next';

const Drone = () => {
	const { t } = useTranslation();
	return <div>{t('drone')} 페이지입니다.</div>;
};

export default Drone;
