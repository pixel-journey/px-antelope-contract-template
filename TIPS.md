# Tips

- Run `npm test` before reading EDUCATION answers.
- The workflow in this repo is not the one that produced the wasm table in the README.
- `4294967295` is `2^32-1`, not a bigint ceiling. Ping state is a uint32 counter.
- Pause recovery without `eosio.msig` (or another second key) is a single-key deadlock. The test exists so the template cannot “simplify” that away.
- New domain labs copy the layout (README, EDUCATION, SECURITY, tests). They do not copy ping into every repo.
