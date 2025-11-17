import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import SubLayout from '../../components/layout/SubLayout';

const SolutionLayout = () => {
	const { pathname } = useLocation();
	const segments = pathname.split('/').filter(Boolean);

	const current = segments[1] || 'dron';

	// 대제목 매핑 (시안 기준)
	const titleMap: Record<string, string> = {
		dron: 'DFOS STATION',
		gis: 'GIS SOLUTION',
	};

	const title = titleMap[current] || 'DFOS STATION';

	// 탭 구성
	const tabs = [
		{ to: 'dron', label: '드론 솔루션' },
		{ to: 'gis', label: 'GIS 솔루션' },
	];

	// 기본 이동
	if (!segments[1]) {
		return <Navigate to="dron" replace />;
	}

	return <SubLayout category="Solution" subTitle="솔루션" title={title} tabs={tabs} bgImage="/assets/images/sub_03.png" />;
};

export default SolutionLayout;
