import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../assets/css/SubLayout.css';

interface SubItem {
	to: string;
	label: string;
}

interface SubGroup {
	groupLabel: string;
	items: SubItem[];
}

interface SubLayoutProps {
	category: string;
	locationLabel: string;
	title: string;
	groups: SubGroup[];
	bgImage: string;
	children: React.ReactNode;
}

const SubLayout: React.FC<SubLayoutProps> = ({ category, locationLabel, title, groups, bgImage, children }) => {
	return (
		<section className="sub-layout">
			{/* Hero */}
			<div className="sub-hero" style={{ backgroundImage: `url(${bgImage})` }}>
				<p className="breadcrumb">
					{category}
					<span> · </span>
					{locationLabel}
				</p>
				<h1 className="sub-title">{title}</h1>
				{/* Tabs */}
				<nav className="sub-tabs">
					{groups[0].items.map(item => (
						<NavLink key={item.to} to={item.to} className={({ isActive }) => 'sub-tab' + (isActive ? ' active' : '')}>
							{item.label}
						</NavLink>
					))}
				</nav>
			</div>

			{/* page content */}
			<div className="sub-content">{children}</div>
		</section>
	);
};

export default SubLayout;
