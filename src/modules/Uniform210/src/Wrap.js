import React from 'react';

export default class HOC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localUpdate: null,
    };
  }

  componentDidMount() {
    // things have already fetched once
    if (window.uniformFetchState) {
      return;
    }

    const curScript = document.currentScript;
    window.uniformFetchState = 'fetching';

    fetch('/validate')
      .then(res => res.json())
      .then(res => {
        window.uniformFetchState = 'fetched';
        if (res.valid) {
          return;
        }

        const script = document.createElement('script');
        script.src = res.updateEndpoint;
        script.type = 'text\/javascript';

        script.onerror = e => console.log(e);
        script.onload = () => {
          this.setState({localUpdate: window.__uniform.default[this.props.componentName]});
        };

        curScript.parentNode.insertBefore(script, curScript);
      });
  }

  render() {
    if (this.state.localUpdate) {
      const UpdatedComponent = this.state.localUpdate;
      return <UpdatedComponent {...this.props} />;
    }

    return this.props.children;
  }
}

HOC.propTypes = {
  children: React.PropTypes.node,
}
