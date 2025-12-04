// src/pages/Solution/Station.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import '../../assets/css/solution.css';

const PILOT_SLIDES = [
	{ id: 1, key: 'mission', img: '/assets/images/solution/drone/pilot/p_01.png' },
	{ id: 2, key: 'setting', img: '/assets/images/solution/drone/pilot/p_02.png' },
	{ id: 3, key: 'camera', img: '/assets/images/solution/drone/pilot/p_03.png' },
	{ id: 4, key: 'system', img: '/assets/images/solution/drone/pilot/p_04.png' },
	{ id: 5, key: 'flight', img: '/assets/images/solution/drone/pilot/p_05.png' },
	{ id: 6, key: 'media', img: '/assets/images/solution/drone/pilot/p_06.png' },
];

// 헤더 오른쪽 장비 태그
type PilotTagId = 'matrice300' | 'matrice400' | 'matrice30' | 'matrice3' | 'matrice4' | 'marvic3';

const PILOT_TAG_IDS: PilotTagId[] = ['matrice300', 'matrice400', 'matrice30', 'matrice3', 'matrice4', 'marvic3'];

const Pilot: React.FC = () => {
	const { t } = useTranslation();
	const rawSlides = PILOT_SLIDES;
	const loopSlides = rawSlides.length < 5 ? [...rawSlides, ...rawSlides] : rawSlides;
	return (
		<section className="station-section">
			<div className="station-inner">
				{/* ---------------- 헤더 ---------------- */}
				<header className="station-header">
					<div className="station-header-left">
						<h2 className="station-title">{t('pilot_page.title_main', 'DFOS PILOT')}</h2>
						<p className="station-desc">{t('pilot_page.description', '드론의 사진, 동영상, 촬영 및 경로 비행을 사용자가 편리하게 컨트롤 할 수 있는 APP')}</p>

						<img src="/assets/images/solution/drone/pilot/header.png" alt="DFOS Pilot 화면" className="station-header-img pilot-header" />
					</div>

					<div className="station-header-right">
						<div className="station-tag-wrap">
							<span className="station-tag-title">
								<img src="/assets/images/drone_icon.png" alt="" className="location-card-icon" />
								{t('pilot_page.tag_title', 'DFOS Pilot 적용 장비')}
							</span>
							<div className="station-tags">
								{PILOT_TAG_IDS.map(id => (
									<span key={id} className="station-tag">
										<span className="station-tag-label">{t(`pilot_page.tags.${id}`)}</span>
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
						className="pilot-swiper"
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
						{loopSlides.map((slide, idx) => {
							const titleKey = `pilot_page.slides.${slide.key}.title`;
							const itemsKey = `pilot_page.slides.${slide.key}.items`;
							const raw = t(itemsKey, { returnObjects: true }) as unknown;
							const items = Array.isArray(raw) ? (raw as string[]) : [];

							return (
								<SwiperSlide key={`${slide.id}-${idx}`} className="station-swiper-slide">
									<div className="station-slide-inner">
										{/* 왼쪽 이미지 */}
										<div className="station-slide-image">
											<img src={slide.img} alt={t(titleKey)} className="station-slide-img" loading="lazy" />
										</div>

										{/* 오른쪽 텍스트 */}
										<div className="station-slide-text">
											<h3 className="station-slide-title">{t(titleKey)}</h3>
											<ul className="station-slide-list">
												{items.map((item, itemIdx) => (
													<li key={itemIdx}>
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

export default Pilot;
