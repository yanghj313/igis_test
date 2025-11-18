// src/routes/CommunityRoutes.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import CommunityLayout from '@/pages/Community/CommunityLayout';

import ContactForm from '@/pages/Community/Contact/ContactForm';
import Recruit from '@/pages/Community/Recruit/Recruit';
import RecruitDetail from '@/pages/Community/Recruit/RecruitDetail';

import MediaTabsLayout from '@/pages/Community/MediaTabsLayout';

import NewsContainer from '@/pages/Community/News/NewsContainer';
import NewsDetailContainer from '@/pages/Community/News/NewsDetailContainer';
import VideoContainer from '@/pages/Community/Video/VideoContainer';
import VideoDetailContainer from '@/pages/Community/Video/VideoDetailContainer';

const CommunityRoutes: React.FC = () => (
	<Routes>
		<Route path="/" element={<CommunityLayout />}>
			{/* 기본 이동 */}
			<Route index element={<Navigate to="contact" replace />} />

			{/* 문의 */}
			<Route path="contact" element={<ContactForm />} />

			{/* 채용 */}
			<Route path="recruitment" element={<Recruit />} />
			<Route path="recruitment/detail/:id" element={<RecruitDetail />} />

			{/* Media (뉴스 + 홍보영상) */}

			{/* 잘못된 옛 경로 리다이렉트 */}
			<Route path="recruit/*" element={<Navigate to="/community/recruitment" replace />} />
		</Route>
		<Route path="media" element={<MediaTabsLayout />}>
			<Route path="news" element={<NewsContainer />} />
			<Route path="news/:id" element={<NewsDetailContainer />} />

			<Route path="video" element={<VideoContainer />} />
			<Route path="video/:id" element={<VideoDetailContainer />} />
		</Route>
	</Routes>
);

export default CommunityRoutes;
