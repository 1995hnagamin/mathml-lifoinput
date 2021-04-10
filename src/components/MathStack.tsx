import React from 'react';
import ReactDOMServer from 'react-dom/server';

type Props = {
  stack: JSX.Element[];
  showText: (text: string) => void;
};

const MathStack: React.FC<Props> = ({ stack, showText }: Props) => {
  return (
    <ul>
      {
        stack.slice().reverse().map((elem, i) =>
          <li
            key={i}
            onMouseOver={
              () =>
                showText(ReactDOMServer.renderToStaticMarkup(elem))
            }
          >
            {React.createElement('math', { }, elem)}
          </li>
        )
      }
    </ul>
  );
};

export default MathStack;
