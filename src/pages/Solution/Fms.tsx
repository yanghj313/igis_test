import React from 'react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import '../../assets/css/solution.css';

const FMS_SLIDES = [
	{ id: 1, key: 'fms', img: '/assets/images/solution/igis/fms/mesure.png' },
	{ id: 2, key: 'place', img: '/assets/images/solution/igis/fms/layer.png' },
	{ id: 3, key: 'layer', img: '/assets/images/solution/igis/fms/change.png' },
	{ id: 4, key: 'memo', img: '/assets/images/solution/igis/fms/memo.png' },
	{ id: 5, key: 'out', img: '/assets/images/solution/igis/fms/viewer.png' },
	{ id: 6, key: 'comport', img: '/assets/images/solution/igis/fms/edit.png' },
	{ id: 7, key: 'mobile', img: '/assets/images/solution/igis/fms/main.png' },
];

type FmsTagId = 'where' | 'layer' | 'memo' | 'out' | 'comport' | 'mobile';

const FMS_TAG_IDS: FmsTagId[] = ['where', 'layer', 'memo', 'out', 'comport', 'mobile'];

const Fms: React.FC = () => {
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
						<h2 className="station-title">{t('fms_page.title_main', 'DFOS Forest')}</h2>
						<p className="station-desc">{t('fms_page.description', 'FMS는 GIS 지도기반의 Mobile App으로 현장 조사에 필요한 위치정보기반 조사 및 편집 등을 지원하는 Mobile GIS Solution')}</p>

						<img src="/assets/images/solution/igis/fms/solution_header.png" alt="DFOS Forest 화면" className="station-header-img" />
					</div>

					<div className="station-header-right">
						<div className="station-tag-wrap">
							<span className="station-tag-title">
								<img src="/assets/images/drone_icon.png" alt="" className="location-card-icon" />
								{t('forest_page.tag_title', 'DFOS Forest 주요 기능')}
							</span>
							<div className="station-tags igis-section">
								{FMS_TAG_IDS.map(id => (
									<span key={id} className="station-tag">
										<span className="station-tag-label">{t(`fms_page.tags.${id}`)}</span>
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
						{FMS_SLIDES.map(slide => {
							const titleKey = `fms_page.slides.${slide.key}.title`;
							const itemsKey = `fms_page.slides.${slide.key}.items`;
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

export default Fms;
