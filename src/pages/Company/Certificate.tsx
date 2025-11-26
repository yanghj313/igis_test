// src/pages/Company/Certificate.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../assets/css/certificate.css';

type CertItem = {
	id: number;
	img: string; // 이미지 경로
	i18nKey: string; // i18n 기본 키 (title / subTitle 밑에 붙여서 사용)
};

const CERT_LIST: CertItem[] = [
	{ id: 1, img: '/assets/images/cert_01/01.png', i18nKey: 'certificate_page.items.01' },
	{ id: 2, img: '/assets/images/cert_01/02.png', i18nKey: 'certificate_page.items.02' },
	{ id: 3, img: '/assets/images/cert_01/03.png', i18nKey: 'certificate_page.items.03' },
	{ id: 4, img: '/assets/images/cert_01/04.png', i18nKey: 'certificate_page.items.04' },
	{ id: 5, img: '/assets/images/cert_01/05.png', i18nKey: 'certificate_page.items.05' },
	{ id: 6, img: '/assets/images/cert_01/06.png', i18nKey: 'certificate_page.items.06' },
	{ id: 7, img: '/assets/images/cert_01/07.png', i18nKey: 'certificate_page.items.07' },
	{ id: 8, img: '/assets/images/cert_01/08.png', i18nKey: 'certificate_page.items.08' },
	{ id: 9, img: '/assets/images/cert_01/09.png', i18nKey: 'certificate_page.items.09' },
	{ id: 10, img: '/assets/images/cert_01/10.png', i18nKey: 'certificate_page.items.10' },
	{ id: 11, img: '/assets/images/cert_01/11.png', i18nKey: 'certificate_page.items.11' },
	{ id: 12, img: '/assets/images/cert_01/12.png', i18nKey: 'certificate_page.items.12' },
	{ id: 13, img: '/assets/images/cert_01/13.png', i18nKey: 'certificate_page.items.13' },
	{ id: 14, img: '/assets/images/cert_01/14.png', i18nKey: 'certificate_page.items.14' },
	{ id: 15, img: '/assets/images/cert_01/15.png', i18nKey: 'certificate_page.items.15' },
	{ id: 16, img: '/assets/images/cert_01/16.png', i18nKey: 'certificate_page.items.16' },
	{ id: 17, img: '/assets/images/cert_01/17.png', i18nKey: 'certificate_page.items.17' },
	{ id: 18, img: '/assets/images/cert_01/18.png', i18nKey: 'certificate_page.items.18' },
];

const Certificate: React.FC = () => {
	const { t } = useTranslation();

	return (
		<section className="cert_page" id="content">
			<div className="cert-inner">
				{/* 상단 타이틀 */}
				<header className="cert-header">
					<h2 className="cert-title">
						<span>{t('certificate_page.titleLine1', 'IGIS는 믿을 수 있는')}</span>
						<strong>{t('certificate_page.titleLine2', '전문 인증 기업입니다.')}</strong>
					</h2>
					<p className="cert-desc">{t('certificate_page.description')}</p>
				</header>

				{/* 인증서 그리드 */}
				<div className="cert-grid">
					{CERT_LIST.map(item => {
						const title = t(`${item.i18nKey}.title`);
						const subTitle = t(`${item.i18nKey}.subTitle`, { defaultValue: '' });

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

export default Certificate;
