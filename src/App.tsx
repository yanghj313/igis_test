import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import MainSection from './components/MainSection/MainSection';
import DFOSSection from './components/DFOSSection/DFOSSection';
import CompanyRoutes from './routes/CompanyRoutes';

function App() {
	const [userAgent, setUserAgent] = useState<'pc' | 'tablet' | 'mb'>('pc');

	useEffect(() => {
		const ua = navigator.userAgent.toLowerCase();
		if (/mobile|iphone|android/.test(ua)) setUserAgent('mb');
		else if (/ipad|tablet/.test(ua)) setUserAgent('tablet');
		else setUserAgent('pc');
	}, []);

	return (
		<>
			<Header />

			{/* ✅ Route 외부에 DFOSSection을 두면 항상 메인 밑에 나타남 */}
			<Routes>
				<Route
					path="/"
					element={
						<>
							<MainSection />
							<DFOSSection /> {/* ✅ 메인 밑에 고정 */}
						</>
					}
				/>
				<Route path="/company/*" element={<CompanyRoutes userAgent={userAgent} />} />
			</Routes>
		</>
	);
}

export default App;
