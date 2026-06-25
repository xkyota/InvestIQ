import '../styles/App.css';

import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

// import Header from '../components/Header';
// import Registration from './Registration';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
