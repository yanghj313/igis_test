// src/pages/Solution/DroneSolutionLayout.tsx
import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SubLayout from '@/components/layout/SubLayout';

const DroneSolutionLayout: React.FC = () => {
	const { pathname } = useLocation();
	const { t } = useTranslation();

	const segments = pathname.split('/').filter(Boolean);
	const detail = segments[2]; // station, panorama, ...

	const titleMap: Record<string, string> = {
		station: t('layout.solutionDrone.title.station'),
		stream: t('layout.solutionDrone.title.stream'),
		panorama: t('layout.solutionDrone.title.panorama'),
		pilot: t('layout.solutionDrone.title.pilot'),
		ims: t('layout.solutionDrone.title.ims'),
		viewer: t('layout.solutionDrone.title.viewer'),
	};

	const title = detail ? titleMap[detail] || t('layout.solutionDrone.title.default') : t('layout.solutionDrone.title.default');

	const groups = [
		{
			groupLabel: t('layout.solutionDrone.locationLabel'),
			items: [
				{ to: 'station', label: t('layout.solutionDrone.tabs.station') },
				{ to: 'stream', label: t('layout.solutionDrone.tabs.stream') },
				{ to: 'panorama', label: t('layout.solutionDrone.tabs.panorama') },
				{ to: 'pilot', label: t('layout.solutionDrone.tabs.pilot') },
				{ to: 'ims', label: t('layout.solutionDrone.tabs.ims') },
				{ to: 'viewer', label: t('layout.solutionDrone.tabs.viewer') },
			],
		},
	];

	if (!detail) return <Navigate to="station" replace />;

	return (
		<SubLayout category="Solution" locationLabel={t('layout.solutionDrone.locationLabel')} title={title} groups={groups} bgImage="/assets/images/sub_03.png" className="drone-solution-layout">
			<Outlet />
		</SubLayout>
	);
};

export default DroneSolutionLayout;
