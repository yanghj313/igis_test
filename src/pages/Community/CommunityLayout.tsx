// src/pages/Community/CommunityLayout.tsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SubLayout from '@/components/layout/SubLayout';

const CommunityLayout: React.FC = () => {
	const { pathname } = useLocation();
	const { t } = useTranslation();

	const segments = pathname.split('/').filter(Boolean);
	const detail = segments[1]; // contact, recruitment, news, video

	if (detail === 'news' || detail === 'video') {
		return <Outlet />;
	}

	const titleMap: Record<string, string> = {
		contact: t('layout.community.title.contact'),
		recruitment: t('layout.community.title.recruitment'),
	};

	const title = titleMap[detail!] || t('layout.community.title.default');

	const groups = [
		{
			groupLabel: t('layout.community.locationLabel'),
			items: [
				{ to: 'contact', label: t('layout.community.tabs.contact') },
				{ to: 'recruitment', label: t('layout.community.tabs.recruitment') },
			],
		},
	];

	const hideTabs = pathname.includes('/recruitment/detail');

	return (
		<SubLayout category="Community" locationLabel={t('layout.community.locationLabel')} title={title} groups={!hideTabs ? groups : []} bgImage="/assets/images/sub_04.png">
			<Outlet />
		</SubLayout>
	);
};

export default CommunityLayout;
