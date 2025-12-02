// src/pages/Company/Organization.tsx

import React, { useLayoutEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../assets/css/organization.css';

gsap.registerPlugin(ScrollTrigger);

const Organization: React.FC = () => {
	const { t, i18n } = useTranslation();

	const lang = i18n.language;
	const isKor = lang === 'kor' || lang.startsWith('ko');

	const desktopChart = isKor ? '/assets/images/company/organi_02.png' : '/assets/images/company/organi_03.png';

	const mobileChart1 = isKor ? '/assets/images/company/organi_02_Resposive_01.png' : '/assets/images/company/organi_03_Resposive_01.png';
	const mobileChart2 = isKor ? '/assets/images/company/organi_02_Resposive_02.png' : '/assets/images/company/organi_03_Resposive_02.png';

	const sectionRef = useRef<HTMLElement | null>(null);
	const bannerRef = useRef<HTMLElement | null>(null);
	const chartWrapperRef = useRef<HTMLDivElement | null>(null);

	useLayoutEffect(() => {
		if (typeof window === 'undefined') return;

		if (window.innerWidth <= 768) {
			return;
		}

		const ctx = gsap.context(() => {
			if (bannerRef.current) {
				gsap.from(bannerRef.current, {
					opacity: 0,
					y: 40,
					duration: 0.8,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: bannerRef.current,
						start: 'top 80%',
						once: true,
						toggleActions: 'play none none none',
					},
				});
			}

			if (chartWrapperRef.current) {
				const chartImages = chartWrapperRef.current.querySelectorAll<HTMLImageElement>('.org-chart-image img');

				gsap.from(chartImages, {
					opacity: 0,
					y: 40,
					duration: 0.8,
					stagger: 0.15,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: chartWrapperRef.current,
						start: 'top 75%',
						end: 'bottom 40%',
						once: true,
						toggleActions: 'play none none none',
						// markers: true,
					},
				});
			}
		}, sectionRef);

		return () => {
			ctx.revert();
		};
	}, []);

	return (
		<section className="organization-section" ref={sectionRef}>
			<div className="organization-inner">
				<h2>
					<span>{t('organization_page.titleLine1')}</span>
					<br />
					<strong>{t('organization_page.titleLine2')}</strong>
				</h2>

				<header className="org-banner" ref={bannerRef}>
					<div className="org-banner-content">
						<p className="org-banner-desc">{t('organization_page.description')}</p>
					</div>
				</header>

				<div className="org-chart-wrapper" ref={chartWrapperRef}>
					<div className="org-chart-image org-chart-desktop">
						<img src={desktopChart} alt={t('organization_page.chartAlt')} />
					</div>

					<div className="org-chart-image org-chart-mobile">
						<img src={mobileChart1} alt={t('organization_page.chartAlt')} />
						<img src={mobileChart2} alt={t('organization_page.chartAlt')} />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Organization;
