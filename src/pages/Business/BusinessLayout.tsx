// src/pages/Business/BusinessLayout.tsx
import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import SubLayout from '@/components/layout/SubLayout';

const BusinessLayout: React.FC = () => {
	const { pathname } = useLocation();
	const segments = pathname.split('/').filter(Boolean);

	// /business/drone → ["business", "drone"]
	const detail = segments[1] || 'drone';

	/** 대제목 (영문) */
	const titleMap: Record<string, string> = {
		drone: 'DRONE',
		gis: 'GIS SYSTEM',
		fms: 'FMS',
		rnd: 'R&D',
	};

	const title = titleMap[detail] || 'DRONE';

	/** 탭(소메뉴) 그룹 */
	const groups = [
		{
			groupLabel: '서비스',
			items: [
				{ to: 'drone', label: '드론' },
				{ to: 'gis', label: 'GIS 시스템' },
				{ to: 'fms', label: 'FMS' },
				{ to: 'rnd', label: 'R&D 및 용역' },
			],
		},
	];

	/** 기본 이동 → /business */
	if (!segments[1]) {
		return <Navigate to="drone" replace />;
	}

	return (
		<SubLayout
			category="Business" // 상단 카테고리
			locationLabel="서비스" // 브레드크럼 (한글)
			title={title} // 대제목 (영문)
			groups={groups} // 탭 그룹
			bgImage="/assets/images/sub_02.png"
		>
			<Outlet />
		</SubLayout>
	);
};

export default BusinessLayout;
