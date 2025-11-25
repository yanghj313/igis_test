import React, { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import '../../assets/css/vision.css';

const Vision: React.FC = () => {
	// common이 defaultNS라면 인자 없이 써도 됨
	const { t } = useTranslation();

	const visionItems = [
		{
			id: 'innovate',
			label: 'INNOVATE',
			desc: t('vision_page.items.innovate'),
			img: '/assets/images/company/vision_01.png',
		},
		{
			id: 'grit',
			label: 'GRIT',
			desc: t('vision_page.items.grit'),
			img: '/assets/images/company/vision_02.png',
		},
		{
			id: 'integrity',
			label: 'INTEGRITY',
			desc: t('vision_page.items.integrity'),
			img: '/assets/images/company/vision_03.png',
		},
		{
			id: 'serve',
			label: 'SERVE',
			desc: t('vision_page.items.serve'),
			img: '/assets/images/company/vision_04.png',
		},
	];

	return (
		<section className="vision-section">
			<div className="vision-inner">
				<div className="vision-head">
					<h2 className="vision-kicker">{t('vision_page.kicker')}</h2>
					<h2 className="vision-title-main">{t('vision_page.main')}</h2>
					<p className="vision-intro">
						{t('vision_page.intro1')}
						<br />
						{t('vision_page.intro2')}
					</p>
				</div>

				<ul className="vision-list">
					{visionItems.map((item, index) => {
						const delayStyle: CSSProperties = {
							animationDelay: `${index * 0.15}s`,
						};
						return (
							<li key={item.id} className="vision-item" style={delayStyle}>
								<div className="vision-card">
									<img src={item.img} alt={item.label} className="vision-img" />
									<div className="vision-content">
										<p className="vision-word">
											<span className="vision-first">{item.label.charAt(0)}</span>
											{item.label.slice(1)}
										</p>
										<p className="vision-desc">{item.desc}</p>
									</div>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
};

export default Vision;
