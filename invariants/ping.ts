const NAME = /^[a-z1-5.]{1,12}$/;

export const PING_CAP = 0xffffffff;

export function assertName(name: string): string {
  if (!NAME.test(name) || name.startsWith(".") || name.endsWith(".")) {
    throw new Error("bad name");
  }
  return name;
}

/** Next table value. A missing row starts at 1. The cap is uint32 max. */
export function nextPings(current: number | null): number {
  if (current === null) return 1;
  if (!Number.isInteger(current) || current < 1 || current > PING_CAP) {
    throw new Error("bad count");
  }
  if (current === PING_CAP) throw new Error("ping cap");
  return current + 1;
}
