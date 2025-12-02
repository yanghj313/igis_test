import React, { CSSProperties, useLayoutEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../assets/css/vision.css';

gsap.registerPlugin(ScrollTrigger);

const Vision: React.FC = () => {
	const { t } = useTranslation();

	const visionItems = [
		{
			id: 'innovate',
			label: 'INNOVATE',
			desc: t('vision_page.items.innovate'),
			img: '/assets/images/company/vision_01.png',
		},
		{
			id: 'grit',
			label: 'GRIT',
			desc: t('vision_page.items.grit'),
			img: '/assets/images/company/vision_02.png',
		},
		{
			id: 'integrity',
			label: 'INTEGRITY',
			desc: t('vision_page.items.integrity'),
			img: '/assets/images/company/vision_03.png',
		},
		{
			id: 'serve',
			label: 'SERVE',
			desc: t('vision_page.items.serve'),
			img: '/assets/images/company/vision_04.png',
		},
	];

	const listRef = useRef<HTMLUListElement | null>(null);

	useLayoutEffect(() => {
		if (typeof window === 'undefined') return;

		if (window.innerWidth <= 768) {
			return;
		}

		const ctx = gsap.context(() => {
			const items = gsap.utils.toArray<HTMLElement>('.vision-item');

			gsap.set(items, { opacity: 0, y: 40 });

			gsap.to(items, {
				opacity: 1,
				y: 0,
				duration: 0.8,
				ease: 'power3.out',
				stagger: 0.15,
				scrollTrigger: {
					trigger: listRef.current,
					start: 'top 75%',
					end: 'bottom 30%',
					once: true,
					toggleActions: 'play none none none',
				},
			});
		}, listRef);

		return () => {
			ctx.revert();
		};
	}, []);

	return (
		<section className="vision-section">
			<div className="vision-inner">
				<div className="vision-head">
					<h2 className="vision-kicker">{t('vision_page.kicker')}</h2>
					<h2 className="vision-title-main">{t('vision_page.main')}</h2>
					<p className="vision-intro pc_ment">
						{t('vision_page.intro1')}
						<br />
						{t('vision_page.intro2')}
					</p>
					<p className="vision-intro mobile_ment">
						{t('vision_page.intro3')}
						<br />
						{t('vision_page.intro4')}
					</p>
				</div>

				<ul className="vision-list" ref={listRef}>
					{visionItems.map((item, index) => {
						const delayStyle: CSSProperties = {
							animationDelay: `${index * 0.15}s`,
						};
						return (
							<li key={item.id} className="vision-item" style={delayStyle}>
								<div className="vision-card">
									<img src={item.img} alt={item.label} className="vision-img" />
									<div className="vision-content">
										<p className="vision-word">
											<span className="vision-first">{item.label.charAt(0)}</span>
											{item.label.slice(1)}
										</p>
										<p className="vision-desc">{item.desc}</p>
									</div>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
};

export default Vision;
