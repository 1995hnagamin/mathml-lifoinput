import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Input from './components/Input';
import MathStack from './components/MathStack';
import CodeView from './components/CodeView';
import './App.css';
import * as M from './Machine';

const elemArityMap: Record<string, number> = {
  mfrac: 2,
  mroot: 2,
  msqrt: 1,
  msub: 2,
  msubsup: 3,
  msup: 2,
  mstyle: 1,
} as const;

const operators = ['+', '-', ',', '[', ']', '(', ')', '{', '}', '=', '>', '<'];

const entityRefs: Record<string, string> = {
  '&infin;': '\u{221e}',
  '&int;': '\u{222b}',
  '&Alpha;': '\u{0391}',
  '&Beta;': '\u{0392}',
  '&Gamma;': '\u{0393}',
  '&Delta;': '\u{0394}',
  '&Epsilon;': '\u{0395}',
  '&Zeta;': '\u{0396}',
  '&Eta;': '\u{0397}',
  '&Theta;': '\u{0398}',
  '&Iota;': '\u{0399}',
  '&Kappa;': '\u{039a}',
  '&Lambda;': '\u{039b}',
  '&Mu;': '\u{039c}',
  '&Nu;': '\u{039d}',
  '&Xi;': '\u{039e}',
  '&Omicron;': '\u{039f}',
  '&Pi;': '\u{03a0}',
  '&Rho;': '\u{03a1}',
  '&Sigma;': '\u{03a3}',
  '&Tau;': '\u{03a4}',
  '&Upsilon;': '\u{03a5}',
  '&Phi;': '\u{03a6}',
  '&Chi;': '\u{03a7}',
  '&Psi;': '\u{03a8}',
  '&Omega;': '\u{03a9}',
  '&alpha;': '\u{03b1}',
  '&beta;': '\u{03b2}',
  '&gamma;': '\u{03b3}',
  '&delta;': '\u{03b4}',
  '&epsilon;': '\u{03b5}',
  '&zeta;': '\u{03b6}',
  '&eta;': '\u{03b7}',
  '&theta;': '\u{03b8}',
  '&iota;': '\u{03b9}',
  '&kappa;': '\u{03ba}',
  '&lambda;': '\u{03bb}',
  '&mu;': '\u{03bc}',
  '&nu;': '\u{03bd}',
  '&xi;': '\u{03be}',
  '&omicron;': '\u{03bf}',
  '&pi;': '\u{03c0}',
  '&rho;': '\u{03c1}',
  '&sigmaf;': '\u{03c2}',
  '&sigma;': '\u{03c3}',
  '&tau;': '\u{03c4}',
  '&upsilon;': '\u{03c5}',
  '&phi;': '\u{03c6}',
  '&chi;': '\u{03c7}',
  '&psi;': '\u{03c8}',
  '&omega;': '\u{03c9}',
  '&thetasym;': '\u{03d1}',
  '&upsih;': '\u{03d2}',
  '&piv;': '\u{03d6}',
};

const opEntityRefs: Record<string, string> = {
  '&PlusMinus;': '\u{00b1}',
};

