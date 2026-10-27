import assert from "node:assert/strict";
import test from "node:test";
import { pingAction } from "./ping-action.ts";

test("ping action names the user and does not include a signature", () => {
  const action = pingAction("alice");
  assert.deepEqual(action, {
    account: "pxexample",
    name: "ping",
    authorization: [{ actor: "alice", permission: "active" }],
    data: { user: "alice" },
  });
  assert.equal("signatures" in action, false);
});
