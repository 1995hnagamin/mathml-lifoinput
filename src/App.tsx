import React from 'react';
import Input from './components/Input';
import MathStack from './components/MathStack';
import './App.css';

const App = () => {
  const [stack, setStack] = React.useState<JSX.Element[]>([]);

  const commandAdd = (cmd: string) => {
    setStack([
      ...stack,
      <li key={stack.length}>
        {
          React.createElement('math', {},
            React.createElement('mn', {}, cmd)
          )
        }
      </li>
    ]);
  };

  return (
    <div className="App">
      <Input commandAdded={commandAdd}/>
      <MathStack stack={stack}/>
    </div>
  );
};

export default App;
