import '../styles/Header.css';

import { Link } from 'react-router';

//! Images
import defaultUser from '../assets/default-user.svg';
import logo from '../assets/logo.svg';
import separator from '../assets/separator.svg';

type HeaderProps = {
	showAccount?: boolean;
};

function Header({ showAccount = false }: HeaderProps) {
	return (
		<>
			<div className="logo-wrapper">
				<img src={logo} alt="logo" />
				<span>InvestIQ</span>
			</div>

			<div
				className="account-management"
				style={{ display: showAccount ? 'flex' : 'none' }}
			>
				<img src={defaultUser} alt="Default User Icon" />
				<span id="userName">User Name</span>

				<img className="separator" src={separator} alt="" />

				<Link to="/" id="exitBtn">Вийти</Link>
			</div>
		</>
	);
}

export default Header;
