# px-antelope-contract-template

Layout for a small Antelope contract example. Private. Nothing here is deployed.

This repository is the scaffold. It is not one of the named patterns in the vault.

## What is true

- `nextPings(null)` is 1. `nextPings(4)` is 5. `nextPings(4294967295)` is refused.
- `shouldHandleNotify` returns true only when the contract is the first receiver and the transfer is not outgoing from itself.
- `client/ping-action.ts` returns an unsigned action body. It does not import WharfKit and it does not broadcast.
- `contracts/pxexample/pxexample.cpp` is the same counter in C++. `cdt-cpp` was not run. There is no wasm and no abi.
- `.github/workflows/cdt.yml` calls the deterministic compiler on `workflow_dispatch` only. That call was not dispatched.

## Run the rules

```bash
npm test
```

That runs `node --test` on the TypeScript rules. It does not download CDT.

## Layout

| Path | Role |
| --- | --- |
| `invariants/` | Rules that were executed (ping counter, notification hygiene). |
| `contracts/pxexample/pxexample.cpp` | Uncompiled C++ for the ping counter. |
| `client/ping-action.ts` | Unsigned action body. |
| `SECURITY.md` | Shared checklist. |
| `INTEGER-SAFETY.md` | Notes on bounds and overflow. |
| `.github/workflows/cdt.yml` | Manual compile. Not run. |

## Extra file

`contracts/src/px_template.cpp` is an uncompiled pause action. `npm test` does not read it. `.github/workflows/px-contract-build.yml` is a second, unused pin.
