import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CompanyLayout = () => {
	const { t } = useTranslation();

	return (
		<div className="company-layout">
			<h2>{t('company')}</h2>
			<nav>
				<NavLink to="about">{t('about')}</NavLink> | <NavLink to="vision">{t('vision')}</NavLink> | <NavLink to="organization">{t('organization')}</NavLink> |{' '}
				<NavLink to="history">{t('history')}</NavLink> | <NavLink to="location">{t('location')}</NavLink> | <NavLink to="award">{t('award')}</NavLink> |{' '}
				<NavLink to="certificate">{t('certificate')}</NavLink> | <NavLink to="patent">{t('patent')}</NavLink>
			</nav>
			<hr />
			<Outlet />
		</div>
	);
};

export default CompanyLayout;
