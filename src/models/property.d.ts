interface Property {
  name: string;
  rent: number;
  mortgage: number;
  id: string;
}

interface Properties {
  [key: string]: Property;
}
