import React from 'react';

type Props = {
  stack: JSX.Element[];
};

const MathStack: React.FC<Props> = ({ stack }: Props) => {
  return (
    <ul>
      {
        stack.slice().reverse().map((elem, i) =>
          <li key={i}>
            {React.createElement('math', { }, elem)}
          </li>
        )
      }
    </ul>
  );
};

export default MathStack;
