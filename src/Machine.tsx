import React from 'react';

export type Item = {
  elem: JSX.Element,
  id: number,
};
export type Stack = Item[];
export type Env = {
  stack: Stack,
  fresh: number,
};

export const empty = (): Env => {
  return {
    stack: [],
    fresh: 0
  };
}

export const pushElement = ({ stack, fresh }: Env, newElement: JSX.Element): Env => {
  const item = {
    elem: newElement,
    id: fresh,
  };
  return {
    stack: [...stack, item],
    fresh: fresh + 1,
  };
};

const pop = (stack: Stack): [Stack, Item] => {
  return [
    stack.slice(0, stack.length - 1),
    stack[stack.length - 1],
  ];
}

const cut = (stack: Stack, nheads: number): [Stack, Stack] => {
  const tail = stack.slice(0, stack.length - nheads);
  const head = stack.slice(stack.length - nheads);
  return [tail, head];
}

export const popElement = ({ stack, fresh }: Env): Env => {
  if (stack.length < 1) {
    throw new Error("pop from empty stack");
  }
  return {
    stack: pop(stack)[0],
    fresh: fresh,
  }
}

export const createElement = ({ stack, fresh }: Env, tag: string, npop: number): Env => {
  const [tail, head] = cut(stack, npop);
  return pushElement(
    { stack: tail, fresh },
    React.createElement(tag, {}, head.map((item) => item.elem))
  );
};

export const addAttribute = ({ stack, fresh }: Env, name: string, value: string): Env => {
  const [tail, top] = pop(stack);
  console.log(name, value);
  return pushElement({ stack: tail, fresh }, React.cloneElement(top.elem, { [name]: value }));
}

export const pushMn = (env: Env, numeral: string): Env => {
  return pushElement(env, React.createElement('mn', {}, numeral));
}

export const pushMi = (env: Env, numeral: string): Env => {
  return pushElement(env, React.createElement('mi', {}, numeral));
}

export const pushMo = (env: Env, operator: string): Env => {
  return pushElement(env, React.createElement('mo', {}, operator));
}

export const packInvisibleTimes = ({ stack, fresh }: Env, nchildren: number): Env => {
  const [tail, head] = cut(stack, nchildren);
  const children = head
    .map((item) => item.elem)
    .reduce<JSX.Element[]>(
      (chd, elem, i) => {
        return i > 0
          ? chd.concat([React.createElement('mo', {}, '&InvisibleTimes;'), elem])
          : [elem]
      },
      []
    );

  return pushElement(
    { stack: tail, fresh },
    React.createElement('mrow', {}, children)
  );
}
