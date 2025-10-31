// src/routes/SolutionRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SolutionLayout from '@pages/Solution/SolutionLayout';
import DronSolution from '@pages/Solution/DronSolution';
import GISSolution from '@pages/Solution/GISSolution';

const SolutionRoutes: React.FC = () => (
	<Routes>
		<Route path="/" element={<SolutionLayout />}>
			<Route index element={<DronSolution />} />
			<Route path="dron" element={<DronSolution />} />
			<Route path="gis" element={<GISSolution />} />
		</Route>
	</Routes>
);

export default SolutionRoutes;
