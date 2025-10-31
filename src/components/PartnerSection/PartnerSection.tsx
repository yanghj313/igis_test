import React from 'react';
import './PartnerSection.css';
import { useTranslation } from 'react-i18next';

const logos = [
	'/assets/images/logo_01.png',
	'/assets/images/logo_02.png',
	'/assets/images/logo_03.png',
	'/assets/images/logo_04.jpg',
	'/assets/images/logo_05.png',
	'/assets/images/logo_06.png',
	'/assets/images/logo_07.png',
	'/assets/images/logo_08.png',
	'/assets/images/logo_09.png',
	'/assets/images/logo_10.png',
	'/assets/images/logo_11.png',
	'/assets/images/logo_12.png',
	'/assets/images/logo_13.png',
	'/assets/images/logo_14.png',
	'/assets/images/logo_15.jpg',
	'/assets/images/logo_16.png',
	'/assets/images/logo_17.svg',
	'/assets/images/logo_18.svg',
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
						{logos.map((logo, i) => (
							<img key={`row2-${i}`} src={logo} alt={`partner2-${i}`} />
						))}
						{logos.map((logo, i) => (
							<img key={`row2-clone-${i}`} src={logo} alt={`partner2-clone-${i}`} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default PartnerSection;
