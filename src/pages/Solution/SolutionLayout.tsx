// src/pages/Solution/SolutionLayout.tsx
import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import SubLayout from '@/components/layout/SubLayout';

const SolutionLayout: React.FC = () => {
	const { pathname } = useLocation();

	// /solution/drone/station → ['solution', 'drone', 'station']
	const segments = pathname.split('/').filter(Boolean);

	const category = segments[1] || 'drone'; // drone | gis
	const detail = segments[2] || '';

	// 🔵 대제목
	const titleMap: Record<string, string> = {
		drone: 'DRONE SOLUTION',
		gis: 'GIS SOLUTION',
	};

	// 🔵 좌측 메뉴 그룹
	const groups =
		category === 'drone'
			? [
					{
						groupLabel: '드론 솔루션',
						items: [
							{ to: 'station', label: 'DFOS STATION' },
							{ to: 'panorama', label: 'Panorama' },
							{ to: 'pilot', label: 'DFOS PILOT PRO' },
							{ to: 'ims', label: 'DFOS IMS' },
							{ to: 'viewer', label: 'DFOS Viewer' },
							{ to: 'stream', label: 'DFOS Streaming Viewer' },
						],
					},
			  ]
			: [
					{
						groupLabel: 'GIS 솔루션',
						items: [
							{ to: 'igis', label: 'IGIS' },
							{ to: 'forest', label: 'IGIS 산림 시스템' },
							{ to: 'fms', label: 'FMS' },
						],
					},
			  ];

	// 기본 경로 정리
	if (!detail) {
		return <Navigate to={category === 'drone' ? 'station' : 'igis'} replace />;
	}

	return (
		<SubLayout category="Solution" locationLabel={category === 'drone' ? '드론 솔루션' : 'GIS 솔루션'} title={titleMap[category]} groups={groups} bgImage="/assets/images/sub_03.png">
			<Outlet />
		</SubLayout>
	);
};

export default SolutionLayout;
