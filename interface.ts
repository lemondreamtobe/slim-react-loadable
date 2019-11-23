import { ReactElement} from "react";

interface Options {
  loader: () => Promise<any>;
  loading: () => ReactElement
}

interface LoadStatus {
  __esModule?: boolean;
  default?: any;
}

interface State {
  loading: boolean,
  loaded: LoadStatus,
  error: Error,
  promise?: Promise<any>
}

interface LoadableComponentProps {
  init: () => State;
  load: () => State;
  loading: () => ReactElement;
}

interface LoadableComponentStates extends State {
}

export {
  Options,
  State,
  LoadableComponentStates,
  LoadableComponentProps
} 