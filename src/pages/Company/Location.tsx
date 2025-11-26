// src/pages/Company/Location.tsx
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../assets/css/location.css';

declare global {
	interface Window {
		daum?: {
			roughmap?: {
				Lander?: new (opts: { timestamp: string; key: string; mapWidth: string; mapHeight: string }) => { render: () => void };
			};
		};
	}
}

const KAKAO_MAP_SRC = 'https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js';

type OfficeKey = 'hq' | 'changwon';

const Location: React.FC = () => {
	const { t } = useTranslation();
	const [activeOffice, setActiveOffice] = useState<OfficeKey>('hq');

	// 1) roughmapLoader.js 한 번만 로드 + 두 지점 지도 1번씩만 렌더
	useEffect(() => {
		const existed = document.querySelector('.daum_roughmap_loader_script');
		const loadScript = existed
			? () => Promise.resolve()
			: () =>
					new Promise<void>((resolve, reject) => {
						const script = document.createElement('script');
						script.src = KAKAO_MAP_SRC;
						script.charset = 'UTF-8';
						script.className = 'daum_roughmap_loader_script';
						script.onload = () => resolve();
						script.onerror = () => reject(new Error('Kakao map script load error'));
						document.body.appendChild(script);
					});

		loadScript()
			.then(() => {
				if (!window.daum?.roughmap?.Lander) return;
				const Lander = window.daum.roughmap.Lander!;

				// --- 본사 지도 ---
				const hqContainer = document.getElementById('daumRoughmapContainer1764131445672');
				if (hqContainer && !hqContainer.querySelector('iframe')) {
					new Lander({
						timestamp: '1764131445672',
						key: 'ctwbiiz7csn',
						mapWidth: '1200', // px 문자열 (실제 너비는 CSS에서 100%)
						mapHeight: '480',
					}).render();
				}

				// --- 창원 지도 ---
				const changwonContainer = document.getElementById('daumRoughmapContainer1764131530334');
				if (changwonContainer && !changwonContainer.querySelector('iframe')) {
					new Lander({
						timestamp: '1764131530334',
						key: 'ctwdi3bz4et',
						mapWidth: '1200',
						mapHeight: '480',
					}).render();
				}
			})
			.catch(console.error);
	}, []);

	return (
		<section className="location-section">
			<div className="location-inner">
				{/* 지도 영역 : 컨테이너 2개, CSS로만 토글 */}
				<div className="location-map-wrap">
					{/* 본사 */}
					<div className={`location-map-panel ${activeOffice === 'hq' ? 'active' : ''}`}>
						<div id="daumRoughmapContainer1764131445672" className="root_daum_roughmap root_daum_roughmap_landing" />
					</div>

					{/* 창원 */}
					<div className={`location-map-panel ${activeOffice === 'changwon' ? 'active' : ''}`}>
						<div id="daumRoughmapContainer1764131530334" className="root_daum_roughmap root_daum_roughmap_landing" />
					</div>
				</div>

				{/* 정보 카드가 탭 역할 */}
				<div className="location-card-wrap">
					{/* 본사 카드 */}
					<div className={`location-card ${activeOffice === 'hq' ? 'active' : ''}`} onClick={() => setActiveOffice('hq')}>
						<h3 className="location-card-title">
							<span className="location-card-icon">
								<img src="../../assets/images/drone_icon.png" alt="본사 아이콘" />
							</span>{' '}
							{t('location_detail.hqTab', '본사')}
						</h3>
						<dl>
							<dt>{t('location_detail.label.address', 'Address')}</dt>
							<dd>{t('location_detail.hq.address')}</dd>
							<br />
							<dt>{t('location_detail.label.email', 'E-mail')}</dt>
							<dd>{t('location_detail.hq.email')}</dd>
							<br />
							<dt>{t('location_detail.label.phone', 'Phone')}</dt>
							<dd>{t('location_detail.hq.phone')}</dd>
							<br />
							<dt>{t('location_detail.label.fax', 'Fax')}</dt>
							<dd>{t('location_detail.hq.fax')}</dd>
						</dl>
					</div>

					{/* 창원 카드 */}
					<div className={`location-card ${activeOffice === 'changwon' ? 'active' : ''}`} onClick={() => setActiveOffice('changwon')}>
						<h3 className="location-card-title">
							<span className="location-card-icon">
								<img src="../../assets/images/drone_icon.png" alt="창원 지사 아이콘" />
							</span>{' '}
							{t('location_detail.changwonTab', '창원 지사')}
						</h3>
						<dl>
							<dt>{t('location_detail.label.address', 'Address')}</dt>
							<dd>{t('location_detail.changwon.address')}</dd>
							<br />

							<dt>{t('location_detail.label.email', 'E-mail')}</dt>
							<dd>{t('location_detail.changwon.email')}</dd>
							<br />
							<dt>{t('location_detail.label.phone', 'Phone')}</dt>
							<dd>{t('location_detail.changwon.phone')}</dd>
							<br />
							<dt>{t('location_detail.label.fax', 'Fax')}</dt>
							<dd>{t('location_detail.changwon.fax')}</dd>
						</dl>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Location;
