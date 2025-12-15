// src/pages/Solution/Station.tsx
import React from 'react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import '../../assets/css/solution.css';

const STATION_SLIDES = [
	{ id: 1, key: 'dashboard', img: '/assets/images/solution/drone/dfosstation/dashboard.png' },
	{ id: 2, key: 'mission', img: '/assets/images/solution/drone/dfosstation/mission.png' },
	{ id: 3, key: 'stats', img: '/assets/images/solution/drone/dfosstation/granph.png' },
	{ id: 4, key: 'droneInfo', img: '/assets/images/solution/drone/dfosstation/drone.png' },
	{ id: 5, key: 'tracking', img: '/assets/images/solution/drone/dfosstation/cock.png' },
	{ id: 6, key: 'stream', img: '/assets/images/solution/drone/dfosstation/streaming.png' },
	{ id: 7, key: 'map', img: '/assets/images/solution/drone/dfosstation/map.png' },
	{ id: 8, key: 'remote', img: '/assets/images/solution/drone/dfosstation/onestop.png' },
];

// 헤더 오른쪽 장비 태그
type StationTagId = 'djiDock1' | 'djiDock2' | 'djiDock3' | 'matrice30' | 'matrice300' | 'matrice350' | 'matrice3' | 'matrice4';

const STATION_TAG_IDS: StationTagId[] = ['djiDock1', 'djiDock2', 'djiDock3', 'matrice30', 'matrice300', 'matrice350', 'matrice3', 'matrice4'];

const Station: React.FC = () => {
	const { t } = useTranslation();
	const sliderRef = useRef<HTMLDivElement | null>(null);
	const swiperRef = useRef<SwiperType | null>(null);
	const handleWheel = (e: WheelEvent): void => {
		const swiper = swiperRef.current;
		if (!swiper) return;

		if (Math.abs(e.deltaY) < 8) return;

		e.preventDefault();
		e.stopPropagation();

		if (e.deltaY > 0) swiper.slideNext();
		else swiper.slidePrev();
	};

	useEffect(() => {
		const el = sliderRef.current;
		if (!el) return;

		el.addEventListener('wheel', handleWheel, { passive: false });

		return () => {
			el.removeEventListener('wheel', handleWheel);
		};
	}, []);

	return (
		<section className="station-section">
			<div className="station-inner">
				<header className="station-header">
					<div className="station-header-left">
						<h2 className="station-title">{t('station_page.title_main', 'DFOS STATION')}</h2>
						<p className="station-desc">
							{t(
								'station_page.description',
								'DFOS STATION은 고정형과 이동형으로 유연하게 배치를 통해, 다양한 상황과 환경에서 효율적인 대응이 가능하며, 일정 지역에 정기적 운용이 필요한 곳에서는 고정형을, ' +
									'기동성과 신속한 배치가 필요한 곳에서는 이동형으로 적용하여 효율적 운용이 가능합니다.'
							)}
						</p>

						<img src="/assets/images/solution/drone/dfosstation/header.png" alt="DFOS Station 화면" className="station-header-img" />
					</div>

					<div className="station-header-right">
						<div className="station-tag-wrap">
							<span className="station-tag-title">
								<img src="/assets/images/drone_icon.png" alt="" className="location-card-icon" />
								{t('station_page.tag_title', 'DFOS Station 적용 장비')}
							</span>
							<div className="station-tags">
								{STATION_TAG_IDS.map(id => (
									<span key={id} className="station-tag">
										<span className="station-tag-label">{t(`station_page.tags.${id}`)}</span>
									</span>
								))}
							</div>
						</div>
					</div>
				</header>

				{/* ---------------- 슬라이더 ---------------- */}

				<div className="station-slider" ref={sliderRef}>
					<Swiper
						onSwiper={swiper => {
							swiperRef.current = swiper;
						}}
						modules={[Pagination]}
						loop={true}
						centeredSlides={true}
						slidesPerView={1.8}
						spaceBetween={40}
						pagination={{ clickable: true }}
						className="station-swiper"
						breakpoints={{
							0: { slidesPerView: 1, centeredSlides: false },
							768: { slidesPerView: 1.4, centeredSlides: true },
							1200: { slidesPerView: 1.8, centeredSlides: true, spaceBetween: 10 },
						}}
					>
						{STATION_SLIDES.map(slide => {
							const titleKey = `station_page.slides.${slide.key}.title`;
							const itemsKey = `station_page.slides.${slide.key}.items`;
							const raw = t(itemsKey, { returnObjects: true }) as unknown;
							const items = Array.isArray(raw) ? (raw as string[]) : [];

							return (
								<SwiperSlide key={slide.id} className="station-swiper-slide">
									<div className="station-slide-inner">
										{/* 왼쪽 이미지 */}
										<div className="station-slide-image">
											<img src={slide.img} alt={t(titleKey)} className="station-slide-img" loading="lazy" />
										</div>

										{/* 오른쪽 텍스트 */}
										<div className="station-slide-text">
											<h3 className="station-slide-title">{t(titleKey)}</h3>
											<ul className="station-slide-list">
												{items.map((item, idx) => (
													<li key={idx}>
														<img src="/assets/images/solution/check.png" alt="" aria-hidden="true" className="station-check" />
														<span>{item}</span>
													</li>
												))}
											</ul>
										</div>
									</div>
								</SwiperSlide>
							);
						})}
					</Swiper>
				</div>
			</div>
		</section>
	);
};

export default Station;
