# Account name validation

Antelope account names are 1–12 characters from `a-z`, `1-5`, and `.`, and must not start or end with a dot.

## Why the check exists

An invalid name will fail later when the chain tries to resolve it, but an early refusal keeps the error message clear and prevents the contract from writing a row that can never be used.

## Tested rule

The ping counter example in this repository uses `assertName` to refuse bad names before any further work. The same pattern should appear in any example that accepts a user-supplied account.

## What is not yet shown

No example currently demonstrates a secondary-permission check (for example, `alice@active` versus `alice@owner`). That check belongs in an authorization-focused example once one is added.
