import './styles/App.css';

import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

// import Header from '../components/Header';
// import Registration from './Registration';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';
import TakeStockPage from './pages/TakeStockPage';
import { BudgetProvider } from './context/BudgetContext';

function App() {
	return (
		<BudgetProvider>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="*" element={<NotFoundPage />} />
				<Route path="/home" element={<MainPage />} />
				<Route path="/take-stock" element={<TakeStockPage/>}/>

			</Routes>
		</BrowserRouter>
		</BudgetProvider>
	);
}

export default App;
