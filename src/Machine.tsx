import React from 'react';

export type Element = JSX.Element;
export type Stack = Element[];

export const empty = (): Stack => {
  return [];
}

export const pushElement = (stack: Stack, newElement: Element): Stack => {
  return [...stack, newElement];
};

const pop = (stack: Stack): [Stack, Element] => {
  return [
    stack.slice(0, stack.length-1),
    stack[stack.length-1],
  ];
}

const cut = (stack: Stack, nheads: number): [Stack, Stack] => {
  const tail = stack.slice(0, stack.length-nheads);
  const head = stack.slice(stack.length-nheads);
  return [tail, head];
}

export const popElement = (stack: Stack): Stack => {
  if (stack.length < 1) {
    throw new Error("pop from empty stack");
  }
  return pop(stack)[0];
}

export const createElement = (stack: Stack, tag: string, npop: number): Stack => {
  const [tail, head] = cut(stack, npop);
  return pushElement(tail, React.createElement(tag, {}, head));
};

export const addAttribute = (stack: Stack, name: string, value: string): Stack => {
  const [tail, top] = pop(stack);
  console.log(name, value);
  return pushElement(tail, React.cloneElement(top, { [name]: value }));
}

export const pushMn = (stack: Stack, numeral: string): Stack => {
  return pushElement(stack, React.createElement('mn', {}, numeral));
}

export const pushMi = (stack: Stack, numeral: string): Stack => {
  return pushElement(stack, React.createElement('mi', {}, numeral));
}

export const pushMo = (stack: Stack, operator: string): Stack => {
  return pushElement(stack, React.createElement('mo', {}, operator));
}

export const packInvisibleTimes = (stack: Stack, nchildren: number): Stack => {
  const [tail, head] = cut(stack, nchildren);
  const children = head.reduce<Element[]>(
    (chd, elem, i) => {
      return i > 0
        ? chd.concat([React.createElement('mo', {}, '&InvisibleTimes;'), elem])
        : [elem]
    },
    []);

  return pushElement(tail, React.createElement('mrow', {}, children));
}
