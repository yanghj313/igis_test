import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lottie from 'lottie-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import loaderAnimation from '../../../public/assets/lottie/loader.json';
import './DFOSSection.css';

gsap.registerPlugin(ScrollTrigger);

const dfosData = [
	{
		title: 'STATION',
		desc: '고정형, 이동형으로 유연하게 배치 다양한 상황 환경에서 효과적으로 대응',
		img: '/assets/images/dfos_01.png',
		tags: ['DJI DOCK', 'DJI Matrice'],
	},
	{
		title: 'PANORAMA',
		desc: '드론으로 촬영한 사진을 360° 파노라마로 변환',
		img: '/assets/images/dfos_02.png',
		tags: ['영상 자동 제작', '영상관리 및 표출', '공간정보관리'],
	},
	{
		title: 'PILOT',
		desc: '누구나 쉽고 편리하게 사용할 수 있는 드론 비행 APP',
		img: '/assets/images/dfos_03.png',
		tags: ['비행 컨트롤', '자동 미션 비행 지원'],
	},
];

const DFOSSection: React.FC = () => {
	const sectionRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLDivElement>(null);
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth <= 1024);
		window.addEventListener('resize', handleResize);

		const ctx = gsap.context(() => {
			const mm = gsap.matchMedia();

			// ✅ PC: 타이틀 pin 고정
			mm.add('(min-width: 1025px)', () => {
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
					<p className="desc">
						드론 기술의 노하우를 바탕으로 다양한 분야에 적용이 가능한
						<br />
						협업 솔루션을 제공합니다.
					</p>
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
						<Swiper className="dfos_swiper" modules={[Pagination]} slidesPerView={1} pagination={{ clickable: true }} spaceBetween={40}>
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
