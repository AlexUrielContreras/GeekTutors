import React from "react";
import NavList from "../Nav";
import Logo from '../../assets/logo/nerd.png'
import {Container, Row } from "react-bootstrap";
function Header(props) {
	const {currentTab, setCurrentTab} = props;
	return (
		<Container fluid className="p-0">
			<Row>
            <header className='db-header'>
            <div className="logo">
                <img src={Logo} alt='' ></img> 
            </div>  
            <h1>GeekTutor</h1>
        </header>
					<div>
						<NavList currentTab={currentTab} setCurrentTab={setCurrentTab}></NavList>
					</div>
			</Row>
		</Container>
	);
}

export default Header;