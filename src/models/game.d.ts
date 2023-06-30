interface Game {
  state: "lobby" | "in Game";
  id: string;
  lobby: string[];
  players: Players;
  transactions: Transactions;
  admin: string;
}

type Transactions = {
  [key: string]: Transaction;
};

type Players = {
  [key: string]: Player;
};

interface ChargeQrCode {
  value: number;
  receiver: User;
}
