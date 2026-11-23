# AI handoff — Antelope contract template

## Agent tooling

```bash
git clone https://github.com/wharfkit/skill.git ~/.claude/skills/wharfkit
```

| Source | Role |
| --- | --- |
| [docs.wax.io/build](https://docs.wax.io/build/) | Contract build |
| [Antelope CDT](https://github.com/AntelopeIO/cdt) | cdt-cpp |
| [pausable](https://github.com/pixel-journey/px-token-pausable-emergency-guard) | Real transfer gate |
| [hybrid blend](https://github.com/pixel-journey/px-blend-hybrid-ft-plus-nft) | Two-name FT notify |

## Non-negotiables

1. Ping cap is `2^32 - 1`. Asset labs use `2^62 - 1`. Do not share one constant.
2. `shouldHandleNotify` uses **one** contract string. A vault that is not the token needs **two** names ([hybrid blend](https://github.com/pixel-journey/px-blend-hybrid-ft-plus-nft)).
3. `canUnpause` returns a boolean. It does **not** clear `paused` and does **not** block transfer.
4. The string `eosio.msig` is not a completed proposal.
5. **PXJ precision is always 8** in domain labs. This template does not issue PXJ.
6. CDT image tags differ by pipeline — do not invent a single "the" image string.
7. Template is Antelope-portable layout; production compile is a different private path.

## Prompt seeds

- "Why is one-string shouldHandleNotify wrong for a PXJ vault?"
- "canUnpause true — are transfers open?"
- "Point pausable lab for the real transfer gate."
- "Refuse collapsing ping MAX with asset MAX_AMOUNT."

## Do not

- Copy template pause into a token and assume transfers stop.
- Issue PXJ from the template.
- Open a micro-repo for one renamed assert (use invariant-kit).
