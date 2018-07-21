import React from 'react'

const Counter = ({
  number,
  onIncrement,
  onDecrement
}) => {
  return (
    <div>
      <h1>{number}</h1>
      <button >증가 (+)</button>
      <button >감소 (-)</button>
    </div>
  );
};

Counter.defaultProps = {
  number : 0
}

export default Counter;
