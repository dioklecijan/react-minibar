# react-minibar

> react-minibar (https://dioklecijan.github.io/react-minibar/)

[![NPM](https://img.shields.io/npm/v/react-minibar.svg)](https://www.npmjs.com/package/react-minibar) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


![Screenshot](./screenshot.png)

## Requirements

This lib uses react hooks which means you need `react` and `react-dom` 
version `16.8.0-alpha1`or higher.

## Install

```bash
npm install --save react-minibar
```

## Usage

Define minibar theme in app css file:

```css
:root {
  --minibar-background-color: #fff;
  --minibar-tab-color: rgba(66, 66, 66, 0.56);
  --minibar-hover-color: rgba(66, 66, 66);
  --minibar-active-color: rgba(66, 66, 66);
  --minibar-active-bottom-border: 1px solid rgba(128, 128, 128, 0.35);
}
```

Create minibar with tab and/or command parts:

```jsx
import React, { Component } from 'react'
import { Minibar, Tabs, Cmds } from 'react-minibar';

const tabs = [
  {
    label: 'This is tab 1',
    tooltip: 'Tab 1\tCtrl+1', 
  },
  { label: 'This is tab 2', custom: 'my custom prop' },
  { label: 'Switch theme' }  
];

// if font-awesome is in use:
const cmds = [
  { icon: 'fas fa-plus', tooltip: 'New command' },
  { icon: 'fas fa-trash-alt', tooltip: 'Clear output' },
  { icon: 'fas fa-chevron-up', tooltip: 'Maximize pane' },
  { tooltip: 'missing icon' },
  { icon: 'fas fa-times', tooltip: 'Close minibar' },
];

class Example extends Component {

  function onCmd(cmdProps) { console.log(cmsProps); }

  function onTabChanged(tabProps) { console.log(tabProps);}

  function render() {
      return (
        <div>
          <Minibar>
            <Tabs tabs={tabs} onTabChanged={onTabChanged} />
            <Cmds cmds={cmds} onCmd={onCmd} />
          </Minibar>
          <main className="main">
            other things
          </main>
        </div>
      );
  }
}
```

A complete example app with multiple themes is in `example` directory:

`npm run example`


## License

MIT © [dioklecijan](https://github.com/dioklecijan)
