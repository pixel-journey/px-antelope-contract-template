# px-antelope-contract-template

> **Trust label:** private Tier B scaffold  
> **Status:** Tested TypeScript invariants; production wasm for `pxexample`  
> **Vault:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)

Layout for a small Antelope contract example. **Private. Nothing here is deployed.**

This repository is the **scaffold**. It is not one of the named patterns in the vault’s 210-quest list.

---

## Compile path (production)

The C++ in `contracts/pxexample/pxexample.cpp` is mirrored under [wax-contract-compiler](https://github.com/pixel-journey/wax-contract-compiler) as `contracts/pxexample/`.

**Verified binary (not in this repo):**

| Item | Value |
| --- | --- |
| Run | [Compile Contracts #22](https://github.com/pixel-journey/wax-contract-compiler/actions/runs/42819559097) |
| Path | `compiled-contracts/pxexample/` |
| CDT | `waxteam/cdt:v5.0.3wax02-v4.1.0` |
| WASM SHA256 | `dd1b7bf5526e73526707c3f04e7170287b6d7d54e7dbb18a4ba1ec9bd3e8ccdb` |
| ABI SHA256 | `63b581a59ae636424a0c97e490b4f8b32cc4eef4960fd2115179043fd8cf3327` |
| Audit | 0 errors / 0 warnings |

This template still does **not** store a wasm. Binaries live only in the production compiler. Not claimed deployed.

| Repo | Role |
| --- | --- |
| **This repo** | TypeScript rules + scaffold + unsigned action body |
| **wax-contract-compiler** | Production CDT build of `pxexample` (verified) |
| **px-ci-cdt-deterministic-compiler** | Educational reusable workflow (not the day-to-day pipeline) |

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
- `contracts/pxexample/pxexample.cpp` matches the production mirror. Wasm is verified in `wax-contract-compiler`, not committed here.
- `.github/workflows/cdt.yml` calls the educational deterministic compiler on `workflow_dispatch` only. **That call was not dispatched.**

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
| `contracts/pxexample/pxexample.cpp` | Ping counter C++ (mirrored; production-compiled) |
| `contracts/src/px_template.cpp` | Uncompiled pause sketch — not read by `npm test` |
| `client/ping-action.ts` | Unsigned action body |
| `SECURITY.md` + companion notes | Shared engineering checklists |
| `.github/workflows/cdt.yml` | Manual educational compile — not run |

---

## Relationship to the vault

- **Vault** indexes which contract example repos exist and whether a rule was executed.
- **This template** is what every new Tier B quest copies.
- **QUEST-INDEX / CATALOG.json** name 210 patterns; a name is **not** a repository until built.

Pass rules (from vault):

1. One repo, one rule that `npm test` runs (template carries the starter set).
2. An unsigned action body is not a broadcast.
3. Production wasm lives in `wax-contract-compiler`; this repo does not store one.
4. Do not describe a sketch as a deployed implementation.
5. Stay private.

---

*Last updated: 2026-11-10 — pxexample wasm verified (run 22).*
