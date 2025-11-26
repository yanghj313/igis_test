import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../assets/css/certificate.css';

interface AwardItem {
	id: string; // '01' ~ '13'
	img: string;
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

const Award: React.FC = () => {
	const { t } = useTranslation();

	return (
		// 인증서랑 같은 스타일 쓰려고 클래스 그대로 재사용
		<section className="certificate-section award-section">
			<div className="certificate-inner">
				{/* 상단 타이틀 영역 */}
				<div className="certificate-header">
					<h2 className="cert-title">{t('award_page.titleLine1')}</h2>
					<p className="certificate-desc">{t('award_page.description')}</p>
				</div>

				{/* 썸네일 그리드 */}
				<div className="certificate-grid">
					{awardItems.map(item => (
						<div className="certificate-item" key={item.id}>
							<div className="certificate-img-wrap">
								{/* 왼쪽 파란 세로 바 */}
								<span className="certificate-bar" />
								{/* 호버 시 사각형 라인 그려지는 박스 (인증서랑 동일 CSS) */}
								<div className="certificate-img-border">
									<img src={item.img} alt={t(`award_page.items.${item.id}.title`)} className="certificate-img" />
								</div>
							</div>
							<div className="certificate-caption">
								<p className="certificate-title-text">{t(`award_page.items.${item.id}.title`)}</p>
								<p className="certificate-subtitle-text">{t(`award_page.items.${item.id}.subTitle`)}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Award;
