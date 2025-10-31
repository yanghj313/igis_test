import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CompanyLayout from '@pages/Company/CompanyLayout';
import About from '@pages/Company/About';
import Vision from '@pages/Company/Vision';
import Organization from '@pages/Company/Organization';
import History from '@pages/Company/History';
import Location from '@pages/Company/Location';
import Award from '@pages/Company/Award';
import Certificate from '@pages/Company/Certificate';
import Patent from '@pages/Company/Patent';

const CompanyRoutes: React.FC = () => (
	<Routes>
		<Route path="/" element={<CompanyLayout />}>
			<Route path="about" element={<About />} />
			<Route path="vision" element={<Vision />} />
			<Route path="organization" element={<Organization />} />
			<Route path="history" element={<History />} />
			<Route path="location" element={<Location />} />
			<Route path="award" element={<Award />} />
			<Route path="certificate" element={<Certificate />} />
			<Route path="patent" element={<Patent />} />
		</Route>
	</Routes>
);

export default CompanyRoutes;
