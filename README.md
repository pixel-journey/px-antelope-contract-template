# px-antelope-contract-template

Layout for a PxDev Tier B micro-contract. Private. Not a template repository flag on GitHub yet. Nothing here is deployed.

## What is true

- `nextPings(null)` is 1. `nextPings(4)` is 5. `nextPings(4294967295)` is refused.
- `client/ping-action.ts` returns an unsigned action body. It does not import WharfKit and it does not broadcast.
- `contracts/pxexample/pxexample.cpp` is the same counter in C++. `cdt-cpp` was not run. There is no wasm and no abi in this repo.
- `.github/workflows/cdt.yml` calls `px-ci-cdt-deterministic-compiler` on `workflow_dispatch` only. That call was not dispatched.
- `pxexample` is not a WAX account.

## Run the rules

```bash
npm test
```

That runs `node --test` on the TypeScript rules. It does not download CDT.

## Layout

| Path | Role |
| --- | --- |
| `contracts/pxexample/pxexample.cpp` | Contract source. Uncompiled. |
| `invariants/` | Rules that were executed. |
| `client/` | Unsigned action bodies. |
| `.github/workflows/cdt.yml` | Manual compile. Not run. |
