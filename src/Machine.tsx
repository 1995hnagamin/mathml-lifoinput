import React from 'react';

export type Element = JSX.Element;
export type Stack = Element[];

export const empty = (): Stack => {
  return [];
}

export const pushElement = (stack: Stack, newElement: Element): Stack => {
  return [newElement, ...stack];
};

export const popElement = (stack: Stack): Stack => {
  if (stack.length < 1) {
    throw new Error("pop from empty stack");
  }
  return stack.slice(1);
}

export const createElement = (stack: Stack, tag: string, npop: number): Stack => {
  const bottom = stack.slice(npop);
  const top = stack.slice(0, npop);
  return pushElement(bottom, React.createElement(tag, {}, top.slice().reverse()));
};

export const addAttribute = (stack: Stack, name: string, value: string): Stack => {
  const bottom = popElement(stack);
  const top = stack[0];
  console.log(name, value);
  return pushElement(bottom, React.cloneElement(top, { [name]: value }));
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
  const bottom = stack.slice(nchildren);
  const top = stack.slice(0, nchildren).reverse();
  const children = top.reduce<Element[]>(
    (chd, elem, i) => {
      return i > 0
        ? chd.concat([React.createElement('mo', {}, '&InvisibleTimes;'), elem])
        : [elem]
    },
    []);

  return pushElement(bottom, React.createElement('mrow', {}, children));
}
