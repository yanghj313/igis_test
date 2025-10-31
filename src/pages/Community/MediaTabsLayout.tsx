import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../assets/css/media-tabs.css';

const MediaTabsLayout: React.FC = () => {
	const { t } = useTranslation(); // common.json에 "news","video" 키 존재 가정

	return (
		<section className="media-tabs">
			<div className="tabs">
				<NavLink to="/community/news" className={({ isActive }) => 'tab' + (isActive ? ' active' : '')}>
					{t('news')}
				</NavLink>
				<NavLink to="/community/video" className={({ isActive }) => 'tab' + (isActive ? ' active' : '')}>
					{t('video')}
				</NavLink>
			</div>
			<div className="tab-panel">
				<Outlet />
			</div>
		</section>
	);
};

export default MediaTabsLayout;
