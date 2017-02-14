import React from 'react';
import { version } from '../package.json';

export default class HOC extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    componentName: React.PropTypes.string,
  }

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

    window.uniformFetchState = 'fetching';

    fetch(`/validate?version=${version}`)
      .then(res => res.json())
      .then(res => {
        window.uniformFetchState = 'fetched';
        if (res.valid) {
          return;
        }

        Promise.all([
          this.loadJSEndpoint(res.updateEndpointJS),
          this.loadCSSEndpoint(res.updateEndpointCSS),
        ]).then(() => {
          this.setState({localUpdate: window.__uniform.default[this.props.componentName]});
        }).catch(e => {
          console.log('ERROR', e);
        });
      });
  }

  loadJSEndpoint(endpoint) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = endpoint;
      script.type = 'text/javascript';

      script.onerror = e => reject(e);
      script.onload = () => {
        resolve();
      };

      document.head.appendChild(script);
    });
  }

  loadCSSEndpoint(endpoint) {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.href = endpoint;
      link.type = 'text/css';
      link.rel = 'stylesheet';

      link.onerror = e => reject(e);
      link.onload = () => {
        resolve();
      };

      document.head.appendChild(link);
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

