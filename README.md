# slim-react-loadable
```
 one day, when i use react-loadable in my project 
 i felt so interested in how it works in split some components
 so i try to explore the magic of it
 here i take the core of principle of react-loadable, and explain it in typescript
 that's why slim-react-loadable here

```
# usage
```

import Loadabler from 'slim-react-loadable';

const loadExample = new Loadabler({
  loader: () => import('./demo'),
  loading: () => null,
});

return loadExample.createLoadableComponent();

```

# Api
```
├── createLoadableComponent  # make an object of loadable               
├── preload  # load component before use it
  
```