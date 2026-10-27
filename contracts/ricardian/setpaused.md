# setpaused

The contract account may pause or unpause this contract.

Pausing must not trap user funds. An `eosio.msig` proposal authorized by the contract's active permission can call `setpaused(false)`.
