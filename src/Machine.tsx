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

export const push = (
  { stack, fresh, ...env }: Env,
  newElement: JSX.Element
): Env => {
  const item = {
    elem: newElement,
    id: fresh,
  };
  return {
    stack: [...stack, item],
    fresh: fresh + 1,
    ...env,
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

const createElement = (
  tag: string,
  text: string | JSX.Element | JSX.Element[]
): JSX.Element => {
  return React.createElement(tag, {}, text);
};

export const pop = ({ stack, ...env }: Env): Env => {
  if (stack.length < 1) {
    throw new Error('pop from empty stack');
  }
  return {
    stack: cut1(stack)[0],
    ...env,
  };
};

export const assemble = (
  { stack, ...env }: Env,
  tag: string,
  npop: number
): Env => {
  const [tail, front] = cut(stack, npop);
  return push(
    { stack: tail, ...env },
    createElement(
      tag,
      front.map((item) => item.elem)
    )
  );
};

export const addAttribute = (
  { stack, ...env }: Env,
  name: string,
  value: string
): Env => {
  const [tail, top] = cut1(stack);
  const elem = React.cloneElement(top.elem, { [name]: value });
  return push({ stack: tail, ...env }, elem);
};

const pushTokenNode = (tag: string) => (env: Env, text: string): Env =>
  push(env, createElement(tag, text));

export const pushMn: (env: Env, numeral: string) => Env = pushTokenNode('mn');

export const pushMi: (env: Env, ident: string) => Env = pushTokenNode('mi');

export const pushMo: (env: Env, operator: string) => Env = pushTokenNode('mo');

const packWithElem = (op: JSX.Element) => (
  { stack, ...env }: Env,
  nchd: number
): Env => {
  const [tail, front] = cut(stack, nchd);
  const children = front.reduce<JSX.Element[]>(
    (chd, item, i) => (i === 0 ? [item.elem] : chd.concat([op, item.elem])),
    []
  );

  return push({ stack: tail, ...env }, createElement('mrow', children));
};

export const packComma = packWithElem(createElement('mo', ','));

export const packInvisibleTimes = packWithElem(createElement('mo', '\u{2062}'));

export const applyFunction = (env: Env): Env => {
  const af = packWithElem(createElement('mo', '\u{2061}'));
  return af(env, 2);
};

export const addPrime = ({ stack, ...env }: Env): Env => {
  return assemble(pushMo({ stack, ...env }, "'"), 'msup', 2);
};
