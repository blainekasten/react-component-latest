window.__ui_Uniform = window.__ui_Uniform || {};
__ui_Uniform.Button = function Button() {
  return React.createElement(
    'div', null, [
      React.createElement('label', {key: 'label'}, 'Button'),
      React.createElement('button', {key: 'button'}, 'Button'),
    ]
  );
};

__ui_Uniform.Button.VERSION = '2.1.0';
