import React from 'react';
import Wrap from './Wrap';

export function Button() {
  return (
    <div>
      <label>Tada!</label>
      <button className='button210'>Button</button>
    </div>
  );
}

Button.VERSION = '2.1.0';
Button.displayName = 'Button';

export default Wrap(Button);
