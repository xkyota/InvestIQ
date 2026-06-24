import '../styles/App.css';

import { GoogleOAuthProvider } from '@react-oauth/google';

import Header from '../components/Header';
import Registration from './Registration';

function App() {
	return (
		<GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
			<header className="section-header">
				<Header></Header>
			</header>
			<Registration></Registration>
		</GoogleOAuthProvider>
	);
}

export default App;
