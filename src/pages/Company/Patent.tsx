// src/pages/Company/Patent.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../assets/css/certificate.css';

interface AwardItem {
	id: string; // '01' ~ '13'
	img: string; // 이미지 경로
}

const awardItems: AwardItem[] = [
	{ id: '01', img: '/assets/images/certi_02/01.png' },
	{ id: '02', img: '/assets/images/certi_02/02.png' },
	{ id: '03', img: '/assets/images/certi_02/03.png' },
	{ id: '04', img: '/assets/images/certi_02/04.png' },
	{ id: '05', img: '/assets/images/certi_02/06.png' },
	{ id: '06', img: '/assets/images/certi_02/07.png' },
	{ id: '07', img: '/assets/images/certi_02/08.png' },
	{ id: '08', img: '/assets/images/certi_02/09.png' },
	{ id: '09', img: '/assets/images/certi_02/10.png' },
	{ id: '10', img: '/assets/images/certi_02/11.png' },
	{ id: '11', img: '/assets/images/certi_02/12.png' },
	{ id: '12', img: '/assets/images/certi_02/13.png' },
	{ id: '13', img: '/assets/images/certi_02/14.png' },
];

const Patent: React.FC = () => {
	const { t } = useTranslation();

	return (
		// 인증서랑 같은 스타일 쓰려고 클래스 그대로 재사용
		<section className="cert_page patent-section">
			<div className="cert-inner">
				{/* 상단 타이틀 영역 */}
				<div className="cert-header">
					<h2 className="cert-title">
						<strong>{t('award_page.titleLine1')}</strong>
					</h2>
					<p className="cert-desc">{t('award_page.description')}</p>
				</div>

				{/* 썸네일 그리드 */}
				<div className="cert-grid">
					{awardItems.map(item => {
						// id로 i18n key 조합
						const baseKey = `award_page.items.${item.id}`;
						const title = t(`${baseKey}.title`);
						const subTitle = t(`${baseKey}.subTitle`, { defaultValue: '' }); // 서브타이틀 없으면 자동으로 ''

						return (
							<article key={item.id} className="cert-item">
								<div className="cert-thumb">
									<img src={item.img} alt={title} loading="lazy" />
								</div>
								<div className="cert-text">
									<span className="cert-bar" />
									<h3 className="cert-name">{title}</h3>
									{subTitle && <p className="cert-sub">{subTitle}</p>}
								</div>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default Patent;
