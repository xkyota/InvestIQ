import '../styles/Header.css';

//! Images
import defaultUser from '../assets/default-user.svg';
import logo from '../assets/logo.svg';
import separator from '../assets/separator.svg';

function Header() {
	return (
		<>
			<div className="logo-wrapper">
				<img src={logo} alt="logo" />
				<span>InvestIQ</span>
			</div>

			<div style={{display: "none"}} className="account-management">
                <img src={defaultUser} alt="Default User Icon" />
                <span id='userName'>User Name</span>

                <img className='separator' src={separator} alt="" />
                <span id='exitBtn'>Вийти</span>
            </div>
		</>
	);
}

export default Header;
