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
  if (cmd.match(/^mfenced\/[0-9]+$/)) {
    const found = cmd.match(/^mfenced\/(?<arity>[0-9]+)$/);
    const arity: number = +(found!.groups!.arity);
    return M.createElement(stack, 'mfenced', arity);
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
      <Input commandAdded={commandAdd}/>
      <MathStack stack={stack}/>
    </div>
  );
};

export default App;
