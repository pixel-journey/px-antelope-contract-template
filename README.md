# px-antelope-contract-template

Layout for a PxDev Tier B micro-contract. Private. Not a template repository flag on GitHub yet. Nothing here is deployed.

This repository is not one of the 210 quest names.

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
| `contracts/pxexample/pxexample.cpp` | Contract source for the ping counter. Uncompiled. |
| `invariants/` | Rules that were executed. |
| `client/ping-action.ts` | Unsigned action body. |
| `.github/workflows/cdt.yml` | Manual compile against the pinned waxteam image. Not run. |

## Extra file

`contracts/src/px_template.cpp` is an uncompiled pause action. `npm test` does not read it. It is not the ping counter. `.github/workflows/px-contract-build.yml` is a second, unused pin (`ghcr.io/antelopeio/cdt:4.1.0`).
