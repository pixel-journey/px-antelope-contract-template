# Authorization patterns

These examples treat authorization as a precondition, not an afterthought.

## Owner-only paths

Unstake, withdraw, claim, or update of personal data must verify that the caller is the recorded owner.

```cpp
require_auth(owner);
check(owner == row.owner, "not the owner");
```

## Admin paths

Rate changes, recipe updates, or pool configuration must check the configured admin. After the first configuration, `get_self()` alone is not sufficient.

## Notification handlers

```cpp
if (get_first_receiver() != get_self() || from == get_self()) return;
```

The tested rule `shouldHandleNotify` in this repository encodes the same condition.

## What is not yet shown

No example in the organization currently demonstrates a full secondary-permission check against an AtomicAssets collection author. That check belongs in the mutable-update example once the asset read is present.
