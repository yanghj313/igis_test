// src/routes/CommunityRoutes.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CommunityLayout from '@pages/Community/CommunityLayout';
import Contact from '@pages/Community/Contact/Contact';
import Recruit from '@pages/Community/Recruit/Recruit';
import NewsContainer from '@pages/Community/News/NewsContainer';
import VideoContainer from '@pages/Community/Video/VideoContainer';

const CommunityRoutes: React.FC = () => (
	<Routes>
		<Route path="/" element={<CommunityLayout />}>
			{/* 커뮤니티 루트로 들어오면 자동으로 뉴스로 */}
			<Route index element={<Navigate to="news" replace />} />

			{/* 탭 대상 라우트 */}
			<Route path="news" element={<NewsContainer />} />
			<Route path="video" element={<VideoContainer />} />

			{/* 기타 메뉴 */}
			<Route path="contact" element={<Contact />} />
			<Route path="recruit" element={<Recruit />} />

			{/* 만약 헤더가 /community/media로 들어온다면 → news로 보내기 */}
			<Route path="media" element={<Navigate to="../news" replace />} />
		</Route>
	</Routes>
);

export default CommunityRoutes;
