import React from 'react';
import './PartnerSection.css';

const logos = [
	'/src/assets/img/logo_01.png',
	'/src/assets/img/logo_02.png',
	'/src/assets/img/logo_03.png',
	'/src/assets/img/logo_04.jpg',
	'/src/assets/img/logo_05.png',
	'/src/assets/img/logo_06.gif',
	'/src/assets/img/logo_07.png',
	'/src/assets/img/logo_08.png',
	'/src/assets/img/logo_09.png',
	'/src/assets/img/logo_10.png',
	'/src/assets/img/logo_11.png',
	'/src/assets/img/logo_12.png',
	'/src/assets/img/logo_13.png',
	'/src/assets/img/logo_14.png',
	'/src/assets/img/logo_15.jpg',
	'/src/assets/img/logo_16.png',
	'/src/assets/img/logo_17.svg',
	'/src/assets/img/logo_18.svg',
];

const PartnerSection: React.FC = () => {
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
					<p className="desc">iGiS와 함께하는 파트너를 소개합니다.</p>
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
