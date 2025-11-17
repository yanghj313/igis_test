// src/pages/Solution/GISSolutionLayout.tsx
import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import SubLayout from '@/components/layout/SubLayout';

const GISSolutionLayout: React.FC = () => {
	const { pathname } = useLocation();

	// ex) /solution/gis/igis → ["solution", "gis", "igis"]
	const segments = pathname.split('/').filter(Boolean);

	// 세 번째 값이 상세 메뉴
	const detail = segments[2]; // igis, forest, fms

	const titleMap: Record<string, string> = {
		igis: 'IGIS',
		forest: 'IGIS 산림 시스템',
		fms: 'FMS',
	};

	const title = titleMap[detail] || 'GIS SOLUTION';

	// GIS 탭 메뉴 그룹
	const groups = [
		{
			groupLabel: 'GIS 솔루션',
			items: [
				{ to: 'igis', label: 'IGIS' },
				{ to: 'forest', label: 'IGIS 산림 시스템' },
				{ to: 'fms', label: 'FMS' },
			],
		},
	];

	// /solution/gis → /solution/gis/igis 기본 이동
	if (!detail) return <Navigate to="igis" replace />;

	return (
		<SubLayout category="Solution" locationLabel="GIS 솔루션" title={title} groups={groups} bgImage="/assets/images/sub_03.png">
			<Outlet />
		</SubLayout>
	);
};

export default GISSolutionLayout;
