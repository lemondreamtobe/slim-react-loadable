# slim-react-loadable
explore how loadable works and explain it in typescript

# usage
```

import Loadabler from './index';

const loadExample = new Loadabler({
  loader: () => import('./demo'),
  loading: () => null,
});

return loadExample.createLoadableComponent();

```

# Api
```
├── createLoadableComponent  # 生成loadable               
├── preload  # 组件预加载
  
```