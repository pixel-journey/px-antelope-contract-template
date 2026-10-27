import { assertName } from "../invariants/ping.ts";

export type Action = {
  account: string;
  name: "ping";
  authorization: { actor: string; permission: "active" }[];
  data: { user: string };
};

/** Unsigned action body. This does not open a WharfKit session and does not broadcast. */
export function pingAction(user: string, contract = "pxexample"): Action {
  assertName(user);
  assertName(contract);
  return {
    account: contract,
    name: "ping",
    authorization: [{ actor: user, permission: "active" }],
    data: { user },
  };
}
