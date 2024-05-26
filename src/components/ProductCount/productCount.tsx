import React from "react";

import "./productCount.scss";

const ProductCount: React.FC<{
  initialCount: number;
  onChange: (count: number) => void;
}> = ({ initialCount, onChange }) => {
  const increment = () => {
    const newCount = initialCount + 1;
    onChange(newCount);
  };

  const decrement = () => {
    const newCount = initialCount - 1;
    onChange(newCount);
  };

  return (
    <div className="prod-count">
      <button
        onClick={decrement}
        className="counter-button"
        disabled={initialCount <= 1}
      >
        -
      </button>
      <input
        type="text"
        value={initialCount}
        className="counter-input"
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <button onClick={increment} className="counter-button">
        +
      </button>
    </div>
  );
};

export default ProductCount;
