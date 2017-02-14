import React, { Component } from 'react';

const HOC = WrappedComponent => class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      localUpdate: null,
    };
  }

  componentDidMount() {
    // things have already fetched once
    if (window.uniformFetchState) return;

    const curScript = document.currentScript;
    window.uniformFetchState = 'fetching';

    fetch('/validate')
      .then(res => res.json())
      .then(res => {
        window.uniformFetchState = 'fetched';
        if (res.valid) return;

        const script = document.createElement('script');
        script.src = res.updateEndpoint;
        script.type = 'text/javascript';

        script.onerror = e => console.log(e);
        script.onload = () => {
          console.log(window.__uniform);
          this.setState({localUpdate: window.__uniform.default[WrappedComponent.displayName]});
        };

        curScript.parentNode.insertBefore(script, curScript);
      });
  }

  render() {
    const ComponentToUse = this.state.localUpdate || WrappedComponent;

    return <ComponentToUse />
  }
}


export default HOC;
