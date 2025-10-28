import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Company from '../../src/pages/Company/Company';
import Award from '../../src/pages/Company/Award';
import News from '../../src/pages/Company/News';

const CompanyRoutes = ({ userAgent }: { userAgent: 'pc' | 'tablet' | 'mb' }) => (
	<Routes>
		<Route path="/" element={<Company userAgent={userAgent} />} />
		<Route path="/award" element={<Award userAgent={userAgent} />} />
		<Route path="/news" element={<News userAgent={userAgent} />} />
	</Routes>
);

export default CompanyRoutes;
