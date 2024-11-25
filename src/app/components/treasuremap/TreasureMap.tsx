import React, { useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import Tooltip from "../tooltip/Tooltip";

const MAX_WIDTH = 500;
const MAX_HEIGHT = 500;

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
  treasuresCollected: number;
}

interface TreasureMapProps {
  mapData: {
    width: number;
    height: number;
    mountains: Mountain[];
    treasures: Treasure[];
    adventurers: Adventurer[];
  };
}

const TreasureMap: React.FC<TreasureMapProps> = ({ mapData }) => {
  const { width, height, mountains, treasures, adventurers } = mapData;

  const renderCell = (x: number, y: number) => {
    const mountain = mountains.find((m: any) => m.x === x && m.y === y);
    const treasure = treasures.find((t: any) => t.x === x && t.y === y);
    const adventurer = adventurers.find((a: any) => a.x === x && a.y === y);

    if (mountain) return "mountain";
    if (treasure) return "treasure";
    if (adventurer) return "adventurer";
    return "empty";
  };

  const [hoveredAdventurer, setHoveredAdventurer] = useState<Adventurer | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (event: any, x: number, y: number) => {
    const stage = event.target.getStage();
    const pointerPosition = stage?.getPointerPosition();
    const adventurer = adventurers.find((a) => a.x === x && a.y === y);

    if (adventurer && pointerPosition) {
      setHoveredAdventurer(adventurer);
      setTooltipPosition({ x: pointerPosition.x, y: pointerPosition.y });
    }
  };

  const handleMouseLeave = () => {
    setHoveredAdventurer(null);
  };

  const cellWidth = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
  const cellHeight = cellWidth; // Les cases sont carrées

  return (
    <Stage width={width * 200} height={height * 200}>
      <Layer>
        {Array.from({ length: height }, (_, y) =>
          Array.from({ length: width }, (_, x) => {
            const type = renderCell(x, y);
            return (
              <>
                <Rect
                  onMouseEnter={(e) => handleMouseEnter(e, x, y)}
                  onMouseLeave={handleMouseLeave}
                  key={`${x}-${y}`}
                  x={x * cellWidth}
                  y={y * cellHeight}
                  width={cellWidth}
                  height={cellHeight}
                  fill={
                    type === "mountain"
                    ? "#8B4513"
                    : type === "treasure"
                    ? "#FFD700"
                    : type === "adventurer"
                    ? "#1E90FF"
                    : "#98FB98"
                  }
                  stroke="#ccc"
                />
                {hoveredAdventurer && (
                  <Tooltip
                    x={tooltipPosition.x}
                    y={tooltipPosition.y}
                    name={hoveredAdventurer.name}
                    orientation={hoveredAdventurer.orientation}
                    treasuresCollected={hoveredAdventurer.treasuresCollected}
                  />
                )}
              </>
            );
          })
        )}
      </Layer>
    </Stage>
  );
};

export default TreasureMap;
