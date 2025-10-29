import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
	return (
		<footer className="footer">
			<div className="footer-inner">
				{/* 로고 영역 */}
				<div className="footer-left">
					<img src="/assets/images/logo.svg" alt="iGiS Logo" className="footer-logo" />
				</div>

				{/* 회사 정보 영역 */}
				<div className="footer-center">
					<p>
						[본사] 대구광역시 수성구 알파시티2로 232, 3층 (대흥동)
						<br />
						[창원] 경상남도 창원시 성산구 용지로169번길 11-31, 제3층(동진빌딩) (용호동)
						<br />
						Tel. 070-8740-5534 &nbsp;|&nbsp; Mail. ceo@igis.co.kr
					</p>
					<p className="copy">Copyright © iGiS. All Rights Reserved</p>
				</div>

				{/* SNS 아이콘 */}
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
