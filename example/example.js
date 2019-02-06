import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Minibar, Tabs, Cmds } from '../src/index';
import { darkTheme, lightTheme } from './themes';
import './example.css';

const tabs = [
  {
    label: 'This is tab 1',
    tooltip: 'Tab 1\tCtrl+1',
    custom: 'custom attrib',
  },
  { label: 'This is tab 2' },
  { label: 'Switch theme' },
  { label: 'This is a long title tab' },
];

const cmds = [
  { icon: 'fas fa-plus', tooltip: 'New command' },
  { icon: 'fas fa-trash-alt', tooltip: 'Clear output' },
  { icon: 'fas fa-chevron-up', tooltip: 'Maximize pane' },
  { tooltip: 'missing icon' },
  { icon: 'fas fa-times', tooltip: 'Close minibar' },
];

function App() {
  const [log, setLog] = useState([]);
  const [theme, setTheme] = useState(lightTheme);

  function onCmd(cmdProps) {
    const { index, tooltip } = cmdProps;
    const entry = `${new Date().toLocaleTimeString()}\t${index}\t${tooltip}`;
    setLog([...log, entry]);
  }

  // function onTabChanged({ index, label, ...rest }) {
  function onTabChanged(tabProps) {
    const { index, label } = tabProps;
    const entry = `${new Date().toLocaleTimeString()}\t${index}\t${label}`;
    setLog([...log, entry]);
    if (index === 2) switchTheme();
  }

  function switchTheme() {
    const nextTheme = theme === lightTheme ? darkTheme : lightTheme;
    const keys = Object.keys(nextTheme);
    for (let i = 0; i < keys.length; i++)
      document.documentElement.style.setProperty(keys[i], nextTheme[keys[i]]);
    setTheme(nextTheme);
  }

  function render() {
    return (
      <div className="container">
        <Minibar>
          <Tabs tabs={tabs} onTabChanged={onTabChanged} />
          <Cmds cmds={cmds} onCmd={onCmd} />
        </Minibar>
        <main className="main">
          {log.map((l, i) => (
            <pre key={i}>{l}</pre>
          ))}
        </main>
      </div>
    );
  }
  return render();
}

ReactDOM.render(<App />, document.getElementById('app'));
