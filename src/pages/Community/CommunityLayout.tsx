// src/pages/Community/CommunityLayout.tsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SubLayout from '@/components/layout/SubLayout';

const CommunityLayout: React.FC = () => {
	const { pathname } = useLocation();

	const segments = pathname.split('/').filter(Boolean);
	const detail = segments[1]; // contact, recruitment, news, video

	// 🟦 news, video는 여기서 SubLayout 안 씌움 → MediaTabsLayout에서 씌움
	if (detail === 'news' || detail === 'video') {
		return <Outlet />;
	}

	// -----------------------------------------
	// 기존 Community pages (contact, recruitment)
	// -----------------------------------------
	const titleMap: Record<string, string> = {
		contact: 'CONTACT',
		recruitment: 'RECRUIT',
	};

	const title = titleMap[detail] || 'COMMUNITY';

	const groups = [
		{
			groupLabel: '커뮤니티',
			items: [
				{ to: 'contact', label: '문의하기' },
				{ to: 'recruitment', label: '채용정보' },
			],
		},
	];

	const hideTabs = pathname.includes('/recruitment/detail');

	return (
		<SubLayout category="Community" locationLabel="커뮤니티" title={title} groups={!hideTabs ? groups : []} bgImage="/assets/images/sub_04.png">
			<Outlet />
		</SubLayout>
	);
};

export default CommunityLayout;
