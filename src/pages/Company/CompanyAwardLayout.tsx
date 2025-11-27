// src/pages/Company/CompanyAwardLayout.tsx
import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SubLayout from '../../components/layout/SubLayout';

const CompanyAwardLayout = () => {
	const { pathname } = useLocation();
	const { t } = useTranslation();

	const current = pathname.split('/')[3] || 'certificate';

	const titleMap: Record<string, string> = {
		certificate: t('layout.companyAward.title.certificate'),
		patent: t('layout.companyAward.title.patent'),
	};

	const title = titleMap[current] || t('layout.companyAward.title.certificate');

	const groups = [
		{
			groupLabel: t('layout.companyAward.locationLabel'),
			items: [
				{ to: 'certificate', label: t('layout.companyAward.tabs.certificate') },
				{ to: 'patent', label: t('layout.companyAward.tabs.patent') },
			],
		},
	];

	if (!current) {
		return <Navigate to="certificate" replace />;
	}

	return (
		<SubLayout category="Company" locationLabel={t('layout.companyAward.locationLabel')} title={title} groups={groups} bgImage="/assets/images/sub_01.png">
			<Outlet />
		</SubLayout>
	);
};

export default CompanyAwardLayout;
