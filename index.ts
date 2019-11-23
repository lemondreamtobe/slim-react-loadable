import {Options, State} from './interface';
import createComponent from './create';

export default class Loadable {
  options: Options;
  init: () => State;

  constructor(options: Options) {
    if (!options.loading) {
      throw new Error("react-loadable requires a `loading` component");
    }

    const opts = Object.assign(
      {
        loader: null,
        loading: null,
      },
      options
    );

    this.options = opts;
  }

  preload() {
    return this.init();
  }

  load(loader) {
    const promise = loader();

    const state: State = {
      loading: true,
      loaded: null,
      error: null
    };

    state.promise = promise
      .then(loaded => {
        state.loading = false;
        state.loaded = loaded;
        return loaded;
      })
      .catch(err => {
        state.loading = false;
        state.error = err;
        throw err;
      });

    return state;
  }


  createLoadableComponent() {
    const options = this.options;

    if (!options.loading) {
      throw new Error("react-loadable requires a `loading` component");
    }


    const init = () => {
      const res = this.load(options.loader);
      return res;
    };

    this.init = init;

    const load = () => this.load(options.loader)
    const loading = options.loading;

    return createComponent({init, load, loading});
  }
}