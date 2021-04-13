import React from 'react';
import ReactDOMServer from 'react-dom/server';

type Props = {
  stack: JSX.Element[];
  showText: (text: string) => void;
};

const MathStack: React.FC<Props> = ({ stack, showText }: Props) => {
  const [selected, setSelected] = React.useState<number | null>(null);

  return (
    <ul>
      {
        stack.slice().reverse().map((elem, i) =>
          <li
            key={i}
            className={i === selected ? 'stack-elem-selected' : 'stack-elem-not-selected'}
            onMouseOver={
              () => {
                setSelected(i);
                showText(ReactDOMServer.renderToStaticMarkup(elem));
              }
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
