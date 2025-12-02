// src/App.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header/Header';
import MainSection from './components/MainSection/MainSection';
import DFOSSection from './components/DFOSSection/DFOSSection';
import BusinessSection from './components/BusinessSection/BusinessSection';
import PartnerSection from './components/PartnerSection/PartnerSection';
import Footer from './components/Footer/Footer';

// 라우트 묶음
import CompanyRoutes from '@/routes/CompanyRoutes';
import CommunityRoutes from '@/routes/CommunityRoutes';
import SolutionRoutes from '@/routes/SolutionRoutes';
import BusinessRoutes from '@/routes/BusinessRoutes';

function App() {
	return (
		<>
			<Header />

			<Routes>
				{/* -------------------------------- */}
				{/*               MAIN               */}
				{/* -------------------------------- */}
				<Route
					path="/"
					element={
						<>
							<MainSection />
							<DFOSSection />
							<BusinessSection />
							<PartnerSection />
						</>
					}
				/>

				{/* -------------------------------- */}
				{/*            SUB ROUTES            */}
				{/* -------------------------------- */}

				{/* Company 전체 라우트 */}
				<Route path="/company/*" element={<CompanyRoutes />} />

				{/* Business 라우트 */}
				<Route path="/business/*" element={<BusinessRoutes />} />

				{/* Solution 라우트 */}
				<Route path="/solution/*" element={<SolutionRoutes />} />

				{/* Community 라우트 */}
				<Route path="/community/*" element={<CommunityRoutes />} />

				{/* 404 → 메인 */}
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>

			<Footer />
		</>
	);
}
export default App;
