interface Player {
  id: string;
  name: string;
  money: number;
  properties: Properties;
  color: string;
}

interface Players {
  [key: string]: Player;
}
