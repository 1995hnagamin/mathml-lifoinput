import React from 'react';
import Input from './components/Input';
import MathStack from './components/MathStack';
import './App.css';
import * as M from './Machine';
import XMLViewer from 'react-xml-viewer';

const elemArityMap: Record<string, number> = {
  mfrac: 2,
  mroot: 2,
  msqrt: 1,
  msup: 2,
  mstyle: 1,
} as const;

const operators = [
  '+', '-', ',', '[', ']', '(', ')', '{', '}',
  '=', '>', '<',
];

const interpret = (stack: M.Stack, cmd: string): M.Stack => {
  if (cmd.match(/^-?([0-9]*.)?[0-9]+$/)) {
    return M.pushMn(stack, cmd);
  }
  if (cmd.match(/^[a-zA-Z]$/)) {
    return M.pushMi(stack, cmd);
  }
  const Mi = cmd.match(/^mi:"(?<variable>[a-zA-Z]+)"$/);
  if (Mi) {
    return M.pushMi(stack, Mi.groups!.variable);
  }
  if (cmd.match(/^@[a-z]+="[^"]*"$/)) {
    const found = cmd.match(/^@(?<name>[a-z]+)="(?<value>[^"]*)"$/);
    console.log(found!.groups!);
    return M.addAttribute(stack, found!.groups!.name, found!.groups!.value);
  }
  if (cmd.match(/^mrow:[0-9]+$/)) {
    const found = cmd.match(/^mrow:(?<arity>[0-9]+)$/);
    const arity: number = +(found!.groups!.arity);
    return M.createElement(stack, 'mrow', arity);
  }
  if (cmd in elemArityMap) {
    return M.createElement(stack, cmd, elemArityMap[cmd]);
  }
  if (operators.includes(cmd)) {
    return M.pushMo(stack, cmd);
  }
  if (cmd === '\\pop') {
    return M.popElement(stack);
  }
  console.log(`error: unknown command "${cmd}"`);
  return stack;
}

const App = () => {
  const [stack, setStack] = React.useState<JSX.Element[]>([]);
  const [mathmlText, setMathmlText] = React.useState<string>("");

  const commandAdd = (cmd: string) => {
    const newstk = interpret(stack, cmd);
    setStack(newstk);
  };

  const showMathmlText = (text: string) => {
    setMathmlText(text);
  };

  return (
    <div className="App">
      <div id="main-view">
        <div id="mathstack-wrapper">
          <MathStack stack={stack} showText={showMathmlText}/>
        </div>
        <div id="mathml-textarea">
          <XMLViewer xml={mathmlText} />
        </div>
      </div>
      <div id="command-input-wrapper">
        <Input commandAdded={commandAdd}/>
      </div>
    </div>
  );
};

export default App;
