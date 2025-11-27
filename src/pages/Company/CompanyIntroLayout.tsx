// src/pages/Company/CompanyIntroLayout.tsx
import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SubLayout from '@/components/layout/SubLayout';

const CompanyIntroLayout = () => {
	const { pathname } = useLocation();
	const { t } = useTranslation();

	const current = pathname.split('/')[3] || 'vision';

	const titleMap: Record<string, string> = {
		vision: t('layout.companyIntro.title.vision'),
		organization: t('layout.companyIntro.title.organization'),
		history: t('layout.companyIntro.title.history'),
		location: t('layout.companyIntro.title.location'),
	};

	const title = titleMap[current] || t('layout.companyIntro.title.vision');

	const groups = [
		{
			groupLabel: t('layout.companyIntro.locationLabel'),
			items: [
				{ to: 'vision', label: t('layout.companyIntro.tabs.vision') },
				{ to: 'organization', label: t('layout.companyIntro.tabs.organization') },
				{ to: 'history', label: t('layout.companyIntro.tabs.history') },
				{ to: 'location', label: t('layout.companyIntro.tabs.location') },
			],
		},
	];

	if (!current) {
		return <Navigate to="vision" replace />;
	}

	return (
		<SubLayout category="Company" locationLabel={t('layout.companyIntro.locationLabel')} title={title} groups={groups} bgImage="/assets/images/sub_01.png">
			<Outlet />
		</SubLayout>
	);
};

export default CompanyIntroLayout;
