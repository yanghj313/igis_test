import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import SubLayout from '../../components/layout/SubLayout';

const CompanyAwardLayout = () => {
	const { pathname } = useLocation();
	const current = pathname.split('/')[3] || 'certificate';

	const titleMap: Record<string, string> = {
		certificate: 'CERTIFICATE',
		patent: 'PATENT',
	};

	const groups = [
		{
			groupLabel: '인증 및 수상',
			items: [
				{ to: 'certificate', label: '인증서' },
				{ to: 'patent', label: '특허 및 상표' },
			],
		},
	];

	if (!current) {
		return <Navigate to="certificate" replace />;
	}

	return (
		<SubLayout category="Company" locationLabel="인증 및 수상" title={titleMap[current]} groups={groups} bgImage="/assets/images/sub_01.png">
			<Outlet />
		</SubLayout>
	);
};

export default CompanyAwardLayout;
