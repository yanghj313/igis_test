import React from 'react';
import { NavLink } from 'react-router-dom';
import './SubNav.css';

const SubNav = ({ items }) => (
  <nav className="sub-nav">
    {items.map((item, i) => (
      <NavLink key={i} to={item.link} className={({ isActive }) => (isActive ? 'active' : '')}>
        {item.label}
      </NavLink>
    ))}
  </nav>
);

export default SubNav;