import React, { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import { setContext } from '@apollo/client/link/context';

// imported Components
import Header from './components/Header';
import Footer from './components/Footer'

// imported pages
import Dashboard from './clientpages/dashboard';
import Tutor from './clientpages/tutor';
import LoginForm from './clientpages/LoginForm';
import SignupForm from './clientpages/SignupForm';
import Article from "./clientpages/article"

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import 'react-calendar/dist/Calendar.css';


const httpLink = createHttpLink({
	uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('id_token');
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
})

function App() {
	const [currentTab, setCurrentTab] = useState("home");
	const [currentArticle,setCurrentArticle]=useState(null);

	const renderTab = () => {
		switch (currentTab) {
			case "home":
				return <Dashboard setCurrentTab={setCurrentTab} />;
			case "tutor":
				return <Tutor setCurrentTab={setCurrentTab} setCurrentArticle={setCurrentArticle}/>;
			case "signup":
				return <SignupForm />;
			case "login":
				return <LoginForm />;
			case "article":
				return <Article currentArticle={currentArticle}/>
			default:
				return null;
		}
	};
	
	return (
		<ApolloProvider client={client}>
			<Router>
				<div className='layout-container'>
					<Header currentTab={currentTab} setCurrentTab={setCurrentTab} />

					<main>
						{renderTab()}
					</main>
			
					<Footer />	
				</div>			
			</Router>
		</ApolloProvider>
	);
}

export default App;