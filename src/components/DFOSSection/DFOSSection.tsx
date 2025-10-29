import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DotLottiePlayer } from '@dotlottie/react-player';
import './DFOSSection.css';

gsap.registerPlugin(ScrollTrigger);

const dfosData = [
	{
		title: 'STATION',
		desc: '고정형, 이동형으로 유연하게 배치 다양한 상황 환경에서 효과적으로 대응',
		img: '/src/assets/img/dfos_01.png',
		tags: ['DJI DOCK', 'DJI Matrice'],
	},
	{
		title: 'PANORAMA',
		desc: '드론으로 촬영한 사진을 360° 파노라마로 변환',
		img: '/src/assets/img/dfos_02.png',
		tags: ['영상 자동 제작', '영상관리 및 표출', '공간정보관리'],
	},
	{
		title: 'PILOT',
		desc: '누구나 쉽고 편리하게 사용할 수 있는 드론 비행 APP',
		img: '/src/assets/img/dfos_03.png',
		tags: ['비행 컨트롤', '자동 미션 비행 지원'],
	},
];

const DFOSSection: React.FC = () => {
	const sectionRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLDivElement>(null);
	const listRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// 🔹 왼쪽 타이틀 고정
			ScrollTrigger.create({
				trigger: sectionRef.current,
				start: 'top top',
				end: 'bottom bottom',
				pin: titleRef.current,
				pinSpacing: false,
			});

			// 🔹 각 카드 독립적으로 등장 (한 개씩)
			gsap.utils.toArray<HTMLElement>('.dfos-item').forEach(item => {
				gsap.fromTo(
					item,
					{ opacity: 0, y: 80 },
					{
						opacity: 1,
						y: 0,
						duration: 1.2,
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
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section className="section sec_dfos" ref={sectionRef}>
			<div className="inner scroll_fix_wrap">
				{/* 왼쪽 타이틀 */}
				<div className="tit_area" ref={titleRef}>
					<h3 className="sec_tit">
						<span className="txt_anim_wrap">
							<span className="txt_anim">DFOS</span>
						</span>
						<br />
						<span className="txt_anim_wrap">
							<span className="txt_anim">SOLUTION</span>
						</span>
					</h3>
					<p className="desc">드론 기술의 노하우를 바탕으로 다양한 분야에 적용이 가능한 협업 솔루션을 제공합니다.</p>
					<div className="dfos-lottie">
						<DotLottiePlayer src="/assets/lottie/circle.lottie" autoplay loop style={{ width: '476px', height: '461px' }} />
					</div>
				</div>

				{/* 오른쪽 카드 리스트 */}
				<div className="cont_area">
					<ul className="dfos_list" ref={listRef}>
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
				</div>
			</div>
		</section>
	);
};

export default DFOSSection;
