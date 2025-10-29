import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleScroll = () => {
		if (window.scrollY > 50) setIsScrolled(true);
		else setIsScrolled(false);
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const navItems = [
		{
			title: 'Company',
			sub: ['기업소개', '인증 및 수상'],
			links: ['/company', '/award'],
		},
		{
			title: 'Business',
			sub: ['GIS 시스템', '드론', 'FMS', 'R&D 및 용역'],
			links: ['/business/gis', '/business/dron', '/business/fms', '/business/rnd'],
		},
		{
			title: 'Solution',
			sub: ['GIS 솔루션', '드론 솔루션'],
			links: ['/solution/gis', '/solution/dron'],
		},
		{
			title: 'Community',
			sub: ['문의', '채용', '뉴스 및 홍보영상'],
			links: ['/contact', '/recruit', '/news'],
		},
	];

	return (
		<header className={`main-header ${isScrolled ? 'bg-white' : ''}`}>
			<div className="header-inner">
				{/* 로고 */}
				<div className="logo">
					<Link to="/">
						<img src={isScrolled ? '/assets/images/logo_bk.png' : '/assets/images/logo_wh.png'} alt="iGiS logo" />
					</Link>
				</div>

				{/* 네비게이션 */}
				<nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
					{navItems.map((item, i) => (
						<div key={i} className="nav-item">
							<span className="nav-title">{item.title}</span>
							<ul className="dropdown">
								{item.sub.map((s, j) => (
									<li key={j}>
										<Link to={item.links[j]}>{s}</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</nav>

				{/* 오른쪽 영역 */}
				<div className="header-right">
					<button className="lang-btn">
						<img src={isScrolled ? '/assets/icons/earth_bg.png' : '/assets/icons/earth.png'} alt="iGiS language" />
						<span>KOR</span>
					</button>

					<button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
						<img src={`/assets/icons/${isMenuOpen ? 'xmark-solid-full' : 'bars-solid'}.svg`} alt="menu" />
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
