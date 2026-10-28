# RAM payer notes

Antelope charges RAM for new table rows. Who pays matters.

## Patterns used in these examples

- The user pays for their own first deposit or stake row when possible.
- The contract pays only when a prior check (ownership, deposit amount, or admin action) has already succeeded.
- An open path that lets any account create a row paid by the contract is a RAM faucet and must be closed.

## What is not yet shown

No tested TypeScript rule currently demonstrates a RAM-payer decision. The powerup sponsor pool sketch notes the risk of an open faucet until an NFT gate exists. That gate is still missing.

When a staking or deposit example is added, it must show both the happy path (user pays) and the refusal when the contract would otherwise pay for an unauthorized row.
