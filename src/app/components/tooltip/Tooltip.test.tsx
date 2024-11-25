import Tooltip from "./Tooltip";
import React from "react";

describe("Tooltip Props Validation", () => {
  it("accepts valid props", () => {
    const validProps = {
      x: 10,
      y: 20,
      name: "Lara",
      orientation: "North",
      treasuresCollected: 5,
    };

    const tooltip = <Tooltip {...validProps} />;
    expect(tooltip.props.x).toBe(10);
    expect(tooltip.props.name).toBe("Lara");
    expect(tooltip.props.orientation).toBe("North");
    expect(tooltip.props.treasuresCollected).toBe(5);
  });
});
