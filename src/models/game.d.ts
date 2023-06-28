interface Game {
  state: "lobby" | "in Game";
  id: string;
  lobby: string[];
  players: {
    [key: string]: Player;
  };
  transactions: Transaction[];
  admin: string;
}
