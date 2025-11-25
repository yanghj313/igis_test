// src/pages/Company/Organization.tsx (경로는 프로젝트 구조에 맞게)

import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../assets/css/organization.css';

const Organization: React.FC = () => {
	const { t, i18n } = useTranslation();

	const lang = i18n.language;
	const isKor = lang === 'kor' || lang.startsWith('ko');

	// 데스크탑용 조직도
	const desktopChart = isKor ? '/assets/images/company/organi_02.png' : '/assets/images/company/organi_03.png';

	// 모바일용 조직도 (두 장)
	const mobileChart1 = isKor ? '/assets/images/company/organi_02_Resposive_01.png' : '/assets/images/company/organi_03_Resposive_01.png';

	const mobileChart2 = isKor ? '/assets/images/company/organi_02_Resposive_02.png' : '/assets/images/company/organi_03_Resposive_02.png';

	return (
		<section className="organization-section">
			<div className="organization-inner">
				<h2>
					<span>{t('organization_page.titleLine1')}</span>
					<br />
					<strong>{t('organization_page.titleLine2')}</strong>
				</h2>
				{/* 상단 배너 */}
				<header className="org-banner">
					<div className="org-banner-content">
						<p className="org-banner-desc">{t('organization_page.description')}</p>
					</div>
				</header>

				{/* 조직도 영역 */}
				<div className="org-chart-wrapper">
					{/* 데스크탑용: 한 장짜리 조직도 */}
					<div className="org-chart-image org-chart-desktop">
						<img src={desktopChart} alt={t('organization_page.chartAlt')} />
					</div>

					{/* 모바일용: 두 장으로 나뉜 조직도 */}
					<div className="org-chart-image org-chart-mobile">
						<img src={mobileChart1} alt={t('organization_page.chartAlt')} />
						<img src={mobileChart2} alt={t('organization_page.chartAlt')} />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Organization;
