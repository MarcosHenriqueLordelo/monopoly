interface Game {
  state: "lobby" | "in Game";
  id: string;
  players: string[];
  transactions: Transaction[];
}
