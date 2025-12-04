import React, { useEffect, useState, useMemo } from 'react';
import './BusinessSection.css';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

const BusinessSection: React.FC = () => {
	const [activeIndex, setActiveIndex] = useState<number>(0); // ✅ 첫 번째 카드 오픈
	const { t } = useTranslation();
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

	// ✅ 반응형 체크
	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth <= 1024);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	// ✅ 번역 데이터 캐싱
	const businessData = useMemo(
		() => [
			{
				id: 1,
				title: t('busi_1_title'),
				desc: t('busi_1_desc'),
				img: '/assets/images/busi_01.png',
				link: '/business/drone',
			},
			{
				id: 2,
				title: t('busi_2_title'),
				desc: t('busi_2_desc'),
				img: '/assets/images/busi_02.png',
				link: '/business/gis',
			},
			{
				id: 3,
				title: t('busi_3_title'),
				desc: t('busi_3_desc'),
				img: '/assets/images/busi_03.png',
				link: '/business/fms',
			},
			{
				id: 4,
				title: t('busi_4_title'),
				desc: t('busi_4_desc'),
				img: '/assets/images/busi_04.png',
				link: '/business/rnd',
			},
		],
		[t]
	);

	// ✅ 언어 바뀌어도 상태 유지
	useEffect(() => {
		const handleLangChange = () => setActiveIndex(prev => prev);
		i18n.on('languageChanged', handleLangChange);
		return () => i18n.off('languageChanged', handleLangChange);
	}, []);

	// ✅ hover / click 이벤트
	const handleActivate = (idx: number) => {
		if (isMobile) {
			setActiveIndex(prev => (prev === idx ? -1 : idx));
		} else {
			setActiveIndex(idx);
		}
	};

	const handleLeave = () => {
		if (!isMobile) {
			// PC에서는 hover 해제 시 첫 번째 카드로 복귀
			setActiveIndex(0);
		}
	};

	return (
		<section className="section business">
			<div className="inner">
				<div className="business-header">
					<h3 className="sec-title">
						<span>
							<span className="point_color">B</span>USINESS
						</span>
						<span className="point_color">.</span>
					</h3>
					<p className="desc">{t('business_desc')}</p>
				</div>

				<div className="business-wrap">
					{businessData.map((item, idx) => (
						<div
							key={item.id}
							className={`business-item ${activeIndex === idx ? 'active' : ''}`}
							style={{ backgroundImage: `url(${item.img})` }}
							onMouseEnter={() => handleActivate(idx)}
							onMouseLeave={handleLeave}
							onClick={() => handleActivate(idx)}
						>
							<div className="overlay" />
							<div className="business-content">
								<h4 className="title">{item.title}</h4>
								<div className="desc-wrap">
									<p>{item.desc}</p>
									<a href={item.link} className="more-btn">
										{t('more_view')}
									</a>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default BusinessSection;
