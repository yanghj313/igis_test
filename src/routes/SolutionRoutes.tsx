import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import DroneSolutionLayout from '@/pages/Solution/DroneSolutionLayout';
import GISSolutionLayout from '@/pages/Solution/GISSolutionLayout';

import Station from '@/pages/Solution/Station';
import Panorama from '@/pages/Solution/Panorama';
import Pilot from '@/pages/Solution/Pilot';
import Ims from '@/pages/Solution/Ims';
import Viewer from '@/pages/Solution/Viewer';

import Igis from '@/pages/Solution/Igis';
import Forest from '@/pages/Solution/Forest';
import Fms from '@/pages/Solution/Fms';

const SolutionRoutes: React.FC = () => (
	<Routes>
		{/* 드론 솔루션 */}
		<Route path="drone" element={<DroneSolutionLayout />}>
			<Route index element={<Navigate to="station" replace />} />
			<Route path="station" element={<Station />} />
			<Route path="panorama" element={<Panorama />} />
			<Route path="pilot" element={<Pilot />} />
			<Route path="ims" element={<Ims />} />
			<Route path="viewer" element={<Viewer />} />
		</Route>

		{/* GIS 솔루션 */}
		<Route path="gis" element={<GISSolutionLayout />}>
			<Route index element={<Navigate to="igis" replace />} />
			<Route path="igis" element={<Igis />} />
			<Route path="forest" element={<Forest />} />
			<Route path="fms" element={<Fms />} />
		</Route>
	</Routes>
);

export default SolutionRoutes;
