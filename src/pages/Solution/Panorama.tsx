import React from 'react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import '../../assets/css/solution.css';

const PANORAMA_SLIDES = [
	{ id: 1, key: 'media', img: '/assets/images/solution/drone/panorama/place_using.png' },
	{ id: 2, key: 'made', img: '/assets/images/solution/drone/panorama/control.png' },
	{ id: 3, key: 'place', img: '/assets/images/solution/drone/panorama/place_using_02.png' },
	{ id: 4, key: 'realease', img: '/assets/images/solution/drone/panorama/symbol.png' },
	{ id: 5, key: 'open', img: '/assets/images/solution/drone/panorama/compare.png' },
];

// 헤더 오른쪽 장비 태그
type PanoramaTagId = 'made' | 'place' | 'manage' | 'device' | 'convenient' | 'symbol';

const PANORAMA_TAG_IDS: PanoramaTagId[] = ['made', 'place', 'manage', 'device', 'convenient', 'symbol'];

const Panorama: React.FC = () => {
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
	const rawSlides = PANORAMA_SLIDES;
	const loopSlides = rawSlides.length < 4 ? [...rawSlides, ...rawSlides] : rawSlides;
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
				{/* ---------------- 헤더 ---------------- */}
				<header className="station-header">
					<div className="station-header-left">
						<h2 className="station-title">{t('panorama_page.title_main', 'DFOS PANORAMA')}</h2>
						<p className="station-desc">{t('panorama_page.description', '다양한 드론과 카메라를 활용하여 촬영된 사진을 360° 파노라마로 변환 및공간 자료와 함께 확인 가능한 파노라마 웹 서비스')}</p>

						<img src="/assets/images/solution/drone/panorama/header.png" alt="DFOS Panorama 화면" className="station-header-img" />
					</div>

					<div className="station-header-right">
						<div className="station-tag-wrap">
							<span className="station-tag-title">
								<img src="/assets/images/drone_icon.png" alt="" className="location-card-icon" />
								{t('panorama_page.tag_title', 'DFOS Panorama 주요 기능')}
							</span>
							<div className="station-tags">
								{PANORAMA_TAG_IDS.map(id => (
									<span key={id} className="station-tag">
										<span className="station-tag-label">{t(`panorama_page.tags.${id}`)}</span>
									</span>
								))}
							</div>
						</div>
					</div>
				</header>

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
						className="panorama-swiper"
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
							const titleKey = `panorama_page.slides.${slide.key}.title`;
							const itemsKey = `panorama_page.slides.${slide.key}.items`;
							const raw = t(itemsKey, { returnObjects: true }) as unknown;
							const items = Array.isArray(raw) ? (raw as string[]) : [];

							return (
								<SwiperSlide key={`${slide.id}-${idx}`} className="station-swiper-slide">
									<div className="station-slide-inner">
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
										<div className="station-slide-image">
											<img src={slide.img} alt={t(titleKey)} className="station-slide-img" loading="lazy" />
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

export default Panorama;
