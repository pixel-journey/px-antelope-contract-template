# Integer safety notes

Asset amounts on Antelope are `int64`. The practical upper bound used in these examples is `2^62 - 1`.

## Checks that appear in the tested rules

- Reject non-positive quantities.
- Reject values larger than the chosen maximum before any multiplication.
- Use a wider intermediate type (or an explicit bounds check) when multiplying by a basis-point rate.
- Refuse a result that would be negative or that would exceed the destination type.

## Example pattern

```cpp
check(amount > 0, "positive required");
check(amount <= MAX_AMOUNT, "exceeds max");
int128_t product = (int128_t)amount * bps;
check(product / 10000 <= amount, "overflow or excessive tax");
```

## Why negative inputs matter

A negative quantity that is later cast or added can wrap into a large positive value. The tested rules refuse the negative value before any arithmetic occurs.

These notes are educational. They do not replace the specific checks in each example's test.
