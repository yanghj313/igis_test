// src/pages/Solution/Station.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import '../../assets/css/solution.css';

const STREAM_SLIDES = [
	{ id: 1, key: 'now', img: '/assets/images/solution/drone/streaming/stream_01.png' },
	{ id: 2, key: 'mark', img: '/assets/images/solution/drone/streaming/stream_02.png' },
	{ id: 3, key: 'various', img: '/assets/images/solution/drone/streaming/stream_03.png' },
	{ id: 4, key: 'optimize', img: '/assets/images/solution/drone/streaming/stream_04.png' },
];

type StreamTagId = 'managing' | 'monthly' | 'mediam' | 'onestop' | 'cctv';

const STREAM_TAG_IDS: StreamTagId[] = ['managing', 'monthly', 'mediam', 'onestop', 'cctv'];

const Stream: React.FC = () => {
	const { t } = useTranslation();
	const rawSlides = STREAM_SLIDES;
	const loopSlides = rawSlides.length < 5 ? [...rawSlides, ...rawSlides] : rawSlides;
	return (
		<section className="station-section">
			<div className="station-inner">
				{/* ---------------- 헤더 ---------------- */}
				<header className="station-header">
					<div className="station-header-left">
						<h2 className="station-title">{t('stream_page.title_main', 'DFOS STREAM')}</h2>
						<p className="station-desc">{t('stream_page.description', '드론의 사진, 동영상, 촬영 및 경로 비행을 사용자가 편리하게 컨트롤 할 수 있는 APP')}</p>

						<img src="/assets/images/solution/drone/streaming/header.png" alt="DFOS STREAM 화면" className="station-header-img stream-header" />
					</div>

					<div className="station-header-right">
						<div className="station-tag-wrap">
							<span className="station-tag-title">
								<img src="/assets/images/drone_icon.png" alt="" className="location-card-icon" />
								{t('stream_page.tag_title', 'DFOS STREAM 적용 장비')}
							</span>
							<div className="station-tags">
								{STREAM_TAG_IDS.map(id => (
									<span key={id} className="station-tag">
										<span className="station-tag-label">{t(`stream_page.tags.${id}`)}</span>
									</span>
								))}
							</div>
						</div>
					</div>
				</header>

				{/* ---------------- 슬라이더 ---------------- */}
				<div className="stream-slider-title">
					<h2 className="station-title">{t('stream_page.slider_title', 'DFOS STREAM 멀티뷰어')}</h2>
					<p className="station-desc">{t('stream_page.slider_description', '멀티뷰어 설명')}</p>
				</div>
				<div className="station-slider stream-slider">
					<Swiper
						modules={[Pagination]}
						loop={true}
						centeredSlides={true}
						slidesPerView={1.8}
						spaceBetween={40}
						pagination={{ clickable: true }}
						className="stream-swiper"
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
							const titleKey = `stream_page.slides.${slide.key}.title`;
							const itemsKey = `stream_page.slides.${slide.key}.items`;
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

export default Stream;
