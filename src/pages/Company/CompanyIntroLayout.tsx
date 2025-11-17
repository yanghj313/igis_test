import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import SubLayout from '@/components/layout/SubLayout';

const CompanyIntroLayout = () => {
	const { pathname } = useLocation();
	const current = pathname.split('/')[3] || 'vision';

	const titleMap: Record<string, string> = {
		vision: 'VISION',
		organization: 'ORGANIZATION',
		history: 'HISTORY',
		location: 'LOCATION',
	};

	const groups = [
		{
			groupLabel: '기업소개',
			items: [
				{ to: 'vision', label: '비전' },
				{ to: 'organization', label: '조직도' },
				{ to: 'history', label: '연혁' },
				{ to: 'location', label: '오시는 길' },
			],
		},
	];

	if (!current) {
		return <Navigate to="vision" replace />;
	}

	return (
		<SubLayout category="Company" locationLabel="기업소개" title={titleMap[current]} groups={groups} bgImage="/assets/images/sub_01.png">
			<Outlet />
		</SubLayout>
	);
};

export default CompanyIntroLayout;
