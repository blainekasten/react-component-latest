import React from 'react';
import Wrap from './Wrap';

function Button() {
  return (
    <div>
      <button className='button204'>Button</button>
    </div>
  );
}

Button.VERSION = '2.0.4';

export default () => <Wrap componentName="Button"><Button /></Wrap>;
