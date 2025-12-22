// src/pages/Business/Drone.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../assets/css/business.css';
import { Helmet } from 'react-helmet-async';

<Helmet>
	<title>사업분야 | IGIS</title>
	<meta name="description" content="IGIS 사업분야 페이지입니다." />
	<meta property="og:title" content="사업분야 | IGIS" />
	<meta property="og:description" content="IGIS 사업분야 페이지입니다." />
</Helmet>;

interface DiffItem {
	id: number;
	stepKey: string;
	titleKey: string;
	leadKey: string;
	bodyKey: string;
	img: string;
}

const DRONE_DIFF_ITEMS: DiffItem[] = [
	{
		id: 1,
		stepKey: 'drone_diff.items.1.step',
		titleKey: 'drone_diff.items.1.title',
		bodyKey: 'drone_diff.items.1.body',
		leadKey: 'drone_diff.items.1.lead',
		img: '/assets/images/business/drone/01_01.png',
	},
	{
		id: 2,
		stepKey: 'drone_diff.items.2.step',
		titleKey: 'drone_diff.items.2.title',
		leadKey: 'drone_diff.items.2.lead',
		bodyKey: 'drone_diff.items.2.body',
		img: '/assets/images/business/drone/01_02.png',
	},
	{
		id: 3,
		stepKey: 'drone_diff.items.3.step',
		titleKey: 'drone_diff.items.3.title',
		leadKey: 'drone_diff.items.3.lead',
		bodyKey: 'drone_diff.items.3.body',
		img: '/assets/images/business/drone/01_03.png',
	},
	{
		id: 4,
		stepKey: 'drone_diff.items.4.step',
		titleKey: 'drone_diff.items.4.title',
		leadKey: 'drone_diff.items.4.lead',
		bodyKey: 'drone_diff.items.4.body',
		img: '/assets/images/business/drone/01_04.png',
	},
	{
		id: 5,
		stepKey: 'drone_diff.items.5.step',
		titleKey: 'drone_diff.items.5.title',
		leadKey: 'drone_diff.items.5.lead',
		bodyKey: 'drone_diff.items.5.body',
		img: '/assets/images/business/drone/01_05.png',
	},
];

const Drone: React.FC = () => {
	const { t } = useTranslation();
	const [activeId, setActiveId] = useState<number>(1); // 처음엔 1번 열려있게

	return (
		<section className="biz-diff-section">
			<div className="biz-diff-inner">
				{/* 상단 텍스트 */}
				<header className="biz-diff-header">
					<h2 className="biz-diff-title">
						{t('drone_diff.title_before')} <span className="highlight">{t('drone_diff.title_highlight')}</span> {t('drone_diff.title_after')}
					</h2>
					<p className="biz-diff-desc">{t('drone_diff.description')}</p>
				</header>

				{/* 아코디언 리스트 */}
				<div className="biz-diff-list">
					{DRONE_DIFF_ITEMS.map(item => {
						const isActive = activeId === item.id;

						return (
							<div key={item.id} className={'biz-diff-item biz-diff-item--' + item.id + (isActive ? ' active' : '')} onMouseEnter={() => setActiveId(item.id)} onFocus={() => setActiveId(item.id)}>
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
											<span className="biz-diff-deco">
												<img src="/assets/images/business/igis-back.png" alt="" />
											</span>
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

export default Drone;
