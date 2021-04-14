import React from 'react';
import Input from './components/Input';
import MathStack from './components/MathStack';
import './App.css';
import * as M from './Machine';
import XMLViewer from 'react-xml-viewer';
import ReactDOMServer from 'react-dom/server';
import { DragDropContext } from "react-beautiful-dnd";

const elemArityMap: Record<string, number> = {
  mfrac: 2,
  mroot: 2,
  msqrt: 1,
  msub: 2,
  msup: 2,
  mstyle: 1,
} as const;

const operators = [
  '+', '-', ',', '[', ']', '(', ')', '{', '}',
  '=', '>', '<',
];

const interpret = (stack: M.Env, cmd: string): M.Env => {
  if (cmd.match(/^-?([0-9]*.)?[0-9]+$/)) {
    return M.pushMn(stack, cmd);
  }
  if (cmd.match(/^[a-zA-Z]$/)) {
    return M.pushMi(stack, cmd);
  }
  const MiCom = cmd.match(/^mi:"(?<variable>[^"]+)"$/);
  if (MiCom) {
    return M.pushMi(stack, MiCom.groups!.variable);
  }
  const AttrCom = cmd.match(/^@(?<name>[a-z]+)="(?<value>[^"]*)"$/);
  if (AttrCom) {
    return M.addAttribute(stack, AttrCom.groups!.name, AttrCom.groups!.value);
  }
  const MrowCom = cmd.match(/^mrow:(?<arity>[0-9]+)$/);
  if (MrowCom) {
    const arity: number = +(MrowCom.groups!.arity);
    return M.assemble(stack, 'mrow', arity);
  }
  if (cmd in elemArityMap) {
    return M.assemble(stack, cmd, elemArityMap[cmd]);
  }
  if (operators.includes(cmd)) {
    return M.pushMo(stack, cmd);
  }
  if (cmd === '\\pop') {
    return M.pop(stack);
  }
  const Packit = cmd.match(/^\\packit:(?<count>[0-9]+)$/);
  if (Packit) {
    const count: number = +(Packit.groups!.count);
    return M.packInvisibleTimes(stack, count);
  }
  console.log(`error: unknown command "${cmd}"`);
  return stack;
}

const App = () => {
  const [env, setEnv] = React.useState<M.Env>(M.empty());
  const [selected, setSelected] = React.useState<number | null>(null);
  const [history, setHistory] = React.useState<M.Env[]>([env]);
  const [historyIndex, setHistoryIndex] = React.useState<number>(0);

  const addEnvToHistory = (env: M.Env) => {
    if (env.stack.length === 0) {
      setSelected(null);
    } else if (selected !== null) {
      setSelected(Math.min(selected, env.stack.length - 1));
    }
    setEnv(env);
    const newhistory = history.slice(0, historyIndex+1).concat(env);
    setHistory(newhistory);
    setHistoryIndex(newhistory.length-1);
  }

  const commandAdd = (cmd: string) => {
    const newenv = interpret(env, cmd);
    addEnvToHistory(newenv);
  };

  const handleDragEnd = (result: any) => {
    if (result.destination === null) {
      return;
    }
    const stack = env.stack.slice();
    const [dropped] = stack.splice(result.source.index, 1);
    stack.splice(result.destination.index, 0, dropped);
    addEnvToHistory({
      stack: stack,
      fresh: env.fresh
    });
  }

  const handleUndo = () => {
    if (historyIndex < 1) {
      return;
    }
    const newidx = historyIndex - 1;
    setSelected(null);
    setHistoryIndex(newidx);
    setEnv(history[newidx]);
  }

  const handleRedo = () => {
    if (historyIndex + 1 >= history.length) {
      return;
    }
    const newidx = historyIndex + 1;
    setSelected(null);
    setHistoryIndex(newidx);
    setEnv(history[newidx]);
  }

  return (
    <div className="App">
      <div id="main-view">
        <div id="input-area">
          <DragDropContext
            onDragEnd={handleDragEnd}
          >
            <button
              onClick={handleUndo}
              disabled={historyIndex < 1}
            >
              undo
            </button>
            <button
              onClick={handleRedo}
              disabled={historyIndex + 1 >= history.length}
            >
              redo
            </button>
            <div id="mathstack-wrapper">
              <MathStack
                stack={env.stack}
                selected={selected} setSelected={setSelected}
              />
            </div>
          </DragDropContext>
          <div id="command-input-wrapper">
            <Input commandAdded={commandAdd} />
          </div>
        </div>
        <div id="mathml-textarea">
          <XMLViewer
            xml={
              selected !== null
                ? ReactDOMServer.renderToStaticMarkup(env.stack[selected].elem)
                : ""
            }
            invalidXml={
              ""
            }
          />
        </div>
      </div>
    </div>
  );
};

export default App;
