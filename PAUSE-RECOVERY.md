# Pause and recovery

A pause switch that can only be cleared by a single key is a deadlock risk.

## Pattern

- Pause may be called by a configured guardian or admin.
- Unpause must also be reachable via `eosio.msig` (or an equivalent multi-signature path) so that loss of a single key does not freeze the contract permanently.
- While paused, state-changing actions that move user funds must refuse; view-only or recovery actions may still proceed.

## What is not yet shown

No example in the organization currently contains a tested TypeScript rule for a pause/unpause pair. The uncompiled `px_template.cpp` sketch contains a pause action but is not executed by `npm test`.

When a pause example is added, it must demonstrate both the refusal while paused and the msig recovery path.
