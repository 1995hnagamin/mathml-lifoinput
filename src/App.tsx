import React from 'react';
import Input from './components/Input';
import MathStack from './components/MathStack';
import './App.css';
import * as M from './Machine';

const interpret = (stack: M.Stack, cmd: string): M.Stack => {
  if (cmd.match(/^-?([0-9]*.)?[0-9]+$/)) {
    return M.pushMn(stack, cmd);
  }
  if (cmd.match(/^mi:[a-zA-Z]+$/)) {
    const found = cmd.match(/^mi:(?<name>[a-zA-Z]+)$/);
    return M.pushMi(stack, found!.groups!.name);
  }
  if (cmd.match(/^@[a-z]+="[^"]*"$/)) {
    const found = cmd.match(/^@(?<name>[a-z]+)="(?<value>[^"]*)"$/);
    console.log(found!.groups!);
    return M.addAttribute(stack, found!.groups!.name, found!.groups!.value);
  }
  if (cmd.match(/^mrow\/[0-9]+$/)) {
    const found = cmd.match(/^mrow\/(?<arity>[0-9]+)$/);
    const arity: number = +(found!.groups!.arity);
    return M.createElement(stack, 'mrow', arity);
  }
  console.log(`error: unknown command "${cmd}"`);
  return stack;
}

const App = () => {
  const [stack, setStack] = React.useState<JSX.Element[]>([]);

  const commandAdd = (cmd: string) => {
    const newstk = interpret(stack, cmd);
    setStack(newstk);
  };

  return (
    <div className="App">
      <MathStack stack={stack}/>
      <div id="command-input-wrapper">
        <Input commandAdded={commandAdd}/>
      </div>
    </div>
  );
};

export default App;
