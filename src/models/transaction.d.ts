interface Transaction {
  payer: string | "bank";
  receiver: string | "bank";
  value: string;
  timestamp: number;
}
