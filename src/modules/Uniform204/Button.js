import React from 'react';
import Wrap from './Wrap';

function Button() {
  return (
    <div><button>Button</button></div>
  );
}

Button.VERSION = '2.0.4';
Button.displayName = 'Button';

export default Wrap(Button);
