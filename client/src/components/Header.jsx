import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import RouterNavLink from './RouterNavLink';

export default function Header() {
	return (
		<Navbar className="p-4" bg="transparent" expand="lg">
			<LinkContainer to="/">
				<Navbar.Brand>ERC-20 Demo</Navbar.Brand>
			</LinkContainer>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<RouterNavLink to="/metamask">MetaMask</RouterNavLink>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}
