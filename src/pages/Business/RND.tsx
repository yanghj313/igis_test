// src/pages/Business/RND.tsx
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

const RND_DIFF_ITEMS: DiffItem[] = [
	{
		id: 1,
		stepKey: 'rnd_diff.items.1.step',
		titleKey: 'rnd_diff.items.1.title',
		leadKey: 'rnd_diff.items.1.lead',
		bodyKey: 'rnd_diff.items.1.body',
		img: '/assets/images/business/rnd/04_01.png',
	},
	{
		id: 2,
		stepKey: 'rnd_diff.items.2.step',
		titleKey: 'rnd_diff.items.2.title',
		leadKey: 'rnd_diff.items.2.lead',
		bodyKey: 'rnd_diff.items.2.body',
		img: '/assets/images/business/rnd/04_02.png',
	},
];

const RND: React.FC = () => {
	const { t } = useTranslation();
	const [activeId, setActiveId] = useState<number>(1); // 처음엔 1번 열려있게

	return (
		<section className="biz-diff-section">
			<div className="biz-diff-inner">
				{/* 상단 텍스트 */}
				<header className="biz-diff-header">
					<h2 className="biz-diff-title">
						{t('rnd_diff.title_before')} <span className="highlight">{t('rnd_diff.title_highlight')}</span> {t('rnd_diff.title_after')}
					</h2>
					<p className="biz-diff-desc">{t('rnd_diff.description')}</p>
				</header>

				{/* 아코디언 리스트 */}
				<div className="biz-diff-list biz-diff-list-rnd">
					{RND_DIFF_ITEMS.map(item => {
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

export default RND;
