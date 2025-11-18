import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SubLayout from '@/components/layout/SubLayout';

const MediaTabsLayout = () => {
	const { pathname } = useLocation();

	const last = pathname.split('/').pop();
	const valid = ['news', 'video'];

	const current = valid.includes(last!) ? last : 'news';

	const titleMap: Record<string, string> = {
		news: 'NEWS',
		video: 'MEDIA',
	};

	return (
		<SubLayout
			category="Community"
			locationLabel="뉴스 및 홍보영상"
			title={titleMap[current]}
			groups={[
				{
					groupLabel: '뉴스 및 홍보영상',
					items: [
						{ to: 'news', label: '뉴스' },
						{ to: 'video', label: '홍보영상' },
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
