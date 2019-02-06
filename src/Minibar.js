import React from 'react';
import './minibar.css';

export default function Minibar({ children }) {
  // refs
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // state vars
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // effects
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // event handlers
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // local helpers
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // rendering parts
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // public
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  function render() {
    return <div className="minibar">{children}</div>;
  }

  return render();
}

Minibar.defaultProps = {};
