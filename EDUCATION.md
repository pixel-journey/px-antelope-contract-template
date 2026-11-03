# Education — the template's three small rules

> **Rung:** `npm test` passes for ping, notify, and pause. The C++ under `contracts/` is an uncompiled sketch. There is no wasm.  
> **The test is the rule.** Every other lab in the vault assumes you can read this one.

The learning path tells you to break `nextPings` on purpose and put it back. Do that before the longer courses.

## What you should be able to do

| Level | After this file |
| --- | --- |
| Beginner | Predict the next ping, a well-formed name, and which notify returns false |
| Intermediate | See that pause here is not the same function as `px-token-pausable-emergency-guard` |
| Masterclass | Notice that `shouldHandleNotify` uses one string for two different Antelope checks |

---

## Beginner — three scenes

### Ping

A missing row starts at 1. A row of 4 becomes 5. `0xffffffff` throws `ping cap`. `0` and `1.5` throw `bad count`.

### Names

`pxexample` and `eosio.token` pass. `.eosio`, `eosio.`, `UPPER`, and `toolongnamehere` throw `bad name`. The pattern is `a-z`, `1-5`, and `.`, length 1 to 12, and the dot cannot be first or last. It does not prove the account exists.

### Notify

| first receiver | contract | from | result |
| --- | --- | --- | --- |
| `mycontract` | `mycontract` | `alice` | true |
| `other` | `mycontract` | `alice` | false |
| `mycontract` | `mycontract` | `mycontract` | false |

The third row is the test named "ignores outgoing transfer from self."

### Pause

Admin `guardian` may set `paused` to true. `alice` throws `not admin`. Once paused, `canUnpause` is true for `guardian` and for `eosio.msig`, false for `alice`. If the flag is already false, `canUnpause` is false even for the admin. `canUnpause` does not write the flag. `applyPause` does not refuse a second pause. It sets `paused: true` again.

### Predict, then run

```bash
npm test
```

1. `nextPings(null)` is 1, not 0.
2. `shouldHandleNotify("other", "mycontract", "alice")` is false even though `from` is a user.
3. `canUnpause` on an unpaused state is false. There is no throw.

---

## Intermediate — what these functions are for

`nextPings` is a counter spec so a table cannot walk off `uint32`. It does not store a row. `PING_CAP` is `0xffffffff`, which is not the asset cap `2^62 - 1` used in the token labs. Do not reuse one constant for the other.

`assertName` is the same shape other labs copy. A passing name is not `require_auth`.

`shouldHandleNotify` is a boolean. It does not credit a vault. The hybrid blend course is what a credit looks like, and it throws or returns a credited amount. This file only answers "should I look at this notification?"

`applyPause` / `canUnpause` are a smaller cousin of `px-token-pausable-emergency-guard`:

| | Template | Pausable-guard lab |
| --- | --- | --- |
| Second pause | Sets true again. No throw | Throws `already paused` |
| Unpause | Returns a boolean. Does not clear the flag | Returns a new state with `paused: false` |
| Admin equals msig | Not checked | Refused at `createGuard` |
| Transfer while paused | Not in this file | `transferGate` throws |

Copying the template pause into a token and assuming transfers stop is wrong. Nothing here checks a transfer.

### Attack → test

| Attack | Naive code | This lab | Test |
| --- | --- | --- | --- |
| Start the counter at 0 | Off-by-one forever | missing row is 1 | `a new row starts at 1` |
| Increment past uint32 | Wrap to 0 | `ping cap` | `uint32 max is refused` |
| Handle a notify whose first receiver is someone else | You trust a forwarded call | false | `ignores when first receiver is another contract` |
| Handle your own outgoing transfer | Re-entry / double credit | false when `from` equals the contract string | `ignores outgoing transfer from self` |
| Alice pauses | Grief | `not admin` | `non-admin cannot pause` |
| Only the admin key can ever unpause | Deadlock | msig name returns true | `admin or msig may unpause when paused` |

---

## Masterclass — one argument is doing two jobs

`shouldHandleNotify(firstReceiver, contract, from)` returns false when `from === contract`.

In the test, `contract` is `mycontract`, and the outgoing case sets `from` to `mycontract` as well. The comment in the test calls that "from self." That reading is correct **only if the account that owns the handler is the same account as the token contract** you required as first receiver.

A vault such as `pxblend` is not `pixeljourney`. The checks that lab actually runs are:

```text
firstReceiver === tokenContract     → else "fake token"
from === self OR to !== self        → credit 0
```

Those are two names. If you pass `shouldHandleNotify(firstReceiver, "pixeljourney", from)` you will ignore transfers **from the token contract**, not transfers from your vault. If you pass `shouldHandleNotify(firstReceiver, "pxblend", from)` you will ignore a first receiver that is not your vault, which is the opposite of "only the token contract's notify." The boolean cannot express both.

On chain, `get_first_receiver()` and `get_self()` are different calls. The vault standard requires both. This function is the picture, with the two calls collapsed. Do not compile that collapse into a third-party escrow.

`eosio.msig` here is a string that makes `canUnpause` return true. It is not a proposal. The pause-guard course says the same thing at more length.

`contracts/src/px_template.cpp` and `contracts/pxexample/pxexample.cpp` are sketches. `npm test` does not compile them. A workflow file in this repo is not a recorded wasm. The compiler course is `px-ci-cdt-deterministic-compiler`, and it has not been run either.

### Exercise

1. `nextPings(4)`? (5. Tested.)
2. Why is `shouldHandleNotify` the wrong helper for a PXJ deposit into `pxblend`? (It has only one contract string. The blend lab needs the token contract and `self` separately.)
3. Does `canUnpause` clear `paused`? (No. It returns a boolean. Tested by reading the return value, not a written state.)

---

## What this course will not teach

- A deployed template contract
- That every later lab's notify helper is this function (the blend lab is not)
- A multisig proposal
