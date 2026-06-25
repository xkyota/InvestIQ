import '../styles/NotFoundPage.css';

import { Link } from 'react-router-dom';

import Header from '../components/Header';

function NotFoundPage() {
	return (
		<>
			<header className="section-header">
				<Header />
			</header>

			<main className="not-found">
				<section className="not-found__content" aria-labelledby="not-found-title">
					<p className="not-found__eyebrow">Error 404</p>
					<h1 id="not-found-title">Сторінку не знайдено</h1>
					<p className="not-found__text">
						Схоже, адреса була змінена або сторінка більше не існує.
						Поверніться на головну, щоб продовжити роботу з InvestIQ.
					</p>

					<Link className="not-found__button" to="/">
						На головну
					</Link>
				</section>

				<section className="not-found__illustration" aria-hidden="true">
					<div className="not-found__chart">
						<span className="not-found__bar not-found__bar--one" />
						<span className="not-found__bar not-found__bar--two" />
						<span className="not-found__bar not-found__bar--three" />
						<span className="not-found__bar not-found__bar--four" />
					</div>
					<div className="not-found__code">404</div>
				</section>


				<span className="not-found__made-with">*built with Codex</span>
			</main>
		</>
	);
}

export default NotFoundPage;
