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

// Notification hygiene
if (get_first_receiver() != get_self() || from == get_self()) return;
```

## Inputs

- Reject negative quantities where a negative value is meaningless.
- Reject zero when a positive amount is required.
- Check symbol and precision on every asset.
- Bound string lengths and vector sizes.
- Refuse values that would overflow the destination type (uint32, uint64, int64 asset amount).

```cpp
check(quantity.amount > 0, "must be positive");
check(quantity.symbol == symbol("WAX", 8), "wrong symbol");
check(value <= 1000000, "exceeds cap");
```

## Arithmetic

- Prefer checked operations or explicit bounds before multiply/divide.
- Be careful with signed/unsigned conversions.
- Asset amounts are int64; stay well below `2^62 - 1`.
- Tax, fee, and reward calculations must not wrap.

```cpp
// Wide intermediate for tax
int128_t tax = (int128_t)amount * bps / 10000;
check(tax >= 0 && tax < amount, "bad tax");
```

## State

- AtomicAssets `setassetdata` must write the full map.
- Random-result escrows must resolve once and then erase.
- DEX-facing transfers must deliver the exact quantity the pair expects.
- Pause switches must leave an `eosio.msig` recovery path.

## What this file is not

It is not a substitute for reading the specific example's test and EDUCATION.md. It is the shared reminder of the checks that should appear in every contract example.
