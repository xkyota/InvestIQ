import '../styles/TakeStockPage.css';

import { useState } from 'react';

import {
  FiArrowLeft,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import { useBudget } from '../context/BudgetContext';

const monthNames = [
	"СІЧЕНЬ",
	"ЛЮТИЙ",
	"БЕРЕЗЕНЬ",
	"КВІТЕНЬ",
	"ТРАВЕНЬ",
	"ЧЕРВЕНЬ",
	"ЛИПЕНЬ",
	"СЕРПЕНЬ",
	"ВЕРЕСЕНЬ",
	"ЖОВТЕНЬ",
	"ЛИСТОПАД",
	"ГРУДЕНЬ",
];

function formatMoney(amount: number) {
	return amount.toLocaleString("uk-UA", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
}

function TakeStockPage() {
	const { balance, setBalance, transactions } = useBudget();
	const [balanceInput, setBalanceInput] = useState(String(balance));
	const [period, setPeriod] = useState(new Date());

	const selectedPeriod = period.toLocaleDateString("uk-UA", {
		month: "2-digit",
		year: "numeric",
	});

	const monthlyTransactions = transactions.filter((transaction) =>
		transaction.date.endsWith(selectedPeriod),
	);

	const expenses = monthlyTransactions
		.filter((transaction) => transaction.type === "expense")
		.reduce((total, transaction) => total + transaction.amount, 0);
	const income = monthlyTransactions
		.filter((transaction) => transaction.type === "income")
		.reduce((total, transaction) => total + transaction.amount, 0);

	function confirmBalance() {
		const nextBalance = Number(balanceInput);

		if (nextBalance >= 0) {
			setBalance(nextBalance);
		}
	}

	function changeMonth(offset: number) {
		const nextPeriod = new Date(
			period.getFullYear(),
			period.getMonth() + offset,
			1,
		);

		setPeriod(nextPeriod);
	}

	return (
		<>
			<header className="section-header">
				<Header showAccount />
			</header>
			<main className="take-stock-page">
				<div className="take-stock-wrapper">
					<div className="take-stock-toolbar">
						<Link className="back-home" to="/home">
							<FiArrowLeft />
							<span>Повернутись на головну</span>
						</Link>

						<div className="take-stock-balance">
							<label htmlFor="report-balance">Баланс:</label>
							<div className="take-stock-balance-input">
								<input
									id="report-balance"
									type="number"
									min="0"
									value={balanceInput}
									onChange={(event) =>
										setBalanceInput(event.target.value)
									}
								/>
								<span>UAH</span>
							</div>
							<button type="button" onClick={confirmBalance}>
								ПІДТВЕРДИТИ
							</button>
						</div>

						<div className="period-picker">
							<span>Поточний період</span>
							<div>
								<button
									type="button"
									aria-label="Попередній місяць"
									onClick={() => changeMonth(-1)}
								>
									<FiChevronLeft />
								</button>
								<strong>
									{monthNames[period.getMonth()]}
									<small>{period.getFullYear()}</small>
								</strong>
								<button
									type="button"
									aria-label="Наступний місяць"
									onClick={() => changeMonth(1)}
								>
									<FiChevronRight />
								</button>
							</div>
						</div>
					</div>

					<section
						className="period-summary"
						aria-label="Підсумок за період"
					>
						<p>
							<span>Витрати:</span>
							<strong className="expense">
								- {formatMoney(expenses)} грн.
							</strong>
						</p>
						<p>
							<span>Доходи:</span>
							<strong className="income">
								+ {formatMoney(income)} грн.
							</strong>
						</p>
					</section>
				</div>
			</main>
		</>
	);
}

export default TakeStockPage;
