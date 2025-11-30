import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../assets/css/solution.css';

const IGIS_SLIDES = [
	{ id: 1, key: 'gis', img: '/assets/images/solution/igis/igis/gis.png' },
	{ id: 2, key: 'place', img: '/assets/images/solution/igis/igis/place.png' },
];

type IgisTagId = 'interface' | 'edit' | 'data' | 'option' | 'cad' | 'format';

const IGIS_TAG_IDS: IgisTagId[] = ['interface', 'edit', 'data', 'option', 'cad', 'format'];

const Igis: React.FC = () => {
	const { t } = useTranslation();

	return (
		<section className="station-section igis-section">
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
							<div className="station-tags">
								{IGIS_TAG_IDS.map(id => (
									<span key={id} className="station-tag">
										<span className="station-tag-label">{t(`igis_page.tags.${id}`)}</span>
									</span>
								))}
							</div>
						</div>
					</div>
				</header>

				{/* ---------------- 슬라이더 대신: 정적 카드 리스트 ---------------- */}
				<div className="station-slider station-slider--static">
					{IGIS_SLIDES.map(slide => {
						const titleKey = `igis_page.slides.${slide.key}.title`;
						const itemsKey = `igis_page.slides.${slide.key}.items`;
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

export default Igis;
