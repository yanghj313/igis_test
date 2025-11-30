import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../assets/css/solution.css';

const FOREST_SLIDES = [
	{ id: 1, key: 'forest', img: '/assets/images/solution/igis/forest/forest.png' },
	{ id: 2, key: 'place', img: '/assets/images/solution/igis/forest/kind.png' },
];

type ForestTagId = 'forest' | 'automatic' | 'construction' | 'feature' | 'link' | 'custom';

const FOREST_TAG_IDS: ForestTagId[] = ['forest', 'automatic', 'construction', 'feature', 'link', 'custom'];

const Forest: React.FC = () => {
	const { t } = useTranslation();

	return (
		<section className="station-section igis-section">
			<div className="station-inner">
				{/* ---------------- 헤더 ---------------- */}
				<header className="station-header">
					<div className="station-header-left">
						<h2 className="station-title">{t('forest_page.title_main', 'DFOS Forest')}</h2>
						<p className="station-desc">{t('forest_page.description', '산림업무에 최적화된 솔루션으로 산림공간정보에 대한\n편집, 분석 및 3D 모델링이 가능한 전문 산림 GIS Solution')}</p>

						<img src="/assets/images/solution/igis/forest/header.png" alt="DFOS Forest 화면" className="station-header-img" />
					</div>

					<div className="station-header-right">
						<div className="station-tag-wrap">
							<span className="station-tag-title">
								<img src="/assets/images/drone_icon.png" alt="" className="location-card-icon" />
								{t('forest_page.tag_title', 'DFOS Forest 주요 기능')}
							</span>
							<div className="station-tags">
								{FOREST_TAG_IDS.map(id => (
									<span key={id} className="station-tag">
										<span className="station-tag-label">{t(`forest_page.tags.${id}`)}</span>
									</span>
								))}
							</div>
						</div>
					</div>
				</header>

				{/* ---------------- 슬라이더 대신: 정적 카드 리스트 ---------------- */}
				<div className="station-slider station-slider--static">
					{FOREST_SLIDES.map(slide => {
						const titleKey = `forest_page.slides.${slide.key}.title`;
						const itemsKey = `forest_page.slides.${slide.key}.items`;
						const raw = t(itemsKey, { returnObjects: true }) as unknown;
						const items = Array.isArray(raw) ? (raw as string[]) : [];

						return (
							<article key={slide.id} className="station-static-item">
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
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default Forest;
