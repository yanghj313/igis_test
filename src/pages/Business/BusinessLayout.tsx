import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const BusinessLayout = () => {
	const { t } = useTranslation();

	return (
		<div className="business-layout">
			<h2>{t('business')}</h2>
			<nav>
				<NavLink to="dron">{t('dron')}</NavLink> | <NavLink to="gis">{t('gis')}</NavLink> | <NavLink to="fms">{t('fms')}</NavLink> | <NavLink to="rnd">{t('rnd')}</NavLink>
			</nav>
			<hr />
			<Outlet />
		</div>
	);
};

export default BusinessLayout;
