interface Transaction {
  payer: string | "bank";
  receiver: string | "bank";
  value: number;
  timestamp: number;
}

interface Transactions {
  [key: string]: Transaction;
}
