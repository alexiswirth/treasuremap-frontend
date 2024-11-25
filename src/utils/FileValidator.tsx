interface Mountain {
    x: number;
    y: number;
}
  
interface Treasure {
    x: number;
    y: number;
    count: number;
}
  
interface Adventurer {
    name: string;
    x: number;
    y: number;
    orientation: string;
    movements: string;
}
  
export interface MapData {
    width: number;
    height: number;
    mountains: Mountain[];
    treasures: Treasure[];
    adventurers: Adventurer[];
}
  
  export default class FileValidator {
    validate(content: string): string {
      const lines = content.trim().split("\n");
      const mapData: MapData = {
        width: 0,
        height: 0,
        mountains: [],
        treasures: [],
        adventurers: [],
      };
  
      lines.forEach((line, index) => {
        if (line.trim().startsWith("#")) return;
        const parts = line.split(" - ");
  
        switch (parts[0]) {
          case "C":
            if (parts.length !== 3 || isNaN(+parts[1]) || isNaN(+parts[2])) {
              throw new Error(`Error at line ${index + 1}: Wrong dimension of the map`);
            }
            mapData.width = parseInt(parts[1], 10);
            mapData.height = parseInt(parts[2], 10);
            break;
  
          case "M":
            if (parts.length !== 3 || isNaN(+parts[1]) || isNaN(+parts[2])) {
              throw new Error(`Error at line ${index + 1}: Coordinates of the mountain invalid`);
            }
            mapData.mountains.push({
              x: parseInt(parts[1], 10),
              y: parseInt(parts[2], 10),
            });
            break;
  
          case "T":
            if (parts.length !== 4 || isNaN(+parts[1]) || isNaN(+parts[2]) || isNaN(+parts[3])) {
              throw new Error(`Error at line ${index + 1}: Coordinates or number of chess invalid`);
            }
            mapData.treasures.push({
              x: parseInt(parts[1], 10),
              y: parseInt(parts[2], 10),
              count: parseInt(parts[3], 10),
            });
            break;
  
          case "A":
            if (
              parts.length !== 6 ||
              !["N", "S", "E", "W"].includes(parts[4]) ||
              !/^[ADG]+$/.test(parts[5])
            ) {
              throw new Error(`Error at line ${index + 1}: Wrong values for adventurer`);
            }
            mapData.adventurers.push({
              name: parts[1],
              x: parseInt(parts[2], 10),
              y: parseInt(parts[3], 10),
              orientation: parts[4],
              movements: parts[5],
            });
            break;
  
          default:
            throw new Error(`Error at line ${index + 1}: unknown value.`);
        }
      });
  
      if (mapData.width === 0 || mapData.height === 0) {
        throw new Error("Error: The dimension of the map (C) must be defined");
      }
  
      return content;
    }
  }
  