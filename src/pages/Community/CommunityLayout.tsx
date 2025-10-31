// src/pages/Community/CommunityLayout.tsx
import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CommunityLayout: React.FC = () => {
	const { t } = useTranslation();
	const { pathname } = useLocation();

	// /community, /community/news, /community/video 에서만 탭을 보여줌
	const showTabs = pathname === '/community' || pathname.startsWith('/community/news') || pathname.startsWith('/community/video');

	return (
		<section>
			{/* 레이아웃 공통 헤더/서브헤더 등 */}

			{showTabs && (
				<div className="media-tabs">
					<NavLink to="news" className={({ isActive }) => 'tab' + (isActive ? ' active' : '')}>
						{t('news')}
					</NavLink>
					<NavLink to="video" className={({ isActive }) => 'tab' + (isActive ? ' active' : '')}>
						{t('video')}
					</NavLink>
				</div>
			)}

			<Outlet />
		</section>
	);
};

export default CommunityLayout;
