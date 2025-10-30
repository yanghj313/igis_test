import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

	// 스크롤 시 헤더 스타일 변경
	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 50);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// 드롭다운 hover 제어
	const handleMouseEnter = (i: number) => {
		if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
		setHoveredIndex(i);
	};

	const handleMouseLeave = () => {
		hoverTimeout.current = setTimeout(() => setHoveredIndex(null), 300);
	};

	const navItems = [
		{
			title: 'Company',
			sub: ['기업소개', '인증 및 수상'],
			links: ['/company', '/award'],
		},
		{
			title: 'Business',
			sub: ['드론', 'GIS 시스템', 'FMS', 'R&D 및 용역'],
			links: ['/business/dron', '/business/gis', '/business/fms', '/business/rnd'],
		},
		{
			title: 'Solution',
			sub: ['드론 솔루션', 'GIS 솔루션'],
			links: ['/solution/dron', '/solution/gis'],
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
						<div key={i} className="nav-item" onMouseEnter={() => handleMouseEnter(i)} onMouseLeave={handleMouseLeave}>
							<span className="nav-title">{item.title}</span>
							<ul className={`dropdown ${hoveredIndex === i ? 'show' : ''}`}>
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
