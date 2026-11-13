# Antelope contract template (TypeScript rules + production mirrors)

> **Role:** Scaffold for small WAX/Antelope education contracts  
> **Vault:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)

**Goal:** Layout for a micro-contract example with **executed TypeScript invariants**, unsigned client action body, and pointers to **production wasm** in `wax-contract-compiler`. **Nothing in this repo is deployed.**

---

## Compile path (production)

| TypeScript rule | Production contract | Run | WASM SHA256 |
| --- | --- | --- | --- |
| `invariants/ping.ts` | [`pxexample`](https://github.com/pixel-journey/wax-contract-compiler/tree/main/contracts/pxexample) | [22](https://github.com/pixel-journey/wax-contract-compiler/actions/runs/42819559097) | `dd1b7bf5526e73526707c3f04e7170287b6d7d54e7dbb18a4ba1ec9bd3e8ccdb` |
| `invariants/notify.ts` | [`pxnotify`](https://github.com/pixel-journey/wax-contract-compiler/tree/main/contracts/pxnotify) | [25](https://github.com/pixel-journey/wax-contract-compiler/actions/runs/42823050242) | `ab68a840ee266711ef7e71910203355bc07df20373b18f1b95120d4c4464a8ab` |
| `invariants/pause.ts` | [`pxguard`](https://github.com/pixel-journey/wax-contract-compiler/tree/main/contracts/pxguard) | [24](https://github.com/pixel-journey/wax-contract-compiler/actions/runs/42821960554) | `da54a7088823f5f0a6edc0a690c64b825efc4739253da636806997677f7b6f6a` |

CDT pin: `waxteam/cdt:v5.0.3wax02-v4.1.0`. Audit 0/0. **Not deployed.** This template does **not** store wasm files.

| Repo | Role |
| --- | --- |
| **This repo** | TypeScript rules + scaffold + unsigned action body |
| **wax-contract-compiler** | Production CDT builds |
| **px-ci-cdt-deterministic-compiler** | Educational reusable workflow (not the day-to-day pipeline) |

---

## Deep docs

| Guide | Purpose |
|-------|---------|
| [docs/TEMPLATE-WALKTHROUGH.md](docs/TEMPLATE-WALKTHROUGH.md) | Mental model, fork checklist |
| [EDUCATION.md](EDUCATION.md) | What was executed |
| [SECURITY.md](SECURITY.md) | Auth / input / arithmetic checklist |
| [INTEGER-SAFETY.md](INTEGER-SAFETY.md) | Bounds and overflow |
| [AUTHORIZATION.md](AUTHORIZATION.md) | Owner, admin, notify |
| [PAUSE-RECOVERY.md](PAUSE-RECOVERY.md) | Pause + msig path |
| [RAM-PAYER.md](RAM-PAYER.md) | Who pays for rows |
| [ACCOUNT-NAMES.md](ACCOUNT-NAMES.md) | Name rules |

---

## What is true (executed)

- `nextPings(null)` is 1. `nextPings(4)` is 5. `nextPings(4294967295)` is refused.
- `shouldHandleNotify` is true only when the contract is the first receiver and the transfer is not outgoing from itself.
- Admin may pause. Admin or `eosio.msig` may unpause. Non-admin cannot pause.
- `client/ping-action.ts` returns an **unsigned** action body (no broadcast).
- Production wasm lives in `wax-contract-compiler`; `.github/workflows/cdt.yml` here is educational and was not dispatched.

---

## Run

```bash
npm test
```

Runs the TypeScript rules. Does **not** download CDT.

---

## Layout

| Path | Role |
| --- | --- |
| `invariants/` | ping, notification hygiene, pause |
| `contracts/pxexample/` | Ping counter C++ (mirrored; production-compiled elsewhere) |
| `client/ping-action.ts` | Unsigned action body |
| Companion `*.md` | Shared engineering checklists |

## Relationship to the vault

- **Vault** indexes which labs exist and whether a rule was executed.
- **This template** is the starter layout new labs can copy.
- **CATALOG / QUEST-INDEX** name patterns; a name is not a repository until built.
- Shared pure gates → [px-invariant-kit](https://github.com/pixel-journey/px-invariant-kit).

Pass rules: one focused rule set under `npm test`; unsigned ≠ broadcast; no fake deployment claims.

---

*pxexample (22), pxguard (24), pxnotify (25) — production mirrors in wax-contract-compiler.*
