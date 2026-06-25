import '../styles/LoginPage.css';

import { GoogleOAuthProvider } from '@react-oauth/google';

import LoginDecoration from '../assets/Login-decoration.png';
import Header from '../components/Header';
import Registration from '../components/Registration';

function LoginPage() {
	return (
		<>
			<header className="section-header">
				<Header></Header>
			</header>

			<main className="login-page">
				<div className="dimmed-background">
					<div className="background-decoration"></div>
				</div>

				<div className="wrapper">
					<div className="company">
						<h1>InvestIQ</h1>
						<span>Smart Finance</span>
					</div>

					<GoogleOAuthProvider
						clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
					>
						<Registration></Registration>
					</GoogleOAuthProvider>
				</div>
			</main>

			<img className='decorations' src={LoginDecoration} alt="Decorations" />
		</>
	);
}

export default LoginPage;
