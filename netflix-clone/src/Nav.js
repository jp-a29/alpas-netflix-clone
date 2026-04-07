import React, { useEffect, useState } from "react";
import "./Nav.css";

function Nav({ searchTerm, setSearchTerm }) {
  const [show, setShow] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>

      <div className="nav__left">
        <img
          className="nav__logo"
          src="https://res.cloudinary.com/deakiaxyz/image/upload/v1774883554/Screenshot_2026-03-30_230241_1_ldwixi.png"
          alt="Netflix Logo"
        />

        <ul className={`nav__menu ${menuOpen && "nav__menu--active"}`}>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
        </ul>
      </div>

      <div className="nav__right">

        <div className="nav__icon" onClick={() => setSearchOpen(!searchOpen)}>🔍︎</div>
        {searchOpen && (
          <input
            type="text"
            className="nav__search"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
        )}

        <div className="nav__icon">🕭</div>

        <div
          className="nav__profile"
          onClick={() => setProfileOpen(!profileOpen)}
        >
          <img
            className="nav__avatar"
            src="https://res.cloudinary.com/deakiaxyz/image/upload/v1775092328/Screenshot_2026-04-02_091139_udctxz.png"
            alt="User Avatar"
          />
          {profileOpen && (
            <div className="nav__dropdown">
              <p>Account</p>
              <p>Settings</p>
              <p>Logout</p>
            </div>
          )}
        </div>

        <div
          className="nav__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>
      </div>
    </div>
  );
}

export default Nav;