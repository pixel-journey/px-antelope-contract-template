# Security checklist for Antelope contracts

Use this list when reviewing or extending any example in the organization.

## Authorization

- Call `require_auth` or check `has_auth` before any state change.
- Owner-only paths (unstake, withdraw, claim, update of personal data) must verify the caller is the recorded owner.
- Admin paths must verify the configured admin, not merely `get_self()` after the first configuration.
- Notification handlers must check `get_first_receiver()` and return early on outgoing transfers.

```cpp
// Owner-only unstake
require_auth(owner);
check(owner == row.owner, "not the owner");
```

### Notify: one string is not enough when the vault is not the token

`shouldHandleNotify` in this template uses **one** `contract` argument for both "first receiver is the token" and "from is self." That is correct only when the handler account **is** the token contract.

A vault such as `pxblend` is not `pixeljourney`. Those checks are two names:

```cpp
// Token contract and self are different accounts.
if (get_first_receiver() != token_contract) return;
if (from == get_self() || to != get_self()) return;
```

Do not paste the collapsed helper into a third-party escrow. The hybrid blend course is the longer version: [px-blend-hybrid-ft-plus-nft](https://github.com/pixel-journey/px-blend-hybrid-ft-plus-nft).

## Inputs

- Reject negative quantities where a negative value is meaningless.
- Reject zero when a positive amount is required.
- Check symbol **and** precision on every asset. Letters `PXJ` are not enough.
- Bound string lengths and vector sizes.
- Refuse values that would overflow the destination type (uint32, uint64, int64 asset amount).

```cpp
check(quantity.amount > 0, "must be positive");
check(quantity.symbol == symbol("WAX", 8), "wrong symbol");
check(value <= 1000000, "exceeds cap");
```

**PXJ precision is always 8** in this organization. `1.00000000 PXJ` is `100000000` minor units. `1.0000 PXJ` is a different asset.

## Arithmetic

- Prefer checked operations or explicit bounds before multiply/divide.
- Be careful with signed/unsigned conversions.
- Asset amounts are int64; stay well below `2^62 - 1`.
- Tax, fee, and reward calculations must not wrap. Use a wide intermediate (`int128` / `bigint`) before `/ 10000`.
- Do not pass those magnitudes through JavaScript `Number`. `Number(2^62 - 1)` collides with one past it.

```cpp
// Wide intermediate. Wallet path only: tax must be strictly less than amount.
int128_t tax = (int128_t)amount * bps / 10000;
check(tax >= 0 && tax < amount, "bad tax");
```

That `tax < amount` check is the **wallet** rule (the recipient shrinks). A DEX path keeps `delivered == qty` and adds tax on top, so the sender debit can exceed `qty`. Do not paste the wallet check onto a pool transfer. See [wallet tax](https://github.com/pixel-journey/px-token-transfer-tax-burn-treasury) and [DEX tax](https://github.com/pixel-journey/px-token-dex-differentiated-tax).

## State

- AtomicAssets `setassetdata` replaces the **whole** map. A one-key object wipes every other key.
- Random-result escrows resolve **once**. A second callback must not recompute the payout.
- DEX-facing transfers deliver the exact quantity the pair quoted.
- Pause must leave a recovery path that is not the same key as admin. The string `eosio.msig` in action data is not a completed proposal.
- A failed early gate must not burn a later nonce, credit, or payout.

## Facts the domain labs already lock

| Topic | Do not collapse |
| --- | --- |
| Reject windows | Coinflip **254–255** · dice **200–255** · roulette **222–255**. Never settle a rejected sample |
| House number 19600 | Coinflip on stake 10000 at chance 50. Dice under-50 uses chance **49** |
| Bank reserve | Coinflip, dice, and roulette reserve **at place**, not when entropy arrives |
| Second callback | Dual-callback freezes. Coinflip throws `random mismatch` on a different second hex |
| Credits | Free, then paid, then 0.01 WAX top-up, then stake. Do not charge all four for one call |
| ORNG vs CPU | Stake is not `powerup` |
| Fee legs | Basis points sum to **10000**. Last leg keeps the remainder |
| Vesting | Before the cliff, vested is 0. The line is still measured from `start` |
| Vault shares | Floor on mint, ceil on burn. First-depositor inflation is demonstrated, not fixed |
| Virtual points | Peer transfer always throws. Spend does not cut `lifetimeEarned` |
| RNG on WAX | Prefer `orng.wax`. Commit-reveal, TAPOS, drand, and cross-chain facades are educational |
| Compiler | Two workflow files, two image pins, zero recorded compiles in the educational CI repo. YAML is not a wasm hash |

## What this file is not

It is not a substitute for the specific example's test and EDUCATION.md. It is the shared reminder of the checks that should appear in every contract example. Path: `px-contract-examples-vault` (private; not this public course).
