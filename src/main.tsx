// src/main.tsx (또는 src/index.tsx)
import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './App';

// 글로벌 스타일/세팅
import './reset.css';
import './index.css';
import './assets/css/font.css';
import './i18n'; // i18next 초기화

const rootEl = document.getElementById('root')!;

createRoot(rootEl).render(
	<StrictMode>
		<HelmetProvider>
			<Suspense fallback={null}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Suspense>
		</HelmetProvider>
	</StrictMode>
);
