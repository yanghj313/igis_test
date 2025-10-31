import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.css';

const Footer: React.FC = () => {
	const { t } = useTranslation();

	return (
		<footer className="footer">
			<div className="footer-inner">
				<div className="footer-left">
					<img src="/assets/images/logo.svg" alt="iGiS Logo" className="footer-logo" />
				</div>

				<div className="footer-center">
					<p>
						{t('footer_addr1')}
						<br />
						{t('footer_addr2')}
						<br />
						{t('footer_contact')}
					</p>
					<p className="copy">{t('footer_copy')}</p>
				</div>

				<div className="footer-right">
					<a href="https://www.youtube.com/@igis" target="_blank" rel="noopener noreferrer">
						<img src="/assets/icons/ytube.png" alt="YouTube" className="sns-icon" />
					</a>
					<a href="https://www.linkedin.com/company/igis" target="_blank" rel="noopener noreferrer">
						<img src="/assets/icons/link.png" alt="LinkedIn" className="sns-icon" />
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
