import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SolutionLayout = () => {
	const { t } = useTranslation();
	return (
		<div className="solution-layout">
			<h2>{t('solution')}</h2>
			<nav>
				<NavLink to="dron">{t('dron_solution')}</NavLink> | <NavLink to="gis">{t('gis_solution')}</NavLink>
			</nav>
			<hr />
			<Outlet />
		</div>
	);
};

export default SolutionLayout;
