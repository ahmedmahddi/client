import { ReactElement, useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import somatrapLogo from "../../../assets/loogoo.png";

const Header = (): ReactElement => {
    const location = useLocation();
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const [isFixed, setIsFixed] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const navRef = useRef<HTMLDivElement>(null);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    const isActive = (href: string) => {
        const cleanHref = href.replace(/^\.\/|\.html$/g, "");
        return location.pathname.replace(/^\/|\/$/g, "") === cleanHref;
    };

    useEffect(() => {
        const handleScroll = () => {
            const stickyHeader = document.querySelector('.sticky-header');
            if (stickyHeader) {
                const headerOffset = stickyHeader.getBoundingClientRect().top + window.scrollY;
                setIsFixed(window.scrollY > headerOffset);
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setIsNavCollapsed(true);
            }
        };

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleLinkClick = () => {
        setIsNavCollapsed(true);
    };

    return (
        <header className="site-header mo-left header-transparent overlay header navstyle6">
            <div className={`sticky-header main-bar-wraper navbar-expand-lg ${isFixed ? 'is-fixed' : ''}`}>
                <div className="main-bar clearfix" style={{height:"80px"}}>
                    <div className="container clearfix">
                        <div className="logo-header mostion logo-white">
                            <Link to="/index" onClick={handleLinkClick}>
                                <img src={somatrapLogo} alt="Somatrap Logo" />
                            </Link>
                        </div>
                        <div className="extra-nav">
                            <div className="extra-cell">
                                <div className="site-button-a">
                                    <Link to="/formulaire" className="site-button btnhover20" onClick={handleLinkClick}>
                                        Demande de devis
                                    </Link>
                                </div>
                                <button
                                    className={`navbar-toggler ${isNavCollapsed ? 'collapsed' : ''} navicon justify-content-end`}
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#navbarNavDropdown"
                                    aria-controls="navbarNavDropdown"
                                    aria-expanded={!isNavCollapsed}
                                    aria-label="Toggle navigation"
                                    onClick={handleNavCollapse}
                                >
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </button>
                            </div>
                        </div>
                        <div
                            ref={navRef}
                            className={`header-nav navbar-collapse collapse justify-content-center ${isNavCollapsed ? '' : 'show'}`}
                            id="navbarNavDropdown"
                        >
                            <div className="logo-header d-md-block d-lg-none">
                                <Link to="/" onClick={handleLinkClick}>
                                    <img src={somatrapLogo} alt="Somatrap Logo" />
                                </Link>
                            </div>
                            <ul className={`nav navbar-nav ${isMobile ? 'text-center' : ''}`}>
                                {["", "about", "services", "gallery", "contact"].map((path) => (
                                    <li key={path} className={`${path === "" ? "has-mega-menu homedemo" : path === "services" ? "has-mega-menu" : ""} ${!isMobile && isActive(path) ? "active" : ""}`}>
                                        <Link to={path === "" ? "/" : `/${path}`} onClick={handleLinkClick}>
                                            {path === "" ? "ACCUEIL" : 
                                             path === "about" ? "A PROPOS" : 
                                             path === "services" ? "SERVICES" : 
                                             path === "gallery" ? "PORTFOLIO" : "NOUS JOINDRE"}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className="dlab-social-icon">
                                <ul>
                                    {["facebook-f", "twitter", "linkedin-in", "instagram"].map((social) => (
                                        <li key={social}>
                                            <Link to="#" className={`site-button circle bg-primary fab fa-${social}`} onClick={handleLinkClick}></Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;