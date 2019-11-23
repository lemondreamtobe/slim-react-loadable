import * as React from 'react';
import {LoadableComponentProps, LoadableComponentStates, State} from './interface';

export default function CreateLoadableComponent(props: LoadableComponentProps) {
  const {load, init, loading} = props;

  return class LoadableComponent extends React.Component<LoadableComponentProps, LoadableComponentStates> {
    mounted: boolean;
    res: State;

    constructor(props) {
      super(props);
      const res = init();
      this.res = res;
      
      this.state = {
        error: res.error,
        loading: res.loading,
        loaded: res.loaded
      };
    }

    componentWillMount() {
      this.mounted = true;
      this._loadModule();
    }

    _loadModule() {

      if (!this.res.loading) {
        return;
      }

      const update = () => {
        if (!this.mounted) {
          return;
        }

        this.setState({
          error: this.res.error,
          loaded: this.res.loaded,
          loading: this.res.loading
        });
      };

      this.res.promise
        .then(() => {
          update();
        })
        .catch(err => {
          update();
          console.log(err);
        });
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    retry = () => {
      this.setState({error: null, loading: true});
      this.res = load();
      this._loadModule();
    };

    resolve(obj) {
      return obj && obj.__esModule ? obj.default : obj;
    }

    _render(loaded, props) {
      return React.createElement(this.resolve(loaded), props);
    }

    render() {
      if (this.state.loading || this.state.error) {
        return React.createElement(loading, {
          isLoading: this.state.loading,
          error: this.state.error,
          retry: this.retry
        });
      } else if (this.state.loaded) {
        return this._render(this.state.loaded, this.props);
      } else {
        return null;
      }
    }
  }
}


