import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lottie from 'lottie-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useTranslation } from 'react-i18next';
import loaderAnimation from '../../../src/assets/lottie/loader.json';
import './DFOSSection.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

gsap.registerPlugin(ScrollTrigger);

const DFOSSection: React.FC = () => {
	const { t } = useTranslation();
	const sectionRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLDivElement>(null);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

	const dfosData = [
		{
			title: 'STATION',
			desc: t('dfos_station_desc'),
			img: '/assets/images/dfos_01.png',
			tags: [t('dfos_tag_station_1'), t('dfos_tag_station_2')],
		},
		{
			title: 'PANORAMA',
			desc: t('dfos_panorama_desc'),
			img: '/assets/images/dfos_02.png',
			tags: [t('dfos_tag_panorama_1'), t('dfos_tag_panorama_2'), t('dfos_tag_panorama_3')],
		},
		{
			title: 'PILOT',
			desc: t('dfos_pilot_desc'),
			img: '/assets/images/dfos_03.png',
			tags: [t('dfos_tag_pilot_1'), t('dfos_tag_pilot_2')],
		},
	];

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth <= 1024);
		window.addEventListener('resize', handleResize);

		const ctx = gsap.context(() => {
			const mm = gsap.matchMedia();

			// ✅ PC: 타이틀 pin 고정
			mm.add('(min-width: 1280px)', () => {
				ScrollTrigger.create({
					trigger: sectionRef.current,
					start: 'top top',
					end: 'bottom bottom',
					pin: titleRef.current,
					pinSpacing: true,
				});

				// 카드 fade-up
				gsap.utils.toArray<HTMLElement>('.dfos-item').forEach((item, i) => {
					gsap.fromTo(
						item,
						{ opacity: 0, y: 80 },
						{
							opacity: 1,
							y: 0,
							duration: 1.2,
							delay: i * 0.2,
							ease: 'power3.out',
							scrollTrigger: {
								trigger: item,
								start: 'top 90%',
								end: 'bottom 80%',
								toggleActions: 'play none none reverse',
							},
						}
					);
				});
			});

			// ✅ 모바일: pin 제거
			mm.add('(max-width: 1024px)', () => {
				ScrollTrigger.getAll().forEach(trigger => trigger.kill());
			});
		}, sectionRef);

		return () => {
			window.removeEventListener('resize', handleResize);
			ctx.revert();
		};
	}, []);

	return (
		<section className="section sec_dfos" ref={sectionRef}>
			<div className="inner">
				{/* 좌측 타이틀 — 항상 고정 */}
				<div className="tit_area" ref={titleRef}>
					<h3 className="sec_tit">
						<span className="point_color">D</span>FOS
						<br />
						SOLUTION<span className="point_color">.</span>
					</h3>
					<p className="desc">{t('dfos_desc')}</p>
					<div className="dfos-lottie">
						<Lottie animationData={loaderAnimation} loop autoplay style={{ width: '400px', height: '400px' }} />
					</div>
				</div>

				{/* ✅ 우측 콘텐츠 */}
				<div className="cont_area">
					{!isMobile ? (
						// --- PC: 세로 카드 ---
						<ul className="dfos_list">
							{dfosData.map((item, idx) => (
								<li key={idx} className="dfos-item">
									<div className="box">
										<figure className="thumb">
											<img src={item.img} alt={item.title} />
										</figure>
										<div className="txt_area">
											<h4 className="tit">{item.title}</h4>
											<p className="desc">{item.desc}</p>
											<div className="tag_wrap">
												{item.tags.map((tag, i) => (
													<span key={i} className="tag">
														{tag}
													</span>
												))}
											</div>
										</div>
									</div>
								</li>
							))}
						</ul>
					) : (
						// --- 모바일: Swiper 슬라이드 ---
						<Swiper className="dfos_swiper" modules={[Pagination, Navigation]} slidesPerView={1} pagination={{ clickable: true }} spaceBetween={40} navigation={true}>
							{dfosData.map((item, idx) => (
								<SwiperSlide key={idx} className="dfos-item">
									<div className="box">
										<figure className="thumb">
											<img src={item.img} alt={item.title} />
										</figure>
										<div className="txt_area">
											<h4 className="tit">{item.title}</h4>
											<p className="desc">{item.desc}</p>
											<div className="tag_wrap">
												{item.tags.map((tag, i) => (
													<span key={i} className="tag">
														{tag}
													</span>
												))}
											</div>
										</div>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					)}
				</div>
			</div>
		</section>
	);
};

export default DFOSSection;
