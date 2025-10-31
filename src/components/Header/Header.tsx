import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
	const { t, i18n } = useTranslation();

	/** ✅ 언어 토글 */
	const toggleLang = () => {
		const newLang = i18n.language === 'kor' ? 'en' : 'kor';
		i18n.changeLanguage(newLang);
	};

	/** ✅ 스크롤 시 헤더 배경 전환 */
	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 50);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	/** ✅ Hover 메뉴 제어 */
	const handleMouseEnter = (index: number) => {
		if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
		setHoveredIndex(index);
	};

	const handleMouseLeave = () => {
		hoverTimeout.current = setTimeout(() => setHoveredIndex(null), 200);
	};

	/** ✅ 메뉴 구조 (언어별로 자동 로드) */
	const navItems = [
		{
			key: 'company',
			sub: t('submenu_company', { returnObjects: true }) as string[],
			links: ['/company', '/award'],
		},
		{
			key: 'business',
			sub: t('submenu_business', { returnObjects: true }) as string[],
			links: ['/business/dron', '/business/gis', '/business/fms', '/business/rnd'],
		},
		{
			key: 'solution',
			sub: t('submenu_solution', { returnObjects: true }) as string[],
			links: ['/solution/dron', '/solution/gis'],
		},
		{
			key: 'community',
			sub: t('submenu_community', { returnObjects: true }) as string[],
			links: ['/contact', '/recruit', '/news'],
		},
	];

	return (
		<header className={`main-header ${isScrolled ? 'bg-white' : ''}`}>
			<div className="header-inner">
				{/* ✅ 로고 */}
				<div className="logo">
					<Link to="/">
						<img src={isScrolled ? '/assets/images/logo_bk.png' : '/assets/images/logo_wh.png'} alt="iGiS logo" />
					</Link>
				</div>

				{/* ✅ 네비게이션 */}
				<nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
					{navItems.map((item, i) => (
						<div key={i} className="nav-item" onMouseEnter={() => handleMouseEnter(i)} onMouseLeave={handleMouseLeave}>
							{/* 중메뉴 타이틀 */}
							<span className="nav-title">{t(item.key)}</span>

							{/* 소메뉴 */}
							<ul className={`dropdown ${hoveredIndex === i ? 'show' : ''}`}>
								{item.sub.map((submenu, j) => (
									<li key={j}>
										<Link to={item.links[j] || '#'}>{submenu}</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</nav>

				{/* ✅ 오른쪽 영역 */}
				<div className="header-right">
					{/* 언어 전환 버튼 */}
					<button className="lang-btn" onClick={toggleLang}>
						<img src={isScrolled ? '/assets/icons/earth_bg.png' : '/assets/icons/earth.png'} alt="language" />
						<span>{i18n.language === 'kor' ? t('lang_kor') : t('lang_eng')}</span>
					</button>

					{/* 모바일 메뉴 토글 */}
					<button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
						<img src={`/assets/icons/${isMenuOpen ? 'xmark-solid-full' : 'bars-solid'}.svg`} alt="menu" />
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
