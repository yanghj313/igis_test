import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
	const { t } = useTranslation();
	return <div>{t('about')} 페이지입니다.</div>;
};

export default About;