const interpret = (stack: M.Env, cmd: string): M.Env => {
  if (cmd.match(/^([0-9,]*.)?[0-9]+(e[0-9]+)?$/)) {
    return M.pushMn(stack, cmd);
  }
  if (cmd.match(/^[a-zA-Z]$/)) {
    return M.pushMi(stack, cmd);
  }
  if (cmd in entityRefs) {
    return M.pushMi(stack, entityRefs[cmd]);
  }
  const MiCom = cmd.match(/^mi "(?<variable>[^"]+)"$/);
  if (MiCom && MiCom.groups) {
    return M.pushMi(stack, MiCom.groups.variable);
  }
  const MnCom = cmd.match(/^mn "(?<numeral>[^"]+)"$/);
  if (MnCom && MnCom.groups) {
    return M.pushMn(stack, MnCom.groups.numeral);
  }
  const MoCom = cmd.match(/^mo "(?<operator>[^"]+)"$/);
  if (MoCom && MoCom.groups) {
    return M.pushMo(stack, MoCom.groups.operator);
  }
  const AttrCom = cmd.match(/^@(?<name>[a-z]+)="(?<value>[^"]*)"$/);
  if (AttrCom && AttrCom.groups) {
    return M.addAttribute(stack, AttrCom.groups.name, AttrCom.groups.value);
  }
  const MrowCom = cmd.match(/^mrow (?<arity>[0-9]+)$/);
  if (MrowCom && MrowCom.groups) {
    const arity: number = +MrowCom.groups.arity;
    return M.assemble(stack, 'mrow', arity);
  }
  if (cmd in elemArityMap) {
    return M.assemble(stack, cmd, elemArityMap[cmd]);
  }
  if (operators.includes(cmd)) {
    return M.pushMo(stack, cmd);
  }
  if (cmd in opEntityRefs) {
    return M.pushMo(stack, opEntityRefs[cmd]);
  }
  if (cmd === '\\pop') {
    return M.pop(stack);
  }
  const Packit = cmd.match(/^\\packit (?<count>[0-9]+)$/);
  if (Packit && Packit.groups) {
    const count: number = +Packit.groups.count;
    return M.packInvisibleTimes(stack, count);
  }
  throw new Error(`unknown command "${cmd}"`);
};

const App: React.FC = () => {
  const [env, setEnv] = React.useState<M.Env>(M.empty());
  const [selected, setSelected] = React.useState<number | null>(null);
  const [history, setHistory] = React.useState<M.Env[]>([env]);
  const [historyIndex, setHistoryIndex] = React.useState<number>(0);

  // eslint-disable-next-line no-shadow
  const addEnvToHistory = (env: M.Env) => {
    if (env.stack.length === 0) {
      setSelected(null);
    } else if (selected !== null) {
      setSelected(Math.min(selected, env.stack.length - 1));
    }
    setEnv(env);
    const newhistory = history.slice(0, historyIndex + 1).concat(env);
    setHistory(newhistory);
    setHistoryIndex(newhistory.length - 1);
  };

  const commandAdd = (cmd: string) => {
    try {
      const newenv = interpret(env, cmd);
      addEnvToHistory(newenv);
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert(e.message);
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const stack = env.stack.slice();
    const [dropped] = stack.splice(result.source.index, 1);
    stack.splice(result.destination.index, 0, dropped);
    addEnvToHistory({
      stack,
      fresh: env.fresh,
    });
  };

  const handleUndo = () => {
    if (historyIndex < 1) {
      return;
    }
    const newidx = historyIndex - 1;
    setSelected(null);
    setHistoryIndex(newidx);
    setEnv(history[newidx]);
  };

  const handleRedo = () => {
    if (historyIndex + 1 >= history.length) {
      return;
    }
    const newidx = historyIndex + 1;
    setSelected(null);
    setHistoryIndex(newidx);
    setEnv(history[newidx]);
  };

  return (
    <div className="App">
      <div id="main-view">
        <div id="input-area">
          <DragDropContext onDragEnd={handleDragEnd}>
            <button
              type="button"
              onClick={handleUndo}
              disabled={historyIndex < 1}
            >
              undo
            </button>
            <button
              type="button"
              onClick={handleRedo}
              disabled={historyIndex + 1 >= history.length}
            >
              redo
            </button>
            <div id="mathstack-wrapper">
              <MathStack
                stack={env.stack}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
          </DragDropContext>
          <div id="command-input-wrapper">
            <Input commandAdded={commandAdd} />
          </div>
        </div>
        <div id="mathml-textarea">
          <CodeView xml={selected !== null ? env.stack[selected].elem : null} />
        </div>
      </div>
    </div>
  );
};

export default App;
