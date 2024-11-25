import React from "react";
import { Group, Rect, Text } from "react-konva";

interface TooltipProps {
  name: string;
  orientation: string;
  treasuresCollected: number;
  x: number;
  y: number;
}

const Tooltip: React.FC<TooltipProps> = ({ x, y, name, orientation, treasuresCollected }) => {
    return (
      <Group x={x} y={y}>
        <Rect
          width={150}
          height={80}
          fill="white"
          stroke="black"
          strokeWidth={1}
          cornerRadius={5}
          shadowBlur={10}
        />
        <Text text={`Nom: ${name}`} fontSize={14} x={10} y={10} fill="black" />
        <Text text={`Orientation: ${orientation}`} fontSize={14} x={10} y={30} fill="black" />
        <Text text={`Trésors: ${treasuresCollected}`} fontSize={14} x={10} y={50} fill="black" />
      </Group>
    );
  };

export default Tooltip;
