> This module is for testing pourposes only in hope to grow up and become a real set of useful slate-plugins
> but you have interesting examples (my goals are not completed yet, the following are completed):
>
> 1. Use lerna to manage and bootstrap monorepos.
> 2. Get advantage of npx to take the commands from the root module (where all the not local packages are actually installed) and transpile typescript with rollup.
> 3. Transpile typescript and typescript XML:like syntax with rollup.
> 4. Use parcel for fast development (if it's useful please use it, this topic it's not actually related yet with the above).

```console
john@doe master:xxxx
(22:26:50) ~/d/j/slate-plugins ❯❯❯ npx lerna link

john@doe master:xxxx
(22:26:54) ~/d/j/slate-plugins ❯❯❯ npx lerna bootstrap --hoist

john@doe master:xxxx
(22:26:60) ~/d/j/slate-plugins ❯❯❯ npm start
```

> Thanks for reading, I hope you can learn along with me.
