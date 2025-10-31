// src/routes/BusinessRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BusinessLayout from '@pages/Business/BusinessLayout';
import Dron from '@pages/Business/Dron';
import GIS from '@pages/Business/GIS';
import FMS from '@pages/Business/FMS';
import RND from '@pages/Business/RND';

const BusinessRoutes = () => (
	<Routes>
		<Route path="/" element={<BusinessLayout />}>
			<Route index element={<Dron />} />
			<Route path="dron" element={<Dron />} />
			<Route path="gis" element={<GIS />} />
			<Route path="fms" element={<FMS />} />
			<Route path="rnd" element={<RND />} />
		</Route>
	</Routes>
);

export default BusinessRoutes;
