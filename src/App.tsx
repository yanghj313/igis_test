import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import MainSection from './components/MainSection/MainSection';
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
			<Routes>
				<Route path="/" element={<MainSection />} />
				<Route path="/company/*" element={<CompanyRoutes userAgent={userAgent} />} />
			</Routes>
		</>
	);
}

export default App;
