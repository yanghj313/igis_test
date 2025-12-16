import React from 'react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import '../../assets/css/solution.css';

const IGIS_SLIDES = [
	{ id: 1, key: 'gis', img: '/assets/images/solution/igis/igis/main.png' },
	{ id: 2, key: 'data', img: '/assets/images/solution/igis/igis/table.png' },
	{ id: 3, key: 'edit', img: '/assets/images/solution/igis/igis/edit.png' },
	{ id: 4, key: 'option', img: '/assets/images/solution/igis/igis/layout.png' },
	{ id: 5, key: 'cad', img: '/assets/images/solution/igis/igis/layer.png' },
	{ id: 6, key: 'format', img: '/assets/images/solution/igis/igis/map.png' },
];

type IgisTagId = 'interface' | 'edit' | 'data' | 'option' | 'cad' | 'format';

const IGIS_TAG_IDS: IgisTagId[] = ['interface', 'edit', 'data', 'option', 'cad', 'format'];

const Igis: React.FC = () => {
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
				{/* ---------------- 헤더 ---------------- */}
				<header className="station-header">
					<div className="station-header-left">
						<h2 className="station-title">{t('igis_page.title_main', 'DFOS IGIS')}</h2>
						<p className="station-desc">
							{t('igis_page.description', '드론으로 촬영된 영상·이미지를 기반으로 대상 지역의 항공영상, 정사영상, DSM, 포인트클라우드 등을 자동 생성·관리할 수 있는 통합 매핑 솔루션입니다.')}
						</p>

						<img src="/assets/images/solution/igis/igis/header.png" alt="DFOS IGIS 화면" className="station-header-img" />
					</div>

					<div className="station-header-right">
						<div className="station-tag-wrap">
							<span className="station-tag-title">
								<img src="/assets/images/drone_icon.png" alt="" className="location-card-icon" />
								{t('igis_page.tag_title', 'DFOS IGIS 주요 기능')}
							</span>
							<div className="station-tags igis-section">
								{IGIS_TAG_IDS.map(id => (
									<span key={id} className="station-tag">
										<span className="station-tag-label">{t(`igis_page.tags.${id}`)}</span>
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
						{IGIS_SLIDES.map(slide => {
							const titleKey = `igis_page.slides.${slide.key}.title`;
							const itemsKey = `igis_page.slides.${slide.key}.items`;
							const raw = t(itemsKey, { returnObjects: true }) as unknown;
							const items = Array.isArray(raw) ? (raw as string[]) : [];

							return (
								<SwiperSlide key={slide.id} className="station-swiper-slide">
									<div className="station-slide-inner">
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

export default Igis;
