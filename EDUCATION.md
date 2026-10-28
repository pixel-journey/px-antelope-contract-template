# Education

This repository is the scaffold. It is not one of the 210 quests.

## The rule that was executed

`nextPings` is a counter.

- `null` becomes 1.
- 4 becomes 5.
- `4294967295` is refused.

`npm test` runs that rule. It does not compile C++ and it does not call a chain.

## What the C++ is

`contracts/pxexample/pxexample.cpp` is the same counter written in C++. `cdt-cpp` was not run. There is no wasm and no abi.

## Client

`client/ping-action.ts` returns an unsigned action body. It does not import WharfKit and it does not broadcast.

## Why this shape

Every Tier B quest copies this layout. The tested TypeScript rule is the source of truth until a deterministic CDT build produces a wasm whose behavior matches the rule. Until that build exists, the C++ is a sketch.

See the vault EDUCATION.md for the learning path.
