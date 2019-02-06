import React from 'react';
import './minibar.css';

/**
 * @typedef CmdProperty
 * @type Object
 * @property {string} icon
 * @property {string} tooltip
 *
 * @typedef CmdsProperties
 * @type Object
 * @property {Array<CmdProperty>} cmds
 * @property {({index: number, ...CmdProperty}) => mixed} onCmd
 * @property {object} [style]
 */

/**
 * @param {CmdProperties}
 */
export default function Cmds({ cmds, onCmd, style }) {
  // rendering parts
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  function renderCmds() {
    return cmds.map((cmd, idx) => (
      <button
        className="item cmd"
        title={cmd.tooltip}
        key={idx}
        tabIndex={idx}
        onClick={() => onCmd({ index: idx, ...cmd })}
      >
        {cmd.icon ? <i className={cmd.icon} /> : <span>&#888;</span>}
      </button>
    ));
  }

  // public
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  function render() {
    return (
      <div className="section" style={style}>
        {renderCmds()}
      </div>
    );
  }

  return render();
}
