// src/pages/Business/Gis.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../assets/css/business.css';

interface DiffItem {
	id: number;
	stepKey: string;
	titleKey: string;
	leadKey: string;
	bodyKey: string;
	img: string;
}

const GIS_DIFF_ITEMS: DiffItem[] = [
	{
		id: 1,
		stepKey: 'gis_diff.items.1.step',
		titleKey: 'gis_diff.items.1.title',
		leadKey: 'gis_diff.items.1.lead',
		bodyKey: 'gis_diff.items.1.body',
		img: '/assets/images/business/gis/02_01.png',
	},
	{
		id: 2,
		stepKey: 'gis_diff.items.2.step',
		titleKey: 'gis_diff.items.2.title',
		leadKey: 'gis_diff.items.2.lead',
		bodyKey: 'gis_diff.items.2.body',
		img: '/assets/images/business/gis/02_02.png',
	},
	{
		id: 3,
		stepKey: 'gis_diff.items.3.step',
		titleKey: 'gis_diff.items.3.title',
		leadKey: 'gis_diff.items.3.lead',
		bodyKey: 'gis_diff.items.3.body',
		img: '/assets/images/business/gis/02_03.png',
	},
	{
		id: 4,
		stepKey: 'gis_diff.items.4.step',
		titleKey: 'gis_diff.items.4.title',
		leadKey: 'gis_diff.items.4.lead',
		bodyKey: 'gis_diff.items.4.body',
		img: '/assets/images/business/gis/02_04.png',
	},
	{
		id: 5,
		stepKey: 'gis_diff.items.5.step',
		titleKey: 'gis_diff.items.5.title',
		leadKey: 'gis_diff.items.5.lead',
		bodyKey: 'gis_diff.items.5.body',
		img: '/assets/images/business/gis/02_05.png',
	},
];

const Gis: React.FC = () => {
	const { t } = useTranslation();
	const [activeId, setActiveId] = useState<number>(1); // 처음엔 1번 열려 있음

	return (
		<section className="biz-diff-section">
			<div className="biz-diff-inner">
				{/* 상단 타이틀 */}
				<header className="biz-diff-header">
					<h2 className="biz-diff-title">
						{t('gis_diff.title_before')} <span className="highlight">{t('gis_diff.title_highlight')}</span> {t('gis_diff.title_after')}
					</h2>
					<p className="biz-diff-desc">{t('gis_diff.description')}</p>
				</header>

				{/* 아코디언 리스트 (Drone과 동일 구조/클래스) */}
				<div className="biz-diff-list">
					{GIS_DIFF_ITEMS.map(item => {
						const isActive = activeId === item.id;

						return (
							<div
								key={item.id}
								className={'biz-diff-item biz-diff-item--' + item.id + (isActive ? ' active' : '')}
								onMouseEnter={() => setActiveId(item.id)}
								onFocus={() => setActiveId(item.id)} // 키보드 탭 대응
							>
								<div className="biz-diff-card">
									<div className="biz-diff-img-wrap">
										<img src={item.img} alt={t(item.titleKey)} className="biz-diff-img" loading="lazy" />
									</div>
									<div className="biz-diff-text">
										<div className="biz-diff-text-inner">
											<p className="biz-diff-step">{t(item.stepKey)}</p>
											<p className="biz-diff-heading">{t(item.titleKey)}</p>
											<span className="biz-col-lead">{t(item.leadKey)}</span>
											<p className="biz-diff-body">{t(item.bodyKey)}</p>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default Gis;
