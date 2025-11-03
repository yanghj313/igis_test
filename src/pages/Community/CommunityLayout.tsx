// src/pages/Community/CommunityLayout.tsx
import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../assets/css/community.css';

const CommunityLayout: React.FC = () => {
	const { t } = useTranslation();
	const { pathname } = useLocation();

	const inRoot = pathname === '/community' || pathname === '/community/';
	const inContact = pathname.startsWith('/community/contact');
	const inRecruit = pathname.startsWith('/community/recruitment');
	const inNews = pathname.startsWith('/community/news');
	const inVideo = pathname.startsWith('/community/video');

	// 상세(/community/recruitment/detail/...)에서는 탭 숨김
	const inRecruitDetail = pathname.startsWith('/community/recruitment/detail/');
	const showTabs = (inRoot || inContact || inRecruit || inNews || inVideo) && !inRecruitDetail;

	const tabs = [
		{ to: 'contact', label: t('nav.contact') },
		{ to: 'recruitment', label: t('nav.recruit') },
		{ to: 'news', label: t('nav.news') },
		{ to: 'video', label: t('nav.video') },

		// ✅ 라벨 전용 키
	];
	return (
		<section className="community-layout">
			{showTabs && (
				<nav className="media-tabs" aria-label="Community tabs">
					{tabs.map(tab => (
						<NavLink key={tab.to} to={tab.to} className={({ isActive }) => 'tab' + (isActive ? ' active' : '')}>
							{tab.label}
						</NavLink>
					))}
				</nav>
			)}
			<Outlet />
		</section>
	);
};

export default CommunityLayout;
