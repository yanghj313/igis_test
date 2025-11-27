// src/pages/Business/BusinessLayout.tsx
import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SubLayout from '@/components/layout/SubLayout';

const BusinessLayout: React.FC = () => {
	const { pathname } = useLocation();
	const { t } = useTranslation();

	const segments = pathname.split('/').filter(Boolean);
	const detail = segments[1] || 'drone';

	const titleMap: Record<string, string> = {
		drone: t('layout.business.title.drone'),
		gis: t('layout.business.title.gis'),
		fms: t('layout.business.title.fms'),
		rnd: t('layout.business.title.rnd'),
	};

	const title = titleMap[detail] || t('layout.business.title.drone');

	const groups = [
		{
			groupLabel: t('layout.business.locationLabel'),
			items: [
				{ to: 'drone', label: t('layout.business.tabs.drone') },
				{ to: 'gis', label: t('layout.business.tabs.gis') },
				{ to: 'fms', label: t('layout.business.tabs.fms') },
				{ to: 'rnd', label: t('layout.business.tabs.rnd') },
			],
		},
	];

	if (!segments[1]) {
		return <Navigate to="drone" replace />;
	}

	return (
		<SubLayout category="Business" locationLabel={t('layout.business.locationLabel')} title={title} groups={groups} bgImage="/assets/images/sub_02.png">
			<Outlet />
		</SubLayout>
	);
};

export default BusinessLayout;
