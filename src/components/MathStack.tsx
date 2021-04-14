import React from 'react';
import * as M from '../Machine';

type Props = {
  stack: M.Stack;
  selected: number | null;
  setSelected : React.Dispatch<React.SetStateAction<number | null>>;
};

const MathStack: React.FC<Props> = ({ stack, selected, setSelected }: Props) => {
  return (
    <ul>
      {
        stack.map((item, i) =>
          <li
            key={item.id}
            className={
              i === selected
                ? 'stack-elem-selected'
                : 'stack-elem-not-selected'
            }
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
                item.elem)
            }
          </li>
        )
      }
    </ul>
  );
};

export default MathStack;
