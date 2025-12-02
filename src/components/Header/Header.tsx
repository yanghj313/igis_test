import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import { useTranslation } from 'react-i18next';

const MOBILE_BP = 1024;

const Header: React.FC = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
	const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= MOBILE_BP);
	const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
	const { t, i18n } = useTranslation();
	const location = useLocation();

	const toggleLang = () => {
		const newLang = i18n.language === 'kor' ? 'en' : 'kor';
		i18n.changeLanguage(newLang);
	};

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 50);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		const onResize = () => setIsMobile(window.innerWidth <= MOBILE_BP);
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	}, []);

	useEffect(() => {
		setIsMenuOpen(false);
		setExpandedIndex(null);
		document.body.style.overflow = '';
	}, [location.pathname]);

	useEffect(() => {
		if (isMobile) {
			document.body.style.overflow = isMenuOpen ? 'hidden' : '';
		}
	}, [isMobile, isMenuOpen]);

	const handleMouseEnter = (index: number) => {
		if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
		setHoveredIndex(index);
	};
	const handleMouseLeave = () => {
		hoverTimeout.current = setTimeout(() => setHoveredIndex(null), 200);
	};

	const toggleExpand = (index: number) => {
		setExpandedIndex(prev => (prev === index ? null : index));
	};

	const navItems = [
		{
			key: 'company',
			sub: t('submenu_company', { returnObjects: true }) as string[],
			links: ['/company/intro/vision', '/company/award/certificate'],
		},
		{
			key: 'business',
			sub: t('submenu_business', { returnObjects: true }) as string[],
			links: ['/business/drone', '/business/gis', '/business/fms', '/business/rnd'],
		},
		{
			key: 'solution',
			sub: t('submenu_solution', { returnObjects: true }) as string[],
			links: ['/solution/drone/station', '/solution/gis/igis'],
		},
		{
			key: 'community',
			sub: t('submenu_community', { returnObjects: true }) as string[],
			links: ['/community/contact', '/community/recruitment', '/community/news', '/community/video'],
		},
	];

	return (
		<>
			{/* ✅ 모바일 메뉴 오픈 시, 바깥 클릭용 오버레이 */}
			{isMobile && isMenuOpen && <div className="nav-overlay" onClick={() => setIsMenuOpen(false)} />}

			<header className={`main-header ${isScrolled ? 'bg-white' : ''}`}>
				<div className="header-inner">
					<div className="logo">
						<Link to="/">
							<img src={isScrolled ? '/assets/images/logo_bk.png' : '/assets/images/logo_wh.png'} alt="iGiS logo" />
						</Link>
					</div>

					<nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
						{navItems.map((item, i) => {
							const isDesktopOpen = !isMobile && hoveredIndex === i;
							const isMobileOpen = isMobile && expandedIndex === i;

							return (
								<div key={i} className="nav-item" onMouseEnter={!isMobile ? () => handleMouseEnter(i) : undefined} onMouseLeave={!isMobile ? handleMouseLeave : undefined}>
									<button type="button" className="nav-title-btn" aria-expanded={isMobileOpen} onClick={isMobile ? () => toggleExpand(i) : undefined} tabIndex={0}>
										<span className="nav-title">{t(item.key)}</span>
										{isMobile && (
											<span className="accordion-toggle" aria-hidden="true">
												{isMobileOpen ? '−' : '+'}
											</span>
										)}
									</button>

									<ul className={'dropdown ' + (isDesktopOpen || isMobileOpen ? 'show' : '')}>
										{item.sub.map((submenu, j) => (
											<li key={j}>
												<Link to={item.links[j] || '#'}>{submenu}</Link>
											</li>
										))}
									</ul>
								</div>
							);
						})}
					</nav>

					<div className="header-right">
						<button className="lang-btn" onClick={toggleLang}>
							<img src={isScrolled ? '/assets/icons/earth_bg.png' : '/assets/icons/earth.png'} alt="language" />
							<span>{i18n.language === 'kor' ? t('lang_kor') : t('lang_eng')}</span>
						</button>

						<button className="menu-toggle" onClick={() => setIsMenuOpen(prev => !prev)} aria-expanded={isMenuOpen} aria-label="open main menu">
							<img src={`/assets/icons/${isMenuOpen ? 'xmark-solid-full' : 'bars-solid'}.svg`} alt="menu" />
						</button>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
