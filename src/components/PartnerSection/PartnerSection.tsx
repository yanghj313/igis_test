import React from 'react';
import './PartnerSection.css';
import { useTranslation } from 'react-i18next';

const logos = [
	'/assets/partners_logo/logo_01.png',
	'/assets/partners_logo/logo_02.png',
	'/assets/partners_logo/logo_03.png',
	'/assets/partners_logo/logo_04.png',
	'/assets/partners_logo/logo_05.png',
	'/assets/partners_logo/logo_06.png',
	'/assets/partners_logo/logo_07.png',
	'/assets/partners_logo/logo_08.png',
	'/assets/partners_logo/logo_09.png',
	'/assets/partners_logo/logo_10.png',
];

const logs = [
	'/assets/partners_logo/logo_11.png',
	'/assets/partners_logo/logo_12.png',
	'/assets/partners_logo/logo_13.png',
	'/assets/partners_logo/logo_14.png',
	'/assets/partners_logo/logo_15.png',
	'/assets/partners_logo/logo_16.png',
	'/assets/partners_logo/logo_17.png',
	'/assets/partners_logo/logo_18.png',
	'/assets/partners_logo/logo_19.png',
	'/assets/partners_logo/logo_20.svg',
];

const PartnerSection: React.FC = () => {
	const { t } = useTranslation();
	return (
		<section className="section partners">
			<div className="inner">
				<div className="partners-header">
					<h3 className="sec-title">
						<span>
							<span className="point_color">P</span>ARTNERS
						</span>
						<span className="point_color">.</span>
					</h3>
					<p className="desc">{t('partner_desc')}</p>
				</div>

				{/* 첫 번째 마키 */}
				<div className="logo-marquee marquee-left">
					<div className="logo-track">
						{logos.map((logo, i) => (
							<img key={`row1-${i}`} src={logo} alt={`partner-${i}`} />
						))}
						{/* 무한루프용 복제 */}
						{logos.map((logo, i) => (
							<img key={`row1-clone-${i}`} src={logo} alt={`partner-clone-${i}`} />
						))}
					</div>
				</div>

				{/* 두 번째 마키 (반대 방향) */}
				<div className="logo-marquee marquee-right">
					<div className="logo-track">
						{logs.map((log, i) => (
							<img key={`row2-${i}`} src={log} alt={`partner2-${i}`} />
						))}
						{logs.map((log, i) => (
							<img key={`row2-clone-${i}`} src={log} alt={`partner2-clone-${i}`} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default PartnerSection;
