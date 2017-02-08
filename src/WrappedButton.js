import React from 'react';
import Button from './Button204';

export default class HOC extends React.Component {
  state = {
    localUpdate: null,
  };

  componentDidMount() {
    const curScript = document.currentScript;
    fetch('/validate')
      .then(res => res.json())
      .then(res => {
        if (res.valid) {
          return;
        }

        const script = document.createElement('script');
        script.src = '/Button210.js';
        script.type = 'text\/javascript';

        script.onerror = e => console.log(e);
        script.onload = () => {
          this.setState({localUpdate: window.__ui_Uniform.Button});
        };

        curScript.parentNode.insertBefore(script, curScript);
    });
  }

  render() {
    if (this.state.localUpdate) {
      const UpdatedButton = this.state.localUpdate;
      return <UpdatedButton {...this.props} />;
    }

    return <Button {...this.props}/>;
  }
}
