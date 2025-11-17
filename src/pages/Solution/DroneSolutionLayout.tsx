// src/pages/Solution/DroneSolutionLayout.tsx
import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import SubLayout from '@/components/layout/SubLayout';

const DroneSolutionLayout: React.FC = () => {
	const { pathname } = useLocation();

	// ex) /solution/drone/station → ["solution", "drone", "station"]
	const segments = pathname.split('/').filter(Boolean);

	// 세 번째 값이 상세 메뉴
	const detail = segments[2]; // station, panorama, pilot, ims, viewer, stream

	const titleMap: Record<string, string> = {
		station: 'DFOS STATION',
		panorama: 'PANORAMA',
		pilot: 'DFOS PILOT PRO',
		ims: 'DFOS IMS',
		viewer: 'DFOS Viewer',
		stream: 'DFOS Streaming Viewer',
	};

	const title = titleMap[detail] || 'DRONE SOLUTION';

	// 드론 솔루션 탭 메뉴 그룹
	const groups = [
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
	];

	// /solution/drone → /solution/drone/station 기본 이동
	if (!detail) return <Navigate to="station" replace />;

	return (
		<SubLayout category="Solution" locationLabel="드론 솔루션" title={title} groups={groups} bgImage="/assets/images/sub_03.png">
			<Outlet />
		</SubLayout>
	);
};

export default DroneSolutionLayout;
