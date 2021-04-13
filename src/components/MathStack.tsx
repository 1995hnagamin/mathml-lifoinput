import React from 'react';

type Props = {
  stack: JSX.Element[];
  selected: number | null;
  setSelected : React.Dispatch<React.SetStateAction<number | null>>;
};

const MathStack: React.FC<Props> = ({ stack, selected, setSelected }: Props) => {
  return (
    <ul>
      {
        stack.map((elem, i) =>
          <li
            key={i}
            className={i === selected ? 'stack-elem-selected' : 'stack-elem-not-selected'}
            onMouseOver={
              () => {
                setSelected(i);
              }
            }
          >
            {
              React.createElement(
                'math',
                { xmlns: "http://www.w3.org/1998/Math/MathML" },
                elem)
            }
          </li>
        )
      }
    </ul>
  );
};

export default MathStack;
