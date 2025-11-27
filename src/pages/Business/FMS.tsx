// src/pages/Business/Fms.tsx
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

const FMS_DIFF_ITEMS: DiffItem[] = [
	{
		id: 1,
		stepKey: 'fms_diff.items.1.step',
		titleKey: 'fms_diff.items.1.title',
		leadKey: 'fms_diff.items.1.lead',
		bodyKey: 'fms_diff.items.1.body',
		img: '/assets/images/business/fms/03_01.png',
	},
	{
		id: 2,
		stepKey: 'fms_diff.items.2.step',
		titleKey: 'fms_diff.items.2.title',
		leadKey: 'fms_diff.items.2.lead',
		bodyKey: 'fms_diff.items.2.body',
		img: '/assets/images/business/fms/03_02.png',
	},
	{
		id: 3,
		stepKey: 'fms_diff.items.3.step',
		titleKey: 'fms_diff.items.3.title',
		leadKey: 'fms_diff.items.3.lead',
		bodyKey: 'fms_diff.items.3.body',
		img: '/assets/images/business/fms/03_03.png',
	},
	{
		id: 4,
		stepKey: 'fms_diff.items.4.step',
		titleKey: 'fms_diff.items.4.title',
		leadKey: 'fms_diff.items.4.lead',
		bodyKey: 'fms_diff.items.4.body',
		img: '/assets/images/business/fms/03_04.png',
	},
];

const Fms: React.FC = () => {
	const { t } = useTranslation();
	const [activeId, setActiveId] = useState<number>(1); // 처음엔 1번 열려 있게

	return (
		<section className="biz-diff-section">
			<div className="biz-diff-inner">
				{/* 상단 타이틀 */}
				<header className="biz-diff-header">
					<h2 className="biz-diff-title">
						{t('fms_diff.title_before')} <span className="highlight">{t('fms_diff.title_highlight')}</span> {t('fms_diff.title_after')}
					</h2>
					<p className="biz-diff-desc">{t('fms_diff.description')}</p>
				</header>

				{/* 아코디언 리스트 (Drone / GIS와 동일 구조·클래스) */}
				<div className="biz-diff-list">
					{FMS_DIFF_ITEMS.map(item => {
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

export default Fms;
