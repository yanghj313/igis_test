// src/routes/CommunityRoutes.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CommunityLayout from '@pages/Community/CommunityLayout';
import ContactForm from '@pages/Community/Contact/ContactForm'; // ✅ 폼 컴포넌트
import Recruit from '@pages/Community/Recruit/Recruit';
import RecruitDetail from '@pages/Community/Recruit/RecruitDetail';
import NewsContainer from '@pages/Community/News/NewsContainer';
import VideoContainer from '@pages/Community/Video/VideoContainer';

const CommunityRoutes: React.FC = () => (
	<Routes>
		<Route path="/" element={<CommunityLayout />}>
			{/* ✅ /community → /community/contact 로 */}
			<Route index element={<Navigate to="contact" replace />} />

			<Route path="news" element={<NewsContainer />} />
			<Route path="video" element={<VideoContainer />} />

			<Route path="recruitment" element={<Recruit />} />
			<Route path="recruitment/detail/:id" element={<RecruitDetail />} />

			{/* 옛 경로 리다이렉트 유지 */}
			<Route path="recruit/*" element={<Navigate to="/community/recruitment" replace />} />
			<Route path="recrultment/*" element={<Navigate to="/community/recruitment" replace />} />

			{/* ✅ 문의 폼 */}
			<Route path="contact" element={<ContactForm />} />
		</Route>
	</Routes>
);

export default CommunityRoutes;
