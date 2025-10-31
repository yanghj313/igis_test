// src/App.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header/Header';
import MainSection from './components/MainSection/MainSection';
import DFOSSection from './components/DFOSSection/DFOSSection';
import BusinessSection from './components/BusinessSection/BusinessSection';
import PartnerSection from './components/PartnerSection/PartnerSection';
import Footer from './components/Footer/Footer';

import CompanyRoutes from '@routes/CompanyRoutes';
import CommunityRoutes from '@routes/CommunityRoutes';
import SolutionRoutes from '@routes/SolutionRoutes';
import BusinessRoutes from '@routes/BusinessRoutes';

function App() {
	return (
		<>
			<Header />

			<Routes>
				{/* 메인 섹션 묶음 */}
				<Route
					path="/"
					element={
						<>
							<MainSection />
							<DFOSSection />
							<BusinessSection />
							<PartnerSection />
							<Footer />
						</>
					}
				/>

				{/* 서브 라우팅 */}
				<Route path="/company/*" element={<CompanyRoutes />} />
				<Route path="/community/*" element={<CommunityRoutes />} />
				<Route path="/solution/*" element={<SolutionRoutes />} />
				<Route path="/business/*" element={<BusinessRoutes />} />

				{/* 단축 경로 → 커뮤니티 탭으로 리다이렉트 (헤더는 그대로) */}
				<Route path="/news" element={<Navigate to="/community/news" replace />} />
				<Route path="/video" element={<Navigate to="/community/video" replace />} />

				{/* 404 */}
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</>
	);
}

export default App;
