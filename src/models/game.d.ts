interface Game {
  state: "lobby" | "in Game";
  id: string;
  lobby: string[];
  players: Players;
  transactions: Transactions;
  admin: string;
}
