import '../styles/Registration.css';

import { useState } from 'react';

import { GoogleLogin } from '@react-oauth/google';

function Registration() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function handleLogin(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
	}

	return (
		<div className='registration'>
			<span>Ви можете авторизуватися за допомогою акаунта Google</span>

			<GoogleLogin 
				onSuccess={(credentialResponse) => {
					console.log(credentialResponse.credential);
				}}
				onError={() => {
					console.log("Login Failed");
				}}
			/>

			<span>
				Або увійти за допомогою ел. пошти та праолю після реєстрації
			</span>

			<form onSubmit={handleLogin}>
				<div>
					<label htmlFor="email">Електронна пошта:</label>

					<input
						id="email"
						type="email"
						placeholder="your@email.com"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
				</div>

				<div>
					<label htmlFor="password">Пароль:</label>

					<input
						id="password"
						type="password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
				</div>

				<div>
					<button type="submit">УВІЙТИ</button>

					<button type="button">РЕЄСТРАЦІЯ</button>
				</div>
			</form>
		</div>
	);
}

export default Registration;
