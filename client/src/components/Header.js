import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <nav className="navbar" aria-label="Main Navigation">
      <div className="logo">
        <i className="fas fa-moon"></i>
        <span className="logo-text-gradient">MoonFlow</span>
      </div>
      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
        <NavLink to="/calendar" className={({ isActive }) => isActive ? 'active' : ''}>Calendar</NavLink>
        <NavLink to="/learn" className={({ isActive }) => isActive ? 'active' : ''}>Learn</NavLink>
        <NavLink to="/stats" className={({ isActive }) => isActive ? 'active' : ''}>Stats</NavLink>
        <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>Settings</NavLink>
      </div>
    </nav>
  </header>
);

export default Header; 