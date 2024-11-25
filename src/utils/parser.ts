interface Adventurer {
  name: string,
  x: number,
  y: number,
  orientation: string,
  treasuresCollected: number
}

interface Mountain {
  x: number,
  y: number
}

interface Treasure {
  x: number,
  y: number,
  count: number
}

export interface Map {
  width: number,
  height: number,
  mountains: Mountain[],
  treasures: Treasure[],
  adventurers: Adventurer[]
}

export const parseTreasureMap = (data: string) => {
  const lines = data.trim().split("\n");
  const map: Map = { width: 0, height: 0, mountains: [], treasures: [], adventurers: [] };

  lines.forEach((line: string) => {
    const parts = line.split(" - ");
    switch (parts[0]) {
      case "C":
        map.width = parseInt(parts[1], 10);
        map.height = parseInt(parts[2], 10);
        break;
      case "M":
        map.mountains.push({ x: parseInt(parts[1], 10), y: parseInt(parts[2], 10) });
        break;
      case "T":
        map.treasures.push({
          x: parseInt(parts[1], 10),
          y: parseInt(parts[2], 10),
          count: parseInt(parts[3], 10),
        });
        break;
      case "A":
        map.adventurers.push({
          name: parts[1],
          x: parseInt(parts[2], 10),
          y: parseInt(parts[3], 10),
          orientation: parts[4],
          treasuresCollected: parseInt(parts[5], 10),
        });
        break;
      default:
        break;
    }
  });

  return map;
};