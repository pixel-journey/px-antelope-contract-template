# Template Walkthrough

**Repo:** `px-antelope-contract-template`  
**Status:** Scaffold for Tier B micro-contracts — **not deployed**, **no wasm produced here**

---

## Purpose

Copy this layout when a quest from `px-contract-examples-vault` earns its own repository. The **tested TypeScript rule** is the source of truth until a deterministic CDT build produces matching wasm.

---

## Mental model

```
┌─────────────────────────────────────┐
│  invariants/*.ts  +  *.test.ts      │  ← executed by npm test
└─────────────────────────────────────┘
                 ▲
                 │ must match intent
┌─────────────────────────────────────┐
│  contracts/**/*.cpp                 │  ← sketch until CDT wasm exists
└─────────────────────────────────────┘
                 ▲
                 │ unsigned only
┌─────────────────────────────────────┐
│  client/*-action.ts                 │  ← no broadcast
└─────────────────────────────────────┘
```

---

## Executed rules in this template

| Rule | Module | Claim |
|------|--------|-------|
| Ping counter | `invariants/ping.ts` | `null→1`, `4→5`, `uint32 max` refused |
| Notify hygiene | `invariants/notify.ts` | First receiver + not outgoing from self |
| Pause | `invariants/pause.ts` | Admin pause; admin or `eosio.msig` unpause |

Run:

```bash
npm test
```

Does **not** download CDT. Does **not** open a socket.

---

## C++ sketches

| Path | Role |
|------|------|
| `contracts/pxexample/pxexample.cpp` | Ping counter in C++ — **uncompiled** |
| `contracts/src/px_template.cpp` | Pause action sketch — **uncompiled**, not read by `npm test` |

If C++ disagrees with invariants, **the test wins** until a pinned CDT workflow produces wasm and the tests are updated to match measured behavior.

---

## Client

`client/ping-action.ts` returns an **unsigned** action body. No WharfKit import required for that function. No broadcast.

---

## Workflows

| Workflow | State |
|----------|-------|
| `.github/workflows/cdt.yml` | Manual `workflow_dispatch` only — **not claimed run** |
| `.github/workflows/px-contract-build.yml` | Second pin — unused until wired |

See `px-ci-cdt-deterministic-compiler` for the shared compile story.

---

## Checklist when forking for a new quest

1. Rename contract folder / identifiers
2. Replace invariants with **one** focused rule + exploit refusal tests
3. Update README honesty table (what runs vs what is sketch)
4. Keep SECURITY / INTEGER-SAFETY / AUTHORIZATION / PAUSE-RECOVERY / RAM-PAYER notes
5. Stay private until verification and security review standards are met

---

*Pixel Journey — Test the rule; sketch the C++; never invent the wasm.*
