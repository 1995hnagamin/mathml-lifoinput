import React from 'react';
import * as M from '../Machine';
import { Droppable, Draggable } from "react-beautiful-dnd";
import MathJax from 'react-mathjax-preview';
import ReactDOMServer from 'react-dom/server';

type Props = {
  stack: M.Stack;
  selected: number | null;
  setSelected: React.Dispatch<React.SetStateAction<number | null>>;
};

const MathStack: React.FC<Props> = ({ stack, selected, setSelected }: Props) => {
  return (
    <Droppable droppableId="stack-items">
      {
        (provided) => (
          <ul
            className="stack-items"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {
              stack.map((item, i) => (
                <Draggable
                  key={item.id}
                  draggableId={""+item.id}
                  index={i}
                >
                  {
                    (provided) => (
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
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <MathJax
                          math={`<math>${ReactDOMServer.renderToStaticMarkup(item.elem)}</math>`}
                        />
                      </li>
                    )
                  }
                </Draggable>
              ))
            }
          </ul>
        )
      }
    </Droppable>
  );
};

export default MathStack;
