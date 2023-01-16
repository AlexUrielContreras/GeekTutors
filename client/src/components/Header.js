import React from "react";
import NavList from "./Nav";
import Logo from '../assets/logo/nerd.png'

function Header(props) {
	const { currentTab, setCurrentTab } = props;

	return (
			<header className='main-header'>
				<div className='header-brand'>
					<img className='header-img' src={Logo} alt='' ></img>
					<h1 class='bold-text'>GeekTutor</h1>
				</div>
				
				<NavList currentTab={currentTab} setCurrentTab={setCurrentTab} />		
			</header>
	);
}

export default Header;