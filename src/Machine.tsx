import React from 'react';

export type Item = {
  elem: JSX.Element;
  id: number;
};
export type Stack = Item[];
export type Env = {
  stack: Stack;
  fresh: number;
};

export const empty = (): Env => {
  return {
    stack: [],
    fresh: 0,
  };
};

export const push = ({ stack, fresh }: Env, newElement: JSX.Element): Env => {
  const item = {
    elem: newElement,
    id: fresh,
  };
  return {
    stack: [...stack, item],
    fresh: fresh + 1,
  };
};

const cut1 = (stack: Stack): [Stack, Item] => {
  return [stack.slice(0, stack.length - 1), stack[stack.length - 1]];
};

const cut = (stack: Stack, nheads: number): [Stack, Stack] => {
  if (stack.length < nheads) {
    throw new Error('pop from empty stack');
  }
  const tail = stack.slice(0, stack.length - nheads);
  const front = stack.slice(stack.length - nheads);
  return [tail, front];
};

const createElement = (tag: string, text: React.ReactNode): JSX.Element => {
  return React.createElement(tag, {}, text);
};

export const pop = ({ stack, fresh }: Env): Env => {
  if (stack.length < 1) {
    throw new Error('pop from empty stack');
  }
  return {
    stack: cut1(stack)[0],
    fresh,
  };
};

export const assemble = (
  { stack, fresh }: Env,
  tag: string,
  npop: number
): Env => {
  const [tail, front] = cut(stack, npop);
  return push(
    { stack: tail, fresh },
    createElement(
      tag,
      front.map((item) => item.elem)
    )
  );
};

export const addAttribute = (
  { stack, fresh }: Env,
  name: string,
  value: string
): Env => {
  const [tail, top] = cut1(stack);
  const elem = React.cloneElement(top.elem, { [name]: value });
  return push({ stack: tail, fresh }, elem);
};

const pushTokenNode = (tag: string) => (env: Env, text: string): Env =>
  push(env, createElement(tag, text));

export const pushMn: (env: Env, numeral: string) => Env = pushTokenNode('mn');

export const pushMi: (env: Env, ident: string) => Env = pushTokenNode('mi');

export const pushMo: (env: Env, operator: string) => Env = pushTokenNode('mo');

export const packInvisibleTimes = (
  { stack, fresh }: Env,
  nchd: number
): Env => {
  const [tail, front] = cut(stack, nchd);
  const children = front.reduce<JSX.Element[]>(
    (chd, item, i) =>
      i === 0
        ? [item.elem]
        : chd.concat([createElement('mo', '&InvisibleTimes;'), item.elem]),
    []
  );

  return push({ stack: tail, fresh }, createElement('mrow', children));
};
