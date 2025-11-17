// src/routes/BusinessRoutes.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import BusinessLayout from '@/pages/Business/BusinessLayout';
import Drone from '@/pages/Business/Drone';
import GIS from '@/pages/Business/GIS';
import FMS from '@/pages/Business/FMS';
import RND from '@/pages/Business/RND';

const BusinessRoutes = () => (
	<Routes>
		<Route path="/" element={<BusinessLayout />}>
			<Route index element={<Navigate to="drone" replace />} />
			<Route path="drone" element={<Drone />} />
			<Route path="gis" element={<GIS />} />
			<Route path="fms" element={<FMS />} />
			<Route path="rnd" element={<RND />} />
		</Route>
	</Routes>
);

export default BusinessRoutes;
