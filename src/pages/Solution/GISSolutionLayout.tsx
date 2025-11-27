// src/pages/Solution/GISSolutionLayout.tsx
import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SubLayout from '@/components/layout/SubLayout';

const GISSolutionLayout: React.FC = () => {
	const { pathname } = useLocation();
	const { t } = useTranslation();

	const segments = pathname.split('/').filter(Boolean);
	const detail = segments[2]; // igis, forest, fms

	const titleMap: Record<string, string> = {
		igis: t('layout.solutionGis.title.igis'),
		forest: t('layout.solutionGis.title.forest'),
		fms: t('layout.solutionGis.title.fms'),
	};

	const title = detail ? titleMap[detail] || t('layout.solutionGis.title.default') : t('layout.solutionGis.title.default');

	const groups = [
		{
			groupLabel: t('layout.solutionGis.locationLabel'),
			items: [
				{ to: 'igis', label: t('layout.solutionGis.tabs.igis') },
				{ to: 'forest', label: t('layout.solutionGis.tabs.forest') },
				{ to: 'fms', label: t('layout.solutionGis.tabs.fms') },
			],
		},
	];

	if (!detail) return <Navigate to="igis" replace />;

	return (
		<SubLayout category="Solution" locationLabel={t('layout.solutionGis.locationLabel')} title={title} groups={groups} bgImage="/assets/images/sub_03.png">
			<Outlet />
		</SubLayout>
	);
};

export default GISSolutionLayout;
