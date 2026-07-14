import '../styles/MainPage.css';

import { useState } from 'react';

import {
  FiBarChart2,
  FiCalendar,
  FiChevronDown,
  FiTrash2,
} from 'react-icons/fi';
import { TbCalculator } from 'react-icons/tb';

import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { useBudget, type Transaction, type TransactionType } from '../context/BudgetContext';

const expenseCategories = [
	"Транспорт",
	"Продукти",
	"Здоров’я",
	"Розваги",
	"Інше",
];

const incomeCategories = ["Зарплата", "Додатковий дохід", "Подарунок", "Інше"];

const summary = [
	{ month: "ЛИСТОПАД", amount: 0 },
	{ month: "ЖОВТЕНЬ", amount: 0 },
	{ month: "ВЕРЕСЕНЬ", amount: 0 },
	{ month: "СЕРПЕНЬ", amount: 0 },
	{ month: "ЛИПЕНЬ", amount: 0 },
	{ month: "ЧЕРВЕНЬ", amount: 0 },
];

function formatMoney(amount: number) {
	return amount.toLocaleString("uk-UA", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
}

function getCurrentDate() {
	return new Date().toLocaleDateString("uk-UA");
}

function MainPage() {
	const [activeTab, setActiveTab] = useState<TransactionType>("expense");
	const { balance, setBalance, transactions, setTransactions } = useBudget();
	const [balanceInput, setBalanceInput] = useState("0");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [amount, setAmount] = useState("");

	const categories =
		activeTab === "expense" ? expenseCategories : incomeCategories;

	const visibleTransactions = transactions.filter(
		(transaction) => transaction.type === activeTab,
	);

	function changeTab(tab: TransactionType) {
		setActiveTab(tab);
		clearForm();
	}

	function confirmBalance() {
		const newBalance = Number(balanceInput);

		if (newBalance >= 0) {
			setBalance(newBalance);
		}
	}

	function clearForm() {
		setDescription("");
		setCategory("");
		setAmount("");
	}

	function addTransaction(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const newAmount = Number(amount);

		if (!description.trim() || !category || newAmount <= 0) {
			return;
		}

		const newTransaction: Transaction = {
			id: Date.now(),
			date: getCurrentDate(),
			description: description.trim(),
			category,
			amount: newAmount,
			type: activeTab,
		};

		setTransactions([...transactions, newTransaction]);

		if (activeTab === "expense") {
			const newBalance = balance - newAmount;
			setBalance(newBalance);
			setBalanceInput(String(newBalance));
		} else {
			const newBalance = balance + newAmount;
			setBalance(newBalance);
			setBalanceInput(String(newBalance));
		}

		clearForm();
	}

	function deleteTransaction(id: number) {
		const transaction = transactions.find((item) => item.id === id);

		if (!transaction) {
			return;
		}

		setTransactions(transactions.filter((item) => item.id !== id));

		if (transaction.type === "expense") {
			const newBalance = balance + transaction.amount;
			setBalance(newBalance);
			setBalanceInput(String(newBalance));
		} else {
			const newBalance = balance - transaction.amount;
			setBalance(newBalance);
			setBalanceInput(String(newBalance));
		}
	}

	return (
		<>
			<header className="section-header">
				<Header showAccount></Header>
			</header>

			<main className="main-page">
				<div className="main-page-decoration"></div>

				<div className="main-page-wrapper">
					<section className="main-page-controls">
						<div className="balance">
							<label htmlFor="balance">Баланс:</label>

							<div className="balance-input">
								<input
									id="balance"
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

						<Link className="reports-link" to="/take-stock">
							<span>Перейти до розрахунків</span>
							<FiBarChart2></FiBarChart2>
						</Link>
					</section>

					<div className="transaction-tabs">
						<button
							className={activeTab === "expense" ? "active" : ""}
							type="button"
							onClick={() => changeTab("expense")}
						>
							ВИТРАТИ
						</button>

						<button
							className={activeTab === "income" ? "active" : ""}
							type="button"
							onClick={() => changeTab("income")}
						>
							ДОХІД
						</button>
					</div>

					<section className="transactions-card">
						<form
							className="transaction-form"
							onSubmit={addTransaction}
						>
							<div className="transaction-date">
								<FiCalendar></FiCalendar>
								<span>{getCurrentDate()}</span>
							</div>

							<div className="transaction-fields">
								<input
									type="text"
									placeholder="Опис товару"
									value={description}
									onChange={(event) =>
										setDescription(event.target.value)
									}
								/>

								<div className="category-field">
									<select
										aria-label="Категорія товару"
										value={category}
										onChange={(event) =>
											setCategory(event.target.value)
										}
									>
										<option value="">
											Категорія товару
										</option>
										{categories.map((item) => (
											<option key={item} value={item}>
												{item}
											</option>
										))}
									</select>
									<FiChevronDown></FiChevronDown>
								</div>

								<div className="amount-field">
									<input
										type="number"
										min="0"
										step="0.01"
										placeholder="0,00"
										value={amount}
										onChange={(event) =>
											setAmount(event.target.value)
										}
									/>
									<TbCalculator></TbCalculator>
								</div>
							</div>

							<div className="form-buttons">
								<button type="submit">ВВЕСТИ</button>
								<button type="button" onClick={clearForm}>
									ОЧИСТИТИ
								</button>
							</div>
						</form>

						<div className="transactions-content">
							<div className="transactions-table-wrapper">
								<table className="transactions-table">
									<thead>
										<tr>
											<th>ДАТА</th>
											<th>ОПИС</th>
											<th>КАТЕГОРІЯ</th>
											<th>СУМА</th>
											<th aria-label="Дії"></th>
										</tr>
									</thead>

									<tbody>
										{visibleTransactions.map(
											(transaction) => (
												<tr key={transaction.id}>
													<td>{transaction.date}</td>
													<td>
														{
															transaction.description
														}
													</td>
													<td>
														{transaction.category}
													</td>
													<td
														className={
															transaction.type
														}
													>
														{transaction.type ===
														"expense"
															? "- "
															: "+ "}
														{formatMoney(
															transaction.amount,
														)}{" "}
														грн.
													</td>
													<td>
														<button
															className="delete-button"
															type="button"
															aria-label={`Видалити ${transaction.description}`}
															onClick={() =>
																deleteTransaction(
																	transaction.id,
																)
															}
														>
															<FiTrash2></FiTrash2>
														</button>
													</td>
												</tr>
											),
										)}

										{Array.from({
											length: Math.max(
												0,
												7 - visibleTransactions.length,
											),
										}).map((_, index) => (
											<tr
												className="empty-row"
												key={index}
											>
												<td colSpan={5}></td>
											</tr>
										))}
									</tbody>
								</table>
							</div>

							<aside className="summary" id="summary">
								<h2>ЗВЕДЕННЯ</h2>

								<ul>
									{summary.map((item) => (
										<li key={item.month}>
											<span>{item.month}</span>
											<span>
												{formatMoney(item.amount)}
											</span>
										</li>
									))}
								</ul>
							</aside>
						</div>
					</section>

					<p className="current-balance" aria-live="polite">
						Поточний баланс: {formatMoney(balance)} UAH
					</p>
				</div>
			</main>
		</>
	);
}

export default MainPage;
