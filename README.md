# px-antelope-contract-template

> **Trust label:** private Tier B scaffold  
> **Status:** Tested TypeScript invariants + uncompiled C++ sketches  
> **Vault:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)

Layout for a small Antelope contract example. **Private. Nothing here is deployed.**

This repository is the **scaffold**. It is not one of the named patterns in the vault’s 210-quest list.

---

## Deep docs

| Guide | Purpose |
|-------|---------|
| [docs/TEMPLATE-WALKTHROUGH.md](docs/TEMPLATE-WALKTHROUGH.md) | Mental model, fork checklist, test vs sketch |
| [EDUCATION.md](EDUCATION.md) | What was executed |
| [SECURITY.md](SECURITY.md) | Shared authorization / input / arithmetic checklist |
| [INTEGER-SAFETY.md](INTEGER-SAFETY.md) | Bounds and overflow |
| [AUTHORIZATION.md](AUTHORIZATION.md) | Owner, admin, notify |
| [PAUSE-RECOVERY.md](PAUSE-RECOVERY.md) | Pause + msig path |
| [RAM-PAYER.md](RAM-PAYER.md) | Who pays for rows |
| [ACCOUNT-NAMES.md](ACCOUNT-NAMES.md) | Name rules |

---

## What is true (do not weaken)

- `nextPings(null)` is 1. `nextPings(4)` is 5. `nextPings(4294967295)` is refused.
- `shouldHandleNotify` returns true only when the contract is the first receiver and the transfer is not outgoing from itself.
- Admin may pause. Admin or `eosio.msig` may unpause. Non-admin cannot pause.
- `client/ping-action.ts` returns an **unsigned** action body. It does not import WharfKit and it does not broadcast.
- `contracts/pxexample/pxexample.cpp` is the same counter in C++. **`cdt-cpp` was not run. There is no wasm and no abi.**
- `.github/workflows/cdt.yml` calls the deterministic compiler on `workflow_dispatch` only. **That call was not dispatched.**

---

## Run the rules

```bash
npm test
```

Runs `node --test` on the TypeScript rules. Does **not** download CDT.

---

## Layout

| Path | Role |
| --- | --- |
| `invariants/` | Rules that were executed (ping, notification hygiene, pause) |
| `contracts/pxexample/pxexample.cpp` | Uncompiled C++ for the ping counter |
| `contracts/src/px_template.cpp` | Uncompiled pause sketch — not read by `npm test` |
| `client/ping-action.ts` | Unsigned action body |
| `SECURITY.md` + companion notes | Shared engineering checklists |
| `.github/workflows/cdt.yml` | Manual compile — not run |

---

## Relationship to the vault

- **Vault** indexes which contract example repos exist and whether a rule was executed.
- **This template** is what every new Tier B quest copies.
- **QUEST-INDEX / CATALOG.json** name 210 patterns; a name is **not** a repository until built.

Pass rules (from vault):

1. One repo, one rule that `npm test` runs (template carries the starter set).
2. An unsigned action body is not a broadcast.
3. C++ without wasm from the pinned workflow is uncompiled.
4. Do not describe a sketch as an implementation.
5. Stay private.

---

*Last updated: 2026-10-29 — Deep educational pass: walkthrough doc + expanded README.*
