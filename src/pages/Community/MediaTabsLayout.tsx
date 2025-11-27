// src/pages/Community/MediaTabsLayout.tsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SubLayout from '@/components/layout/SubLayout';

const MediaTabsLayout = () => {
	const { pathname } = useLocation();
	const { t } = useTranslation();

	const last = pathname.split('/').pop();
	const valid = ['news', 'video'];
	const current = valid.includes(last!) ? last! : 'news';

	const titleMap: Record<string, string> = {
		news: t('layout.community.media.title.news'),
		video: t('layout.community.media.title.video'),
	};

	return (
		<SubLayout
			category="Community"
			locationLabel={t('layout.community.media.locationLabel')}
			title={titleMap[current]}
			groups={[
				{
					groupLabel: t('layout.community.media.locationLabel'),
					items: [
						{ to: 'news', label: t('layout.community.media.tabs.news') },
						{ to: 'video', label: t('layout.community.media.tabs.video') },
					],
				},
			]}
			bgImage="/assets/images/sub_04.png"
		>
			<Outlet />
		</SubLayout>
	);
};

export default MediaTabsLayout;
