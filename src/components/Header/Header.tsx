import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import { useTranslation } from "react-i18next";

const MOBILE_BP = 1024; // CSS와 동일 분기

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // 데스크톱 hover용
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null); // 모바일 accordion용
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= MOBILE_BP);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
  const { t, i18n } = useTranslation();
  const location = useLocation();

  /** 언어 토글 */
  const toggleLang = () => {
    const newLang = i18n.language === "kor" ? "en" : "kor";
    i18n.changeLanguage(newLang);
  };

  /** 스크롤 시 헤더 배경 전환 */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /** 모바일 분기 감지 */
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= MOBILE_BP);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /** 라우트 변경 시 모바일 메뉴/아코디언 자동 접기 */
  useEffect(() => {
    setIsMenuOpen(false);
    setExpandedIndex(null);
    // 모바일에서 메뉴가 닫히면 스크롤 잠금 해제
    document.body.style.overflow = "";
  }, [location.pathname]);

  /** 모바일 메뉴 열고/닫을 때 스크롤 잠금 */
  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = isMenuOpen ? "hidden" : "";
    }
  }, [isMobile, isMenuOpen]);

  /** Hover 제어(데스크톱 전용) */
  const handleMouseEnter = (index: number) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setHoveredIndex(index);
  };
  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => setHoveredIndex(null), 200);
  };

  /** 모바일 아코디언 토글 */
  const toggleExpand = (index: number) => {
    setExpandedIndex(prev => (prev === index ? null : index));
  };

  /** 메뉴 정의 */
  const navItems = [
    {
      key: "company",
      sub: t("submenu_company", { returnObjects: true }) as string[],
      links: ["/company", "/company/award"],
    },
    {
      key: "business",
      sub: t("submenu_business", { returnObjects: true }) as string[],
      links: ["/business/dron", "/business/gis", "/business/fms", "/business/rnd"],
    },
    {
      key: "solution",
      sub: t("submenu_solution", { returnObjects: true }) as string[],
      links: ["/solution/dron", "/solution/gis"],
    },
    {
      key: "community",
      sub: t("submenu_community", { returnObjects: true }) as string[],
      links: ["/community/contact", "/community/recruitment", "/community/news", "/community/video"],
    },
  ];

  return (
    <header className={`main-header ${isScrolled ? "bg-white" : ""}`}>
      <div className="header-inner">
        {/* 로고 */}
        <div className="logo">
          <Link to="/">
            <img
              src={isScrolled ? "/assets/images/logo_bk.png" : "/assets/images/logo_wh.png"}
              alt="iGiS logo"
            />
          </Link>
        </div>

        {/* 내비게이션 */}
        <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
          {navItems.map((item, i) => {
            const isDesktopOpen = !isMobile && hoveredIndex === i;
            const isMobileOpen = isMobile && expandedIndex === i;

            return (
              <div
                key={i}
                className="nav-item"
                onMouseEnter={!isMobile ? () => handleMouseEnter(i) : undefined}
                onMouseLeave={!isMobile ? handleMouseLeave : undefined}
              >
                {/* 중메뉴 타이틀 (모바일에선 아코디언 토글 버튼) */}
                <button
                  type="button"
                  className="nav-title-btn"
                  aria-expanded={isMobileOpen}
                  onClick={isMobile ? () => toggleExpand(i) : undefined}
                  tabIndex={0}
                >
                  <span className="nav-title">{t(item.key)}</span>
                  {isMobile && (
                    <span className="accordion-toggle" aria-hidden="true">
                      {isMobileOpen ? "−" : "+"}
                    </span>
                  )}
                </button>

                {/* 소메뉴 */}
                <ul
                  className={
                    "dropdown " +
                    (isDesktopOpen || isMobileOpen ? "show" : "")
                  }
                >
                  {item.sub.map((submenu, j) => (
                    <li key={j}>
                      <Link to={item.links[j] || "#"}>{submenu}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </nav>

        {/* 오른쪽 */}
        <div className="header-right">
          <button className="lang-btn" onClick={toggleLang}>
            <img
              src={isScrolled ? "/assets/icons/earth_bg.png" : "/assets/icons/earth.png"}
              alt="language"
            />
            <span>{i18n.language === "kor" ? t("lang_kor") : t("lang_eng")}</span>
          </button>

          {/* 모바일 메뉴 토글 */}
          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(prev => !prev)}
            aria-expanded={isMenuOpen}
            aria-label="open main menu"
          >
            <img
              src={`/assets/icons/${isMenuOpen ? "xmark-solid-full" : "bars-solid"}.svg`}
              alt="menu"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
