import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MetaMaskPage from './pages/MetaMaskPage';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';

import './App.css';

export default function App() {
	return (
		<Router>
			<Header />
			<Container>
				<Switch>
					<Route exact path="/">
						<HomePage />
					</Route>
					<Route path="/metamask">
						<MetaMaskPage />
					</Route>
				</Switch>
			</Container>
			<Footer />
		</Router>
	);
}
