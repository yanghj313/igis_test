// src/routes/CommunityRoutes.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import CommunityLayout from '@/pages/Community/CommunityLayout';
import MediaTabsLayout from '@/pages/Community/MediaTabsLayout';

import ContactForm from '@/pages/Community/Contact/ContactForm';
import Recruit from '@/pages/Community/Recruit/Recruit';
import RecruitDetail from '@/pages/Community/Recruit/RecruitDetail';

import NewsContainer from '@/pages/Community/News/NewsContainer';
import NewsDetailContainer from '@/pages/Community/News/NewsDetailContainer';
import VideoContainer from '@/pages/Community/Video/VideoContainer';
import VideoDetailContainer from '@/pages/Community/Video/VideoDetailContainer';

const CommunityRoutes = () => (
	<Routes>
		{/* ---------------- CONTACT / RECRUITMENT ---------------- */}
		<Route path="/" element={<CommunityLayout />}>
			<Route index element={<Navigate to="contact" replace />} />

			<Route path="contact" element={<ContactForm />} />
			<Route path="recruitment" element={<Recruit />} />
			<Route path="recruitment/detail/:id" element={<RecruitDetail />} />

			{/* 옛 경로 호환 */}
			<Route path="recruit/*" element={<Navigate to="/community/recruitment" replace />} />
		</Route>

		{/* ---------------- NEWS / VIDEO ---------------- */}
		<Route path="/" element={<MediaTabsLayout />}>
			<Route path="news" element={<NewsContainer />} />
			<Route path="news/:id" element={<NewsDetailContainer />} />

			<Route path="video" element={<VideoContainer />} />
			<Route path="video/:id" element={<VideoDetailContainer />} />
		</Route>
	</Routes>
);

export default CommunityRoutes;
