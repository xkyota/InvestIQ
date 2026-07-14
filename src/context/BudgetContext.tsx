import {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

export type TransactionType = "expense" | "income";

export type Transaction = {
	id: number;
	date: string;
	description: string;
	category: string;
	amount: number;
	type: TransactionType;
};

type BudgetContextValue = {
	balance: number;
	setBalance: React.Dispatch<React.SetStateAction<number>>;
	transactions: Transaction[];
	setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
};

const BudgetContext = createContext<BudgetContextValue | null>(null);

export function BudgetProvider({ children }: React.PropsWithChildren) {
	const [balance, setBalance] = useState(0);
	const [transactions, setTransactions] = useState<Transaction[]>([]);

	const value = useMemo(
		() => ({ balance, setBalance, transactions, setTransactions }),
		[balance, transactions],
	);

	return (
		<BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>
	);
}

export function useBudget() {
	const context = useContext(BudgetContext);

	if (!context) {
		throw new Error("useBudget must be used inside BudgetProvider");
	}

	return context;
}

//* With Codex help 