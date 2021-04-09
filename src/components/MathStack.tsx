import React from 'react';

type Props = {
  stack: JSX.Element[];
};

const MathStack: React.FC<Props> = ({stack} : Props) => {
  return (
    <ul>
      {stack}
    </ul>
  );
};

export default MathStack;
