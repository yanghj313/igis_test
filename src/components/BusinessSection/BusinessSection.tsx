import React, { useState } from 'react';
import './BusinessSection.css';

const businessData = [
	{
		id: 1,
		title: 'DFOS 드론 플랫폼',
		desc: '보유 중인 기술과 솔루션을 용역 및 제안 사업에 적용하여 고객의 전문성과 역량 강화를 제시합니다.',
		img: '/assets/images/busi_01.png',
		link: '#',
	},
	{
		id: 2,
		title: 'GIS 시스템',
		desc: '고객의 니즈를 이해하고 최적의 GIS 시스템 판매를 목표로 하고 있습니다.',
		img: '/assets/images/busi_02.png',
		link: '#',
	},
	{
		id: 3,
		title: 'FMS 시스템',
		desc: '고객에 맞춤형 지리정보 시스템을 구축하여 최적의 솔루션 및 서비스를 제공합니다.',
		img: '/assets/images/busi_03.png',
		link: '#',
	},
	{
		id: 4,
		title: 'R&D 및 운영 시스템',
		desc: '첨단 기술 기반 연구개발과 운영 시스템 통합 지원하며 보유 중인 기술과 솔루션을 용역 및 제안 사업에 적용하여 고객의 전문성과 역량 강화를 제시합니다.',
		img: '/assets/images/busi_04.png',
		link: '#',
	},
];

const BusinessSection: React.FC = () => {
	const [activeIndex, setActiveIndex] = useState<number>(0);

	return (
		<section className="section business">
			<div className="inner">
				<div className="business-header">
					<h3 className="sec-title">
						<span>
							<span className="point_color">B</span>USINESS
						</span>
						<span className="dot point_color">.</span>
					</h3>
					<p className="desc">
						IT 분야의 전문 기술력과 산업에 대한 통찰력을 기반으로 <br />
						글로벌 선도기업으로 도약해 나가겠습니다.
					</p>
				</div>

				<div className="business-wrap">
					{businessData.map((item, idx) => (
						<div key={item.id} className={`business-item ${activeIndex === idx ? 'active' : ''}`} style={{ backgroundImage: `url(${item.img})` }} onMouseEnter={() => setActiveIndex(idx)}>
							<div className="overlay" />
							<div className="business-content">
								<h4 className="title">{item.title}</h4>
								<div className="desc-wrap">
									<p>{item.desc}</p>
									<a href={item.link} className="more-btn">
										MORE VIEW +
									</a>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default BusinessSection;
