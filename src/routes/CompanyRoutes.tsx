// src/routes/CompanyRoutes.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import CompanyIntroLayout from '@/pages/Company/CompanyIntroLayout';
import CompanyAwardLayout from '@/pages/Company/CompanyAwardLayout';

import Vision from '@pages/Company/Vision';
import Organization from '@pages/Company/Organization';
import History from '@pages/Company/History';
import Location from '@pages/Company/Location';

import Certificate from '@pages/Company/Certificate';
import Patent from '@pages/Company/Patent';

const CompanyRoutes: React.FC = () => (
	<Routes>
		{/* 기업소개 */}
		<Route path="intro" element={<CompanyIntroLayout />}>
			<Route index element={<Navigate to="vision" replace />} />
			<Route path="vision" element={<Vision />} />
			<Route path="organization" element={<Organization />} />
			<Route path="history" element={<History />} />
			<Route path="location" element={<Location />} />
		</Route>

		{/* 인증 및 수상 */}
		<Route path="award" element={<CompanyAwardLayout />}>
			<Route index element={<Navigate to="certificate" replace />} />
			<Route path="certificate" element={<Certificate />} />
			<Route path="patent" element={<Patent />} />
		</Route>
	</Routes>
);

export default CompanyRoutes;
