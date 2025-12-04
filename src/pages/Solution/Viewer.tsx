// src/pages/Solution/Station.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import '../../assets/css/solution.css';

const VIEWER_SLIDES = [
	{ id: 1, key: 'map', img: '/assets/images/solution/drone/viewer/search.png' },
	{ id: 2, key: 'monitor', img: '/assets/images/solution/drone/viewer/bookmark.png' },
	{ id: 3, key: 'divide', img: '/assets/images/solution/drone/viewer/dvide.png' },
	{ id: 4, key: 'list', img: '/assets/images/solution/drone/viewer/list.png' },
	{ id: 5, key: 'play', img: '/assets/images/solution/drone/viewer/play.png' },
];

// 헤더 오른쪽 장비 태그
type ViewerTagId = 'support' | 'flight' | 'layout' | 'fitting' | 'alert' | 'device';

const VIEWER_TAG_IDS: ViewerTagId[] = ['support', 'flight', 'layout', 'fitting', 'alert', 'device'];

const Viewer: React.FC = () => {
	const { t } = useTranslation();

	return (
		<section className="station-section">
			<div className="station-inner">
				{/* ---------------- 헤더 ---------------- */}
				<header className="station-header">
					<div className="station-header-left">
						<h2 className="station-title">{t('viewer_page.title_main', 'DFOS WEATHER')}</h2>
						<p className="station-desc">{t('viewer_page.description', '안전한 드론 비행에 대한 의사 결정을 지원하는 드론 전용 날씨 정보 서비스')}</p>

						<img src="/assets/images/solution/drone/viewer/header.png" alt="DFOS WEATHER 화면" className="station-header-img" />
					</div>

					<div className="station-header">
						<div className="station-tag-wrap">
							<span className="station-tag-title">
								<img src="/assets/images/drone_icon.png" alt="" className="location-card-icon" />
								{t('viewer_page.tag_title', 'DFOS WEATHER 주요 기능')}
							</span>
							<div className="station-tags igis-section">
								{VIEWER_TAG_IDS.map(id => (
									<span key={id} className="station-tag">
										<span className="station-tag-label">{t(`viewer_page.tags.${id}`)}</span>
									</span>
								))}
							</div>
						</div>
					</div>
				</header>

				{/* ---------------- 슬라이더 ---------------- */}
				<div className="station-slider">
					<Swiper
						modules={[Pagination]}
						loop={true}
						centeredSlides={true}
						slidesPerView={1.8}
						spaceBetween={40}
						pagination={{ clickable: true }}
						className="viewer-swiper"
						breakpoints={{
							0: {
								slidesPerView: 1,
								centeredSlides: false,
							},
							768: {
								slidesPerView: 1.4,
								centeredSlides: true,
							},
							1200: {
								slidesPerView: 1.8,
								centeredSlides: true,
								spaceBetween: 10,
							},
						}}
					>
						{VIEWER_SLIDES.map(slide => {
							const titleKey = `viewer_page.slides.${slide.key}.title`;
							const itemsKey = `viewer_page.slides.${slide.key}.items`;

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

export default Viewer;
