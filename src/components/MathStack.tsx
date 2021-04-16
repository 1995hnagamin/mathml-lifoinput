import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import MathJax from 'react-mathjax-preview';
import ReactDOMServer from 'react-dom/server';
import * as M from '../Machine';

type Props = {
  stack: M.Stack;
  selected: number | null;
  setSelected: React.Dispatch<React.SetStateAction<number | null>>;
};

const MathStack: React.FC<Props> = ({
  stack,
  selected,
  setSelected,
}: Props) => {
  return (
    <Droppable droppableId="stack-items">
      {(dropprov) => (
        <ul
          className="stack-items"
          {...dropprov.droppableProps}
          ref={dropprov.innerRef}
        >
          {stack.map((item, i) => (
            <Draggable key={item.id} draggableId={`${item.id}`} index={i}>
              {(dragprov) => (
                <li
                  key={item.id}
                  className={
                    i === selected
                      ? 'stack-elem-selected'
                      : 'stack-elem-not-selected'
                  }
                  onMouseOver={() => {
                    setSelected(i);
                  }}
                  onFocus={() => {
                    setSelected(i);
                  }}
                  ref={dragprov.innerRef}
                  {...dragprov.draggableProps}
                  {...dragprov.dragHandleProps}
                >
                  <MathJax
                    math={`<math>${ReactDOMServer.renderToStaticMarkup(
                      item.elem
                    )}</math>`}
                  />
                </li>
              )}
            </Draggable>
          ))}
          {dropprov.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default MathStack;
