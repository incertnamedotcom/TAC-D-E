import { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine which logo to show
  const getLogo = () => {
    if (location.pathname.startsWith("/careers/navy")) {
      return "https://i.imgur.com/fbWOWAr.png"; // Navy
    }
    if (location.pathname.startsWith("/careers/airforce")) {
      return "https://i.imgur.com/AVdhzvR.png"; // Air Force
    }
    if (location.pathname.startsWith("/careers/army")) {
      return "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/160th_SOAR_emblem.svg/960px-160th_SOAR_emblem.svg.png"; // Army
    }
    // Default TACDEV logo
    return "https://i.imgur.com/xEtxsCw.png";
  };

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-4 flex items-center justify-between transition-all duration-500 ${
        scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img 
          src={getLogo()} 
          alt="Logo" 
          className="h-14 md:h-16 w-auto object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300" 
        />
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-10 text-sm font-medium tracking-widest">
        <Link 
          to="/careers" 
          className={`hover:text-[#b91c1c] transition-colors duration-200 ${isActive('/careers') ? 'text-[#b91c1c]' : 'text-white'}`}
        >
          CAREERS
        </Link>

        <Link 
          to="/videos" 
          className={`hover:text-[#b91c1c] transition-colors duration-200 ${isActive('/videos') ? 'text-[#b91c1c]' : 'text-white'}`}
        >
          VIDEOS
        </Link>

        <Link 
          to="/gallery" 
          className={`hover:text-[#b91c1c] transition-colors duration-200 ${isActive('/gallery') ? 'text-[#b91c1c]' : 'text-white'}`}
        >
          GALLERY
        </Link>
      </div>

      {/* APPLY NOW */}
      <div className="hidden md:block">
        <Link
          to="/apply"
          className="text-white hover:text-[#b91c1c] font-semibold text-sm tracking-widest transition-colors duration-200"
        >
          APPLY NOW
        </Link>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <button className="text-white text-2xl">☰</button>
      </div>
    </nav>
  );
};

export default Navbar;