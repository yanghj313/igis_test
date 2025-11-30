import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../assets/css/solution.css';

const FMS_SLIDES = [
	{ id: 1, key: 'fms', img: '/assets/images/solution/igis/fms/fms.png' },
	{ id: 2, key: 'place', img: '/assets/images/solution/igis/fms/kind.png' },
];

type FmsTagId = 'where' | 'layer' | 'memo' | 'out' | 'comport' | 'mobile';

const FMS_TAG_IDS: FmsTagId[] = ['where', 'layer', 'memo', 'out', 'comport', 'mobile'];

const Fms: React.FC = () => {
	const { t } = useTranslation();

	return (
		<section className="station-section igis-section">
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
							<div className="station-tags">
								{FMS_TAG_IDS.map(id => (
									<span key={id} className="station-tag">
										<span className="station-tag-label">{t(`fms_page.tags.${id}`)}</span>
									</span>
								))}
							</div>
						</div>
					</div>
				</header>

				<div className="station-slider station-slider--static">
					{FMS_SLIDES.map(slide => {
						const titleKey = `fms_page.slides.${slide.key}.title`;
						const itemsKey = `fms_page.slides.${slide.key}.items`;
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

export default Fms;
